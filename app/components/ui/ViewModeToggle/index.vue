<template>
  <div class="flex gap-[20px]" :class="containerClass">
    <div 
      class="list-button flex items-center justify-center cursor-pointer" 
      :class="{ 'active': modelValue === 'list', 'disabled': disabled }"
      @click="handleClick('list')"
      @mouseenter="handleButtonHover($event)"
      :style="buttonStyle"
    >
      <img 
        :src="modelValue === 'list' ? '/static/star.svg' : '/static/star-white.svg'" 
        alt="" 
        class="button-icon" 
        :style="iconStyle"
      >
      List
    </div>
    <div 
      class="ring-button flex items-center justify-center cursor-pointer" 
      :class="{ 'active': modelValue === 'ring', 'disabled': disabled }"
      @click="handleClick('ring')"
      @mouseenter="handleButtonHover($event)"
      :style="buttonStyle"
    >
      <img 
        :src="modelValue === 'ring' ? '/static/star.svg' : '/static/star-white.svg'" 
        alt="" 
        class="button-icon" 
        :style="iconStyle"
      >
      Ring
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: 'list' | 'ring'
  disabled?: boolean
  size?: 'default' | 'small'
  containerClass?: string
}

interface Emits {
  (e: 'update:modelValue', value: 'list' | 'ring'): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'default',
  containerClass: ''
})

const emit = defineEmits<Emits>()

// 根据 size 计算按钮和图标的样式
const buttonStyle = computed(() => {
  if (props.size === 'small') {
    return {
      width: '56px',
      height: '20px',
      fontSize: '12px'
    }
  }
  return {}
})

const iconStyle = computed(() => {
  if (props.size === 'small') {
    return {
      width: '12px',
      height: '12px'
    }
  }
  return {}
})

// 处理点击事件
const handleClick = (mode: 'list' | 'ring') => {
  if (!props.disabled) {
    emit('update:modelValue', mode)
  }
}

// 处理按钮hover时SVG闪烁三次
const handleButtonHover = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement
  const icon = button.querySelector('.button-icon') as HTMLElement
  
  if (icon && !icon.classList.contains('blinking')) {
    icon.classList.add('blinking')
    // 动画结束后移除类（0.9s = 3次闪烁）
    setTimeout(() => {
      icon.classList.remove('blinking')
    }, 900)
  }
}
</script>

<style scoped>
/* 按钮样式 - 全局使用 */
.list-button {
  /* 桌面端：自适应大小 */
  padding: clamp(3px, 0.3vw, 4px) clamp(12px, 1vw, 16px);
  font-family: Inter;
  font-size: clamp(18px, 1.5vw, 24px);
  font-weight: 400;
  line-height: clamp(24px, 2vw, 32px);
  border-radius: 44.44px;
  background: rgba(218, 218, 218, 0.60);
  backdrop-filter: blur(12.5px);
  gap: clamp(3px, 0.3vw, 4px);
  color: #fff;
  transition: all 0.3s ease;
  
  img {
    width: clamp(18px, 1.5vw, 24px);
    height: clamp(18px, 1.5vw, 24px);
    transition: all 0.3s ease;
  }
  
  &.active {
    color: #3B4EFF;
    background: rgba(59, 78, 255, 0.10);
  }
  
  /* 移动端：固定较小尺寸 */
  @media (max-width: 768px) {
    padding: 3px 12px;
    font-size: 12px;
    line-height: 24px;
    gap: 3px;
    
    img {
      width: 16px;
      height: 16px;
    }
  }
}

.ring-button {
  /* 桌面端：自适应大小 */
  padding: clamp(3px, 0.3vw, 4px) clamp(12px, 1vw, 16px);
  font-family: Inter;
  font-size: clamp(18px, 1.5vw, 24px);
  font-weight: 400;
  line-height: clamp(24px, 2vw, 32px);
  border-radius: 44.44px;
  background: rgba(218, 218, 218, 0.60);
  backdrop-filter: blur(12.5px);
  gap: clamp(3px, 0.3vw, 4px);
  color: #fff;
  transition: all 0.3s ease;
  
  img {
    width: clamp(18px, 1.5vw, 24px);
    height: clamp(18px, 1.5vw, 24px);
    transition: all 0.3s ease;
  }
  
  &.active {
    color: #3B4EFF;
    background: rgba(59, 78, 255, 0.10);
  }
  
  /* 移动端：固定较小尺寸 */
  @media (max-width: 768px) {
    padding: 3px 12px;
    font-size: 12px;
    line-height: 24px;
    gap: 3px;
    
    img {
      width: 16px;
      height: 16px;
    }
  }
}

/* SVG闪烁动画 - 闪烁三次 */
@keyframes iconBlink {
  0%, 100% { opacity: 1; }
  16.67% { opacity: 0; }
  33.33% { opacity: 1; }
  50% { opacity: 0; }
  66.67% { opacity: 1; }
  83.33% { opacity: 0; }
}

.button-icon.blinking {
  animation: iconBlink 0.9s ease-in-out;
}

/* 按钮禁用状态 */
.list-button.disabled,
.ring-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
</style>

