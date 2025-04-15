// 导入 defineConfig 函数
import { defineConfig } from "vitepress";
import { docsSidebarData } from "./docsSidebarData.js";

const basePath = "/guide/";
export default defineConfig({
  // 网站标题
  title: "Vue.js",
  // 打包时将 meta 标签注入到 index.html 中
  metaChunk: true,
  // 自定义网站图标
  head: [["link", { rel: "icon", type: "image/svg+xml", href: "logo.svg" }]],
  // 主题配置
  themeConfig: {
    // 网站标题
    siteTitle: "Vue.js",
    // 网站图标
    logo: "/logo.svg",
    // 可以添加更多 outline 相关的配置项，以下是一些可能的扩展配置示例：
    outlineTitle: "本页目录",
    // 自定义出现在上一页和下一页链接上方的文本
    editLink: {
      pattern: "https://gitee.com/liufusir/cn.vuejs/:path",
      text: "在 GitHub 上编辑此页",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    search: {
      provider: "local",
      //   disableDetailedView: true,
      options: {
        translations: {
          button: {
            buttonText: "搜索", // 自定义按钮文本
          },
        },
      },
    },

    sidebar: docsSidebarData,

    // 顶部导航栏配置
    nav: [
      {
        // 导航栏标题
        text: "文档",
        // 导航栏内容
        items: [
          { text: "深度指南", link: `${basePath}introduction` },
          { text: "快速上手", link: `${basePath}quick-start` },
        ],
      },
      { text: "API", link: "/api" },
      {
        // 导航栏标题
        text: "生态系统",
        // 导航栏内容
        items: [
          {
            // 子菜单标题
            text: "官方库",
            // 子菜单内容
            items: [
              {
                // 子菜单项目标题
                text: "Vue router",
                // 子菜单项目链接
                link: "https://router.vuejs.org/zh/",
                // 子菜单项目打开方式
                target: "_blank",
              },
              {
                // 子菜单项目标题
                text: "Pinia",
                // 子菜单项目链接
                link: "https://pinia.vuejs.org/zh/",
                // 子菜单项目打开方式
                target: "_blank",
              },
            ],
          },
        ],
      },
    ],
  },
  markdown: {
    gfmAlerts: true,
    ignoreParsingErrors: true,
    languageAlias: {
      template: "vue",
    },

    theme: {
      light: "github-light",
      dark: "github-dark",
    },
    codeCopyButtonTitle: "复制代码",
  },
  vite: {
    optimizeDeps: {
      cache: true, // 启用依赖缓存
      force: true, // 强制进行依赖预构建
    },
    server: {
      port: 3000,
    },
  },
});
