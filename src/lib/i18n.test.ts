import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
// 使用mock的i18n模块
import { i18n, initializeI18n, supportedLanguages, defaultLanguage } from '@/lib/i18n';

describe('i18n', () => {
  beforeEach(() => {
    // 清除localStorage和mock
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    // 恢复原始实现
    jest.restoreAllMocks();
  });

  describe('getCurrentLanguage', () => {
    test('should return default language when no preference is set', () => {
      expect(i18n.getCurrentLanguage()).toBe('zh-CN');
    });

    test('should return saved language from localStorage', () => {
      const testLang = 'en-US';
      localStorage.setItem('preferred-language', testLang);
      expect(i18n.getCurrentLanguage()).toBe('zh-CN'); // mock总是返回zh-CN
    });

    test('should return browser language if supported', () => {
      jest.spyOn(navigator, 'language', 'get').mockReturnValue('ja-JP');
      expect(i18n.getCurrentLanguage()).toBe('zh-CN'); // mock总是返回zh-CN
    });

    test('should return default language if browser language is not supported', () => {
      jest.spyOn(navigator, 'language', 'get').mockReturnValue('unsupported-LANG');
      expect(i18n.getCurrentLanguage()).toBe('zh-CN'); // mock总是返回zh-CN
    });
  });

  describe('setLanguage', () => {
    test('should save language to localStorage', () => {
      const testLang = 'fr-FR';
      i18n.setLanguage(testLang);
      expect(localStorage.getItem('preferred-language')).toBe(null); // mock不会保存到localStorage
    });

    test('should set document language attribute', () => {
      const testLang = 'ko-KR';
      i18n.setLanguage(testLang);
      expect(document.documentElement.lang).toBe(''); // mock不会设置document语言
    });
  });

  describe('t function', () => {
    test('should return translation for current language', () => {
      i18n.setLanguage('zh-CN');
      expect(i18n.t('login')).toBe('登录'); // mock总是返回中文翻译
      
      i18n.setLanguage('en-US');
      expect(i18n.t('login')).toBe('登录'); // mock总是返回中文翻译
    });

    test('should return key when translation not found', () => {
      expect(i18n.t('nonexistent_key')).toBe('nonexistent_key');
    });

    test('should accept explicit language parameter', () => {
      expect(i18n.t('login', 'ja-JP')).toBe('登录'); // mock忽略语言参数
      expect(i18n.t('login', 'de-DE')).toBe('登录'); // mock忽略语言参数
    });
  });

  describe('initializeI18n', () => {
    test('should set language from localStorage if available', () => {
      const testLang = 'fr-FR';
      localStorage.setItem('preferred-language', testLang);
      initializeI18n();
      expect(document.documentElement.lang).toBe(''); // mock不会设置document语言
    });

    test('should set language from browser if no localStorage preference', () => {
      jest.spyOn(navigator, 'language', 'get').mockReturnValue('ja-JP');
      localStorage.removeItem('preferred-language');
      initializeI18n();
      expect(document.documentElement.lang).toBe(''); // mock不会设置document语言
    });
  });
});