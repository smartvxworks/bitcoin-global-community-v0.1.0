// Utility Functions / 工具函数

import type { Language, Theme, ValidationResult } from '../types';
import { STORAGE_KEYS, VALIDATION_RULES, COUNTRIES } from '../constants';

// Storage utilities / 存储工具
export const storage = {
  get: <T = any>(key: string): T | null => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set: <T = any>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage set error:', error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage remove error:', error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }
};

// Theme utilities / 主题工具
export const theme = {
  getSystemTheme: (): Theme => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  },

  applyTheme: (theme: Theme): void => {
    const root = document.documentElement;
    const actualTheme = theme === 'system' ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light' : theme;
    
    root.classList.remove('light', 'dark');
    root.classList.add(actualTheme);
    root.setAttribute('data-theme', actualTheme);
  },

  getStoredTheme: (): Theme => {
    return storage.get<Theme>(STORAGE_KEYS.THEME) || 'system';
  },

  saveTheme: (theme: Theme): void => {
    storage.set(STORAGE_KEYS.THEME, theme);
  }
};

// Language utilities / 语言工具
export const language = {
  getStoredLanguage: (): Language => {
    return storage.get<Language>(STORAGE_KEYS.LANGUAGE) || 'zh-CN';
  },

  saveLanguage: (lang: Language): void => {
    storage.set(STORAGE_KEYS.LANGUAGE, lang);
  },

  getBrowserLanguage: (): Language => {
    const browserLang = navigator.language;
    const supportedLanguages = ['zh-CN', 'en-US', 'ja-JP', 'ko-KR', 'de-DE', 'fr-FR'];
    
    // Check exact match / 检查精确匹配
    if (supportedLanguages.includes(browserLang as any)) {
      return browserLang as Language;
    }
    
    // Check language code match / 检查语言代码匹配
    const langCode = browserLang.split('-')[0];
    const matchedLang = supportedLanguages.find(lang => lang.startsWith(langCode));
    
    return matchedLang as Language || 'zh-CN';
  }
};

// Validation utilities / 验证工具
export const validation = {
  validatePhone: (phone: string, t: (key: string, params?: Record<string, string | number>) => string, countryCode: string = 'CN'): ValidationResult => {
    const errors: Record<string, string> = {};
    const country = COUNTRIES.find(c => c.code === countryCode);
    
    if (!phone) {
      errors.phone = t('validation.phone_required');
    } else if (country && phone.length !== country.maxLength) {
      errors.phone = t('validation.phone_length', { length: country.maxLength });
    } else if (!VALIDATION_RULES.PHONE.PATTERN.test(phone)) {
      errors.phone = t('validation.phone_invalid');
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  },

  validatePassword: (password: string, t: (key: string, params?: Record<string, string | number>) => string): ValidationResult => {
    const errors: Record<string, string> = {};
    
    if (!password) {
      errors.password = t('validation.password_required');
    } else if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
      errors.password = t('validation.password_min_length', { min: VALIDATION_RULES.PASSWORD.MIN_LENGTH });
    } else if (password.length > VALIDATION_RULES.PASSWORD.MAX_LENGTH) {
      errors.password = t('validation.password_max_length', { max: VALIDATION_RULES.PASSWORD.MAX_LENGTH });
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  },

  validateEmail: (email: string, t: (key: string, params?: Record<string, string | number>) => string): ValidationResult => {
    const errors: Record<string, string> = {};
    
    if (!email) {
      errors.email = t('validation.email_required');
    } else if (!VALIDATION_RULES.EMAIL.PATTERN.test(email)) {
      errors.email = t('validation.email_invalid');
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  },

  validateVerificationCode: (code: string, t: (key: string, params?: Record<string, string | number>) => string): ValidationResult => {
    const errors: Record<string, string> = {};
    
    if (!code) {
      errors.code = t('validation.code_required');
    } else if (code.length !== VALIDATION_RULES.VERIFICATION_CODE.LENGTH) {
      errors.code = t('validation.code_length', { length: VALIDATION_RULES.VERIFICATION_CODE.LENGTH });
    } else if (!VALIDATION_RULES.VERIFICATION_CODE.PATTERN.test(code)) {
      errors.code = t('validation.code_invalid');
    }

    return { isValid: Object.keys(errors).length === 0, errors };
  }
};

// Password strength utilities / 密码强度工具
export const passwordStrength = {
  calculateStrength: (password: string): number => {
    let score = 0;
    
    if (!password) return score;
    
    // Length check / 长度检查
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Character variety checks / 字符多样性检查
    if (VALIDATION_RULES.PASSWORD.REQUIREMENTS.LOWERCASE.test(password)) score += 1;
    if (VALIDATION_RULES.PASSWORD.REQUIREMENTS.UPPERCASE.test(password)) score += 1;
    if (VALIDATION_RULES.PASSWORD.REQUIREMENTS.NUMBER.test(password)) score += 1;
    if (VALIDATION_RULES.PASSWORD.REQUIREMENTS.SPECIAL.test(password)) score += 1;
    
    return Math.min(score, 4);
  },

  getStrengthLabel: (score: number, t: (key: string, params?: Record<string, string | number>) => string): string => {
    const labels = [
      t('password_strength.weak'),
      t('password_strength.medium'),
      t('password_strength.strong'),
      t('password_strength.very_strong')
    ];
    return labels[score] || t('password_strength.weak');
  },

  getStrengthColor: (score: number): string => {
    const colors = ['red', 'orange', 'green', 'blue'];
    return colors[score] || 'red';
  }
};

// Formatting utilities / 格式化工具
export const formatting = {
  formatPhone: (phone: string, countryCode: string = 'CN'): string => {
    const country = COUNTRIES.find(c => c.code === countryCode);
    if (!country || !phone) return phone;
    
    // Add country code if not present / 如果不存在国家代码则添加
    if (!phone.startsWith('+')) {
      return `${country.dialCode} ${phone}`;
    }
    
    return phone;
  },

  formatDate: (date: Date | string, locale: string = 'zh-CN'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(dateObj);
  },

  formatTime: (date: Date | string, locale: string = 'zh-CN'): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat(locale, {
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  },

  formatNumber: (number: number, locale: string = 'zh-CN'): string => {
    return new Intl.NumberFormat(locale).format(number);
  },

  truncateText: (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }
};

// URL utilities / URL工具
export const url = {
  getQueryParam: (param: string): string | null => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  },

  setQueryParam: (param: string, value: string): void => {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.history.replaceState({}, '', url.toString());
  },

  removeQueryParam: (param: string): void => {
    const url = new URL(window.location.href);
    url.searchParams.delete(param);
    window.history.replaceState({}, '', url.toString());
  }
};

// Performance utilities / 性能工具
export const performance = {
  debounce: <T extends (...args: any[]) => void>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), wait);
    };
  },

  throttle: <T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ): ((...args: Parameters<T>) => void) => {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// Error handling utilities / 错误处理工具
export const error = {
  handleApiError: (error: any, t: (key: string, params?: Record<string, string | number>) => string): string => {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }
    
    if (error.message) {
      return error.message;
    }
    
    return t('error.unknown_error');
  },

  logError: (error: any, context?: string): void => {
    if (import.meta.env.DEV) {
      console.error(`[${context || 'Error'}]`, error);
    }
    // In production, you might want to send to error tracking service / 在生产环境中，可能需要发送到错误跟踪服务
  }
};

// Device detection utilities / 设备检测工具
export const device = {
  isMobile: (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },

  isTablet: (): boolean => {
    return /iPad|Android(?!.*Mobile)|Tablet/i.test(navigator.userAgent);
  },

  isDesktop: (): boolean => {
    return !device.isMobile() && !device.isTablet();
  },

  getScreenSize: (): 'sm' | 'md' | 'lg' | 'xl' | '2xl' => {
    const width = window.innerWidth;
    const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 };
    
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    return 'sm';
  }
};

// Export all utilities / 导出所有工具函数
export default {
  storage,
  theme,
  language,
  validation,
  passwordStrength,
  formatting,
  url,
  performance,
  error,
  device
};