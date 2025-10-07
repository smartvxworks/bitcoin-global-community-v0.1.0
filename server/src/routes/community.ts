import { Router } from "express";
import { prisma } from "../prisma.js";
import { authMiddleware, AuthRequest } from "../middleware/auth.js";
import { z } from "zod";
import logger from "../utils/logger.js";

const router = Router();

// 讨论创建验证模式
const createDiscussionSchema = z.object({
  title: z.string()
    .min(3, "标题至少3个字符")
    .max(200, "标题最多200个字符"),
  content: z.string()
    .min(1, "内容不能为空")
    .max(5000, "内容最多5000个字符")
});

// 获取讨论列表
router.get("/discussions", async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const pageNum = Math.max(1, parseInt(page as string) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit as string) || 20));
    const skip = (pageNum - 1) * limitNum;

    const [discussions, total] = await Promise.all([
      prisma.discussion.findMany({
        orderBy: { createdAt: "desc" },
        skip,
        take: limitNum,
        include: {
          author: {
            select: {
              phone: true,
              createdAt: true
            }
          }
        }
      }),
      prisma.discussion.count()
    ]);

    res.json({
      discussions,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum)
      }
    });
  } catch (error) {
    logger.error('获取讨论列表失败:', error);
    res.status(500).json({ message: "获取讨论列表失败" });
  }
});

// 获取单个讨论
router.get("/discussions/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "无效的ID" });
    }

    const discussion = await prisma.discussion.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            phone: true,
            createdAt: true
          }
        }
      }
    });

    if (!discussion) {
      return res.status(404).json({ message: "讨论不存在" });
    }

    res.json(discussion);
  } catch (error) {
    logger.error('获取讨论失败:', error);
    res.status(500).json({ message: "获取讨论失败" });
  }
});

// 创建讨论
router.post("/discussions", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const parse = createDiscussionSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ 
        message: "参数验证失败", 
        errors: parse.error.flatten().fieldErrors 
      });
    }

    const { title, content } = parse.data;
    
    const discussion = await prisma.discussion.create({
      data: {
        title,
        content,
        authorPhone: req.user!.phone
      },
      include: {
        author: {
          select: {
            phone: true,
            createdAt: true
          }
        }
      }
    });

    logger.info(`新讨论创建: ${title} by ${req.user!.phone}`);

    res.status(201).json(discussion);
  } catch (error) {
    logger.error('创建讨论失败:', error);
    res.status(500).json({ message: "创建讨论失败" });
  }
});

// 删除讨论（仅作者可删除）
router.delete("/discussions/:id", authMiddleware, async (req: AuthRequest, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "无效的ID" });
    }

    const discussion = await prisma.discussion.findUnique({
      where: { id }
    });

    if (!discussion) {
      return res.status(404).json({ message: "讨论不存在" });
    }

    // 检查权限
    if (discussion.authorPhone !== req.user!.phone) {
      return res.status(403).json({ message: "无权删除此讨论" });
    }

    await prisma.discussion.delete({
      where: { id }
    });

    logger.info(`讨论删除: ${id} by ${req.user!.phone}`);

    res.status(204).send();
  } catch (error) {
    logger.error('删除讨论失败:', error);
    res.status(500).json({ message: "删除讨论失败" });
  }
});

export default router;