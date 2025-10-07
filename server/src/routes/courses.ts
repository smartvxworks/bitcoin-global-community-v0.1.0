import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET /api/courses
router.get("/", async (_req, res) => {
  const list = await prisma.course.findMany({ orderBy: { id: "asc" } });
  res.json(list);
});

// GET /api/courses/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.course.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: "未找到课程" });
  res.json(item);
});

export default router;