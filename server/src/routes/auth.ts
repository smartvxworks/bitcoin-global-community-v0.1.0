import { Router } from "express";
import { prisma } from "../prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import logger from "../utils/logger.js";

const router = Router();

// 输入验证模式
const registerSchema = z.object({
  phone: z.string()
    .min(6, "手机号至少6位")
    .max(20, "手机号最多20位")
    .regex(/^[0-9+\-\s()]+$/, "手机号格式不正确"),
  password: z.string()
    .min(6, "密码至少6位")
    .max(100, "密码最多100位")
});

const loginSchema = z.object({
  phone: z.string().min(6),
  password: z.string().min(6)
});

// 用户注册
router.post("/register", async (req, res) => {
  try {
    const parse = registerSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ 
        message: "参数验证失败", 
        errors: parse.error.flatten().fieldErrors 
      });
    }
    
    const { phone, password } = parse.data;

    // 检查用户是否已存在
    const exists = await prisma.user.findUnique({ where: { phone } });
    if (exists) {
      return res.status(409).json({ message: "手机号已注册" });
    }

    // 密码加密
    const hashed = await bcrypt.hash(password, 12);
    
    // 创建用户
    const user = await prisma.user.create({ 
      data: { phone, password: hashed } 
    });

    logger.info(`新用户注册: ${phone}`);

    return res.status(201).json({ 
      id: user.id, 
      phone: user.phone, 
      createdAt: user.createdAt 
    });
  } catch (error) {
    logger.error('用户注册失败:', error);
    return res.status(500).json({ message: "注册失败，请稍后重试" });
  }
});

// 用户登录
router.post("/login", async (req, res) => {
  try {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ 
        message: "参数验证失败", 
        errors: parse.error.flatten().fieldErrors 
      });
    }
    
    const { phone, password } = parse.data;

    // 查找用户
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      logger.warn(`登录失败: 用户不存在 - ${phone}`);
      return res.status(401).json({ message: "手机号或密码错误" });
    }

    // 验证密码
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      logger.warn(`登录失败: 密码错误 - ${phone}`);
      return res.status(401).json({ message: "手机号或密码错误" });
    }

    // 生成 JWT token
    const token = jwt.sign(
      { id: user.id, phone: user.phone }, 
      process.env.JWT_SECRET!, 
      { expiresIn: "7d" }
    );

    logger.info(`用户登录成功: ${phone}`);

    return res.json({ 
      token,
      user: {
        id: user.id,
        phone: user.phone
      }
    });
  } catch (error) {
    logger.error('用户登录失败:', error);
    return res.status(500).json({ message: "登录失败，请稍后重试" });
  }
});

// 获取当前用户信息
router.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: '未认证' });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; phone: string };
    
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, phone: true, createdAt: true }
    });

    if (!user) {
      return res.status(404).json({ message: '用户不存在' });
    }

    return res.json({ user });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: '无效的认证令牌' });
    }
    
    logger.error('获取用户信息失败:', error);
    return res.status(500).json({ message: "获取用户信息失败" });
  }
});

export default router;