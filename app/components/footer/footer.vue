<template>
    <!-- 底页 -->
  <section
    class="section-3 w-[100vw] relative bg-[#3B4EFF] pt-[40px] lg:pt-[103px] px-[20px] lg:pl-[48px] lg:pr-[40px] flex flex-col justify-end pb-[40px]"
    :style="{ height: height }"
  >
    <div class="flex flex-col justify-between" :style="{ height: contentHeight, paddingTop: `${paddingTop}px` }">
      <!-- 上半部分：联系信息和导航 -->
      <div class="flex flex-col lg:flex-row lg:justify-between w-[100%] gap-[40px] lg:gap-0 mt-[40px] lg:mt-0">
        <!-- 联系我们 -->
        <div class="flex flex-col">
          <span class="text-[14px] lg:text-[16px] text-[#FFF] leading-[16px] mb-[12px]">/联系我们</span>
          <span class="text-[20px] lg:text-[24px] text-[#FFF] leading-[28px] lg:leading-[32px]">{{companyInfo?.company_email}}</span>
          <span class="text-[20px] lg:text-[24px] text-[#FFF] leading-[28px] lg:leading-[32px]">+86 {{companyInfo?.company_phone}}</span>
        </div>
        
        <!-- 导航和跟随我们 -->
        <div class="flex flex-col lg:flex-row gap-[40px] lg:gap-0">
          <div class="flex flex-col lg:mr-[120px]">
            <span class="text-[14px] lg:text-[16px] text-[#FFF] leading-[16px] mb-[12px] hidden lg:block">/导航</span>
            <span @click="navigateTo('/')" class="text-[20px] lg:text-[24px] text-[#EEE] leading-[28px] lg:leading-[32px] mb-[16px]  cursor-pointer">
              <GlitchText text="HOME 首页" :speed="30" :iterations="3" />
            </span>
            <span @click="navigateTo('/case')" class="text-[20px] lg:text-[24px] text-[#EEE] leading-[28px] lg:leading-[32px] mb-[16px]  cursor-pointer">
              <GlitchText text="WORKS 案例" :speed="30" :iterations="3" />
            </span>
            <span @click="navigateTo('/about')" class="text-[20px] lg:text-[24px] text-[#EEE] leading-[28px] lg:leading-[32px] mb-[16px]  cursor-pointer">
              <GlitchText text="ABOUT 关于" :speed="30" :iterations="3" />
            </span>
            <span @click="navigateTo('/contact')" class="text-[20px] lg:text-[24px] text-[#EEE] leading-[28px] lg:leading-[32px]  cursor-pointer">
              <GlitchText text="CONTACT 联系" :speed="30" :iterations="3" />
            </span>
          </div>
          <div class="flex flex-col mt-[-26px] lg:mt-0">
            <span class="text-[14px] lg:text-[16px] text-[#FFF] leading-[16px] mb-[12px] hidden lg:block">/跟随我们</span>
            <span class="text-[20px] lg:text-[24px] text-[#EEE] leading-[28px] lg:leading-[32px] mb-[16px]  cursor-pointer">
              <GlitchText v-if="companyInfo?.x" @click="goPage(companyInfo?.x ?? '')" :text="companyInfo?.x_name ?? ''" :speed="30" :iterations="3" />
            </span>
            <span class="text-[20px] lg:text-[24px] text-[#EEE] leading-[28px] lg:leading-[32px] mb-[16px]  cursor-pointer">
              <GlitchText v-if="companyInfo?.redbook" @click="goPage(companyInfo?.redbook ?? '')" :text="companyInfo?.redbook_name ?? ''" :speed="30" :iterations="3" />
            </span>
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
            <span class="block lg:inline"> 
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                class="ml-[1px] cursor-pointer hover:underline-offset-2 hover:underline inline-flex items-center"
                ><img src="/static/gh.png" class="h-[20px] w-[20px] mr-[10px]" alt=""> 浙ICP备2025205436号</a
              >
            </span>
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGetCompanyInfo } from "~/composables/api";

// 定义 props
interface FooterProps {
  height?: string
  contentHeight?: string
  paddingTop?: number
}

const goPage = (url: string) => {
  if (!url) return;
  window.open(url, '_blank');
}

const props = withDefaults(defineProps<FooterProps>(), {
  height: 'calc(100vh + 469px)',
  contentHeight: '469px',
  paddingTop: 0
})

// placeholder 打字机效果
const placeholderText = ref('ENTER EMAIL')
const fullText = 'ENTER EMAIL'
let isTyping = false
interface CompanyInfo {
  company_email: string;
  company_phone: string;
  company_name: string;
  company_address: string;
  company_logo: string;
  company_description: string;
  x_name: string;
  redbook_name: string;
  x: string;
  redbook: string;
}
const companyInfo = ref<CompanyInfo>();

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

onMounted(async() => {
  // 请求公司信息数据
  // const companyInfoData: any = await useGetCompanyInfo();
  // companyInfo.value = companyInfoData?.data ?? [];
  // window.localStorage.setItem('companyInfo', JSON.stringify(companyInfoData?.data));
  companyInfo.value = JSON.parse(window.localStorage.getItem('companyInfo') ?? '[]');
});
</script>

<style scoped>
.email::placeholder{
  color: #EEE;
}
</style>