import { describe, expect, test, beforeEach, afterEach, jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import Login from './Login';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => {
  const actual: any = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock dependencies
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn()
  }
}));

// Mock useI18n hook
jest.mock('@/hooks/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
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
        'app.tagline': '学习比特币知识的最佳选择',
        'app.copyright': '© 2025 Bitcoin全球社区. 保留所有权利.',
        'validation.invalidFormat': '格式无效',
      };
      return translations[key] || key;
    }
  })
}));

// Mock DigitCaptcha component
jest.mock('@/components/DigitCaptcha', () => ({
  __esModule: true,
  default: ({ onVerify }: { onVerify: (isValid: boolean) => void }) => (
    <div data-testid="digit-captcha">
      DigitCaptcha Mock
      <button 
        data-testid="captcha-verify-button"
        type="button"
        onClick={() => onVerify(true)}
      >
        验证
      </button>
    </div>
  )
}));

// Mock useDebouncedValidation hook
jest.mock('@/hooks/useDebouncedValidation', () => ({
  useDebouncedValidation: (validator: (value: string) => boolean, delay: number) => ({
    validationResult: { isValid: true, message: '' },
    debouncedValidate: (value: string) => {
      const isValid = validator(value);
      return () => {}; // 返回清理函数
    }
  })
}));

// Mock testPhoneNumbers
jest.mock('@/lib/utils', () => ({
  testPhoneNumbers: ['13800138000', '13900139000', '15000150000']
}));


describe('Login Component', () => {
  const mockSetIsAuthenticated = jest.fn();
  
  const renderWithProviders = () => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={{ isAuthenticated: false, setIsAuthenticated: mockSetIsAuthenticated, logout: jest.fn() }}>
          <Login />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });
  
  afterEach(() => {
    jest.useRealTimers();
  });
  
  test('renders login form correctly', () => {
    renderWithProviders();
    
    expect(screen.getByLabelText(/手机号/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/密码/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^登录$/i })).toBeInTheDocument();
    expect(screen.getByText(/忘记密码/i)).toBeInTheDocument();
    expect(screen.getByText(/没有账号/i)).toBeInTheDocument();
  });
  
  test('shows validation errors for invalid inputs', async () => {
    renderWithProviders();
    
    // 等待表单加载完成
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^登录$/i })).toBeInTheDocument();
    });
    
    // 尝试提交空表单
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^登录$/i }));
    });
    
    // 检查是否显示了手机号验证错误
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('login.enterPhone');
    });
  });
  
  test('handles successful login', async () => {
    renderWithProviders();
    
    // 等待表单加载完成
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^登录$/i })).toBeInTheDocument();
    });
    
    // 填写有效的凭据
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/手机号/i), {
        target: { value: '13800138000' }
      });
      fireEvent.change(screen.getByLabelText(/密码/i), {
        target: { value: 'TestPassword123' }
      });
    });
    
    // 等待验证完成
    await act(async () => {
      jest.advanceTimersByTime(600);
    });
    
    // 提交表单
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^登录$/i }));
    });
    
    // 检查加载状态
    await waitFor(() => {
      expect(screen.getByText(/登录中/i)).toBeInTheDocument();
    });
    
    // 快进时间
    await act(async () => {
      jest.advanceTimersByTime(1200);
    });
    
    // 检查成功toast和认证状态变化
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('login.success');
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
  
  test('handles login failure', async () => {
    renderWithProviders();
    
    // Fill credentials with wrong password (first login attempt - no captcha needed)
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/手机号/i), {
        target: { value: '13800138000' }
      });
      fireEvent.change(screen.getByLabelText(/密码/i), {
        target: { value: 'WrongPassword123' }
      });
    });
    
    // Wait for validation to complete (500ms debounce)
    await act(async () => {
      jest.advanceTimersByTime(600);
    });
    
    // Wait for the component to be ready for login
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /^登录$/i })).not.toBeDisabled();
    });
    
    // First login attempt (should fail and show captcha)
    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /^登录$/i }));
    });
    
    // Fast-forward time for login request
    await act(async () => {
      jest.advanceTimersByTime(1200);
    });
    
    // Check error toast for login failure and captcha should be shown
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('登录失败：用户名或密码不正确，请重试');
      // After failure, captcha should be displayed
      expect(screen.getByTestId('digit-captcha')).toBeInTheDocument();
    });
  });
  
  test('navigates to register page', async () => {
    renderWithProviders();
    
    // 检查注册链接是否存在且指向正确的路径
    const registerLink = screen.getByText(/立即注册/i).closest('a');
    expect(registerLink).toHaveAttribute('href', '/register');
  });
  
  test('navigates to forgot password page', () => {
    renderWithProviders();
    
    fireEvent.click(screen.getByText(/忘记密码/i));
    
    expect(mockNavigate).toHaveBeenCalledWith('/forgot-password');
  });
});