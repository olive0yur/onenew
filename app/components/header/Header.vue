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
      <span @click="openMenu" class="nav-button flex items-center">
        MENU 菜单
        <!-- <button
          @click="value = !value"
          class="relative inline-flex h-[22px] w-[44px] items-center rounded-full transition-colors duration-500 ease-in-out focus:outline-none"
          :class="value ? 'bg-white' : 'bg-black'"
        >
          <span
            class="inline-block h-[13px] w-[13px] transform rounded-full transition-all duration-500 ease-in-out translate-y-[-1px]"
            :class="[
              value ? 'translate-x-[25px] bg-black' : 'translate-x-[6px] bg-white'
            ]"
          ></span>
        </button> -->
      </span>
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

      <!-- <span
        class="cursor-pointer hover:underline underline-offset-4 nav-item-menu absolute right-[40px]"
        >MENU</span
      > -->
    </div>

    <div class="menu fixed z-[1001] w-[100vw] top-0 left-0 bg-[rgba(255,255,255,0.6)]">
      <div class="bg-[#3B4EFF] px-[40px] pt-[25px] menu-content relative">
        <div class="flex justify-between items-center text-[16px] text-[#EEE]">
            <img
              src="/static/logo.svg"
              alt=""
              class="w-auto h-[17px] cursor-pointer"
            />
          <span class="cursor-pointer hover:underline underline-offset-4" @click="closeMenu">CLOSE 关闭</span>
        </div>

        <div class="mt-[120px] flex flex-col w-[288px]">
          <div>
            <img src="/images/image140.png" alt="" class="w-[288px] h-[162px] text-[16px] text-[#EEE]">
            <div class="flex justify-between items-center">
              <span>灵感来源于足够的休息</span>
              <span>{{ currentTime }}</span>
            </div>
          </div>
        </div>

        <div class="mt-[66px] flex flex-col w-[288px]">
          <span>Atlanta, Georgia, USA</span>
          <span>15252507831</span>
          <span>1761973105@qq.com</span>
        </div>

        <div class="mt-[40px] flex flex-col w-[288px]">
          <div class="w-[223px] h-[48px] bg-[#DCE4EF] flex justify-between items-center px-[20px] text-[#000]">
            GET IN TOUCH 联系
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8H2" stroke="black"/>
              <path d="M10 4L14 8L10 12" stroke="black"/>
            </svg>
          </div >

        </div>

        <div class="mt-[84px] h-[1px] bg-[#fff] opacity-20"></div>

        <div class="h-[72px] flex justify-end items-center text-[24px] text-[#EEE]">
          <span class="mr-[60px]">X 推特</span>
          <span>RED BOOK 小红书</span>
        </div>

        <!-- 右侧文字 -->
        <div 
          class="absolute flex flex-col z-[1002] top-[161px] right-[319px]"
          @mouseleave="hoveredIndex = null"
        >
          <div 
            v-for="(item, index) in menuItems" 
            :key="item.path"
            class="menu-item-wrapper relative cursor-pointer mb-[20px] transition-opacity duration-300"
            :class="{ 'dimmed': hoveredIndex !== null && hoveredIndex !== index }"
            @mouseenter="hoveredIndex = index"
            :ref="el => setMenuItemRef(el, index)"
          >
            <div class="flex items-baseline relative">
              <div class="flex items-baseline menu-text-wrapper">
                <span class="text-[64px] text-[#EEE]">{{ item.enName }}</span>
                <span class="text-[32px] text-[#EEE] ml-[16px]">{{ item.cnName }}</span>
              </div>
              <svg class="menu-arrow ml-[12px]" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path d="M28 16H4" stroke="white" stroke-width="2"/>
                <path d="M20 8L28 16L20 24" stroke="white" stroke-width="2"/>
              </svg>
            </div>
            <div class="menu-underline" :style="{ '--underline-width': underlineWidths[index] + 'px' }"></div>
          </div>
        </div> 
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const opacity = ref(1);
const value = ref(false);
const currentTime = ref("");
const hoveredIndex = ref<number | null>(null);
const underlineWidths = ref<number[]>([0, 0, 0, 0]);
const menuItemRefs: (HTMLElement | null)[] = [];
let timeInterval: NodeJS.Timeout | null = null;

// 菜单项数据
const menuItems = [
  { enName: 'HOME', cnName: '首页', path: '/' },
  { enName: 'WORKS', cnName: '案例', path: '/works' },
  { enName: 'ABOUT', cnName: '关于', path: '/about' },
  { enName: 'CONTACT', cnName: '联系', path: '/contact' }
];

const opacityValue = computed(() => opacity.value / 100);

// 设置菜单项引用并计算文字+SVG的总宽度
const setMenuItemRef = (el: any, index: number) => {
  if (el) {
    menuItemRefs[index] = el;
    // 在下一帧计算宽度，确保元素已渲染
    setTimeout(() => {
      const contentWrapper = el.querySelector('.flex.items-baseline.relative');
      if (contentWrapper) {
        // 计算文字和SVG的总宽度
        const textWrapper = contentWrapper.querySelector('.menu-text-wrapper');
        const svg = contentWrapper.querySelector('.menu-arrow');
        if (textWrapper && svg) {
          underlineWidths.value[index] = textWrapper.offsetWidth + 12 + 30; // 文字宽度 + margin-left(12px) + SVG宽度(22px)
        }
      }
    }, 0);
  }
};

// 更新当前时间
const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTime.value = `${hours}:${minutes}:${seconds}`;
};

onMounted(() => {
  titleOpcity();
  navItemsDisappear();
  // 立即更新一次时间
  updateTime();
  // 每秒更新时间
  timeInterval = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  // 清理定时器
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});

const navItemsDisappear = () => {
  gsap.registerPlugin(ScrollTrigger);

  // 计算按钮需要移动到最右边span位置的距离
  const button = document.querySelector(".nav-button");
  const lastSpan = document.querySelector(".nav-item-3");
  const menuItem = document.querySelector(".nav-item-menu");

  // 设置 MENU 的初始状态：隐藏在右边
  if (menuItem) {
    gsap.set(menuItem, {
      x: 100,
      opacity: 0,
    });
  }

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
          x: moveDistance-30, // 移动到最右边span的位置
          duration: 0.8,
          ease: "power2.inOut",
        },
        0 // 与整个动画同时开始
      )
      // .to(
      //   ".nav-item-menu",
      //   {
      //     x: 0,
      //     opacity: 1,
      //     duration: 0.5,
      //     ease: "power2.out",
      //   },
      // );
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

const closeMenu = () => {
  gsap.to(".menu-content", {
    paddingTop: 0,
    paddingBottom: 0,
    duration: 0.5,
    ease: "power2.inOut",
  });
  gsap.to(".menu", {
    height: 0,
    duration: 0.5,
    ease: "power2.inOut",
  });
  // 恢复页面滚动
  document.documentElement.classList.remove("no-scroll");
};

const openMenu = () => {
  gsap.to(".menu-content", {
    paddingTop: 25,
    paddingBottom: 25,
    duration: 0.5,
    ease: "power2.inOut",
  });
  gsap.to(".menu", {
    height: "100vh",
    duration: 0.5,
    ease: "power2.inOut",
  });
  // 禁用页面滚动
  document.documentElement.classList.add("no-scroll");
};
</script>

<style scoped>
.menu{
  height: 0;
  overflow: hidden;
  filter: blur(0px);
}

.menu-content {
  padding-top: 0;
  padding-bottom: 0;
}

/* SVG 箭头默认隐藏 */
.menu-arrow {
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 悬浮时 SVG 出现并向右移动 */
.menu-item-wrapper:hover .menu-arrow {
  opacity: 1;
  transform: translateX(10px);
}

/* 菜单项底部线条 */
.menu-underline {
  position: absolute;
  bottom: -8px;
  left: 0;
  width: 0;
  height: 4px;
  background-color: white;
  transition: width 0.4s ease-out;
  --underline-width: 0;
}

/* 悬浮时线条展开，长度为文字内容的实际宽度 */
.menu-item-wrapper:hover .menu-underline {
  width: var(--underline-width);
}

/* 其他菜单项变暗 */
.menu-item-wrapper.dimmed {
  opacity: 0.3;
}

/* 当前悬浮项保持完全不透明 */
.menu-item-wrapper:hover {
  opacity: 1 !important;
}
</style>
