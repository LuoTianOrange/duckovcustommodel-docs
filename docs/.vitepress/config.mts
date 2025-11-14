import { defineConfig } from 'vitepress'

export default defineConfig({
  base: "/",
  title: "Duckov Custom Model",
  description: "Duckov Custom Model - 自定义模型管理器使用文档",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  lastUpdated: true,
  cleanUrls: true,
  lang: "zh-CN",

  themeConfig: {
    logo: {
      light: "/favicon.ico",
      dark: "/favicon.ico",
      width: 24,
      height: 24,
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            displayDetails: "显示详细",
            backButtonTitle: "返回",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            },
          },
        },
      },
    },
    outline: {
      label: "目录",
      level: "deep",
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    outlineTitle: "目录",
    darkModeSwitchLabel: "外观",
    sidebarMenuLabel: "文档目录",
    returnToTopLabel: "返回顶部",
    langMenuLabel: "语言",
    lastUpdated: {
      text: "更新于",
    },
    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/guide/introduction' },
      { text: '更新日志', link: 'https://github.com/BAKAOLC/DuckovCustomModel/blob/master/CHANGELOG.md' }
    ],
    sidebar: [
      {
        text: '开始使用',
        items: [
          { text: '介绍', link: '/guide/introduction' },
          { text: '安装模组', link: '/guide/install-mod' },
          { text: '基本功能', link: '/guide/features' }
        ]
      },
      {
        text: '使用指南',
        items: [
          { text: '模型选择界面', link: '/guide/ui' },
          { text: '模型安装', link: '/guide/install-model' }
        ]
      },
      {
        text: '模组制作',
        collapsed: false,
        items: [
          {
            text: '准备工作', link: '/creation/prerequisites'
          },
          {
            text: '创建模型', link: '/creation/create-model',
            collapsed: false,
            items: [
              { text: '模型包结构', link: '/creation/bundle-structure' },
              { text: '定位锚点', link: '/creation/locators' },
              { text: '添加动画器', link: '/creation/add-animator' },
              { text: '自定义音效', link: '/creation/sounds' },
              { text: 'AI 角色适配', link: '/creation/ai-characters' }
            ]
          },
          {
            text: '创建模组', link: '/creation/create-mod'
          },
        ]
      },
      {
        text: '动画器参数',
        collapsed: false,
        items: [
          { text: '参数概述', link: '/animator/overview' },
          { text: 'Bool 参数', link: '/animator/bool-params' },
          { text: 'Float 参数', link: '/animator/float-params' },
          { text: 'Int 参数', link: '/animator/int-params' },
          { text: 'Trigger 参数', link: '/animator/trigger-params' },
          { text: '动画层配置', link: '/animator/layers' }
        ]
      },
      {
        text: '配置文件',
        collapsed: false,
        items: [
          { text: 'UIConfig.json', link: '/config/uiconfig' },
          { text: 'HideEquipmentConfig.json', link: '/config/hideequipment' },
          { text: 'UsingModel.json', link: '/config/usingmodel' },
          { text: 'IdleAudioConfig.json', link: '/config/idleaudio' },
          { text: 'ModelAudioConfig.json', link: '/config/modelaudio' }
        ]
      },
      {
        text: '模型下载',
        collapsed: false,
        link: '/displaymodel/index'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/BAKAOLC/DuckovCustomModel' },
      {
        icon: {
          svg: '<svg t="1763055236411" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1859" width="200" height="200"><path d="M68.4 590.616C31.326 681.38 24.934 767.034 54.337 782.374c20.455 11.505 53.692-14.062 84.374-60.085 11.505 51.136 42.187 95.88 84.373 132.953-44.743 16.62-74.146 44.743-74.146 75.425 0 51.135 79.259 93.322 176.418 93.322 88.208 0 161.076-33.238 175.138-77.982h20.455c14.06 44.744 86.93 77.982 175.138 77.982 98.437 0 176.418-40.909 176.418-93.322 0-30.682-29.403-58.806-74.146-75.425 42.186-37.074 72.868-81.817 84.374-132.953 30.68 46.023 62.64 71.59 84.373 60.085 30.682-15.34 24.29-102.271-14.062-191.758-29.403-70.312-69.033-122.726-99.715-134.23 0-3.837 1.28-8.95 1.28-14.064 0-26.845-7.67-52.413-20.455-72.868v-5.113c0-12.784-2.556-24.29-7.67-34.517C818.814 145.736 701.2 0 510.722 0 320.242 0 202.63 145.736 194.959 329.824c-5.113 10.227-7.67 21.733-7.67 34.517v5.113c-12.783 20.455-20.454 46.023-20.454 72.87v14.061c-28.124 11.505-69.033 62.64-98.435 134.23z" p-id="1860"></path></svg>'
        },
        link: 'https://qm.qq.com/q/93aUoIxQty'
      }
    ]
  }
})