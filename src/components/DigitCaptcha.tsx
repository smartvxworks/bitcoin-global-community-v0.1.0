import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// 生成随机数字验证码
const generateCaptcha = (length = 6): { code: string; svg: string } => {
  // 生成随机数字
  const code = Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
  
  // 创建SVG验证码图片
  const width = 120;
  const height = 40;
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- 背景 -->
      <rect width="100%" height="100%" fill="#f5f5f5" rx="8" ry="8"/>
      
      <!-- 干扰线 -->
      ${Array.from({ length: 3 }).map((_, i) => `
        <line 
          x1="${Math.random() * width}" 
          y1="${Math.random() * height}" 
          x2="${Math.random() * width}" 
          y2="${Math.random() * height}" 
          stroke="${['#ff6b6b', '#4ecdc4', '#ffd166'][i % 3]}" 
          stroke-width="${1 + Math.random() * 2}" 
          opacity="${0.5 + Math.random() * 0.3}"
        />
      `).join('')}
      
      <!-- 噪点 -->
      ${Array.from({ length: 30 }).map(() => `
        <circle 
          cx="${Math.random() * width}" 
          cy="${Math.random() * height}" 
          r="${0.5 + Math.random() * 1.5}" 
          fill="#333" 
          opacity="${0.3 + Math.random() * 0.4}"
        />
      `).join('')}
      
      <!-- 验证码文本 -->
      <text 
        x="${width / 2}" 
        y="${height / 2 + 8}" 
        font-family="Arial, sans-serif" 
        font-size="20" 
        font-weight="bold" 
        text-anchor="middle"
        fill="#333"
      >
        ${code.split('').map((char, i) => `
          <tspan 
            x="${25 + i * 18}" 
            y="${height / 2 + 8 + (Math.random() * 10 - 5)}"
            transform="rotate(${Math.random() * 20 - 10}, ${25 + i * 18}, ${height / 2 + 8})"
          >
            ${char}
          </tspan>
        `).join('')}
      </text>
    </svg>
  `;
  
  return { code, svg };
};

interface DigitCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export default function DigitCaptcha({ onVerify }: DigitCaptchaProps) {
  const [captcha, setCaptcha] = useState<{ code: string; svg: string }>(generateCaptcha());
  const [userInput, setUserInput] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  // 刷新验证码
  const refreshCaptcha = useCallback(() => {
    setCaptcha(generateCaptcha());
    setUserInput('');
  }, []);
  
  // 处理验证
  const handleVerify = useCallback(() => {
    if (isVerifying) return;
    
    setIsVerifying(true);
    
    // 模拟验证延迟
    setTimeout(() => {
      const isValid = userInput.trim() === captcha.code;
      onVerify(isValid);
      
      if (isValid) {
        toast.success("验证码验证成功！");
      } else {
        toast.error("验证码不正确，请重试");
        refreshCaptcha();
      }
      
      setIsVerifying(false);
    }, 500);
  }, [userInput, captcha.code, onVerify, refreshCaptcha, isVerifying]);
  
  // 处理输入变化
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    // 只允许数字输入
    const value = e.target.value.replace(/[^0-9]/g, '');
    // 限制长度为6位
    if (value.length <= 6) {
      setUserInput(value);
    }
  }, []);
  
  // 处理键盘回车
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && userInput.length > 0) {
      handleVerify();
    }
  }, [userInput, handleVerify]);
  
  useEffect(() => {
    // 当组件挂载时刷新一次验证码
    refreshCaptcha();
    
    return () => {
      // 清理函数
    };
  }, [refreshCaptcha]);
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-medium mb-4 text-center text-slate-800 dark:text-white">
        请输入下方验证码
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {/* 验证码图片 */}
          <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg">
            <div 
              dangerouslySetInnerHTML={{ __html: captcha.svg }} 
              className="w-64 h-24 object-contain"
            />
          </div>
          
          {/* 刷新按钮 */}
          <button
            onClick={refreshCaptcha}
            disabled={isVerifying}
            className="p-2 bg-slate-200 dark:bg-slate-700 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
            aria-label="刷新验证码"
          >
            <i className="fa-solid fa-sync-alt"></i>
          </button>
        </div>
        
        {/* 输入框 */}
        <div>
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="请输入验证码"
            maxLength={6}
            className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
            disabled={isVerifying}
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            请输入图片中的{captcha.code.length}位数字
          </p>
        </div>
        
        {/* 验证按钮 */}
        <motion.button
          onClick={handleVerify}
          disabled={isVerifying || userInput.length !== captcha.code.length}
          whileHover={!isVerifying && userInput.length === captcha.code.length ? { scale: 1.02 } : undefined}
          whileTap={!isVerifying && userInput.length === captcha.code.length ? { scale: 0.98 } : undefined}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isVerifying ? (
            <>
              <i className="fa-solid fa-spinner fa-spin mr-2"></i>
              验证中...
            </>
          ) : (
            "验证"
          )}
        </motion.button>
      </div>
    </div>
  );
}