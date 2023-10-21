import { defineConfig } from 'vitepress'
import { getSidebar, Navs } from './sidebar.mjs';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SNOWWALEKR'S BLOG",
  description: "踏雪者的学习笔记",
  base: "/blog",
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    breaks: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/snowwalker.png',
    // 导航栏和侧边栏
    nav: [{ text: '首页', link: '/' }, ...Navs],
    sidebar: getSidebar(),
    // 修改按钮
    editLink: {
      pattern: 'https://github.com/vuejs/vitepress/edit/main/docs/:path'
    },
    search: {
      provider: 'local'
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present snowwalker'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      {
        icon:
        {
          svg: '<svg t="1697879698589" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6859" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 1024C229.222 1024 0 794.778 0 512S229.222 0 512 0s512 229.222 512 512-229.222 512-512 512z m259.149-568.883h-290.74a25.293 25.293 0 0 0-25.292 25.293l-0.026 63.206c0 13.952 11.315 25.293 25.267 25.293h177.024c13.978 0 25.293 11.315 25.293 25.267v12.646a75.853 75.853 0 0 1-75.853 75.853h-240.23a25.293 25.293 0 0 1-25.267-25.293V417.203a75.853 75.853 0 0 1 75.827-75.853h353.946a25.293 25.293 0 0 0 25.267-25.292l0.077-63.207a25.293 25.293 0 0 0-25.268-25.293H417.152a189.62 189.62 0 0 0-189.62 189.645V771.15c0 13.977 11.316 25.293 25.294 25.293h372.94a170.65 170.65 0 0 0 170.65-170.65V480.384a25.293 25.293 0 0 0-25.293-25.267z" fill="#C71D23" p-id="6860"></path></svg>'
        },
        link: 'https://gitee.com/OMaster'
      },
    ]
  }
})
