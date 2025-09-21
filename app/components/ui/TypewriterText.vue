<template>
  <span class="typewriter-container">
    <span>{{ displayedText }}</span>
    <span class="cursor">|</span>
  </span>
</template>

<script setup lang="ts">
interface Props {
  text: string;
  speed?: number; // 打字速度（毫秒）
  delay?: number; // 开始前延迟（毫秒）
  cursorBlinkSpeed?: number; // 光标闪烁速度（毫秒）
}

const props = withDefaults(defineProps<Props>(), {
  speed: 50,
  delay: 500,
  cursorBlinkSpeed: 500,
});

const displayedText = ref("");
const isTyping = ref(false);

// 打字机效果逻辑
const startTypewriter = async () => {
  // 开始前延迟
  await new Promise((resolve) => setTimeout(resolve, props.delay));

  isTyping.value = true;

  for (let i = 0; i <= props.text.length; i++) {
    displayedText.value = props.text.slice(0, i);
    await new Promise((resolve) => setTimeout(resolve, props.speed));
  }

  isTyping.value = false;
};

// 组件挂载时开始动画
onMounted(() => {
  startTypewriter();
});
</script>

<style scoped>
.typewriter-container {
  display: inline-block;
}

.cursor {
  color: inherit;
  font-weight: inherit;
  margin-left: 4px; /* 增加光标与文字的距离 */
  animation: blink 1s infinite; /* 光标一直闪烁 */
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}
</style>
