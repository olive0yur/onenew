<template>
  <div 
    @mouseenter="onHover" 
    @mouseleave="onLeave"
    :style="{
      width: width,
      height: height,
      '--border-color': borderColor,
      '--border-color-hover': borderColorHover,
      '--border-width': borderWidth,
      '--text-color': textColor,
      '--text-color-hover': textColorHover,
      '--bg-color': bgColor,
      '--bg-color-hover': bgColorHover,
      '--arrow-color': arrowColor,
      '--arrow-color-hover': arrowColorHover,
      borderLeftColor: borderColor,
      borderLeftWidth: borderWidth,
      color: textColor,
      backgroundColor: bgColor
    }"
    class="contact-button group transition-all duration-300 ease-in-out flex justify-between items-center px-[20px] box-border border-l border-solid cursor-pointer"
  >
    <span 
      class="text-[16px] font-[400] transition-colors duration-300 whitespace-nowrap button-text"
    >
      {{ displayText }}
    </span>
    <svg 
      class="transition-colors duration-300 button-arrow" 
      xmlns="http://www.w3.org/2000/svg" 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none"
    >
      <path 
        class="arrow-path transition-colors duration-300" 
        d="M14 8H2"
      />
      <path 
        class="arrow-path transition-colors duration-300" 
        d="M10 4L14 8L10 12"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Props {
  text?: string;
  speed?: number;
  iterations?: number;
  // 尺寸
  width?: string;
  height?: string;
  // 边框
  borderColor?: string;
  borderWidth?: string;
  borderColorHover?: string;
  // 文字颜色
  textColor?: string;
  textColorHover?: string;
  // 背景色
  bgColor?: string;
  bgColorHover?: string;
  // 箭头颜色
  arrowColor?: string;
  arrowColorHover?: string;
}

const props = withDefaults(defineProps<Props>(), {
  text: 'GET IN TOUCH 联系',
  speed: 30,
  iterations: 3,
  width: '223px',
  height: '48px',
  borderColor: '#fff',
  borderWidth: '2px',
  borderColorHover: '#fff',
  textColor: '#fff',
  textColorHover: '#000',
  bgColor: 'transparent',
  bgColorHover: '#DCE4EF',
  arrowColor: 'white',
  arrowColorHover: '#000'
});

const emit = defineEmits<{
  hover: []
  leave: []
}>();

const displayText = ref(props.text);
const isAnimating = ref(false);

// 随机字符池
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const specialChars = '_|/[__]';

// 获取随机字符
const getRandomChar = () => {
  const useSpecial = Math.random() < 0.7;
  if (useSpecial) {
    return specialChars[Math.floor(Math.random() * specialChars.length)];
  } else {
    return letters[Math.floor(Math.random() * letters.length)];
  }
};

// 开始 glitch 动画
const startGlitch = async () => {
  if (isAnimating.value) return;
  isAnimating.value = true;

  const originalText = props.text;
  const textLength = originalText.length;

  // 对每个字符进行动画
  for (let i = 0; i < textLength; i++) {
    let iterations = 0;
    
    // 每个字符随机切换指定次数
    while (iterations < props.iterations) {
      await new Promise(resolve => setTimeout(resolve, props.speed));
      
      // 已解密的字符 + 当前随机字符 + 后续随机字符
      displayText.value = 
        originalText.substring(0, i) + 
        getRandomChar() + 
        Array.from({ length: textLength - i - 1 }, () => getRandomChar()).join('');
      
      iterations++;
    }
    
    // 显示当前位置的真实字符
    displayText.value = 
      originalText.substring(0, i + 1) + 
      Array.from({ length: textLength - i - 1 }, () => getRandomChar()).join('');
  }
  
  // 确保最终显示完整的原始文本
  displayText.value = originalText;
  isAnimating.value = false;
};

// 重置文本动画（离开时的效果）
const resetText = async () => {
  if (isAnimating.value) return;
  isAnimating.value = true;

  const originalText = props.text;
  const textLength = originalText.length;

  // 从后往前快速消失效果
  for (let i = textLength - 1; i >= 0; i--) {
    await new Promise(resolve => setTimeout(resolve, props.speed / 2));
    
    // 已消失的部分用随机字符替换
    displayText.value = 
      originalText.substring(0, i) + 
      Array.from({ length: textLength - i }, () => getRandomChar()).join('');
  }

  // 快速闪烁几次随机字符
  for (let j = 0; j < 3; j++) {
    await new Promise(resolve => setTimeout(resolve, props.speed));
    displayText.value = Array.from({ length: textLength }, () => getRandomChar()).join('');
  }

  // 恢复原始文本
  displayText.value = originalText;
  isAnimating.value = false;
};

const onHover = () => {
  startGlitch();
  emit('hover');
};

const onLeave = () => {
  resetText();
  emit('leave');
};
</script>

<style scoped>
.contact-button:hover {
  border-left-color: var(--border-color-hover) !important;
  color: var(--text-color-hover) !important;
  background-color: var(--bg-color-hover) !important;
}

.contact-button:hover .button-text {
  color: var(--text-color-hover) !important;
}

.contact-button:hover .arrow-path {
  stroke: var(--arrow-color-hover) !important;
}

.arrow-path {
  stroke: var(--arrow-color);
}
</style>

