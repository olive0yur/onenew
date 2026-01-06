<template>
  <div ref="wrapperRef" class="workflow-wrapper">
    <section ref="sectionRef" class="workflow-section">
      <div class="workflow-container">
        <!-- 背景图片层 -->
        <div class="workflow-bg">
          <transition name="fade" mode="out-in">
            <img
              v-if="currentBgSrc"
              :key="String(currentIndex)"
              :src="currentBgSrc"
              alt="background"
              class="workflow-bg__img"
            />
          </transition>
        </div>

        <!-- 内容容器 -->
        <div class="workflow-content">
          <div
            v-for="(item, idx) in items"
            :key="itemKey(item, idx)"
            :ref="el => setItemRef(el, idx)"
            class="workflow-item"
          >
            <div class="workflow-item__label">{{ safeText(item?.[labelKey]) }}</div>
            <div class="workflow-item__desc">{{ safeText(item?.[descKey]) }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

type AnyFn = (...args: any[]) => any;

const props = withDefaults(
  defineProps<{
    items?: any[];
    imgKey?: string;
    labelKey?: string;
    descKey?: string;
    resolveSrc?: AnyFn;
  }>(),
  {
    items: () => [],
    imgKey: 'img',
    labelKey: 'label',
    descKey: 'dict_value',
    resolveSrc: (v: any) => (v == null ? '' : String(v)),
  }
);

const wrapperRef = ref<HTMLElement | null>(null);
const sectionRef = ref<HTMLElement | null>(null);
const itemRefs = ref<(HTMLElement | null)[]>([]);
const currentIndex = ref(0);
const scrollTriggers = ref<ScrollTrigger[]>([]);

const safeText = (v: any) => (v == null ? '' : String(v));

const itemKey = (item: any, idx: number) => {
  const id = item?.id ?? item?.dict_type_id ?? item?.order_index;
  return id == null ? idx : String(id);
};

const setItemRef = (el: any, idx: number) => {
  if (el) {
    itemRefs.value[idx] = el as HTMLElement;
  }
};

const currentBgSrc = computed(() => {
  const list = props.items || [];
  if (list.length === 0) return '';
  const idx = Math.min(Math.max(currentIndex.value, 0), list.length - 1);
  const raw = list[idx]?.[props.imgKey];
  try {
    return props.resolveSrc(raw);
  } catch {
    return '';
  }
});

const initScrollTrigger = () => {
  if (!import.meta.client || !sectionRef.value || !wrapperRef.value) return;

  const items = itemRefs.value.filter(Boolean) as HTMLElement[];
  if (items.length === 0) return;

  const totalItems = items.length;
  
  // 设置 wrapper 的高度来撑开滚动距离
  // 每个 item 需要一个视口高度的滚动距离
  gsap.set(wrapperRef.value, {
    height: `${(totalItems + 1) * 100}vh`,
  });

  // Pin 住整个 section，在 wrapper 滚动时保持固定
  const pinST = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top top',
    end: () => `+=${totalItems * window.innerHeight}`,
    pin: true,
    pinSpacing: false,
    onUpdate: (self) => {
      const progress = self.progress;
      const newIndex = Math.min(
        Math.floor(progress * totalItems),
        totalItems - 1
      );
      currentIndex.value = Math.max(0, newIndex);
    },
  });
  scrollTriggers.value.push(pinST);

  // 为每个 item 创建从右到左的动画
  items.forEach((item, idx) => {
    // 初始状态：在右侧外面
    gsap.set(item, {
      x: '100%',
      opacity: 0,
    });

    // 计算每个 item 的滚动区间
    const itemStart = idx / totalItems;
    const itemEnd = (idx + 1) / totalItems;

    // 创建时间线
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: () => `+=${totalItems * window.innerHeight}`,
        scrub: 1,
      },
    });

    // 进入动画：从右侧滑入
    tl.to(item, {
      x: '0%',
      opacity: 1,
      duration: 0.3,
    }, itemStart);

    // 停留
    tl.to(item, {
      x: '0%',
      opacity: 1,
      duration: 0.4,
    }, itemStart + 0.3);

    // 退出动画：淡出（如果不是最后一个）
    if (idx < totalItems - 1) {
      tl.to(item, {
        opacity: 0,
        duration: 0.3,
      }, itemEnd - 0.3);
    }
  });
};

const cleanup = () => {
  scrollTriggers.value.forEach(st => st.kill());
  scrollTriggers.value = [];
  
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === sectionRef.value) {
      st.kill();
    }
  });
};

onMounted(() => {
  nextTick(() => {
    initScrollTrigger();
  });
});

watch(
  () => props.items,
  () => {
    cleanup();
    currentIndex.value = 0;
    itemRefs.value = [];
    nextTick(() => {
      initScrollTrigger();
    });
  },
  { deep: false }
);

onUnmounted(() => {
  cleanup();
});
</script>

<style scoped>
.workflow-wrapper {
  position: relative;
  width: 100%;
}

.workflow-section {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  z-index: -1;
}

.workflow-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.workflow-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.workflow-bg__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.workflow-content {
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  width: 100%;
  max-width: 450px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.workflow-item {
  padding: 24px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  will-change: transform, opacity;
}

.workflow-item__label {
  font-size: 24px;
  font-weight: 600;
  color: #0b0b0b;
  line-height: 1.3;
  margin-bottom: 12px;
}

.workflow-item__desc {
  font-size: 16px;
  line-height: 1.6;
  color: rgba(11, 11, 11, 0.75);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 400ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .workflow-content {
    right: 4%;
    max-width: 90%;
  }

  .workflow-item {
    padding: 20px;
  }

  .workflow-item__label {
    font-size: 20px;
  }

  .workflow-item__desc {
    font-size: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
