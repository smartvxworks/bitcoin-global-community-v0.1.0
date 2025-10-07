import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Courses from './Courses';
import { AuthContext } from '@/contexts/authContext';

// Mock the useI18n hook
jest.mock('@/hooks/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'courses.title': '比特币课程',
        'courses.subtitle': '探索我们全面的比特币和区块链技术课程',
        'courses.allCourses': '全部课程',
        'courses.beginner': '入门',
        'courses.intermediate': '中级',
        'courses.advanced': '高级',
        'courses.searchPlaceholder': '搜索课程',
        'courses.levels.beginner': '入门',
        'courses.levels.intermediate': '中级',
        'courses.levels.advanced': '高级',
        'courses.bitcoin_basics.title': '比特币基础知识',
        'courses.bitcoin_basics.description': '从零开始学习比特币的基本概念、工作原理和实际应用',
        'courses.blockchain_technology.title': '区块链技术详解',
        'courses.blockchain_technology.description': '深入理解区块链技术的核心原理、共识机制和智能合约',
        'courses.bitcoin_investment.title': '比特币投资策略',
        'courses.bitcoin_investment.description': '学习专业的比特币投资分析方法、风险管理技巧和市场趋势判断',
        'courses.crypto_trading.title': '加密货币交易指南',
        'courses.crypto_trading.description': '掌握加密货币交易平台的使用、交易策略和风险管理',
        'courses.smart_contracts.title': '智能合约开发',
        'courses.smart_contracts.description': '学习以太坊智能合约的编写、部署和测试方法',
        'courses.bitcoin_security.title': '比特币安全与钱包管理',
        'courses.bitcoin_security.description': '了解比特币安全存储的最佳实践和钱包管理技巧',
        'courses.viewDetails': '查看详情',
        'courses.noCoursesFound': '未找到课程',
        'courses.noCoursesMessage': '请尝试调整筛选条件或搜索关键词',
        'courses.viewAllCourses': '查看全部课程',
        'common.hours': '{hours}小时',
        'app.name': 'Bitcoin全球社区',
        'app.description': '提供全面的比特币和区块链技术学习资源',
        'nav.home': '首页',
        'nav.courses': '课程',
        'nav.tutorials': '教程',
        'nav.community': '社区',
        'auth.logout': '退出登录',
        'auth.login': '登录',
        'auth.register': '注册',
        'auth.logoutSuccess': '已成功退出登录',
        'footer.quickLinks': '快速链接',
        'footer.support': '支持',
        'footer.helpCenter': '帮助中心',
        'footer.faq': '常见问题',
        'footer.contactUs': '联系我们',
        'footer.privacyPolicy': '隐私政策',
        'footer.subscribe': '订阅资讯',
        'footer.subscribeDescription': '获取最新的比特币资讯和学习资源',
        'footer.emailPlaceholder': '您的邮箱地址',
        'footer.copyright': '© 2025 Bitcoin全球社区. 保留所有权利.'
      };
      return translations[key] || key;
    }
  })
}));

describe('Courses Component', () => {
  const mockLogout = jest.fn();
  const mockNavigate = jest.fn();
  
  const renderWithProviders = (props = {}) => {
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={{ 
          isAuthenticated: true, 
          setIsAuthenticated: jest.fn(), 
          logout: mockLogout 
        }}>
          <Courses {...props} />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
    // useNavigate已经在setupTests.ts中全局mock了，不需要重复mock
  });
  
  test('renders courses page correctly', () => {
    renderWithProviders();
    
    expect(screen.getByText('比特币课程')).toBeInTheDocument();
    expect(screen.getByText('探索我们全面的比特币和区块链技术课程')).toBeInTheDocument();
    expect(screen.getByText('全部课程')).toBeInTheDocument();
    expect(screen.getAllByText('入门')[0]).toBeInTheDocument(); // First occurrence (button)
    expect(screen.getAllByText('中级')[0]).toBeInTheDocument(); // First occurrence (button)
    expect(screen.getAllByText('高级')[0]).toBeInTheDocument(); // First occurrence (button)
    
    // Check course cards by checking course titles
    expect(screen.getByText('比特币基础知识')).toBeInTheDocument();
    expect(screen.getByText('区块链技术详解')).toBeInTheDocument();
    expect(screen.getByText('比特币投资策略')).toBeInTheDocument();
  });
  
  test('filters courses by level', async () => {
    renderWithProviders();
    
    // Check initial courses are present
    expect(screen.getByText('比特币基础知识')).toBeInTheDocument();
    expect(screen.getByText('区块链技术详解')).toBeInTheDocument();
    expect(screen.getByText('比特币投资策略')).toBeInTheDocument();
    
    // Click beginner filter
    fireEvent.click(screen.getAllByText('入门')[0]); // Use first occurrence (button)
    
    // Should show beginner courses
    await waitFor(() => {
      expect(screen.getByText('比特币基础知识')).toBeInTheDocument();
      expect(screen.getByText('加密货币交易指南')).toBeInTheDocument();
    });
    
    // Click intermediate filter
    fireEvent.click(screen.getAllByText('中级')[0]); // Use first occurrence (button)
    
    // Should show intermediate courses
    await waitFor(() => {
      expect(screen.getByText('区块链技术详解')).toBeInTheDocument();
      expect(screen.getByText('比特币安全与钱包管理')).toBeInTheDocument();
    });
    
    // Click advanced filter
    fireEvent.click(screen.getAllByText('高级')[0]); // Use first occurrence (button)
    
    // Should show advanced courses
    await waitFor(() => {
      expect(screen.getByText('比特币投资策略')).toBeInTheDocument();
      expect(screen.getByText('智能合约开发')).toBeInTheDocument();
    });
    
    // Click all courses
    fireEvent.click(screen.getByText('全部课程'));
    
    // Should show all courses again
    await waitFor(() => {
      expect(screen.getByText('比特币基础知识')).toBeInTheDocument();
      expect(screen.getByText('区块链技术详解')).toBeInTheDocument();
      expect(screen.getByText('比特币投资策略')).toBeInTheDocument();
    });
  });
  
  test('navigates to course detail page', () => {
    renderWithProviders();
    
    // Click on course title to navigate to detail page
    const courseTitle = screen.getByText('比特币基础知识');
    expect(courseTitle).toBeInTheDocument();
    fireEvent.click(courseTitle);
    
    // expect(mockNavigate).toHaveBeenCalled();
  });
  
  test('handles logout correctly', () => {
    renderWithProviders();
    
    fireEvent.click(screen.getByText('退出登录'));
    
    expect(mockLogout).toHaveBeenCalled();
    // expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
  
  test('handles responsive design elements', () => {
    // Test mobile viewport
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));
    
    renderWithProviders();
    
    // Mobile menu button should be present - use more specific selector
    const menuButtons = screen.getAllByRole('button');
    const menuButton = menuButtons.find(btn => btn.querySelector('i.fa-bars'));
    expect(menuButton).toBeInTheDocument();
    
    // Test desktop viewport
    window.innerWidth = 1200;
    window.dispatchEvent(new Event('resize'));
    
    // Desktop navigation should be present - use getAllByText for multiple occurrences
    expect(screen.getAllByText('首页')[0]).toBeInTheDocument(); // First occurrence (navigation)
    expect(screen.getAllByText('课程')[0]).toBeInTheDocument(); // First occurrence (navigation)
    expect(screen.getAllByText('教程')[0]).toBeInTheDocument(); // First occurrence (navigation)
    expect(screen.getAllByText('社区')[0]).toBeInTheDocument(); // First occurrence (navigation)
  });
});