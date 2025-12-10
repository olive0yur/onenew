<template>
  <div 
    class="project-card cursor-pointer"
    :style="{
      flex: flexValue
    }"
  >
    <!-- 项目图片 -->
    <div 
      class="project-image overflow-hidden relative"
      :style="{ height: height }"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
    >
      <img 
        :src="imgBaseURL(project.img)" 
        :alt="project.dict_value"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      
      <!-- VIEW MORE 跟随鼠标的文字 -->
      <div 
        v-show="showViewMore"
        class="view-more-text"
        :style="{
          left: `${mousePosition.x-55}px`,
          top: `${mousePosition.y}px`
        }"
      >
        VIEW MORE
      </div>
    </div>
    
    <!-- 卡片底部信息 - 在图片外面 -->
    <div class="lg:pt-[16px] pt-[12px] flex lg:flex-row flex-col justify-between lg:items-center gap-[8px]">
      <!-- 左侧：项目名称 -->
      <h3 class="project-title">
        {{ project.dict_value }}
      </h3>
      
      <!-- 右侧：备注 -->
      <p class="project-remark">
        {{ project.remark }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { imgBaseURL } from '~/utils'

interface ProjectCardProps {
  project: {
    id: number
    dict_value: string
    dict_type_id: number
    dict_type: string
    label: string
    description: string
    remark: string
    updated_at: string
    delete_flag: number
    order_index: number
    page: string
    img: string
    route: string
    img1: string
    video: string
    gif: string
  }
  height?: string
  flex?: number
}

const props = withDefaults(defineProps<ProjectCardProps>(), {
  height: '400px',
  flex: 1
})

// 计算 flex 值
const flexValue = computed(() => props.flex)

// 鼠标跟随相关状态
const showViewMore = ref(false)
const mousePosition = ref({ x: 0, y: 0 })
const imageError = ref(false)

// 处理图片加载失败
const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.style.display = 'none'
  imageError.value = true
}

// 鼠标进入图片区域
const handleMouseEnter = () => {
  showViewMore.value = true
}

// 鼠标离开图片区域
const handleMouseLeave = () => {
  showViewMore.value = false
}

// 鼠标移动
const handleMouseMove = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  
  // 计算相对于图片容器的坐标
  mousePosition.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}
</script>

<style scoped>
.project-card {
  transition: all 0.3s ease;
}

.project-card:hover {
  transform: scale(1.002);
}

.project-image {
  background-color: #3B4EFF;
  
  /* 手机端固定高度为 199px */
  @media screen and (max-width: 768px) {
    height: 199px !important;
  }
}

.project-title {
  color: #000;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px; /* 133.333% */

  @media screen and (max-width: 768px) {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 100% */
  }
}

.project-remark {
  color: rgba(0, 0, 0, 0.30);
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 100% */
  text-transform: uppercase;
  @media screen and (max-width: 768px) {
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 12px; /* 100% */
  }
}

/* VIEW MORE 跟随鼠标的文字 */
.view-more-text {
  position: absolute;
  color: #FFF;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 100% */
  text-transform: uppercase;
  pointer-events: none;
  z-index: 10;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: opacity 0.2s ease;
}
</style>

