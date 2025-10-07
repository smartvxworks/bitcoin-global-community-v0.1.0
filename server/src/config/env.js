import dotenv from "dotenv";
import path from "path";

// 根据环境加载不同的 .env 文件
const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

// 环境变量配置
export const env = {
  // 服务器配置
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '4000', 10),
  HOST: process.env.HOST || 'localhost',
  
  // 数据库配置
  DATABASE_URL: process.env.DATABASE_URL || 'file:./dev.db',
  
  // 安全配置
  JWT_SECRET: process.env.JWT_SECRET || 'dev_secret_key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // CORS 配置
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(',') || [
    'http://localhost:3000',
    'https://your-username.github.io'
  ],
  
  // 速率限制配置
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15分钟
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
};

// 验证必需的环境变量
export function validateEnv() {
  const required = ['JWT_SECRET', 'DATABASE_URL'];
  const missing = required.filter(key => !env[key] || env[key] === '');
  
  if (missing.length > 0) {
    throw new Error(`缺少必需的环境变量: ${missing.join(', ')}`);
  }
  
  // 生产环境安全检查
  if (env.NODE_ENV === 'production') {
    if (env.JWT_SECRET === 'dev_secret_key') {
      throw new Error('生产环境必须设置安全的 JWT_SECRET');
    }
    
    if (env.CORS_ORIGIN.includes('*')) {
      console.warn('⚠️  生产环境不建议使用通配符 CORS 配置');
    }
  }
  
  console.log('✅ 环境变量验证通过');
}

export default env;