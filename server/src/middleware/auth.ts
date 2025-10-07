import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma.js";
import logger from "../utils/logger.js";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    phone: string;
  };
}

export async function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '缺少认证令牌' });
  }

  const token = authHeader.substring(7); // 移除 "Bearer " 前缀

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; phone: string };
    
    // 验证用户是否仍然存在
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, phone: true }
    });

    if (!user) {
      return res.status(401).json({ message: '用户不存在或已被删除' });
    }

    req.user = user;
    next();
  } catch (error) {
    logger.warn('JWT 验证失败:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: '无效的认证令牌' });
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: '认证令牌已过期' });
    }

    return res.status(500).json({ message: '认证处理失败' });
  }
}

// 可选认证中间件（不强制要求认证）
export async function optionalAuthMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(); // 没有认证信息，继续处理
  }

  const token = authHeader.substring(7);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; phone: string };
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, phone: true }
    });

    if (user) {
      req.user = user;
    }
  } catch (error) {
    // 可选认证中忽略错误，继续处理请求
    logger.debug('可选认证失败（忽略）:', error);
  }

  next();
}

export default authMiddleware;