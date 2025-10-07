import { useState, useContext, useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import DigitCaptcha from '@/components/DigitCaptcha';
import { useI18n } from '@/hooks/useI18n';

export default function Register() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useI18n();
  
  const [formData, setFormData] = useState({
    phoneNumber: '',
    verificationCode: '',
    password: '',
    confirmPassword: '',
    countryCode: '+86'
  });
  
  const [uiState, setUiState] = useState({
    isLoading: false,
    showPassword: false,
    showConfirmPassword: false,
    countdown: 0,
    captchaVerified: false,
    passwordsMatch: true
  });
  
  const countdownRef = useRef<number | null>(null);
  const generatedCodeRef = useRef<string>('');

  // 国家区号配置
  const countryCodes = [
    { code: '+86', name: t('china'), flag: '🇨🇳', pattern: /^1[3-9]\d{9}$/, maxLength: 11, placeholder: '13800138000' },
    { code: '+1', name: t('usa'), flag: '🇺🇸', pattern: /^\d{10}$/, maxLength: 10, placeholder: '4155551234' },
    { code: '+44', name: t('uk'), flag: '🇬🇧', pattern: /^\d{10,11}$/, maxLength: 11, placeholder: '7911123456' }
  ];

  // 清理定时器
  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  // 密码匹配检查
  useEffect(() => {
    setUiState(prev => ({
      ...prev,
      passwordsMatch: formData.password === formData.confirmPassword || !formData.confirmPassword
    }));
  }, [formData.password, formData.confirmPassword]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const sendVerificationCode = async () => {
    if (uiState.countdown > 0) return;
    
    if (!formData.phoneNumber) {
      toast.error(t('enter_phone'));
      return;
    }

    const selectedCountry = countryCodes.find(c => c.code === formData.countryCode);
    if (selectedCountry && !selectedCountry.pattern.test(formData.phoneNumber)) {
      toast.error(t('enter_valid_phone'));
      return;
    }

    setUiState(prev => ({ ...prev, isLoading: true }));

    try {
      // 模拟发送验证码
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 生成6位验证码
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      generatedCodeRef.current = code;
      
      // 开始倒计时
      setUiState(prev => ({ ...prev, countdown: 60, isLoading: false }));
      
      countdownRef.current = window.setInterval(() => {
        setUiState(prev => {
          if (prev.countdown <= 1) {
            if (countdownRef.current) clearInterval(countdownRef.current);
            return { ...prev, countdown: 0 };
          }
          return { ...prev, countdown: prev.countdown - 1 };
        });
      }, 1000);

      // 开发环境显示验证码
      if (process.env.NODE_ENV === 'development') {
        toast.success(`${t('code_sent_test')}: ${code}`);
      } else {
        toast.success(t('code_sent'));
      }
    } catch (error) {
      toast.error(t('send_code_failed'));
      setUiState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (uiState.isLoading) return;

    // 基本验证
    if (!formData.phoneNumber || !formData.verificationCode || !formData.password) {
      toast.error(t('fill_all_fields'));
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error(t('passwords_do_not_match'));
      return;
    }

    if (formData.verificationCode !== generatedCodeRef.current) {
      toast.error(t('incorrect_verification_code'));
      return;
    }

    if (!uiState.captchaVerified) {
      toast.error(t('complete_captcha'));
      return;
    }

    setUiState(prev => ({ ...prev, isLoading: true }));

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(t('register_success'));
      navigate('/');
    } catch (error) {
      toast.error(t('register_failed'));
    } finally {
      setUiState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const togglePasswordVisibility = (field: 'password' | 'confirmPassword') => {
    setUiState(prev => ({
      ...prev,
      [field === 'password' ? 'showPassword' : 'showConfirmPassword']: 
      !prev[field === 'password' ? 'showPassword' : 'showConfirmPassword']
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              {t('platform_name')}
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">{t('create_account')}</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* 国家区号和手机号 */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('country_code')}
                </label>
                <select
                  value={formData.countryCode}
                  onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                >
                  {countryCodes.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="col-span-2">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('phone_number')}
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange('phoneNumber')}
                  placeholder={t('enter_phone_number')}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>
            </div>

            {/* 验证码 */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {t('verification_code')}
                </label>
                <input
                  type="text"
                  id="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleInputChange('verificationCode')}
                  placeholder={t('enter_verification_code')}
                  maxLength={6}
                  className="w-full p-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
              </div>
              
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={sendVerificationCode}
                  disabled={uiState.countdown > 0 || uiState.isLoading}
                  className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                  {uiState.countdown > 0 ? `${uiState.countdown}s` : t('get_code')}
                </button>
              </div>
            </div>

            {/* 密码 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('password')}
              </label>
              <div className="relative">
                <input
                  type={uiState.showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  placeholder={t('enter_password')}
                  className="w-full p-3 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <i className={`fa-solid ${uiState.showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {/* 确认密码 */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {t('confirm_password')}
              </label>
              <div className="relative">
                <input
                  type={uiState.showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange('confirmPassword')}
                  placeholder={t('confirm_password')}
                  className="w-full p-3 pr-10 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <i className={`fa-solid ${uiState.showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {!uiState.passwordsMatch && formData.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{t('passwords_do_not_match')}</p>
              )}
            </div>

            {/* 滑块验证码 */}
            <div className="mt-4">
              <DigitCaptcha onVerify={(verified) => setUiState(prev => ({ ...prev, captchaVerified: verified }))} />
            </div>

            {/* 注册按钮 */}
            <button
              type="submit"
              disabled={uiState.isLoading || !uiState.captchaVerified || !uiState.passwordsMatch}
              className="w-full p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {uiState.isLoading ? (
                <span className="flex items-center justify-center">
                  <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                  {t('registering')}
                </span>
              ) : (
                t('register')
              )}
            </button>

            {/* 登录链接 */}
            <div className="text-center mt-4">
              <p className="text-slate-600 dark:text-slate-400">
                {t('already_have_account')}{' '}
                <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
                  {t('login_now')}
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}