import { Router } from "express";
import { prisma } from "../prisma.js";
import logger from "../utils/logger.js";

const router = Router();

// 健康检查端点
router.get("/", async (_req, res) => {
  try {
    // 检查数据库连接
    await prisma.$queryRaw`SELECT 1`;
    
    const healthInfo = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || "development",
      version: "1.0.0",
      database: "connected"
    };

    res.json(healthInfo);
  } catch (error) {
    logger.error('健康检查失败:', error);
    
    res.status(503).json({
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      error: "数据库连接失败",
      environment: process.env.NODE_ENV || "development"
    });
  }
});

// 详细系统信息（仅开发环境）
router.get("/detailed", async (_req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ message: "端点不存在" });
  }

  try {
    const [dbStatus, userCount, discussionCount] = await Promise.all([
      prisma.$queryRaw`SELECT 1`,
      prisma.user.count(),
      prisma.discussion.count()
    ]);

    const detailedInfo = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      system: {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        uptime: process.uptime()
      },
      memory: process.memoryUsage(),
      database: {
        status: "connected",
        users: userCount,
        discussions: discussionCount
      },
      environment: process.env.NODE_ENV || "development"
    };

    res.json(detailedInfo);
  } catch (error) {
    logger.error('详细健康检查失败:', error);
    res.status(503).json({
      status: "unhealthy",
      error: "系统检查失败",
      timestamp: new Date().toISOString()
    });
  }
});

export default router;