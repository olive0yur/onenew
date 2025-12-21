<template>
  <span ref="numberRef">{{ displayNumber }}</span>
</template>

<script setup lang="ts">
interface NumberScrollProps {
  target: number
  duration?: number
}

const props = withDefaults(defineProps<NumberScrollProps>(), {
  duration: 2000 // 默认动画时长2秒
})

const displayNumber = ref(0)
const numberRef = ref<HTMLElement | null>(null)
const hasAnimated = ref(false)

// 数字滚动动画（匀速）
const animateNumber = () => {
  const startTime = Date.now()
  const startValue = 0
  const endValue = props.target
  
  const animate = () => {
    const currentTime = Date.now()
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / props.duration, 1)
    
    // 匀速，不使用缓动函数
    displayNumber.value = Math.floor(startValue + (endValue - startValue) * progress)
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      displayNumber.value = endValue
    }
  }
  
  animate()
}

// 重新播放动画 - 供外部调用
const replay = () => {
  displayNumber.value = 0
  hasAnimated.value = true
  animateNumber()
}

// 监听元素是否进入视口
onMounted(() => {
  if (!numberRef.value) return
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          hasAnimated.value = true
          animateNumber()
          observer.disconnect() // 动画开始后断开观察器
        }
      })
    },
    {
      threshold: 0.1 // 当元素10%可见时触发
    }
  )
  
  observer.observe(numberRef.value)
})

// 监听 target 变化，重新开始动画
watch(() => props.target, () => {
  if (hasAnimated.value) {
    displayNumber.value = 0
    hasAnimated.value = false
    animateNumber()
  }
})

// 暴露方法给父组件
defineExpose({
  replay
})
</script>

