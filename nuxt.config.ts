import { defineNuxtConfig } from "nuxt/config";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devServer: {
    host: "0.0.0.0",
  },
  app: {
    head: {
      title: "ONEW专业网站制造商",
      meta: [
        {
          name: "description",
          content:
            "ONEW设计建立于2018年，是一家致力于高端网站建设以及小程序app开发，软件定制，数字营销服务的一体化互联网公司，7年来为大量企业制作高端网站设计，深受客户好评，我们致力每一个品牌走向世界的舞台!",
        },
        {
          name: "keywords",
          content:
            "OONEW,杭州onew,云联在线,杭州网站建设,网站建设,设计工作室,重庆网站建设,专业网站制作,高端网站设计,网站定制开发",
        },
        { name: "author", content: "ONEW" },
        { name: "robots", content: "index,follow" },
        { property: "og:title", content: "ONEW - 专业网站制造商" },
        {
          property: "og:description",
          content:
            "ONEW设计建立于2018年，是一家致力于高端网站建设以及小程序app开发，软件定制，数字营销服务的一体化互联网公司，7年来为大量企业制作高端网站设计，深受客户好评，我们致力每一个品牌走向世界的舞台!",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "ONEW" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "ONEW - 专业网站制造商" },
        {
          name: "twitter:description",
          content:
            "ONEW设计建立于2018年，是一家致力于高端网站建设以及小程序app开发，软件定制，数字营销服务的一体化互联网公司，7年来为大量企业制作高端网站设计，深受客户好评，我们致力每一个品牌走向世界的舞台!",
        },
      ],
    },
  },
  ssr: true,
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
