<template>
  <div class="rotating-cards-container" :style="containerStyle">
    <!-- 旋转卡片区域 -->
    <div class="rotating-cards-area">
      <!-- 中心文字 -->
      <div class="center-text">
        <p v-for="(line, index) in centerTextLines" :key="index">
          {{ line }}
        </p>
      </div>
      
      <!-- 旋转卡片 -->
      <div
        v-for="(item, idx) in items"
        :key="idx"
        class="rotating-card"
        :style="getCardStyle(idx)"
      >
        <img :src="getItemSrc(item)" :alt="getItemAlt(item)" />
      </div>
    </div>
    
    <!-- 中心内容插槽 -->
    <div class="center-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDictList } from "~/composables/api";
type AnyFn = (...args: any[]) => any;

const props = withDefaults(
  defineProps<{
    items?: any[];
    orbitDurationSec?: number;
    srcKey?: string;
    altKey?: string;
    resolveSrc?: AnyFn;
    maxRadius?: number;
    minRadius?: number;
  }>(),
  {
    items: () => [],
    orbitDurationSec: 80,
    srcKey: "img",
    altKey: "dict_value",
    resolveSrc: (v: any) => (v == null ? "" : String(v)),
    maxRadius: 920,
    minRadius: 520,
  }
);

const containerStyle = computed(() => {
  return {
    "--orbit-duration": `${props.orbitDurationSec}s`,
    "--max-radius": `${props.maxRadius}px`,
    "--min-radius": `${props.minRadius}px`,
  } as any;
});

const getCardStyle = (index: number) => {
  const totalCards = props.items.length;
  if (totalCards === 0) return {};

  const progress = index / totalCards; // 0~1
  return {
    animationDelay: `${-progress * props.orbitDurationSec}s`,
  } as any;
};

const getItemSrc = (item: any) => {
  const raw = item?.[props.srcKey];
  try {
    return props.resolveSrc(raw);
  } catch {
    return "";
  }
};

const getItemAlt = (item: any) => {
  const raw = item?.[props.altKey];
  return raw == null ? "" : String(raw);
};

// 中心文字数据
const centerTextLines = ref<string[]>([]);

onMounted(async () => {
  try {
    const res: any = await getDictList({
      typeName: "contact_business_title",
    });
    
    if (res?.data?.length > 0) {
      const data = res.data[0];
      // 第一行显示 dict_type，第二行显示 dict_value
      centerTextLines.value = [
        data.label || "",
        data.dict_value || ""
      ].filter(line => line); // 过滤掉空字符串
    }
  } catch (error) {
    console.error("Failed to load center text:", error);
  }
});
</script>

<style scoped>
/* 旋转卡片容器 */
.rotating-cards-container {
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0; /* 允许容器收缩以适应 flex 父容器 */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  pointer-events: none;

  /* 圆形轨道半径：用 vw + clamp 做自适应 */
  --orbit-radius: clamp(var(--min-radius), 40vw, var(--max-radius));
  --orbit-duration: var(--orbit-duration, 32s);
  /* 圆心偏移系数：屏幕越宽，系数越小（圆心越往上） */
  --orbit-center-offset: 0.23;
}

/* 根据屏幕宽度调整圆心位置 */
@media screen and (min-width: 1600px) {
  .rotating-cards-container {
    --orbit-center-offset: 0.18;
  }
}

@media screen and (min-width: 1920px) {
  .rotating-cards-container {
    --orbit-center-offset: 0.12;
  }
}

@media screen and (min-width: 2560px) {
  .rotating-cards-container {
    --orbit-center-offset: 0.05;
  }
}

.rotating-cards-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(238, 238, 241, 0.00) 25%, #F8F8F8 100%);
  pointer-events: none;
  z-index: 5;
}

@media screen and (max-width: 768px) {
  .rotating-cards-container::after {
    display: none;
  }
  
  .rotating-cards-area::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, rgba(238, 238, 241, 0.00) 25%, #F8F8F8 100%);
    pointer-events: none;
    z-index: 5;
  }
}

/* 旋转卡片区域 */
.rotating-cards-area {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 768px) {
  .rotating-cards-container {
    flex-direction: column;
    min-height: auto;
    overflow: visible;
    pointer-events: auto;
  }
  
  .rotating-cards-area {
    min-height: 350px;
    overflow: hidden;
    pointer-events: none;
    flex-shrink: 0;
  }
}

/* 中心文字 */
.center-text {
  position: absolute;
  /* bottom: clamp(140px, calc(var(--orbit-radius) * 0.08), 150px); */
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  margin-top: 30px;
  pointer-events: none;
  /* background: red; */
}

.center-text p {
  color: rgba(0, 0, 0, 0.10);
  text-align: center;
  font-family: Inter, sans-serif;
  font-size: clamp(28px, calc(var(--orbit-radius) * 0.074), 68px);
  font-style: normal;
  font-weight: 500;
  line-height: clamp(42px, calc(var(--orbit-radius) * 0.11), 102px);
  text-transform: capitalize;
  white-space: nowrap;
}

@media screen and (max-width: 768px) {
  .center-text {
    position: relative;
    /* bottom: auto; */
    left: 0;
    transform: none;
    margin-top: -150px;
    padding: 0 20px;
  }
  
  .center-text p {
    font-size: clamp(28px, 6vw, 36px);
    line-height: clamp(38.4px, 8vw, 48px);
  }
}

/* 中心内容区域 */
.center-content {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  width: 100%;
}

@media screen and (max-width: 768px) {
  .center-content {
    position: relative;
    left: 0;
    transform: none;
    bottom: auto;
    margin-top: -300px;
    width: 100%;
  }
}

.rotating-card {
  position: absolute;
  /* 响应式宽高：手机端80px，平板100-120px，桌面端140px */
  width: clamp(80px, 10vw, 130px);
  height: clamp(80px, 10vw, 130px);
  /* border-radius: clamp(16px, 2vw, 24px); */
  overflow: hidden;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.14);

  /* 圆形轨道：把圆心放到容器下方，让可视区域只呈现上半圆 */
  offset-path: circle(var(--orbit-radius) at 50% calc(100% + var(--orbit-radius) * var(--orbit-center-offset)));
  offset-rotate: auto 0deg;
  animation: orbit var(--orbit-duration) linear infinite;
}

@media screen and (max-width: 768px) {
  .rotating-card {
    /* 移动端调整轨道圆心位置 */
    offset-path: circle(var(--orbit-radius) at 50% calc(100% - var(--orbit-radius) * 0.2));
  }
}

.rotating-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@keyframes orbit {
  /* 圆形轨道上半圆：起点在最右侧(0%)，顶部在 25% */
  0% {
    offset-distance: 0%;
    transform: scale(0.9);
  }
  25% {
    offset-distance: 25%;
    transform: scale(1);
  }
  50% {
    offset-distance: 50%;
    transform: scale(0.92);
  }
  75% {
    offset-distance: 75%;
    transform: scale(0.78);
  }
  100% {
    offset-distance: 100%;
    transform: scale(0.9);
  }
}

/* 兼容兜底：不支持 motion-path 时回退到圆周 rotate */
@supports not (offset-path: circle(10px at 50% 50%)) {
  .rotating-card {
    offset-path: none;
    animation: fallbackOrbit var(--orbit-duration) linear infinite;
    transform-origin: center center;
  }

  @keyframes fallbackOrbit {
    from {
      transform: rotate(0deg) translateY(-280px) rotate(0deg);
    }
    to {
      transform: rotate(360deg) translateY(-280px) rotate(-360deg);
    }
  }
}
</style>


