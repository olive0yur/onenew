<template>
  <div class="overflow-hidden" :class="{'bg-[#283faa]': showLoadingVideo}">
    <div v-if="showLoadingVideo" class="w-[100vw] h-[100dvh] fixed top-0 left-0 z-[100000] transition-opacity duration-500 bg-[#283faa]" :class="{ 'opacity-0': isVideoFadingOut }">
      <div class="lg:h-[180px] h-[100px] w-[100vw] absolute top-0 left-0 flex items-center">
         <img src="/static/Subtract.svg"  class="lg:h-[180px] lg:w-[180px] h-[100px] w-[100px]"  alt=""></img>
         <div class="bg-[#FFFFFF33] h-[1px] w-[100%] flex-1"></div>
         <span v-if="homeFixed[0]?.remark" class="loading-text-remark">{{ homeFixed[0]?.remark }}</span>
      </div>
      <div class="h-[180px] absolute bottom-[80px] right-[80px] loading-text">
        <span>{{loadingText}}</span>
        <span>%</span>
      </div>
      <video 
       v-if="homeFixed[0]?.video"
        ref="loadingVideoRef"
        :src="imgBaseURL(homeFixed[0]?.video)" 
        autoplay 
        muted 
        loop 
        playsinline
        webkit-playsinline
        x5-playsinline
        x-webkit-airplay="allow"
        class="w-full h-full object-cover"
      ></video>
    </div>

    <div :class="{ 'opacity-0': showLoadingVideo }">
      <section id="section-0" class="section-0 relative w-[100vw] h-[100dvh]">
        <div 
          class="section-0-warp w-full h-[100dvh] bg-[#3B4EFF]/50 blue-mask relative"
          @mouseenter="handleSection0MouseEnter"
          @mouseleave="handleSection0MouseLeave"
          @mousemove="handleSection0MouseMove"
        >
          <!-- 跟随鼠标的文字 -->
          <div 
            v-show="showScrollText"
            ref="scrollTextEl"
            class="scroll-text-follow"
            :style="{
              transform: `translate(${scrollTextPosition.x}px, ${scrollTextPosition.y}px)`
            }"
          >
            SCROLL TO EXPLORE
          </div>
          <!-- logo-container 移到 blue-mask 内部 -->
          <div class="px-[16px] lg:px-[40px] absolute bottom-0 left-0 right-0 logo-container">
            <img :src="imgBaseURL('oneNew.svg')" alt="" class="w-[100%]" />
          </div>
        </div>
        <!-- <img
          :src="imgBaseURL(homeFixed[0]?.img)"
          alt=""
          class="w-full h-[100vh] object-cover bg-image fixed top-0 left-0 z-[-1]"
        /> -->
         <video 
           v-if="homeFixed[0]?.video1"
           ref="bgVideoRef"
           :src="imgBaseURL(homeFixed[0]?.video1)" 
           muted 
           loop 
           playsinline
           webkit-playsinline
           x5-playsinline
           x-webkit-airplay="allow"
           class="w-full h-[100vh] object-cover bg-image fixed top-0 left-0 z-[-1]"
         ></video>
      </section>

      <section
        id="section-1"
        class="section-1 w-[100vw] h-auto bg-[#F8F8F8] lg:p-[40px] p-[16px] overflow-hidden rotate-[0deg] mt-[30vh]"
      >
        <div class="lg:text-[16px] text-[12px] text-[#000]">
          <span class="mr-[4px]"> /</span>
          <span style="font-family: 'Noto'">关于我们</span>
        </div>
        <div
          class="text-[#0B0B0B] font-['Inter'] lg:text-[160px] text-[64px] font-normal capitalize lg:leading-[160px] leading-[64px] lg:mb-[40px] mb-[16px]"
        >
          creativity
        </div>
        <div
          class=" mb-[40px] lg:mb-0"
        >
          <ContactButton 
            class="hidden lg:flex"
            borderColor="#000"
            borderWidth="2px"
            width="165px"
            textColor="#000"
            bgColorHover="#3B4EFF"
            textColorHover="#fff"
            arrowColorHover="#fff"
            text="ABOUT 关于"
            @hover="onContactHover"
            @leave="onContactLeave"
          />

          <div class="lg:hidden h-[28px] w-[110px] text-[12px] bg-[#3B4EFF] text-[#fff] flex items-center justify-center border-l-[1px] border-[#000] border-solid">
            ABOUT 关于

            <svg 
              class="transition-colors duration-300 button-arrow ml-[8px]" 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
            >
              <path 
                class="transition-colors duration-300" 
                stroke="#fff"
                d="M14 8H2"
              />
              <path 
                class="transition-colors duration-300" 
                stroke="#fff"
                d="M10 4L14 8L10 12"
              />
            </svg>
          </div>
        </div>
        <div class="flex flex-col items-end overflow-hidden">
          <div
            v-for="(describe, index) in aboutList"
            :key="describe.index"
            :ref="(el: any) => setDescribeRef(el, index)"
            class="describe-item flex flex-col border-b-[1px] border-[#DCDCDC] lg:py-[40px] py-[16px] lg:pr-[39px] w-full max-w-[1318px] cursor-pointer relative"
          >
            <!-- index -->
            <span
              class="font-['Inter'] text-[16px] text-[#3B4EFF] absolute top-[40px] left-[-64px] uppercase font-[400] hidden lg:block"
              >/ {{ '0' + (index+1) }}</span
            >
            <!-- 主要内容行 -->
            <div @click="toggleExpand(index)" class="flex items-center justify-between w-full">
              <div class="flex flex-col lg:flex-row lg:items-center items-start">
                <span
                  class="font-['Inter'] lg:text-[64px] text-[24px] font-normal lg:leading-[64px] leading-[24px] text-[#000] mr-[16px]"
                  >{{ describe?.label }}</span
                >
                <span class="font-['Noto'] lg:text-[32px] text-[16px] mt-[8px] lg:mt-0">{{
                  describe?.remark
                }}</span>
              </div>
              <img
                :src="imgBaseURL('add.svg')"
                alt=""
                :class="[
                  'lg:w-[24px] lg:h-[24px] w-[16px] h-[16px] cursor-pointer transition-transform duration-300 hover:scale-110',
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
                <p class="h-[40px]"></p>
                <p
                  class="font-['Noto'] text-[16px] leading-[32px] text-[#666] whitespace-pre-line max-w-[935px]"
                >
                  {{ describe?.description }}
                </p>
              </div>
            </transition>
          </div>
        </div>
      </section>

      <section
        id="section-2"
        class="section-2 h-[500vh] w-[100vw] bg-[#F3F3F3] relative overflow-hidden"
        style="
          clip-path: inset(0 0 -100vh 0);
        "
      >
        <div
          class="section-2-wrap h-[100vh] w-[100vw] inset-0 absolute z-[1] overflow-hidden"
        >
          <div
            class="img-warp h-[100vh] flex justify-center items-center gap-[16px] relative overflow-visible"
          >
            <!-- 左侧文字 -->
            <div
              class="section2-text-left flex flex-col items-end justify-center w-[400px] z-10"
            >
              <span
                class="font-['Inter'] lg:text-[64px] text-[24px] text-[#000] whitespace-nowrap lg:leading-[64px] leading-[24px] lg:mb-[40px] mb-[16px]"
              >
                The Work
              </span>
              <span
                class="font-['Noto'] lg:text-[32px] text-[16px] text-[#000] lg:leading-[32px] leading-[16px]"
              >
                看作品
              </span>
            </div>

            <!-- 中央图片 - 作为滚动序列的第一个 -->
            <img :src="imgBaseURL(scrollImage[0]?.img)"  class="expand-image object-cover" alt="" />

            <!-- 右侧文字 -->
            <div
              class="section2-text-right w-[400px] flex flex-col items-start justify-center z-10"
            >
              <span
                class="font-['Inter'] lg:text-[64px] text-[24px] text-[#000] whitespace-nowrap lg:leading-[64px] leading-[24px] lg:mb-[40px] mb-[16px]"
              >
                Can Speak
              </span>
              <span class="font-['Noto'] lg:text-[32px] text-[16px] text-[#000] lg:leading-[32px] leading-[16px]"
                >见实力</span
              >
            </div>

            <!-- 线条 -->
            <div class="section-2-line-top absolute h-[1px] bg-[#FFF] lg:left-[147px] left-[49%] ml-[10px] lg:ml-0 lg:top-[calc(50vh-10px)] top-[200px] lg:rotate-[-45deg] rotate-[45deg] origin-left z-[10]"></div>
            <div class="section-2-line-bottom absolute h-[1px] bg-[#FFF] lg:left-[147px] left-[49%] lg:top-[calc(50vh+10px)] top-[200px] lg:rotate-[45deg] rotate-[135deg] origin-left z-[10]"></div>

            <!-- 文字 -->
             <span class="section-2-text ml-[-33px] lg:ml-0 absolute lg:top-[50%] top-[177px] left-[50%] lg:translate-x-0 lg:translate-y-[-50%] z-[10] text-[#fff] lg:text-[16px] text-[12px] lg:left-[40px]">DISCOVER</span>

            <!-- PC端滚动图片 -->
            <img
              v-for="(item, index) in scrollImage"
              :key="index"
              :src="imgBaseURL(item?.img)"
              :class="`hidden lg:block h-[90px] absolute scroll-img scroll-img-${index + 1} opacity-0`"
              alt=""
            />

            <!-- 移动端滚动图片（从左到右，沿曲线路径） -->
            <div class="lg:hidden absolute h-[100dvh] w-[100vw] z-[15] overflow-hidden pointer-events-none">
              <img
                v-for="(item, index) in scrollImage"
                :key="index"
                :src="imgBaseURL(item?.img)"
                :class="`scroll-img-mobile scroll-img-mobile-${index + 1} w-[100px] opacity-0 absolute`"
                :style="{ top: 'calc(58vh)', left: '0' }"
                alt=""
              />
            </div>
            
            <!-- PC端文字遮罩区域 -->
            <div class="hidden lg:block absolute h-[100dvh] w-[100vw] z-[20]"
            style="clip-path: polygon(147px calc(50vh - 10px), calc(147px + 56.57vw) calc(50vh - 56.57vw - 10px), 100vw calc(50vh - 56.57vw - 10px), 100vw calc(50vh + 56.57vw + 10px), calc(147px + 56.57vw) calc(50vh + 56.57vw + 10px), 147px calc(50vh + 10px), 147px 50vh);">
              <span 
                v-for="(item, index) in scrollWords" 
                :key="item?.id" 
                :class="`scroll-text scroll-text-${index + 1} text-[64px] leading-[64px] text-[#FFF] absolute opacity-100`"
              >{{ item?.dict_value }}</span>
            </div>

            <!-- 移动端文字区域（无遮罩，从右到左横向滚动） -->
            <div class="lg:hidden absolute h-[100dvh] w-[100vw] z-[20] overflow-hidden">
              <div class="scroll-text-mobile-container absolute top-[58vh] left-0 -translate-y-1/2 flex items-center gap-[16px]">
                <span 
                  v-for="(item, index) in scrollWords" 
                  :key="item?.id" 
                  :class="`scroll-text-mobile scroll-text-mobile-${index + 1} text-[24px] leading-[24px] text-[#FFF] opacity-30 w-[200px] h-auto text-center flex-shrink-0`"
                >{{ item?.dict_value }}</span>
              </div>
            </div> 

            <!-- 封面遮罩 -->
             <div class="cover-mask absolute h-[100dvh] w-[100vw] z-[30] translate-y-[100dvh] rotate-[45deg] flex flex-col">
                <!-- 覆盖卡片 -->
                <section
                  id="section-3"
                  class="section-3 w-[100vw] min-h-[100dvh] bg-[#F8F8F8] overflow-hidden rotate-[0deg]"
                >
                  <div class="text-[16px] text-[#000] lg:px-[40px] px-[16px] lg:pt-[40px] pt-[16px]">
                    <span class="mr-[4px]"> /</span>
                    <span style="font-family: 'Noto'">我们的客户</span>
                  </div>
                  <div
                    class="text-[#0B0B0B] font-['Inter'] lg:text-[160px] text-[64px] font-normal capitalize lg:leading-[160px] leading-[64px] lg:mb-[60px] mb-[16px] lg:px-[40px] px-[16px]"
                  >
                    Trust
                  </div>
                  <!-- 外层容器 -->
                  <div class="relative lg:mb-[40px] mb-[16px]">
                    <!-- 滚动容器 -->
                    <div 
                      ref="listCardWrap" 
                      class="h-[360px] overflow-hidden list-card-wrap relative">
                      <div ref="listCardItemWrap" class="flex lg:gap-[40px] gap-[16px] list-card-item-wrap"> 
                        <div class="lg:w-[586px] w-[252px] lg:h-[360px] h-[328px] box-border flex-shrink-0 bg-[#fff] list-card-item lg:p-[40px] p-[16px]" v-for="(item, index) in customerList" :key="item.title">
                          <div class="h-[100%]">
                            <img :src="imgBaseURL(item?.img1)" class="h-[24px] w-auto lg:mb-[24px] mb-[16px]" alt="">
                            <div class="flex flex-col justify-between h-[100%] ">
                              <p class="lg:text-[16px] text-[12px] leading-[24px] text-[#666]">{{ item?.description }}</p>

                              <div class="flex justify-between items-center mb-[40px] ">
                                <div class="flex items-center">
                                  <img :src="imgBaseURL(item?.img)" class="lg:h-[60px] lg:w-[60px] h-[32px] w-[32px] mr-[16px]" alt="">
                                  <div class="flex flex-col">
                                    <span class="lg:text-[16px] text-[12px] text-[#293238] lg:leading-[16px] leading-[12px]">{{ item?.dict_value }}</span>
                                    <span class="lg:text-[16px] text-[12px] text-[#666] lg:leading-[16px] leading-[12px]">{{ item?.remark }}</span>
                                  </div>
                                </div>
                                <div class="lg:text-[16px] text-[12px] text-[#666]">
                                  / 0{{ index+1 }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="overflow-hidden hidden lg:block" style="height: calc(100dvh - 480px);">
                    <GlobeCanvas />
                  </div>
                  <div class="overflow-hidden block lg:hidden" style="height: calc(100dvh - 320px);">
                    <GlobeCanvas />
                  </div>
                </section>
             </div>
          </div>
        </div>
      </section>

      <section id="section-4" class="cover section-4 h-[300vh] w-[100vw] relative z-[31]">
        <div class="relative h-[100vh] w-[100vw] section-4-wrap            overflow-hidden">

          <canvas 
            ref="imageCanvas" 
            class="w-[100vw] h-[100vh] absolute top-0 left-0"
            :width="canvasWidth"
            :height="canvasHeight"
          ></canvas>

          <div class="section-4-line-top absolute h-[1px] bg-[#FFF] lg:left-[147px] left-[49%] ml-[10px] lg:ml-0 lg:top-[calc(50vh-10px)] top-[200px] lg:rotate-[-45deg] rotate-[45deg] origin-left z-[22]"></div>
          <div class="section-4-line-bottom absolute h-[1px] bg-[#FFF] lg:left-[147px] left-[49%] lg:top-[calc(50vh+10px)] top-[200px] lg:rotate-[45deg] rotate-[135deg] origin-left z-[22]"></div>

          <div class="redbook absolute w-[100%] lg:top-[50%] top-[56%] lg:translate-y-[-50%] lg:left-[352px] z-[10] text-[#fff] text-[16px] flex flex-col items-center lg:items-start">
            <span 
              class="lg:text-[64px] text-[24px] lg:leading-[64px] leading-[24px] lg:mb-[24px] mb-[12px] redbook-mark"
              :class="isTextAnimating ? 'redbook-fade-out' : 'redbook-fade-in-up'"
            >{{clickImageList[currentImageIndex]?.remark}}</span>
            <span 
              class="lg:text-[32px] text-[16px] lg:leading-[32px] leading-[16px] redbook-title"
              :class="isTextAnimating ? 'redbook-fade-out redbook-fade-out-delay' : 'redbook-fade-in-up redbook-fade-in-up-delay'"
            >{{clickImageList[currentImageIndex]?.label}}</span>
          </div>

          <div class="redbook-desc absolute bottom-[-48px] lg:bottom-auto lg:top-[70%] lg:translate-y-[-50%] left-[16px] lg:left-auto lg:right-[40px] z-[10] text-[#fff] text-[16px] flex flex-col lg:w-[690px] w-[240px]">
            <span 
              class="lg:text-[16px] text-[12px] lg:leading-[32px] leading-[24px]"
              :class="isTextAnimating ? 'redbook-fade-out redbook-fade-out-delay-long' : 'redbook-fade-in-up redbook-fade-in-up-delay-long'"
            >{{clickImageList[currentImageIndex]?.description}}</span>
          </div>
          
          <div class="lg:hidden absolute z-[13] bottom-[16px] right-[16px] flex gap-[16px]">
            <img @click.stop.prevent="handleClick('left')" :src="imgBaseURL('cursor-left-white.svg')" alt="" class="w-[32px] h-[32px]" srcset="">
            <img @click.stop.prevent="handleClick('right')" :src="imgBaseURL('cursor-right.svg')" alt="" class="w-[32px] h-[32px]" srcset="">
          </div>

          <span class="section-4-text ml-[-33px] lg:ml-0 absolute lg:top-[50%] top-[177px] left-[50%] lg:translate-x-0 lg:translate-y-[-50%] z-[10] text-[#fff] lg:text-[16px] text-[12px] lg:left-[40px]">FOLLOW US</span>

          <div class="absolute z-[11] inset-0 flex">
          <div @click="handleClick('left')" class="flex-1 section-4-left" @mousemove="handleMouseMove" @mouseenter="handleMouseEnter('left')" @mouseleave="handleMouseLeave"></div>
          <div @click="handleClick('right')" class="flex-1 section-4-right" @mousemove="handleMouseMove" @mouseenter="handleMouseEnter('right')" @mouseleave="handleMouseLeave"></div>
          </div>

          <div 
            ref="followIcon" 
            class="follow-icon absolute z-[12] pointer-events-none opacity-0 transition-opacity duration-300 hidden lg:block"
            :class="{ 'opacity-100': showFollowIcon }"
          >
            <div class="w-[80px] h-[80px] bg-[#3B4EFF] flex items-center justify-center rounded-full">
              <img 
                src="/static/toRight.png" 
                alt="follow icon" 
                class="w-[40px] h-[40px] transition-transform duration-300" 
                :class="{ 'rotate-180': currentSide === 'left' }"
              />
            </div>
          </div>
         
          <div
            ref="currentImagesContainer"
            :style="{ width: `${306 + (imagesListGroup[0]?.images?.length - 1) * 40}px` }"
            class="absolute bottom-[40px] right-[40px] hidden lg:flex">
          </div>

          <div 
            ref="previousImagesContainer"
            :style="{ width: `${306 + (imagesListGroup[0]?.images?.length - 1) * 40}px` }"
            class="previous-image-group hidden lg:flex"
          >
          </div>

          <!-- Let's talk -->
          <section id="section-5" class="section-5 rotate-[20deg] h-[100vh] w-[100vw] box-border grid grid-cols-2 absolute translate-y-[140vh] translate-x-[-20vw] z-[32] bg-[#fff] overflow-hidden" style="grid-template-rows: 1fr 1.4fr;">
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
              <div class="absolute w-[150px] h-[150px] md:w-[288px] md:h-[288px] z-[33] top-[38%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-wrap">
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
        </div>
      </section>

      <section id="section-6" class="section-6 relative mt-[-85vh] z-[30]">
        <Footer />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { imgBaseURL } from "~/utils";
import Lenis from "lenis";
import { useLenis } from "~/composables/useLenis";
import { getDictList, getImageGroup } from "~/composables/api";


useHead({
  title: 'ONEW专业网站建设公司 云联在线',
  meta: [
    { name: 'description', content: 'ONEW专业网站建设公司 云联在线' },
    { name: 'keywords', content: 'ONEW专业网站建设公司 云联在线' },
  ],
})

const loadingText = ref(0);
const homeFixed:any= ref<any>([]);
const aboutList:any= ref<any>([]);
const scrollImage:any= ref<any>([]);
const scrollWords:any = ref<any>([]);
const customerList:any= ref<any>([]);
const clickImageList:any= ref<any>([]);
const groupImage:any= ref<any>([]);
const isMobile = ref(false);

// 控制加载视频的显示
const showLoadingVideo = ref(true);
const isVideoFadingOut = ref(false);
const loadingVideoRef = ref<HTMLVideoElement | null>(null);
const bgVideoRef = ref<HTMLVideoElement | null>(null); // 背景视频引用

// 检测移动端设备
const detectMobile = () => {
  if (import.meta.client) {
    isMobile.value = window.innerWidth < 768;
  }
};

if(import.meta.client) {
  gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin);
  detectMobile(); // 初始化时检测
  window.addEventListener('resize', detectMobile); // 监听窗口大小变化
}

const ctx: any = ref(null);
const lenis: any = ref(null);
const describeRefs: any = ref([]);
// 小图渲染开关与时间线引用，避免回退后被异步回调重建
const smallImagesRenderingEnabled = ref(true);
let lastSmallImagesTimeline: gsap.core.Timeline | null = null;
// 用于跟踪每个item的展开状态
const expandedItems: any = ref({});

// 跟随图标相关状态
const followIcon: any = ref(null);
const showFollowIcon = ref(false);
const currentSide = ref<'left' | 'right'>('right'); // 跟踪当前是左侧还是右侧
const mousePosition = ref({ x: 0, y: 0 });
const targetPosition = ref({ x: 0, y: 0 });
const animationId = ref(0);

// section-0 跟随文字相关状态
const scrollTextEl = ref<HTMLElement | null>(null);
const showScrollText = ref(false);
const scrollTextPosition = ref({ x: 0, y: 0 });
const scrollTextTarget = ref({ x: 0, y: 0 });
const scrollTextAnimationId = ref(0);

// 卡片容器引用（保留用于 GSAP 动画）
const listCardWrap = ref<HTMLElement | null>(null);
const listCardItemWrap = ref<HTMLElement | null>(null);

// 图片切换相关状态
const currentImageIndex = ref(0); // 当前显示的图片索引
const isTextAnimating = ref(false); // 文字动画状态
const aboutGlitchRef = ref<any>(null);
// Canvas相关状态
const imageCanvas = ref<HTMLCanvasElement | null>(null);
const canvasWidth = ref(0);
const canvasHeight = ref(0);
const loadedImages = ref<HTMLImageElement[]>([]);
const imageScales = ref<number[]>([]);
const targetScales = ref<number[]>([]);
const canvasAnimationId = ref(0);

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

// 转场动画相关
const transitionAngleInner = ref(0); // 内角擦除线的角度（弧度）
const transitionAngleOuter = ref(0); // 外角擦除线的角度（弧度）
const isTransitioning = ref(false); // 是否正在转场
const transitionDirection = ref<'left' | 'right'>('right'); // 转场方向
const nextImageIndex = ref(0); // 下一张图片的索引

// ========== 转场角度配置 ==========
// 这些角度必须与CSS中引导线的角度保持一致
// CSS引导线位置：
//   PC端（lg）：
//     .section-4-line-top:   rotate-[-45deg]
//     .section-4-line-bottom: rotate-[45deg]
//   移动端：
//     .section-4-line-top:   rotate-[45deg]
//     .section-4-line-bottom: rotate-[135deg]
// ===================================

// PC端角度
const LINE_TOP_ANGLE_PC = -45;
const LINE_BOTTOM_ANGLE_PC = 45;

// 移动端角度
const LINE_TOP_ANGLE_MOBILE = 45;
const LINE_BOTTOM_ANGLE_MOBILE = 135;

// 响应式角度值
const LINE_TOP_ANGLE = computed(() => isMobile.value ? LINE_TOP_ANGLE_MOBILE : LINE_TOP_ANGLE_PC);
const LINE_BOTTOM_ANGLE = computed(() => isMobile.value ? LINE_BOTTOM_ANGLE_MOBILE : LINE_BOTTOM_ANGLE_PC);

// 转换为弧度（Canvas使用弧度）
const LINE_TOP_ANGLE_RAD = computed(() => (LINE_TOP_ANGLE.value * Math.PI) / 180);
const LINE_BOTTOM_ANGLE_RAD = computed(() => (LINE_BOTTOM_ANGLE.value * Math.PI) / 180);

// 自动计算内角和外角的范围
const INNER_ANGLE_START = computed(() => LINE_TOP_ANGLE_RAD.value); // 内角起点（沿上引导线）
const INNER_ANGLE_END = computed(() => LINE_BOTTOM_ANGLE_RAD.value); // 内角终点（沿下引导线）
const INNER_ANGLE_RANGE = computed(() => INNER_ANGLE_END.value - INNER_ANGLE_START.value); // 内角范围（弧度）
const OUTER_ANGLE_RANGE = computed(() => Math.PI * 2 - INNER_ANGLE_RANGE.value); // 外角范围（弧度）

// 图片容器ref
const currentImagesContainer = ref<HTMLElement | null>(null);
const previousImagesContainer = ref<HTMLElement | null>(null);

const imagesListGroup:any = ref([])

const hoveredImageIndex = ref(0);


// 设置每个describe item的ref
const setDescribeRef = (el: any, index: number) => {
  if (el) {
    describeRefs.value[index] = el;
  }
};

// 切换展开状态的函数（手风琴效果 - 同时只能展开一个）
const toggleExpand = (index: number) => {
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

// 鼠标进入区域时的处理
const handleMouseEnter = (side: 'left' | 'right') => {
  showFollowIcon.value = true;
  currentSide.value = side; // 更新当前侧边
  
  // 立即将图标位置设置为当前鼠标位置，避免从左上角(0,0)开始移动
  mousePosition.value = { ...targetPosition.value };
  // 开始跟随动画
  startFollowAnimation();
};

// 鼠标离开区域时的处理
const handleMouseLeave = () => {
  showFollowIcon.value = false;
  
  // 停止动画
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
    animationId.value = 0;
  }
};

// section-0-warp 鼠标进入
const handleSection0MouseEnter = () => {
  showScrollText.value = true;
  startScrollTextAnimation();
};

// section-0-warp 鼠标离开
const handleSection0MouseLeave = () => {
  showScrollText.value = false;
  if (scrollTextAnimationId.value) {
    cancelAnimationFrame(scrollTextAnimationId.value);
    scrollTextAnimationId.value = 0;
  }
};

// section-0-warp 鼠标移动
const handleSection0MouseMove = (e: MouseEvent) => {
  scrollTextTarget.value = {
    x: e.clientX,
    y: e.clientY
  };
};


// 开始文字跟随动画
const startScrollTextAnimation = () => {
  const animate = () => {
    // 平滑跟随效果
    scrollTextPosition.value.x += (scrollTextTarget.value.x - scrollTextPosition.value.x) * 0.15 +2;
    scrollTextPosition.value.y += (scrollTextTarget.value.y - scrollTextPosition.value.y) * 0.15-1;
    
    scrollTextAnimationId.value = requestAnimationFrame(animate);
  };
  
  animate();
};

// 鼠标移动时的处理
const handleMouseMove = (event: MouseEvent) => {
  // 获取相对于section-4的坐标
  const section4 = document.querySelector('.section-4-wrap') as HTMLElement;
  if (!section4) return;
  
  const rect = section4.getBoundingClientRect();
  targetPosition.value = {
    x: event.clientX - rect.left+2,
    y: event.clientY - rect.top-25 // 图标中心与鼠标位置对齐
  };
};

// 开始跟随动画
const startFollowAnimation = () => {
  const animate = () => {
    if (!followIcon.value || !showFollowIcon.value) return;
    
    // 使用缓动让图标平滑跟随
    const lerp = 0.2; // 缓动系数，值越大跟随越快（0.15 -> 0.2 提升灵敏度）
    mousePosition.value.x += (targetPosition.value.x - mousePosition.value.x) * lerp;
    mousePosition.value.y += (targetPosition.value.y - mousePosition.value.y) * lerp;
    
    // 更新图标位置
    followIcon.value.style.left = `${mousePosition.value.x}px`;
    followIcon.value.style.top = `${mousePosition.value.y}px`;
    
    animationId.value = requestAnimationFrame(animate);
  };
  
  animate();
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

// ===== 平滑滚动初始化 =====
const { setLenis } = useLenis();

const initLenis = () => {
  // 移动端降低触摸滚动倍数，让滚动更平缓
  lenis.value = new Lenis({
    duration: 0,
    wheelMultiplier: 1,
    touchMultiplier: isMobile.value ? 0.2 : 1, // 移动端降低到 0.5
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

// ===== 背景和初始动画 =====
const initBackgroundAnimations = () => {
  // 初始动画timeline，延迟4秒开始（与加载视频显示时间一致）
  const initialTl = gsap.timeline({ delay: 4 });

  // 设置bg-image初始状态
  gsap.set(".bg-image", {
    transformOrigin: "50% 50%",
    x: "-5vw",
    y: "60vh",
    rotation: 5,
  });

  // bg-image入场动画
  initialTl.to(".bg-image", {
    x: 0,
    y: 0,
    rotation: 0,
    duration: 1.2,
    ease: "power2.inOut",
  });

  // blue-mask滚动动画（logo-container会自动跟随父容器）
  // 移动端使用更大的 scrub 值让滚动更平缓
  gsap.to(".blue-mask", {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "100vh top",
      scrub: isMobile.value ? 3 : 1.5, // 移动端使用 3，桌面端使用 1.5
    },
    x: isMobile.value ? "-30vw" : "-10vw",
    y: isMobile.value ? "-100dvh" : "-100vh",
    rotation: -15,
    ease: "sine.inOut",
  });
};

// ===== Section-1 动画 =====
const initSection1Animations = () => {
  // 设置section-1初始状态
  gsap.set(".section-1", {
    transformOrigin: "50% 50%",
    x: "-14vw",
    y: "0",
    rotation: 10,
  });

  // section-1滚动动画
  gsap.to(".section-1", {
    scrollTrigger: {
      trigger: ".section-1",
      start: "top 100%",
      end: "top 50%",
      scrub: true,
      toggleActions: "play none none reverse",
    },
    x: 0,
    y: 0,
    rotation: 0,
    ease: "sine.inOut",
  });

  // describe元素动画
  const describeTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-1",
      scrub: true,
    },
  });

  describeRefs.value.forEach((el: any) => {
    describeTl.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        end: "bottom-=10px 100%",
        scrub: 2,
      },
      x: 0,
      opacity: 1,
      ease: "power1.out",
    });
  });
};

// ===== Section-2 文字动画 =====
const initSection2TextAnimations = () => {
  // 分割文字为单词
  const splitTextLeft = new SplitText(".section2-text-left", {
    type: "words",
    // autoSplit: true,
  });
  const splitTextRight = new SplitText(".section2-text-right", {
    type: "words",
  });

  // 设置初始状态
  gsap.set([splitTextLeft.words, splitTextRight.words], {
    y: "80px",
    opacity: 0,
  });

  // 左侧文字动画
  gsap.to(splitTextLeft.words, {
    y: 0,
    opacity: 1,
    ease: "sine.out",
    duration: 0.2,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".section-2",
      start: "top 40%",
      end: "top 70%",
      toggleActions: "play none none reverse",
    },
  });

  // 右侧文字动画
  gsap.to(splitTextRight.words, {
    y: 0,
    opacity: 1,
    ease: "sine.out",
    duration: 0.2,
    stagger: 0.1,
    delay: 0.3,
    scrollTrigger: {
      trigger: ".section-2",
      start: "top 40%",
      end: "top 70%",
      toggleActions: "restart none none reverse",
    },
  });
};

// ===== 生成括号路径 =====
const generateBracketPath = () => {
  const bracketPath = [];
  const bracketSteps = 120;
  const arcRadius = 220;
  const arcOffset = -40;
  const verticalMultiplier = 1.2;

  for (let i = 0; i <= bracketSteps; i++) {
    const t = i / bracketSteps;
    const x = Math.sin(t * Math.PI) * arcRadius + arcOffset;
    const y = t * window.innerHeight * verticalMultiplier;
    bracketPath.push({ x, y });
  }

  return bracketPath;
};

// ===== 生成移动端曲线路径（向下突出的弧线）=====
const generateMobileCurvePath = () => {
  const curvePath = [];
  const curveSteps = 100; // 路径点数量
  const curveDepth = 120; // 向下突出的深度（px）
  const screenWidth = window.innerWidth;
  
  for (let i = 0; i <= curveSteps; i++) {
    const t = i / curveSteps; // 0 到 1 的进度
    // X轴：从左侧屏幕外到右侧屏幕外
    const x = -200 + t * (screenWidth + 400);
    // Y轴：使用抛物线函数，中间向下凸起
    // 使用 4 * t * (1 - t) 创建一个在 t=0.5 时达到最大值 1 的抛物线
    const y = Math.sin(t * Math.PI) * curveDepth;
    
    curvePath.push({ x, y });
  }
  
  return curvePath;
};

// 图片缩放和文字移动的持续时间配置
const SCALE_DURATION = 4;

// ===== Section-2 主要动画 =====
const initSection2MainAnimations = () => {
  const section2Tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-2",
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      toggleActions: "restart none none reverse",
      pin: ".section-2-wrap",
    },
  });

  // 文字移出动画 - 与图片缩放同步
  section2Tl.fromTo(
    ".section2-text-left",
    { opacity: 1, x: 0 },
    { x: "-60vw", opacity: 1, duration: SCALE_DURATION, ease: "power2.out" },
    0
  );

  section2Tl.fromTo(
    ".section2-text-right",
    { opacity: 1, x: 0 },
    { x: "60vw", opacity: 1, duration: SCALE_DURATION, ease: "power2.out" },
    0
  );

  // 图片放大动画
  section2Tl.to(
    ".expand-image",
    {
      scale: 1,
      right: "0",
      top: "0",
      left: "0",
      bottom: "0",
      duration: SCALE_DURATION,
      ease: "power2.out",
    },
    0
  );

  return section2Tl;
};

// ===== 中央图片管理 =====
const initCentralImageManagement = (timeline: gsap.core.Timeline) => {
  // 设置初始状态
  timeline.set(".expand-image", { opacity: 1 }, 0);

  // 确保显示第一个图片
  timeline.call(
    () => {
      const expandImage = document.querySelector(
        ".expand-image"
      ) as HTMLImageElement;
      if (expandImage) {
        expandImage.src = imgBaseURL(scrollImage.value[0]?.img);
      }
    },
    [],
    0
  );

  // 监听进度变化
  const scrollTrigger = ScrollTrigger.getById((timeline.scrollTrigger as any)?.id);
  if (scrollTrigger) {
    scrollTrigger.vars.onUpdate = (self: any) => {
      const progress = self.progress;
      const expandImage = document.querySelector(
        ".expand-image"
      ) as HTMLImageElement;

      if (expandImage && progress < 0.15) {
        expandImage.src = imgBaseURL(scrollImage.value[0]?.img);
      }
    };
  }

  // 检查点
  timeline.call(
    () => {
      const expandImage = document.querySelector(
        ".expand-image"
      ) as HTMLImageElement;
      if (expandImage && timeline.progress() < 0.1) {
        expandImage.src = imgBaseURL(scrollImage.value[0]?.img);
      }
    },
    [],
    0.1
  );
};

// 渲染当前图片组
const renderCurrentImages = () => {
  if (!smallImagesRenderingEnabled.value) return;
  if (!currentImagesContainer.value) return;
  
  // 清空容器
  currentImagesContainer.value.innerHTML = '';
  
  const images = imagesListGroup.value[currentImageIndex.value]?.images || [];
  
  images.forEach((item: any, index: number) => {
    const img = document.createElement('img');
    img.src = imgBaseURL(item.src);
    img.alt = '';
    img.className = 'current-imgs h-[172px] object-cover z-[21] overflow-hidden transition-all ease-in-out cursor-pointer image-list-item';
    img.style.left = `${index * 40}px`;
    img.style.width = index === hoveredImageIndex.value ? '306px' : '40px';
    img.style.transitionDuration = '500ms';
    
    // 添加事件监听
    img.addEventListener('mouseenter', () => handleImageHover(index));
    img.addEventListener('mouseleave', handleImageLeave);
    
    currentImagesContainer.value?.appendChild(img);
  });
};

// 渲染上一组图片（可选：强制指定组索引，仅用于首次动画）
const renderPreviousImages = (overrideIndex?: number) => {
  if (!smallImagesRenderingEnabled.value) return;
  if (!previousImagesContainer.value) return;
  
  // 清空容器
  previousImagesContainer.value.innerHTML = '';
  
  const prevIndex = typeof overrideIndex === 'number'
    ? overrideIndex
    : (currentImageIndex.value === 0 
      ? imagesListGroup.value.length - 1 
      : currentImageIndex.value - 1);
  
  const images = imagesListGroup.value[prevIndex]?.images || [];
  
  images.forEach((item: any, index: number) => {
    const img = document.createElement('img');
    img.src = imgBaseURL(item.src);
    img.alt = '';
    img.className = 'last-imgs h-[172px] w-[306px] object-cover overflow-hidden transition-all ease-in-out previous-image-item absolute';
    img.style.zIndex = String(index + 22);
    img.style.transitionDuration = '500ms';
    img.style.right = `${images.length * 40}px`;
    img.style.bottom = '-200px'; // 初始位置在底部下方，准备从底部滚上来
    
    // 添加事件监听
    img.addEventListener('mouseenter', () => handleImageHover(index));
    img.addEventListener('mouseleave', handleImageLeave);
    
    previousImagesContainer.value?.appendChild(img);
  });
};

// 重新渲染所有图片（动画结束后调用）
const reRenderAllImages = () => {
  renderCurrentImages();
  renderPreviousImages();
};

// 只触发右下角小图动画演示（首次进入时从底部滑上来）
const triggerSmallImagesAnimation = () => {
  if (!smallImagesRenderingEnabled.value) return;
  // 若容器为空（如滑回去后被清空），先渲染第一组再执行首次动画
  const hasLastImgs = document.querySelector('.last-imgs');
  if (!hasLastImgs) {
    renderPreviousImages(0);
  }
  // 首次进入时，直接执行滑上来的动画，传入 isFirstTime = true
  lastImgAnimations(true);
};

const handleClick = (side: 'left' | 'right') => {
  if (!smallImagesRenderingEnabled.value) return;
  // 如果正在转场中，忽略点击
  if (isTransitioning.value) return;
  
  // 立即触发文字消失动画
  isTextAnimating.value = true;
  
  // 计算下一张图片的索引
  if (side === 'left') {
    nextImageIndex.value = (currentImageIndex.value - 1 + clickImageList.value.length) % clickImageList.value.length;
  } else if (side === 'right') {
    nextImageIndex.value = (currentImageIndex.value + 1) % clickImageList.value.length;
  }
  
  // 设置转场方向
  transitionDirection.value = side;
  
  // 开始转场动画
  startTransition(side);
  
  // 执行小图动画
  currentImgAnimations().then(() => {
    // 先渲染下一组图片（nextImageIndex对应的图片组）
    renderPreviousImages(nextImageIndex.value);
    // 然后执行滑上来的动画
    lastImgAnimations();
  });
};

const lastImgAnimations = (isFirstTime = false) => {
  if (!smallImagesRenderingEnabled.value) return;
  const items = gsap.utils.toArray(".last-imgs");
  
  if (items.length === 0) {
    return;
  }
  
  const tl = gsap.timeline({
    onComplete: () => {
      // 动画完成后重新渲染所有图片，让GSAP可以更新新的元素
      if (!isFirstTime && smallImagesRenderingEnabled.value) {
        reRenderAllImages();
      } else {
        // 首次动画结束后恢复到正常映射（prevIndex 与 currentIndex），避免首次点击时卡顿
        nextTick(() => {
          if (smallImagesRenderingEnabled.value) reRenderAllImages();
        });
      }
    }
  });

  lastSmallImagesTimeline = tl;
  
  // 从底部上来 - 依次执行
  items.forEach((item: any, index: number) => {
    tl.to(item, {
      bottom: "40px",
      duration: 0.4, // 🎯 动画时长（底部上升）
      ease: "power2.out",
    }, index * 0.1); // 🎯 间隔时间（底部上升的stagger）
  });
  
  // 等待一下
  tl.addLabel("expand", "+=0.1"); // 🎯 上升和展开之间的等待时间（缩短等待）
  
  // 横向展开 - 从右到左依次执行（反向）
  items.forEach((item: any, index: number) => {
    const reverseIndex = items.length - 1 - index; // 反转顺序
    tl.to(item, {
      x: `${(index)*40}px`,
      duration: 0.6, // 🎯 动画时长（横向展开，加长时间更丝滑）
      ease: "power1.inOut", // 🎯 使用更平滑的缓动函数
    }, `expand+=${reverseIndex * 0.1}`); // 🎯 间隔时间（横向展开的stagger，反向，缩短间隔）
  });
};

// 隐藏右下角小图（用于滚动回到上方时复位）
const hideSmallImages = () => {
  // 先停止所有相关的GSAP动画，避免动画继续更新已删除的DOM元素
  const lastImgs = gsap.utils.toArray(".last-imgs");
  const currentImgs = gsap.utils.toArray(".current-imgs");
  
  // 关闭渲染开关
  smallImagesRenderingEnabled.value = false;

  // 停止并清理时间线
  if (lastSmallImagesTimeline) {
    lastSmallImagesTimeline.kill();
    lastSmallImagesTimeline = null;
  }

  // Kill掉所有小图相关的动画
  lastImgs.forEach((item: any) => {
    gsap.killTweensOf(item);
  });
  currentImgs.forEach((item: any) => {
    gsap.killTweensOf(item);
  });
  
  // 清空容器
  if (previousImagesContainer.value) {
    previousImagesContainer.value.innerHTML = '';
  }
  if (currentImagesContainer.value) {
    currentImagesContainer.value.innerHTML = '';
  }
};

const currentImgAnimations = () => {
  return new Promise((resolve) => {
    const items = gsap.utils.toArray(".current-imgs");
    if (items.length === 0) {
      resolve(true);
      return;
    }
    
    items.forEach((item: any, index: number) => {
      gsap.to(item, {
        x: "600px",
        duration: 0.1, // 🎯 动画时长（右侧移出）
        ease: "power2.out",
        delay: index * 0.08, // 🎯 间隔时间（右侧移出的stagger）
        onComplete: () => {
          // 最后一个动画完成时resolve
          if (index === items.length - 1) {
            resolve(true);
          }
        }
      });
    });
  });
}

// 图片悬停展开处理函数
const handleImageHover = (index: number) => {
  hoveredImageIndex.value = index;
};

const handleImageLeave = () => {
  // 回到默认状态：最右边的图片展开
  hoveredImageIndex.value = imagesListGroup.value[0]?.images?.length - 1;
};

// ===== 显示线条和文字 =====
const showLineAndText = (timeline: gsap.core.Timeline, scaleDuration: number) => {
  // 等待图片缩放完成后再显示线条和文字
  timeline.to([".section-2-line-top", ".section-2-line-bottom", ".section-2-text"], {
    opacity: 1,
    width: "100vw",
  }, scaleDuration); // 在缩放完成后开始

};

// ===== 滚动图片动画 =====
const initScrollingImagesAnimations = (
  timeline: gsap.core.Timeline,
  bracketPath: any[],
  scaleDuration: number
) => {
  // 如果没有图片数据，直接返回
  if (!scrollImage.value || scrollImage.value.length === 0) {
    console.warn('scrollImage 数据为空，跳过图片滚动动画');
    return;
  }
  
  if (isMobile.value) {
    // ===== 移动端：图片沿曲线路径从左到右滚动 =====
    const mobileCurvePath:any = generateMobileCurvePath(); // 生成移动端曲线路径
    const totalImages = scrollImage.value.length;
    const centerX = window.innerWidth / 2;
    
    // 为每个图片设置独立的曲线路径动画
    for (let i = 1; i <= totalImages; i++) {
      const imgIndex = i - 1;
      const imageSrc = imgBaseURL(scrollImage.value[imgIndex]?.img);
      const delay = scaleDuration + imgIndex * 0.6; // 每个图片延迟0.6秒
      
      // 图片初始隐藏
      timeline.set(`.scroll-img-mobile-${i}`, {
        opacity: 0,
      }, 0);
      
      // 设置初始位置（路径起点）
      timeline.set(`.scroll-img-mobile-${i}`, {
        x: mobileCurvePath[0].x,
        y: mobileCurvePath[0].y,
      }, delay);
      
      // 显示图片
      timeline.to(`.scroll-img-mobile-${i}`, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out",
      }, delay);
      
      // 沿曲线路径运动
      timeline.to(`.scroll-img-mobile-${i}`, {
        duration: 3,
        ease: "none",
        motionPath: {
          path: mobileCurvePath,
          curviness: 1.5, // 曲线平滑度
        },
      }, delay + 0.1);
      
      // 计算图片到达中心的时间点（大约在路径的50%位置）
      const timeToCenter = delay + 0.1 + 1.5; // 在3秒动画的中点
      
      // 当图片到达中心时，替换中央图片
      timeline.call(
        () => {
          const expandImage = document.querySelector(
            ".expand-image"
          ) as HTMLImageElement;
          if (expandImage) {
            expandImage.src = imageSrc;
          }
        },
        [],
        timeToCenter
      );
      
      // 淡出动画
      timeline.to(`.scroll-img-mobile-${i}`, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      }, delay + 2.9);
      if(i === 6){
        gsap.set(".cover-mask", {
          transformOrigin: "50% 50%",
          x: "-14vw",
          y: "120vh",
          rotation: 10,
        });
        
        // 设置 list-card-item-wrap 初始位置并执行动画
        const container = document.querySelector(".list-card-wrap") as HTMLElement;
        const item = document.querySelector(".list-card-item-wrap") as HTMLElement;
        
        // 设置初始位置在右边（100vw）
        gsap.set(".list-card-item-wrap", {
          x: "100vw",
        });
        
        // 计算目标位置
        const x = container.offsetWidth - item.scrollWidth;
        timeline.to(".list-card-item-wrap", {
          x: x,
          duration: 5,
          ease: "sine.inOut",
        });
        
        // cover-mask 动画与 list-card-item-wrap 同时开始
        timeline.to(".cover-mask", {
          x: 0,
          y: 0,
          duration: 2,
          rotation: 0,
          ease: "sine.inOut",
        }, "<"); // "<" 表示与前一个动画同时开始
      }
    }
  } else {
    // ===== PC端：原有的路径运动动画 =====
    for (let i = 1; i <= 10; i++) {
      const delay = scaleDuration + (i - 0) * 0.6; // 在图片缩放完成后开始
      const imageSrc = imgBaseURL(scrollImage.value[i-1]?.img);

      // 设置初始位置
      timeline.set(
        `.scroll-img-${i}`,
        {
          opacity: 0,
          y: 0,
        },
        delay
      );

      // 显示动画
      timeline.to(
        `.scroll-img-${i}`,
        {
          opacity: 1,
          duration: 0.1,
          ease: "power2.out",
        },
        delay
      );

      // 路径运动动画
      timeline.to(
        `.scroll-img-${i}`,
        {
          duration: 3,
          ease: "none",
          motionPath: {
            path: bracketPath,
            curviness: 2,
          },
        },
        delay + 0.1
      );

      // 中央图片替换
      timeline.call(
        () => {
          const expandImage = document.querySelector(
            ".expand-image"
          ) as HTMLImageElement;
          if (expandImage) {
            expandImage.src = imageSrc;
          }
        },
        [],
        delay + 1.5
      );

      // 淡出动画
      timeline.to(
        `.scroll-img-${i}`,
        {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        },
        delay + 2.9
      );

      if(i === 6){
        gsap.set(".cover-mask", {
          transformOrigin: "50% 50%",
          x: "-14vw",
          y: "120vh",
          rotation: 10,
        });
        
        // 设置 list-card-item-wrap 初始位置并执行动画
        const container = document.querySelector(".list-card-wrap") as HTMLElement;
        const item = document.querySelector(".list-card-item-wrap") as HTMLElement;
        
        // 设置初始位置在右边（100vw）
        gsap.set(".list-card-item-wrap", {
          x: "100vw",
        });
        
        // 计算目标位置
        const x = container.offsetWidth - item.scrollWidth;
        timeline.to(".list-card-item-wrap", {
          x: x,
          duration: 5,
          ease: "sine.inOut",
        });
        
        // cover-mask 动画与 list-card-item-wrap 同时开始
        timeline.to(".cover-mask", {
          x: 0,
          y: 0,
          duration: 2,
          rotation: 0,
          ease: "sine.inOut",
        }, "<"); // "<" 表示与前一个动画同时开始
      }
    }
  }
};

// ===== 滚动文字动画 =====
const initScrollingTextAnimations = (timeline: gsap.core.Timeline, scaleDuration: number) => {
  // 如果没有数据，直接返回
  if (!scrollWords.value || scrollWords.value.length === 0) {
    console.warn('scrollWords 数据为空，跳过文字滚动动画');
    return;
  }
  
  if (isMobile.value) {
    // ===== 移动端：整个容器从右到左滚动，文字依次经过中心高亮 =====
    const itemWidth = 200; // 每个文字宽度
    const gap = 16; // 文字间隔
    const itemTotalWidth = itemWidth + gap; // 每个item的总宽度(包含间隔)
    const totalWords = scrollWords.value.length;
    const containerWidth = totalWords * itemTotalWidth - gap; // 容器总宽度
    
    // 计算滚动距离：从右侧完全进入到左侧完全离开
    const startX = window.innerWidth; // 从屏幕右侧开始
    const endX = -containerWidth - 100; // 滚动到左侧屏幕外
    const totalDistance = startX - endX;
    
    // 屏幕中心位置
    const centerX = window.innerWidth / 2;
    
    // 在动画开始前，先隐藏整个容器
    timeline.set('.scroll-text-mobile-container', {
      opacity: 0,
      x: startX,
    }, 0);
    
    // 在动画开始时，显示容器
    timeline.set('.scroll-text-mobile-container', {
      opacity: 1,
    }, scaleDuration);
    
    // 容器从右到左滚动
    timeline.to('.scroll-text-mobile-container', {
      x: endX,
      duration: totalWords * 0.8, // 根据文字数量调整总时长
      ease: "none",
    }, scaleDuration);
    
    // 为每个文字设置透明度动画
    for (let i = 1; i <= totalWords; i++) {
      const itemIndex = i - 1;
      // 计算该文字在容器中的位置（左边缘）
      const itemPositionInContainer = itemIndex * itemTotalWidth;
      // 计算该文字中心在容器中的位置
      const itemCenterInContainer = itemPositionInContainer + itemWidth / 2;
      
      // 计算该文字中心到达屏幕中心的时间点
      // 文字在屏幕上的位置 = 容器位置 + 文字在容器中的位置
      // 当 startX + itemCenterInContainer - 移动距离 = centerX 时，文字在中心
      // 移动距离 = startX + itemCenterInContainer - centerX
      const distanceToCenter = startX + itemCenterInContainer - centerX;
      const progressToCenter = distanceToCenter / totalDistance;
      const timeToCenter = scaleDuration + progressToCenter * totalWords * 0.8;
      
      // 在动画开始前，先隐藏所有文字
      timeline.set(`.scroll-text-mobile-${i}`, {
        opacity: 0,
      }, 0);
      
      // 文字进入中心前：透明度0.3
      timeline.set(`.scroll-text-mobile-${i}`, {
        opacity: 0.3,
      }, scaleDuration);
      
      // 文字到达中心：透明度变为1
      timeline.to(`.scroll-text-mobile-${i}`, {
        opacity: 1,
        duration: 0.2,
        ease: "none",
      }, timeToCenter - 0.2);
      
      // 文字离开中心：透明度变回0.3
      timeline.to(`.scroll-text-mobile-${i}`, {
        opacity: 0.3,
        duration: 0.2,
        ease: "none",
      }, timeToCenter + 0.3);
    }
  } else {
    // ===== PC端：从下到上垂直滚动 =====
    for (let i = 1; i <= scrollWords.value.length; i++) {
      const delay = scaleDuration + (i - 1) * 0.4;
      
      // 设置初始位置 - 第一个文字初始透明度为1，其他为0.3
      timeline.set(
        `.scroll-text-${i}`,
        {
          opacity: i === 1 ? 1 : 0.3,
          y: '64px', // 从底部开始
        },
        delay
      );

      // 从下到上滚动动画
      timeline.to(
        `.scroll-text-${i}`,
        {
          y: -window.innerHeight - 300, // 向上滚动到屏幕外
          duration: 3,
          ease: "none",
        },
        delay
      );

      // 进入中间区域时瞬间变为完全不透明
      timeline.set(
        `.scroll-text-${i}`,
        {
          opacity: 1,
        },
        delay + 1.3 // 提前进入中间区域
      );

      // 离开中间区域后瞬间变回半透明
      timeline.set(
        `.scroll-text-${i}`,
        {
          opacity: 0.3,
        },
        delay + 1.7 // 延后离开中间区域，延长高亮持续时间
      );
    }
  }
};

const section4Timeline = () => {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".section-4",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      toggleActions: "play none none reverse",
      pin: ".section-4-wrap",
      onEnter: () => {
        smallImagesRenderingEnabled.value = true;
      },
      onLeaveBack: () => {
        // 滑回去：隐藏右下角小图，待下次进入再触发显示动画
        smallImagesRenderingEnabled.value = false;
        hideSmallImages();
      },
    },
  });

  gsap.to([".section-4-line-top", ".section-4-line-bottom", ".section-4-text"], {
    duration: 2,
    width: "80vw",
    opacity: 1,
    scrollTrigger: {
      trigger: ".section-4",
      start: "top 20%", // 当 section-4 的顶部到达视口 80% 位置时触发
      toggleActions: "play none none reverse", // 进入时播放，退出时反向
    },
  });

  gsap.to([".redbook", ".redbook-desc"], {
    opacity: 1,
    duration: 0.5,
    ease: "none",
    y: -60,
    scrollTrigger: {
      trigger: ".section-4",
      start: "top 20%", // 当 section-4 的顶部到达视口 80% 位置时触发
      toggleActions: "play none none reverse", // 进入时播放，退出时反向
    },
  });

  timeline.call(() => {
    // 仅在正向播放时触发首次小图动画，反向回退不重复触发
    if (timeline.time() >= 0 && !timeline.reversed() && smallImagesRenderingEnabled.value) {
      triggerSmallImagesAnimation();
    }
  }, [], "+=0.2"); // 在 redbook 动画完成后延迟 0.5 秒执行

  timeline.to(".section-5", {
    y: 0,
    x:0,
    rotate:0,
    duration: 2,
    delay: 1,
    ease: "power2.inOut",
  });
  // 星星自动旋转动画
  // gsap.to(".star", {
  //   rotate: 360,
  //   scrollTrigger: {
  //     trigger: ".section-5",
  //     start: "top top",
  //     toggleActions: "restart none none reverse",
  //   },
  //   delay:0.5,
  //   duration: 0.5,
  //   ease: "none",
  // });
  gsap.to(".line-w", {
    width: "100vw",
    scrollTrigger: {
      trigger: ".section-5",
      start: "top 50%",
      toggleActions: "restart none none reverse",
    },
    duration: 1,
    delay: 0.5,
    ease: "none",
  });

  gsap.to(".line-h", {
    height: "100vh",
    scrollTrigger: {
      trigger: ".section-5",
      start: "top 50%",
      toggleActions: "restart none none reverse",
    },
    duration: 1,
    delay:0.5,
    ease: "none",
  });

  gsap.to(".section-4-wrap", {
    scrollTrigger:{
      trigger: ".section-6",
      start: "top 5%",
      end: "bottom bottom",
      scrub: 1,
      toggleActions: "restart none none reverse",
    },
    rotate:-5,
    x:isMobile.value?'-12vw':'-6vw',
    ease: "power2.inOut",
  });
  
};

// ===== 主渲染函数 =====
const renderIndex = () => {
  ctx.value = gsap.context(() => {
    // 初始化各个模块
    initBackgroundAnimations();
    initSection1Animations();
    initSection2TextAnimations();

    // Section-2主要动画
    const section2Timeline = initSection2MainAnimations();

    // 生成路径
    const bracketPath = generateBracketPath();

    // 中央图片管理
    initCentralImageManagement(section2Timeline);

    showLineAndText(section2Timeline, SCALE_DURATION);

    // 滚动图片动画
    initScrollingImagesAnimations(section2Timeline, bracketPath, SCALE_DURATION);
    
    // 滚动文字动画
    initScrollingTextAnimations(section2Timeline, SCALE_DURATION);

    section4Timeline()
  
  });
};

onMounted(async() => {
  // 请求数据
  const homeFixedData: any = await getDictList({ typeName: 'home-fixed' });
  const aboutListData: any = await getDictList({ typeName: 'about-list' });
  const scrollImageData: any = await getDictList({ typeName: 'scroll-image' });
  const scrollWordsData: any = await getDictList({ typeName: 'scroll-words' });
  const customerListData: any = await getDictList({ typeName: 'customer-list' });
  const groupImageData: any = await getImageGroup();
  const clickImageListData: any = await getDictList({ typeName: 'click-image-list' });
  
  // 初始化数据
  homeFixed.value = homeFixedData?.data ?? [];
  aboutList.value = aboutListData?.data ?? [];
  scrollImage.value = scrollImageData?.data ?? [];
  scrollWords.value = scrollWordsData?.data ?? [];
  customerList.value = customerListData?.data ?? [];
  clickImageList.value = clickImageListData?.data ?? [];
  
  // 处理 groupImage 数据转换
  groupImage.value = groupImageData?.data ?? [];
  const transformedData = (groupImageData?.data ?? []).map((item: any) => {
    const imageUrls = item.imgUrl 
      ? (item.imgUrl.includes(';') ? item.imgUrl.split(';') : [item.imgUrl])
      : [];
    
    const images = imageUrls.map((url: string, index: number) => ({
      src: url,
      index: index + 1
    }));
    
    return {
      images
    };
  });
  
  imagesListGroup.value = transformedData;
  hoveredImageIndex.value = imagesListGroup.value[0]?.images?.length - 1;
  
  // 数据加载完成后，立即启动加载进度动画
  const duration = 4000; // 4秒
  const startTime = Date.now();
  
  const animate = () => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1); // 0 到 1
    loadingText.value = Math.floor(progress * 100); // 转换为 0-100
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      // 进度到达100%后，开始淡出
      loadingText.value = 100;
      isVideoFadingOut.value = true;
      // 等待淡出动画完成后再完全隐藏
      setTimeout(() => {
        showLoadingVideo.value = false;
        
        // 首屏加载完成后，播放背景视频
        nextTick(() => {
          const bgVideo = bgVideoRef.value;
          if (bgVideo) {
            const playPromise = bgVideo.play();
            
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.log('背景视频自动播放失败,尝试静音播放:', error);
                bgVideo.muted = true;
                bgVideo.play().catch(err => {
                  console.log('背景视频播放失败:', err);
                });
              });
            }
          }
        });
      }, 500); // 与 CSS transition 时间一致
    }
  };
  
  // 立即开始动画,不等待视频
  requestAnimationFrame(animate);
  
  // 视频准备好后尝试播放
  if (homeFixed.value && homeFixed.value.length > 0 && homeFixed.value[0]?.video) {
    nextTick(() => {
      const video = loadingVideoRef.value;
      if (video) {
        // 移动端需要手动触发播放
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log('视频自动播放失败,尝试静音播放:', error);
            // 如果自动播放失败,确保视频是静音的并重试
            video.muted = true;
            video.play().catch(err => {
              console.log('视频播放失败:', err);
            });
          });
        }
      }
    });
  }
  
  initLenis(); // 初始化 Lenis 平滑滚动
  
  // 等待 DOM 渲染完成后再初始化 GSAP 动画
  await nextTick();
  renderIndex();
  
  // 延迟设置hover效果，确保DOM已经完全渲染
  nextTick(() => {
    setupHoverEffects();
    initCanvas(); // 初始化Canvas
    // 初始化时只渲染 previousImages（.last-imgs），它们会从底部滑上来
    // 不渲染 currentImages，因为首次进入时还没有当前图片
    renderPreviousImages(0);
  });
});

// ===== Canvas 图片渲染相关 =====

// 初始化Canvas尺寸
const initCanvasSize = () => {
  canvasWidth.value = window.innerWidth;
  canvasHeight.value = window.innerHeight;
  
  // 初始化scale数组
  imageScales.value = clickImageList.value.map((_:any, index:number) => 
    index === currentImageIndex.value ? 1 : 1.2
  );
  targetScales.value = [...imageScales.value];
};

// 加载所有图片
const loadAllImages = () => {
  return Promise.all(
    clickImageList.value.map((item:any) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = imgBaseURL(item?.img);
      });
    })
  );
};

// 绘制Canvas
const drawCanvas = () => {
  if (!imageCanvas.value) return;
  
  const canvas = imageCanvas.value;
  const context = canvas.getContext('2d');
  if (!context) return;
  
  // 清空画布
  context.clearRect(0, 0, canvasWidth.value, canvasHeight.value);
  
  // 计算裁剪区域的起点
  // PC端：left-[147px], top-[calc(50vh±10px)]
  // 移动端：left-[49%] + ml-[10px], top-[200px]
  const clipOriginX = isMobile.value 
    ? (canvasWidth.value * 0.49) + 5  // 49% + 10px
    : 138;  // 147px（注意：这里是138，可能是为了对齐调整）
  const clipOriginY = isMobile.value 
    ? 200  // 移动端固定200px
    : canvasHeight.value / 2;  // PC端 50vh
  const radius = Math.max(canvasWidth.value, canvasHeight.value) * 2;
  
  if (isTransitioning.value) {
    // 转场中：底层绘制新图片，顶层绘制当前图片的未被擦除部分
    const currentImg = loadedImages.value[currentImageIndex.value];
    const nextImg = loadedImages.value[nextImageIndex.value];
    
    if (currentImg && nextImg) {
      // 1. 先绘制完整的新图片作为底层
      drawImage(context, nextImg, nextImageIndex.value);
      
      // 2. 在上面绘制当前图片的未被擦除部分
      context.save();
      
      // 创建裁剪路径 - 包含两个独立的扇形区域
      context.beginPath();
      
      // 两个方向都是顺时针旋转
      // 内角区域：保留从当前内角擦除线到内角终点的部分（还没被擦除）
      context.moveTo(clipOriginX, clipOriginY);
      context.arc(clipOriginX, clipOriginY, radius, transitionAngleInner.value, INNER_ANGLE_END.value, false);
      context.lineTo(clipOriginX, clipOriginY);
      
      // 外角区域：保留从当前外角擦除线到下一个内角起点的部分（还没被擦除）
      context.moveTo(clipOriginX, clipOriginY);
      context.arc(clipOriginX, clipOriginY, radius, transitionAngleOuter.value, INNER_ANGLE_START.value + Math.PI * 2, false);
      context.lineTo(clipOriginX, clipOriginY);
      
      context.closePath();
      context.clip();
      
      // 绘制当前图片（只在裁剪区域内显示）
      drawImage(context, currentImg, currentImageIndex.value);
      context.restore();
    }
  } else {
    // 非转场：正常绘制当前图片
    const img = loadedImages.value[currentImageIndex.value];
    if (img) {
      drawImage(context, img, currentImageIndex.value);
    }
  }
};

// 绘制单张图片的辅助函数
const drawImage = (context: CanvasRenderingContext2D, img: HTMLImageElement, index: number) => {
  const scale = imageScales.value[index] ?? 1;
  
  context.save();
  
  // 移动到中心点
  context.translate(canvasWidth.value / 2, canvasHeight.value / 2);
  
  // 应用缩放
  context.scale(scale, scale);
  
  // 计算图片绘制位置和尺寸（object-cover效果）
  const canvasRatio = canvasWidth.value / canvasHeight.value;
  const imgRatio = img.width / img.height;
  
  let drawWidth, drawHeight, offsetX, offsetY;
  
  if (canvasRatio > imgRatio) {
    // canvas更宽，以宽度为准
    drawWidth = canvasWidth.value;
    drawHeight = canvasWidth.value / imgRatio;
  } else {
    // canvas更高，以高度为准
    drawHeight = canvasHeight.value;
    drawWidth = canvasHeight.value * imgRatio;
  }
  
  offsetX = -drawWidth / 2;
  offsetY = -drawHeight / 2;
  
  // 绘制图片
  context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  
  context.restore();
};

// 动画循环 - 平滑过渡scale
const animateCanvas = () => {
  let needsUpdate = false;
  
  // 使用缓动让scale平滑过渡
  // lerp值越小，过渡越慢越平滑（范围：0.01 - 0.2）
  const lerp = 0.03; // 原值0.1，改为0.05会慢一倍
  
  imageScales.value.forEach((scale, index) => {
    const target = targetScales.value[index];
    if (target === undefined || scale === undefined) return;
    
    const diff = Math.abs(scale - target);
    
    if (diff > 0.001) {
      const currentScale = imageScales.value[index];
      if (currentScale !== undefined) {
        imageScales.value[index] = currentScale + (target - currentScale) * lerp;
      }
      needsUpdate = true;
    } else {
      imageScales.value[index] = target;
    }
  });
  
  // 如果正在转场或需要更新scale，都重绘canvas
  if (needsUpdate || isTransitioning.value) {
    drawCanvas();
  }
  
  canvasAnimationId.value = requestAnimationFrame(animateCanvas);
};

// 更新目标scale值
const updateTargetScales = () => {
  targetScales.value = clickImageList.value.map((_:any, index:number) => 
    index === currentImageIndex.value ? 1 : 1.2
  );
};

// 开始转场动画
const startTransition = (side: 'left' | 'right') => {
  isTransitioning.value = true;
  
  // 设置下一张图片的目标缩放为1（放大到正常大小）
  targetScales.value[nextImageIndex.value] = 1;
  
  const duration = 1.0; // 动画时长
  
  if (side === 'right') {
    // 向右切换（顺时针）
    // 内角擦除线：从内角起点（沿上引导线）顺时针转到内角终点（沿下引导线）
    transitionAngleInner.value = INNER_ANGLE_START.value;
    // 外角擦除线：从内角终点（沿下引导线）顺时针转过外角区域到下一个内角起点
    transitionAngleOuter.value = INNER_ANGLE_END.value;
    
    // 同时执行两个旋转动画
    gsap.to(transitionAngleInner, {
      value: INNER_ANGLE_END.value,
      duration: duration,
      ease: "power1.inOut"
    });
    
    gsap.to(transitionAngleOuter, {
      value: INNER_ANGLE_START.value + Math.PI * 2, // 转过整个外角区域
      duration: duration,
      ease: "power1.inOut",
      onComplete: () => {
        // 转场完成
        isTransitioning.value = false;
        currentImageIndex.value = nextImageIndex.value;
        // 重置文字动画状态，触发文字出现
        isTextAnimating.value = false;
        
        // 更新所有图片的目标缩放
        updateTargetScales();
      }
    });
  } else {
    // 向左切换（顺时针）
    // 内角擦除线：从内角起点（沿上引导线）顺时针转到内角终点（沿下引导线）
    transitionAngleInner.value = INNER_ANGLE_START.value;
    // 外角擦除线：从内角终点（沿下引导线）顺时针转过外角区域到下一个内角起点
    transitionAngleOuter.value = INNER_ANGLE_END.value;
    
    // 同时执行两个旋转动画
    gsap.to(transitionAngleInner, {
      value: INNER_ANGLE_END.value,
      duration: duration,
      ease: "power1.inOut"
    });
    
    gsap.to(transitionAngleOuter, {
      value: INNER_ANGLE_START.value + Math.PI * 2, // 转过整个外角区域
      duration: duration,
      ease: "power1.inOut",
      onComplete: () => {
        // 转场完成
        isTransitioning.value = false;
        currentImageIndex.value = nextImageIndex.value;
        // 重置文字动画状态，触发文字出现
        isTextAnimating.value = false;
        
        // 更新所有图片的目标缩放
        updateTargetScales();
      }
    });
  }
};

// 初始化Canvas
const initCanvas = async () => {
  initCanvasSize();
  
  // 加载所有图片
  loadedImages.value = await loadAllImages();
  
  // 开始绘制
  drawCanvas();
  
  // 开始动画循环
  animateCanvas();
  
  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    initCanvasSize();
    // 使用 nextTick 确保 canvas 的 width 和 height 属性已经更新
    nextTick(() => {
      drawCanvas();
    });
  });
};

// 监听currentImageIndex变化
watch(currentImageIndex, () => {
  updateTargetScales();
});

// 监听hoveredImageIndex变化，更新图片宽度
watch(hoveredImageIndex, (newIndex) => {
  if (!currentImagesContainer.value) return;
  
  const images = currentImagesContainer.value.querySelectorAll('.current-imgs');
  images.forEach((img: any, index: number) => {
    img.style.width = index === newIndex ? '306px' : '40px';
  });
});

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

onUnmounted(() => {
  // 清理 Lenis
  if (lenis.value) {
    lenis.value.destroy();
  }
  // 清理 GSAP context
  if (ctx.value) {
    ctx.value.revert();
  }
  // 清理Canvas动画循环
  if (canvasAnimationId.value) {
    cancelAnimationFrame(canvasAnimationId.value);
  }
  // 清理移动端检测监听器
  if (import.meta.client) {
    window.removeEventListener('resize', detectMobile);
  }
});


</script>

<style scoped>
.loading-text {
  color: #FFF;
  font-size: 160px;
  font-style: normal;
  font-weight: 500;
  line-height: 160px; /* 100% */
  letter-spacing: -6px;
  text-transform: capitalize;
  @media (max-width: 768px) {
    font-size: 100px;
    line-height: 100px;
    bottom: 0px;
    right: 40px;
  }
}

.loading-text-remark {
  color: #FFF;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  position: absolute;
  right: 40px;
  top: 40px;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 24px;
    right: 15px;
    top: 15px;
  }
}

.scroll-text-follow {
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  letter-spacing: 1px;
  font-weight: 300;
  opacity: 0.9;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  transform-origin: center center;
  transition: opacity 0.3s ease;
}

/* 列表容器样式 */
.list-card-wrap {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

/* 隐藏滚动条 */
.list-card-wrap::-webkit-scrollbar {
  display: none;
}

/* 内容容器性能优化 */
.list-card-item-wrap {
  transform: translateZ(0); /* 启用GPU加速 */
  backface-visibility: hidden; /* 防止闪烁 */
  -webkit-backface-visibility: hidden;
  perspective: 1000px;
  -webkit-perspective: 1000px;
}

/* 单个卡片项优化 */
.list-card-item {
  transform: translateZ(0);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

/* remark内容样式优化 */
.remark-content {
  transform: translateZ(0); /* 启用GPU加速 */
  backface-visibility: hidden; /* 防止闪烁 */
  will-change: height, opacity; /* 提示浏览器这些属性会改变 */
}

/* describe-item 悬浮边框渐变效果 */
.describe-item {
  position: relative;
  /* transition: all 0.3s ease; */
  transform: translateX(500px);
  opacity: 0;
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

.describe-item:hover::after {
  transform: scaleX(1);
  transform-origin: right;
}

/* 当悬浮离开时，从右边收回 - 使用不同的缓动函数 */
.describe-item:not(:hover)::after {
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19);
}

.expand-image {
  scale: 0;
  position: fixed !important;
  width: 100vw;
  height: 100vh;
}

.text-test {
  opacity: 1;
}

.scroll-img {
  opacity: 0;
  top: -90px;
  right: 200px;
  position: absolute;
  z-index: 1;
}

.scroll-text {
  opacity: 0.3;
  bottom: -200px;
  left: 352px;
  /* transform: translateX(-50%); */
  position: absolute;
  z-index: 2;
  white-space: nowrap;
  pointer-events: none;
}

.section-2-line-top {
  width: 0;
}


.section-2-line-bottom {
  width: 0;
}


.section-2-text {
  opacity: 0;
}

.section-4-right{
  cursor: grab;
}

.section-4-left{
  cursor: grab;
}

.section-4-right:active{
  cursor: grabbing;
}

.section-4-left:active{
  cursor: grabbing;
}

/* 跟随图标样式 */
.follow-icon {
  transform: translate(-50%, -50%);
  will-change: transform;
  z-index: 12;
}

.follow-icon img {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  transition: transform 0.2s ease;
}

.section-4-line-top {
  width: 0;
}

.section-4-line-bottom {
  width: 0;
}

.redbook {
  opacity: 0;
  transform: translateY(20px);
}

.redbook-desc {
  opacity: 0;
  transform: translateY(20px);
}

.section-4-text {
  opacity: 0;
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
    /* width: 80vw; */
    font-size: 8.33vw;
    margin-left: 1.5vw;
  }
  .lets-talk-img {
    height: 14.5vw;
  }
}

@media (max-width: 768px) {
  .lets-talk-title {
    font-size: 64px;
    white-space: nowrap;
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

/* .section-5{
  transform: translateX(-12vw);
} */

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

.last-imgs {
  bottom: -172px;
}

/* Redbook 文字切换动画 */
/* 文字消失动画 - 快速 */
.redbook-fade-out {
  animation: redbookFadeOut 0.3s cubic-bezier(0.4, 0, 0.6, 1) forwards;
}

.redbook-fade-out-delay {
  animation-delay: 0.05s;
}

.redbook-fade-out-delay-long {
  animation-delay: 0.1s;
}

@keyframes redbookFadeOut {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
}

/* 文字出现动画 - 较慢 */
.redbook-fade-in-up {
  opacity: 0;
  transform: translateY(40px);
  animation: redbookFadeInUp 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}

.redbook-fade-in-up-delay {
  animation-delay: 0.15s;
}

.redbook-fade-in-up-delay-long {
  animation-delay: 0.25s;
}

@keyframes redbookFadeInUp {
  0% {
    opacity: 0;
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>


