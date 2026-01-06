<template>
  <div ref="containerRef" class="card-round-root">
    <canvas ref="canvasRef" class="card-round-canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
import { imgBaseURL } from '~/utils'
import * as THREE from 'three'
import gsap from 'gsap'

type CardItem = {
  img?: string
  [k: string]: any
}

const props = defineProps<{
  items: CardItem[]
}>()

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

let scene: THREE.Scene | null = null
let camera: THREE.PerspectiveCamera | null = null
let renderer: THREE.WebGLRenderer | null = null
let ringGroup: THREE.Group | null = null
let rafId: number | null = null

const cards: Array<{
  group: THREE.Group
  frontMat: THREE.MeshBasicMaterial
  backMat: THREE.MeshBasicMaterial
  imgGeo: THREE.PlaneGeometry
  tex: THREE.Texture | null
  angle: number
}> = []

const isMobile = () => window.innerWidth <= 768
const isTablet = () => window.innerWidth > 768 && window.innerWidth <= 1024

const resolveImg = (img?: string) => {
  if (!img) return ''
  // 兼容绝对地址/本地 public 资源
  if (/^https?:\/\//i.test(img) || img.startsWith('/')) return img
  return imgBaseURL(img)
}

const makeImageMaterial = () => {
  return new THREE.MeshBasicMaterial({
    transparent: true,
    side: THREE.FrontSide,
    opacity: 0,
  })
}

const disposeCards = () => {
  cards.forEach((c) => {
    c.imgGeo.dispose()
    c.frontMat.dispose()
    c.backMat.dispose()
    c.tex?.dispose()
  })
  cards.length = 0
  if (ringGroup) {
    ringGroup.clear()
  }
}

const applyLayout = () => {
  if (!containerRef.value || !renderer || !camera || !ringGroup) return
  const w = containerRef.value.clientWidth
  const h = containerRef.value.clientHeight
  renderer.setSize(w, h)
  camera.aspect = w / Math.max(1, h)
  camera.updateProjectionMatrix()

  // 圆环在 XZ 平面，相机正对屏幕看过去
  ringGroup.position.set(0, 0, 0)
  // 相机在 Z 轴正方向，正对圆环中心
  camera.position.set(0, 0, isMobile() ? 18 : isTablet() ? 25 : 40)
  camera.lookAt(0, 0, 0)
}

const initThree = () => {
  if (!containerRef.value || !canvasRef.value) return

  const container = containerRef.value
  const canvas = canvasRef.value

  scene = new THREE.Scene()

  const aspect = container.clientWidth / container.clientHeight
  // 较小的 FOV 减少透视变形，后面的卡片不会太小
  const fov = isMobile() ? 35 : isTablet() ? 32 : 30
  camera = new THREE.PerspectiveCamera(fov, aspect, 0.1, 200)

  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  })
  
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))

  // 轻量光照（为了让图片/渐变更"立体"一点，基本不影响性能）
  const ambient = new THREE.AmbientLight(0xffffff, 1)
  scene.add(ambient)

  ringGroup = new THREE.Group()
  // 圆环正对屏幕，不做任何倾斜
  ringGroup.rotation.x = 0
  ringGroup.rotation.z = 0
  scene.add(ringGroup)
  applyLayout()
}

const buildRing = async () => {
  if (!scene || !camera || !renderer || !ringGroup) return
  disposeCards()

  const list = (props.items || []).filter((x) => !!resolveImg(x?.img))
  if (list.length === 0) return

  // 圆环半径
  const radius = isMobile() ? 3 : isTablet() ? 6 : 13
  // 卡片尺寸（只有图片，没有边框）
  const cardW = isMobile() ? 1.3 : isTablet() ? 2.5 : 5
  const cardH = isMobile() ? 1.7 : isTablet() ? 3.2 : 6.2

  const loader = new THREE.TextureLoader()
  const angleStep = (Math.PI * 2) / list.length

  list.forEach((item, index) => {
    const angle = index * angleStep

    // 高中低循环：0=高, 1=中, 2=低, 3=高, 4=中, 5=低...
    const heightPattern = index % 3
    const baseOffset = isMobile() ? 0.6 : isTablet() ? 1 : 2
    // 给每个卡片加一点随机偏移，让同类型高度不完全一样
    const randomOffset = ((index * 0.17) % 0.3) - 0.15 // 基于 index 的伪随机，范围 -0.15 ~ 0.15
    const yOffset = heightPattern === 0 ? baseOffset + randomOffset : heightPattern === 2 ? -baseOffset + randomOffset : randomOffset * 0.5

    const group = new THREE.Group()
    // 卡片在 XZ 平面的圆环上，Y 轴加上高中低偏移
    group.position.set(Math.cos(angle) * radius, yOffset, Math.sin(angle) * radius)
    // 卡片贴着圆柱外表面，正面朝外（像给圆柱贴膜）
    // 沿高度方向（Y轴）再转90度
    group.rotation.y = -angle + Math.PI / 2
    // 卡片稍微斜着一点
    group.rotation.z = -0.05

    const imgGeo = new THREE.PlaneGeometry(cardW, cardH)
    
    // 正面
    const frontMat = makeImageMaterial()
    const frontMesh = new THREE.Mesh(imgGeo, frontMat)
    group.add(frontMesh)
    
    // 背面（翻转180度，不是镜像）
    const backMat = makeImageMaterial()
    const backMesh = new THREE.Mesh(imgGeo, backMat)
    backMesh.rotation.y = Math.PI
    backMesh.position.z = -0.01
    group.add(backMesh)

    ringGroup!.add(group)

    const card = {
      group,
      frontMat,
      backMat,
      imgGeo,
      tex: null as THREE.Texture | null,
      angle,
    }
    cards.push(card)

    // 加载图片贴图
    loader.load(
      resolveImg(item.img),
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        tex.anisotropy = renderer ? Math.min(renderer.capabilities.getMaxAnisotropy(), 8) : 4
        card.tex = tex
        card.frontMat.map = tex
        card.frontMat.needsUpdate = true
        card.backMat.map = tex
        card.backMat.needsUpdate = true
      },
      undefined,
      () => {},
    )

    // 入场动画
    const delay = Math.min(index * 0.03, 0.6)
    gsap.to(frontMat, { opacity: 1, duration: 0.8, ease: 'power2.out', delay })
    gsap.to(backMat, { opacity: 1, duration: 0.8, ease: 'power2.out', delay })
  })
}

const rotateSpeed = 0.003

const animate = () => {
  if (!renderer || !scene || !camera) return

  // 匀速旋转
  if (ringGroup) ringGroup.rotation.y -= rotateSpeed

  renderer.render(scene, camera)
  rafId = requestAnimationFrame(animate)
}

let lastDeviceType = '' // 'mobile' | 'tablet' | 'desktop'

const getDeviceType = () => {
  if (isMobile()) return 'mobile'
  if (isTablet()) return 'tablet'
  return 'desktop'
}

const onResize = () => {
  const currentDeviceType = getDeviceType()
  
  // 如果设备类型切换了，完全重建整个场景
  if (currentDeviceType !== lastDeviceType) {
    lastDeviceType = currentDeviceType
    // 销毁旧场景
    if (rafId) cancelAnimationFrame(rafId)
    rafId = null
    disposeCards()
    ringGroup?.clear()
    renderer?.dispose()
    renderer = null
    scene = null
    camera = null
    ringGroup = null
    // 重新初始化
    initThree()
    buildRing()
    animate()
    return
  }
  
  applyLayout()
}

const destroyThree = () => {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = null

  window.removeEventListener('resize', onResize)

  disposeCards()
  ringGroup?.clear()

  renderer?.dispose()
  renderer = null
  scene = null
  camera = null
  ringGroup = null
}

onMounted(async () => {
  if (!import.meta.client) return
  lastDeviceType = getDeviceType()
  initThree()
  await nextTick()
  await buildRing()
  window.addEventListener('resize', onResize)
  animate()
})

onUnmounted(() => {
  destroyThree()
})

watch(
  () => props.items?.length,
  async (len) => {
    if (!import.meta.client) return
    if (!len) return
    // 已初始化后，数据变了就重建
    if (scene && ringGroup) {
      await nextTick()
      await buildRing()
    }
  },
)
</script>

<style scoped>
.card-round-root {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.card-round-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
</style>