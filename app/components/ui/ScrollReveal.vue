<template>
  <div ref="containerRef" :class="containerClassName">
    <div :class="textClassName">
      <span 
        v-for="(word, index) in splitText" 
        :key="index"
        :class="word.isSpace ? '' : 'word'"
        :style="word.isSpace ? '' : 'display: inline-block'"
      >
        {{ word.text }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  text: string;
  scrollContainerRef?: HTMLElement | null;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
}

const props = withDefaults(defineProps<Props>(), {
  enableBlur: true,
  baseOpacity: 0.1,
  baseRotation: 3,
  blurStrength: 4,
  containerClassName: '',
  textClassName: '',
  rotationEnd: 'bottom bottom',
  wordAnimationEnd: 'bottom bottom'
});

const containerRef = ref<HTMLElement | null>(null);

// 将文本按空格分割成单词
const splitText = computed(() => {
  const text = props.text || '';
  return text.split(/(\s+)/).map((word, index) => {
    if (word.match(/^\s+$/)) {
      return { text: word, isSpace: true };
    }
    return { text: word, isSpace: false };
  });
});

let scrollTriggers: ScrollTrigger[] = [];

const initAnimation = () => {
  const el = containerRef.value;
  if (!el) return;

  // 清理旧的 ScrollTrigger
  scrollTriggers.forEach(trigger => trigger.kill());
  scrollTriggers = [];

  const scroller = props.scrollContainerRef || window;

  // 整体旋转动画
  const rotationTrigger = gsap.fromTo(
    el,
    { transformOrigin: '0% 50%', rotate: props.baseRotation },
    {
      ease: 'none',
      rotate: 0,
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top bottom',
        end: props.rotationEnd,
        scrub: true
      }
    }
  );
  if (rotationTrigger.scrollTrigger) {
    scrollTriggers.push(rotationTrigger.scrollTrigger);
  }

  const wordElements = el.querySelectorAll<HTMLElement>('.word');

  // 透明度动画
  const opacityTrigger = gsap.fromTo(
    wordElements,
    { opacity: props.baseOpacity, willChange: 'opacity' },
    {
      ease: 'none',
      opacity: 1,
      stagger: 0.05,
      scrollTrigger: {
        trigger: el,
        scroller,
        start: 'top bottom-=20%',
        end: props.wordAnimationEnd,
        scrub: true
      }
    }
  );
  if (opacityTrigger.scrollTrigger) {
    scrollTriggers.push(opacityTrigger.scrollTrigger);
  }

  // 模糊动画
  if (props.enableBlur) {
    const blurTrigger = gsap.fromTo(
      wordElements,
      { filter: `blur(${props.blurStrength}px)` },
      {
        ease: 'none',
        filter: 'blur(0px)',
        stagger: 0.05,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: props.wordAnimationEnd,
          scrub: true
        }
      }
    );
    if (blurTrigger.scrollTrigger) {
      scrollTriggers.push(blurTrigger.scrollTrigger);
    }
  }
};

onMounted(() => {
  initAnimation();
});

onUnmounted(() => {
  scrollTriggers.forEach(trigger => trigger.kill());
  scrollTriggers = [];
});

// 监听 text 变化，重新初始化动画
watch(() => props.text, () => {
  setTimeout(() => {
    initAnimation();
  }, 100);
});
</script>

<style scoped>
.word {
  display: inline-block;
}
</style>

