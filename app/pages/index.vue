<template>
  <div class="overflow-x-hidden">
    <div>
      <section class="relative w-[100vw] h-[100vh]">
        <div class="w-full h-[100vh] bg-[#3B4EFF]/50 blue-mask"></div>
        <div class="px-[40px] absolute bottom-0 left-0 right-0 logo-container">
          <img src="/static/oneNew.svg" alt="" class="w-[100%]" />
        </div>
        <img
          src="/images/index/bg.jpg"
          alt=""
          class="w-full h-[100vh] object-cover bg-image fixed top-0 left-0 z-[-1]"
        />
      </section>
      <!-- section-1 关于我们 -->
      <section
        class="section-1 w-[100vw] min-h-[100vh] bg-[#F8F8F8] p-[40px] overflow-hidden rotate-[0deg] mt-[30vh]"
      >
        <div class="text-[16px] text-[#000]">
          <span class="mr-[4px]"> /</span>
          <span style="font-family: 'Noto'">关于我们</span>
        </div>
        <div
          class="text-[#0B0B0B] font-['Inter'] text-[160px] font-normal capitalize leading-[160px] mb-[40px]"
        >
          creativity
        </div>
        <div
          class="text-[16px] pl-[20px] border-l-[2px] border-[#000] flex items-center h-[48px] mb-[36px]"
        >
          <span class="font-['Inter'] mr-[5px]">ABOUT</span>
          <span class="font-['Noto'] mr-[16px]">关于</span>
          <img src="/static/Frame.svg" alt="" class="w-[20px] h-[20px]" />
        </div>
        <div class="flex flex-col items-end overflow-hidden">
          <div
            v-for="(describe, index) in describes"
            :key="describe.index"
            :ref="(el: any) => setDescribeRef(el, index)"
            class="describe-item flex flex-col border-b-[1px] border-[#DCDCDC] py-[40px] w-full max-w-[1318px] cursor-pointer relative"
          >
            <!-- index -->
            <span
              class="font-['Inter'] text-[16px] text-[#3B4EFF] absolute top-[40px] left-[-64px] uppercase font-[400]"
              >/ {{ 0 + describe.index }}</span
            >
            <!-- 主要内容行 -->
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center">
                <span
                  class="font-['Inter'] text-[64px] font-normal leading-[64px] text-[#000] mr-[16px]"
                  >{{ describe.title }}</span
                >
                <span class="font-['Noto'] text-[32px]">{{
                  describe.description
                }}</span>
              </div>
              <img
                :src="
                  expandedItems[describe.index]
                    ? '/static/minus.svg'
                    : '/static/add.svg'
                "
                alt=""
                class="w-[24px] h-[24px] cursor-pointer transition-transform duration-300 hover:scale-110"
                @click="toggleExpand(describe.index)"
              />
            </div>
            <!-- 展开的remark内容 -->
            <transition name="expand" @enter="onEnter" @leave="onLeave">
              <div
                v-if="expandedItems[describe.index]"
                class="remark-content w-full overflow-hidde"
              >
                <p class="h-[40px]"></p>
                <p
                  class="font-['Noto'] text-[16px] leading-[32px] text-[#666] whitespace-pre-line max-w-[935px]"
                >
                  {{ describe.remark }}
                </p>
              </div>
            </transition>
          </div>
        </div>
      </section>
      <!-- section-2  -->
      <section
        class="section-2 h-[400vh] w-[100vw] bg-[#F3F3F3] overflow-hidden"
      >
        <div
          class="section-2-wrap h-[100vh] flex justify-center items-center gap-[16px] relative"
        >
          <!-- 左侧文字 -->
          <div
            class="section2-text-left flex flex-col items-end justify-center z-10"
          >
            <span
              class="font-['Inter'] text-[64px] text-[#000] whitespace-nowrap leading-[64px] mb-[40px]"
            >
              The Work
            </span>
            <span class="font-['Noto'] text-[32px] text-[#000] leading-[32px]">
              看作品
            </span>
          </div>

          <!-- 中央图片 -->

          <img
            src="/images/index/shoes.png"
            class="expand-image h-[100vh] absolute object-cover right-[10px]"
            alt=""
          />

          <!-- 右侧文字 -->
          <div
            class="section2-text-right flex flex-col items-start justify-center z-10"
          >
            <span
              class="font-['Inter'] text-[64px] text-[#000] whitespace-nowrap leading-[64px] mb-[40px]"
            >
              Can Speak
            </span>
            <span class="font-['Noto'] text-[32px] text-[#000] leading-[32px]"
              >见实力</span
            >
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger, SplitText);

const ctx: any = ref(null);
const lenis: any = ref(null);
const describeRefs: any = ref([]);
// 用于跟踪每个item的展开状态
const expandedItems: any = ref({});

// 设置每个describe item的ref
const setDescribeRef = (el: any, index: number) => {
  if (el) {
    describeRefs.value[index] = el;
  }
};

// 切换展开状态的函数（手风琴效果 - 同时只能展开一个）
const toggleExpand = (index: string) => {
  // 如果当前item已经展开，则收起它
  if (expandedItems.value[index]) {
    expandedItems.value[index] = false;
  } else {
    // 先收起所有其他item
    Object.keys(expandedItems.value).forEach((key) => {
      expandedItems.value[key] = false;
    });
    // 然后展开当前item
    expandedItems.value[index] = true;
  }
};

// 展开进入动画
const onEnter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  element.style.height = "0";
  element.style.opacity = "0";
  element.offsetHeight; // 强制重排

  element.style.transition = "height 0.2s ease-out, opacity 0.3s ease-out";
  element.style.height = element.scrollHeight + "px";
  element.style.opacity = "1";

  setTimeout(done, 50);
};

// 展开离开动画
const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  element.style.height = element.scrollHeight + "px";
  element.offsetHeight; // 强制重排

  element.style.transition = "height 0.3s ease-in, opacity 0.2s ease-in";
  element.style.height = "0";
  element.style.opacity = "0";

  setTimeout(done, 500);
};

const initLenis = () => {
  lenis.value = new Lenis({
    // 最短的持续时间，几乎无延迟
    duration: 0.1,
    // 最高敏感度，直接响应
    wheelMultiplier: 1,
    touchMultiplier: 1,
    // 关闭平滑滚动
    smoothWheel: true,
    // 关闭触摸平滑
    syncTouch: true,
    // 线性缓动，无阻尼
    easing: (t) => t,
    // 最小插值，几乎无平滑
    lerp: 0.5,
  });
  lenis.value.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.value.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.fps(120);
};

const renderIndex = () => {
  ctx.value = gsap.context(() => {
    // 初始动画可以用 timeline（因为是顺序播放的）
    const initialTl = gsap.timeline();
    // bg-image 入场动画
    initialTl.to(".bg-image", {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    // 设置 bg-image 初始状态
    gsap.set(".bg-image", {
      transformOrigin: "50% 50%",
      x: "-5vw",
      y: "60vh",
      rotation: 5,
    });

    // ScrollTrigger 动画应该独立使用，不加入 timeline
    // logo-container 和 blue-mask 滚动动画
    gsap.to([".logo-container", ".blue-mask"], {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "100vh top",
        scrub: 1.5,
      },
      x: "-10vw",
      y: "-100vh",
      rotation: -15,
      ease: "sine.inOut",
    });

    // 设置 section-1 初始状态
    gsap.set(".section-1", {
      transformOrigin: "50% 50%",
      x: "-10vw",
      y: "0",
      rotation: 5,
    });

    // section-1 滚动动画
    gsap.to(".section-1", {
      scrollTrigger: {
        trigger: ".section-1",
        start: "top 100%",
        end: "top 50%",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
      x: 0,
      y: 0,
      rotation: 0,
      ease: "sine.inOut",
    });

    // describe 元素动画
    describeRefs.value.forEach((el: any) => {
      gsap.set(el, {
        transformOrigin: "50% 50%",
        x: "50%",
        opacity: 0, // 应该是从 0 开始
      });

      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 80%",
          scrub: 1.5,
          toggleActions: "play none none reverse",
        },
        x: 0,
        opacity: 1,
        ease: "sine.inOut",
      });
    });

    // Section 2 文字和图片动画 - 应该同时进行
    const section2Tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".section-2",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
        toggleActions: "restart none none reverse",
        pin: ".section-2-wrap", // 如果需要固定，应该固定 section-2 本身
      },
    });

    // 左侧文字动画
    section2Tl.fromTo(
      ".section2-text-left",
      { opacity: 1 },
      { x: "-60vw", opacity: 1, ease: "power2.out" },
      0 // 从时间点 0 开始
    );

    // 右侧文字动画
    section2Tl.fromTo(
      ".section2-text-right",
      { opacity: 1 },
      { x: "60vw", opacity: 1, ease: "power2.out" },
      0 // 从时间点 0 开始，与左侧文字同时进行
    );

    // 图片放大动画
    section2Tl.fromTo(
      ".expand-image",
      { scale: 0 },
      { scale: 1, ease: "power2.out" },
      0 // 从时间点 0 开始，与文字动画同时进行
    );
  });
};

onMounted(() => {
  initLenis(); // 初始化 Lenis 平滑滚动
  renderIndex();
});

onUnmounted(() => {
  // 清理 Lenis
  if (lenis.value) {
    lenis.value.destroy();
  }
  // 清理 GSAP context
  if (ctx.value) {
    ctx.value.revert();
  }
});

const describes = ref([
  {
    title: "Brand Analysis & Insight ",
    description: "品牌分析洞察",
    image1: "/static/add.svg",
    image2: "/static/add.svg",
    remark:
      "Onew​​ 是一家专注于高端数字体验设计的创意工作室。我们以颠覆性的设计思维重新诠释品牌在数字世界的表达方式，深度挖掘每个品牌独特的创新基因。通过将前沿设计美学与极致用户体验完美融合，我们为企业提供从品牌战略规划、视觉形象塑造到交互体验设计的全链路定制服务",
    index: "1",
  },
  {
    title: "Visual Creative Design",
    description: "设计视觉创意",
    image1: "/static/add.svg",
    image2: "/static/add.svg",
    remark:
      "Onew​​ 是一家专注于高端数字体验设计的创意工作室。我们以颠覆性的设计思维重新诠释品牌在数字世界的表达方式，深度挖掘每个品牌独特的创新基因。通过将前沿设计美学与极致用户体验完美融合，我们为企业提供从品牌战略规划、视觉形象塑造到交互体验设计的全链路定制服务",
    index: "2",
  },
  {
    title: "Interactive Development",
    description: "开发交互体验",
    image1: "/static/add.svg",
    image2: "/static/add.svg",
    remark:
      "Onew​​ 是一家专注于高端数字体验设计的创意工作室。我们以颠覆性的设计思维重新诠释品牌在数字世界的表达方式，深度挖掘每个品牌独特的创新基因。通过将前沿设计美学与极致用户体验完美融合，我们为企业提供从品牌战略规划、视觉形象塑造到交互体验设计的全链路定制服务",
    index: "3",
  },
  {
    title: "Maintenance and Optimization",
    description: "持续优化维护",
    image1: "/static/add.svg",
    image2: "/static/add.svg",
    remark:
      "Onew​​ 是一家专注于高端数字体验设计的创意工作室。我们以颠覆性的设计思维重新诠释品牌在数字世界的表达方式，深度挖掘每个品牌独特的创新基因。通过将前沿设计美学与极致用户体验完美融合，我们为企业提供从品牌战略规划、视觉形象塑造到交互体验设计的全链路定制服务",
    index: "4",
  },
]);
</script>
<style scoped>
/* remark内容样式优化 */
.remark-content {
  transform: translateZ(0); /* 启用GPU加速 */
  backface-visibility: hidden; /* 防止闪烁 */
  will-change: height, opacity; /* 提示浏览器这些属性会改变 */
}

/* describe-item 悬浮边框渐变效果 */
.describe-item {
  position: relative;
  transition: all 0.3s ease;
}

.describe-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #3b4eff;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  z-index: 1;
}

.describe-item:hover::after {
  transform: scaleX(1);
  transform-origin: right;
}

/* 当悬浮离开时，从右边收回 - 使用不同的缓动函数 */
.describe-item:not(:hover)::after {
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}
.expand-image {
  scale: 0;
}
</style>
