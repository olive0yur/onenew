<template>
  <div ref="containerRef" class="circle-images-container">
    <canvas ref="canvasRef" class="webgl-canvas"></canvas>
    
    <!-- 中心展示区域 -->
    <transition name="fade">
      <div v-if="!showDefaultText && lastHoveredItem" class="center-display">
        <img 
          :src="imgBaseURL(lastHoveredItem.img)" 
          :alt="lastHoveredItem.label"
          class="center-image"
        />
        <p class="center-text">{{ lastHoveredItem.remark }}</p>
      </div>
      <div v-else class="center-display default-text">
        <p class="onew-design-text" :class="{ 'animate': isInView }">
          <span class="char">o</span>
          <span class="char">n</span>
          <span class="char">e</span>
          <span class="char">w</span>
          <span class="char space"> </span>
          <span class="char">d</span>
          <span class="char">e</span>
          <span class="char">s</span>
          <span class="char">i</span>
          <span class="char">g</span>
          <span class="char">n</span>
        </p>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
  import { imgBaseURL } from '~/utils'
import * as THREE from 'three'
import gsap from 'gsap'

  interface CircleImagesListProps {
    images: any[]
  }

interface ImageItem {
  delete_flag: number
  description: string
  dict_type: string
  dict_type_id: number
  dict_value: string
  gif: string
  id: number
  img: string
  img1: string
  label: string
  order_index: number
  page: string
  remark: string
  route: string
  updated_at: string
  video: string
  video1: string | null
  }

  const props = defineProps<CircleImagesListProps>()

// Refs
const containerRef = ref<HTMLDivElement>()
const canvasRef = ref<HTMLCanvasElement>()
const hoveredItem = ref<ImageItem | null>(null)
const lastHoveredItem = ref<ImageItem | null>(null) // 保存最后悬浮的项目
const showDefaultText = ref(true) // 控制是否显示默认文字
const isInView = ref(false)

// Three.js 变量
let scene: THREE.Scene
let camera: THREE.PerspectiveCamera
let renderer: THREE.WebGLRenderer
let meshes: THREE.Mesh[] = []
let raycaster: THREE.Raycaster
let mouse: THREE.Vector2
let currentIntersect: THREE.Mesh | null = null

// 交互状态
let isDragging = false
let previousMouseX = 0
let rotationVelocity = 0
let targetRotationY = 0
let currentRotationY = 0
let mouseXPosition = 0.5 // 0-1, 鼠标X位置比例
let mouseYPosition = 0.5 // 0-1, 鼠标Y位置比例
let hasPlayedEntranceAnimation = false
let circleGroup: THREE.Group

// 圆盘参数 - 固定圆盘大小，图片数量自适应
const getCircleParams = () => {
  // 固定圆盘半径，不会因为图片数量而改变
  const FIXED_RADIUS = 11 // 固定半径
  const imageWidth = 1.5
  const imageHeight = 1
  
  return {
    RING_RADIUS: FIXED_RADIUS,
    IMAGE_WIDTH: imageWidth,
    IMAGE_HEIGHT: imageHeight,
    TILT_ANGLE: Math.PI * 0.19 // 约27度倾斜,更平的视角
  }
}

let RING_RADIUS = 14
let IMAGE_WIDTH = 1.2
let IMAGE_HEIGHT = 0.7
let TILT_ANGLE = Math.PI * 0.15

// 初始化场景
const initScene = () => {
  if (!containerRef.value || !canvasRef.value) return

  const container = containerRef.value
  const canvas = canvasRef.value

  // 创建场景
  scene = new THREE.Scene()
  
  // 创建相机 - 减少透视效果，让远近图片大小差别更小
  const aspect = container.clientWidth / container.clientHeight
  // 使用较小的FOV (35度) 和更远的距离来减少透视变形
  camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 1000)
  camera.position.set(0, -2, 35) // 相机距离更远
  camera.lookAt(0, 0, 0) // 从下往上仰视圆盘

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  })
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  // 添加环境光和方向光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(5, 5, 5)
  scene.add(directionalLight)

  // 初始化射线投射器
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  // 加载图片并创建网格
  loadImages()

  // 开始动画循环
  animate()
}

// 加载图片
const loadImages = () => {
  const textureLoader = new THREE.TextureLoader()
  const imageCount = props.images.length
  
  if (imageCount === 0) return

  // 获取动态参数
  const params = getCircleParams()
  RING_RADIUS = params.RING_RADIUS
  IMAGE_WIDTH = params.IMAGE_WIDTH
  IMAGE_HEIGHT = params.IMAGE_HEIGHT
  TILT_ANGLE = params.TILT_ANGLE

  // 创建圆盘组
  circleGroup = new THREE.Group()
  circleGroup.rotation.x = TILT_ANGLE
  scene.add(circleGroup)

  const angleStep = (Math.PI * 2) / imageCount
  
  props.images.forEach((item, index) => {
    const angle = index * angleStep
    
    // 加载纹理
    textureLoader.load(
      imgBaseURL(item.img),
      (texture) => {
        // 创建材质
        const material = new THREE.MeshStandardMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0 // 初始透明,用于入场动画
        })

        // 创建几何体
        const geometry = new THREE.PlaneGeometry(IMAGE_WIDTH, IMAGE_HEIGHT)
        const mesh = new THREE.Mesh(geometry, material)

        // 计算位置 (图片垂直插入圆环)
        const x = Math.cos(angle) * RING_RADIUS
        const z = Math.sin(angle) * RING_RADIUS
        
        mesh.position.set(x, 0, z)
        
        // 让图片沿着圆环切线方向(面向前进方向)
        mesh.rotation.y = -angle
        
        // 存储原始位置和角度
        mesh.userData = {
          originalPosition: new THREE.Vector3(x, 0, z),
          angle: angle,
          imageData: item,
          index: index
        }

        circleGroup.add(mesh)
        meshes.push(mesh)

        // 如果是最后一张图片,所有图片加载完成
        if (meshes.length === imageCount) {
          checkScrollTrigger()
        }
      }
    )
  })
}

// 入场动画 - 圆盘旋转1到1.5圈出现
const playEntranceAnimation = () => {
  if (hasPlayedEntranceAnimation || !circleGroup || meshes.length === 0) return
  hasPlayedEntranceAnimation = true

  // 设置初始旋转状态 - 从负1.5圈开始
  circleGroup.rotation.y = -Math.PI * 1 // -1.5圈 (Math.PI * 2 = 1圈)

  // GSAP旋转动画 - 旋转到0度（完成1.5圈旋转）
  gsap.to(circleGroup.rotation, {
    y: 0,
    duration: 2.5,
    ease: 'power2.out',
    onUpdate: () => {
      // 同步 currentRotationY 以便后续拖动能正确衔接
      currentRotationY = circleGroup.rotation.y
    }
  })

  // 透明度动画 - 图片逐渐显现
  meshes.forEach((mesh, index) => {
    gsap.to((mesh.material as THREE.MeshStandardMaterial), {
      opacity: 1,
      duration: 1.5,
      delay: index * 0.01,
      ease: 'power2.out'
    })
  })
}

// 动画循环
let animationFrameId: number
const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  if (!circleGroup) return

  // 平滑旋转
  if (!isDragging) {
    rotationVelocity *= 0.95 // 阻尼
    currentRotationY += rotationVelocity
  }

  // 应用旋转到整个组 - 圆盘作为整体旋转
  circleGroup.rotation.y = currentRotationY

  // 处理图片位置 - 只在悬浮时向外偏移
  meshes.forEach((mesh) => {
    const originalPos = mesh.userData.originalPosition
    
    if (mesh.userData.isHovered) {
      // 向外偏移 - 沿径向方向
      const offsetDistance = 0.5
      const direction = new THREE.Vector3(originalPos.x, originalPos.y, originalPos.z).normalize()
      const targetX = originalPos.x + direction.x * offsetDistance
      const targetZ = originalPos.z + direction.z * offsetDistance
      
      mesh.position.x += (targetX - mesh.position.x) * 0.15
      mesh.position.z += (targetZ - mesh.position.z) * 0.15
    } else {
      // 回到原位
      mesh.position.x += (originalPos.x - mesh.position.x) * 0.15
      mesh.position.z += (originalPos.z - mesh.position.z) * 0.15
    }
  })

  // 根据鼠标位置调整相机 - 轻微的倾斜效果,像重力一样
  // 鼠标在右下时,相机向左上移动,让圆盘看起来倾向右下
  const targetCameraX = -(mouseXPosition - 0.5) * 8 // 增大X轴移动幅度
  const targetCameraY = -2 + (mouseYPosition - 0.5) * 6 // 增大Y轴移动幅度
  
  camera.position.x += (targetCameraX - camera.position.x) * 0.08 // 增加响应速度
  camera.position.y += (targetCameraY - camera.position.y) * 0.08 // 增加响应速度
  camera.lookAt(0, 0, 0)

  // 渲染
  renderer.render(scene, camera)
}

// 鼠标移动事件
const onMouseMove = (event: MouseEvent) => {
  if (!containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  
  // 更新鼠标位置 (标准化到-1到1)
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  // 更新鼠标位置比例 (0到1)
  mouseXPosition = (event.clientX - rect.left) / rect.width
  mouseYPosition = (event.clientY - rect.top) / rect.height

  // 射线检测
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(meshes)

  // 处理悬浮状态 - 只在非拖拽时处理
  if (!isDragging) {
    if (intersects.length > 0) {
      const intersect = intersects[0]
      if (!intersect) return
      const mesh = intersect.object as THREE.Mesh
      
      if (currentIntersect !== mesh) {
        // 重置之前的悬浮对象
        if (currentIntersect) {
          currentIntersect.userData.isHovered = false
        }

        // 新悬浮对象
        currentIntersect = mesh
        mesh.userData.isHovered = true
        
        // 更新中心显示
        hoveredItem.value = mesh.userData.imageData
        lastHoveredItem.value = mesh.userData.imageData
        showDefaultText.value = false
        
        // 改变鼠标样式
        document.body.style.cursor = 'pointer'
      }
      
      // 悬浮图片的位置更新在animate循环中处理
    } else {
      if (currentIntersect) {
        // 重置悬浮状态,但保留最后悬浮的项目
        currentIntersect.userData.isHovered = false
        currentIntersect = null
        hoveredItem.value = null
        // 不重置 lastHoveredItem 和 showDefaultText,保持显示最后悬浮的图片
        document.body.style.cursor = 'default'
      }
    }
  }

  // 拖拽旋转
  if (isDragging) {
    const deltaX = event.clientX - previousMouseX
    rotationVelocity = deltaX * 0.005
    currentRotationY += rotationVelocity
    previousMouseX = event.clientX
  }
}

// 鼠标按下
const onMouseDown = (event: MouseEvent) => {
  isDragging = true
  previousMouseX = event.clientX
  document.body.style.cursor = 'grabbing'
}

// 鼠标松开
const onMouseUp = () => {
  isDragging = false
  document.body.style.cursor = 'default'
}

// 点击屏幕任何地方取消悬浮,显示默认文字
const onClick = () => {
  showDefaultText.value = true
  lastHoveredItem.value = null
  if (currentIntersect) {
    currentIntersect.userData.isHovered = false
    currentIntersect = null
  }
  hoveredItem.value = null
}

// 鼠标离开
const onMouseLeave = () => {
  isDragging = false
  if (currentIntersect) {
    currentIntersect.userData.isHovered = false
    const angle = currentIntersect.userData.angle + currentRotationY
    const resetX = Math.cos(angle) * RING_RADIUS
    const resetZ = Math.sin(angle) * RING_RADIUS
    
    gsap.to(currentIntersect.position, {
      x: resetX,
      z: resetZ,
      duration: 0.3
    })
    currentIntersect = null
    hoveredItem.value = null
  }
  document.body.style.cursor = 'default'
}

// 触摸事件支持
let previousTouchX = 0

const onTouchStart = (event: TouchEvent) => {
  if (event.touches.length === 1 && event.touches[0]) {
    isDragging = true
    previousTouchX = event.touches[0].clientX
  }
}

const onTouchMove = (event: TouchEvent) => {
  if (!containerRef.value || event.touches.length !== 1) return

  const touch = event.touches[0]
  if (!touch) return
  
  const rect = containerRef.value.getBoundingClientRect()

  // 更新鼠标位置用于相机调整
  mouseXPosition = (touch.clientX - rect.left) / rect.width
  mouseYPosition = (touch.clientY - rect.top) / rect.height

  // 拖拽旋转
  if (isDragging) {
    const deltaX = touch.clientX - previousTouchX
    rotationVelocity = deltaX * 0.005
    currentRotationY += rotationVelocity
    previousTouchX = touch.clientX
  }
}

const onTouchEnd = () => {
  isDragging = false
}

// 窗口调整大小
const onResize = () => {
  if (!containerRef.value || !camera || !renderer) return

  const container = containerRef.value
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
}

// 滚动监听 - 检查组件是否进入视口
const checkScrollTrigger = () => {
  if (!containerRef.value || hasPlayedEntranceAnimation) return

  const rect = containerRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // 当组件进入视口50%时触发
  if (rect.top < windowHeight * 0.7 && rect.bottom > windowHeight * 0.3) {
    playEntranceAnimation()
  }
}

// 节流函数
const throttle = (func: Function, delay: number) => {
  let lastCall = 0
  return (...args: any[]) => {
    const now = Date.now()
    if (now - lastCall >= delay) {
      lastCall = now
      func(...args)
    }
  }
}

const throttledScrollCheck = throttle(checkScrollTrigger, 100)

// 检查元素是否进入视口(用于文字动画)
const checkTextAnimation = () => {
  if (!containerRef.value || isInView.value) return
  
  const rect = containerRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  
  // 当元素进入视口时触发动画
  if (rect.top <= windowHeight * 0.8 && rect.bottom >= 0) {
    isInView.value = true
  }
}

// 生命周期
onMounted(() => {
  initScene()
  
  // 添加事件监听
  window.addEventListener('resize', onResize)
  containerRef.value?.addEventListener('mousemove', onMouseMove)
  containerRef.value?.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mouseup', onMouseUp)
  containerRef.value?.addEventListener('mouseleave', onMouseLeave)
  window.addEventListener('scroll', throttledScrollCheck)
  
  // 添加点击事件监听
  window.addEventListener('click', onClick)
  
  // 触摸事件
  containerRef.value?.addEventListener('touchstart', onTouchStart, { passive: true })
  containerRef.value?.addEventListener('touchmove', onTouchMove, { passive: true })
  containerRef.value?.addEventListener('touchend', onTouchEnd, { passive: true })
  
  // 添加文字动画滚动监听
  window.addEventListener('scroll', checkTextAnimation)
  
  // 初始检查是否在视口
  setTimeout(() => {
    checkScrollTrigger()
    checkTextAnimation()
  }, 100)
})

onUnmounted(() => {
  // 停止动画循环
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }

  // 清理事件监听
  window.removeEventListener('resize', onResize)
  window.removeEventListener('scroll', throttledScrollCheck)
  window.removeEventListener('scroll', checkTextAnimation)
  window.removeEventListener('click', onClick)
  containerRef.value?.removeEventListener('mousemove', onMouseMove)
  containerRef.value?.removeEventListener('mousedown', onMouseDown)
  window.removeEventListener('mouseup', onMouseUp)
  containerRef.value?.removeEventListener('mouseleave', onMouseLeave)
  containerRef.value?.removeEventListener('touchstart', onTouchStart)
  containerRef.value?.removeEventListener('touchmove', onTouchMove)
  containerRef.value?.removeEventListener('touchend', onTouchEnd)

  // 清理Three.js资源
  meshes.forEach(mesh => {
    mesh.geometry.dispose()
    const material = mesh.material as THREE.MeshStandardMaterial
    if (material.map) material.map.dispose()
    material.dispose()
  })
  
  if (renderer) {
    renderer.dispose()
    renderer.forceContextLoss()
  }
  
  document.body.style.cursor = 'default'
})
</script>

<style scoped>
.circle-images-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.webgl-canvas {
  width: 100%;
  height: 100%;
  display: block;
  cursor: grab;
}

.webgl-canvas:active {
  cursor: grabbing;
}

.center-display {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.center-image {
  width: 20vw; /* 响应式宽度 */
  max-width: 340px;
  min-width: 240px;
  height: auto; /* 保持宽高比 */
  aspect-ratio: 16/9; /* 固定宽高比 */
  object-fit: cover;
  order: 2; /* 图片排在第二位 */
  transition: transform 0.3s ease;
}

.center-text {
  color: #000;
  text-align: center;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(20px, 2.5vw, 40px); /* 响应式字体 */
  font-style: normal;
  font-weight: 400;
  line-height: 1.4;
  margin: 0 0 20px 0; /* 文字下边距 */
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
  max-width: 20vw; /* 与图片宽度一致，不超过图片 */
  min-width: 180px; /* 与图片最小宽度一致 */
  order: 1; /* 文字排在第一位，显示在图片上方 */
  
  /* 最多显示两行，超出部分省略 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-word;
}

.default-text {
  justify-content: center;
  align-items: center;
}

.onew-design-text {
  color: #000;
  text-align: center;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(48px, 6vw, 96px);
  font-style: normal;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
  text-transform: lowercase;
  letter-spacing: -0.02em;
  position: relative;
  display: inline-block;
  overflow: hidden;
  padding: 0 0.2em;
  
  .char {
    display: inline-block;
    position: relative;
    z-index: 2;
  }
  
  .space {
    width: 0.3em;
  }
  
  /* 黑色背景进度条 - 默认不显示动画 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background-color: #000;
    z-index: 1;
    opacity: 0;
  }
  
  /* 白色文字层,显示在黑色背景上 - 默认不显示动画 */
  &::after {
    content: 'onew design';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: #fff;
    z-index: 2;
    clip-path: inset(0 100% 0 0);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
  }
  
  /* 当元素进入视口时添加动画 */
  &.animate::before {
    animation: progressBar 1s ease-in-out forwards;
  }
  
  &.animate::after {
    animation: revealWhiteText 1s ease-in-out forwards;
  }
}

@keyframes progressBar {
  0% {
    width: 0;
    opacity: 1;
  }
  50% {
    width: 100%;
    opacity: 1;
  }
  51% {
    width: 100%;
    transform: translateX(0);
    opacity: 1;
  }
  99% {
    width: 100%;
    transform: translateX(100%);
    opacity: 1;
  }
  100% {
    width: 100%;
    transform: translateX(100%);
    opacity: 0;
  }
}

@keyframes revealWhiteText {
  0% {
    clip-path: inset(0 100% 0 0);
    opacity: 1;
  }
  50% {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
  51% {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
  99% {
    clip-path: inset(0 100% 0 100%);
    opacity: 1;
  }
  100% {
    clip-path: inset(0 100% 0 100%);
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -45%);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .circle-images-container {
    left: 8vw;
    right: 8vw;
  }

  .center-image {
    width: 30vw;
    min-width: 250px;
  }
  
  .center-text {
    max-width: 30vw;
    min-width: 250px;
  }
}

@media (max-width: 768px) {
  .circle-images-container {
    left: 5vw;
    right: 5vw;
    top: 8vh;
    bottom: 5vh;
    min-height: 500px;
  }

  .center-image {
    width: 40vw;
    min-width: 200px;
  }
  
  .center-text {
    max-width: 40vw;
    min-width: 200px;
    margin-bottom: 16px;
  }
}

@media (max-width: 480px) {
  .circle-images-container {
    left: 2vw;
    right: 2vw;
    top: 10vh;
    min-height: 400px;
  }

  .center-image {
    width: 50vw;
    min-width: 180px;
  }
  
  .center-text {
    max-width: 50vw;
    min-width: 180px;
    margin-bottom: 12px;
  }
}
</style>