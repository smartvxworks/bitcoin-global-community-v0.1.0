# 后端服务（Express + Prisma + SQLite）

## 开发启动
1. 安装依赖
   pnpm install

2. 生成 Prisma 客户端并推送模型
   pnpm prisma:generate
   pnpm db:push

3. 初始化种子数据（可选）
   pnpm db:seed

4. 启动开发服务
   pnpm dev
   # API: http://localhost:4000
   # 健康检查: GET /api/health

## 环境变量
见 .env，可根据需要修改：
- DATABASE_URL="file:./dev.db"
- JWT_SECRET="请替换为更安全的随机字符串"
- CORS_ORIGIN="http://localhost:3000"
- PORT=4000

## 主要接口
- POST /api/auth/register { phone, password }
- POST /api/auth/login { phone, password } -> { token }
- GET  /api/courses
- GET  /api/courses/:id
- GET  /api/tutorials
- GET  /api/tutorials/:id
- GET  /api/community/discussions
- POST /api/community/discussions (需Bearer Token) { title, content }