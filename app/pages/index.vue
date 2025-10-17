<template>
  <div class="overflow-hidden">
    <div>
      <!-- section-0 -->
      <section class="section-0 relative w-[100vw] h-[100vh]">
        <div 
          class="section-0-warp w-full h-[100vh] bg-[#3B4EFF]/50 blue-mask"
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
        </div>
        <div class="px-[40px] absolute bottom-0 left-0 right-0 logo-container">
          <img src="/static/oneNew.svg" alt="" class="w-[100%]" />
        </div>
        <img
          src="/images/index/bg.jpg"
          alt=""
          class="w-full h-[100vh] object-cover bg-image fixed top-0 left-0 z-[-1]"
        />
      </section>

      <!-- section-1 关于我们 -->
      <section
        class="section-1 w-[100vw] min-h-[100vh] bg-[#F8F8F8] p-[40px] overflow-hidden rotate-[0deg] mt-[30vh]"
      >
        <div class="text-[16px] text-[#000]">
          <span class="mr-[4px]"> /</span>
          <span style="font-family: 'Noto'">关于我们</span>
        </div>
        <div
          class="text-[#0B0B0B] font-['Inter'] text-[160px] font-normal capitalize leading-[160px] mb-[40px]"
        >
          creativity
        </div>
        <div
          class="text-[16px] pl-[20px] border-l-[2px] border-[#000] flex items-center h-[48px] mb-[36px]"
        >
          <span class="font-['Inter'] mr-[5px]">ABOUT</span>
          <span class="font-['Noto'] mr-[16px]">关于</span>
          <img src="/static/Frame.svg" alt="" class="w-[20px] h-[20px]" />
        </div>
        <div class="flex flex-col items-end overflow-hidden">
          <div
            v-for="(describe, index) in describes"
            :key="describe.index"
            :ref="(el: any) => setDescribeRef(el, index)"
            class="describe-item flex flex-col border-b-[1px] border-[#DCDCDC] py-[40px] pr-[39px] w-full max-w-[1318px] cursor-pointer relative"
          >
            <!-- index -->
            <span
              class="font-['Inter'] text-[16px] text-[#3B4EFF] absolute top-[40px] left-[-64px] uppercase font-[400]"
              >/ {{ 0 + describe.index }}</span
            >
            <!-- 主要内容行 -->
            <div @click="toggleExpand(describe.index)" class="flex items-center justify-between w-full">
              <div class="flex items-center">
                <span
                  class="font-['Inter'] text-[64px] font-normal leading-[64px] text-[#000] mr-[16px]"
                  >{{ describe.title }}</span
                >
                <span class="font-['Noto'] text-[32px]">{{
                  describe.description
                }}</span>
              </div>
              <img
                src="/static/add.svg"
                alt=""
                :class="[
                  'w-[24px] h-[24px] cursor-pointer transition-transform duration-300 hover:scale-110',
                  { 'rotate-45': expandedItems[describe.index] }
                ]"
                @click.stop.prevent="toggleExpand(describe.index)"
              />
            </div> 
            <!-- 展开的remark内容 -->
            <transition name="expand" @enter="onEnter" @leave="onLeave">
              <div
                v-if="expandedItems[describe.index]"
                class="remark-content w-full overflow-hidde"
              >
                <p class="h-[40px]"></p>
                <p
                  class="font-['Noto'] text-[16px] leading-[32px] text-[#666] whitespace-pre-line max-w-[935px]"
                >
                  {{ describe.remark }}
                </p>
              </div>
            </transition>
          </div>
        </div>
      </section>

      <!-- section-2  -->
      <section
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
                class="font-['Inter'] text-[64px] text-[#000] whitespace-nowrap leading-[64px] mb-[40px]"
              >
                The Work
              </span>
              <span
                class="font-['Noto'] text-[32px] text-[#000] leading-[32px]"
              >
                看作品
              </span>
            </div>

            <!-- 中央图片 - 作为滚动序列的第一个 -->
            <img src="/images/index/img1.png"  class="expand-image " alt="" />

            <!-- 右侧文字 -->
            <div
              class="section2-text-right w-[400px] flex flex-col items-start justify-center z-10"
            >
              <span
                class="font-['Inter'] text-[64px] text-[#000] whitespace-nowrap leading-[64px] mb-[40px]"
              >
                Can Speak
              </span>
              <span class="font-['Noto'] text-[32px] text-[#000] leading-[32px]"
                >见实力</span
              >
            </div>

            <!-- 线条 -->
            <div class="section-2-line-top absolute h-[1px] bg-[#FFF] left-[147px] top-[calc(50vh-10px)] rotate-[-45deg] origin-left z-[10]"></div>
            <div class="section-2-line-bottom absolute h-[1px] bg-[#FFF] left-[147px] top-[calc(50vh+10px)] rotate-[45deg] origin-left z-[10]"></div>

            <!-- 文字 -->
             <span class="section-2-text absolute text-[#fff] text-[16px] left-[40px]">DISCOVER</span>

            <!-- 多组滚动图片 -->
            <img
              v-for="i in 10"
              :key="i"
              :src="`/images/index/img${((i - 1) % 5) + 1}.png`"
              :class="`h-[90px] absolute scroll-img scroll-img-${i} opacity-0`"
              alt=""
            />
            
            <!-- 文字遮罩区域 -->
            <div class="absolute h-[100vh] w-[100vw] z-[20]"
            style="clip-path: polygon(147px calc(50vh - 10px), calc(147px + 56.57vw) calc(50vh - 56.57vw - 10px), 100vw calc(50vh - 56.57vw - 10px), 100vw calc(50vh + 56.57vw + 10px), calc(147px + 56.57vw) calc(50vh + 56.57vw + 10px), 147px calc(50vh + 10px), 147px 50vh);">
              <span 
                v-for="(item, index) in words" 
                :key="item.title" 
                :class="`scroll-text scroll-text-${index + 1} text-[64px] text-[#FFF] absolute opacity-100`"
              >{{ item.title }}</span>
            </div> 

            <!-- 封面遮罩 -->
             <div class="cover-mask absolute h-[100vh] w-[100vw] z-[30] translate-y-[100vh] rotate-[45deg] flex flex-col">
                <!-- 覆盖卡片 -->
                <section
                  class="section-3 w-[100vw] min-h-[100vh] bg-[#F8F8F8] p-[40px] overflow-hidden rotate-[0deg]"
                >
                  <div class="text-[16px] text-[#000]">
                    <span class="mr-[4px]"> /</span>
                    <span style="font-family: 'Noto'">我们的客户</span>
                  </div>
                  <div
                    class="text-[#0B0B0B] font-['Inter'] text-[160px] font-normal capitalize leading-[160px] mb-[80px]"
                  >
                    Trust
                  </div>
                  <div class="h-[360px] overflow-x-auto list-card-wrap">
                    <div class="flex gap-[40px] list-card-item-wrap"> 
                      <div class="w-[586px] h-[360px] box-border flex-shrink-0 bg-[#fff] list-card-item p-[40px] translate-x-[100vw]" v-for="(item, index) in listCards" :key="item.title">
                      <div >
                        <img src="/static/logo.png" class="h-[24px] w-[172px] mb-[24px]" alt="">
                        <p class="text-[16px] leading-[24px] text-[#666] mb-[80px]">{{ item.description }}</p>

                        <div class="flex justify-between items-center">
                          <div class="flex items-center">
                            <img src="/static/avatar.png" class="h-[60px] w-[60px] mr-[16px]" alt="">
                            <div class="flex flex-col">
                              <span class="text-[16px] text-[#293238] leading-[16px]">{{ item.name }}</span>
                              <span class="text-[16px] text-[#666] leading-[16px]">{{ item.mark }}</span>
                            </div>
                          </div>
                          <div class="text-[#666]">
                            / 0{{ index+1 }}
                          </div>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                  <!-- <div class="bg-[red] flex-1">
                    1111
                  </div> -->
                </section>
             </div>
          </div>
        </div>
      </section>

      <!-- 卡片 -->
      <section class="cover section-4 h-[300vh] w-[100vw] relative">
        <div class="relative h-[100vh] w-[100vw] section-4-wrap            overflow-hidden">
          <!-- Canvas 替代图片 -->
          <canvas 
            ref="imageCanvas" 
            class="w-[100vw] h-[100vh] absolute top-0 left-0"
            :width="canvasWidth"
            :height="canvasHeight"
          ></canvas>

          <!-- 线条 -->
          <div class="section-4-line-top absolute h-[1px] bg-[#FFF] left-[147px] top-[calc(50vh-10px)] rotate-[-45deg] origin-left z-[22]"></div>
          <div class="section-4-line-bottom absolute h-[1px] bg-[#FFF] left-[147px] top-[calc(50vh+10px)] rotate-[45deg] origin-left z-[22]"></div>

          <div class="redbook absolute top-[50%] translate-y-[-50%] left-[352px] z-[10] text-[#fff] text-[16px] flex flex-col">
            <span class="text-[64px] leading-[64px] mb-[24px]">{{imagesList[currentImageIndex]?.mark}}</span>
            <span class="text-[32px] leading-[32px]">{{imagesList[currentImageIndex]?.title}}</span>
          </div>

          <div class="redbook-desc absolute top-[70%] translate-y-[-50%] right-[40px] z-[10] text-[#fff] text-[16px] flex flex-col w-[690px]">
            <span class="text-[16px] leading-[32px]">{{imagesList[currentImageIndex]?.description}}</span>
          </div>

          <!-- 文字 -->
          <span class="section-4-text absolute top-[50%] translate-y-[-50%]  z-[10] text-[#fff] text-[16px] left-[40px]">FOLLOW US</span>

          <div class="absolute z-[11] inset-0 flex">
          <div @click="handleClick('left')" class="flex-1 section-4-left" @mousemove="handleMouseMove" @mouseenter="handleMouseEnter('left')" @mouseleave="handleMouseLeave"></div>
          <div @click="handleClick('right')" class="flex-1 section-4-right" @mousemove="handleMouseMove" @mouseenter="handleMouseEnter('right')" @mouseleave="handleMouseLeave"></div>
          </div>

          <!-- 跟随鼠标的图标 - 显示在抓手下方 -->
          <div 
            ref="followIcon" 
            class="follow-icon absolute z-[12] pointer-events-none opacity-0 transition-opacity duration-300"
            :class="{ 'opacity-100': showFollowIcon }"
          >
            <img 
              :src="currentIcon" 
              alt="follow icon" 
              class="w-[80px] h-[80px]"
            />
          </div>
         
          <!-- 当前图片组容器 -->
          <div
            ref="currentImagesContainer"
            :style="{ width: `${306 + (imagesList.length - 1) * 40}px` }"
            class="flex absolute bottom-[40px] right-[40px]">
          </div>

          <!-- 上一组图片容器 -->
          <div 
            ref="previousImagesContainer"
            :style="{ width: `${306 + (imagesList.length - 1) * 40}px` }"
            class="previous-image-group flex"
          >
          </div>


          <!-- Let's talk -->
          <section class="section-5 h-[100vh] w-[100vw] box-border grid grid-cols-2 absolute translate-y-[100vh] z-[31] bg-[#fff] overflow-hidden" style="grid-template-rows: 1fr 1.4fr;">
              <div class="lets-talk-top-left bg-[#fff] overflow-hidden relative">
                <div class="flex items-center hover-container-left">
                  <img src="/static/right.png" class="right-img hover-img-left" alt=""></img>
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
                  <img src="/static/right.png" class="right-img hover-img-right m" alt=""></img>
                </div>
              </div>
              <div class="lets-talk-bottom-left bg-[#fff] flex items-end">
                <img src="/static/o.png" class="lets-talk-img" alt="">
                <img src="/static/n.png" class="lets-talk-img" alt="">
                <img src="/static/e.png" class="lets-talk-img" alt="">
              </div>
              <div class="lets-talk-bottom-right bg-[#fff] flex justify-start items-end">
                <div class="flex">
                  <img src="/static/n.png" class="lets-talk-img" alt="">
                  <img src="/static/e.png" class="lets-talk-img" alt="">
                  <img src="/static/w.png" class="lets-talk-img" alt="">
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
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin);

const ctx: any = ref(null);
const lenis: any = ref(null);
const describeRefs: any = ref([]);
// 用于跟踪每个item的展开状态
const expandedItems: any = ref({});

// 跟随图标相关状态
const followIcon: any = ref(null);
const showFollowIcon = ref(false);
const currentIcon = ref('/static/cursor-left.png'); // 默认图标
const mousePosition = ref({ x: 0, y: 0 });
const targetPosition = ref({ x: 0, y: 0 });
const animationId = ref(0);

// section-0 跟随文字相关状态
const scrollTextEl = ref<HTMLElement | null>(null);
const showScrollText = ref(false);
const scrollTextPosition = ref({ x: 0, y: 0 });
const scrollTextTarget = ref({ x: 0, y: 0 });
const scrollTextAnimationId = ref(0);

// 图片切换相关状态
const currentImageIndex = ref(0); // 当前显示的图片索引

// Canvas相关状态
const imageCanvas = ref<HTMLCanvasElement | null>(null);
const canvasWidth = ref(0);
const canvasHeight = ref(0);
const loadedImages = ref<HTMLImageElement[]>([]);
const imageScales = ref<number[]>([]);
const targetScales = ref<number[]>([]);
const canvasAnimationId = ref(0);

// 转场动画相关
const transitionAngleInner = ref(0); // 内角擦除线的角度（弧度）
const transitionAngleOuter = ref(0); // 外角擦除线的角度（弧度）
const isTransitioning = ref(false); // 是否正在转场
const transitionDirection = ref<'left' | 'right'>('right'); // 转场方向
const nextImageIndex = ref(0); // 下一张图片的索引

// ========== 转场角度配置 ==========
// 这些角度必须与CSS中引导线的角度保持一致
// CSS引导线位置：
//   .section-4-line-top:   rotate-[-45deg]  <-- LINE_TOP_ANGLE
//   .section-4-line-bottom: rotate-[45deg]  <-- LINE_BOTTOM_ANGLE
// 
// 修改方法：
// 1. 修改下面的角度值（单位：度）
// 2. 同时修改对应的CSS样式（第236-237行）
// 3. 内角 = LINE_BOTTOM_ANGLE - LINE_TOP_ANGLE
// 4. 外角 = 360 - 内角
// ===================================

const LINE_TOP_ANGLE = -45; // 上引导线角度（度）
const LINE_BOTTOM_ANGLE = 45; // 下引导线角度（度）

// 转换为弧度（Canvas使用弧度）
const LINE_TOP_ANGLE_RAD = (LINE_TOP_ANGLE * Math.PI) / 180;
const LINE_BOTTOM_ANGLE_RAD = (LINE_BOTTOM_ANGLE * Math.PI) / 180;

// 自动计算内角和外角的范围
const INNER_ANGLE_START = LINE_TOP_ANGLE_RAD; // 内角起点（沿上引导线）
const INNER_ANGLE_END = LINE_BOTTOM_ANGLE_RAD; // 内角终点（沿下引导线）
const INNER_ANGLE_RANGE = INNER_ANGLE_END - INNER_ANGLE_START; // 内角范围（弧度）
const OUTER_ANGLE_RANGE = Math.PI * 2 - INNER_ANGLE_RANGE; // 外角范围（弧度）

// 图片容器ref
const currentImagesContainer = ref<HTMLElement | null>(null);
const previousImagesContainer = ref<HTMLElement | null>(null);

const describes = ref([
  {
    title: "Brand Analysis & Insight ",
    description: "品牌分析洞察",
    image1: "/static/add.svg",
    image2: "/static/add.svg",
    remark:
      "Onew​​ 是一家专注于高端数字体验设计的创意工作室。我们以颠覆性的设计思维重新诠释品牌在数字世界的表达方式，深度挖掘每个品牌独特的创新基因。通过将前沿设计美学与极致用户体验完美融合，我们为企业提供从品牌战略规划、视觉形象塑造到交互体验设计的全链路定制服务",
    index: "1",
  },
  {
    title: "Visual Creative Design",
    description: "设计视觉创意",
    image1: "/static/add.svg",
    image2: "/static/add.svg",
    remark:
      "Onew​​ 是一家专注于高端数字体验设计的创意工作室。我们以颠覆性的设计思维重新诠释品牌在数字世界的表达方式，深度挖掘每个品牌独特的创新基因。通过将前沿设计美学与极致用户体验完美融合，我们为企业提供从品牌战略规划、视觉形象塑造到交互体验设计的全链路定制服务",
    index: "2",
  },
  {
    title: "Interactive Development",
    description: "开发交互体验",
    image1: "/static/add.svg",
    image2: "/static/add.svg",
    remark:
      "Onew​​ 是一家专注于高端数字体验设计的创意工作室。我们以颠覆性的设计思维重新诠释品牌在数字世界的表达方式，深度挖掘每个品牌独特的创新基因。通过将前沿设计美学与极致用户体验完美融合，我们为企业提供从品牌战略规划、视觉形象塑造到交互体验设计的全链路定制服务",
    index: "3",
  },
  {
    title: "Maintenance and Optimization",
    description: "持续优化维护",
    image1: "/static/add.svg",
    image2: "/static/add.svg",
    remark:
      "Onew​​ 是一家专注于高端数字体验设计的创意工作室。我们以颠覆性的设计思维重新诠释品牌在数字世界的表达方式，深度挖掘每个品牌独特的创新基因。通过将前沿设计美学与极致用户体验完美融合，我们为企业提供从品牌战略规划、视觉形象塑造到交互体验设计的全链路定制服务",
    index: "4",
  },
]);

const words = ref([
  {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
  {
    title: "Maintenance and Optimization",
  },
  {
    title: "Maintenance and Optimization",
  },
  {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
   {
    title: "Maintenance and Optimization",
  },
     {
    title: "Maintenance and Optimization",
  },
     {
    title: "Maintenance and Optimization",
  },
     {
    title: "Maintenance and Optimization",
  },
]);

const listCards= ref([
  {
    title: "Maintenance and Optimization",
    description: "与 Onew 的合作体验非常棒！他们不仅准确捕捉到了我们品牌的精髓还通过极富创意的设计，让我们的网站焕然一新。整个团队专业、高效并且始终保持着开放的沟通。最终呈现的效果超出了我们的预期，网站不仅视觉上令人惊艳，用户体验也极其流畅。强烈推荐 Onew 给任何寻求卓越网页设计服务的公司！",
    avatar: "/static/avatar.svg",
    logo:'/static/logo.svg',
    name:"Amir Khan",
    mark:'CEO,Avito'
  },
    {
    title: "Maintenance and Optimization",
    description: "与 Onew 的合作体验非常棒！他们不仅准确捕捉到了我们品牌的精髓还通过极富创意的设计，让我们的网站焕然一新。整个团队专业、高效并且始终保持着开放的沟通。最终呈现的效果超出了我们的预期，网站不仅视觉上令人惊艳，用户体验也极其流畅。强烈推荐 Onew 给任何寻求卓越网页设计服务的公司！",
    avatar: "/static/avatar.svg",
    logo:'/static/logo.svg',
    name:"Amir Khan",
    mark:'CEO,Avito'
  },
    {
    title: "Maintenance and Optimization",
    description: "与 Onew 的合作体验非常棒！他们不仅准确捕捉到了我们品牌的精髓还通过极富创意的设计，让我们的网站焕然一新。整个团队专业、高效并且始终保持着开放的沟通。最终呈现的效果超出了我们的预期，网站不仅视觉上令人惊艳，用户体验也极其流畅。强烈推荐 Onew 给任何寻求卓越网页设计服务的公司！",
    avatar: "/static/avatar.svg",
    logo:'/static/logo.svg',
    name:"Amir Khan",
    mark:'CEO,Avito'
  },
    {
    title: "Maintenance and Optimization",
    description: "与 Onew 的合作体验非常棒！他们不仅准确捕捉到了我们品牌的精髓还通过极富创意的设计，让我们的网站焕然一新。整个团队专业、高效并且始终保持着开放的沟通。最终呈现的效果超出了我们的预期，网站不仅视觉上令人惊艳，用户体验也极其流畅。强烈推荐 Onew 给任何寻求卓越网页设计服务的公司！",
    avatar: "/static/avatar.svg",
    logo:'/static/logo.svg',
    name:"Amir Khan",
    mark:'CEO,Avito'
  },
    {
    title: "Maintenance and Optimization",
    description: "与 Onew 的合作体验非常棒！他们不仅准确捕捉到了我们品牌的精髓还通过极富创意的设计，让我们的网站焕然一新。整个团队专业、高效并且始终保持着开放的沟通。最终呈现的效果超出了我们的预期，网站不仅视觉上令人惊艳，用户体验也极其流畅。强烈推荐 Onew 给任何寻求卓越网页设计服务的公司！",
    avatar: "/static/avatar.svg",
    logo:'/static/logo.svg',
    name:"Amir Khan",
    mark:'CEO,Avito'
  },
])

const imagesList = ref([
  {
    src: "/images/about/cover1.png",
    index: 1,
    mark: "REDBOOK",
    title: "小红书第二期——如何打造一个优秀的网站",
    description: "Onew​​ 是一家专注于高端数字体验设计的创意工作室。我们以颠覆性的设计思维重新诠释品牌在数字世界的表达方式，深度挖掘每个品牌独特的创新基因。通过将前沿设计美学与极致用户体验完美融合，我们为企业提供从品牌战略规划、视觉形象塑造到交互体验设计的全链路定制服务",
  },
  {
    src: "/images/about/cover2.png",
    index: 2,
    mark: "REDBOOK",
    title: "小红书第二期——如何打造一个优秀的网站",
    description: "Onew​​ 是一家专注于高端数字体验设计的创意工作室。我们以颠覆性的设计思维重新诠释品牌在数字世界的表达方式，深度挖掘每个品牌独特的创新基因。通过将前沿设计美学与极致用户体验完美融合，我们为企业提供从品牌战略规划、视觉形象塑造到交互体验设计的全链路定制服务",
  },
  {
    src: "/images/about/cover3.png",
    index: 3,
    mark: "REDBOOK",
    title: "小红书第二期——如何打造一个优秀的网站",
    description: "Onew​​ 是一家专注于高端数字体验设计的创意工作室。我们以颠覆性的设计思维重新诠释品牌在数字世界的表达方式，深度挖掘每个品牌独特的创新基因。通过将前沿设计美学与极致用户体验完美融合，我们为企业提供从品牌战略规划、视觉形象塑造到交互体验设计的全链路定制服务",
  },
  
  {
    src: "/images/about/cover4.png",
    index: 4,
    mark: "REDBOOK",
    title: "小红书第二期——如何打造一个优秀的网站",
    description: "Onew​​ 是一家专注于高端数字体验设计的创意工作室。我们以颠覆性的设计思维重新诠释品牌在数字世界的表达方式，深度挖掘每个品牌独特的创新基因。通过将前沿设计美学与极致用户体验完美融合，我们为企业提供从品牌战略规划、视觉形象塑造到交互体验设计的全链路定制服务",
  },
])

const imagesListGroup:any = ref([
  {
    images: [
      {
        src: "/images/about/cover1.png",
        index: 1,
      },
      {
        src: "/images/about/cover2.png",
        index: 2,
      },
      {
        src: "/images/about/cover3.png",
        index: 3,
      },
      {
        src: "/images/about/cover4.png",
        index: 4,
      },
    ]
  },
  {
    images: [
      {
        src: "/images/about/cover4.png",
        index: 1,
      },
      {
        src: "/images/about/cover5.png",
        index: 2,
      },
      {
        src: "/images/about/cover6.png",
        index: 3,
      },
      {
        src: "/images/about/cover7.png",
        index: 4,
      },
    ]
  },
  {
    images: [
      {
        src: "/images/about/cover1.png",
        index: 1,
      },
      {
        src: "/images/about/cover2.png",
        index: 2,
      },
      {
        src: "/images/about/cover3.png",
        index: 3,
      },
      {
        src: "/images/about/cover4.png",
        index: 4,
      },
    ]
  },
  {
    images: [
      {
        src: "/images/about/cover4.png",
        index: 1,
      },
      {
        src: "/images/about/cover5.png",
        index: 2,
      },
      {
        src: "/images/about/cover6.png",
        index: 3,
      },
      {
        src: "/images/about/cover7.png",
        index: 4,
      },
    ]
  }
])

const hoveredImageIndex = ref(imagesList.value.length - 1);


// 设置每个describe item的ref
const setDescribeRef = (el: any, index: number) => {
  if (el) {
    describeRefs.value[index] = el;
  }
};

// 切换展开状态的函数（手风琴效果 - 同时只能展开一个）
const toggleExpand = (index: string) => {
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
  // 根据左右区域设置不同的图标
  currentIcon.value = side === 'left' ? '/static/cursor-left.png' : '/static/cursor-right.png';
  
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
    
    // 使用缓动让图标慢慢跟随
    const lerp = 0.15; // 缓动系数，值越小跟随越慢
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
const initLenis = () => {
  lenis.value = new Lenis({
    duration: 0,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    smoothWheel: true,
    syncTouch: false,
    easing: (t) => t,
    lerp: 0.1,
  });

  lenis.value.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.value.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.fps(120);
};

// ===== 背景和初始动画 =====
const initBackgroundAnimations = () => {
  // 初始动画timeline
  const initialTl = gsap.timeline();

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

  // logo-container和blue-mask滚动动画
  gsap.to([".logo-container", ".blue-mask"], {
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "100vh top",
      scrub: 1.5,
    },
    x: "-10vw",
    y: "-100vh",
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
    duration: 0.3,
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
    duration: 0.3,
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
        expandImage.src = "/images/index/img1.png";
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
        expandImage.src = "/images/index/img1.png";
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
        expandImage.src = "/images/index/img1.png";
      }
    },
    [],
    0.1
  );
};

// 渲染当前图片组
const renderCurrentImages = () => {
  if (!currentImagesContainer.value) return;
  
  // 清空容器
  currentImagesContainer.value.innerHTML = '';
  
  const images = imagesListGroup.value[currentImageIndex.value]?.images || [];
  
  images.forEach((item: any, index: number) => {
    const img = document.createElement('img');
    img.src = item.src;
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

// 渲染上一组图片
const renderPreviousImages = () => {
  if (!previousImagesContainer.value) return;
  
  // 清空容器
  previousImagesContainer.value.innerHTML = '';
  
  const prevIndex = currentImageIndex.value === 0 
    ? imagesListGroup.value.length - 1 
    : currentImageIndex.value - 1;
  
  const images = imagesListGroup.value[prevIndex]?.images || [];
  
  images.forEach((item: any, index: number) => {
    const img = document.createElement('img');
    img.src = item.src;
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

const handleClick = (side: 'left' | 'right') => {
  // 如果正在转场中，忽略点击
  if (isTransitioning.value) return;
  
  // 计算下一张图片的索引
  if (side === 'left') {
    nextImageIndex.value = (currentImageIndex.value - 1 + imagesList.value.length) % imagesList.value.length;
  } else if (side === 'right') {
    nextImageIndex.value = (currentImageIndex.value + 1) % imagesList.value.length;
  }
  
  // 设置转场方向
  transitionDirection.value = side;
  
  // 开始转场动画
  startTransition(side);
  
  // 执行小图动画
  currentImgAnimations().then(() => {
    lastImgAnimations();
  });
};

const lastImgAnimations = () => {
  const items = gsap.utils.toArray(".last-imgs");
  
  if (items.length === 0) {
    console.warn('没有找到 .last-imgs 元素');
    return;
  }
  
  const tl = gsap.timeline({
    onComplete: () => {
      // 动画完成后重新渲染所有图片，让GSAP可以更新新的元素
      reRenderAllImages();
    }
  });
  
  // 从底部上来 - 依次执行
  items.forEach((item: any, index: number) => {
    tl.to(item, {
      bottom: "40px",
      duration: 0.1, // 🎯 动画时长（底部上升）
      ease: "power2.out",
    }, index * 0.1); // 🎯 间隔时间（底部上升的stagger）
  });
  
  // 等待一下
  tl.addLabel("expand", "+=0.2"); // 🎯 上升和展开之间的等待时间
  
  // 横向展开 - 从右到左依次执行（反向）
  items.forEach((item: any, index: number) => {
    const reverseIndex = items.length - 1 - index; // 反转顺序
    tl.to(item, {
      x: `${(index)*40}px`,
      duration: 0.4, // 🎯 动画时长（横向展开）
      ease: "power2.out",
    }, `expand+=${reverseIndex * 0.1}`); // 🎯 间隔时间（横向展开的stagger，反向）
  });
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
  hoveredImageIndex.value = imagesList.value.length - 1;
};

// ===== 显示线条和文字 =====
const showLineAndText = (timeline: gsap.core.Timeline, scaleDuration: number) => {
  // 等待图片缩放完成后再显示线条和文字
  timeline.to([".section-2-line-top", ".section-2-line-bottom", ".section-2-text"], {
    opacity: 1,
    width: "80vw",
  }, scaleDuration); // 在缩放完成后开始

};

// ===== 滚动图片动画 =====
const initScrollingImagesAnimations = (
  timeline: gsap.core.Timeline,
  bracketPath: any[],
  scaleDuration: number
) => {
  for (let i = 1; i <= 10; i++) {
    const delay = scaleDuration + (i - 0) * 0.6; // 在图片缩放完成后开始
    const imageSrc = `/images/index/img${(i % 5) + 1}.png`;

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
      
      // 提前执行 list-card-item-wrap 动画
      const container = document.querySelector(".list-card-wrap") as HTMLElement;
      const item = document.querySelector(".list-card-item-wrap") as HTMLElement;
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
};

// ===== 滚动文字动画 =====
const initScrollingTextAnimations = (timeline: gsap.core.Timeline, scaleDuration: number) => {
  for (let i = 1; i <= words.value.length; i++) {
    const delay = scaleDuration + (i - 1) * 0.4; // 在图片缩放完成后开始，缩短间隔到0.4秒

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
        y: -window.innerHeight -300, // 向上滚动到屏幕外
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
    },
  });

  timeline.to([".section-4-line-top", ".section-4-line-bottom", ".section-4-text"], {
    scrollTrigger: {
      trigger: ".section-4",
      start: "top top",
      end: "top top",
      scrub: 1,
      toggleActions: "play none none reverse",
    },
    width: "80vw",
    opacity: 1,
  });

  timeline.to([".redbook", ".redbook-desc"], {
    opacity: 1,
    // duration: 0.5,
    ease: "none",
    scrollTrigger: {
      trigger: ".section-4",
      start: "top top",
      end: "top top",
      scrub: 1,
      toggleActions: "play none none reverse",
    },
  });

  timeline.to(".section-5", {
    y: 0,
    duration: 2,
    delay: 1,
    ease: "power2.inOut",
  });
  // 星星自动旋转动画
  gsap.to(".star", {
    rotate: 360,
    scrollTrigger: {
      trigger: ".section-5",
      start: "top top",
      toggleActions: "restart none none reverse",
    },
    delay:0.5,
    duration: 0.5,
    ease: "none",
  });
  gsap.to(".line-w", {
    width: "100vw",
    scrollTrigger: {
      trigger: ".section-5",
      start: "top 50%",
      toggleActions: "restart none none reverse",
    },
    duration: 1,
    delay: 1.2,
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
    delay:1.2,
    ease: "none",
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

onMounted(() => {
  initLenis(); // 初始化 Lenis 平滑滚动
  renderIndex();
  
  // 延迟设置hover效果，确保DOM已经完全渲染
  nextTick(() => {
    setupHoverEffects();
    initCanvas(); // 初始化Canvas
    // 初始化渲染图片
    renderCurrentImages();
    renderPreviousImages();
  });
});

// ===== Canvas 图片渲染相关 =====

// 初始化Canvas尺寸
const initCanvasSize = () => {
  canvasWidth.value = window.innerWidth;
  canvasHeight.value = window.innerHeight;
  
  // 初始化scale数组
  imageScales.value = imagesList.value.map((_, index) => 
    index === currentImageIndex.value ? 1 : 1.2
  );
  targetScales.value = [...imageScales.value];
};

// 加载所有图片
const loadAllImages = () => {
  return Promise.all(
    imagesList.value.map((item) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = item.src;
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
  
  // 计算裁剪区域的起点（147px, 50vh）
  const clipOriginX = 138;
  const clipOriginY = canvasHeight.value / 2;
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
      context.arc(clipOriginX, clipOriginY, radius, transitionAngleInner.value, INNER_ANGLE_END, false);
      context.lineTo(clipOriginX, clipOriginY);
      
      // 外角区域：保留从当前外角擦除线到下一个内角起点的部分（还没被擦除）
      context.moveTo(clipOriginX, clipOriginY);
      context.arc(clipOriginX, clipOriginY, radius, transitionAngleOuter.value, INNER_ANGLE_START + Math.PI * 2, false);
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
  targetScales.value = imagesList.value.map((_, index) => 
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
    transitionAngleInner.value = INNER_ANGLE_START;
    // 外角擦除线：从内角终点（沿下引导线）顺时针转过外角区域到下一个内角起点
    transitionAngleOuter.value = INNER_ANGLE_END;
    
    // 同时执行两个旋转动画
    gsap.to(transitionAngleInner, {
      value: INNER_ANGLE_END,
      duration: duration,
      ease: "power1.inOut"
    });
    
    gsap.to(transitionAngleOuter, {
      value: INNER_ANGLE_START + Math.PI * 2, // 转过整个外角区域
      duration: duration,
      ease: "power1.inOut",
      onComplete: () => {
        // 转场完成
        isTransitioning.value = false;
        currentImageIndex.value = nextImageIndex.value;
        
        // 更新所有图片的目标缩放
        updateTargetScales();
      }
    });
  } else {
    // 向左切换（顺时针）
    // 内角擦除线：从内角起点（沿上引导线）顺时针转到内角终点（沿下引导线）
    transitionAngleInner.value = INNER_ANGLE_START;
    // 外角擦除线：从内角终点（沿下引导线）顺时针转过外角区域到下一个内角起点
    transitionAngleOuter.value = INNER_ANGLE_END;
    
    // 同时执行两个旋转动画
    gsap.to(transitionAngleInner, {
      value: INNER_ANGLE_END,
      duration: duration,
      ease: "power1.inOut"
    });
    
    gsap.to(transitionAngleOuter, {
      value: INNER_ANGLE_START + Math.PI * 2, // 转过整个外角区域
      duration: duration,
      ease: "power1.inOut",
      onComplete: () => {
        // 转场完成
        isTransitioning.value = false;
        currentImageIndex.value = nextImageIndex.value;
        
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
});


</script>
<style scoped>
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
}

.redbook-desc {
  opacity: 0;
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

.last-imgs {
  bottom: -172px;
}
</style>
