<template>
  <div>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
    <Toast />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useWebCount } from '~/composables/api';
import { useLenis } from '~/composables/useLenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const router = useRouter();
const { scrollToTop } = useLenis();

onMounted(() => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const deviceType = isMobile ? 'mobile' : 'pc';
  useWebCount({ type: deviceType });
});

// 离开旧页面前立即重置滚动，确保新页面 onMounted 时 scrollY 已经是 0
router.beforeEach(() => {
  scrollToTop();
});

// 路由切换后，等待 DOM 稳定（旧页面卸载、新页面渲染完毕）后强制刷新 ScrollTrigger
router.afterEach(() => {
  if (import.meta.client) {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);
  }
});
</script>
