import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置(例如浏览器后退/前进),则返回该位置
    if (savedPosition) {
      return savedPosition
    }
    
    // 如果有锚点,则滚动到锚点位置
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    
    // 默认情况下,滚动到页面顶部
    return { top: 0, left: 0 }
  },
}

