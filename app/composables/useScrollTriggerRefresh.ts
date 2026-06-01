import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * SPA 路由切换后，ScrollTrigger 注册时图片/视频资源还没加载完成，
 * 此时基于 DOM 高度计算的 px 触发点会全部错位。
 *
 * window.load 在 SPA 切换时不会再触发，所以必须主动等待页面内的资源就绪。
 *
 * 此工具会在以下时机调用 ScrollTrigger.refresh()：
 *   - 立即（用初始 DOM 高度先算一次）
 *   - 每张 img 的 load / error 后（增量 refresh）
 *   - 每个 video 的 loadedmetadata 后
 *   - 兜底 800ms 再 refresh 一次（处理懒加载或慢资源）
 *
 * 调用方在 initAnimations() 之后调用一次即可。
 */
export const useScrollTriggerRefresh = () => {
  const refreshAfterAssetsReady = (root?: HTMLElement | null) => {
    if (!import.meta.client) return;

    const scope: ParentNode = root ?? document;

    // 立即 refresh：让已知的 DOM 部分先获得正确触发点
    requestAnimationFrame(() => ScrollTrigger.refresh());

    const images = Array.from(scope.querySelectorAll("img"));
    const videos = Array.from(scope.querySelectorAll("video"));

    let pending = 0;
    const onOne = () => {
      pending--;
      // 每个资源就绪都 refresh 一次，确保图片陆续加载时触发点持续校正
      ScrollTrigger.refresh();
    };

    images.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) return;
      pending++;
      img.addEventListener("load", onOne, { once: true });
      img.addEventListener("error", onOne, { once: true });
    });

    videos.forEach((video) => {
      if (video.readyState >= 1) return; // HAVE_METADATA
      pending++;
      video.addEventListener("loadedmetadata", onOne, { once: true });
      video.addEventListener("error", onOne, { once: true });
    });

    // 兜底：避免某些资源永远不触发 load（404、CORS 等异常情况）
    setTimeout(() => ScrollTrigger.refresh(), 800);
  };

  return {
    refreshAfterAssetsReady,
  };
};
