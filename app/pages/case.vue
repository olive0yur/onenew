<template>
  <div class="overflow-hidden">
    <!-- 第一部分 -->
    <div class="w-[100vw] h-[100dvh] section1" :style="{ backgroundImage: `url(${imgBaseURL(caseList[0]?.img)})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
      <div class="section1-content flex flex-col justify-between lg:justify-start">
        <p>{{caseList[0]?.dict_value}}</p>
        <span class="hidden lg:flex">{{caseList[0]?.remark}}</span>
        <div class="flex justify-end mb-[16px]">
          <img src="/static/arrow-bottom.svg" alt="">
        </div>
      </div>
    </div>

    <!-- 图片循环 -->
    <div v-if="viewMode === 'ring'" class="w-[100vw] h-[100dvh] bg-[#f7f7f7] lg:p-[40px] p-[16px] circle-images-list relative">
      <!-- section3-head 部分 -->
      <div class="flex lg:flex-row flex-col lg:justify-between">
        <div class="flex flex-col project-title gap-[8px]">
          <span class="title">/我们的作品</span>
          <span class="subtitle">Projects</span>
        </div>
      </div>
      <div class="flex gap-[20px] absolute bottom-[20px] right-[40px] z-[11111]">
        <div 
          class="list-button flex items-center justify-center cursor-pointer" 
          :class="{ 'active': viewMode === 'list' }"
          @click="viewMode = 'list'"
        >
          <img :src="viewMode === 'list' ? '/static/star.svg' : '/static/star-white.svg'" alt="">
          List
        </div>
        <div 
          class="ring-button flex items-center justify-center cursor-pointer" 
          :class="{ 'active': viewMode === 'ring' }"
          @click="viewMode = 'ring'"
        >
          <img :src="viewMode === 'ring' ? '/static/star.svg' : '/static/star-white.svg'" alt="">
          Ring
        </div>
      </div>
      <CircleImagesList v-if="projectList.length > 0 && showCircleImages" :key="circleImagesKey" :images="projectList" />
    </div>

    <!-- 第二部分 -->
    <div v-if="viewMode === 'list'" ref="section2Ref" class="bg-[#f7f7f7] lg:p-[40px] p-[16px] section2">
      <!-- section2-head 部分 -->
      <div class="flex lg:flex-row flex-col lg:justify-between">
        <div class="flex flex-col project-title gap-[8px]">
          <span class="title">/我们的作品</span>
          <span class="subtitle">Projects</span>
        </div>
        <div class="project-count self-end mt-[20px] lg:mt-0">
          <span>(<NumberScroll :target="projectList.length" />)</span>
        </div>
      </div>

      <!-- section2-content 部分 -->
      <div class="project-list lg:mt-[80px] mt-[40px]">
        <!-- 前两个 -->
        <div class="flex flex-col lg:flex-row gap-[20px] relative" v-if="projectListArr.length > 0">
           <ProjectCard height="800px" :key="projectListArr[0].id" :project="projectListArr[0]" />
           <ProjectCard height="528px" :key="projectListArr[1].id" :project="projectListArr[1]" />
           <div class="absolute bottom-[100px] right-[40px] z-[11111] flex gap-[20px]">
             <div 
               class="list-button flex items-center justify-center cursor-pointer" 
               :class="{ 'active': viewMode === 'list' }"
               @click="viewMode = 'list'"
             >
               <img :src="viewMode === 'list' ? '/static/star.svg' : '/static/star-white.svg'" alt="">
               List
             </div>
             <div 
               class="ring-button flex items-center justify-center cursor-pointer" 
               :class="{ 'active': viewMode === 'ring' }"
               @click="viewMode = 'ring'"
             >
               <img :src="viewMode === 'ring' ? '/static/star.svg' : '/static/star-white.svg'" alt="">
               Ring
             </div>
           </div>
        </div>

        <!-- 标语 -->
        <div class="project-slogan">
          <div class="project-title">
            <label>/{{projectSlogan[0]?.label}}</label>
            <span>{{projectSlogan[0]?.dict_value}}</span>
          </div>
          <div class="project-content">{{projectSlogan[0]?.description}}</div>
          <div class="project-bottom">{{projectSlogan[0]?.remark}}</div>
        </div>

        <!-- 剩余的部分 -->
        <div class="project-list2">
          <template v-for="(chunk, chunkIndex) in projectChunks" :key="chunkIndex">
            <!-- line-1: 单个大卡片 -->
            <div class="lg:mt-[40px] mt-[20px]" v-if="chunk[0]">
              <ProjectCard height="800px" :key="chunk[0].id" :project="chunk[0]" />
            </div>

            <!-- line-2: 1+1+2 布局 (使用grid) -->
            <div class="project-grid-4 lg:mt-[40px] mt-[20px]" v-if="chunk[1] || chunk[2] || chunk[3]">
              <ProjectCard v-if="chunk[1]" height="279px" :key="chunk[1].id" :project="chunk[1]" />
              <ProjectCard v-if="chunk[2]" height="279px" :key="chunk[2].id" :project="chunk[2]" />
              <ProjectCard v-if="chunk[3]" height="580px" class="lg:col-span-2" :key="chunk[3].id" :project="chunk[3]" />
            </div>

            <!-- line-3: 三个等宽卡片 (使用grid) -->
            <div class="project-grid-3 lg:mt-[40px] mt-[20px]" v-if="chunk[4] || chunk[5] || chunk[6]">
              <ProjectCard v-if="chunk[4]" height="345px" :key="chunk[4].id" :project="chunk[4]" />
              <ProjectCard v-if="chunk[5]" height="345px" :key="chunk[5].id" :project="chunk[5]" />
              <ProjectCard v-if="chunk[6]" height="345px" :key="chunk[6].id" :project="chunk[6]" />
            </div>

            <!-- line-4: 单个大卡片 -->
            <div class="lg:mt-[40px] mt-[20px]" v-if="chunk[7]">
              <ProjectCard height="800px" :key="chunk[7].id" :project="chunk[7]" />
            </div>

            <!-- line-5: 三个等宽卡片 (使用grid) -->
            <div class="project-grid-3 lg:mt-[40px] mt-[20px]" v-if="chunk[8] || chunk[9] || chunk[10]">
              <ProjectCard v-if="chunk[8]" height="345px" :key="chunk[8].id" :project="chunk[8]" />
              <ProjectCard v-if="chunk[9]" height="345px" :key="chunk[9].id" :project="chunk[9]" />
              <ProjectCard v-if="chunk[10]" height="345px" :key="chunk[10].id" :project="chunk[10]" />
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- 第三部分 -->
    <div class="bg-[#fff] lg:p-[40px] p-[16px] section3 lg:min-h-[100dvh]  h-auto">
      <!-- section3-head 部分 -->
      <div class="flex lg:flex-row flex-col lg:justify-between">
        <div class="flex flex-col project-title gap-[8px]">
          <span class="title">/我们的博文</span>
          <span class="subtitle">Blog</span>
        </div>
        <div class="project-select self-end mt-[20px] hidden lg:flex">
          <div class="w-[48px] h-[48px] rounded-full bg-[#F8F8F8] cursor-pointer" @click="scrollLeft">
            <img src="/static/left.svg" alt="">
          </div>
          <div class="w-[48px] h-[48px] rounded-full bg-[#3B4EFF] cursor-pointer" @click="scrollRight">
            <img src="/static/right.svg" alt="">
          </div>
        </div>
      </div>

      <!-- 滚动部分 -->
      <div class="blog-container">
        <div 
          ref="blogListRef" 
          class="blog-list flex lg:gap-[20px] gap-[12px] lg:pt-[120px] pt-[80px]"
          @wheel.prevent
          @touchmove.prevent
          @mousedown.prevent
        >
          <div 
            v-for="(item, index) in displayBlogList" 
            :key="`${item.id}-${index}`"
            class="blog-item"
            :style="getBlogItemStyle(index)"
          >
            <BlogCard :blog="item" />
          </div>
        </div>
      </div>

      <!-- 数字部分 -->
      <div class="section3-number">
        <div class="project-select self-end  lg:hidden flex">
          <div class="w-[48px] h-[48px] rounded-full bg-[#F8F8F8] cursor-pointer" @click="scrollLeft">
            <img src="/static/left.svg" alt="">
          </div>
          <div class="w-[48px] h-[48px] rounded-full bg-[#3B4EFF] cursor-pointer" @click="scrollRight">
            <img src="/static/right.svg" alt="">
          </div>
        </div>
        <span>(<NumberScroll :target="blogList.length" />)</span>
      </div>
    </div>

    <section id="section-6" class="section-6 relative z-[30]">
      <!-- Let's talk -->
      <section id="section-5" class="section-5 rotate-[20deg] lg:h-[100vh] h-[60dvh] w-[100vw] box-border grid grid-cols-2 absolute translate-y-[140vh] translate-x-[-20vw] z-[32] bg-[#F8F8F8] overflow-hidden" style="grid-template-rows: 1fr 1.4fr;">
          <div class="lets-talk-top-left bg-[#fff] overflow-hidden relative">
            <div class="flex items-center hover-container-left">
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
          <div class="lets-talk-top-right bg-[#fff] overflow-hidden">
            <div class="flex justify-end items-center hover-container-right ">
              <span class="lets-talk-title opacity-0">L</span>
              <img :src="imgBaseURL('right.png')" class="right-img hover-img-right m" alt=""></img>
            </div>
          </div>
          <div class="lets-talk-bottom-left bg-[#fff] flex items-end">
            <img :src="imgBaseURL('o.png')" class="lets-talk-img" alt="">
            <img :src="imgBaseURL('n.png')" class="lets-talk-img" alt="">
            <img :src="imgBaseURL('e.png')" class="lets-talk-img" alt="">
          </div>
          <div class="lets-talk-bottom-right bg-[#fff] flex justify-start items-end">
            <div class="flex">
              <img :src="imgBaseURL('n.png')" class="lets-talk-img" alt="">
              <img :src="imgBaseURL('e.png')" class="lets-talk-img" alt="">
              <img :src="imgBaseURL('w.png')" class="lets-talk-img" alt="">
            </div>
          </div>
          <div class="absolute w-[288px] h-[288px] z-[33] top-[38%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-wrap">
            <svg class="star" viewBox="0 0 288 288" xmlns="http://www.w3.org/2000/svg">
              <!-- 灰色背景 -->
              <rect width="288" height="288" fill="#fff"/>
              
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
      <Footer :padding-top="isMobile ? 0 : 100" :height="isMobile ? 'calc(100dvh + 250px)' : 'calc(100vh + 469px)'" />
    </section>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useLenis } from "~/composables/useLenis";
import { getDictList } from "~/composables/api";
import { imgBaseURL } from "~/utils";
import ProjectCard from "~/components/ui/projectCard/index.vue";
import BlogCard from "~/components/ui/blogCard/index.vue";
import CircleImagesList from "~/components/ui/circleImagesList/index.vue";

const caseList: any = ref<any[]>([]);
const projectList: any = ref<any[]>([]);
const projectListArr: any = ref<any[]>([]);
const projectListArr2: any = ref<any[]>([]);
const projectSlogan: any = ref<any[]>([]);
const blogList: any = ref<any[]>([]);
const isMobile = ref(false);
const viewMode: any = ref('ring'); // 默认显示 ring 模式
const section2Ref = ref<HTMLElement | null>(null);
let savedScrollPosition = 0; // 保存滚动位置
const circleImagesKey = ref(0); // 用于强制重新加载 CircleImagesList
const showCircleImages = ref(true); // 控制 CircleImagesList 的显示

useHead({ 
  title: 'ONEW专业网站建设公司 云联在线 案例',
  meta: [
    { name: 'description', content: 'ONEW专业网站建设公司 云联在线 案例 案例展示' },
    { name: 'keywords', content: 'ONEW专业网站建设公司 云联在线 案例 案例展示' },
  ],
})

// 监听视图模式切换
watch(viewMode, (newMode, oldMode) => {
  if (import.meta.client) {
    if (newMode === 'list') {
      // 切换到 list 模式时,隐藏圆环组件并保存滚动位置
      showCircleImages.value = false;
      savedScrollPosition = window.scrollY;
      // 等待 DOM 更新后,保持在相同的位置
      nextTick(() => {
        if (section2Ref.value) {
          window.scrollTo({
            top: savedScrollPosition,
            behavior: 'instant' as ScrollBehavior
          });
        }
      });
    } else if (newMode === 'ring') {
      // 切换回 ring 模式时,先隐藏组件,等待一帧后重新显示
      showCircleImages.value = false;
      nextTick(() => {
        window.scrollTo({
          top: savedScrollPosition,
          behavior: 'instant' as ScrollBehavior
        });
        // 等待组件完全卸载后再重新加载
        setTimeout(() => {
          circleImagesKey.value++;
          showCircleImages.value = true;
        }, 100);
      });
    }
  }
});

// 博客列表滚动相关
const currentVisibleIndex = ref(0); // 当前视觉上最左边（第一个）的卡片索引
const blogListRef = ref<HTMLElement | null>(null);
const isAnimating = ref(false);

// 创建循环显示的博客列表（复制3份以实现无限循环）
const displayBlogList = computed(() => {
  if (blogList.value.length === 0) return [];
  return [...blogList.value, ...blogList.value, ...blogList.value];
});

// GSAP context 和 Lenis 实例
const ctx: any = ref(null);
const lenis: any = ref(null);

// 检测移动端设备
const detectMobile = () => {
  if (import.meta.client) {
    const wasMobile = isMobile.value;
    isMobile.value = window.innerWidth < 768;
    
    // 如果设备类型改变了（桌面<->移动端），重新初始化博客列表位置和高度
    if (wasMobile !== isMobile.value && blogList.value.length > 0) {
      nextTick(() => {
        // 重新计算并设置滚动位置
        const gap = isMobile.value ? 12 : 20;
        const cardWidth = isMobile.value ? 110 : 315;
        const itemWidth = cardWidth + gap;
        
        // 根据当前的 currentVisibleIndex 计算应该滚动到的位置
        const targetScrollPosition = itemWidth * (blogList.value.length + currentVisibleIndex.value);
        
        if (blogListRef.value) {
          blogListRef.value.scrollLeft = targetScrollPosition;
        }
        
        // 更新所有卡片的高度
        updateBlogCardsHeight();
      });
    }
  }
};

// 更新所有博客卡片的高度
const updateBlogCardsHeight = () => {
  if (!blogListRef.value || blogList.value.length === 0) return;
  
  const heightOffset = isMobile.value ? 40 : 80;
  const baseHeight = isMobile.value ? 148 : 420;
  const listLength = blogList.value.length;
  const blogItems = blogListRef.value.querySelectorAll('.blog-item');
  
  blogItems.forEach((item, index) => {
    const positionInOriginalList = index % listLength;
    const isVisibleFirst = positionInOriginalList === currentVisibleIndex.value;
    const height = isVisibleFirst ? baseHeight : baseHeight + heightOffset;
    (item as HTMLElement).style.height = `${height}px`;
  });
};

// 注册 GSAP 插件
if(import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
  detectMobile(); // 初始化时检测
  window.addEventListener('resize', detectMobile); // 监听窗口大小变化
}

// 将 projectListArr2 按每11个分组
const projectChunks = computed(() => {
  const chunks = [];
  const arr = projectListArr2.value;
  for (let i = 0; i < arr.length; i += 11) {
    chunks.push(arr.slice(i, i + 11));
  }
  return chunks;
});

// ===== 平滑滚动初始化 =====
const { setLenis } = useLenis();

const initLenis = () => {
  // 移动端降低触摸滚动倍数，让滚动更平缓
  lenis.value = new Lenis({
    duration: 0,
    wheelMultiplier: 1,
    touchMultiplier: isMobile.value ? 0.2 : 1, // 移动端降低到 0.2
    smoothWheel: true,
    syncTouch: false,
    easing: (t) => t,
    lerp: 0.1,
  });

  // 注册到全局 composable
  setLenis(lenis.value);

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
    // section1-content 初始动画 - 从下方斜着弹出
    gsap.from(".section1-content", {
      y: 200,
      x: -100,
      opacity: 0,
      rotation: -5,
      duration: 1.2,
      ease: "back.out(1.2)",
      delay: 0.3,
    });

    // section-5 (Let's Talk) 滚动进入动画
    gsap.to(".section-5", {
      y: 0,
      x: 0,
      rotate: 0,
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".section-6",
        start: "top bottom",
        end: "top center",
        scrub: 1,
        toggleActions: "play none none reverse",
      },
    });

    // line-w 横线扩展动画
    gsap.to(".line-w", {
      width: "100vw",
      scrollTrigger: {
        trigger: ".section-6",
        start: "top center",
        end: "top top",
        toggleActions: "play none none reverse",
        once: false,
      },
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
    });

    // line-h 竖线扩展动画
    gsap.to(".line-h", {
      height: "100vh",
      scrollTrigger: {
        trigger: ".section-6",
        start: "top center",
        end: "top top",
        toggleActions: "play none none reverse",
        once: false,
      },
      duration: 1,
      delay: 0.3,
      ease: "power2.out",
    });

    // section-5 继续向左旋转的动画(在第一个动画完成后)

  });
};

// 获取每个博客卡片的样式
const getBlogItemStyle = (index: number) => {
  const heightOffset = isMobile.value ? 40 : 80;
  const baseHeight = isMobile.value ? 148 : 420;
  const listLength = blogList.value.length;
  
  // 计算这个卡片在原始列表中的位置
  const positionInOriginalList = index % listLength;
  
  // 判断这个卡片是否应该是矮的（第一个卡片比其他卡片矮）
  const isVisibleFirst = positionInOriginalList === currentVisibleIndex.value;
  
  return {
    height: isVisibleFirst ? `${baseHeight}px` : `${baseHeight + heightOffset}px`,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'flex-end',
  };
};

// 初始化列表位置（定位到中间的那组，避免边界问题）
const initBlogListPosition = () => {
  if (!blogListRef.value || blogList.value.length === 0) return;
  
  nextTick(() => {
    const gap = isMobile.value ? 12 : 20;
    const cardWidth = isMobile.value ? 110 : 315;
    const itemWidth = cardWidth + gap;
    // 定位到中间那组的起始位置
    blogListRef.value!.scrollLeft = itemWidth * blogList.value.length;
    currentVisibleIndex.value = 0; // 初始化为0，表示中间组的第一个
    
    // 初始化后更新卡片高度
    updateBlogCardsHeight();
  });
};

// 向右滚动（卡片向左移动）
const scrollRight = () => {
  if (isAnimating.value || blogList.value.length === 0) return;
  
  isAnimating.value = true;
  const listLength = blogList.value.length;
  const gap = isMobile.value ? 12 : 20;
  const cardWidth = isMobile.value ? 110 : 315;
  const itemWidth = cardWidth + gap;
  const baseHeight = isMobile.value ? 148 : 420;
  const heightOffset = isMobile.value ? 40 : 80;
  
  // 获取所有卡片元素
  const blogItems = blogListRef.value?.querySelectorAll('.blog-item') || [];
  
  // 计算索引
  const currentIndex = currentVisibleIndex.value;
  const nextVisibleIndex = (currentVisibleIndex.value + 1) % listLength;
  
  // 检查当前滚动位置，如果接近第三组末尾，提前跳转到中间组相应位置
  const currentScrollLeft = blogListRef.value!.scrollLeft;
  const totalWidth = itemWidth * listLength;
  
  // 如果在第三组且即将向右滚动，先无缝跳转到第二组相应位置
  if (currentScrollLeft >= totalWidth * 2 - itemWidth * 2) {
    blogListRef.value!.scrollLeft = currentScrollLeft - totalWidth;
  }
  
  // 找到所有三组中对应位置的卡片
  const currentFirstCards: HTMLElement[] = [];
  const nextFirstCards: HTMLElement[] = [];
  
  for (let i = 0; i < blogItems.length; i++) {
    const positionInList = i % listLength;
    if (positionInList === currentIndex) {
      currentFirstCards.push(blogItems[i] as HTMLElement);
    }
    if (positionInList === nextVisibleIndex) {
      nextFirstCards.push(blogItems[i] as HTMLElement);
    }
  }
  
  // 创建动画时间轴
  const tl = gsap.timeline({
    onComplete: () => {
      currentVisibleIndex.value = nextVisibleIndex;
      isAnimating.value = false;
      
      // 检查是否需要重置位置（无缝循环）
      const currentScroll = blogListRef.value!.scrollLeft;
      const totalWidth = itemWidth * listLength;
      
      // 如果滚动到了第三组末尾附近，重置到中间组
      if (currentScroll >= totalWidth * 2 - itemWidth * 2) {
        blogListRef.value!.scrollLeft = currentScroll - totalWidth;
      }
    }
  });
  
  // 整个列表向左移动
  const newScrollLeft = blogListRef.value!.scrollLeft;
  const targetScrollLeft = newScrollLeft + itemWidth;
  
  tl.to(blogListRef.value, {
    scrollLeft: targetScrollLeft,
    duration: 0.6,
    ease: 'power2.inOut',
  }, 0);
  
  // 所有当前第一个位置的卡片高度升高（从矮变高）
  currentFirstCards.forEach(card => {
    tl.to(card, {
      height: `${baseHeight + heightOffset}px`,
      duration: 0.6,
      ease: 'power2.inOut',
    }, 0);
  });
  
  // 所有新的第一个位置的卡片高度降低（从高变矮）
  nextFirstCards.forEach(card => {
    tl.to(card, {
      height: `${baseHeight}px`,
      duration: 0.6,
      ease: 'power2.inOut',
    }, 0);
  });
};

// 向左滚动（卡片向右移动）
const scrollLeft = () => {
  if (isAnimating.value || blogList.value.length === 0) return;
  
  isAnimating.value = true;
  const listLength = blogList.value.length;
  const gap = isMobile.value ? 12 : 20;
  const cardWidth = isMobile.value ? 110 : 315;
  const itemWidth = cardWidth + gap;
  const baseHeight = isMobile.value ? 148 : 420;
  const heightOffset = isMobile.value ? 40 : 80;
  
  // 获取所有卡片元素
  const blogItems = blogListRef.value?.querySelectorAll('.blog-item') || [];
  
  // 计算索引
  const currentIndex = currentVisibleIndex.value;
  const prevVisibleIndex = currentVisibleIndex.value === 0 ? listLength - 1 : currentVisibleIndex.value - 1;
  
  // 检查当前滚动位置，如果接近第一组开头，提前跳转到中间组相应位置
  const currentScrollLeft = blogListRef.value!.scrollLeft;
  const totalWidth = itemWidth * listLength;
  
  // 如果在第一组且即将向左滚动，先无缝跳转到第二组相应位置
  if (currentScrollLeft <= totalWidth + itemWidth) {
    blogListRef.value!.scrollLeft = currentScrollLeft + totalWidth;
  }
  
  // 找到所有三组中对应位置的卡片
  const currentFirstCards: HTMLElement[] = [];
  const prevFirstCards: HTMLElement[] = [];
  
  for (let i = 0; i < blogItems.length; i++) {
    const positionInList = i % listLength;
    if (positionInList === currentIndex) {
      currentFirstCards.push(blogItems[i] as HTMLElement);
    }
    if (positionInList === prevVisibleIndex) {
      prevFirstCards.push(blogItems[i] as HTMLElement);
    }
  }
  
  // 创建动画时间轴
  const tl = gsap.timeline({
    onComplete: () => {
      currentVisibleIndex.value = prevVisibleIndex;
      isAnimating.value = false;
      
      // 检查是否需要重置位置（无缝循环）
      const currentScroll = blogListRef.value!.scrollLeft;
      const totalWidth = itemWidth * listLength;
      
      // 如果滚动到了第一组的开头附近，重置到中间组
      if (currentScroll <= totalWidth + itemWidth) {
        blogListRef.value!.scrollLeft = currentScroll + totalWidth;
      }
    }
  });
  
  // 整个列表向右移动
  const newScrollLeft = blogListRef.value!.scrollLeft;
  const targetScrollLeft = newScrollLeft - itemWidth;
  
  tl.to(blogListRef.value, {
    scrollLeft: targetScrollLeft,
    duration: 0.6,
    ease: 'power2.inOut',
  }, 0);
  
  // 所有当前第一个位置的卡片高度升高（从矮变高）
  currentFirstCards.forEach(card => {
    tl.to(card, {
      height: `${baseHeight + heightOffset}px`,
      duration: 0.6,
      ease: 'power2.inOut',
    }, 0);
  });
  
  // 所有新的第一个位置的卡片高度降低（从高变矮）
  prevFirstCards.forEach(card => {
    tl.to(card, {
      height: `${baseHeight}px`,
      duration: 0.6,
      ease: 'power2.inOut',
    }, 0);
  });
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
  const caseListData: any = await getDictList({ typeName: 'case' });
  const projectListData: any = await getDictList({ typeName: 'project' });
  const projectSloganData: any = await getDictList({ typeName:'project-slogan' });
  const blogListData: any = await getDictList({ typeName: 'blog' });
  
  // 初始化数据
  caseList.value = caseListData?.data ?? [];
  projectSlogan.value = projectSloganData?.data ?? [];
  blogList.value = blogListData?.data ?? [];
  
  // 处理 projectList 数据
  projectList.value = projectListData?.data ?? [];
  const data = projectListData?.data ?? [];
  projectListArr.value = data.length > 0 ? data.slice(0, 2) : [];
  projectListArr2.value = data.length > 2 ? data.slice(2) : [];
  
  // 数据加载后初始化博客列表位置
  nextTick(() => {
    initBlogListPosition();
  });
  
  initLenis(); // 初始化 Lenis 平滑滚动
  initAnimations(); // 初始化动画
  
  // 延迟设置hover效果，确保DOM已经完全渲染
  nextTick(() => {
    setupHoverEffects();
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
  // 清理移动端检测监听器
  if (import.meta.client) {
    window.removeEventListener('resize', detectMobile);
  }
});
</script>

<style scoped>
  .section1 {
    display: flex;
    align-items: flex-end;
    .section1-content {
      background: rgba(59, 78, 255, 0.50);
      padding-top: 80px;
      padding-left: 40px;
      max-width: 1600px;
      max-height: 760px;
      width: 100%;
      height: 100%;
      aspect-ratio: 1600/760;
      
      /* 1920px 以下 */
      @media screen and (max-width: 1920px) {
        max-width: 1400px;
        max-height: 665px;
        padding-top: 70px;
        padding-left: 35px;
      }

      /* 1680px 以下 */
      @media screen and (max-width: 1680px) {
        max-width: 1200px;
        max-height: 570px;
        padding-top: 60px;
        padding-left: 30px;
      }

      /* 1440px 以下 */
      @media screen and (max-width: 1440px) {
        max-width: 1200px;
        max-height: 500px;
        padding-top: 50px;
        padding-left: 25px;
      }

      /* 1280px 以下 */
      @media screen and (max-width: 1280px) {
        max-width: 900px;
        max-height: 427px;
        padding-top: 45px;
        padding-left: 22px;
      }

      /* 1024px 以下 */
      @media screen and (max-width: 1024px) {
        max-width: 720px;
        max-height: 342px;
        padding-top: 36px;
        padding-left: 18px;
      }

      /* 768px 以下（移动端）*/
      @media screen and (max-width: 768px) {
        height: 65%;
        aspect-ratio: auto;
        max-height: none;
        padding-top: 30px;
        padding-left: 16px;
      }

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
          width: 50%;
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
    .blog-container {
      overflow: hidden;
      width: 100%;
    }
    .blog-list {
      overflow-x: scroll;
      overflow-y: hidden;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */
      user-select: none; /* 禁止选择文本 */
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      pointer-events: none; /* 禁止所有鼠标事件 */
      
      &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
      }
    }
    .blog-item {
      flex-shrink: 0;
      display: flex;
      align-items: flex-end;
      transition: height 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      pointer-events: auto; /* 恢复博客卡片的鼠标事件 */
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

  .circle-images-list {
    .project-title {
      .title {
        color: #000;
        font-size: clamp(12px, 1.2vw, 16px);
        font-style: normal;
        font-weight: 400;
        line-height: 1;
      }
      .subtitle {
        color: #0B0B0B;
        font-family: Inter;
        font-size: clamp(64px, 10vw, 160px);
        font-style: normal;
        font-weight: 500;
        line-height: 1;
        letter-spacing: clamp(-2px, -0.4vw, -6px);
      }
    }
  }

  /* 按钮样式 - 全局使用 */
  .list-button {
    padding: 4px 16px;
    font-family: Inter;
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    border-radius: 44.44px;
    background: rgba(218, 218, 218, 0.60);
    backdrop-filter: blur(12.5px);
    gap: 8px;
    color: #fff;
    transition: all 0.3s ease;
    
    img {
      width: 24px;
      height: 24px;
      transition: all 0.3s ease;
    }
    
    &.active {
      color: #3B4EFF;
      background: rgba(59, 78, 255, 0.10);
    }
  }

  .ring-button {
    padding: 4px 16px;
    font-family: Inter;
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    border-radius: 44.44px;
    background: rgba(218, 218, 218, 0.60);
    backdrop-filter: blur(12.5px);
    gap: 8px;
    color: #fff;
    transition: all 0.3s ease;
    
    img {
      width: 24px;
      height: 24px;
      transition: all 0.3s ease;
    }
    
    &.active {
      color: #3B4EFF;
      background: rgba(59, 78, 255, 0.10);
    }
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
    width: 0;
  }

  .line-h {
    height: 0;
  }
</style>