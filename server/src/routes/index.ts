import { Router } from "express";
import auth from "./auth.js";
import courses from "./courses.js";
import tutorials from "./tutorials.js";
import community from "./community.js";
import health from "./health.js";

const router = Router();

router.use("/auth", auth);
router.use("/courses", courses);
router.use("/tutorials", tutorials);
router.use("/community", community);
router.use("/health", health);

export default router;