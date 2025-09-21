<template>
  <div class="overflow-x-hidden">
    <div>
      <div class="relative w-[100vw] h-[100vh]">
        <div class="w-full h-[100vh] bg-[#3B4EFF]/50 blue-mask"></div>
        <div class="px-[40px] absolute bottom-0 left-0 right-0 logo-container">
          <img src="/static/oneNew.svg" alt="" class="w-[100%]" />
        </div>
        <img
          src="/images/index/bg.jpg"
          alt=""
          class="w-full h-[100vh] object-cover bg-image fixed top-0 left-0 z-[-1]"
        />
      </div>
      <div class="w-[100vw] h-[10vh] bg-[transparent]"></div>
      <!-- section-1 关于我们 -->
      <div
        class="section-1 w-[100vw] min-h-[100vh] bg-[#F8F8F8] p-[40px] overflow-hidden rotate-[0deg]"
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
                class="remark-content w-full mt-[20px] px-[20px] py-[16px] overflow-hidden"
              >
                <p
                  class="font-['Noto'] text-[16px] leading-[32px] text-[#666] whitespace-pre-line max-w-[935px]"
                >
                  {{ describe.remark }}
                </p>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <!-- section-2  -->
      <div class="section-2 min-h-[200vh] bg-[#F3F3F3] relative">
        <div
          class="section-2-content flex items-center justify-center h-screen"
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
          <img
            src="/images/index/shoes.png"
            class="shoes-image h-auto relative z-[10] opacity-0"
            alt=""
          />
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
        </div>
      </div>
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
const toggleExpand = (index: number) => {
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

// 动画钩子函数 - 进入动画
const onEnter = (el: HTMLElement) => {
  el.style.height = "0";
  el.style.opacity = "0";
  el.offsetHeight; // 强制重排

  el.style.transition = "height 0.25s ease-out, opacity 0.25s ease-out";
  el.style.height = el.scrollHeight + "px";
  el.style.opacity = "1";
};

// 动画钩子函数 - 离开动画
const onLeave = (el: HTMLElement) => {
  el.style.height = el.scrollHeight + "px";
  el.offsetHeight; // 强制重排

  el.style.transition = "height 0.2s ease-in, opacity 0.2s ease-in";
  el.style.height = "0";
  el.style.opacity = "0";
};

const initLenis = () => {
  lenis.value = new Lenis({
    // 更短的持续时间，但保持平滑
    duration: 0.8,
    // 进一步降低敏感度
    wheelMultiplier: 0.4,
    touchMultiplier: 0.8,
    // 平滑滚动
    smoothWheel: true,
    // 启用触摸平滑
    syncTouch: true,
    // 使用最平滑的缓动
    easing: (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2),
    // 增加平滑度
    lerp: 0.1, // 线性插值，让滚动更平滑
  });

  // 连接 Lenis 和 ScrollTrigger
  lenis.value.on("scroll", ScrollTrigger.update);

  // 优化动画循环，提高帧率
  gsap.ticker.add((time) => {
    lenis.value.raf(time * 1000);
  });

  // 设置更高的刷新率
  gsap.ticker.fps(60);
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

    gsap.set(".section-1", {
      transformOrigin: "50% 50%", // 以中心为旋转原点
      x: "-5vw",
      rotation: 5, // 初始旋转角度
    });
    // 动画：从中间位置垂直推上来，带旋转效果
    tl.to(".section-1", {
      scrollTrigger: {
        trigger: ".section-1",
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
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
        scrub: true, // 跟随滚动进度
        // markers: true, // 开发时可以打开查看触发点
      },
      x: "-10vw",
      y: "-100vh", // 向上移动一个屏幕高度
      rotation: -15, // 逆时针旋转15度
      ease: "none",
    });
  });
};

// 单独的函数来处理describe items动画
const setupDescribeAnimation = () => {
  // section-1 describe items 动画
  // 设置初始状态：从右边较小距离开始，透明度为0
  gsap.set(".describe-item", {
    x: "50%", // 从右边60px位置开始，更小的移动距离
    opacity: 0, // 初始透明度为0
    y: "15px", // 添加轻微的垂直偏移，增加动画层次
  });

  // section-2 文字动画
  // 设置初始状态：从下方20px开始，透明度为0
  gsap.set(".section2-text", {
    y: "20px", // 从下方20px位置开始
    opacity: 0, // 初始透明度为0
  });

  // 为每个describe item创建独立的ScrollTrigger，但逻辑是累积显示
  describeRefs.value.forEach((item: any, index: number) => {
    if (item) {
      ScrollTrigger.create({
        trigger: ".section-1", // 以section-1作为触发器
        start: `center-=${300 - index * 100}px 60%`, // 从section-1中心往上200px开始，每个item间隔150px触发
        end: `center+=${300 + index * 100}px 60%`, // 结束点更远，确保不会立即消失
        // markers: true, // 开发时可以打开查看触发点
        onEnter: () => {
          // 向下滚动时显示当前item（累积显示，之前的保持显示）
          gsap.to(item, {
            x: 0, // 移动到原位置
            y: 0, // 回到垂直原位置
            opacity: 1, // 透明度变为1
            duration: 0.8, // 稍微缩短动画时间
            ease: "sine.out", // 使用正弦缓动，最平滑自然的效果
            delay: index * 0.08, // 稍微缩短延迟间隔
          });
        },
        onLeaveBack: () => {
          // 向上滚动离开时隐藏当前item（从最后一个开始逐个消失）
          // 如果当前item是展开状态，先关闭它
          const itemIndex = describes.value[index]?.index;
          if (itemIndex && expandedItems.value[itemIndex]) {
            expandedItems.value[itemIndex] = false;
          }

          gsap.to(item, {
            x: "50%", // 移动到右边60px位置，与进入动画保持一致
            y: "15px", // 添加垂直偏移
            opacity: 0, // 透明度变为0
            duration: 0.5, // 稍微延长隐藏动画时间
            ease: "power2.in", // 先慢后快的缓动
          });
        },
      });
    }
  });

  // section-2 固定定位效果的ScrollTrigger
  ScrollTrigger.create({
    trigger: ".section-2", // 以section-2作为触发器
    start: "top 100%", // 当section-2顶部到达视口50%位置时开始固定
    end: "bottom 50%", // 当section-2底部到达视口50%位置时结束固定
    // markers: true, // 开发时可以打开查看触发点
    onEnter: () => {
      // 将section-2-content固定到屏幕中心
      gsap.set(".section-2-content", {
        position: "fixed",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        width: "100vw",
        height: "100vh",
        zIndex: 100,
      });
    },
    onLeave: () => {
      // 滚动离开时恢复相对定位
      gsap.set(".section-2-content", {
        position: "absolute",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        width: "auto",
        height: "100vh",
        zIndex: "auto",
      });
    },
    onLeaveBack: () => {
      // 向上滚动离开时也恢复相对定位
      gsap.set(".section-2-content", {
        position: "absolute",
        top: "0",
        left: "0",
        x: "0",
        y: "0",
        width: "auto",
        height: "100vh",
        zIndex: "auto",
      });
    },
    onEnterBack: () => {
      // 向下滚动重新进入时再次固定
      gsap.set(".section-2-content", {
        position: "fixed",
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        width: "100vw",
        height: "100vh",
        zIndex: 100,
      });
    },
  });

  // section-2 文字动画的ScrollTrigger
  ScrollTrigger.create({
    trigger: ".section-2", // 以section-2作为触发器
    start: "top 20%", // 当section-2顶部到达视口20%位置时触发
    end: "bottom 40%", // 结束点
    // markers: true, // 开发时可以打开查看触发点
    onEnter: () => {
      // 为所有section2-text元素创建动画，带递进延迟
      gsap.to(".section2-text", {
        y: 0, // 回到原位置
        opacity: 1, // 透明度变为1
        duration: 0.6, // 动画持续时间
        ease: "sine.out", // 平滑的缓动效果
        stagger: 0.15, // 每个文字元素间隔0.15秒，创造递进效果
      });
    },
    onLeaveBack: () => {
      // 向上滚动离开时重新隐藏
      gsap.to(".section2-text", {
        y: "20px", // 回到下方20px位置
        opacity: 0, // 透明度变为0
        duration: 0.4, // 更快的隐藏动画
        ease: "sine.in", // 隐藏时的缓动
        stagger: -0.1, // 反向递进，从最后一个开始隐藏
      });
    },
  });

  // section-2的分阶段动画：文字出现 -> 图片显示 -> 图片扩展
  ScrollTrigger.create({
    trigger: ".section-2", // 以section-2作为触发器
    start: "top 100%", // 当section-2顶部到达视口底部时开始
    end: "bottom top", // 当section-2底部到达视口顶部时结束
    scrub: 1, // 跟随滚动进度，添加轻微延迟使动画更平滑
    // markers: true, // 开发时可以打开查看触发点
    onUpdate: (self) => {
      // 根据滚动进度分阶段控制动画
      const progress = self.progress;

      // 阶段1（进度0-0.3）：section-2刚进入视口，文字先出现
      if (progress <= 0.3) {
        // 文字正常显示，图片保持隐藏
        gsap.set(".section-2-content > div:first-child", {
          x: 0,
          opacity: 1,
        });
        gsap.set(".section-2-content > div:last-child", {
          x: 0,
          opacity: 1,
        });

        // 图片保持隐藏状态
        gsap.set(".shoes-image", {
          width: "0px",
          height: "auto",
          opacity: 0,
          position: "relative",
          left: "auto",
          top: "auto",
          x: "0%",
          y: "0%",
          objectFit: "initial",
          zIndex: 10,
          transform: "scale(1)",
        });
      }
      // 阶段2（进度0.3-0.5）：图片开始出现并慢慢展开
      else if (progress > 0.3 && progress <= 0.5) {
        const imageAppearProgress = (progress - 0.3) / 0.2; // 重新映射图片出现进度到0-1

        // 文字保持原位
        gsap.set(".section-2-content > div:first-child", {
          x: 0,
          opacity: 1,
        });
        gsap.set(".section-2-content > div:last-child", {
          x: 0,
          opacity: 1,
        });

        // 图片慢慢出现并展开
        const currentWidth = imageAppearProgress * 200; // 从0px展开到200px
        gsap.set(".shoes-image", {
          width: currentWidth + "px",
          height: "auto",
          opacity: imageAppearProgress, // 同时淡入
          position: "relative",
          left: "auto",
          top: "auto",
          x: "0%",
          y: "0%",
          objectFit: "initial",
          zIndex: 1000,
          transform: "scale(1)",
        });
      }
      // 阶段3（进度0.5-0.8）：图片继续展开，文字开始向两边移动
      else if (progress > 0.5 && progress <= 0.8) {
        const expandProgress = (progress - 0.5) / 0.3; // 重新映射扩展进度到0-1

        // 文字开始向两边移动
        gsap.set(".section-2-content > div:first-child", {
          x: -expandProgress * 400, // 向左移动400px
          opacity: 1,
        });
        gsap.set(".section-2-content > div:last-child", {
          x: expandProgress * 400, // 向右移动400px
          opacity: 1,
        });

        // 图片继续展开
        const currentWidth = 200 + expandProgress * 300; // 从200px展开到500px
        gsap.set(".shoes-image", {
          width: currentWidth + "px",
          height: "auto",
          opacity: 1,
          position: "relative",
          left: "auto",
          top: "auto",
          x: "0%",
          y: "0%",
          objectFit: "initial",
          zIndex: 1000,
          transform: "scale(1)",
        });
      }
      // 阶段4（进度0.8-0.85）：文字快速消失
      else if (progress > 0.8 && progress <= 0.85) {
        const textFadeProgress = (progress - 0.8) / 0.05; // 更短的时间内消失

        // 文字继续移动并彻底消失
        gsap.set(".section-2-content > div:first-child", {
          x: -400 - textFadeProgress * 300, // 继续向左移动到-700px
          opacity: Math.max(0, 1 - textFadeProgress), // 完全淡出
        });
        gsap.set(".section-2-content > div:last-child", {
          x: 400 + textFadeProgress * 300, // 继续向右移动到700px
          opacity: Math.max(0, 1 - textFadeProgress), // 完全淡出
        });

        // 图片准备扩展
        gsap.set(".shoes-image", {
          width: "500px",
          height: "auto",
          opacity: 1,
          position: "relative",
          left: "auto",
          top: "auto",
          x: "0%",
          y: "0%",
          objectFit: "initial",
          zIndex: 1000,
          transform: "scale(1)",
        });
      }
      // 阶段4（进度0.8-0.85）：文字快速消失
      else if (progress > 0.8 && progress <= 0.85) {
        const textFadeProgress = (progress - 0.8) / 0.05;

        // 文字快速移动并消失
        gsap.set(".section-2-content > div:first-child", {
          x: -400 - textFadeProgress * 800, // 移动到-1200px
          opacity: Math.max(0, 1 - textFadeProgress * 3),
          scale: Math.max(0.1, 1 - textFadeProgress * 2), // 缩小并消失
        });
        gsap.set(".section-2-content > div:last-child", {
          x: 400 + textFadeProgress * 800, // 移动到1200px
          opacity: Math.max(0, 1 - textFadeProgress * 3),
          scale: Math.max(0.1, 1 - textFadeProgress * 2), // 缩小并消失
        });

        // 图片保持500px
        gsap.set(".shoes-image", {
          width: "500px",
          height: "auto",
          opacity: 1,
          position: "relative",
          zIndex: 1000,
        });
      }
      // 阶段5（进度0.85-1.0）：图片大幅放大铺满全屏
      else if (progress > 0.85) {
        const finalProgress = (progress - 0.85) / 0.15;

        // 强制隐藏文字
        gsap.set(".section-2-content > div:first-child", {
          x: -1200,
          opacity: 0,
          scale: 0,
          visibility: "hidden",
          display: "none",
        });
        gsap.set(".section-2-content > div:last-child", {
          x: 1200,
          opacity: 0,
          scale: 0,
          visibility: "hidden",
          display: "none",
        });

        // 图片大幅缩放铺满全屏
        gsap.set(".shoes-image", {
          position: "fixed",
          left: "50%",
          top: "50%",
          x: "-50%",
          y: "-50%",
          width: "auto",
          height: "auto",
          opacity: 1,
          zIndex: 1000,
          // 大幅增加缩放值确保完全覆盖屏幕
          scale: 15 + finalProgress * 10, // 从15倍放大到25倍
        });
      }
    },
    onLeaveBack: () => {
      // 当向上滚动离开时，恢复所有元素的原始状态
      gsap.set(".shoes-image", {
        position: "relative",
        left: "auto",
        top: "auto",
        width: "0px",
        height: "auto",
        opacity: 0,
        x: "0%",
        y: "0%",
        scale: 1,
        objectFit: "initial",
        zIndex: 10,
      });

      // 恢复文字位置和透明度
      gsap.set(".section-2-content > div:first-child", {
        x: 0,
        opacity: 1,
        scale: 1,
        visibility: "visible",
        display: "flex",
      });

      gsap.set(".section-2-content > div:last-child", {
        x: 0,
        opacity: 1,
        scale: 1,
        visibility: "visible",
        display: "flex",
      });
    },
  });
};

onMounted(() => {
  initLenis(); // 初始化 Lenis 平滑滚动
  renderIndex();

  // 等待DOM更新后再设置describe动画
  nextTick(() => {
    setupDescribeAnimation();
  });
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
    title: "Brand Analysis & Insight",
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

/* section-2-content 样式 */
.section-2-content {
  transform-origin: center center;
  will-change: transform, position;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: none; /* 禁用CSS过渡，让GSAP完全控制动画 */
}

/* section-2-content 内的文字组样式优化 */
.section-2-content > div {
  will-change: transform, opacity;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: none; /* 禁用CSS过渡，让GSAP完全控制动画 */
}

/* 鞋子图片样式 */
.shoes-image {
  transform-origin: center center;
  will-change: transform, position, width, height;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transition: none; /* 禁用CSS过渡，让GSAP完全控制动画 */
}

/* 当图片铺满全屏时的样式 */
.shoes-image[style*="position: fixed"] {
  max-width: none !important;
  max-height: none !important;
  width: 100vw !important;
  height: 100vh !important;
  object-fit: cover !important;
  object-position: center center !important;
}
</style>
