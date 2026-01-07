<template>
  <header
    :style="{
      opacity: opacityValue,
      color: headerColor,
      backgroundColor: headerBgColor,
      ...(isMounted ? { transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)' } : {}),
      visibility: isInitializing ? 'hidden' : 'visible',
    }"
    class="fixed top-0 left-0 right-0 z-[100] pt-[24px] lg:px-[40px] px-[16px] flex justify-between items-center transition-all duration-500 ease-in-out"
  >
    <div>
      <img
        :src="logoUrl"
        alt=""
        class="w-auto h-[17px] cursor-pointer "
        @click="navigateTo('/')"
      />
    </div>
    <div
      class="nav flex items-center gap-[120px] text-[16px] font-[400] leading-[16px]"
      :style="{ color: headerColor }"
    > 
      <span @click="openMenu" class="lg:hidden block text-[12px] lg:text-[16px]">
        <GlitchText text="MENU" :speed="30" :iterations="3"  />
      </span>
      <span @click="openMenu" class="nav-button items-center cursor-pointer hover:underline underline-offset-4 text-[12px] lg:text-[16px] lg:flex hidden">
        <GlitchText text="MENU" :speed="30" :iterations="3"  />
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
      <GlitchText
        v-for="(item, index) in menuItems"
        :key="item.path"
        :text="`${item.enName} ${item.cnName}`"
        :class="[
          'cursor-pointer hover:underline underline-offset-4 nav-item hidden lg:block',
          `nav-item-${index + 1}`
        ]"
        :speed="30"
        :iterations="3"
        @click="navigateTo(item.path)"
      />
    </div>

    <div @click.stop.prevent="closeMenu" class="menu fixed z-[1001] w-[100vw] top-0 left-0 bg-[rgba(0,0,0,0.3)]">
      <div @click.stop.prevent="()=>{}" class="bg-[#3B4EFF] px-[16px] lg:px-[40px] pt-[25px] menu-content relative h-[100dvh] lg:h-auto">
        <div class="flex justify-between items-center text-[16px] text-[#EEE]">
            <img
              :src="imgBaseURL('logo.svg')"
              alt=""
              class="w-auto h-[17px] cursor-pointer"
            />
          <span class="cursor-pointer hover:underline underline-offset-4 hidden lg:block" @click.stop.prevent="closeMenu">CLOSE 关闭</span>
           <span class="cursor-pointer hover:underline underline-offset-4 block lg:hidden text-[12px] lg:text-[16px]" @click.stop.prevent="closeMenu">MENU</span>
        </div>

        <div class="mt-[120px]  flex-col w-[288px] lg:flex hidden">
          <div>
            <video :src="imgBaseURL(companyInfo?.video)" alt="" class="w-[288px] h-[162px]" autoplay muted loop></video>
            <div class="flex justify-between items-center text-white">
              <span class="flex items-center">
                <span>{{ companyInfo?.video_desc }}</span>
                <img src="/static/image180.png" class="w-[16px] h-[16px] ml-[8px]" alt="">
              </span>
              <span>{{ currentTime }}</span>
            </div>
          </div>
        </div>

        <div class="lg:mt-[66px] mt-[80px] flex justify-between w-[100%] lg:w-[288px] text-white">
          <div class="flex flex-col text-[12px] lg:text-[16px]">
            <span>{{companyInfo?.company_address}}</span>
            <span>{{companyInfo?.company_phone}}</span>
            <span>{{companyInfo?.company_email}}</span>
          </div>
          <div class="lg:hidden block text-[12px]">
            <img :src="imgBaseURL('image140.png')" alt="" class="w-[100px] h-[56px] text-[16px] text-[#EEE]">
            <div class="flex justify-between items-center text-white">
              <span></span>
              <span>{{ currentTime }}</span>
            </div>
          </div>
        </div>

        <div class="absolute bottom-0 left-[16px] right-[16px] lg:relative lg:left-0 lg:right-0">
          <div class="mt-[40px] flex flex-col w-[288px] lg:text-[16px] text-[12px]">
            <ContactButton 
              @click="openContactModal"
              text="GET IN TOUCH 联系"
              @hover="onContactHover"
              @leave="onContactLeave"
            />
          </div>

          <div class="mt-[16px] lg:mt-[84px] h-[1px] bg-[#fff] opacity-20"></div>

          <div class="lg:h-[72px] h-[44px] flex lg:justify-end items-center text-[24px] text-[#EEE]">
            <span class="lg:mr-[60px] mr-[46px] text-[12px] lg:text-[24px] cursor-pointer">
              <GlitchText v-if="companyInfo?.x" @click="goPage(companyInfo?.x ?? '')" :text="companyInfo?.x_name ?? ''" :speed="30" :iterations="3" />
            </span>
            <span class="text-[12px] lg:text-[24px] cursor-pointer">
              <GlitchText v-if="companyInfo?.redbook" @click="goPage(companyInfo?.redbook ?? '')" :text="companyInfo?.redbook_name ?? ''" :speed="30" :iterations="3" />
            </span>
          </div>
        </div>

        <!-- 右侧文字 -->
        <div 
          class="absolute flex-col z-[1002] bottom-[115px] lg:top-[161px] lg:right-[319px] lg:flex"
          @mouseleave="hoveredIndex = null"
        >
          <div 
            v-for="(item, index) in menuItems" 
            :key="item.path"
            class="menu-item-wrapper relative cursor-pointer mb-[16px] lg:mb-[20px] transition-opacity duration-300"
            :class="{ 'dimmed': hoveredIndex !== null && hoveredIndex !== index }"
            @click="goPath(item.path)"
            @mouseenter="hoveredIndex = index"
            :ref="el => setMenuItemRef(el, index)"
          >
            <div class="flex items-baseline relative">
              <div class="flex items-baseline menu-text-wrapper">
                <span class="lg:text-[64px] text-[40px] text-[#EEE]">{{ item.enName }}</span>
                <span class="lg:text-[32px] text-[20px] text-[#EEE] ml-[16px]">{{ item.cnName }}</span>
              </div>
              <svg class="menu-arrow lg:ml-[12px] ml-[8px]" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32" fill="none">
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
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "~/components/ui/GlitchText.vue";
import ContactButton from "~/components/ui/ContactButton.vue";
import { useLenis } from "~/composables/useLenis";
import { imgBaseURL } from "~/utils";
import { useGetCompanyInfo } from "~/composables/api";
const opacity = ref(1);
const value = ref(false);
const logoUrl = ref(imgBaseURL('logo.svg'));
const currentTime = ref("");
const hoveredIndex = ref<number | null>(null);
const underlineWidths = ref<number[]>([0, 0, 0, 0]);
const menuItemRefs: (HTMLElement | null)[] = [];
let timeInterval: NodeJS.Timeout | null = null;
const route = useRoute();
interface CompanyInfo {
  company_email: string;
  company_phone: string;
  company_name: string;
  company_address: string;
  company_logo: string;
  company_description: string;
  video: string;
  video_desc: string;
  x: string;
  x_name: string;
  redbook: string;
  redbook_name: string;
}
const companyInfo = ref<CompanyInfo>();

const goPath = (path: string) => {
  navigateTo(path);
  closeMenu();
}

// 使用 lenis composable
const { stopScroll, startScroll } = useLenis();

// Header 颜色状态
const headerColor = ref('#ffffff');
const headerBgColor = ref('transparent');

// 移动端滚动隐藏/显示 Header
const lastScrollY = ref(0);
const isHeaderVisible = ref(true);

// SSR hydration 标记 - 确保 transform 样式只在客户端渲染后才应用
const isMounted = ref(false);

// 初始化状态 - 防止加载时闪烁
const isInitializing = ref(true);

// 初始化 Header 主题切换
const initHeaderTheme = () => {
  if (!import.meta.client) return;
  
  nextTick(() => {
    // 多次尝试获取 section 元素，确保 DOM 已经渲染
    setTimeout(() => {
      // 获取所有 section 元素
      const sections = document.querySelectorAll('section[data-header-theme], div[data-header-theme]');
      
      // 页面加载时立即检测第一个可见的 section 并设置主题
      const setInitialTheme = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // 如果在页面顶部（滚动距离小于 50px），直接使用第一个 section 的主题
        if (scrollTop < 50 && sections.length > 0) {
          const firstSection = sections[0] as Element;
          const theme = firstSection?.getAttribute('data-header-theme');
          if (theme) {
            headerColor.value = theme === 'white' ? '#ffffff' : '#000000';
            logoUrl.value = theme === 'white' ? imgBaseURL('logo.svg') : imgBaseURL('logo-b.svg');
            return;
          }
        }
        
        // 否则检测当前可见的 section
        for (const section of sections) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top + scrollTop;
          const sectionBottom = sectionTop + rect.height;
          
          // 检查 section 是否在视口顶部 100px 范围内
          if (sectionTop <= scrollTop + 100 && sectionBottom >= scrollTop + 100) {
            const theme = section.getAttribute('data-header-theme');
            if (theme) {
              headerColor.value = theme === 'white' ? '#ffffff' : '#000000';
              logoUrl.value = theme === 'white' ? imgBaseURL('logo.svg') : imgBaseURL('logo-b.svg');
            }
            break;
          }
        }
      };
      
      // 立即设置初始主题
      setInitialTheme();
      
      sections.forEach((section) => {
        const theme = section.getAttribute('data-header-theme');
        if (!theme) return;
        
        // 使用 ScrollTrigger 监听每个 section
        ScrollTrigger.create({
          trigger: section,
          start: 'top 100px',
          end: 'bottom 100px',
          onEnter: () => {
            headerColor.value = theme === 'white' ? '#ffffff' : '#000000';
            logoUrl.value = theme === 'white' ? imgBaseURL('logo.svg') : imgBaseURL('logo-b.svg');
          },
          onEnterBack: () => {
            headerColor.value = theme === 'white' ? '#ffffff' : '#000000';
            logoUrl.value = theme === 'white' ? imgBaseURL('logo.svg') : imgBaseURL('logo-b.svg');
          },
        });
      });
    }, 0);
  });
};

const openContactModal = () => {
  closeMenu();
  navigateTo('/contact');
}

onMounted(async() => {
  // 请求公司信息数据
  const companyInfoData: any = await useGetCompanyInfo();
  companyInfo.value = companyInfoData?.data ?? [];
  window.localStorage.setItem('companyInfo', JSON.stringify(companyInfoData?.data));
  
  // 标记组件已挂载，用于 SSR hydration
  isMounted.value = true;
  
  // 延迟显示 Header，确保 loading 视频已经渲染
  setTimeout(() => {
    isInitializing.value = false;
  }, 100);
  
  // 初始化 Header 主题切换
  initHeaderTheme();
  
  titleOpcity();
  navItemsDisappear();
  // 立即更新一次时间
  updateTime();
  // 每秒更新时间
  timeInterval = setInterval(updateTime, 1000);
  // 监听移动端滚动方向
  handleMobileScrollDirection();
});

// 监听路由变化，重新初始化
watch(() => route.path, () => {
  // 先重置为默认白色
  headerColor.value = '#ffffff';
  logoUrl.value = imgBaseURL('logo.svg');
  
  // 等待 DOM 更新后再初始化主题
  nextTick(() => {
    setTimeout(() => {
      // 清除所有旧的 ScrollTrigger
      ScrollTrigger.getAll().forEach(trigger => {
        const triggerElement = trigger.vars.trigger;
        if (triggerElement && typeof triggerElement !== 'string' && 'hasAttribute' in triggerElement) {
          if ((triggerElement as Element).hasAttribute('data-header-theme')) {
            trigger.kill();
          }
        }
      });
      
      initHeaderTheme();
    }, 100);
  });
});

onUnmounted(() => {
  // 清理定时器
  if (timeInterval) {
    clearInterval(timeInterval);
  }
});

const goPage = (url: string) => {
  if (!url) return;
  window.open(url, '_blank');
}




// 菜单项数据
const menuItems = [
  { enName: 'HOME', cnName: '首页', path: '/' },
  { enName: 'WORKS', cnName: '案例', path: '/case' },
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


const navItemsDisappear = () => {
  gsap.registerPlugin(ScrollTrigger);

  // 计算按钮需要移动到最右边span位置的距离
  const button = document.querySelector(".nav-button");
  const lastSpan = document.querySelector(".nav-item-4");
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
      ).to(
        ".nav-item-4",
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
          x: moveDistance+60, // 移动到最右边span的位置
          duration: 0.8,
          ease: "power2.inOut",
        },
        0 // 与整个动画同时开始
      )
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
  // 恢复页面滚动 - 使用 lenis API
  startScroll();
  // 也可以保留 CSS 类作为备用
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
  // 禁用页面滚动 - 使用 lenis API
  stopScroll();
  // 也可以保留 CSS 类作为备用
  document.documentElement.classList.add("no-scroll");
};

// Contact 按钮 hover 事件
const onContactHover = () => {
  // 可以在这里添加其他 hover 效果
};

const onContactLeave = () => {
  // 可以在这里添加其他 leave 效果
};

// 处理移动端滚动方向
const handleMobileScrollDirection = () => {
  if (!import.meta.client) return;
  
  const handleScroll = () => {
    const newScrollY = window.scrollY || document.documentElement.scrollTop;
    
    // 只在移动端生效（屏幕宽度小于 1024px）
    if (window.innerWidth >= 1024) {
      isHeaderVisible.value = true;
      return;
    }

    // 滚动距离小于 80px 时始终显示 header
    if (newScrollY < 80) {
      isHeaderVisible.value = true;
      lastScrollY.value = newScrollY;
      return;
    }

    // 判断滚动方向
    const scrollDiff = newScrollY - lastScrollY.value;
    
    // 滚动差值大于 5px 才触发（避免小幅抖动）
    if (Math.abs(scrollDiff) > 5) {
      if (scrollDiff > 0) {
        // 向下滚动 - 隐藏 header
        isHeaderVisible.value = false;
      } else {
        // 向上滚动 - 显示 header
        isHeaderVisible.value = true;
      }
      lastScrollY.value = newScrollY;
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  
  // 清理函数
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
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
