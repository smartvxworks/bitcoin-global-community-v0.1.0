import { Router } from "express";
import { prisma } from "../prisma";

const router = Router();

// GET /api/tutorials
router.get("/", async (_req, res) => {
  const list = await prisma.tutorial.findMany({ orderBy: { id: "asc" } });
  res.json(list);
});

// GET /api/tutorials/:id
router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const item = await prisma.tutorial.findUnique({ where: { id } });
  if (!item) return res.status(404).json({ message: "未找到教程" });
  res.json(item);
});

export default router;