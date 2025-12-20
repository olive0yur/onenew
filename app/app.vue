<template>
  <div>
    <NuxtLayout>
      <KeepAlive>
        <NuxtPage />
      </KeepAlive>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useWebCount } from '~/composables/api';

const router = useRouter();

onMounted(() => {
  // 检测设备类型
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const deviceType = isMobile ? 'mobile' : 'pc';
  
  useWebCount({ type: deviceType });
});

// 监听路由变化,确保页面滚动到顶部
router.afterEach(() => {
  // 使用 nextTick 确保 DOM 更新后再滚动
  nextTick(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  });
});
</script>
