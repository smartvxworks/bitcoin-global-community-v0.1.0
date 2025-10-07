# Bitcoin Global Community 🌍

[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38B2AC)](https://tailwindcss.com/)
[![Multilingual](https://img.shields.io/badge/Multilingual-中英日韩德法-green)]()

**English**: A global Bitcoin education platform providing professional blockchain courses, tutorials, and community exchange features for Bitcoin enthusiasts worldwide.

**中文**: 一个全球化的比特币教育平台，为世界各地的比特币爱好者提供专业的区块链课程、教程和社区交流功能。

## 🌟 Features / 功能特性

### Core Features / 核心功能
- 📚 **Course Learning** - Hierarchical Bitcoin and blockchain course system  
  **课程学习** - 分层次的比特币和区块链课程体系
- 🎯 **Tutorial Guidance** - Detailed practical operation tutorials  
  **教程指导** - 详细的实践操作教程
- 👥 **Community Exchange** - User interaction and knowledge sharing platform  
  **社区交流** - 用户互动和知识分享平台
- 🌍 **Multilingual Support** - Supports Chinese, English, Japanese, Korean, German, French  
  **多语言支持** - 支持中文、英文、日文、韩文、德文、法文
- 📱 **Responsive Design** - Perfectly adapts to various device sizes  
  **响应式设计** - 完美适配各种设备尺寸

### Technical Features / 技术特性
- ⚡ **Fast Build** - Modern build toolchain based on Vite  
  **快速构建** - 基于 Vite 的现代化构建工具链
- 🎨 **Modern UI** - Uses Tailwind CSS and Framer Motion  
  **现代化 UI** - 使用 Tailwind CSS 和 Framer Motion
- 🔒 **Type Safety** - Complete TypeScript support  
  **类型安全** - 完整的 TypeScript 支持
- 🚀 **Performance Optimization** - Code splitting, lazy loading, resource optimization  
  **性能优化** - 代码分割、懒加载、资源优化
- 🌙 **Theme Switching** - Supports light/dark themes  
  **主题切换** - 支持亮色/暗色主题

## 🚀 Quick Start / 快速开始

### Environment Requirements / 环境要求
- Node.js 18+ 
- pnpm 8+ (recommended) or npm 9+  
  pnpm 8+ (推荐) 或 npm 9+

### Install Dependencies / 安装依赖
```bash
# Using pnpm (recommended)
pnpm install

# Or using npm
npm install
```

### Development Mode / 开发模式
```bash
# Start development server
pnpm run dev

# Access in browser at http://localhost:3000
```

### Build Production Version / 构建生产版本
```bash
# Build project
pnpm run build

# Preview build result
pnpm run preview
```

## 📁 Project Structure / 项目结构

```
bitcoin-global-community/
├── src/                    # Source code directory / 源代码目录
│   ├── components/         # Reusable components / 可复用组件
│   ├── pages/             # Page components / 页面组件
│   ├── hooks/             # Custom Hooks / 自定义 Hooks
│   ├── contexts/          # React Contexts / React Contexts
│   ├── lib/               # Utility library / 工具库
│   └── index.css          # Global styles / 全局样式
├── server/                # Backend API service / 后端 API 服务
├── public/               # Static resources / 静态资源
└── dist/                 # Build output directory / 构建输出目录
```

## 🛠️ Development Scripts / 开发脚本

```bash
# Type checking / 类型检查
pnpm run type-check

# Code formatting / 代码格式化
pnpm run lint

# Run tests / 运行测试
pnpm run test

# Test coverage / 测试覆盖率
pnpm run test:coverage
```

## 🌐 Multilingual Support / 多语言支持

The project supports the following languages:  
项目支持以下语言：
- 🇨🇳 简体中文 (zh-CN) - Default language / 默认语言
- 🇺🇸 English (en-US)
- 🇯🇵 日本語 (ja-JP)
- 🇰🇷 한국어 (ko-KR)
- 🇩🇪 Deutsch (de-DE)
- 🇫🇷 Français (fr-FR)

Language settings are automatically saved to local storage and support browser language auto-detection.  
语言设置会自动保存到本地存储，并支持浏览器语言自动检测。

## 🚀 Deployment Guide / 部署指南

### Static File Deployment (Recommended) / 静态文件部署 (推荐)

The project generates static files after building and can be deployed to any static file server:  
项目构建后生成静态文件，可以部署到任何静态文件服务器：

1. **Build Project / 构建项目**
   ```bash
   pnpm run build
   ```

2. **Deploy to Server / 部署到服务器**
   - Upload contents of `dist` directory to web server  
     将 `dist` 目录内容上传到 Web 服务器
   - Configure server to support SPA routing rewrite  
     配置服务器支持 SPA 路由重写

### Platform-Specific Deployment / 平台特定部署

#### Vercel Deployment / Vercel 部署
```bash
# Install Vercel CLI / 安装 Vercel CLI
npm i -g vercel

# Deploy / 部署
vercel --prod
```

#### Netlify Deployment / Netlify 部署
1. Connect Git repository to Netlify  
   连接 Git 仓库到 Netlify
2. Set build command: `pnpm run build`  
   设置构建命令: `pnpm run build`
3. Set publish directory: `dist`  
   设置发布目录: `dist`

#### GitHub Pages Deployment / GitHub Pages 部署
```bash
# Install gh-pages / 安装 gh-pages
pnpm add -D gh-pages

# Add to package.json scripts / 添加到 package.json scripts
"deploy": "pnpm run build && gh-pages -d dist"
```

## 🔧 Configuration / 配置说明

### Environment Variables / 环境变量
Create `.env` file to configure environment variables:  
创建 `.env` 文件配置环境变量：
```env
# API base URL / API 基础地址
VITE_API_BASE_URL=http://localhost:4000

# Application version / 应用版本
VITE_APP_VERSION=1.0.0
```

### Tailwind CSS Configuration / Tailwind CSS 配置
The project uses Tailwind CSS for styling development, configuration file located at `tailwind.config.js`.  
项目使用 Tailwind CSS 进行样式开发，配置文件位于 `tailwind.config.js`。

### TypeScript Configuration / TypeScript 配置
TypeScript configuration supports path alias `@/*` pointing to `src/*` directory.  
TypeScript 配置支持路径别名 `@/*` 指向 `src/*` 目录。

## 🤝 Contribution Guidelines / 贡献指南

We welcome community contributions! Please follow these steps:  
我们欢迎社区贡献！请遵循以下步骤：

1. Fork this project / Fork 本项目
2. Create feature branch (`git checkout -b feature/AmazingFeature`)  
   创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)  
   提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)  
   推送到分支 (`git push origin feature/AmazingFeature`)
5. Create Pull Request / 创建 Pull Request

## 📄 License / 许可证

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.  
本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 Contact Us / 联系我们

- Project Homepage: [Bitcoin Global Community](https://your-domain.com)  
  项目主页: [Bitcoin Global Community](https://your-domain.com)
- Issue Reporting: [GitHub Issues](https://github.com/your-repo/issues)  
  问题反馈: [GitHub Issues](https://github.com/your-repo/issues)
- Email Contact: contact@your-domain.com  
  邮箱联系: contact@your-domain.com

---

**Project ID**: 7556575683889512767  
**项目编号**: 7556575683889512767  
**Creator**: Satoshi  
**创建者**: Satoshi  
**Project URL**: https://github.com/smartvxworks/bitcoin-global-community-v0.1.0
**项目地址**: https://github.com/smartvxworks/bitcoin-global-community-v0.1.0
