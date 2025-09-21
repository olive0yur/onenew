<template>
  <header
    :style="{
      opacity: opacityValue,
    }"
    class="fixed top-0 left-0 right-0 z-[1000] bg-transparent pt-[24px] px-[40px] text-white flex justify-between items-center transition-opacity duration-300 ease-in-out"
  >
    <div>
      <img
        src="/static/logo.svg"
        alt=""
        class="w-auto h-[17px] cursor-pointer"
      />
    </div>
    <div
      class="nav flex items-center gap-[120px] text-[16px] text-[#EEE] font-[400] leading-[16px]"
    >
      <span class="nav-button">按钮</span>
      <!-- <USwitch v-model="value" /> -->
      <span
        class="cursor-pointer hover:underline underline-offset-4 nav-item nav-item-1"
        >WORKS 案例</span
      >
      <span
        class="cursor-pointer hover:underline underline-offset-4 nav-item nav-item-2"
        >ABOUT 关于</span
      >
      <span
        class="cursor-pointer hover:underline underline-offset-4 nav-item nav-item-3"
        >CONTACT 联系</span
      >
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const opacity = ref(1);
const value = ref(true);
const opacityValue = computed(() => opacity.value / 100);
onMounted(() => {
  titleOpcity();
  navItemsDisappear();
});

const navItemsDisappear = () => {
  gsap.registerPlugin(ScrollTrigger);

  // 计算按钮需要移动到最右边span位置的距离
  const button = document.querySelector(".nav-button");
  const lastSpan = document.querySelector(".nav-item-3");

  if (button && lastSpan) {
    const buttonRect = button.getBoundingClientRect();
    const lastSpanRect = lastSpan.getBoundingClientRect();
    const moveDistance = lastSpanRect.left - buttonRect.left;

    // 创建时间轴动画，让三个span依次消失和出现
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "20px top", // 滚动60px后开始
        end: "40px top",
        scrub: false,
        toggleActions: "play none reverse none", // 进入时播放，退出时反向播放
      },
    });

    // 定义流畅的连续动画序列
    tl.to(".nav-item-1", {
      y: -30,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    })
      .to(
        ".nav-item-2",
        {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.2" // 重叠0.2秒，创造流畅过渡
      )
      .to(
        ".nav-item-3",
        {
          y: -30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.2" // 重叠0.2秒，创造流畅过渡
      )
      .to(
        ".nav-button",
        {
          x: moveDistance, // 移动到最右边span的位置
          duration: 0.8,
          ease: "power2.inOut",
        },
        0 // 与整个动画同时开始
      );
  }
};

const titleOpcity = () => {
  setTimeout(() => {
    // 使用动画逐步增加透明度从1到100
    let currentOpacity = 1;
    const interval = setInterval(() => {
      if (currentOpacity <= 100) {
        opacity.value = currentOpacity;
        currentOpacity += 2; // 每次增加2，可以调整这个值来控制动画速度
      } else {
        clearInterval(interval);
      }
    }, 5); // 每10ms更新一次，总共约500ms完成动画
  }, 50);
};
</script>

<style scoped></style>
