<template>
    <!-- 底页 -->
  <section
    class="section-3 min-h-[599px] w-[100vw] relative bg-[#3B4EFF] pt-[40px] lg:pt-[103px] px-[20px] lg:pl-[48px] lg:pr-[40px] flex flex-col justify-between pb-[40px]"
  >
    <!-- 上半部分：联系信息和导航 -->
    <div class="flex flex-col lg:flex-row lg:justify-between w-[100%] gap-[40px] lg:gap-0 mt-[40px] lg:mt-0">
      <!-- 联系我们 -->
      <div class="flex flex-col">
        <span class="text-[14px] lg:text-[16px] text-[#FFF] leading-[16px] mb-[12px]">/联系我们</span>
        <span class="text-[20px] lg:text-[24px] text-[#FFF] leading-[28px] lg:leading-[32px]">1761973105@qq.com</span>
        <span class="text-[20px] lg:text-[24px] text-[#FFF] leading-[28px] lg:leading-[32px]">+86 15252507831</span>
      </div>
      
      <!-- 导航和跟随我们 -->
      <div class="flex flex-col lg:flex-row gap-[40px] lg:gap-0">
        <div class="flex flex-col lg:mr-[120px]">
          <span class="text-[14px] lg:text-[16px] text-[#FFF] leading-[16px] mb-[12px] hidden lg:block">/导航</span>
          <span class="text-[20px] lg:text-[24px] text-[#EEE] leading-[28px] lg:leading-[32px] mb-[16px]">WORKS 案例</span>
          <span class="text-[20px] lg:text-[24px] text-[#EEE] leading-[28px] lg:leading-[32px] mb-[16px]">ABOUT 关于</span>
          <span class="text-[20px] lg:text-[24px] text-[#EEE] leading-[28px] lg:leading-[32px]">CONTACT 联系</span>
        </div>
        <div class="flex flex-col mt-[-26px] lg:mt-0">
          <span class="text-[14px] lg:text-[16px] text-[#FFF] leading-[16px] mb-[12px] hidden lg:block">/跟随我们</span>
          <span class="text-[20px] lg:text-[24px] text-[#EEE] leading-[28px] lg:leading-[32px] mb-[16px]">X 推特</span>
          <span class="text-[20px] lg:text-[24px] text-[#EEE] leading-[28px] lg:leading-[32px] mb-[16px]">RED BOOK 小红书</span>
        </div>
      </div>
    </div>

    <!-- 下半部分：邮箱输入和版权信息 -->
    <div class="flex flex-col lg:flex-row lg:justify-between gap-[40px] lg:gap-0 mt-[60px] lg:mt-0">
      <!-- 邮箱输入框 -->
      <div class="border-b-[1px] border-solid border-[#fff] text-[#fff] flex items-end pb-[8px] lg:pb-0">
        <input 
          type="text" 
          :placeholder="placeholderText" 
          class="email text-[32px] lg:text-[64px] w-full lg:w-[600px] ml-[0px] lg:ml-[16px]"
          @focus="startTypewriter"
        >
        <img src="/static/toRight.png" class="h-[32px] w-[32px] lg:h-[64px] lg:w-[64px] ml-[20px] lg:ml-[38px] flex-shrink-0" alt="">
      </div>
      
      <!-- 版权信息和返回顶部 -->
      <div class="flex lg:flex-col justify-between items-start lg:items-end gap-[24px] lg:gap-0">
        <div class="text-[12px] lg:text-[16px] text-[#EEEEEE] opacity-60 leading-[18px] lg:leading-[16px] order-1 lg:order-2 ">
          <span class="block lg:inline">ONEW原创版权归杭州云联在线科技有限公司所有 盗用必究 ©2025</span>
        </div>
        <div 
          class="text-[14px] lg:text-[16px] text-[#FFF] leading-[16px] flex items-center order-2 lg:order-1 cursor-pointer hover:opacity-80 transition-opacity"
          @click="scrollToTop"
        >
          <span class="mr-[16px]">TOP</span>
          <img src="/static/toTop.png" class="h-[16px] w-[16px] lg:block hidden" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// placeholder 打字机效果
const placeholderText = ref('ENTER EMAIL')
const fullText = 'ENTER EMAIL'
let isTyping = false

const startTypewriter = () => {
  if (isTyping) return // 如果正在打字，不重复执行
  
  isTyping = true
  placeholderText.value = '' // 清空
  let currentIndex = 0
  
  const typeInterval = setInterval(() => {
    if (currentIndex < fullText.length) {
      placeholderText.value += fullText[currentIndex]
      currentIndex++
    } else {
      clearInterval(typeInterval)
      isTyping = false
    }
  }, 80) // 每80毫秒显示一个字符
}

// 回到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滚动
  })
}
</script>

<style scoped>
.email::placeholder{
  color: #EEE;
}
</style>