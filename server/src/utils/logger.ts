// 简单的日志工具
export const logger = {
  info: (message: string, ...args: any[]) => {
    console.log(`ℹ️  [INFO] ${message}`, ...args);
  },
  
  warn: (message: string, ...args: any[]) => {
    console.warn(`⚠️  [WARN] ${message}`, ...args);
  },
  
  error: (message: string, ...args: any[]) => {
    console.error(`❌ [ERROR] ${message}`, ...args);
  },
  
  debug: (message: string, ...args: any[]) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`🐛 [DEBUG] ${message}`, ...args);
    }
  }
};

export default logger;