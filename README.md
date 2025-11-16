# Duckov Custom Model 文档

<div align="center">

![Logo](docs/public/logo.png)

**逃离鸭科夫 - 自定义模型管理器使用文档**

[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-blue?logo=github)](https://github.com/Duckov-Custom-Model/DuckovCustomModel)
[![VitePress](https://img.shields.io/badge/VitePress-Latest-646cff?logo=vite)](https://vitepress.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[在线文档](https://bakaolc.github.io/duckovcustommodel-docs/) · [报告问题](https://github.com/BAKAOLC/duckovcustommodel-docs/issues) · [贡献指南](#贡献)

</div>

## 简介

这是 **Duckov Custom Model**（逃离鸭科夫自定义模型管理器）的官方文档站点，提供完整的模型创建、打包、发布教程和 API 参考。

### 主要功能

- 📚 **详细教程** - 从零开始创建自定义模型
- 🎨 **模型展示** - 社区优秀作品展示
- 🔧 **开发指南** - 模组开发完整流程
- 📦 **API 文档** - BundleInfo 配置参考
- 🌐 **多语言支持** - 计划支持中英文

## 快速开始

### 环境要求

- Node.js 18+ 
- npm 或 pnpm

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/BAKAOLC/duckovcustommodel-docs.git
cd duckovcustommodel-docs

# 安装依赖
npm install
# 或
pnpm install

# 启动开发服务器
npm run docs:dev
# 或
pnpm docs:dev
```

访问 `http://localhost:5173` 查看文档。

### 构建部署

```bash
# 构建静态文件
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 项目结构

```bash
duckovcustommodel-docs/
├── docs/                           # 文档源文件
│   ├── .vitepress/                 # VitePress 配置
│   │   ├── components/             # Vue 组件
│   │   │   └── ModelCard.vue       # 模型卡片组件
│   │   ├── config.mts              # 站点配置
│   │   └── theme/                  # 主题配置
│   ├── public/                     # 静态资源
│   │   ├── logo.png                # Logo
│   │   ├── favicon.ico             # 网站图标
│   │   └── images/                 # 文档图片
│   ├── guide/                      # 使用指南
│   │   ├── introduction.md         # 介绍
│   │   ├── installation.md         # 安装
│   │   └── quick-start.md          # 快速开始
│   ├── creation/                   # 创作指南
│   │   ├── create-model.md         # 创建模型
│   │   ├── add-animator.md         # 添加动画
│   │   ├── create-bundle.md        # 打包模型
│   │   ├── bundle-structure.md     # 模型包结构
│   │   └── create-mod.md           # 创建模组
│	├── animator/					# 动画器参数
│	│	├── overview.md				# 参数概述
│	│	├── bool-params.md			# Bool 参数
│	│	├── float-params.md			# Float 参数
│	│	├── int-params.md			# Int 参数
│	│	├── trigger-params.md		# Trigger 参数
│	│	└── layers.md				# 动画层配置
│   ├── displaymodel/               # 模型展示
│   │   ├── index.md                # 展示页面
│   │   └── models.json             # 模型数据
│   └── index.md                    # 首页
├── package.json                    # 项目配置
├── pnpm-lock.yaml                  # 依赖锁定文件
└── README.md                       # 本文件
```

## 文档内容

### 使用指南

- 项目介绍
- 安装教程
- 快速开始

### 创作指南

- 创建模型 - Unity 模型制作流程
- 添加动画器 - 配置动画控制器
- 打包模型 - AssetBundle 打包
- 模型包结构 - bundleinfo.json 配置
- 创建模组 - 模组开发指南

### 模型展示

- 社区创作的模型

## 模型数据格式

模型数据存储在 [models.json](vscode-file://vscode-app/e:/Program Files/Microsoft VS Code/resources/app/out/vs/code/electron-sandbox/workbench/workbench.html)：

```json
{
  "ysm": [
    {
      "id": "3601557685",
      "url": "https://steamcommunity.com/sharedfiles/filedetails/?id=3601557685",
      "image": "https://example.com/image.jpg",
      "name": "模型名称",
      "tag": ["YSM", "原神"],
      "modelID": ["10004", "10005"]
    }
  ]
}
```

### 字段说明

| 字段      | 类型     | 说明              |
| --------- | -------- | ----------------- |
| `id`      | string   | Steam 创意工坊 ID |
| `url`     | string   | 创意工坊链接      |
| `image`   | string   | 缩略图 URL        |
| `name`    | string   | 模型名称          |
| `tag`     | string[] | 标签列表          |
| `modelID` | string[] | 模型 ID 列表      |

## 贡献

欢迎贡献！请遵循以下步骤：

### 贡献文档

1. Fork 本仓库
2. 创建新分支 (`git checkout -b feature/new-doc`)
3. 在 docs 目录下编写或修改 Markdown 文档
4. 提交更改 (`git commit -m 'Add: 新增文档'`)
5. 推送到分支 (`git push origin feature/new-doc`)
6. 创建 Pull Request

### 添加模型展示

1. 准备模型信息（创意工坊链接、缩略图等）
2. 编辑 models.json
3. 按照格式添加模型数据
4. 提交 Pull Request

### 开发规范

- 文档使用 Markdown 格式
- 代码遵循 ESLint 规范
- 提交信息使用约定式提交（Conventional Commits）
  - `feat:` 新功能
  - `fix:` 修复
  - `docs:` 文档更新
  - `style:` 样式调整
  - `refactor:` 重构
  - `chore:` 构建/工具更改

## 技术栈

- [VitePress](https://vitepress.dev/zh/guide/what-is-vitepress) - 静态站点生成器
- [Vue 3](https://cn.vuejs.org/) - 前端框架
- [TypeScript](https://www.typescriptlang.org/) - 类型支持
- [GitHub Pages](https://docs.github.com/zh/pages) - 部署平台

## 许可证

本项目采用 MIT 许可证。

##  相关链接

- [Duckov Custom Model GitHub](https://github.com/Duckov-Custom-Model/DuckovCustomModel)
- [VitePress 官方文档](https://vitepress.dev/zh/guide/what-is-vitepress)
- [Steam 创意工坊](https://steamcommunity.com/workshop/filedetails/?id=3600560151)

## 联系方式

- 问题反馈：[GitHub Issues](https://github.com/BAKAOLC/duckovcustommodel-docs/issues)
- 讨论交流：[QQ群](https://qm.qq.com/q/93aUoIxQty)

## 鸣谢

感谢所有为本项目做出贡献的开发者和创作者！

<div align="center">Made with ❤️ by OLC & 灯火橘</div>

