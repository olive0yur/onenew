<template>
  <div class="overflow-hidden">
    <!-- 第一部分 -->
    <div id="section-1" ref="section1Ref" class="w-[100vw] h-[100dvh] section1" data-header-theme="white">
      <video 
        v-if="caseList[0]?.video"
        ref="bgVideoRef"
        :src="imgBaseURL(caseList[0]?.video)" 
        muted 
        loop 
        playsinline
        webkit-playsinline
        x5-playsinline
        x-webkit-airplay="allow"
        autoplay
        class="w-full h-[100vh] object-cover bg-video absolute top-0 left-0 z-[0]"
      ></video>
      <div class="section1-content flex flex-col justify-between lg:justify-start">
        <p>{{caseList[0]?.dict_value}}</p>
        <span class="hidden lg:flex">{{caseList[0]?.remark}}</span>
        <div class="flex justify-end mb-[16px]">
          <img src="/static/arrow-bottom.svg" alt="">
        </div>
      </div>
    </div>

    <!-- 第二部分 -->
    <div id="section-3" ref="section3Ref" class="bg-[#fff] lg:p-[40px] p-[16px] section3 h-[100dvh] relative cover-section flex flex-col" data-header-theme="black">
      <!-- section3-head 部分 -->
      <div class="flex lg:flex-row flex-col lg:justify-between relative">
        <div class="flex flex-col project-title gap-[8px]">
          <span class="title">/联系我们</span>
          <span class="subtitle">Let’s talk</span>
        </div>
        <div class="absolute top-0 z-[10] left-[15vw] section-card" >
          <!-- <IDCard /> -->
        </div>
      </div>
      
      <div class="flex-1 section3-content">
        <div class="section3-left-content">
          <div class="flex flex-col mt-[30vh] w-[100%]">
            <span class="text-[#00000099] text-[clamp(12px,1.8vw,24px)] leading-[1] whitespace-nowrap">/联系方式</span>
            <div class="text-[#000000] text-[clamp(18px,3.5vw,48px)] leading-[1] mt-[clamp(8px,1.5vw,24px)] whitespace-nowrap flex flex-wrap items-center">
              +86 {{companyInfo.company_phone}}
              <span class="text-[#000000] text-[clamp(10px,1.8vw,24px)] leading-[1] ml-[clamp(4px,1vw,16px)] mr-[75px]">/微信同号</span>
              <img :src="imgBaseURL(caseList[0]?.img1)" alt="微信二维码" class="w-[204px] h-[112px]">
            </div>
          </div>
        </div>
        <div ref="section3RightContentRef" class="section3-right-content">
          <div class="section3-right-item">
            <div class="section3-right-item-content lg:flex-row lg:items-center flex flex-col">
              <label class="section3-right-item-label lg:inline-block hidden">/01</label>
              <span class="section3-right-item-title lg:ml-[56px]">Tell us about your details</span>
              <span class="section3-right-item-desc">请提供您的详细信息</span>
            </div>
            <div class="lg:ml-[56px]">
              <CustomInput 
                v-model="formData.name"
                primary-placeholder="Fill in your name"
                secondary-placeholder="填写您的称呼 *"
              />
              <CustomInput 
                v-model="formData.contact"
                primary-placeholder="Fill in your contact details"
                secondary-placeholder="填写您的联系方式 *"
              />
              <CustomInput 
                v-model="formData.company_name"
                primary-placeholder="Your company name or URL"
                secondary-placeholder="填写您的公司名称或网址"
              />
              <CustomInput 
                v-model="formData.industry"
                primary-placeholder="Fill in your industry"
                secondary-placeholder="填写您的行业"
              />
            </div>
          </div>
          <div class="section3-right-item">
            <div class="section3-right-item-content lg:flex-row lg:items-center flex flex-col">
              <label class="section3-right-item-label lg:inline-block hidden  ">/02</label>
              <span class="section3-right-item-title lg:ml-[56px]">How may I assist you?</span>
              <span class="section3-right-item-desc">您需要咨询什么（可多选） *</span>
            </div>
            <div class="service-options-container lg:ml-[56px] lg:mt-[40px] mt-[20px]">
              <OptionButton
                v-for="option in consultTypesList"
                :key="option.id"
                :label="option.label"
                :value="option.id"
                v-model="formData.business_type"
                :multiple="true"
              />
            </div>
          </div>
          <div class="section3-right-item">
            <div class="section3-right-item-content lg:flex-row lg:items-center flex flex-col">
              <label class="section3-right-item-label lg:inline-block hidden">/03</label>
              <span class="section3-right-item-title lg:ml-[56px]">Project Budget</span>
              <span class="section3-right-item-desc">项目预算（人名币） *</span>
            </div>
            <div class="lg:ml-[56px] lg:mt-[40px] mt-[20px] flex flex-wrap lg:gap-[24px] gap-[12px]">
              <OptionButton
                v-for="option in budgetOptionsList"
                :key="option.id"
                :label="option.label"
                :value="option.id"
                v-model="formData.Budget"
                :multiple="false"
              />
            </div>
          </div>
          <div class="section3-right-item">
            <div class="section3-right-item-content lg:flex-row lg:items-center flex flex-col">
              <label class="section3-right-item-label lg:inline-block hidden">/04</label>
              <span class="section3-right-item-title lg:ml-[56px]">Detailed Requirements</span>
              <span class="section3-right-item-desc">详细填写您的需求</span>
            </div>
            <div class="lg:ml-[56px] lg:mt-[40px] mt-[20px]">
              <CustomInput 
                v-model="formData.details"
                primary-placeholder="Your Project Details"
                secondary-placeholder="您的项目细节"
                :is-textarea="true"
                :rows="3"
              />
            </div>
          </div>
          <div class="section3-right-item pb-[55px]">
            <ContactButton 
              class="lg:ml-[56px]"
              borderColor="#000"
              borderWidth="2px"
              width="230px"
              textColor="#000"
              bgColorHover="#3B4EFF"
              textColorHover="#fff"
              arrowColorHover="#fff"
              text="Submit Now 立即提交"
              @hover="onContactHover"
              @leave="onContactLeave"
              @click="onSubmit"
            />
          </div>
        </div>
      </div>


      <!-- Let's talk 部分 - 移到第三部分内部 -->
      <section id="section-5" class="section-5 rotate-[20deg] h-[100vh] w-[100vw] box-border grid grid-cols-2 absolute translate-y-[140vh] translate-x-[-20vw] z-[32] bg-[#F8F8F8] overflow-hidden" data-header-theme="black" style="grid-template-rows: 1fr 1.4fr; top: 0; left: 0;">
          <div class="lets-talk-top-left overflow-hidden relative">
            <div class="flex items-center hover-container-left" @click="navigateTo('/case')">
              <img :src="imgBaseURL('right.png')" class="right-img hover-img-left" alt=""></img>
              <span class="lets-talk-title text-[#0B0B0B] hover-text-container">
                <span class="hover-text-char">P</span>
                <span class="hover-text-char">r</span>
                <span class="hover-text-char">o</span>
                <span class="hover-text-char">j</span>
                <span class="hover-text-char">e</span>
                <span class="hover-text-char">c</span>
                <span class="hover-text-char">t</span>
                <span class="hover-text-char">s</span>
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

    <section id="section-6" class="section-6 relative mt-[-100dvh]" data-header-theme="white">
      <Footer :padding-top="isMobile ? 0 : 100" :height="isMobile ? 'calc(100dvh + 530px)' : 'calc(100vh + 569px)'" />
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
import CustomInput from "~/components/ui/CustomInput.vue";
import OptionButton from "~/components/ui/OptionButton.vue";
import IDCard from "~/components/ui/IDCard.vue";
import { useSubmitConsultInfo } from "~/composables/api";
import { useToast } from "~/composables/useToast";

const toast = useToast();
const companyInfo:any = ref(JSON.parse(window.localStorage.getItem('companyInfo') ?? '[]'));
const caseList: any = ref<any[]>([]);
const isMobile = ref(false);
const section1Ref = ref<HTMLElement | null>(null);
const bgVideoRef = ref<HTMLVideoElement | null>(null);
const section3Ref = ref<HTMLElement | null>(null);
const section3RightContentRef = ref<HTMLElement | null>(null);
const aboutGlitchRef = ref<any>(null);
const budgetOptionsList: any = ref<any[]>([]);
const consultTypesList: any = ref<any[]>([]);

// 咨询服务选项
const serviceOptions = [
  { label: '网站建设', value: 'website' },
  { label: '平面设计', value: 'design' },
  { label: '商城网站', value: 'mall' },
  { label: '小程序开发', value: 'miniprogram' },
  { label: '国内SEO', value: 'ui' },
  { label: '海外SEO', value: 'brand' },
  { label: '其他', value: 'other' },
];

// 预算选项
const budgetOptions = [
  { label: '4w-6w', value: '4w-6w' },
  { label: '6w-10w', value: '6w-10w' },
  { label: '10w以上', value: '10w+' },
];

// 表单数据
const formData = ref({
  name: '', // 称呼
  contact: '', // 联系方式
  company_name: '', // 公司名称或网址
  industry: '', // 行业
  business_type: '', // 咨询服务（可多选，逗号分隔的id）
  Budget: '', // 项目预算（单选）
  details: '', // 详细需求
});

useHead({ 
  title: 'ONEW专业网站建设公司 云联在线 案例',
  meta: [
    { name: 'description', content: 'ONEW专业网站建设公司 云联在线 案例 案例展示' },
    { name: 'keywords', content: 'ONEW专业网站建设公司 云联在线 案例 案例展示' },
  ],
})


// GSAP context 和 Lenis 实例
const ctx: any = ref(null);
const lenis: any = ref(null);

// 检测移动端设备
const detectMobile = () => {
  if (import.meta.client) {
    isMobile.value = window.innerWidth < 768;
  }
};

// Contact 区域 hover 事件
const onContactHover = () => {
  if (aboutGlitchRef.value) {
    aboutGlitchRef.value.startGlitch();
  }
};

const onContactLeave = () => {
  if (aboutGlitchRef.value) {
    aboutGlitchRef.value.resetText();
  }
};

const isSubmitting = ref(false);

const onSubmit = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  
  // 校验必填字段
  if (!formData.value.name) {
    toast.warning('请填写您的称呼');
    isSubmitting.value = false;
    return;
  }
  if (!formData.value.contact) {
    toast.warning('请填写您的联系方式');
    isSubmitting.value = false;
    return;
  }
  if (!formData.value.business_type) {
    toast.warning('请选择咨询服务');
    isSubmitting.value = false;
    return;
  }
  if (!formData.value.Budget) {
    toast.warning('请选择项目预算');
    isSubmitting.value = false;
    return;
  }

  try {
    const res: any = await useSubmitConsultInfo(formData.value);
    if (res?.code === 0) {
      toast.success('提交成功');
      // 重置表单
      formData.value = {
        name: '',
        contact: '',
        company_name: '',
        industry: '',
        business_type: '',
        Budget: '',
        details: '',
      };
    } else {
      toast.error(res?.message || '提交失败');
    }
  } catch (e) {
    toast.error('提交失败');
  } finally {
    isSubmitting.value = false;
  }
};

// 处理窗口 resize 时刷新 GSAP 动画
const handleResize = () => {
  if (import.meta.client) {
    // 检测移动端
    detectMobile();
    
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
const { setLenis } = useLenis();

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
    // section1-content 初始动画 - 从下方斜着弹出 (保持不变)
    gsap.from(".section1-content", {
      y: 200,
      x: -100,
      opacity: 0,
      rotation: -5,
      duration: 1.2,
      ease: "back.out(1.2)",
      delay: 0.3,
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

    // section1-content 向左斜上旋转推动的动画
    // 以左下角为轴心,在覆盖时发生
    // 使用 section3Ref 直接引用,确保元素存在
    if (section3Ref.value) {
      // 使用 fromTo 来明确起始和结束状态,确保能正确还原
      // 左移和旋转 - 推的动画 (快速响应)
      gsap.fromTo(".section1-content", 
        {
          x: 0,
          rotation: 0,
        },
        {
          x: -100, // 减少左移距离
          rotation: -8, // 减少旋转角度
          scrollTrigger: {
            trigger: section3Ref.value,
            start: "top bottom",
            end: "top top",
            scrub: 0.3, // 减小 scrub 值,加快响应速度
          },
        }
      );

      // 上移 - 同时进行但速率更慢
      gsap.fromTo(".section1-content",
        {
          y: 0,
        },
        {
          y: -400, // 大幅增加上移距离,让效果更明显
          scrollTrigger: {
            trigger: section3Ref.value,
            start: "top bottom",
            end: "top 10%", // 缩短滚动距离,加快上移速率
            scrub: 0.3, // 减小 scrub 值,加快响应速度
          },
        }
      );
    }

    // section3-right-content 滚动动画
    // 左边的 div 不动，外部的 section 也不动，只有右侧内容滚动
    if (section3RightContentRef.value && section3Ref.value) {
      // 计算右侧内容需要滚动的距离
      const rightContentScrollDistance = () => {
        if (!section3RightContentRef.value) return 0;
        const contentHeight = section3RightContentRef.value.scrollHeight;
        const containerHeight = section3RightContentRef.value.parentElement?.clientHeight || window.innerHeight;
        return Math.max(0, contentHeight - containerHeight + 100); // 额外100px确保滚动到底
      };

      const scrollDist = rightContentScrollDistance();
      const totalScrollDist = scrollDist + window.innerHeight; // 右侧滚动 + section-5 盖上的距离

      // 创建一个 timeline 来管理两个动画
      const section3Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section3Ref.value,
          start: "top top",
          end: `+=${totalScrollDist}`,
          scrub: true, // 改为 true 让动画更紧跟滚动，避免卡顿感
          pin: true,
          pinSpacing: true,
          anticipatePin: 1, // 减少 pin 释放/进入时的抖动
          invalidateOnRefresh: true,
          markers: false,
        },
      });

      // 第一阶段：右侧内容向上滚动 (0 到 scrollDist/totalScrollDist 的进度)
      section3Timeline.to(section3RightContentRef.value, {
        y: -scrollDist,
        ease: "none",
        duration: scrollDist / totalScrollDist, // 按比例分配时间
      });

      // 第二阶段：section-5 盖上来 (scrollDist/totalScrollDist 到 1 的进度)
      section3Timeline.to(".section-5", {
        y: 0,
        x: 0,
        rotate: 0,
        ease: "none",
        duration: window.innerHeight / totalScrollDist, // 按比例分配时间
      });

      // Let’s talk 完全盖住后：再做 section3 整体斜推动画
      // 注意：section-6 使用了负 margin（mt-[-100dvh]），触发点会提前进入视口；
      // 如果直接用 trigger: ".section-6" 很容易和上面的 pin 区间重叠，导致 transform 被两段动画同时写入而“晃”。
      // 这里用 pin 的 end 作为数值 start，确保严格在 pin 结束后才开始。
      const pinST = section3Timeline.scrollTrigger;
      if (pinST && section3Ref.value) {
        // 用像素位移 + 3D 合成，减少旋转时的渲染抖动
        const targetX = () => (isMobile.value ? -window.innerWidth * 0.12 : -window.innerWidth * 0.06);

        gsap.set(section3Ref.value, {
          force3D: true,
          transformOrigin: "50% 50%",
          willChange: "transform",
        });

        gsap.to(section3Ref.value, {
          scrollTrigger: {
            trigger: section3Ref.value,
            // 避开 pin 释放的同一像素点，减少同帧竞争导致的微抖
            start: () => pinST.end + 1,
            end: () => pinST.end + 1 + window.innerHeight,
            scrub: true,
            invalidateOnRefresh: true,
            markers: false,
          },
          rotation: -5,
          x: targetX,
          force3D: true,
          ease: "none",
        });
      }
    }

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
  const caseListData: any = await getDictList({ typeName: 'contact' });

  const budgetOptionsData: any = await getDictList({ typeName: 'project_budget' });
  const consultTypesData: any = await getDictList({ typeName: 'consult_type' });
  budgetOptionsList.value = budgetOptionsData?.data ?? [];
  consultTypesList.value = consultTypesData?.data ?? [];
  // 初始化数据
  caseList.value = caseListData?.data ?? [];
  
  // 初始化 Lenis
  initLenis();
  
  // 等待 DOM 完全渲染后再初始化动画
  await nextTick();
  
  // 添加小延迟确保所有 ref 都已正确绑定
  setTimeout(() => {
    initAnimations();
    setupHoverEffects();
  }, 50);
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

  .section1 {
    display: flex;
    align-items: flex-end;
    position: relative;
    z-index: 1;
    .section1-content {
      background: rgba(59, 78, 255, 0.50);
      padding-top: 80px;
      padding-left: 40px;
      max-width: 1600px;
      max-height: 760px;
      width: 100%;
      height: 100%;
      aspect-ratio: 1600/760;
      transform-origin: left bottom; /* 设置旋转轴心为左下角 */
      
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

  .section-card {
    /* 手机端隐藏 */
    @media screen and (max-width: 1068px) {
      display: none;
    }
  }

  .section3{
    position: relative;
    z-index: 20;
    will-change: transform;
    backface-visibility: hidden;
    transform: translateZ(0);
    
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

    .section3-content {
      display: flex;
      padding: 80px 0;
      justify-content: space-between;
      overflow: hidden;
      position: relative;
      gap: 80px;
      
      /* 1440px 以下 */
      @media screen and (max-width: 1440px) {
        padding: 60px 0;
        gap: 60px;
      }
      
      /* 1024px 以下 */
      @media screen and (max-width: 1024px) {
        padding: 50px 0;
        gap: 40px;
      }
      
      /* 手机端 */
      @media screen and (max-width: 768px) {
        padding: 40px 0;
        gap: 0;
      }
      
      .section3-left-content {
        flex: 1;
        top: -100px;
        align-self: flex-start;
        flex-shrink: 0;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        
        /* 手机端隐藏 */
        @media screen and (max-width: 1068px) {
          display: none;
        }
      }
      
      .section3-right-content {
        will-change: transform;
        
        .section3-right-item {
          margin-bottom: 80px;
          
          /* 1440px 以下 */
          @media screen and (max-width: 1440px) {
            margin-bottom: 60px;
          }
          
          /* 1024px 以下 */
          @media screen and (max-width: 1024px) {
            margin-bottom: 50px;
          }
          
          /* 手机端 */
          @media screen and (max-width: 768px) {
            margin-bottom: 40px;
          }
          /* 服务选项容器 */
          .service-options-container {
            display: flex;
            flex-wrap: wrap;
            max-width: 800px;
            gap: 24px;
            
            /* 手机端 - 2-2-3 布局 */
            @media screen and (max-width: 768px) {
              gap: 12px;
              
              /* 前4个按钮占 calc(50% - 6px) */
              :deep(.option-button:nth-child(-n+4)) {
                width: calc(50% - 6px);
                flex-shrink: 0;
              }
              
              /* 后3个按钮占 calc(33.333% - 8px) */
              :deep(.option-button:nth-child(n+5)) {
                width: calc(33.333% - 8px);
                flex-shrink: 0;
              }
            }
          }
          
          .section3-right-item-content {
            position: relative;
            .section3-right-item-label {
              position: absolute;
              color: #3B4EFF;
              font-size: 16px;
              font-style: normal;
              font-weight: 500;
              line-height: 16px; /* 100% */
              text-transform: uppercase;
              
              /* 1680px 以下 */
              @media screen and (max-width: 1680px) {
                font-size: 15px;
                line-height: 15px;
              }
              
              /* 1440px 以下 */
              @media screen and (max-width: 1440px) {
                font-size: 14px;
                line-height: 14px;
              }
              
              /* 1280px 以下 */
              @media screen and (max-width: 1280px) {
                font-size: 13px;
                line-height: 13px;
              }
              
              /* 1024px 以下 */
              @media screen and (max-width: 1024px) {
                font-size: 12px;
                line-height: 12px;
              }
              
              /* 手机端 */
              @media screen and (max-width: 768px) {
                font-size: 10px;
                line-height: 10px;
              }
            }

            .section3-right-item-title {
              color: #000;
              font-size: 48px;
              font-style: normal;
              font-weight: 400;
              line-height: 64px;
              text-transform: capitalize;
              margin-right: 24px;
              /* margin-left: 56px; */
              
              /* 1680px 以下 */
              @media screen and (max-width: 1680px) {
                font-size: 42px;
                line-height: 56px;
                /* margin-left: 48px; */
                margin-right: 20px;
              }
              
              /* 1440px 以下 */
              @media screen and (max-width: 1440px) {
                font-size: 36px;
                line-height: 48px;
                /* margin-left: 40px; */
                margin-right: 16px;
              }
              
              /* 1280px 以下 */
              @media screen and (max-width: 1280px) {
                font-size: 32px;
                line-height: 42px;
                /* margin-left: 36px; */
                margin-right: 14px;
              }
              
              /* 1024px 以下 */
              @media screen and (max-width: 1024px) {
                font-size: 28px;
                line-height: 36px;
                /* margin-left: 32px; */
                margin-right: 12px;
              }
              
              /* 手机端 */
              @media screen and (max-width: 768px) {
                font-size: 20px;
                line-height: 28px;
                /* margin-left: 24px; */
                margin-right: 8px;
              }
            }

            .section3-right-item-desc {
              color: #000;
              font-family: "Noto";
              font-size: 24px;
              font-style: normal;
              font-weight: 400;
              line-height: 32px; /* 133.333% */
              
              /* 1680px 以下 */
              @media screen and (max-width: 1680px) {
                font-size: 22px;
                line-height: 30px;
              }
              
              /* 1440px 以下 */
              @media screen and (max-width: 1440px) {
                font-size: 20px;
                line-height: 28px;
              }
              
              /* 1280px 以下 */
              @media screen and (max-width: 1280px) {
                font-size: 18px;
                line-height: 26px;
              }
              
              /* 1024px 以下 */
              @media screen and (max-width: 1024px) {
                font-size: 16px;
                line-height: 22px;
              }
              
              /* 手机端 */
              @media screen and (max-width: 768px) {
                font-size: 14px;
                line-height: 20px;
              }
            }
            
          }
        }
      }
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
    width: 100vw;
  }

  .line-h {
    height: 100vh;
  }

</style>