import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

export interface AppError extends Error {
  status?: number;
  statusCode?: number;
  errors?: any[];
}

export function errorHandler(
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // 记录错误详情
  logger.error('请求错误:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // 处理 CORS 错误
  if (err.message === "不允许的跨域请求") {
    return res.status(403).json({ message: "跨域请求被拒绝" });
  }

  // 处理 JWT 错误
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "无效的令牌" });
  }

  // 处理验证错误
  if (err.name === "ValidationError") {
    return res.status(400).json({ 
      message: "请求数据验证失败",
      errors: err.errors 
    });
  }

  // Prisma 数据库错误
  if (err.name?.includes('Prisma')) {
    // 不向客户端暴露数据库错误详情
    return res.status(500).json({ 
      message: "数据库操作失败",
      ...(process.env.NODE_ENV !== 'production' && { details: err.message })
    });
  }

  // 默认错误响应
  const statusCode = err.status || err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? "服务器内部错误" 
    : err.message;

  const errorResponse: any = {
    message,
    timestamp: new Date().toISOString(),
    path: req.path
  };

  // 开发环境包含更多错误信息
  if (process.env.NODE_ENV !== 'production') {
    errorResponse.stack = err.stack;
    errorResponse.details = err;
  }

  res.status(statusCode).json(errorResponse);
}

export default errorHandler;