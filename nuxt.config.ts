import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devServer: {
    host: "0.0.0.0",
  },
  app: {
    head: {
      title: "ONEW - 专业网站制造商",
      meta: [
        {
          name: "description",
          content:
            "ONEW 是专业的网站制造商，提供网站设计、网站制作、网站开发、网站优化、网站推广等全方位网站解决方案，助力中国制造业和外贸企业拓展全球市场。",
        },
        {
          name: "keywords",
          content:
            "ONEW,跨境电商,网站制造商,网站设计,网站制作,网站开发,网站优化,网站推广,网站解决方案,网站服务,网站解决方案,一站式服务",
        },
        { name: "author", content: "ONEW" },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: "ONEW - 专业网站制造商" },
        {
          property: "og:description",
          content:
            "专业的网站制造商，提供网站设计、网站制作、网站开发、网站优化、网站推广等全方位网站解决方案，助力中国制造业和外贸企业拓展全球市场。",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "digsoho" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "ONEW - 专业网站制造商" },
        {
          name: "twitter:description",
          content:
            "专业的网站制造商，提供网站设计、网站制作、网站开发、网站优化、网站推广等全方位网站解决方案，助力中国制造业和外贸企业拓展全球市场。",
        },
      ],
    },
  },
  ssr: false,
  modules: [
    "@nuxt/icon",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "lenis/nuxt",
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
  icon: {
    localApiEndpoint: "/nuxt-icon",
  },
  components: [
    "~/components/ui",
    "~/components/header",
    "~/components/footer",
    "~/components/index",
  ],
  devtools: { enabled: true },
});
