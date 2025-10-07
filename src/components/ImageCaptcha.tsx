import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// 图形验证码资源 - 不同类别和目标图形
// 移除随机ID生成函数，使用固定URL确保签名正确

// 图片集 - 使用picsum.photos作为稳定的图片源
const captchaImageSets = [
  {
    category: "动物",
    target: "猫",
    images: [
      { url: "https://picsum.photos/seed/cat1/200/200", isTarget: true },
      { url: "https://picsum.photos/seed/dog/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/bird/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/kitten/200/200", isTarget: true },
      { url: "https://picsum.photos/seed/rabbit/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/persian/200/200", isTarget: true },
      { url: "https://picsum.photos/seed/fish/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/hamster/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/siamese/200/200", isTarget: true },
    ]
  },
  {
    category: "交通工具",
    target: "汽车",
    images: [
      { url: "https://picsum.photos/seed/car1/200/200", isTarget: true },
      { url: "https://picsum.photos/seed/bicycle/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/plane/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/sedan/200/200", isTarget: true },
      { url: "https://picsum.photos/seed/ship/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/sports/200/200", isTarget: true },
      { url: "https://picsum.photos/seed/train/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/motorcycle/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/suv/200/200", isTarget: true },
    ]
  },
  {
    category: "食物",
    target: "水果",
    images: [
      { url: "https://picsum.photos/seed/apple/200/200", isTarget: true },
      { url: "https://picsum.photos/seed/bread/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/banana/200/200", isTarget: true },
      { url: "https://picsum.photos/seed/meat/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/orange/200/200", isTarget: true },
      { url: "https://picsum.photos/seed/pasta/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/grape/200/200", isTarget: true },
      { url: "https://picsum.photos/seed/vegetable/200/200", isTarget: false },
      { url: "https://picsum.photos/seed/strawberry/200/200", isTarget: true },
    ]
  }
];

interface ImageCaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export default function ImageCaptcha({ onVerify }: ImageCaptchaProps) {
  // 当前验证码集索引
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [captchaSet, setCaptchaSet] = useState(captchaImageSets[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [imageLoadCount, setImageLoadCount] = useState(0);
  const [showAlternativeVerification, setShowAlternativeVerification] = useState(false);
  const [imageLoadErrors, setImageLoadErrors] = useState(0); // 跟踪图片加载失败次数
  
  // 计算当前验证集中的目标图片数量
  const targetCount = useMemo(() => {
    return captchaSet.images.filter(img => img.isTarget).length;
  }, [captchaSet]);
  
  // 随机选择一个验证码集
  // 随机选择新的验证码集
  const generateNewCaptcha = useCallback(() => {
    setIsLoading(true);
    setIsVerified(null);
    setSelectedImages([]);
    setImageLoadCount(0);
    setImageLoadErrors(0); // 重置错误计数
    
    // 随机选择一个验证码集
    const randomIndex = Math.floor(Math.random() * captchaImageSets.length);
    setCurrentSetIndex(randomIndex);
    setCaptchaSet(captchaImageSets[randomIndex]);
  }, []);
  
  // 切换到下一个验证码集
  const nextCaptcha = useCallback(() => {
    setIsLoading(true);
    setIsVerified(null);
    setSelectedImages([]);
    setImageLoadCount(0);
    setImageLoadErrors(0); // 重置错误计数
    
    // 顺序选择下一个验证码集，循环显示
    const nextIndex = (currentSetIndex + 1) % captchaImageSets.length;
    setCurrentSetIndex(nextIndex);
    setCaptchaSet(captchaImageSets[nextIndex]);
  }, [currentSetIndex]);
  
  // 处理图片加载
  const handleImageLoad = useCallback(() => {
          setImageLoadCount(prev => {
            const newCount = prev + 1;
            // 检查所有图片是否已尝试加载（无论成功失败）
            if (newCount + imageLoadErrors >= captchaSet.images.length) {
              setIsLoading(false);
              
              // 如果有图片加载失败，检查是否需要显示备用验证
              if (imageLoadErrors > 0) {
                // 任何图片加载失败都记录并尝试刷新
                toast.error(`图片加载失败: ${imageLoadErrors} 张图片无法显示`);
                
                // 累计失败达到2张则显示备用验证
                if (imageLoadErrors >= 2) {
                  setShowAlternativeVerification(true);
                } else {
                  // 只在有少量失败时重试
                  setTimeout(generateNewCaptcha, 1500);
                }
              }
            }
            return newCount;
          });
  }, [captchaSet.images.length, imageLoadErrors, generateNewCaptcha]);
  
  // 初始化验证码
  useEffect(() => {
    generateNewCaptcha();
  }, [generateNewCaptcha]);
  
  // 处理图片选择
  const handleImageSelect = useCallback((index: number) => {
    if (isLoading || isVerified === true) return;
    
    setSelectedImages(prev => {
      // 如果已经选择了这张图片，则取消选择
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      
      // 最多选择3张图片
      if (prev.length < 3) {
        return [...prev, index];
      }
      
      return prev;
    });
  }, [isLoading, isVerified]);
  
  // 处理验证
  const handleVerify = useCallback(() => {
    if (isLoading || selectedImages.length !== 3) return;
    
    // 检查是否所有选中的图片都是目标图片
    const allTargetsSelected = selectedImages.every(index => 
      captchaSet.images[index].isTarget
    );
    
    setIsVerified(allTargetsSelected);
    onVerify(allTargetsSelected);
    
    if (allTargetsSelected) {
      toast.success("验证成功！");
    } else {
      toast.error("验证失败，请选择所有" + captchaSet.target);
    }
  }, [isLoading, selectedImages, captchaSet, onVerify]);
  
  // 检查是否可以验证
  const canVerify = useMemo(() => {
    return selectedImages.length === 3 && !isLoading && isVerified === null;
  }, [selectedImages.length, isLoading, isVerified]);
  
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-medium mb-4 text-center text-slate-800 dark:text-white">
        请选择所有{captchaSet.target}（共{targetCount}个）
      </h3>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 dark:text-slate-400">加载验证图片中...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* 图片选择区域 */}
          <div className="grid grid-cols-3 gap-4">
            {captchaSet.images.map((image, index) => (
              <motion.div
                key={index}
                className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                  selectedImages.includes(index) 
                    ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-105' 
                    : 'hover:scale-105 hover:shadow-md'
                } ${isVerified === true 
                  ? image.isTarget ? 'ring-2 ring-green-500' : '' 
                  : ''
                } ${isVerified === false 
                  ? selectedImages.includes(index) && !image.isTarget ? 'ring-2 ring-red-500' : '' 
                  : ''
                }`}
                onClick={() => handleImageSelect(index)}
              >
                <div className="aspect-square bg-slate-100 dark:bg-slate-700">
                  <img 
                    src={image.url} 
                    alt={`Verification image ${index + 1}`}
                    className="w-full h-full object-cover"
                    onLoad={handleImageLoad}
                    onError={() => {
                      setImageLoadErrors(prev => {
                        const newErrorCount = prev + 1;
                        return newErrorCount;
                      });
                    }}
                  />
                  
                  {/* 选择状态指示 */}
                  {selectedImages.includes(index) && (
                    <div className="absolute inset-0 bg-blue-500/30 flex items-center justify-center">
                      <i className="fa-solid fa-check text-white text-xl"></i>
                    </div>
                  )}
                  
                  {/* 验证结果指示 */}
                  {isVerified === true && image.isTarget && !selectedImages.includes(index) && (
                    <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center">
                      <i className="fa-solid fa-check text-white text-xl"></i>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* 操作按钮区域 */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              {isVerified === null ? (
                <>已选择 {selectedImages.length}/3 张图片，请选择所有{captchaSet.target}</>
              ) : isVerified === true ? (
                <span className="text-green-600 dark:text-green-400 flex items-center">
                  <i className="fa-solid fa-check-circle mr-1"></i> 验证成功
                </span>
              ) : (
                <span className="text-red-600 dark:text-red-400 flex items-center">
                  <i className="fa-solid fa-times-circle mr-1"></i> 验证失败，请选择所有{captchaSet.target}
                </span>
              )}
            </div>
            
             <div className="flex gap-3">
               <button 
                 onClick={nextCaptcha}
                 disabled={isLoading}
                 className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
               >
                 下一个验证
               </button>
               <button 
                 onClick={generateNewCaptcha}
                 disabled={isLoading}
                 className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
               >
                 换一组
               </button>
               <button
                 onClick={handleVerify}
                 disabled={!canVerify || isLoading}
                 className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 验证
               </button>
             </div>
          </div>
        </div>
      )}
      
      {/* 备用验证方式 - 当图片加载失败次数过多时显示 */}
      {showAlternativeVerification && (
        <div className="absolute inset-0 bg-white dark:bg-slate-800 flex flex-col items-center justify-center p-6 z-10 rounded-xl">
          <i className="fa-solid fa-exclamation-triangle text-4xl text-orange-500 mb-4"></i>
          <h3 className="text-xl font-bold mb-2">图片验证失败</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-center">
            无法加载验证图片，请尝试其他验证方式
          </p>
          <button 
            onClick={() => {
              // 这里可以实现短信验证或其他验证方式
              toast.info("已切换到短信验证方式");
              setShowAlternativeVerification(false);
              setImageLoadErrors(0);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            使用短信验证码验证
          </button>
        </div>
      )}
    </div>
  );
}