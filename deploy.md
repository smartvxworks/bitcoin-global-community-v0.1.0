# 部署指南

## 前端部署（GitHub Pages）

### 1. 构建验证
```bash
# 构建生产版本
pnpm build:prod

# 验证构建结果
pnpm verify:deploy
```

### 2. 部署到 GitHub Pages
```bash
# 部署（自动构建并发布）
pnpm deploy

# 或者手动部署
pnpm build:prod
gh-pages -d dist
```

### 3. 验证部署
- 访问：https://your-username.github.io/bitcoin-china-community/
- 检查所有功能是否正常

## 后端部署

### 1. 准备生产环境
```bash
cd server

# 安装依赖
pnpm install

# 生成 Prisma 客户端
pnpm prisma:generate:prod

# 部署数据库
pnpm db:push:prod

# 可选：初始化数据
pnpm db:seed:prod
```

### 2. 构建和启动
```bash
# 构建 TypeScript
pnpm build:prod

# 启动生产服务
pnpm start:prod
```

### 3. 环境变量配置
确保生产环境有正确的 `.env.production` 配置：
```env
DATABASE_URL="file:./prod.db"
JWT_SECRET="your_secure_jwt_secret"
CORS_ORIGIN="https://your-username.github.io"
PORT=4000
NODE_ENV=production
```

## 部署检查清单

### ✅ 前端检查
- [ ] 构建成功（dist 目录存在）
- [ ] 资源路径正确（/bitcoin-china-community/ 前缀）
- [ ] GitHub Pages 配置正确
- [ ] 所有页面可访问

### ✅ 后端检查
- [ ] 数据库连接正常
- [ ] API 接口可访问
- [ ] CORS 配置正确
- [ ] JWT 认证正常

### ✅ 集成检查
- [ ] 前端能正确调用后端 API
- [ ] 用户认证流程正常
- [ ] 数据展示正常

## 故障排除

### 常见问题
1. **资源 404 错误**：检查 base 路径配置
2. **API 调用失败**：检查 CORS 和后端服务状态
3. **数据库连接失败**：检查 DATABASE_URL 和文件权限

### 调试命令
```bash
# 前端本地预览生产版本
pnpm preview:prod

# 后端本地测试生产版本
cd server && pnpm start:prod
```

## 自动化部署
考虑使用 GitHub Actions 实现自动化部署流程。