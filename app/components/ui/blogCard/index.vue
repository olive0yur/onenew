<template>
  <div class="blog-card" @click="handleCardClick">
    <!-- 博客图片 -->
    <div 
      class="blog-image overflow-hidden relative"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      @mousemove="handleMouseMove"
    >
      <img 
        :src="imgBaseURL(blog.img)" 
        :alt="blog.dict_value"
        class="w-full h-full object-cover"
        @error="handleImageError"
      />
      
      <!-- OPEN 圆形按钮跟随鼠标 -->
      <div 
        v-show="showOpenButton"
        class="open-button"
        :style="{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y-15}px`
        }"
      >
        OPEN
      </div>
    </div>
    
    <!-- 卡片底部信息 - 在图片下方 -->
    <div class="blog-info">
      <!-- 博客标题 -->
      <h3 class="blog-title">
        {{ blog.dict_value }}
      </h3>
      
      <!-- 博客备注 -->
      <p class="blog-remark">
        {{ blog.remark }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { imgBaseURL } from '~/utils'

interface BlogCardProps {
  blog: {
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
}

const props = defineProps<BlogCardProps>()

// 鼠标跟随相关状态
const showOpenButton = ref(false)
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
  showOpenButton.value = true
}

// 鼠标离开图片区域
const handleMouseLeave = () => {
  showOpenButton.value = false
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

// 点击卡片 - route有值则新窗口打开
const handleCardClick = () => {
  if (props.blog.route) {
    window.open(props.blog.route, '_blank')
  }
}
</script>

<style scoped>
.blog-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.blog-card:hover {
  transform: scale(1.002);
}

.blog-image {
  width: 315px;
  height: 420px;
  background-color: #f0f0f0;
  position: relative;
  
  /* 1680px 以下 */
  @media screen and (max-width: 1680px) {
    width: 270px;
    height: 360px;
  }
  
  /* 1440px 以下 */
  @media screen and (max-width: 1440px) {
    width: 240px;
    height: 320px;
  }
  
  /* 1280px 以下 */
  @media screen and (max-width: 1280px) {
    width: 210px;
    height: 280px;
  }
  
  /* 1024px 以下 */
  @media screen and (max-width: 1024px) {
    width: 180px;
    height: 240px;
  }
  
  /* 手机端样式 */
  @media screen and (max-width: 768px) {
    width: 110px;
    height: 148px;
  }
}

.blog-info {
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.blog-title {
  color: #000;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  
  /* 文本溢出显示省略号 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 315px;
  
  /* 1680px 以下 */
  @media screen and (max-width: 1680px) {
    width: 270px;
  }
  
  /* 1440px 以下 */
  @media screen and (max-width: 1440px) {
    font-size: 22px;
    line-height: 28px;
    width: 240px;
  }
  
  /* 1280px 以下 */
  @media screen and (max-width: 1280px) {
    font-size: 20px;
    line-height: 26px;
    width: 210px;
  }
  
  /* 1024px 以下 */
  @media screen and (max-width: 1024px) {
    font-size: 18px;
    line-height: 24px;
    width: 180px;
  }
  
  /* 手机端样式 */
  @media screen and (max-width: 768px) {
    font-size: 16px;
    line-height: 16px;
    width: 110px;
  }
}

.blog-remark {
  overflow: hidden;
  color: rgba(0, 0, 0, 0.30);
  text-overflow: ellipsis;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  
  /* 1280px 以下 */
  @media screen and (max-width: 1280px) {
    font-size: 14px;
    line-height: 14px;
  }
  
  /* 1024px 以下 */
  @media screen and (max-width: 1024px) {
    font-size: 13px;
    line-height: 13px;
  }
  
  /* 手机端样式 */
  @media screen and (max-width: 768px) {
    font-size: 12px;
    line-height: 12px;
    text-transform: uppercase;
  }
}

/* OPEN 圆形按钮 */
.open-button {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #3B4EFF;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  z-index: 10;
  transform: translate(-50%, -50%);
  transition: opacity 0.2s ease;
  
  /* 文字样式 */
  color: #FFF;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  /* 1440px 以下 */
  @media screen and (max-width: 1440px) {
    width: 70px;
    height: 70px;
    font-size: 14px;
  }
  
  /* 1024px 以下 */
  @media screen and (max-width: 1024px) {
    width: 60px;
    height: 60px;
    font-size: 13px;
  }
  
  /* 手机端隐藏 */
  @media screen and (max-width: 768px) {
    display: none;
  }
}
</style>

