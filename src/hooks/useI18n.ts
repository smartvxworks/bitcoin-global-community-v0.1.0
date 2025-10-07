import { useState, useEffect, useCallback } from 'react';
import { i18n, Language, supportedLanguages } from '@/lib/i18n';

export const useI18n = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(i18n.getCurrentLanguage());
  const [version, setVersion] = useState(0); // 用于强制重新渲染

  useEffect(() => {
    // 监听语言变化
    const handleLanguageChange = (e?: Event) => {
      const newLang = i18n.getCurrentLanguage();
      setCurrentLanguage(newLang);
      setVersion(v => v + 1); // 强制重新渲染
    };

    // 监听storage变化（其他标签页修改语言）
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'preferred-language' && e.newValue) {
        handleLanguageChange();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('languageChanged', handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const changeLanguage = useCallback((lang: Language) => {
    i18n.setLanguage(lang);
    setCurrentLanguage(lang);
    setVersion(v => v + 1); // 强制重新渲染
    
    // 触发自定义事件通知其他组件
    window.dispatchEvent(new Event('languageChanged'));
  }, []);

  const t = useCallback((key: string, params?: Record<string, string | number>) => {
    // 直接使用 i18n 实例的 t 方法，避免循环依赖
    let text = i18n.t(key, currentLanguage);
    
    // 处理参数替换
    if (params) {
      Object.keys(params).forEach(param => {
        text = text.replace(`{${param}}`, String(params[param]));
      });
    }
    
    return text;
  }, [currentLanguage, version]); // 依赖version确保重新渲染时更新

  return {
    currentLanguage,
    supportedLanguages,
    changeLanguage,
    t,
    version
  };
};