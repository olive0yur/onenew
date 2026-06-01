import Lenis from "lenis";
import { ref, onUnmounted } from "vue";

// 区域信息接口
interface SectionInfo {
  element: Element;
  id: string;
  classList: string[];
  isVisible: boolean;
  intersectionRatio: number;
  isAtTop: boolean; // 元素顶部是否到达视口顶部
  distanceFromTop: number; // 元素顶部距离视口顶部的距离（像素）
}

// 全局 lenis 实例
const lenisInstance = ref<Lenis | null>(null);
// 当前滚动位置
const scrollY = ref(0);
// 当前激活的区域（视口中占比最大的区域）
const activeSection = ref<SectionInfo | null>(null);
// 所有在视口中可见的区域
const visibleSections = ref<SectionInfo[]>([]);
// Intersection Observer 实例
let observer: IntersectionObserver | null = null;
// 存储所有被观察的元素信息
const sectionsMap = new Map<Element, SectionInfo>();

export const useLenis = () => {
  // 设置 lenis 实例
  const setLenis = (instance: Lenis) => {
    lenisInstance.value = instance;
    
    // 监听滚动事件，更新 scrollY
    instance.on('scroll', ({ scroll }: any) => {
      scrollY.value = scroll;
    });
  };

  // 停止滚动
  const stopScroll = () => {
    if (lenisInstance.value) {
      lenisInstance.value.stop();
    }
  };

  // 恢复滚动
  const startScroll = () => {
    if (lenisInstance.value) {
      lenisInstance.value.start();
    }
  };

  // 滚动到指定位置
  const scrollTo = (target: number | string | HTMLElement, options?: any) => {
    if (lenisInstance.value) {
      lenisInstance.value.scrollTo(target, options);
    }
  };

  // 立即回到顶部（不走缓动，用于路由切换）
  const scrollToTop = () => {
    if (lenisInstance.value) {
      lenisInstance.value.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  // 开始观察指定的区域元素
  const observeSections = (
    selector: string,
    options?: IntersectionObserverInit
  ) => {
    // 如果已经有 observer，先清理
    if (observer) {
      observer.disconnect();
      sectionsMap.clear();
    }

    // 默认配置：当元素有 10% 进入视口时触发
    const defaultOptions: IntersectionObserverInit = {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      rootMargin: '0px',
      ...options,
    };

    // 创建 Intersection Observer
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionInfo = sectionsMap.get(entry.target);
        if (sectionInfo) {
          // 更新区域可见性和交叉比例
          sectionInfo.isVisible = entry.isIntersecting;
          sectionInfo.intersectionRatio = entry.intersectionRatio;
          
          // 计算元素顶部距离视口顶部的距离
          const rect = entry.boundingClientRect;
          sectionInfo.distanceFromTop = rect.top;
          
          // 判断是否到达顶部（允许一定的误差范围，比如 ±10px）
          sectionInfo.isAtTop = Math.abs(rect.top) <= 10;
        }
      });

      // 更新可见区域列表
      visibleSections.value = Array.from(sectionsMap.values())
        .filter((section) => section.isVisible)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      // 更新当前激活区域（视口中占比最大的）
      const mostVisible = visibleSections.value[0];
      activeSection.value = mostVisible || null;
    }, defaultOptions);

    // 查找并观察所有匹配的元素
    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => {
      const sectionInfo: SectionInfo = {
        element,
        id: element.id || '',
        classList: Array.from(element.classList),
        isVisible: false,
        intersectionRatio: 0,
        isAtTop: false,
        distanceFromTop: 0,
      };
      sectionsMap.set(element, sectionInfo);
      observer?.observe(element);
    });

    return {
      observedCount: elements.length,
      elements: Array.from(elements),
    };
  };

  // 便捷方法：直接观察所有 section 元素
  const observeSectionElements = (options?: IntersectionObserverInit) => {
    return observeSections('section', options);
  };

  // 停止观察所有区域
  const unobserveSections = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    sectionsMap.clear();
    visibleSections.value = [];
    activeSection.value = null;
  };

  // 添加观察单个元素
  const observeElement = (element: Element) => {
    if (!observer) {
      // console.warn('请先调用 observeSections 初始化 observer');
      return;
    }
    
    const sectionInfo: SectionInfo = {
      element,
      id: element.id || '',
      classList: Array.from(element.classList),
      isVisible: false,
      intersectionRatio: 0,
      isAtTop: false,
      distanceFromTop: 0,
    };
    sectionsMap.set(element, sectionInfo);
    observer.observe(element);
  };

  // 移除观察单个元素
  const unobserveElement = (element: Element) => {
    if (observer) {
      observer.unobserve(element);
      sectionsMap.delete(element);
    }
  };

  // 组件卸载时清理
  onUnmounted(() => {
    unobserveSections();
  });

  return {
    lenisInstance,
    scrollY,
    activeSection, // 当前激活的区域
    visibleSections, // 所有可见的区域
    setLenis,
    stopScroll,
    startScroll,
    scrollTo,
    scrollToTop,
    observeSections, // 开始观察区域（通过选择器）
    observeSectionElements, // 便捷方法：直接观察所有 section 元素
    unobserveSections, // 停止观察
    observeElement, // 观察单个元素
    unobserveElement, // 取消观察单个元素
  };
};

