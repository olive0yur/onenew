<template>
  <div class="overflow-hidden">
    <div>
      <!-- section-0 -->
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
            class="describe-item flex flex-col border-b-[1px] border-[#DCDCDC] py-[40px] pr-[39px] w-full max-w-[1318px] cursor-pointer relative"
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
        class="section-2 h-[500vh] w-[100vw] bg-[#F3F3F3] relative overflow-hidden"
        style="
          clip-path: inset(0 0 -100vh 0);
        "
      >
        <div
          class="section-2-wrap h-[100vh] w-[100vw] inset-0 absolute z-[1] overflow-hidden"
        >
          <div
            class="img-warp h-[100vh] flex justify-center items-center gap-[16px] relative overflow-visible"
          >
            <!-- 左侧文字 -->
            <div
              class="section2-text-left flex flex-col items-end justify-center w-[400px] z-10"
            >
              <span
                class="font-['Inter'] text-[64px] text-[#000] whitespace-nowrap leading-[64px] mb-[40px]"
              >
                The Work
              </span>
              <span
                class="font-['Noto'] text-[32px] text-[#000] leading-[32px]"
              >
                看作品
              </span>
            </div>

            <!-- 中央图片 - 作为滚动序列的第一个 -->
            <img src="/images/index/img1.png"  class="expand-image " alt="" />

            <!-- 右侧文字 -->
            <div
              class="section2-text-right w-[400px] flex flex-col items-start justify-center z-10"
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

            <!-- 线条 -->
            <div class="section-2-line-top absolute h-[1px] bg-[#FFF] left-[147px] top-[calc(50vh-10px)] rotate-[-45deg] origin-left z-[10]"></div>
            <div class="section-2-line-bottom absolute h-[1px] bg-[#FFF] left-[147px] top-[calc(50vh+10px)] rotate-[45deg] origin-left z-[10]"></div>

            <!-- 文字 -->
             <span class="section-2-text absolute text-[#fff] text-[16px] left-[40px]">DISCOVER</span>

            <!-- 多组滚动图片 -->
            <img
              v-for="i in 10"
              :key="i"
              :src="`/images/index/img${((i - 1) % 5) + 1}.png`"
              :class="`h-[90px] absolute scroll-img scroll-img-${i} opacity-0`"
              alt=""
            />
            
            <!-- 文字遮罩区域 -->
            <div class="absolute h-[100vh] w-[100vw] z-[20]"
            style="clip-path: polygon(147px calc(50vh - 10px), calc(147px + 56.57vw) calc(50vh - 56.57vw - 10px), calc(147px + 56.57vw) calc(50vh + 56.57vw + 10px), 147px calc(50vh + 10px), 147px 50vh);">
              <span 
                v-for="(item, index) in words" 
                :key="item.title" 
                :class="`scroll-text scroll-text-${index + 1} text-[64px] text-[#FFF] absolute opacity-100`"
              >{{ item.title }}</span>
            </div> 

            <!-- 封面遮罩 -->
             <div class="cover-mask absolute h-[100vh] w-[100vw] z-[30] translate-y-[100vh] rotate-[45deg] flex flex-col">
                <!-- 覆盖卡片 -->
                <section
                  class="section-3 w-[100vw] min-h-[100vh] bg-[#F8F8F8] p-[40px] overflow-hidden rotate-[0deg]"
                >
                  <div class="text-[16px] text-[#000]">
                    <span class="mr-[4px]"> /</span>
                    <span style="font-family: 'Noto'">我们的客户</span>
                  </div>
                  <div
                    class="text-[#0B0B0B] font-['Inter'] text-[160px] font-normal capitalize leading-[160px] mb-[80px]"
                  >
                    Trust
                  </div>
                  <div class="h-[360px] overflow-x-auto list-card-wrap">
                    <div class="flex gap-[40px] list-card-item-wrap"> 
                      <div class="w-[586px] h-[360px] box-border flex-shrink-0 bg-[#fff] list-card-item p-[40px] translate-x-[100vw]" v-for="item in listCards" :key="item.title">
                      <div >
                        <img src="/static/logo.png" class="h-[24px] w-[172px] mb-[24px]" alt="">
                        <p class="text-[16px] leading-[24px] text-[#666] mb-[80px]">{{ item.description }}</p>

                        <div class="flex items-center">
                          <img src="/static/avatar.png" class="h-[60px] w-[60px] mr-[16px]" alt="">
                          <div class="flex flex-col">
                            <span class="text-[16px] text-[#293238] leading-[16px]">{{ item.name }}</span>
                            <span class="text-[16px] text-[#666] leading-[16px]">{{ item.mark }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                  <!-- <div class="bg-[red] flex-1">
                    1111
                  </div> -->
                </section>
             </div>
          </div>
        </div>
      </section>

      <!-- 旋转图片 -->
      <section class="section-4 h-[100vh] w-[100vw] relative">
        <img src="/images/about/cover1.png" class="w-[100vw] h-[100vh] object-cover absolute z-[7]" alt="">
        <img src="/images/about/cover2.png" class="w-[100vw] h-[100vh] object-cover absolute z-[6]" alt="">
        <img src="/images/about/cover3.png" class="w-[100vw] h-[100vh] object-cover absolute z-[5]" alt="">
        <img src="/images/about/cover4.png" class="w-[100vw] h-[100vh] object-cover absolute z-[4]" alt="">
        <img src="/images/about/cover5.png" class="w-[100vw] h-[100vh] object-cover absolute z-[3]" alt="">
        <img src="/images/about/cover6.png" class="w-[100vw] h-[100vh] object-cover absolute z-[2]" alt="">
        <img src="/images/about/cover7.png" class="w-[100vw] h-[100vh] object-cover absolute z-[1]" alt="">

             <!-- 线条 -->
            <div class="section-4-line-top absolute h-[1px] bg-[#FFF] left-[147px] top-[calc(50vh-10px)] rotate-[-45deg] origin-left z-[10]"></div>
            <div class="section-4-line-bottom absolute h-[1px] bg-[#FFF] left-[147px] top-[calc(50vh+10px)] rotate-[45deg] origin-left z-[10]"></div>

            <!-- 文字 -->
             <span class="section-4-text absolute top-[50%] translate-y-[-50%]  z-[10] text-[#fff] text-[16px] left-[40px]">FOLLOW US</span>
      </section>

      <!-- Let's talk -->
      <section class="section-5 h-[100vh] w-[100vw] box-border bg-[#000] grid grid-cols-2 gap-[1px]" style="grid-template-rows: 1fr 1.4fr;">
          <div class="lets-talk-top-left bg-[white]">
            <span class="lets-talk-title text-[#0B0B0B]">Let's Talk</span>
          </div>
          <div class="lets-talk-top-right bg-[white] flex  justify-end">
            <img src="/static/right.png" class="right-img" alt="">
          </div>
          <div class="lets-talk-bottom-left bg-[white] flex items-end">
            <img src="/static/o.png" class="lets-talk-img" alt="">
            <img src="/static/n.png" class="lets-talk-img" alt="">
            <img src="/static/e.png" class="lets-talk-img" alt="">
          </div>
          <div class="lets-talk-bottom-right bg-[white] flex justify-start items-end">
            <div class="flex">
              <img src="/static/n.png" class="lets-talk-img" alt="">
              <img src="/static/e.png" class="lets-talk-img" alt="">
              <img src="/static/w.png" class="lets-talk-img" alt="">
            </div>
          </div>
      </section>

      <!-- 底页 -->
      <section
        class="section-3 h-[599px] w-[100vw] relative bg-[#3B4EFF] pt-[103px] pl-[48px] pr-[40px] flex flex-col justify-between pb-[40px]"
      >
        <div class="flex  justify-between w-[100%]">
          <div class="flex flex-col">
          <span class="text-[16px] text-[#FFF] leading-[16px] mb-[12px]">/联系我们</span>
          <span class="text-[24px] text-[#FFF] leading-[32px] ">1761973105@qq.com</span>
          <span class="text-[24px] text-[#FFF] leading-[32px]">+86 15252507831</span>
        </div>
        <div class="flex">
          <div class="flex flex-col mr-[120px]">
            <span class="text-[16px] text-[#FFF] leading-[16px] mb-[12px]">/导航</span>
            <span class="text-[24px] text-[#EEE] leading-[32px] mb-[16px]">WORKS 案例</span>
            <span class="text-[24px] text-[#EEE] leading-[32px] mb-[16px]">ABOUT 关于</span>
            <span class="text-[24px] text-[#EEE] leading-[32px]">CONTACT 联系</span>
          </div>
          <div class="flex flex-col">
            <span class="text-[16px] text-[#FFF] leading-[16px] mb-[12px]">/跟随我们</span>
            <span class="text-[24px] text-[#EEE] leading-[32px] mb-[16px]">X 推特</span>
            <span class="text-[24px] text-[#EEE] leading-[32px] mb-[16px]">Red BOOK 小红书</span>
          </div>
        </div>
        </div>

        <div class="flex justify-between">
          <div class=" border-b-[1px] border-solid border-[#fff] text-[#fff] flex items-end">
            <span class="text-[64px] leading-[64px]">ENTER EMAIL</span>
            <span class="text-[32px] ml-[16px]">输入邮件</span>
            <img src="/static/toRight.png" class="h-[64px] w-[64px] ml-[138px]" alt="">
          </div>
          <div class="flex flex-col justify-between items-end">
            <div class="text-[16px] text-[#FFF] leading-[16px] flex">
              <span class="mr-[16px]">BACK TO TOP</span>
              <img src="/static/toTop.png" class="h-[16px] w-[16px] " alt="">
            </div>
            <div class="text-[16px] text-[#EEEEEE] opacity-60 leading-[16px]">
              <span class="mr-[20px]">ONEW原创版权归杭州云联在线科技有限公司所有 盗用必究 ©2025</span>
              <span>浙ICP备2021040397号</span>
            </div>
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
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin);

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

  setTimeout(done, 300);
};


// ===== 平滑滚动初始化 =====
const initLenis = () => {
  lenis.value = new Lenis({
    duration: 0,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
    easing: (t) => t,
    lerp: 0.1,
  });

  lenis.value.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.value.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.fps(120);
};

// ===== 背景和初始动画 =====
const initBackgroundAnimations = () => {
  // 初始动画timeline
  const initialTl = gsap.timeline();

  // 设置bg-image初始状态
  gsap.set(".bg-image", {
    transformOrigin: "50% 50%",
    x: "-5vw",
    y: "60vh",
    rotation: 5,
  });

  // bg-image入场动画
  initialTl.to(".bg-image", {
    x: 0,
    y: 0,
    rotation: 0,
    duration: 1.2,
    ease: "power2.inOut",
  });

  // logo-container和blue-mask滚动动画
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
};

// ===== Section-1 动画 =====
const initSection1Animations = () => {
  // 设置section-1初始状态
  gsap.set(".section-1", {
    transformOrigin: "50% 50%",
    x: "-14vw",
    y: "0",
    rotation: 10,
  });

  // section-1滚动动画
  gsap.to(".section-1", {
    scrollTrigger: {
      trigger: ".section-1",
      start: "top 100%",
      end: "top 50%",
      scrub: true,
      toggleActions: "play none none reverse",
    },
    x: 0,
    y: 0,
    rotation: 0,
    ease: "sine.inOut",
  });

  // describe元素动画
  const describeTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-1",
      scrub: true,
    },
  });

  describeRefs.value.forEach((el: any) => {
    describeTl.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "bottom-=10px 100%",
        scrub: 2,
      },
      x: 0,
      opacity: 1,
      ease: "power1.out",
    });
  });
};

// ===== Section-2 文字动画 =====
const initSection2TextAnimations = () => {
  // 分割文字为单词
  const splitTextLeft = new SplitText(".section2-text-left", {
    type: "words",
  });
  const splitTextRight = new SplitText(".section2-text-right", {
    type: "words",
  });

  // 设置初始状态
  gsap.set([splitTextLeft.words, splitTextRight.words], {
    y: "80px",
    opacity: 0,
  });

  // 左侧文字动画
  gsap.to(splitTextLeft.words, {
    y: 0,
    opacity: 1,
    ease: "sine.out",
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".section-2",
      start: "top 40%",
      end: "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  // 右侧文字动画
  gsap.to(splitTextRight.words, {
    y: 0,
    opacity: 1,
    ease: "sine.out",
    duration: 0.8,
    stagger: 0.1,
    delay: 0.3,
    scrollTrigger: {
      trigger: ".section-2",
      start: "top 40%",
      end: "top 70%",
      toggleActions: "restart none none reverse",
    },
  });
};

// ===== 生成括号路径 =====
const generateBracketPath = () => {
  const bracketPath = [];
  const bracketSteps = 120;
  const arcRadius = 220;
  const arcOffset = -40;
  const verticalMultiplier = 1.2;

  for (let i = 0; i <= bracketSteps; i++) {
    const t = i / bracketSteps;
    const x = Math.sin(t * Math.PI) * arcRadius + arcOffset;
    const y = t * window.innerHeight * verticalMultiplier;
    bracketPath.push({ x, y });
  }

  return bracketPath;
};

// ===== Section-2 主要动画 =====
const initSection2MainAnimations = () => {
  const section2Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-2",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.5,
      toggleActions: "restart none none reverse",
      pin: ".section-2-wrap",
    },
  });

  // 文字移出动画
  section2Tl.fromTo(
    ".section2-text-left",
    { opacity: 1, x: 0 },
    { x: "-60vw", opacity: 1, ease: "power2.out" },
    0
  );

  section2Tl.fromTo(
    ".section2-text-right",
    { opacity: 1, x: 0 },
    { x: "60vw", opacity: 1, ease: "power2.out" },
    0
  );

  // 图片放大动画
  section2Tl.to(
    ".expand-image",
    {
      scale: 1,
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      ease: "power2.out",
    },
    0
  );

  return section2Tl;
};

// ===== 中央图片管理 =====
const initCentralImageManagement = (timeline: gsap.core.Timeline) => {
  // 设置初始状态
  timeline.set(".expand-image", { opacity: 1 }, 0);

  // 确保显示第一个图片
  timeline.call(
    () => {
      const expandImage = document.querySelector(
        ".expand-image"
      ) as HTMLImageElement;
      if (expandImage) {
        expandImage.src = "/images/index/img1.png";
      }
    },
    [],
    0
  );

  // 监听进度变化
  const scrollTrigger = ScrollTrigger.getById((timeline.scrollTrigger as any)?.id);
  if (scrollTrigger) {
    scrollTrigger.vars.onUpdate = (self: any) => {
      const progress = self.progress;
      const expandImage = document.querySelector(
        ".expand-image"
      ) as HTMLImageElement;

      if (expandImage && progress < 0.15) {
        expandImage.src = "/images/index/img1.png";
      }
    };
  }

  // 检查点
  timeline.call(
    () => {
      const expandImage = document.querySelector(
        ".expand-image"
      ) as HTMLImageElement;
      if (expandImage && timeline.progress() < 0.1) {
        expandImage.src = "/images/index/img1.png";
      }
    },
    [],
    0.1
  );
};

// ===== 显示线条和文字 =====
const showLineAndText = (timeline: gsap.core.Timeline) => {
  timeline.to([".section-2-line-top", ".section-2-line-bottom", ".section-2-text"], {
    opacity: 1,
    width: "80vw",
  });

};

// ===== 滚动图片动画 =====
const initScrollingImagesAnimations = (
  timeline: gsap.core.Timeline,
  bracketPath: any[]
) => {
  for (let i = 1; i <= 10; i++) {
    const delay = (i - 0) * 0.6;
    const imageSrc = `/images/index/img${(i % 5) + 1}.png`;

    // 设置初始位置
    timeline.set(
      `.scroll-img-${i}`,
      {
        opacity: 0,
        y: 0,
      },
      delay
    );

    // 显示动画
    timeline.to(
      `.scroll-img-${i}`,
      {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
      },
      delay
    );

    // 路径运动动画
    timeline.to(
      `.scroll-img-${i}`,
      {
        duration: 3,
        ease: "none",
        motionPath: {
          path: bracketPath,
          curviness: 2,
        },
      },
      delay + 0.1
    );

    // 中央图片替换
    timeline.call(
      () => {
        const expandImage = document.querySelector(
          ".expand-image"
        ) as HTMLImageElement;
        if (expandImage) {
          expandImage.src = imageSrc;
        }
      },
      [],
      delay + 1.5
    );

    // 淡出动画
    timeline.to(
      `.scroll-img-${i}`,
      {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      },
      delay + 2.9
    );

    if(i === 6){
      gsap.set(".cover-mask", {
        transformOrigin: "50% 50%",
        x: "-14vw",
        y: "120vh",
        rotation: 10,
      });
      timeline.to(".cover-mask", {
        x: 0,
        y: 0,
        duration: 2,
        rotation: 0,
        ease: "sine.inOut",
      });
      const container = document.querySelector(".list-card-wrap") as HTMLElement;
      const item = document.querySelector(".list-card-item-wrap") as HTMLElement;
      const x = container.offsetWidth - item.scrollWidth;
      timeline.to(".list-card-item-wrap", {
        x: x,
        duration: 5,
        ease: "sine.inOut",
      });
    }
  }
};

// ===== 滚动文字动画 =====
const initScrollingTextAnimations = (timeline: gsap.core.Timeline) => {
  for (let i = 1; i <= words.value.length; i++) {
    const delay = (i - 1) * 0.4; // 缩短间隔到0.4秒

    // 设置初始位置 - 第一个文字初始透明度为1，其他为0.3
    timeline.set(
      `.scroll-text-${i}`,
      {
        opacity: i === 1 ? 1 : 0.3,
        y: '64px', // 从底部开始
      },
      delay
    );

    // 从下到上滚动动画
    timeline.to(
      `.scroll-text-${i}`,
      {
        y: -window.innerHeight -300, // 向上滚动到屏幕外
        duration: 3,
        ease: "none",
      },
      delay
    );

    // 进入中间区域时瞬间变为完全不透明
    timeline.set(
      `.scroll-text-${i}`,
      {
        opacity: 1,
      },
      delay + 1.3 // 提前进入中间区域
    );

    // 离开中间区域后瞬间变回半透明
    timeline.set(
      `.scroll-text-${i}`,
      {
        opacity: 0.3,
      },
      delay + 1.7 // 延后离开中间区域，延长高亮持续时间
    );
  }
};

const section4Timeline = () => {
  const timeline = gsap.timeline();
  timeline.to(".section-4-line-top", {
    scrollTrigger: {
      trigger: ".section-4",
      start: "top top",
      end: "top top",
      scrub: 1,
      toggleActions: "play none none reverse",
    },
    width: "80vw",
    opacity: 1,
  });
  timeline.to(".section-4-line-bottom", {
    scrollTrigger: {
      trigger: ".section-4",
      start: "top top",
      end: "-10px",
      scrub: 1,
      toggleActions: "play none none reverse",
    },
    width: "80vw",
    opacity: 1,
  });
  timeline.to(".section-4-text", {
    scrollTrigger: {
      trigger: ".section-4",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      toggleActions: "play none none reverse",
    },
    opacity: 1,
  });
};


// ===== 主渲染函数 =====
const renderIndex = () => {
  ctx.value = gsap.context(() => {
    // 初始化各个模块
    initBackgroundAnimations();
    initSection1Animations();
    initSection2TextAnimations();

    // Section-2主要动画
    const section2Timeline = initSection2MainAnimations();

    // 生成路径
    const bracketPath = generateBracketPath();

    // 中央图片管理
    initCentralImageManagement(section2Timeline);

    showLineAndText(section2Timeline);

    // 滚动图片动画
    initScrollingImagesAnimations(section2Timeline, bracketPath);
    
    // 滚动文字动画
    initScrollingTextAnimations(section2Timeline);

    section4Timeline()
  
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

const words = ref([
  {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
  {
    title: "Maintenance and Optimization",
  },
  {
    title: "Maintenance and Optimization",
  },
  {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
     {
    title: "Maintenance and Optimization",
  },
     {
    title: "Maintenance and Optimization",
  },
     {
    title: "Maintenance and Optimization",
  },
]);

const listCards= ref([
  {
    title: "Maintenance and Optimization",
    description: "与 Onew 的合作体验非常棒！他们不仅准确捕捉到了我们品牌的精髓还通过极富创意的设计，让我们的网站焕然一新。整个团队专业、高效并且始终保持着开放的沟通。最终呈现的效果超出了我们的预期，网站不仅视觉上令人惊艳，用户体验也极其流畅。强烈推荐 Onew 给任何寻求卓越网页设计服务的公司！",
    avatar: "/static/avatar.svg",
    logo:'/static/logo.svg',
    name:"Amir Khan",
    mark:'CEO,Avito'
  },
    {
    title: "Maintenance and Optimization",
    description: "与 Onew 的合作体验非常棒！他们不仅准确捕捉到了我们品牌的精髓还通过极富创意的设计，让我们的网站焕然一新。整个团队专业、高效并且始终保持着开放的沟通。最终呈现的效果超出了我们的预期，网站不仅视觉上令人惊艳，用户体验也极其流畅。强烈推荐 Onew 给任何寻求卓越网页设计服务的公司！",
    avatar: "/static/avatar.svg",
    logo:'/static/logo.svg',
    name:"Amir Khan",
    mark:'CEO,Avito'
  },
    {
    title: "Maintenance and Optimization",
    description: "与 Onew 的合作体验非常棒！他们不仅准确捕捉到了我们品牌的精髓还通过极富创意的设计，让我们的网站焕然一新。整个团队专业、高效并且始终保持着开放的沟通。最终呈现的效果超出了我们的预期，网站不仅视觉上令人惊艳，用户体验也极其流畅。强烈推荐 Onew 给任何寻求卓越网页设计服务的公司！",
    avatar: "/static/avatar.svg",
    logo:'/static/logo.svg',
    name:"Amir Khan",
    mark:'CEO,Avito'
  },
    {
    title: "Maintenance and Optimization",
    description: "与 Onew 的合作体验非常棒！他们不仅准确捕捉到了我们品牌的精髓还通过极富创意的设计，让我们的网站焕然一新。整个团队专业、高效并且始终保持着开放的沟通。最终呈现的效果超出了我们的预期，网站不仅视觉上令人惊艳，用户体验也极其流畅。强烈推荐 Onew 给任何寻求卓越网页设计服务的公司！",
    avatar: "/static/avatar.svg",
    logo:'/static/logo.svg',
    name:"Amir Khan",
    mark:'CEO,Avito'
  },
    {
    title: "Maintenance and Optimization",
    description: "与 Onew 的合作体验非常棒！他们不仅准确捕捉到了我们品牌的精髓还通过极富创意的设计，让我们的网站焕然一新。整个团队专业、高效并且始终保持着开放的沟通。最终呈现的效果超出了我们的预期，网站不仅视觉上令人惊艳，用户体验也极其流畅。强烈推荐 Onew 给任何寻求卓越网页设计服务的公司！",
    avatar: "/static/avatar.svg",
    logo:'/static/logo.svg',
    name:"Amir Khan",
    mark:'CEO,Avito'
  },
])
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
  /* transition: all 0.3s ease; */
  transform: translateX(500px);
  opacity: 0;
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
  position: fixed !important;
  width: 100vw;
  height: 100vh;
}

.text-test {
  opacity: 1;
}

.scroll-img {
  opacity: 0;
  top: -90px;
  right: 200px;
  position: absolute;
  z-index: 1;
}

.scroll-text {
  opacity: 0.3;
  bottom: -200px;
  left: 40%;
  transform: translateX(-50%);
  position: absolute;
  z-index: 2;
  white-space: nowrap;
  pointer-events: none;
}

.section-2-line-top {
  width: 0;
}


.section-2-line-bottom {
  width: 0;
}


.section-2-text {
  opacity: 0;
}

.section-4-line-top {
  width: 0;
}

.section-4-line-bottom {
  width: 0;
}

.section-4-text {
  opacity: 0;
}

/* Let's Talk 响应式样式 */
/* 超过1920px时使用固定px值 */
@media (min-width: 1920px) {
  .lets-talk-top-left {
    border-bottom-right-radius: 144px;
  }
  .lets-talk-top-right {
    border-bottom-left-radius: 144px;
    padding-right: 40px;
  }
  .right-img {
    width: 160px;
    height: 160px;
  }
  .lets-talk-bottom-left {
    border-top-right-radius: 144px;
    gap: 35.63px;
    padding-bottom: 40px;
    padding-left: 40px;
  }
  .lets-talk-bottom-right {
    border-top-left-radius: 144px;
    padding-bottom: 40px;
    padding-right: 40px;
  }
  .lets-talk-bottom-right > div {
    gap: 35.63px;
  }
  .lets-talk-title {
    font-size: 160px;
    margin-left: 40px;
  }
  .lets-talk-img {
    height: 290px;
  }
}

/* 小于1920px时使用vw响应式 */
@media (max-width: 1919px) {
  .lets-talk-top-left {
    border-bottom-right-radius: 7.5vw;
  }
  .lets-talk-top-right {
    border-bottom-left-radius: 7.5vw;
    padding-right: 2.08vw;
  }
  .right-img {
    width: 8.33vw;
    height: 8.33vw;
  }
  .lets-talk-bottom-left {
    border-top-right-radius: 7.5vw;
    gap: 1.85vw;
    padding-bottom: 2.08vw;
    padding-left: 2.08vw;
  }
  .lets-talk-bottom-right {
    border-top-left-radius: 7.5vw;
    padding-bottom: 2.08vw;
    padding-right: 2.08vw;
    justify-content: flex-end;
  }
  .lets-talk-bottom-right > div {
    gap: 1.85vw;
  }
  .lets-talk-title {
    font-size: 8.33vw;
    margin-left: 2.08vw;
  }
  .lets-talk-img {
    height: 14.5vw;
  }
}
</style>
