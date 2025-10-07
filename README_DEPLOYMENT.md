# 比特币中国社区 - 部署指南

## 🚀 项目概述
这是一个基于 React + Vite 的前端应用和 Express + Prisma 的后端 API 组成的比特币教学平台。

## 📋 部署前准备

### 环境要求
- Node.js 18+
- pnpm 或 npm
- Git

### 项目结构
```
bitcoin-china-community/
├── src/                 # 前端源码
├── server/              # 后端源码
├── scripts/            # 构建脚本
├── dist/               # 前端构建输出
└── server/dist/        # 后端构建输出
```

## 🔧 前端部署（GitHub Pages）

### 1. 安装依赖
```bash
pnpm install
```

### 2. 构建验证
```bash
# 构建生产版本
pnpm build:prod

# 验证构建结果
pnpm verify:deploy
```

### 3. 部署到 GitHub Pages
```bash
# 自动部署（构建 + 发布）
pnpm deploy

# 或者手动部署
pnpm build:prod
gh-pages -d dist
```

### 4. 访问地址
- 生产环境：https://your-username.github.io/bitcoin-china-community/
- 本地预览：http://localhost:4173

## 🖥️ 后端部署

### 1. 准备后端环境
```bash
cd server
pnpm install
```

### 2. 配置环境变量
创建 `server/.env.production`：
```env
DATABASE_URL="file:./prod.db"
JWT_SECRET="your_secure_jwt_secret_here"
CORS_ORIGIN="https://your-username.github.io"
PORT=4000
NODE_ENV=production
```

### 3. 数据库设置
```bash
# 生成 Prisma 客户端
pnpm prisma:generate:prod

# 部署数据库结构
pnpm db:push:prod

# 可选：初始化数据
pnpm db:seed:prod
```

### 4. 构建和启动
```bash
# 构建 TypeScript
pnpm build:prod

# 启动生产服务
pnpm start:prod
```

### 5. 服务地址
- API 地址：http://localhost:4000
- 健康检查：GET /api/health

## 🔍 部署验证清单

### ✅ 前端验证
- [ ] 构建成功（dist 目录存在）
- [ ] 资源路径正确（/bitcoin-china-community/ 前缀）
- [ ] GitHub Pages 配置正确
- [ ] 所有页面可访问
- [ ] API 调用正常

### ✅ 后端验证
- [ ] 数据库连接正常
- [ ] API 接口可访问
- [ ] CORS 配置正确
- [ ] JWT 认证正常
- [ ] 健康检查通过

### ✅ 集成验证
- [ ] 前端能正确调用后端 API
- [ ] 用户认证流程正常
- [ ] 数据展示正常
- [ ] 错误处理正常

## 🛠️ 故障排除

### 常见问题

1. **资源 404 错误**
   - 检查 Vite 配置中的 `base` 路径
   - 验证 HTML 文件中的资源路径

2. **API 调用失败**
   - 检查后端服务是否运行
   - 验证 CORS 配置
   - 检查网络连接

3. **数据库连接失败**
   - 检查 DATABASE_URL 配置
   - 验证文件权限
   - 检查数据库文件是否存在

4. **构建失败**
   - 检查依赖是否完整安装
   - 验证 TypeScript 配置
   - 查看构建日志

### 调试命令
```bash
# 前端本地预览生产版本
pnpm preview:prod

# 后端本地测试生产版本
cd server && pnpm start:prod

# 检查环境变量
cd server && node -e "console.log(process.env)"
```

## 🔒 安全建议

### 生产环境安全配置
1. **JWT 密钥**：使用强随机字符串
2. **CORS 配置**：限制允许的域名
3. **数据库文件**：设置适当的文件权限
4. **环境变量**：保护敏感信息

### 监控和日志
- 启用错误日志记录
- 监控 API 响应时间
- 定期检查数据库状态

## 📈 性能优化

### 前端优化
- 启用代码分割
- 压缩静态资源
- 使用 CDN 加速

### 后端优化
- 启用响应压缩
- 配置缓存策略
- 优化数据库查询

## 🤝 技术支持

如果遇到部署问题，请检查：
1. 控制台错误信息
2. 服务器日志
3. 网络请求状态
4. 环境变量配置

祝您部署顺利！🎉