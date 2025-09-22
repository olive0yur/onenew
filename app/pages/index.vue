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
        class="section-2 min-h-[100vh] bg-[#F3F3F3] relative flex justify-center items-center gap-[20px]"
      >
        <div class="flex flex-col items-end justify-center">
          <span
            class="section2-text font-['Inter'] text-[64px] text-[#000] leading-[64px] mb-[40px]"
            >The Work</span
          >
          <span
            class="section2-text font-['Noto'] text-[32px] text-[#000] leading-[32px]"
            >看作品</span
          >
        </div>
        <img src="/images/index/shoes.png" class="w-[0px]" alt="" />
        <div class="flex flex-col items-start justify-center">
          <span
            class="section2-text font-['Inter'] text-[64px] text-[#000] leading-[64px] mb-[40px]"
            >Can Speak</span
          >
          <span
            class="section2-text font-['Noto'] text-[32px] text-[#000] leading-[32px]"
            >见实力</span
          >
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);
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

  element.style.transition = "height 0.5s ease-out, opacity 0.5s ease-out";
  element.style.height = element.scrollHeight + "px";
  element.style.opacity = "1";

  setTimeout(done, 250);
};

// 展开离开动画
const onLeave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  element.style.height = element.scrollHeight + "px";
  element.offsetHeight; // 强制重排

  element.style.transition = "height 0.5s ease-in, opacity 0.5s ease-in";
  element.style.height = "0";
  element.style.opacity = "0";

  setTimeout(done, 500);
};

const initLenis = () => {
  lenis.value = new Lenis({
    // 最短的持续时间，几乎无延迟
    duration: 0.1,
    // 最高敏感度，直接响应
    wheelMultiplier: 0.2,
    touchMultiplier: 1,
    // 关闭平滑滚动
    smoothWheel: true,
    // 关闭触摸平滑
    syncTouch: true,
    // 线性缓动，无阻尼
    easing: (t) => t,
    // 最小插值，几乎无平滑
    lerp: 1.5,
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
    // 创建时间轴动画
    const tl = gsap.timeline();
    // 设置初始状态：从中间位置向下偏移，带初始旋转
    gsap.set(".bg-image", {
      transformOrigin: "50% 50%", // 以中心为旋转原点
      x: "-5vw",
      y: "60vh", // 从屏幕下方开始
      rotation: 5, // 初始旋转角度
    });
    // 动画：从中间位置垂直推上来，带旋转效果
    tl.to(".bg-image", {
      x: 0,
      y: 0, // 推到正常位置
      rotation: 0, // 旋转到正常角度
      duration: 1,
      ease: "power2.inOut", // 先快后慢再快，无回弹效果
    });

    // logo-container 和 blue-mask 一起滚动动画
    gsap.to([".logo-container", ".blue-mask"], {
      scrollTrigger: {
        trigger: "body", // 以整个页面作为触发器
        start: "top top", // 从页面顶部开始
        end: "100vh top", // 滚动到第二个section（透明div）完全显示
        scrub: 1.5, // 增加延迟，让动画更润滑
      },
      x: "-10vw",
      y: "-100vh", // 向上移动一个屏幕高度
      rotation: -15, // 逆时针旋转15度
      ease: "sine.inOut", // 使用最润滑的缓动函数
    });

    // 设置 section-1 初始状态：从远处快速撞过来
    gsap.set(".section-1", {
      transformOrigin: "50% 50%", // 以中心为旋转原点
      x: "-10vw", // 从更远的左边开始
      rotation: 5, // 更大的初始旋转角度
    });
    // section-1 撞击式入场动画
    gsap.to(".section-1", {
      scrollTrigger: {
        trigger: ".section-1",
        start: "top 75%",
        end: "top 80%", // 立即触发，不跟随滚动
        scrub: 1,
        toggleActions: "play none none reverse",
      },
      x: 0,
      y: 0, // 推到正常位置
      rotation: 0, // 旋转到正常角度
      duration: 1, // 更短的撞击时间
      ease: "sine.inOut",
    });

    describeRefs.value.forEach((el: any, index: number) => {
      gsap.set(el, {
        transformOrigin: "50% 50%",
        x: "50%",
        opacity: 1,
      });
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%", // 更早开始动画
          end: "top 70%", // 更长的动画距离
          scrub: 2, // 更紧密跟随滚动
          toggleActions: "play none none reverse", // 支持反向动画
        },
        x: 0,
        opacity: 1,
        duration: 1, // 更长的动画时间
        ease: "power2.out", // 更自然的缓动效果
      });
    });
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
  background: #a4a3a3;
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
</style>
