<template>
  <div class="overflow-hidden">
    <!-- 第一部分 -->
    <div 
      id="section-1" 
      ref="section1Ref" 
      class="w-[100vw] h-[100dvh] section1 relative" 
      data-header-theme="white"
    >
      <!-- 背景图层 -->
      <div 
        v-if="caseList[0]?.img"
        class="bg-image w-full h-full absolute top-0 left-0 z-[-1]"
        :style="{
          backgroundImage: `url(${imgBaseURL(caseList[0]?.img)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }"
      ></div>
      
      <div class="section1-content flex flex-col justify-between ">
        <div class="flex flex-col">
          <p v-if="splitTitle.firstPart">{{splitTitle.firstPart}}</p>
          <p v-if="splitTitle.secondPart">{{splitTitle.secondPart}}</p>
          <span>{{caseList[0]?.remark}}</span>
        </div>
        <div class="flex justify-end mb-[16px]">
          <img src="/static/arrow-bottom.svg" alt="">
        </div>
      </div>
    </div>

    <!-- 第二部分 -->
    <div id="section-2" ref="section2Ref" class="bg-[#f7f7f7] lg:p-[40px] p-[16px] section2 cover-section h-[100dvh] flex flex-col relative z-[5]" data-header-theme="black">
      <!-- section2-head 部分 -->
      <div class="flex lg:flex-row flex-col lg:justify-between">
        <div class="flex flex-col project-title gap-[8px]">
          <span class="title">/我们的业务</span>
          <span class="subtitle">Solutions</span>
        </div>
      </div>
      <div class="flex-1 flex flex-col">
        <RotatingCards :items="businessImgs" :resolve-src="imgBaseURL">
          <BusinessCardList :items="businessList" :resolve-img="imgBaseURL" />
        </RotatingCards>
      </div>
    </div>
    
    <!-- 插入部分 -->
    <div ref="insertedSectionRef" class="bg-[#fff] lg:p-[40px] p-[16px] h-[100vh] relative z-[10] inserted-section w-full flex flex-col">
      <!-- section-head 部分 -->
      <div class="flex flex-row lg:justify-between items-center">
        <div class="flex flex-col project-title gap-[8px]">
          <span class="title">/我们的团队</span>
          <span class="subtitle">The Crew</span>
        </div>
        <div class="project-title-number lg:block hidden">
          (<NumberScroll :target="32" :duration="1500" />)
        </div>
      </div>

      <div class="flex-1 relative">
        <div class="absolute top-0 left-0 w-full h-full z-[-1] flex flex-col items-center justify-center">
          <span class="text-[#0000001A] font-bold text-[clamp(110px,18vw,320px)] leading-[1]">Singular</span>
          <span class="text-[#0000001A] font-bold text-[clamp(160px,18vw,320px)] leading-[1]">Stars</span>
        </div>
        <CardRound :items="cardList" />
      </div>
      <div class="project-title-number lg:hidden flex justify-end mb-[100px]">
          (<NumberScroll :target="32" :duration="1500" />)
      </div>
    </div>
    
    <!-- 第三部分 -->
    <div id="section-3" ref="workflowSectionRef" class="bg-[#F8F8F8] lg:p-[40px] p-[16px] section2 cover-section lg:h-[100dvh] min-h-[100dvh] relative z-[15] flex flex-col" data-header-theme="black">
      <!-- section2-head 部分 -->
      <div class="flex lg:flex-row flex-col lg:justify-between">
        <div class="flex flex-col project-title gap-[8px]">
          <span class="title">/工作流程</span>
          <span class="subtitle">Workflow</span>
        </div>
      </div>
      
      <!-- 桌面端：Canvas + 滚动动画 -->
      <div class="absolute top-0 left-0 w-full h-full z-[-1] hidden lg:block">
        <!-- Canvas 背景层 -->
        <canvas 
          ref="workflowCanvasRef" 
          class="workflow-canvas"
        ></canvas>
        
        <!-- Workflow 容器 -->
        <div class="workflow-container flex absolute h-full w-auto top-0" style="left: 100vw;">
          <div 
            v-for="(item, index) in contact_workflow" 
            :key="index"
            :ref="el => setWorkflowRef(el, index)"
            class="workflow-item w-[500px] h-full border-l-[1px] border-[#D9D9D9] flex flex-col px-[16px] flex-shrink-0"
            :class="{ 'border-r-[1px]': index === contact_workflow.length - 1 }"
          >
            <div class="mask-cover">
              <span class="font-bold text-[24px]">{{item?.label}}</span>
              <span class="mt-[10px] text-[16px]">{{item?.dict_value}}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 移动端：横向滚动轮播 -->
      <div class="flex-1 flex flex-col pt-[24px] lg:hidden">
        <!-- 滚动容器 -->
        <div 
          ref="mobileWorkflowScrollRef"
          class="flex-1 flex overflow-x-hidden scrollbar-hide"
          @touchstart="onTouchStart"
          @touchend="onTouchEnd"
        >
          <div 
            v-for="(item, index) in contact_workflow" 
            :key="'mobile-' + index"
            class="workflow-mobile-item flex flex-col flex-shrink-0 w-full snap-center px-[16px]"
          >
            <!-- 图片 -->
            <div class="w-full flex-1 flex items-center justify-center mb-[16px]">
              <img 
                :src="imgBaseURL(item?.img)" 
                :alt="item?.label"
                class="max-w-full max-h-[50vh] object-contain"
              />
            </div>
            <!-- 文字模块 -->
            <div class="workflow-mobile-text bg-[rgba(218,218,218,0.6)] backdrop-blur-[12.5px] p-[16px] flex flex-col">
              <span class="font-bold text-[20px]">{{item?.label}}</span>
              <span class="mt-[8px] text-[14px]">{{item?.dict_value}}</span>
            </div>
          </div>
        </div>
        <!-- 指示器 -->
        <div class="flex justify-center gap-[8px] py-[16px]">
          <div 
            v-for="(item, index) in contact_workflow" 
            :key="'dot-' + index"
            class="w-[8px] h-[8px] rounded-full transition-colors duration-300"
            :class="mobileWorkflowIndex === index ? 'bg-[#2563EB]' : 'bg-[#D9D9D9]'"
            @click="scrollToWorkflowItem(index)"
          ></div>
        </div>
      </div>
    </div>

    <!-- 第四部分 -->
    <div id="section-4" ref="section3Ref" class="bg-[#fff] lg:p-[40px] p-[16px] section3 h-[100dvh] relative" data-header-theme="black">
      <!-- section3-head 部分 -->
      <div class="flex lg:flex-row flex-col lg:justify-between">
        <div class="flex flex-col project-title gap-[8px]">
          <span class="title">/价值观</span>
          <span class="subtitle">Values</span>
        </div>
      </div>

      <!-- 展开折叠列表部分 -->
      <div class="flex flex-col items-end lg:pt-[40px] pt-[24px]">
        <div
          v-for="(describe, index) in aboutList"
          :key="describe.id || describe.dict_type_id || index"
          :ref="(el: any) => setDescribeRef(el, index)"
          class="describe-item-wrapper flex items-start w-full lg:max-w-[1282px] cursor-pointer relative"
          :style="{ opacity: 0, transform: 'translateX(100px)' }"
        >
          <!-- 左侧图片 -->
          <div class="describe-icon flex-shrink-0 flex w-[24px] h-[24px] lg:w-[3.3vw] lg:h-[3.3vw] mr-[8px] lg:mr-[16px] mt-[12px] lg:mt-[2.5vh]">
            <img class="w-full h-full object-contain" :src="imgBaseURL(describe?.img)" alt="">
          </div>
          
          <!-- 右侧内容区域 -->
          <div class="describe-item flex flex-col border-b-[1px] border-[#DCDCDC] lg:py-[2.5vh] py-[12px] lg:pr-[39px] flex-1">
            <!-- 主要内容行 -->
            <div @click="toggleExpand(index)" class="flex items-center justify-between w-full">
            <div class="flex flex-col lg:flex-row lg:items-center items-start">
              <span
                class="font-['Inter'] lg:text-[3.3vw] text-[20px] font-normal lg:leading-[3.3vw] leading-[24px] text-[#000] lg:mr-[16px] mr-[8px]"
                >{{ describe?.label }}</span
              >
              <span class="font-['Noto'] lg:text-[1.67vw] text-[14px] lg:mt-0 mt-[4px]">{{
                describe?.remark
              }}</span>
            </div>
            <img
              :src="imgBaseURL('add.svg')"
              alt=""
              :class="[
                'lg:w-[24px] lg:h-[24px] w-[14px] h-[14px] cursor-pointer transition-transform duration-300 hover:scale-110',
                { 'rotate-45': expandedItems[index] }
              ]"
              @click.stop.prevent="toggleExpand(index)"
            />
          </div> 
            <!-- 展开的remark内容 -->
            <transition name="expand" @enter="onEnter" @leave="onLeave">
              <div
                v-if="expandedItems[index]"
                class="remark-content w-full overflow-hidde"
              >
                <p class="lg:h-[40px] h-[16px]"></p>
                <p
                  class="font-['Noto'] lg:text-[16px] text-[12px] lg:leading-[32px] leading-[20px] text-[#666] whitespace-pre-line max-w-[935px]"
                >
                  {{ describe?.description }}
                </p>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Let's talk 部分 - 移到第三部分内部 -->
      <section id="section-5" class="section-5 rotate-[20deg] h-[100vh] w-[100vw] box-border grid grid-cols-2 absolute translate-y-[140vh] translate-x-[-20vw] z-[32] bg-[#F8F8F8] overflow-hidden" data-header-theme="black" style="grid-template-rows: 1fr 1.4fr; top: 0; left: 0;">
          <div class="lets-talk-top-left overflow-hidden relative">
            <div class="flex items-center hover-container-left" @click="navigateTo('/contact')">
              <img :src="imgBaseURL('right.png')" class="right-img hover-img-left" alt=""></img>
              <span class="lets-talk-title text-[#0B0B0B] hover-text-container">
                <span class="hover-text-char">L</span>
                <span class="hover-text-char">e</span>
                <span class="hover-text-char">t</span>
                <span class="hover-text-char">'</span>
                <span class="hover-text-char">s</span>
                <span class="hover-text-char"> </span>
                <span class="hover-text-char">T</span>
                <span class="hover-text-char">a</span>
                <span class="hover-text-char">l</span>
                <span class="hover-text-char">k</span>
              </span>
            </div>
          </div>
          <div class="lets-talk-top-right overflow-hidden">
            <div class="flex justify-end items-center hover-container-right ">
              <span class="lets-talk-title opacity-0">L</span>
              <img :src="imgBaseURL('right.png')" class="right-img hover-img-right m" alt=""></img>
            </div>
          </div>
          <div class="lets-talk-bottom-left flex items-end">
            <img :src="imgBaseURL('o.png')" class="lets-talk-img" alt="">
            <img :src="imgBaseURL('n.png')" class="lets-talk-img" alt="">
            <img :src="imgBaseURL('e.png')" class="lets-talk-img" alt="">
          </div>
          <div class="lets-talk-bottom-right flex justify-start items-end">
            <div class="flex">
              <img :src="imgBaseURL('n.png')" class="lets-talk-img" alt="">
              <img :src="imgBaseURL('e.png')" class="lets-talk-img" alt="">
              <img :src="imgBaseURL('w.png')" class="lets-talk-img" alt="">
            </div>
          </div>
          <div class="absolute w-[288px] h-[288px] z-[33] top-[38%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-wrap">
            <svg class="star" viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg">
              <!-- 灰色背景 -->
              <rect width="288" height="288" fill="#F8F8F8"/>
              
              <!-- 四角星形状：四条圆弧组成 -->
              <path d="
                M 144 0
                A 144 144 0 0 0 288 144
                A 144 144 0 0 0 144 288
                A 144 144 0 0 0 0 144
                A 144 144 0 0 0 144 0
                Z
              " fill="black"/>
            </svg>
            <div class="line-h absolute w-[1px] z-[34] bg-[#000] left-[50%] top-[50%]"></div>
            <div class="line-h absolute w-[1px] z-[34] bg-[#000] right-[50%]  bottom-[50%]"></div>
            <div class="line-w absolute h-[1px] z-[34] bg-[#000] top-[50%] left-[50%]"></div>
            <div class="line-w absolute h-[1px] z-[34] bg-[#000] bottom-[50%] right-[50%]"></div>
          </div>
      </section>
    </div>
    
    <section id="section-6" class="section-6 relative" data-header-theme="white">
      <Footer :padding-top="isMobile ? 0 : 100" :height="isMobile ? 'calc(100dvh + 530px)' : 'calc(100vh + 569px)'" />
    </section>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { getDictList } from "~/composables/api";
import { imgBaseURL } from "~/utils";


const caseList: any = ref<any[]>([]);
const aboutList: any = ref<any[]>([]);
const isMobile = ref(false);
const section1Ref = ref<HTMLElement | null>(null);
const section2Ref = ref<HTMLElement | null>(null);
const insertedSectionRef = ref<HTMLElement | null>(null);
const workflowSectionRef = ref<HTMLElement | null>(null);
const section3Ref = ref<HTMLElement | null>(null);
const businessImgs:any = ref([]);
const businessTitle:any = ref([]);
const contact_workflow:any = ref([]);
const describeRefs: any = ref([]);
const workflowRefs: any = ref([]);
const workflowCanvasRef = ref<HTMLCanvasElement | null>(null);
const expandedItems: any = ref({});
const businessList:any = ref([]);
const cardList:any = ref([]);
const mobileWorkflowScrollRef = ref<HTMLElement | null>(null);
const mobileWorkflowIndex = ref(0);
let isScrolling = false;
let startX = 0;
let startScrollLeft = 0;

// 触摸开始
const onTouchStart = (e: TouchEvent) => {
  if (!mobileWorkflowScrollRef.value || !e.touches[0]) return;
  isScrolling = true;
  startX = e.touches[0].clientX;
  startScrollLeft = mobileWorkflowScrollRef.value.scrollLeft;
};

// 触摸结束 - 判断滑动方向，只移动一个（循环）
const onTouchEnd = (e: TouchEvent) => {
  if (!mobileWorkflowScrollRef.value || !isScrolling || !e.changedTouches[0]) return;
  isScrolling = false;
  
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;
  const threshold = 50; // 滑动阈值
  const total = contact_workflow.value.length;
  
  let newIndex = mobileWorkflowIndex.value;
  
  if (diff > threshold) {
    // 向左滑，下一个（最后一个滑到第一个）
    newIndex = (mobileWorkflowIndex.value + 1) % total;
  } else if (diff < -threshold) {
    // 向右滑，上一个（第一个滑到最后一个）
    newIndex = (mobileWorkflowIndex.value - 1 + total) % total;
  }
  
  scrollToWorkflowItem(newIndex);
};

// 滚动结束后更新索引
const onMobileWorkflowScroll = () => {
  // 不在这里处理，由 touchend 处理
};

// 点击指示器滚动到对应项
const scrollToWorkflowItem = (index: number | string) => {
  if (!mobileWorkflowScrollRef.value) return;
  const idx = typeof index === 'string' ? parseInt(index) : index;
  const itemWidth = mobileWorkflowScrollRef.value.clientWidth;
  mobileWorkflowIndex.value = idx;
  mobileWorkflowScrollRef.value.scrollTo({
    left: idx * itemWidth,
    behavior: 'smooth'
  });
};


useHead({ 
  title: 'ONEW专业网站建设公司 云联在线 案例',
  meta: [
    { name: 'description', content: 'ONEW专业网站建设公司 云联在线 案例 案例展示' },
    { name: 'keywords', content: 'ONEW专业网站建设公司 云联在线 案例 案例展示' },
  ],
})


// 根据第一个句号分隔标题
const splitTitle = computed(() => {
  const text = caseList.value[0]?.dict_value || '';
  const commaIndex = text.indexOf('.');
  
  if (commaIndex === -1) {
    return {
      firstPart: text,
      secondPart: ''
    };
  }
  
  return {
    firstPart: text.substring(0, commaIndex + 1).trim(),
    secondPart: text.substring(commaIndex + 1).trim()
  };
});



// GSAP context 和 Lenis 实例
const ctx: any = ref(null);
const lenis: any = ref(null);


// 检测移动端设备
const detectMobile = () => {
  if (import.meta.client) {
    isMobile.value = window.innerWidth < 768;
  }
};

// 处理窗口 resize 时刷新 GSAP 动画
const handleResize = () => {
  if (import.meta.client) {
    // 检测移动端
    detectMobile();
    
    // 重新初始化 Canvas
    initWorkflowCanvas();
    
    // 延迟一点再重新渲染，确保尺寸已更新
    setTimeout(() => {
      renderInitialCanvas();
    }, 50);
    
    // 刷新 ScrollTrigger 以重新计算所有动画的触发点
    ScrollTrigger.refresh();
  }
};


// 注册 GSAP 插件
if(import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
  detectMobile(); // 初始化时检测
  window.addEventListener('resize', handleResize); // 监听窗口大小变化，使用新的 handleResize 函数
}

// ===== 平滑滚动初始化 =====
const initLenis = () => {
  lenis.value = new Lenis({
    duration: 0,
    wheelMultiplier: 1,
    touchMultiplier: isMobile.value ? 0.2 : 1,
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

// ===== 初始化动画 =====
const initAnimations = () => {
  ctx.value = gsap.context(() => {
    // ===== 背景图片开场动画 - 类似 index.vue 的 bg-image =====
    const initialTl = gsap.timeline();
    
    // 设置背景图的初始状态
    gsap.set(".bg-image", {
      transformOrigin: "50% 50%",
      x: "-5vw",
      y: "60vh",
      rotation: 5,
    });
    
    // 背景图入场动画
    initialTl.to(".bg-image", {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 1.2,
      ease: "power2.inOut",
    });

    // 第二部分和图片循环部分覆盖第一部分的动画
    // 使用 pin 和 pinSpacing 来实现覆盖效果
    if (section1Ref.value) {
      ScrollTrigger.create({
        trigger: section1Ref.value,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });
      
      // 监听 section1 的可见性，当向上滚动回到 section1 时，动态提升其 z-index
      ScrollTrigger.create({
        trigger: section1Ref.value,
        start: "top top",
        end: "bottom top",
        onEnter: () => {
          // 向下滚动进入 section1 时，降低 z-index（让 cover-section 可以覆盖）
          if (section1Ref.value) {
            section1Ref.value.style.zIndex = '1';
          }
        },
        onLeaveBack: () => {
          // 向上滚动离开 section1 时（回到顶部），保持 z-index
          if (section1Ref.value) {
            section1Ref.value.style.zIndex = '1';
          }
        },
        onEnterBack: () => {
          // 向上滚动回到 section1 时，提升 z-index（让它显示在 cover-section 上面）
          if (section1Ref.value) {
            section1Ref.value.style.zIndex = '20';
          }
        },
        onLeave: () => {
          // 向下滚动离开 section1 时，降低 z-index
          if (section1Ref.value) {
            section1Ref.value.style.zIndex = '1';
          }
        },
      });
    }

    // ===== section1-content "掀上去"的动画 - 类似 index.vue 的 blue-mask =====
    gsap.to(".section1-content", {
      x: isMobile.value ? "-30vw" : "-10vw",
      y: isMobile.value ? "-100dvh" : "-100vh",
      rotation: -15,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "300vh top", // 和 index.vue 一致
        scrub: isMobile.value ? 5 : 3, // 和 index.vue 一致
      },
    });

    // section2 (业务部分) pin 住，让插入部分从上方覆盖
    if (section2Ref.value) {
      ScrollTrigger.create({
        trigger: section2Ref.value,
        start: "top top",
        end: "bottom top", // pin到第二部分的底部到达视口顶部时，确保插入部分完全覆盖
        pin: true,
        pinSpacing: false, // 不占用空间，让下面的内容可以覆盖上来
        markers: false,
        onEnter: () => {
          // pin 开始时，降低第二部分的 z-index
          if (section2Ref.value) {
            section2Ref.value.style.zIndex = '5';
          }
        },
      });
    }

    // 插入部分 pin 住，让第三部分从上方覆盖
    if (insertedSectionRef.value) {
      ScrollTrigger.create({
        trigger: insertedSectionRef.value,
        start: "top top",
        end: "bottom top", // pin 到插入部分的底部到达视口顶部时
        pin: true,
        pinSpacing: false, // 不占用空间，让第三部分可以覆盖上来
        markers: false,
        onEnter: () => {
          if (insertedSectionRef.value) {
            insertedSectionRef.value.style.zIndex = '10';
          }
        },
      });
    }

    // workflow (第三部分) pin 住 - 仅桌面端
    if (workflowSectionRef.value && window.innerWidth >= 1024) {
      ScrollTrigger.create({
        trigger: workflowSectionRef.value,
        start: "top top",
        end: "+=200%", // pin住的总滚动距离
        pin: true,
        pinSpacing: true,
        markers: false,
      });
    }

    // workflow 容器整体从右边滑到左边的动画，同时更新 canvas 显示 - 仅桌面端
    if (window.innerWidth >= 1024) {
      nextTick(() => {
        const workflowContainer = document.querySelector('.workflow-container');
        if (workflowContainer) {
          // 精确计算：容器总宽度 = item数量 * 每个item宽度(500px)
          const totalWidth = contact_workflow.value.length * 500;
          
          gsap.fromTo(workflowContainer,
            {
              left: '100vw'
            },
            {
              left: `-${totalWidth}px`, // 精确滑动到所有item都消失
              ease: "none",
              scrollTrigger: {
                trigger: workflowSectionRef.value,
                start: "top top",
                end: "+=200%", // 和pin时间保持一致
                scrub: 1, // 减小scrub值让响应更快
                markers: false,
                onUpdate: (self) => {
                  // 滚动时更新 Canvas 显示
                  updateWorkflowCanvas(self.progress);
                }
              },
            }
          );
        }
      });
    }


    // 列表项从右边依次滑入的动画
    nextTick(() => {
      describeRefs.value.forEach((el: any, index: number) => {
        if (el) {
          gsap.fromTo(el, 
            {
              x: 100,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%", // 当元素顶部到达视口85%位置时触发
                end: "top 60%",
                scrub: 0.3, // 减小scrub值让动画更快响应
                markers: false,
                once: false, // 允许反向滚动时也触发动画
              },
            }
          );
        }
      });
    });

    // section-5 (Let's Talk) 根据滚动条慢慢滑出来盖住第三部分
    // 当第三部分完全显示并 pin 住时立即开始
    const letsTalkAnimation = gsap.to(".section-5", {
      y: 0,
      x: 0,
      rotate: 0,
      scrollTrigger: {
        trigger: section3Ref.value,
        start: "bottom bottom", // 第三部分完全显示时立即开始
        end: "bottom top", // 滚动一个视口高度后完成动画（Let's talk 完全盖住）
        scrub: true, // 使用 true 让动画完全跟随滚动条，一步步滑出
        markers: false, // 调试时可以设为 true
      },
    });

    // 第三部分 pin 住，直到 Let's talk 完全盖住才结束 pin
    if (section3Ref.value) {
      ScrollTrigger.create({
        trigger: section3Ref.value,
        start: "bottom bottom", // 当第三部分底部到达视口底部时（完全显示）就 pin 住
        end: "bottom top", // 和 Let's talk 动画结束时机一致，Let's talk 完全盖住时才结束 pin
        pin: true,
        pinSpacing: false,
        markers: false, // 调试时可以设为 true
      });
    }

    // Let's talk 完全盖住后，section3 整体斜推动画（右斜上左上）
    gsap.to(".section3", {
      scrollTrigger: {
        trigger: ".section-6",
        start: "top 5%",
        end: "bottom bottom",
        scrub: 1,
        toggleActions: "restart none none reverse",
        markers: false, // 调试时可以设为 true
      },
      rotate: -5,
      x: isMobile.value ? '-12vw' : '-6vw',
      ease: "power2.inOut",
    });

  });
};

// 设置每个describe item的ref
const setDescribeRef = (el: any, index: string | number) => {
  if (el) {
    describeRefs.value[index] = el;
  }
};

// 设置每个workflow item的ref
const setWorkflowRef = (el: any, index: string | number) => {
  if (el) {
    workflowRefs.value[index] = el;
  }
};

// 切换展开状态的函数（手风琴效果 - 同时只能展开一个）
const toggleExpand = (index: string | number) => {
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

// ===== Canvas 渲染相关 =====
const workflowImages = ref<HTMLImageElement[]>([]);

// 预加载所有 workflow 图片
const loadWorkflowImages = async () => {
  if (contact_workflow.value.length === 0) return;
  
  const imagePromises = contact_workflow.value.map((item: any, index: number) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imgBaseURL(item.img);
      
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        console.error(`Failed to load image: ${item.img}`);
        resolve(img); // 即使失败也resolve，避免阻塞
      };
    });
  });
  
  try {
    workflowImages.value = await Promise.all(imagePromises);
  } catch (error) {
    console.error('Error loading workflow images:', error);
  }
};

// 初始化 Canvas
const initWorkflowCanvas = () => {
  if (!workflowCanvasRef.value) return;
  
  const canvas = workflowCanvasRef.value;
  
  // 获取 Canvas 的实际显示尺寸（CSS 设置的尺寸）
  const rect = canvas.getBoundingClientRect();
  const displayWidth = rect.width;
  const displayHeight = rect.height;
  
  // 考虑设备像素比，提高清晰度（但限制最大值避免性能问题）
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  
  // 设置 Canvas 的实际分辨率
  canvas.width = displayWidth * dpr;
  canvas.height = displayHeight * dpr;
  
  // 设置 CSS 尺寸
  canvas.style.width = `${displayWidth}px`;
  canvas.style.height = `${displayHeight}px`;
  
  // 保存 dpr 到 canvas 的数据属性中
  (canvas as any).dpr = dpr;
};

// 更新 Canvas 显示 - 根据滚动进度
const updateWorkflowCanvas = (progress: number) => {
  if (!workflowCanvasRef.value || workflowImages.value.length === 0) return;
  
  const canvas = workflowCanvasRef.value;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  // 获取设备像素比
  const dpr = (canvas as any).dpr || Math.min(window.devicePixelRatio || 1, 2);
  
  // 获取画布的显示尺寸（逻辑像素）
  const canvasRect = canvas.getBoundingClientRect();
  const displayWidth = canvasRect.width;
  const displayHeight = canvasRect.height;
  
  // 清空画布（使用物理像素）
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 设置高质量图片渲染
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // 应用缩放
  ctx.save();
  ctx.scale(dpr, dpr);
  
  // 先绘制第一张图片作为基础背景（始终完整显示）
  const firstImg = workflowImages.value[0];
  if (firstImg && firstImg.complete) {
    const scale = Math.min(
      displayWidth / firstImg.width,
      displayHeight / firstImg.height
    );
    const scaledWidth = firstImg.width * scale;
    const scaledHeight = firstImg.height * scale;
    const imgX = (displayWidth - scaledWidth) / 2;
    const imgY = (displayHeight - scaledHeight) / 2;
    
    ctx.drawImage(firstImg, imgX, imgY, scaledWidth, scaledHeight);
  }
  
  const canvasLeft = canvasRect.left;
  const canvasRight = canvasRect.right;
  
  // 遍历其他 workflow item，覆盖在基础背景上
  for (let index = 1; index < workflowRefs.value.length; index++) {
    const item = workflowRefs.value[index];
    if (!item) continue;
    
    const itemRect = item.getBoundingClientRect();
    const img = workflowImages.value[index];
    
    if (!img || !img.complete) continue;
    
    // 计算 item 与 canvas 的重叠区域
    const overlapLeft = Math.max(itemRect.left, canvasLeft);
    const overlapRight = Math.min(itemRect.right, canvasRight);
    
    // 如果有重叠，绘制这部分
    if (overlapRight > overlapLeft) {
      // 计算在 canvas 逻辑坐标系中的位置
      const clipX = overlapLeft - canvasLeft;
      const clipWidth = overlapRight - overlapLeft;
      
      // 计算图片缩放以适应 canvas（使用逻辑尺寸）
      const scale = Math.min(
        displayWidth / img.width,
        displayHeight / img.height
      );
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      
      // 图片在 canvas 中居中的位置（逻辑坐标）
      const imgX = (displayWidth - scaledWidth) / 2;
      const imgY = (displayHeight - scaledHeight) / 2;
      
      // 使用裁剪路径限制绘制区域
      ctx.save();
      ctx.beginPath();
      ctx.rect(clipX, 0, clipWidth, displayHeight);
      ctx.clip();
      
      // 绘制完整的图片（会被裁剪）
      ctx.drawImage(img, imgX, imgY, scaledWidth, scaledHeight);
      
      ctx.restore();
    }
  }
  
  ctx.restore(); // 恢复缩放
};

// 渲染初始状态的 Canvas
const renderInitialCanvas = () => {
  // 初始时强制绘制第一张图片（因为 workflow items 还在屏幕外）
  if (!workflowCanvasRef.value || workflowImages.value.length === 0) return;
  
  const canvas = workflowCanvasRef.value;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const dpr = (canvas as any).dpr || Math.min(window.devicePixelRatio || 1, 2);
  const canvasRect = canvas.getBoundingClientRect();
  const displayWidth = canvasRect.width;
  const displayHeight = canvasRect.height;
  
  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // 设置高质量图片渲染
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  
  // 应用缩放
  ctx.save();
  ctx.scale(dpr, dpr);
  
  // 绘制第一张图片（居中，完整显示）
  const img = workflowImages.value[0];
  if (img && img.complete) {
    const scale = Math.min(
      displayWidth / img.width,
      displayHeight / img.height
    );
    const scaledWidth = img.width * scale;
    const scaledHeight = img.height * scale;
    const imgX = (displayWidth - scaledWidth) / 2;
    const imgY = (displayHeight - scaledHeight) / 2;
    
    ctx.drawImage(img, imgX, imgY, scaledWidth, scaledHeight);
  }
  
  ctx.restore();
};



// 处理hover离开时的文字闪动
const setupHoverEffects = () => {
  const leftContainer = document.querySelector('.hover-container-left');
  const rightContainer = document.querySelector('.hover-container-right');
  const textChars = document.querySelectorAll('.hover-text-char');

  // 清理动画类的函数
  const clearAnimation = (char: Element) => {
    setTimeout(() => {
      char.classList.remove('flicker-leave');
      (char as HTMLElement).style.animationDelay = '';
    }, 500); // 动画持续时间后清理
  };

  if (leftContainer && textChars.length > 0) {
    leftContainer.addEventListener('mouseleave', () => {
      // 移除现有的动画类
      textChars.forEach(char => {
        char.classList.remove('flicker-leave');
      });
      
      // 强制重排后添加动画类
      requestAnimationFrame(() => {
        textChars.forEach((char, index) => {
          char.classList.add('flicker-leave');
          (char as HTMLElement).style.animationDelay = `${index * 0.04}s`;
          // 动画完成后清理
          clearAnimation(char);
        });
      });
    });
  }

  if (rightContainer && textChars.length > 0) {
    rightContainer.addEventListener('mouseleave', () => {
      // 移除现有的动画类
      textChars.forEach(char => {
        char.classList.remove('flicker-leave');
      });
      
      // 强制重排后添加动画类
      requestAnimationFrame(() => {
        textChars.forEach((char, index) => {
          char.classList.add('flicker-leave');
          (char as HTMLElement).style.animationDelay = `${index * 0.04}s`;
          // 动画完成后清理
          clearAnimation(char);
        });
      });
    });
  }
};

onMounted(async() => {
  // 请求数据
  const caseListData: any = await getDictList({ typeName: 'contact' });
  const aboutListData: any = await getDictList({ typeName: 'contact_value_list' });
  const businessImgsData: any = await getDictList({ typeName: 'contact_business_imgs' });
  const businessListData: any = await getDictList({ typeName: 'contact_business_list' });
  const cardListData: any = await getDictList({ typeName: 'contact_team' });
  const title: any = await getDictList({ typeName: 'contact_business_title' });
  const workflowImgsData: any = await getDictList({ typeName: 'contact_workflow' });
  
  // 初始化数据
  caseList.value = caseListData?.data ?? [];
  aboutList.value = aboutListData?.data ?? [];
  businessImgs.value = businessImgsData?.data ?? [];
  businessList.value = businessListData?.data ?? [];
  businessTitle.value = title?.data ?? [];
  contact_workflow.value = workflowImgsData?.data ?? [];
  cardList.value = cardListData?.data ?? [];
  
  // 初始化 Canvas 和加载图片
  await nextTick();
  initWorkflowCanvas();
  await loadWorkflowImages();
  
  initLenis();
  initAnimations();
  
  // 延迟一点再渲染，确保所有元素已经布局完成
  setTimeout(() => {
    setupHoverEffects();
    renderInitialCanvas();
  }, 100);
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
  // 清理 resize 监听器
  if (import.meta.client) {
    window.removeEventListener('resize', handleResize);
  }
});
</script>

<style scoped>
  /* 覆盖section的通用样式 */
  .cover-section {
    position: relative;
    z-index: 10;
  }
  
  /* 插入部分的样式 */
  .inserted-section {
    position: relative;
    z-index: 10;
    .project-title {
      .title {
        color: #000;
        font-size: clamp(12px, 1.2vw, 16px);
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        font-family: "Noto";
      }
      .subtitle {
        color: #0B0B0B;
        font-family: Inter;
        font-size: clamp(64px, 10vw, 160px);
        font-style: normal;
        font-weight: 500;
        line-height: 1;
        letter-spacing: clamp(-2px, -0.4vw, -6px);
        text-transform: capitalize;
      }
    }
    .project-title-number {
      color: #3B4EFF;
      font-size: clamp(100px, 10vw, 160px);
      font-style: normal;
      font-weight: 500;
      line-height: 1;
      letter-spacing: clamp(-2px, -0.4vw, -6px);
      text-transform: capitalize;
    }
  }

  .section1 {
    display: flex;
    align-items: flex-end;
    position: relative;
    z-index: 1;
    .section1-content {
      background: rgba(59, 78, 255, 0.50);
      padding-top: 80px;
      padding-left: 40px;
      /* max-width: 1600px;
      max-height: 760px; */
      padding-top: 200px;
      width: 100%;
      height: 100%;
      aspect-ratio: 1600/760;
      transform-origin: left bottom; /* 设置旋转轴心为左下角 */
      
      p{
        color: #FFF;
        font-size: 160px;
        font-style: normal;
        font-weight: 500;
        line-height: 1;
        letter-spacing: -0.0375em;
        text-transform: capitalize;
        margin-bottom: 40px;
        /* 1920px 以下 */
        @media screen and (max-width: 1920px) {
          font-size: 140px;
          margin-bottom: 35px;
        }

        /* 1680px 以下 */
        @media screen and (max-width: 1680px) {
          font-size: 120px;
          margin-bottom: 30px;
        }

        /* 1440px 以下 */
        @media screen and (max-width: 1440px) {
          font-size: 100px;
          margin-bottom: 25px;
          max-width: 900px;
        }

        /* 1280px 以下 */
        @media screen and (max-width: 1280px) {
          font-size: 90px;
          margin-bottom: 22px;
        }

        /* 1024px 以下 */
        @media screen and (max-width: 1024px) {
          font-size: 72px;
          margin-bottom: 18px;
        }

        /* 768px 以下（移动端）*/
        @media screen and (max-width: 768px) {
          font-size: 48px;
          line-height: 57.6px;
          margin-bottom: 16px;
        }
      }
      
      span{
        color: #FFF;
        font-size: 64px;
        font-style: normal;
        font-weight: 400;
        line-height: 1;

        /* 1920px 以下 */
        @media screen and (max-width: 1920px) {
          font-size: 56px;
        }

        /* 1680px 以下 */
        @media screen and (max-width: 1680px) {
          font-size: 48px;
        }

        /* 1440px 以下 */
        @media screen and (max-width: 1440px) {
          font-size: 40px;
        }

        /* 1280px 以下 */
        @media screen and (max-width: 1280px) {
          font-size: 36px;
        }

        /* 1024px 以下 */
        @media screen and (max-width: 1024px) {
          font-size: 28px;
        }

        /* 768px 以下（移动端）*/
        @media screen and (max-width: 768px) {
          font-size: 24px;
        }
      }
    }
  }

  .section2 {
    .project-title {
      .title {
        color: #000;
        font-size: clamp(12px, 1.2vw, 16px);
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        font-family: "Noto";
      }
      .subtitle {
        color: #0B0B0B;
        font-family: Inter;
        font-size: clamp(64px, 10vw, 160px);
        font-style: normal;
        font-weight: 500;
        line-height: 1;
        letter-spacing: clamp(-2px, -0.4vw, -6px);
        text-transform: capitalize;
      }
    }
    .project-count {
      color: #3B4EFF;
      font-family: Inter;
      font-size: 160px;
      font-style: normal;
      font-weight: 500;
      line-height: 160px; 
      letter-spacing: -6px;
      text-transform: capitalize;
      @media screen and (max-width: 768px) {
        font-size: 48px;
        font-style: normal;
        font-weight: 500;
        line-height: 48px; /* 100% */
        letter-spacing: -6px;
      }
    }
    .project-list {
      .project-slogan {
        margin-top: 80px;
        @media screen and (max-width: 768px) {
          margin-top: 40px;
        }
        .project-title {
          display: flex;
          align-items: center;
          gap: 208px;
          @media screen and (max-width: 768px) {
            flex-direction: column;
            gap: 0;
            align-items: flex-start;
          }
          label{
            color: #000;
            font-family: Inter;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
            text-transform: uppercase;
            @media screen and (max-width: 768px) {
              font-size: 12px;
              font-style: normal;
              font-weight: 400;
              line-height: 12px; /* 100% */
              margin-bottom: 8px;
            }
          }
          span{
            color: #000;
            font-family: Inter;
            font-size: 64px;
            font-style: normal;
            font-weight: 400;
            line-height: 64px;
            @media screen and (max-width: 768px) {
              font-size: 24px;
              font-style: normal;
              font-weight: 400;
              line-height: 28.8px; /* 120% */
            }
          }
        }
        .project-content {
          color: #000;
          font-family: Inter;
          font-size: 64px;
          font-style: normal;
          font-weight: 400;
          line-height: 64px; /* 100% */
          margin-top: 12px;
          max-width: 1540px;
          
          @media screen and (max-width: 768px) {
            font-size: 24px;
            font-style: normal;
            font-weight: 400;
            line-height: 28.8px; /* 120% */
            margin-top: 0px;
          }
        }
        .project-bottom {
          color: #666;
          font-family: "Noto";
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: 32px; /* 200% */
          margin-top: 20px;
          @media screen and (max-width: 768px) {
            font-family: "Noto";
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px; /* 150% */
            margin-top: 8px;
          }
        }
      }
    }
    .project-list2 {
      margin-top: 40px;
      @media screen and (max-width: 768px) {
        margin-top: 40px;
      }
      
      /* Grid 布局 - 三等分 */
      .project-grid-3 {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        
        @media screen and (min-width: 1024px) {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      
      /* Grid 布局 - 四等分(1+1+2模式) */
      .project-grid-4 {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;
        
        @media screen and (min-width: 1024px) {
          grid-template-columns: repeat(4, 1fr);
        }
      }
    }
  }

  .section3{
    position: relative;
    z-index: 20;
    
    .project-title {
      .title {
        color: #000;
        font-size: clamp(12px, 1.2vw, 16px);
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        font-family: "Noto";
      }
      .subtitle {
        color: #0B0B0B;
        font-family: Inter;
        font-size: clamp(64px, 10vw, 160px);
        font-style: normal;
        font-weight: 500;
        line-height: 1;
        letter-spacing: clamp(-2px, -0.4vw, -6px);
        text-transform: capitalize;
      }
    }
    .project-select {
      gap:12px;
      div{
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    
    /* remark内容样式优化 */
    .remark-content {
      transform: translateZ(0); /* 启用GPU加速 */
      backface-visibility: hidden; /* 防止闪烁 */
      will-change: height, opacity; /* 提示浏览器这些属性会改变 */
    }

    /* describe-item-wrapper 悬浮边框渐变效果 */
    .describe-item-wrapper {
      position: relative;
    }

    .describe-item {
      position: relative;
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

    .describe-item-wrapper:hover .describe-item::after {
      transform: scaleX(1);
      transform-origin: right;
    }

    /* 当悬浮离开时，从右边收回 - 使用不同的缓动函数 */
    .describe-item-wrapper:not(:hover) .describe-item::after {
      transform: scaleX(0);
      transform-origin: right;
      transition: transform 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19);
    }
    .section3-number {
      color: #3B4EFF;
      font-family: Inter;
      font-size: 160px;
      font-style: normal;
      font-weight: 500;
      line-height: 160px; /* 100% */
      letter-spacing: -6px;
      text-transform: capitalize;
      display: flex;
      justify-content: flex-end;
      margin-top: 40px;
      @media screen and (max-width: 768px) {
        font-size: 48px;
        font-style: normal;
        font-weight: 500;
        line-height: 48px; /* 100% */
        letter-spacing: -6px;
        justify-content: space-between;
        margin-bottom: 40px;
      }
    }
  }


  /* 按钮样式 - 全局使用 */
  .list-button {
    /* 桌面端：自适应大小 */
    padding: clamp(3px, 0.3vw, 4px) clamp(12px, 1vw, 16px);
    font-family: Inter;
    font-size: clamp(18px, 1.5vw, 24px);
    font-weight: 400;
    line-height: clamp(24px, 2vw, 32px);
    border-radius: 44.44px;
    background: rgba(218, 218, 218, 0.60);
    backdrop-filter: blur(12.5px);
    gap: clamp(3px, 0.3vw, 4px);
    color: #fff;
    transition: all 0.3s ease;
    
    img {
      width: clamp(18px, 1.5vw, 24px);
      height: clamp(18px, 1.5vw, 24px);
      transition: all 0.3s ease;
    }
    
    &.active {
      color: #3B4EFF;
      background: rgba(59, 78, 255, 0.10);
    }
    
    /* 移动端：固定较小尺寸 */
    @media (max-width: 768px) {
      padding: 3px 12px;
      font-size: 12px;
      line-height: 24px;
      gap: 3px;
      
      img {
        width: 16px;
        height: 16px;
      }
    }
  }


  /* SVG闪烁动画 - 闪烁三次 */
  @keyframes iconBlink {
    0%, 100% { opacity: 1; }
    16.67% { opacity: 0; }
    33.33% { opacity: 1; }
    50% { opacity: 0; }
    66.67% { opacity: 1; }
    83.33% { opacity: 0; }
  }

  .button-icon.blinking {
    animation: iconBlink 0.9s ease-in-out;
  }

  /* Let's Talk 响应式样式 */
  /* 超过1920px时使用固定px值 */
  @media (min-width: 1920px) {
    .lets-talk-top-left {
      border-bottom-right-radius: 144px;
      padding-left: 40px;
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
      margin-left: 20px;
    }
    .lets-talk-img {
      height: 290px;
    }
  }

  /* 小于1920px时使用vw响应式 */
  @media (max-width: 1919px) {
    .lets-talk-top-left {
      border-bottom-right-radius: 7.5vw;
      padding-left: 2.08vw;
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
      margin-left: 1.5vw;
    }
    .lets-talk-img {
      height: 14.5vw;
    }
  }

  /* Hover动画样式 */

  /* 左侧容器hover效果 */
  .hover-container-left {
    position: relative;
    cursor: pointer;
  }

  .hover-img-left {
    transform: translateX(-100%);
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    width: 0;
    overflow: hidden;
  }

  .hover-container-left:hover .hover-img-left {
    transform: translateX(0);
    width: auto;
  }

  /* 文字逐字闪烁动画 */
  .hover-text-container {
    display: inline-block;
  }

  .hover-text-char {
    display: inline-block;
    opacity: 1;
    transition: opacity 0.1s ease;
  }

  .hover-container-left:hover .hover-text-char {
    animation: charFlicker 0.5s ease forwards;
  }

  .hover-container-left:hover .hover-text-char:nth-child(1) { animation-delay: 0.04s; }
  .hover-container-left:hover .hover-text-char:nth-child(2) { animation-delay: 0.08s; }
  .hover-container-left:hover .hover-text-char:nth-child(3) { animation-delay: 0.12s; }
  .hover-container-left:hover .hover-text-char:nth-child(4) { animation-delay: 0.16s; }
  .hover-container-left:hover .hover-text-char:nth-child(5) { animation-delay: 0.2s; }
  .hover-container-left:hover .hover-text-char:nth-child(6) { animation-delay: 0.24s; }
  .hover-container-left:hover .hover-text-char:nth-child(7) { animation-delay: 0.28s; }
  .hover-container-left:hover .hover-text-char:nth-child(8) { animation-delay: 0.32s; }
  .hover-container-left:hover .hover-text-char:nth-child(9) { animation-delay: 0.36s; }
  .hover-container-left:hover .hover-text-char:nth-child(10) { animation-delay: 0.4s; }

  /* 右边hover时也触发相同效果 */
  .section-5:has(.hover-container-right:hover) .lets-talk-top-left .hover-img-left {
    transform: translateX(0) !important;
    width: auto !important;
  }

  .section-5:has(.hover-container-right:hover) .hover-text-char {
    animation: charFlicker 0.5s ease forwards;
  }

  .section-5:has(.hover-container-right:hover) .hover-text-char:nth-child(1) { animation-delay: 0.04s; }
  .section-5:has(.hover-container-right:hover) .hover-text-char:nth-child(2) { animation-delay: 0.08s; }
  .section-5:has(.hover-container-right:hover) .hover-text-char:nth-child(3) { animation-delay: 0.12s; }
  .section-5:has(.hover-container-right:hover) .hover-text-char:nth-child(4) { animation-delay: 0.16s; }
  .section-5:has(.hover-container-right:hover) .hover-text-char:nth-child(5) { animation-delay: 0.2s; }
  .section-5:has(.hover-container-right:hover) .hover-text-char:nth-child(6) { animation-delay: 0.24s; }
  .section-5:has(.hover-container-right:hover) .hover-text-char:nth-child(7) { animation-delay: 0.28s; }
  .section-5:has(.hover-container-right:hover) .hover-text-char:nth-child(8) { animation-delay: 0.32s; }
  .section-5:has(.hover-container-right:hover) .hover-text-char:nth-child(9) { animation-delay: 0.36s; }
  .section-5:has(.hover-container-right:hover) .hover-text-char:nth-child(10) { animation-delay: 0.4s; }

  @keyframes charFlicker {
    0% { opacity: 1; }
    15% { opacity: 0; }
    30% { opacity: 1; }
    45% { opacity: 0; }
    60% { opacity: 1; }
    75% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes charFlickerLeave {
    0% { opacity: 1; }
    15% { opacity: 0; }
    30% { opacity: 1; }
    45% { opacity: 0; }
    60% { opacity: 1; }
    75% { opacity: 0; }
    100% { opacity: 1; }
  }

  /* 右侧容器hover效果 */
  .hover-container-right {
    position: relative;
    cursor: pointer;
  }

  .hover-img-right {
    transform: translateX(0);
    transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    width: auto;
    overflow: hidden;
  }

  .hover-container-right:hover .hover-img-right {
    transform: translateX(100%);
    width: 0;
  }

  /* hover结束后的恢复动画 */
  .hover-container-left:not(:hover) .hover-img-left {
    transform: translateX(-100%);
    width: 0;
    transition: transform 0.4s ease, width 0.4s ease;
  }

  /* JavaScript触发的hover离开文字闪动 */
  .hover-text-char.flicker-leave {
    animation: charFlickerLeave 0.5s ease forwards;
  }

  .hover-container-right:not(:hover) .hover-img-right {
    transform: translateX(0);
    width: auto;
    transition: transform 0.4s ease, width 0.4s ease;
  }

  /* 左右联动效果 - 使用section容器来检测hover状态 */
  /* 左边hover时，右边图片隐藏 */
  .section-5:has(.hover-container-left:hover) .hover-img-right {
    transform: translateX(100%);
    width: 0;
  }

  /* 右边hover时，左边图片隐藏 */  
  .section-5:has(.hover-container-right:hover) .hover-img-left {
    transform: translateX(-100%);
    width: 0;
  }

  /* 十字线初始样式 */
  .line-w {
    width: 100vw;
  }

  .line-h {
    height: 100vh;
  }

  /* 按钮禁用状态 */
  .list-button.disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* Workflow Canvas 背景 */
  .workflow-canvas {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(800px, 90vw);
    height: min(800px, 90vh);
    pointer-events: none;
    z-index: 1;
    object-fit: contain;
  }
  
    .workflow-container {
      z-index: 2;
 
      .mask-cover{
        position: absolute;
        background: rgba(218, 218, 218, 0.60);
        backdrop-filter: blur(12.5px);
        padding: 24px;
        display: flex;
        flex-direction: column;
        left: 16px;
        right: 16px;
      }
    }
    
    .workflow-item {
      position: relative;
      /* background-color: rgba(248, 248, 248, 0.15); */
      /* backdrop-filter: blur(1px);
      transition: background-color 0.3s ease; */
      
      /* 第一个、第三个、第五个... (奇数位) - 距离底部 252px */
      &:nth-child(odd) .mask-cover {
        bottom: 252px;
      }
      
      /* 第二个、第四个、第六个... (偶数位) - 距离底部 40px */
      &:nth-child(even) .mask-cover {
        bottom: 40px;
      }
    }
    
    /* 隐藏滚动条 */
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
      &::-webkit-scrollbar {
        display: none;
      }
    }
</style>