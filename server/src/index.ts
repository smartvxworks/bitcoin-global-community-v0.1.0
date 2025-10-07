import app from "./app.js";
import { validateEnv } from "./config/env.js";
import logger from "./utils/logger.js";

// 验证环境变量
try {
  validateEnv();
} catch (error) {
  logger.error('环境变量验证失败:', (error as Error).message);
  process.exit(1);
}

const port = Number(process.env.PORT) || 3000;
const host = process.env.HOST || '0.0.0.0';

// 启动服务器
const server = app.listen(port, host, () => {
  logger.info(`API 服务器启动成功`);
  logger.info(`环境: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`地址: http://${host}:${port}`);
  logger.info(`健康检查: http://${host}:${port}/api/health`);
});

// 优雅关闭处理
const gracefulShutdown = (signal: string) => {
  logger.info(`收到 ${signal} 信号，正在关闭服务器...`);
  
  server.close(() => {
    logger.info('服务器已关闭');
    process.exit(0);
  });

  // 强制关闭超时
  setTimeout(() => {
    logger.error('强制关闭服务器');
    process.exit(1);
  }, 10000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// 未捕获异常处理
process.on('uncaughtException', (error) => {
  logger.error('未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('未处理的 Promise 拒绝:', reason);
  process.exit(1);
});