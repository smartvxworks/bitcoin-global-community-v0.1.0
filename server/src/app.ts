import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import errorHandler from "./middleware/errorHandler.js";
import logger from "./utils/logger.js";
import path from "path";
import fs from "fs";
import morgan from "morgan";

const app = express();

// 基础中间件
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS 配置
const corsOptions: cors.CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://your-username.github.io"
    ];
    
    // 允许没有 origin 的请求（如移动应用或服务器间调用）
    if (!origin) return callback(null, true);
    
    // 允许 localhost 的所有端口
    if (origin.includes("localhost")) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin) || allowedOrigins.includes("*")) {
      callback(null, true);
    } else {
      logger.warn(`被阻止的 CORS 请求来源: ${origin}`);
      callback(new Error("不允许的跨域请求"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));
/**
 * 访问日志：同时输出到控制台与文件 logs/access.log
 */
const logsDir = path.resolve(process.cwd(), "server", "logs");
try { fs.mkdirSync(logsDir, { recursive: true }); } catch {}
const accessLogStream = fs.createWriteStream(path.join(logsDir, "access.log"), { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));
app.use(morgan("dev"));

// 预检请求处理
app.options("*", cors(corsOptions));

// 请求日志中间件
app.use((req, res, next) => {
  const start = Date.now();
  const { method, url, ip } = req;
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;
    logger.info(`${method} ${url} ${statusCode} - ${duration}ms - ${ip}`);
  });
  
  next();
});

// 健康检查端点
app.get("/api/health", (_req, res) => {
  res.json({ 
    status: "healthy",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0"
  });
});

/**
 * API 路由优先
 */
app.use("/api", routes);

/**
 * 托管前端静态资源（生产）
 */
/**
 * 计算前端静态目录：优先使用相对运行时 __dirname 的根/dist，其次尝试常见备选路径
 */
const candidateDistDirs = [
  path.resolve(__dirname, "../../dist"),
  path.resolve(process.cwd(), "../dist"),
  path.resolve(process.cwd(), "dist"),
];
const distDir = candidateDistDirs.find(p => fs.existsSync(p)) || candidateDistDirs[0];
logger.info(`前端静态目录: ${distDir}`);
app.use(express.static(distDir));

/**
 * SPA History Fallback：非 /api 的路由全部回退到 index.html
 */
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  const indexPath = path.join(distDir, "index.html");
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  next();
});

// 仅对 API 做 404 JSON 返回，其余已由 SPA fallback 处理
app.use("/api/*", (req, res) => {
  res.status(404).json({
    message: "接口不存在",
    path: req.originalUrl,
    method: req.method
  });
});

// 全局错误处理中间件
app.use(errorHandler);

export default app;