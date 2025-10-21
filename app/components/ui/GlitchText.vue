<template>
  <span
    @mouseenter="startGlitch"
    @mouseleave="resetText"
    ref="textRef"
    class="inline-block relative"
  >
    <!-- 原始文字（不可见但占位） -->
    <span class="invisible ">{{ props.text }}</span>
    <!-- 动画文字（绝对定位覆盖在上面） -->
    <span class="absolute top-0 left-0 whitespace-nowrap  hover:underline underline-offset-4">{{ displayText }}</span>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Props {
  text: string;
  speed?: number; // 每个字符切换的速度（毫秒）
  iterations?: number; // 每个字符随机切换的次数
}

const props = withDefaults(defineProps<Props>(), {
  speed: 20,
  iterations: 3,
});

const displayText = ref(props.text);
const textRef = ref<HTMLElement | null>(null);
const isAnimating = ref(false);

// 随机字符池：小写字母、大写字母、特殊符号（特殊符号权重更高）
const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const specialChars = '_|/[__]';

// 获取随机字符（70%概率返回特殊符号，30%概率返回字母）
const getRandomChar = () => {
  const useSpecial = Math.random() < 0.7; // 70%概率使用特殊符号
  if (useSpecial) {
    return specialChars[Math.floor(Math.random() * specialChars.length)];
  } else {
    return letters[Math.floor(Math.random() * letters.length)];
  }
};

// 开始破译动画
const startGlitch = async () => {
  if (isAnimating.value) return;
  isAnimating.value = true;

  const originalText = props.text;
  const textLength = originalText.length;
  let currentIteration = 0;

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

// 重置文本（离开时的效果）
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

onMounted(() => {
  displayText.value = props.text;
});

// 暴露方法给父组件调用
defineExpose({
  startGlitch,
  resetText
});
</script>

<style scoped>
.invisible {
  visibility: hidden;
}

.absolute {
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
}
</style>

