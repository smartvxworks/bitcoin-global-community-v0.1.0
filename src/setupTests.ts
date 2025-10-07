import '@testing-library/jest-dom';
import React from 'react';
if (typeof (window as any).scrollTo === 'function') {
  jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
} else {
  (window as any).scrollTo = jest.fn();
}
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});
if (!(window as any).scrollTo) {
  (window as any).scrollTo = jest.fn();
}
/**
 * jsdom 未实现 scrollTo，在测试环境中全局 mock
 */
if (!(window as any).scrollTo) {
  (window as any).scrollTo = jest.fn();
}

// Global mock for react-router-dom useNavigate to ensure consistent navigation behavior in tests
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => jest.fn(),
  };
});

// Mock TextEncoder/TextDecoder for React Router
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock for Vite's import.meta.env
Object.defineProperty(global, 'import', {
  value: {
    meta: {
      env: {
        MODE: 'test',
        VITE_API_URL: 'http://localhost:3001',
        VITE_APP_TITLE: 'Bitcoin China Community Test',
        DEV: true,
      },
    },
  },
  writable: true,
  configurable: true,
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => true,
  }),
});

// Mock ResizeObserver
(global as any).ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock localStorage for i18n
const localStorageMock = {
  getItem: jest.fn(() => 'zh-CN'),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};
global.localStorage = localStorageMock as Storage;

// Mock i18n for testing
jest.mock('@/lib/i18n', () => ({
  i18n: {
    getCurrentLanguage: jest.fn(() => 'zh-CN'),
    setLanguage: jest.fn(),
    t: jest.fn((key: string) => {
      const translations: { [key: string]: string } = {
        'login': '登录',
        'register': '注册',
        'courses': '课程',
        'tutorials': '教程',
        'community': '社区',
        'help': '帮助',
        'faq': '常见问题',
        'contact': '联系我们',
        'privacy': '隐私政策',
        'home': '首页',
        'logout': '退出登录',
        'auth.logout': '退出登录',
        'logout_success': '退出登录成功',
        'nav.home': '首页',
        'nav.courses': '课程',
        'nav.tutorials': '教程',
        'nav.community': '社区',
        'phone': '手机号',
        'verification_code': '验证码',
        'get_code': '获取验证码',
        'set_password': '设置密码',
        'confirm_password': '确认密码',
        'account_register': '账户注册',
        'slogan': '学习比特币知识的最佳选择',
        'country': '国家/地区',
        'processing': '处理中...',
        'already_have_account': '已有账号？',
        'login_now': '立即登录',
        'register_now': '立即注册',
        'registering': '注册中，请稍候...',
        'view_details': '查看详情',
        'close_menu': '关闭菜单',
        'open_menu': '打开菜单',
        'login.title': '登录',
        'login.phone': '手机号',
        'login.password': '密码',
        'login.forgotPassword': '忘记密码？',
        'login.rememberMe': '记住我',
        'login.submit': '登录',
        'login.noAccount': '没有账号？',
        'login.registerNow': '立即注册',
        'login.enterPhone': '请输入手机号',
        'login.enterValidPhone': '请输入有效的手机号',
        'login.enterPassword': '请输入密码',
        'login.passwordMinLength': '密码长度不能少于6位',
        'login.completeCaptcha': '请完成验证码验证',
        'login.success': '登录成功',
        'login.failed': '登录失败：用户名或密码不正确，请重试',
        'login.loggingIn': '登录中',
        'login.loginButton': '登录',
        'login.otherMethods': '其他登录方式',
        'login.wechatLogin': '微信快捷登录',
        'login.wechatSuccess': '微信登录成功',
        'login.wechatFailed': '微信登录失败',
        'login.phoneValidationError': '请输入有效的手机号',
        'login.passwordValidationError': '密码长度不能少于6位',
        'login.phonePlaceholder': '请输入手机号',
        'login.passwordPlaceholder': '请输入密码',
        'countries.china': '中国',
        'countries.usa': '美国',
        'countries.uk': '英国',
        'countries.australia': '澳大利亚',
        'countries.japan': '日本',
        'countries.germany': '德国',
        'countries.france': '法国',
        'countries.korea': '韩国',
        'countries.india': '印度',
        'countries.russia': '俄罗斯',
        'countries.singapore': '新加坡',
        'countries.switzerland': '瑞士',
        'app.name': 'Bitcoin全球社区',
        'app.community': '社区',
        'validation.invalidFormat': '格式无效',
      };
      return translations[key] || key;
    }),
  },
  supportedLanguages: ['zh-CN', 'en-US', 'ja-JP', 'ko-KR', 'de-DE', 'fr-FR'],
  defaultLanguage: 'zh-CN',
  languageNames: {
    'zh-CN': '简体中文',
    'en-US': 'English',
    'ja-JP': '日本語',
    'ko-KR': '한국어',
    'de-DE': 'Deutsch',
    'fr-FR': 'Français',
  },
  initializeI18n: jest.fn(),
}));

// Mock useI18n hook
jest.mock('@/hooks/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        'login.title': '登录',
        // Navigation and common
        'nav.home': '首页',
        'nav.courses': '课程',
        'nav.tutorials': '教程',
        'nav.community': '社区',
        'logout': '退出登录',
        'auth.logout': '退出登录',
        'logout_success': '退出登录成功',
        // Community page keys
        'community.title': '社区讨论',
        'community.subtitle': '与全球比特币爱好者交流最新话题',
        'community.newTopic': '发布新话题',
        'community.topicPlaceholder': '请输入你想讨论的话题...',
        'community.publishTopic': '发布话题',
        'community.latestDiscussions': '最新讨论',
        'community.latest': '最新',
        'community.popular': '热门',
        'community.unanswered': '未回答',
        'login.phone': '手机号',
        'login.password': '密码',
        'login.forgotPassword': '忘记密码？',
        'login.rememberMe': '记住我',
        'login.submit': '登录',
        'login.noAccount': '没有账号？',
        'login.registerNow': '立即注册',
        'login.enterPhone': '请输入手机号',
        'login.enterValidPhone': '请输入有效的手机号',
        'login.enterPassword': '请输入密码',
        'login.passwordMinLength': '密码长度不能少于6位',
        'login.completeCaptcha': '请完成验证码验证',
        'login.success': '登录成功',
        'login.failed': '登录失败：用户名或密码不正确，请重试',
        'login.loggingIn': '登录中',
        'login.loginButton': '登录',
        'login.otherMethods': '其他登录方式',
        'login.wechatLogin': '微信快捷登录',
        'login.wechatSuccess': '微信登录成功',
        'login.wechatFailed': '微信登录失败',
        'login.phoneValidationError': '请输入有效的手机号',
        'login.passwordValidationError': '密码长度不能少于6位',
        'login.phonePlaceholder': '请输入手机号',
        'login.passwordPlaceholder': '请输入密码',
        'countries.china': '中国',
        'countries.usa': '美国',
        'countries.uk': '英国',
        'countries.australia': '澳大利亚',
        'countries.japan': '日本',
        'countries.germany': '德国',
        'countries.france': '法国',
        'countries.korea': '韩国',
        'countries.india': '印度',
        'countries.russia': '俄罗斯',
        'countries.singapore': '新加坡',
        'countries.switzerland': '瑞士',
        'app.name': 'Bitcoin全球社区',
        'app.tagline': '学习比特币知识的最佳选择',
        'app.copyright': '© 2025 Bitcoin全球社区. 保留所有权利.',
        'validation.invalidFormat': '格式无效',
      };
      return translations[key] || key;
    },
    currentLanguage: 'zh-CN',
    supportedLanguages: ['zh-CN', 'en-US', 'ja-JP', 'ko-KR', 'de-DE', 'fr-FR'],
    changeLanguage: jest.fn(),
    version: 0,
  }),
}));

// Mock DigitCaptcha component
jest.mock('@/components/DigitCaptcha', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ onVerify }: { onVerify: (isValid: boolean) => void }) => {
      const handleVerify = () => {
        console.log('DigitCaptcha mock: onVerify called with true');
        onVerify(true);
      };
      
      return React.createElement('div', { 
        'data-testid': 'digit-captcha' 
      }, [
        'DigitCaptcha Mock',
        React.createElement('button', {
          key: 'verify-button',
          type: 'button',
          onClick: handleVerify,
          'data-testid': 'captcha-verify-button'
        }, '验证')
      ]);
    },
  };
});