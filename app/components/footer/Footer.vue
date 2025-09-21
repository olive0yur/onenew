<template>
  <footer class="bg-gray-800 text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- 公司信息 -->
        <div class="text-center md:text-left">
          <h3 class="text-lg font-semibold mb-4">联系我们</h3>
          <p class="text-gray-300 mb-2">digsoho</p>
          <p class="text-gray-300">为您提供优质的数字化服务</p>
        </div>

        <!-- 快速链接 -->
        <div class="text-center">
          <h3 class="text-lg font-semibold mb-4">快速链接</h3>
          <div class="space-y-2">
            <a
              href="/about"
              class="block text-gray-300 hover:text-white transition-colors"
              >关于我们</a
            >
            <a
              href="/contact"
              class="block text-gray-300 hover:text-white transition-colors"
              >联系我们</a
            >
            <a
              href="/"
              class="block text-gray-300 hover:text-white transition-colors"
              >隐私政策</a
            >
          </div>
        </div>

        <!-- 公众号和微信 -->
        <div class="text-center md:text-right">
          <h3 class="text-lg font-semibold mb-4">关注我们</h3>
          <div class="flex justify-center md:justify-end space-x-6">
            <!-- 公众号 -->
            <!-- <div class="text-center">
              <div
                class="w-20 h-20 bg-gray-600 rounded-lg flex items-center justify-center mb-2 mx-auto"
              >
                <span class="text-xs text-gray-300">公众号<br />二维码</span>
              </div>
              <p class="text-sm text-gray-300">微信公众号</p>
            </div> -->

            <!-- 运维微信 -->
            <div class="text-center">
              <div
                class="w-20 h-20 bg-gray-600 rounded-lg flex items-center justify-center mb-2 mx-auto"
              >
                <img src="/static/wx.jpg" alt="" class="w-full h-full" />
              </div>
              <p class="text-sm text-gray-300">技术支持</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 分割线 -->
      <div class="border-t border-gray-700 mt-8 pt-6">
        <div class="text-center text-gray-400 text-sm space-y-2">
          <p>&copy; 2025 digsoho.com. 保留所有权利.</p>
          <p class="flex items-center justify-center">
            <img
              src="/static/gh.png"
              alt=""
              srcset=""
              class="w-3 h-3 mr-[3px]"
            />
            <a
              href="https://beian.miit.gov.cn/"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white transition-colors"
            >
              粤ICP备2025434016号
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer组件不需要特殊的逻辑，保持简洁
</script>

<style scoped>
/* 如果需要自定义样式，可以在这里添加 */
</style>
