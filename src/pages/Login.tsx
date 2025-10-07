
import { useState, useContext, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import DigitCaptcha from '@/components/DigitCaptcha';
import { testPhoneNumbers } from '@/lib/utils';
import { useI18n } from '@/hooks/useI18n';
import { useDebouncedValidation } from '@/hooks/useDebouncedValidation';

export default function Login() {
  const { t } = useI18n();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);

  const [captchaVerified, setCaptchaVerified] = useState(false);
  
  // 国家/地区代码数据
  const countryCodes = [
    { code: '+86', name: t('countries.china'), flag: '🇨🇳' },
    { code: '+1', name: t('countries.usa'), flag: '🇺🇸' },
    { code: '+44', name: t('countries.uk'), flag: '🇬🇧' },
    { code: '+61', name: t('countries.australia'), flag: '🇦🇺' },
    { code: '+81', name: t('countries.japan'), flag: '🇯🇵' },
    { code: '+49', name: t('countries.germany'), flag: '🇩🇪' },
    { code: '+33', name: t('countries.france'), flag: '🇫🇷' },
    { code: '+82', name: t('countries.korea'), flag: '🇰🇷' },
    { code: '+91', name: t('countries.india'), flag: '🇮🇳' },
    { code: '+7', name: t('countries.russia'), flag: '🇷🇺' },
    { code: '+65', name: t('countries.singapore'), flag: '🇸🇬' },
    { code: '+41', name: t('countries.switzerland'), flag: '🇨🇭' },
  ];
  
  const [selectedCountryCode, setSelectedCountryCode] = useState('+86');
  
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // 手机号验证
  const { 
    validationResult: phoneValidation, 
    debouncedValidate: validatePhone 
  } = useDebouncedValidation((value: string) => {
    // 支持国际手机号格式
    const cleanedPhone = value.replace(/\s/g, '');
    // 宽松验证：允许+开头，后跟1-3位国家代码和7-15位数字
    return /^\+?[1-9]\d{7,15}$/.test(cleanedPhone);
  }, 500);
  
  // 密码验证
  const { 
    validationResult: passwordValidation, 
    debouncedValidate: validatePassword 
  } = useDebouncedValidation((value: string) => {
    return value.length >= 6 && /[a-zA-Z]/.test(value) && /[0-9]/.test(value);
  }, 500);
  
  // 处理手机号变更
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (value.length > 0) {
      validatePhone(value);
    }
  }, [validatePhone]);
  
  // 处理密码变更
  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length > 0) {
      validatePassword(value);
    }
  }, [validatePassword]);
  

  
  // 表单提交处理
  const handleLoginSubmit = useCallback(async () => {
    if (!phone) {
      toast.error(t('login.enterPhone'));
      return;
    }
    
    if (!phoneValidation.isValid) {
      toast.error(t('login.enterValidPhone'));
      return;
    }
    
    if (!password) {
      toast.error(t('login.enterPassword'));
      return;
    }
    
    if (!passwordValidation.isValid) {
      toast.error(t('login.passwordMinLength'));
      return;
    }
     
    // 模拟登录请求
    setIsLoading(true);
    try {
      // 模拟API请求延迟
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // 模拟登录逻辑：第一次登录成功，第二次失败
      const isTestPhone = testPhoneNumbers.includes(phone.replace(/[^0-9]/g, ''));
      const isCorrectPassword = password === 'TestPassword123';
      
      if (isTestPhone && isCorrectPassword) {
        setIsAuthenticated(true);
        toast.success(t('login.success'));
        navigate('/');
      } else {
        // 登录失败，显示验证码
        setShowCaptcha(true);
        toast.error(t('login.failed'));
      }
    } catch (error) {
      toast.error(t('login.failed'));
      setShowCaptcha(true); // 登录失败时要求验证码
    } finally {
      setIsLoading(false);
    }
  }, [phone, password, phoneValidation, passwordValidation, setIsAuthenticated, navigate, t]);
  
  // 处理表单提交
  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleLoginSubmit();
  }, [handleLoginSubmit]);
  
  // 处理微信登录
  const handleWeChatLogin = useCallback(async () => {
    setIsLoading(true);
    try {
      // 模拟微信登录API请求
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsAuthenticated(true);
      toast.success(t('login.wechatSuccess'));
      navigate('/');
    } catch (error) {
      toast.error(t('login.wechatFailed'));
    } finally {
      setIsLoading(false);
    }
  }, [setIsAuthenticated, navigate]);
  
  // 表单是否有效
  const isFormValid = useCallback(() => {
    return phoneValidation.isValid && passwordValidation.isValid;
  }, [phoneValidation, passwordValidation]);
  
  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex flex-col items-center justify-start pt-12 p-4">
        {/* 网站Logo */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {t('app.name')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm sm:text-base">{t('app.tagline')}</p>
        </div>
        
        {/* 登录卡片 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform sm:scale-100"
        >
        <div className="p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-white">{t('login.title')}</h2>
          
          <form onSubmit={handleLogin} className="space-y-5">
            {/* 手机号输入框 */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('login.phone')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-phone text-blue-500"></i>
                </div>
                 <div className="flex items-center gap-2">
                   <select 
                     className="py-3 px-3 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                     value={selectedCountryCode}
                     onChange={(e) => setSelectedCountryCode(e.target.value)}
                   >
                     {countryCodes.map((country) => (
                       <option key={country.code} value={country.code}>
                         {country.flag} {country.code} {country.name}
                       </option>
                     ))}
                   </select>

                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder={t('login.phonePlaceholder')}
                      inputMode="numeric"
                      aria-label={t('login.phonePlaceholder')}
                      className={`flex-1 pl-4 pr-4 py-3 rounded-xl border ${
                        phoneValidation.isValid || phone === '' 
                          ? 'border-slate-300 dark:border-slate-600' 
                          : 'border-red-500 dark:border-red-500'
                      } bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                      required
                    />
                 </div>
              </div>
    {phone && !phoneValidation.isValid && (
      <p className="text-sm text-red-500 dark:text-red-400 flex items-center">
        <i className="fa-solid fa-exclamation-circle mr-1"></i>
        {t('login.phoneValidationError')}
      </p>
    )}
            </div>
            
            {/* 密码输入框 */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                {t('login.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fa-solid fa-lock text-blue-500"></i>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (e.target.value.length > 0) {
                      validatePassword(e.target.value);
                    }
                  }}
                  placeholder={t('login.passwordPlaceholder')}
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                    passwordValidation.isValid || password === '' 
                      ? 'border-slate-300 dark:border-slate-600' 
                      : 'border-red-500 dark:border-red-500'
                  } bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </button>
              </div>
              {password && !passwordValidation.isValid && (
                <p className="text-sm text-red-500 dark:text-red-400 flex items-center">
                  <i className="fa-solid fa-exclamation-circle mr-1"></i>
                  {t('login.passwordValidationError')}
                </p>
              )}
            </div>
            
            {/* 验证码区域 - 只在需要时显示 */}
            {showCaptcha && (
              <div className="mt-4 animate-fadeIn">
                <DigitCaptcha onVerify={(isValid) => {
                  setCaptchaVerified(isValid);
                  // 验证码验证成功后，不自动提交，让用户手动提交
                }} />
              </div>
            )}
            
            {/* 忘记密码链接 */}
            <div className="text-right">
              <Link 
                to="#" 
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/forgot-password');
                }}
              >
                {t('login.forgotPassword')}
              </Link>
            </div>
            
            {/* 登录按钮 */}
            <motion.button
              type="submit"
              disabled={isLoading || !isFormValid()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  {t('login.loggingIn')}
                </>
              ) : (
                t('login.loginButton')
              )}
            </motion.button>
            
            {/* 分隔线 */}
            <div className="relative flex items-center my-6">
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
              <span className="flex-shrink mx-4 text-slate-500 dark:text-slate-400 text-sm">{t('login.otherMethods')}</span>
              <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            
            {/* 微信快捷登录 */}
            <button
              type="button"
              onClick={handleWeChatLogin}
              disabled={isLoading}
              className="w-full py-3.5 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center"
            >
              <i className="fa-brands fa-weixin mr-2 text-lg"></i>
              {t('login.wechatLogin')}
            </button>
          </form>
          
          {/* 注册链接 */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 dark:text-slate-400">
              {t('login.noAccount')}{" "}
              <Link
                to="/register"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
               {t('login.registerNow')}
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
      
      {/* 页脚 */}
      <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p>{t('app.copyright')}</p>
      </div>
    </div>
  );
}