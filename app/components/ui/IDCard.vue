<template>
  <div class="id-card-container" ref="containerRef">
    <!-- 绳子 - 使用原始图片 -->
    <div 
      class="lanyard"
      :style="{
        height: `${lanyardLength}px`,
        transform: `translateX(-50%) rotate(${ropeAngle}deg)`,
        transformOrigin: 'top center'
      }"
    >
      <div class="lanyard-inner"></div>
    </div>

    <!-- 卡片主体 -->
    <div 
      class="card-wrapper"
      ref="cardRef"
      :style="{
        transform: `translate(${cardPosition.x}px, ${cardPosition.y}px) translateX(-50%) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg)`,
        cursor: isDragging ? 'grabbing' : 'grab'
      }"
    >
      <!-- 连接环 -->
      <div class="ring">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="15" stroke="#111" stroke-width="3" />
          <circle cx="20" cy="20" r="15" stroke="white" stroke-width="1" stroke-opacity="0.5" />
        </svg>
      </div>

      <!-- 卡片图片 (3D 双面) -->
      <div class="card-body">
        <div class="card-face front">
          <div class="glare" :style="glareStyle"></div>
          <img 
            :src="cardImageUrl" 
            alt="ID Card" 
            class="card-image" 
            draggable="false"
            @error="onImageError"
            @load="onImageLoad"
          />
        </div>
        <div class="card-face back">
          <img 
            :src="cardImageUrl" 
            alt="ID Card Back" 
            class="card-image" 
            draggable="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import * as THREE from 'three'

// 卡片图片 URL
const cardImageUrl = '/static/card.svg'

// 调试用
const onImageError = (e: Event) => {
  console.error('Image failed to load:', e)
}
const onImageLoad = () => {
  console.log('Image loaded successfully')
}

// --- 配置参数 ---
const CONFIG = {
  // 弹簧绳参数
  restLength: 160,        // 自然长度
  springK: 0.08,          // 弹簧系数 (越小越软，弹性越大)
  damping: 0.96,          // 阻尼 (0.9-0.99，越大摆动越久)
  
  // 物理参数
  gravity: 0.6,           // 重力 (每帧)
  mass: 1,                // 质量
  
  // 旋转参数
  rotDamping: 0.94,       // 旋转阻尼
  rotSpring: 0.05,        // 旋转回正弹簧
  
  // 交互
  tapImpulse: 12,
  throwMultiplier: 0.8,
}

// --- 状态 ---
const containerRef = ref<HTMLElement | null>(null)
const cardRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

// 物理状态 - 简单直接
const physics = reactive({
  x: 0,
  y: CONFIG.restLength,
  vx: 0,
  vy: 0,
  
  // 3D 旋转
  rotX: 0,
  rotY: 0,
  rotZ: 0,
  wX: 0,
  wY: 0,
  wZ: 0,
})

// 拖拽状态
const dragOffset = { x: 0, y: 0 }
let dragHistory: Array<{ x: number; y: number; time: number }> = []

// 动画
let animationFrameId: number | null = null

// --- 物理更新 (每帧调用) ---
const updatePhysics = () => {
  if (!isDragging.value) {
    // === 弹簧物理 ===
    
    // 当前绳长
    const dx = physics.x
    const dy = physics.y
    const len = Math.sqrt(dx * dx + dy * dy)
    
    if (len > 0.1) {
      // 单位向量
      const nx = dx / len
      const ny = dy / len
      
      // 弹簧力: F = -k * (len - restLength)
      // 方向指向锚点 (即 -n 方向)
      const stretch = len - CONFIG.restLength
      const springF = CONFIG.springK * stretch
      
      // 弹簧力分量 (指向锚点)
      const fx = -springF * nx
      const fy = -springF * ny
      
      // 重力 (向下)
      const gx = 0
      const gy = CONFIG.gravity
      
      // 加速度 = 力 / 质量
      const ax = (fx + gx) / CONFIG.mass
      const ay = (fy + gy) / CONFIG.mass
      
      // 更新速度
      physics.vx += ax
      physics.vy += ay
      
      // 应用阻尼
      physics.vx *= CONFIG.damping
      physics.vy *= CONFIG.damping
      
      // 更新位置
      physics.x += physics.vx
      physics.y += physics.vy
      
      // 不能到锚点上方
      if (physics.y < 20) {
        physics.y = 20
        physics.vy = Math.abs(physics.vy) * 0.3
      }
    }
    
    // === 3D 旋转 ===
    
    // Y轴旋转 - 由横向速度驱动
    const targetRotY = -physics.vx * 0.04
    physics.wY += (targetRotY - physics.rotY) * CONFIG.rotSpring
    physics.wY *= CONFIG.rotDamping
    physics.rotY += physics.wY
    
    // X轴旋转 - 由纵向速度驱动
    const targetRotX = physics.vy * 0.02
    physics.wX += (targetRotX - physics.rotX) * CONFIG.rotSpring
    physics.wX *= CONFIG.rotDamping
    physics.rotX += physics.wX
    
    // Z轴旋转 - 跟随绳子角度
    const ropeAngle = Math.atan2(physics.x, physics.y)
    const targetRotZ = ropeAngle * 0.3
    physics.wZ += (targetRotZ - physics.rotZ) * 0.03
    physics.wZ *= 0.96
    physics.rotZ += physics.wZ
    
  } else {
    // 拖拽时轻微旋转
    physics.rotY += (-physics.vx * 0.005 - physics.rotY) * 0.1
    physics.rotX += (physics.vy * 0.003 - physics.rotX) * 0.1
    physics.wX *= 0.9
    physics.wY *= 0.9
    physics.wZ *= 0.9
  }
  
  animationFrameId = requestAnimationFrame(updatePhysics)
}

// --- 计算属性 ---
const lanyardLength = computed(() => {
  return Math.sqrt(physics.x * physics.x + physics.y * physics.y)
})

const ropeAngle = computed(() => {
  return -Math.atan2(physics.x, physics.y) * (180 / Math.PI)
})

const cardPosition = computed(() => ({
  x: physics.x,
  y: physics.y
}))

// 旋转角度转换为度数，并限制范围
const rotationX = computed(() => {
  const deg = physics.rotX * (180 / Math.PI)
  return Math.max(-30, Math.min(30, deg))
})
const rotationY = computed(() => {
  const deg = physics.rotY * (180 / Math.PI)
  return Math.max(-45, Math.min(45, deg))
})
const rotationZ = computed(() => {
  const deg = physics.rotZ * (180 / Math.PI)
  return Math.max(-20, Math.min(20, deg))
})

// 光泽效果
const glareStyle = computed(() => {
  const xPercent = 50 + physics.rotY * 40
  const yPercent = 50 + physics.rotX * 40
  const opacity = Math.min(0.7, Math.max(0, Math.abs(physics.rotY) * 0.8 + Math.abs(physics.rotX) * 0.5))
  
  return {
    background: `radial-gradient(circle at ${xPercent}% ${yPercent}%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 50%)`,
    opacity: opacity,
  }
})

// --- 交互事件 ---
const handleTap = () => {
  if (isDragging.value) return
  
  // 向下+随机横向冲量
  physics.vy += CONFIG.tapImpulse
  physics.vx += (Math.random() - 0.5) * CONFIG.tapImpulse * 0.8
  
  // 随机旋转
  physics.wX += (Math.random() - 0.5) * 0.2
  physics.wY += (Math.random() - 0.5) * 0.3
}

const startDrag = (e: MouseEvent | TouchEvent) => {
  e.preventDefault()
  isDragging.value = true
  
  const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX ?? 0
  const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY ?? 0

  if (containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    const anchorX = rect.left + rect.width / 2
    const anchorY = rect.top

    dragOffset.x = physics.x - (clientX - anchorX)
    dragOffset.y = physics.y - (clientY - anchorY)
  }

  // 停止当前运动
  physics.vx = 0
  physics.vy = 0
  dragHistory = []
  
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
  window.addEventListener('touchmove', onDrag, { passive: false })
  window.addEventListener('touchend', stopDrag)
}

const onDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !containerRef.value) return
  e.preventDefault()

  const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0]?.clientX ?? 0
  const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0]?.clientY ?? 0

  const rect = containerRef.value.getBoundingClientRect()
  const anchorX = rect.left + rect.width / 2
  const anchorY = rect.top

  let targetX = clientX - anchorX + dragOffset.x
  let targetY = clientY - anchorY + dragOffset.y

  // 不能拉到上方
  if (targetY < 20) targetY = 20

  // 计算拖拽速度 (用于旋转)
  physics.vx = targetX - physics.x
  physics.vy = targetY - physics.y

  // 记录历史
  const now = performance.now()
  dragHistory.push({ x: targetX, y: targetY, time: now })
  if (dragHistory.length > 10) dragHistory.shift()

  // 更新位置
  physics.x = targetX
  physics.y = targetY
}

const stopDrag = () => {
  if (!isDragging.value) return
  
  // 计算甩出速度
  if (dragHistory.length >= 2) {
    const recent = dragHistory[dragHistory.length - 1]
    const older = dragHistory[Math.max(0, dragHistory.length - 4)]
    
    if (recent && older) {
      const dt = (recent.time - older.time)
      
      if (dt > 10) { // 至少 10ms
        // 速度 = 位移 / 时间，转换为每帧的速度
        const vx = (recent.x - older.x) / dt * 16 * CONFIG.throwMultiplier
        const vy = (recent.y - older.y) / dt * 16 * CONFIG.throwMultiplier
        
        // 限制最大速度
        const maxV = 30
        physics.vx = Math.max(-maxV, Math.min(maxV, vx))
        physics.vy = Math.max(-maxV, Math.min(maxV, vy))
        
        // 根据甩出速度添加旋转
        physics.wY += -physics.vx * 0.02
        physics.wX += physics.vy * 0.01
      }
    }
  }
  
  dragHistory = []
  isDragging.value = false
  
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', stopDrag)
}

// --- 生命周期 ---
onMounted(() => {
  physics.x = 0
  physics.y = CONFIG.restLength
  physics.vx = 0
  physics.vy = 0
  animationFrameId = requestAnimationFrame(updatePhysics)
  
  // 绑定卡片事件
  if (cardRef.value) {
    cardRef.value.addEventListener('mousedown', startDrag)
    cardRef.value.addEventListener('touchstart', startDrag, { passive: false })
    cardRef.value.addEventListener('click', handleTap)
  }
})

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  
  if (cardRef.value) {
    cardRef.value.removeEventListener('mousedown', startDrag)
    cardRef.value.removeEventListener('touchstart', startDrag)
    cardRef.value.removeEventListener('click', handleTap)
  }
  
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
  window.removeEventListener('touchmove', onDrag)
  window.removeEventListener('touchend', stopDrag)
})
</script>

<style scoped>
.id-card-container {
  position: relative;
  width: 100%;
  height: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  overflow: visible;
  user-select: none;
  -webkit-user-select: none;
  perspective: 1500px;
}

/* 绳子 */
.lanyard {
  position: absolute;
  top: 0;
  left: 50%;
  width: 30px;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
  border-radius: 0 0 5px 5px;
  will-change: transform, height;
}

.lanyard-inner {
  width: 100%;
  height: 100%;
  background-image: url('/static/line.svg');
  background-repeat: repeat-y;
  background-position: top center;
  background-size: 100% auto;
}

/* 卡片包装器 */
.card-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 10;
  transform-origin: top center;
  will-change: transform;
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: none;
  -webkit-tap-highlight-color: transparent;
  transform-style: preserve-3d;
}

/* 连接环 */
.ring {
  width: 40px;
  height: 40px;
  margin-top: -20px;
  margin-bottom: -15px;
  z-index: 5;
  position: relative;
  transform: translateZ(2px);
}

/* 卡片主体 */
.card-body {
  position: relative;
  z-index: 10;
  width: 300px;
  transform-style: preserve-3d;
  will-change: transform;
}

/* 卡片各个面 */
.card-face {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border-radius: 15px;
  background: white;
  overflow: hidden;
}

.card-face.front {
  position: relative;
  transform: translateZ(2px);
}

.card-face.back {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotateY(180deg) translateZ(2px);
  background: white;
}

.card-face.back .card-image {
  transform: scaleX(-1);
}

.card-image {
  width: 100%;
  height: auto;
  display: block;
  -webkit-user-drag: none;
  border-radius: 15px;
  /* 确保图片可见 */
  visibility: visible;
  opacity: 1;
}

/* 卡片厚度 */
.card-face.front::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 15px;
  z-index: -1;
  box-shadow: 
    0 1px 0 #ccc,
    0 2px 0 #bbb,
    0 3px 0 #aaa,
    0 4px 0 #999;
  transform: translateZ(-2px);
}

/* 阴影 */
.card-body::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 90%;
  height: 90%;
  transform: translate(-50%, -50%) translateZ(-60px);
  background: rgba(0, 0, 0, 0.2);
  filter: blur(20px);
  border-radius: 20px;
  z-index: -10;
  opacity: 0.6;
}

/* 光泽层 */
.glare {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 20;
  mix-blend-mode: overlay;
  border-radius: 15px;
  transition: opacity 0.1s;
}
</style>
