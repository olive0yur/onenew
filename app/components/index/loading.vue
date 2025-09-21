<template>
  <div>
    <div
      v-if="isLoading"
      class="h-[100vh] w-full bg-[black] flex items-center justify-center"
    >
      <span class="text-xl font-medium text-white">
        LOADING
        <span
          v-for="(dot, index) in dots"
          :key="index"
          :class="{
            'opacity-100': visibleDots > index,
            'opacity-0': visibleDots <= index,
          }"
          class="transition-opacity duration-300 ease-in-out"
        >
          .
        </span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  getLoading: [loading: boolean];
}>();
import { ref, onMounted, onUnmounted } from "vue";
const isLoading = ref(true);
// 可配置的参数
const dotCount = 3; // 点的数量
const intervalTime = 150; // 间隔时间（毫秒）

const dots = ref(Array(dotCount).fill("."));
const visibleDots = ref(0);
let intervalId: NodeJS.Timeout | null = null;

const animateDots = () => {
  visibleDots.value = (visibleDots.value + 1) % (dotCount + 1);

  // 当三个点都显示完成后，设置 isLoading 为 false
  if (visibleDots.value === 0) {
    // 延迟一下再隐藏，让用户能看到完整的三个点
    setTimeout(() => {
      isLoading.value = false;
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        emit("getLoading", true);
      }
    }, intervalTime);
  }
};

onMounted(() => {
  intervalId = setInterval(animateDots, intervalTime);
});

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>
