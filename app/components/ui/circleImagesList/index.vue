<template>
  <div ref="containerRef" class="circle-images-container">
    <canvas ref="canvasRef" class="webgl-canvas"></canvas>
    
    <!-- 中心展示区域 -->
    <div v-if="!showDefaultText && lastHoveredItem" class="center-display">
      <!-- 数字计数器 - 在图片上方 -->
      <div class="project-count">
        <span>(<NumberScroll :target="images.length" :duration="800" />)</span>
      </div>
      <img 
        :src="imgBaseURL(lastHoveredItem.img)" 
        :alt="lastHoveredItem.label"
        class="center-image"
      />
      <!-- 桌面端：显示 remark -->
      <p class="center-text">{{ lastHoveredItem.remark }}</p>
      <!-- 移动端：显示 label 和 remark -->
      <div class="center-text-group">
        <p class="center-remark">{{ lastHoveredItem.remark }}</p>
        <p class="center-label">{{ lastHoveredItem.dict_value }}</p>
      </div>
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
let lastCenterMeshIndex = -1 // 记录上次中心图片的索引，用于快速判断是否改变

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
let currentDeviceType: string = 'desktop' // 记录当前设备类型
let lastDragTime = 0 // 记录上次拖拽时间，用于计算速度
let dragVelocities: number[] = [] // 记录最近几帧的速度，用于平滑惯性

// 检查是否为移动端
const isMobile = () => {
  return window.innerWidth <= 768
}

// 圆盘参数 - 固定圆盘大小，图片数量自适应
const getCircleParams = () => {
  // 根据设备类型返回不同的参数
  if (isMobile()) {
    // 移动端：适中大小的图片
    return {
      RING_RADIUS: 11,
      IMAGE_WIDTH: 2.35,  // 移动端图片适中大小
      IMAGE_HEIGHT: 1.85,
      TILT_ANGLE: Math.PI * 0.19
    }
  } else {
    // 桌面端：正常大小
    return {
      RING_RADIUS: 11,
      IMAGE_WIDTH: 1.5,
      IMAGE_HEIGHT: 1,
      TILT_ANGLE: Math.PI * 0.19
    }
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

  // 设置初始设备类型
  currentDeviceType = isMobile() ? 'mobile' : 'desktop'

  // 创建场景
  scene = new THREE.Scene()
  
  // 创建相机 - 减少透视效果，让远近图片大小差别更小
  const aspect = container.clientWidth / container.clientHeight
  // 移动端使用更小的FOV来减弱透视效果（近大远小）
  const fov = isMobile() ? 30 : 35
  camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 1000)
  
  // 根据设备类型设置相机位置
  if (isMobile()) {
    // 移动端：相机在左上方，俯视看到右半圆
    camera.position.set(-12, 8, 25) // X=-12 在左侧，Y=8 在上方俯视
  } else {
    // 桌面端：正常位置（从下往上看）
    camera.position.set(0, -2, 35)
  }
  camera.lookAt(0, 0, 0)

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
  // 移动端不倾斜，桌面端倾斜
  circleGroup.rotation.x = isMobile() ? 0 : TILT_ANGLE
  // 移动端：圆盘向右下移动，只显示右半部分
  if (isMobile()) {
    circleGroup.position.x = 13.4 // 向右移动
    circleGroup.position.y = -5 // 向下移动
  }
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
  if (!circleGroup || meshes.length === 0 || hasPlayedEntranceAnimation) return
  
  // 立即标记为已播放，防止重复触发
  hasPlayedEntranceAnimation = true
  
  // 根据设备类型设置不同的动画速度
  const isMobileDevice = isMobile()
  const rotationDuration = isMobileDevice ? 1.2 : 2.5 // 移动端1.2秒，桌面端2.5秒
  const opacityDuration = isMobileDevice ? 0.8 : 1.5 // 移动端0.8秒，桌面端1.5秒
  const delayMultiplier = isMobileDevice ? 0.005 : 0.01 // 移动端延迟更短
  
  // 设置初始旋转状态 - 从负1圈开始
  circleGroup.rotation.y = -Math.PI * 1
  
  // 重置所有图片透明度
  meshes.forEach((mesh) => {
    (mesh.material as THREE.MeshStandardMaterial).opacity = 0
  })

  // GSAP旋转动画 - 旋转到0度（完成1圈旋转）
  gsap.to(circleGroup.rotation, {
    y: 0,
    duration: rotationDuration,
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
      duration: opacityDuration,
      delay: index * delayMultiplier,
      ease: 'power2.out'
    })
  })
}

// 重新播放入场动画 - 供外部调用
const replayEntranceAnimation = () => {
  hasPlayedEntranceAnimation = false
  playEntranceAnimation()
  hasPlayedEntranceAnimation = true
}

// 动画循环
let animationFrameId: number
const animate = () => {
  animationFrameId = requestAnimationFrame(animate)

  if (!circleGroup) return

  // 平滑旋转
  if (!isDragging) {
    // 提高阻尼系数，让惯性滑动更快停止
    rotationVelocity *= 0.88 // 降低系数，让圆盘更快停下来
    currentRotationY += rotationVelocity
    
    // 当速度非常小时，停止旋转
    if (Math.abs(rotationVelocity) < 0.0001) {
      rotationVelocity = 0
    }
  }

  // 应用旋转到整个组 - 圆盘作为整体旋转
  circleGroup.rotation.y = currentRotationY

  // 处理图片位置
  if (isMobile()) {
    // 移动端：自动检测并突出中间位置的图片
    let closestMesh: THREE.Mesh | null = null
    let minAngleDiff = Infinity
    
    meshes.forEach((mesh) => {
      // 计算当前图片的角度（考虑旋转）- 反转旋转方向以保持图片在固定位置
      let currentAngle = (mesh.userData.angle - currentRotationY) % (Math.PI * 2)
      // 标准化角度到 0 到 2π 范围内（处理负值）
      if (currentAngle < 0) {
        currentAngle += Math.PI * 2
      }
      // 目标角度：左半边中心位置
      // 由于相机在左侧看，圆盘向右偏移，需要调整目标角度
      // 可以调整这个值：0.75-1.0 之间，越小越靠前，越大越靠后
      const targetAngle = Math.PI * 1.12 // 调整到左半边的视觉中心
      // 计算角度差
      let angleDiff = Math.abs(currentAngle - targetAngle)
      // 处理角度循环（超过2π的情况）
      if (angleDiff > Math.PI) {
        angleDiff = Math.PI * 2 - angleDiff
      }
      
      if (angleDiff < minAngleDiff) {
        minAngleDiff = angleDiff
        closestMesh = mesh
      }
    })
    
    // 更新中心展示的内容 - 移动端实时更新，不受悬浮状态影响
    if (closestMesh) {
      const mesh = closestMesh as THREE.Mesh
      const centerMeshIndex = mesh.userData.index
      // 直接更新，不检查索引是否变化，确保实时响应
      lastCenterMeshIndex = centerMeshIndex
      lastHoveredItem.value = mesh.userData.imageData
      showDefaultText.value = false
    }
    
    // 处理图片位置
    meshes.forEach((mesh) => {
      const originalPos = mesh.userData.originalPosition
      const isCenter = mesh === closestMesh
      
      if (isCenter) {
        // 在中心位置的图片：只向外伸出，位置跟着圆盘
        const offsetDistance = 1 // 伸出的距离
        const direction = new THREE.Vector3(originalPos.x, originalPos.y, originalPos.z).normalize()
        const targetX = originalPos.x + direction.x * offsetDistance
        const targetZ = originalPos.z + direction.z * offsetDistance
        
        mesh.position.x += (targetX - mesh.position.x) * 0.2 // 稍快的动画
        mesh.position.z += (targetZ - mesh.position.z) * 0.2
      } else if (mesh.userData.isHovered) {
        // 悬浮的图片：向外偏移
        const offsetDistance = 1.5
        const direction = new THREE.Vector3(originalPos.x, originalPos.y, originalPos.z).normalize()
        const targetX = originalPos.x + direction.x * offsetDistance
        const targetZ = originalPos.z + direction.z * offsetDistance
        
        mesh.position.x += (targetX - mesh.position.x) * 0.15
        mesh.position.z += (targetZ - mesh.position.z) * 0.15
      } else {
        // 不在中心的图片：缩回原位
        mesh.position.x += (originalPos.x - mesh.position.x) * 0.2
        mesh.position.z += (originalPos.z - mesh.position.z) * 0.2
      }
    })
  } else {
    // 桌面端：只在悬浮时向外偏移
    meshes.forEach((mesh) => {
      const originalPos = mesh.userData.originalPosition
      
      if (mesh.userData.isHovered) {
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
  }

  // 根据鼠标位置调整相机 - 轻微的倾斜效果,像重力一样
  if (isMobile()) {
    // 移动端：固定相机位置,不需要重力效果
    const baseCameraX = -12
    const baseCameraY = 3.5
    const baseCameraZ = 25
    
    // 平滑回到固定位置(防止从桌面端切换过来时的跳跃)
    camera.position.x += (baseCameraX - camera.position.x) * 0.08
    camera.position.y += (baseCameraY - camera.position.y) * 0.08
    camera.position.z += (baseCameraZ - camera.position.z) * 0.08
  } else {
    // 桌面端：根据鼠标位置产生重力效果
    const targetCameraX = -(mouseXPosition - 0.5) * 8
    const targetCameraY = -2 + (mouseYPosition - 0.5) * 6
    
    camera.position.x += (targetCameraX - camera.position.x) * 0.08
    camera.position.y += (targetCameraY - camera.position.y) * 0.08
  }
  
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
    const currentTime = Date.now()
    const deltaTime = Math.max(currentTime - lastDragTime, 1) // 避免除以0
    const deltaX = event.clientX - previousMouseX
    
    // 降低灵敏度，让拖动更精确、更容易控制
    const velocity = deltaX * 0.004
    rotationVelocity = velocity
    
    // 记录速度用于松手后的惯性计算
    dragVelocities.push(velocity)
    if (dragVelocities.length > 5) {
      dragVelocities.shift() // 只保留最近5帧
    }
    
    currentRotationY += rotationVelocity
    previousMouseX = event.clientX
    lastDragTime = currentTime
  }
}

// 鼠标按下
const onMouseDown = (event: MouseEvent) => {
  isDragging = true
  previousMouseX = event.clientX
  lastDragTime = Date.now()
  dragVelocities = [] // 清空速度记录
  rotationVelocity = 0 // 重置速度
  document.body.style.cursor = 'grabbing'
}

// 鼠标松开
const onMouseUp = () => {
  isDragging = false
  
  // 计算平均速度作为惯性初始速度
  if (dragVelocities.length > 0) {
    const avgVelocity = dragVelocities.reduce((sum, v) => sum + v, 0) / dragVelocities.length
    rotationVelocity = avgVelocity * 0.8 // 降低惯性系数，让停止更快、更容易控制
  }
  
  dragVelocities = []
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
    lastDragTime = Date.now()
    dragVelocities = [] // 清空速度记录
    rotationVelocity = 0 // 重置速度
    // 阻止默认行为，防止页面滚动
    event.preventDefault()
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
    // 阻止默认行为，防止页面滚动
    event.preventDefault()
    const currentTime = Date.now()
    const deltaTime = Math.max(currentTime - lastDragTime, 1)
    const deltaX = touch.clientX - previousTouchX
    
    // 移动端也降低灵敏度，让拖动更精确
    const velocity = deltaX * 0.004
    rotationVelocity = velocity
    
    // 记录速度用于松手后的惯性计算
    dragVelocities.push(velocity)
    if (dragVelocities.length > 5) {
      dragVelocities.shift()
    }
    
    currentRotationY += rotationVelocity
    previousTouchX = touch.clientX
    lastDragTime = currentTime
  }
}

const onTouchEnd = () => {
  isDragging = false
  
  // 计算平均速度作为惯性初始速度
  if (dragVelocities.length > 0) {
    const avgVelocity = dragVelocities.reduce((sum, v) => sum + v, 0) / dragVelocities.length
    rotationVelocity = avgVelocity * 1.0 // 移动端降低惯性系数，让控制更精确
  }
  
  dragVelocities = []
}

// 更新圆盘参数和位置 - 设备类型切换时调用
const updateCircleForDeviceType = () => {
  if (!circleGroup || meshes.length === 0) return
  
  const newDeviceType = isMobile() ? 'mobile' : 'desktop'
  
  // 如果设备类型没有变化,不需要更新
  if (newDeviceType === currentDeviceType) return
  
  currentDeviceType = newDeviceType
  
  // 获取新的参数
  const params = getCircleParams()
  RING_RADIUS = params.RING_RADIUS
  IMAGE_WIDTH = params.IMAGE_WIDTH
  IMAGE_HEIGHT = params.IMAGE_HEIGHT
  TILT_ANGLE = params.TILT_ANGLE
  
  // 使用 GSAP 平滑过渡圆盘的旋转和位置
  if (isMobile()) {
    // 切换到移动端
    gsap.to(circleGroup.rotation, {
      x: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    })
    gsap.to(circleGroup.position, {
      x: 12,
      y: -4.5,
      duration: 0.8,
      ease: 'power2.inOut'
    })
  } else {
    // 切换到桌面端
    gsap.to(circleGroup.rotation, {
      x: TILT_ANGLE,
      duration: 0.8,
      ease: 'power2.inOut'
    })
    gsap.to(circleGroup.position, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    })
  }
  
  // 更新所有图片的大小和位置
  meshes.forEach((mesh, index) => {
    const angle = mesh.userData.angle
    
    // 更新几何体大小
    mesh.geometry.dispose()
    mesh.geometry = new THREE.PlaneGeometry(IMAGE_WIDTH, IMAGE_HEIGHT)
    
    // 更新位置
    const x = Math.cos(angle) * RING_RADIUS
    const z = Math.sin(angle) * RING_RADIUS
    
    // 使用 GSAP 平滑过渡位置
    gsap.to(mesh.position, {
      x: x,
      z: z,
      duration: 0.8,
      ease: 'power2.inOut'
    })
    
    // 更新存储的原始位置
    mesh.userData.originalPosition.set(x, 0, z)
  })
}

// 窗口调整大小
const onResize = () => {
  if (!containerRef.value || !camera || !renderer) return

  const container = containerRef.value
  camera.aspect = container.clientWidth / container.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(container.clientWidth, container.clientHeight)
  
  // 根据设备类型调整相机位置和FOV
  if (isMobile()) {
    camera.fov = 30 // 更小的FOV，减弱透视效果
    // 使用 GSAP 平滑过渡相机位置
    gsap.to(camera.position, {
      x: -12,
      y: 8,
      z: 25,
      duration: 0.8,
      ease: 'power2.inOut'
    })
  } else {
    camera.fov = 35
    // 使用 GSAP 平滑过渡相机位置
    gsap.to(camera.position, {
      x: 0,
      y: -2,
      z: 35,
      duration: 0.8,
      ease: 'power2.inOut'
    })
  }
  camera.updateProjectionMatrix()
  
  // 检查设备类型是否变化,更新圆盘
  updateCircleForDeviceType()
}

// 滚动监听 - 检查组件是否进入视口
const checkScrollTrigger = () => {
  // 如果已经播放过动画，或者容器不存在，直接返回
  if (hasPlayedEntranceAnimation || !containerRef.value) return

  const rect = containerRef.value.getBoundingClientRect()
  const windowHeight = window.innerHeight

  // 当组件进入视口50%时触发（只会触发一次）
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
  
  // 触摸事件 - passive: false 允许 preventDefault()
  containerRef.value?.addEventListener('touchstart', onTouchStart, { passive: false })
  containerRef.value?.addEventListener('touchmove', onTouchMove, { passive: false })
  containerRef.value?.addEventListener('touchend', onTouchEnd, { passive: true })
  
  // 添加文字动画滚动监听
  window.addEventListener('scroll', checkTextAnimation)
  
  // 初始检查是否在视口
  setTimeout(() => {
    checkScrollTrigger()
    checkTextAnimation()
  }, 100)
})

// 暴露方法给父组件
defineExpose({
  replayEntranceAnimation
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

/* 数字计数器样式 - 桌面端隐藏 */
.project-count {
  display: none; /* 桌面端不显示 */
}

.center-image {
  width: 20vw; /* 响应式宽度 */
  max-width: 340px;
  min-width: 240px;
  height: auto; /* 保持宽高比 */
  aspect-ratio: 16/9; /* 固定宽高比 */
  object-fit: cover;
  order: 2; /* 图片排在第二位 */
}

/* 桌面端的单文字显示 */
.center-text {
  color: #000;
  text-align: center;
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(20px, 2.5vw, 40px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.4;
  margin: 0 0 20px 0; /* 底部边距，让文字和图片有间隔 */
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
  max-width: 20vw;
  min-width: 180px;
  order: 1; /* 文字在图片上方 */
  display: block; /* 桌面端显示 */
  
  /* 最多显示两行，超出部分省略 */
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  word-break: break-word;
}

/* 移动端的双文字显示 */
.center-text-group {
  display: none; /* 桌面端默认隐藏 */
  flex-direction: column;
  align-items: flex-start;
  /* align-items: center; */
  gap: 8px;
  order: 3; /* 文字组在图片下方 */
}

.center-label {
  color: #000;
  /* text-align: center; */
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(20px, 2.5vw, 40px); /* 响应式字体 */
  font-style: normal;
  font-weight: 400;
  line-height: 1.4;
  margin: 0;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
  max-width: 20vw;
  min-width: 180px;
}

.center-remark {
  color: #000;
  /* text-align: center; */
  font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(20px, 2.5vw, 40px);
  font-style: normal;
  font-weight: 400;
  line-height: 1.4;
  margin: 0;
  text-shadow: 0 2px 10px rgba(255, 255, 255, 0.8);
  max-width: 20vw;
  min-width: 180px;
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
  transition: opacity 0s ease, transform 0s ease;
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
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    min-height: 100vh;
  }
  
  /* 手机端：中心展示区域在圆盘上方 */
  .center-display {
    top: 45%; /* 调整位置，显示在圆盘上方 - 往下移 */
    transform: translate(-50%, -50%);
    flex-direction: column;
    gap: 12px; /* 图片和文字之间的间距 */
    padding: 0 16px; /* 左右边距 16px */
  }

  /* 移动端数字计数器样式 */
  .project-count {
    display: block; /* 移动端显示 */
    color: #3B4EFF;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 48px;
    font-style: normal;
    font-weight: 500;
    line-height: 48px;
    letter-spacing: -6px;
    text-transform: capitalize;
    margin-bottom: 24px; /* 距离图片24px */
    order: 1; /* 数字排在第一位 */
    width: 100%; /* 占满宽度 */
    text-align: right; /* 靠右对齐 */
    padding-right: 0; /* 右侧内边距已由父元素的padding处理 */
  }

  /* 隐藏桌面端的单文字显示 */
  .center-text {
    display: none;
  }

  .center-image {
    width: calc(100vw - 32px); /* 减去左右各16px的边距 */
    max-width: calc(100vw - 32px);
    min-width: auto;
    order: 2; /* 图片排在第二位 */
    margin: 0;
  }
  
  /* 显示移动端的双文字显示 */
  .center-text-group {
    display: flex; /* 移动端显示 */
    order: 3; /* 文字组在最下方 */
    gap: 4px; /* label 和 remark 之间的间距 */
    width: 100%;
  }

  .center-remark {
    color: #000;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px;
    text-shadow: none;
    max-width: 100%;
    min-width: auto;
  }
  
  .center-label {
    color: rgba(0, 0, 0, 0.30);
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px;
    text-transform: uppercase;
    text-shadow: none;
    max-width: 100%;
    min-width: auto;
    margin-top: 4px;
  }
  
  /* 默认文字样式 */
  .default-text .onew-design-text {
    font-size: clamp(36px, 7vw, 56px);
  }
}

@media (max-width: 480px) {
  .center-display {
    top: 33%; /* 小屏幕也往下移 */
    gap: 12px; /* 保持图片和文字之间12px间距 */
  }

  .project-count {
    font-size: 48px; /* 固定48px，不缩小 */
    line-height: 48px;
    letter-spacing: -6px;
    margin-bottom: 20px;
  }

  .center-image {
    width: calc(100vw - 32px); /* 保持左右16px边距 */
    max-width: calc(100vw - 32px);
  }
  
  .center-remark {
    font-size: 16px;
    line-height: 16px;
  }
  
  .center-label {
    font-size: 12px;
    line-height: 12px;
  }
  
  .default-text .onew-design-text {
    font-size: clamp(32px, 8vw, 48px);
  }
}
</style>