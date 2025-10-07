// Application Constants / 应用常量

// Internationalization constants / 国际化常量
export const SUPPORTED_LANGUAGES = ['zh-CN', 'en-US', 'ja-JP', 'ko-KR', 'de-DE', 'fr-FR'] as const;
export const DEFAULT_LANGUAGE = 'zh-CN' as const;

export const LANGUAGE_NAMES = {
  'zh-CN': '简体中文',
  'en-US': 'English',
  'ja-JP': '日本語',
  'ko-KR': '한국어',
  'de-DE': 'Deutsch',
  'fr-FR': 'Français'
} as const;

// Theme constants / 主题常量
export const THEMES = ['light', 'dark', 'system'] as const;
export const DEFAULT_THEME = 'system' as const;

// Application configuration / 应用配置
export const APP_CONFIG = {
  name: 'BTC Learning Platform',
  version: '1.0.0',
  description: '全球比特币学习平台',
  baseUrl: import.meta.env.VITE_APP_BASE_URL || '/',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  environment: import.meta.env.MODE || 'development'
} as const;

// API endpoints / API端点
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh'
  },
  TUTORIALS: {
    LIST: '/tutorials',
    DETAIL: '/tutorials/:id',
    CREATE: '/tutorials',
    UPDATE: '/tutorials/:id',
    DELETE: '/tutorials/:id'
  },
  COURSES: {
    LIST: '/courses',
    DETAIL: '/courses/:id',
    ENROLL: '/courses/:id/enroll'
  },
  COMMUNITY: {
    TOPICS: '/community/topics',
    TOPIC_DETAIL: '/community/topics/:id',
    REPLIES: '/community/topics/:id/replies'
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/profile'
  }
} as const;

// Form validation constants / 表单验证常量
export const VALIDATION_RULES = {
  PHONE: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 15,
    PATTERN: /^\+?[\d\s\-\(\)]+$/
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
    REQUIREMENTS: {
      LOWERCASE: /[a-z]/,
      UPPERCASE: /[A-Z]/,
      NUMBER: /\d/,
      SPECIAL: /[!@#$%^&*(),.?":{}|<>]/
    }
  },
  VERIFICATION_CODE: {
    LENGTH: 6,
    PATTERN: /^\d{6}$/
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  }
} as const;

// Password strength configuration / 密码强度配置
export const PASSWORD_STRENGTH_CONFIG = {
  weak: { score: 0, color: 'red', label: '弱' },
  medium: { score: 1, color: 'orange', label: '中' },
  strong: { score: 2, color: 'green', label: '强' },
  very_strong: { score: 3, color: 'blue', label: '非常强' }
} as const;

// Country codes and phone formats / 国家代码和电话格式
export const COUNTRIES = [
  { code: 'CN', name: '中国', dialCode: '+86', maxLength: 11 },
  { code: 'US', name: '美国', dialCode: '+1', maxLength: 10 },
  { code: 'JP', name: '日本', dialCode: '+81', maxLength: 10 },
  { code: 'KR', name: '韩国', dialCode: '+82', maxLength: 11 },
  { code: 'DE', name: '德国', dialCode: '+49', maxLength: 11 },
  { code: 'FR', name: '法国', dialCode: '+33', maxLength: 9 },
  { code: 'GB', name: '英国', dialCode: '+44', maxLength: 10 },
  { code: 'AU', name: '澳大利亚', dialCode: '+61', maxLength: 9 },
  { code: 'CA', name: '加拿大', dialCode: '+1', maxLength: 10 },
  { code: 'SG', name: '新加坡', dialCode: '+65', maxLength: 8 }
] as const;

// Tutorial categories / 教程分类
export const TUTORIAL_CATEGORIES = [
  { id: 'security', name: '安全', color: 'red' },
  { id: 'trading', name: '交易', color: 'green' },
  { id: 'technology', name: '技术', color: 'blue' },
  { id: 'investment', name: '投资', color: 'purple' }
] as const;

// Difficulty levels / 难度级别
export const DIFFICULTY_LEVELS = [
  { id: 'beginner', name: '入门', color: 'green' },
  { id: 'intermediate', name: '中级', color: 'orange' },
  { id: 'advanced', name: '高级', color: 'red' }
] as const;

// UI constants / UI常量
export const UI_CONSTANTS = {
  BREAKPOINTS: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  },
  ANIMATION_DURATION: {
    fast: 150,
    normal: 300,
    slow: 500
  },
  Z_INDEX: {
    dropdown: 1000,
    sticky: 1020,
    modal: 1030,
    popover: 1040,
    tooltip: 1050
  }
} as const;

// Error messages / 错误消息
export const ERROR_MESSAGES = {
  NETWORK: '网络连接失败，请检查网络设置',
  TIMEOUT: '请求超时，请稍后重试',
  UNAUTHORIZED: '未授权访问，请重新登录',
  FORBIDDEN: '权限不足，无法访问该资源',
  NOT_FOUND: '请求的资源不存在',
  SERVER_ERROR: '服务器内部错误',
  VALIDATION_ERROR: '输入数据验证失败'
} as const;

// Success messages / 成功消息
export const SUCCESS_MESSAGES = {
  REGISTER: '注册成功！欢迎使用我们的平台',
  LOGIN: '登录成功',
  LOGOUT: '已成功退出登录',
  UPDATE: '更新成功',
  DELETE: '删除成功'
} as const;

// Local storage keys / 本地存储键名
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_INFO: 'user_info',
  LANGUAGE: 'language',
  THEME: 'theme',
  SIDEBAR_STATE: 'sidebar_state'
} as const;

// Feature flags / 功能标志
export const FEATURE_FLAGS = {
  ENABLE_REGISTRATION: true,
  ENABLE_COMMUNITY: true,
  ENABLE_PAYMENTS: false,
  ENABLE_ADMIN_PANEL: false,
  ENABLE_ANALYTICS: import.meta.env.PROD
} as const;