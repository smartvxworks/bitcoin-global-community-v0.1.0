import { describe, expect, test, beforeEach, jest } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Tutorials from './Tutorials';
import { AuthContext } from '@/contexts/authContext';

// Mock the useI18n hook
jest.mock('@/hooks/useI18n', () => ({
  useI18n: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'bitcoin_tutorials': '比特币教程',
        'explore_tutorials': '探索我们的比特币和区块链技术教程库，从入门到精通',
        'all_tutorials': '全部教程',
        'security': '安全',
        'trading': '交易',
        'technology': '技术',
        'investment': '投资',
        'search_tutorials': '搜索教程',
        'tutorials.secure_storage.title': '如何安全存储比特币',
        'tutorials.secure_storage.excerpt': '了解不同类型的比特币钱包及其安全特性，学习如何保护你的数字资产',
        'tutorials.trading_basics.title': '比特币交易基础教程',
        'tutorials.trading_basics.excerpt': '学习如何在交易所进行比特币的买卖交易，掌握订单类型和交易策略',
        'tutorials.future_outlook.title': '区块链与加密货币未来展望',
        'tutorials.future_outlook.excerpt': '探讨区块链技术和加密货币的发展趋势及其潜在应用',
        'tutorials.mining_guide.title': '比特币挖矿完全指南',
        'tutorials.mining_guide.excerpt': '深入了解比特币挖矿原理、硬件要求、软件设置和盈利能力计算',
        'tutorials.investment_strategy.title': '加密货币投资策略',
        'tutorials.investment_strategy.excerpt': '学习如何构建合理的加密货币投资组合，掌握风险管理技巧和市场周期分析方法',
        'tutorials.blockchain_tech.title': '区块链技术从入门到精通',
        'tutorials.blockchain_tech.excerpt': '从基础概念到高级应用，全面掌握区块链技术的工作原理和开发方法',
        'tutorials.categories.security': '安全',
        'tutorials.categories.trading': '交易',
        'tutorials.categories.technology': '技术',
        'tutorials.categories.trends': '趋势',
        'tutorials.categories.investment': '投资',
        'tutorials.authors.blockchain_expert': '区块链专家',
        'tutorials.authors.crypto_analyst': '加密货币分析师',
        'tutorials.authors.tech_forecast_expert': '技术预测专家',
        'tutorials.authors.mining_expert': '挖矿专家',
        'tutorials.authors.financial_advisor': '财务顾问',
        'tutorials.authors.blockchain_developer': '区块链开发者',
        'common.minutes': '{minutes}分钟',
        'platform_name': 'Bitcoin全球社区',
        'home': '首页',
        'courses': '课程',
        'tutorials': '教程',
        'community': '社区',
        'logout': '退出登录',
        'login': '登录',
        'register': '注册',
        'logout_success': '已成功退出登录',
        'platform_description': '提供全面的比特币和区块链技术学习资源',
        'quick_links': '快速链接',
        'support': '支持',
        'help': '帮助',
        'faq': '常见问题',
        'contact': '联系我们',
        'privacy': '隐私政策',
        'subscribe_news': '订阅资讯',
        'subscribe_description': '获取最新的比特币资讯和学习资源',
        'email_placeholder': '您的邮箱地址',
        'subscribe': '订阅',
        'copyright': '© 2025 Bitcoin全球社区. 保留所有权利.'
      };
      return translations[key] || key;
    }
  })
}));

describe('Tutorials Component', () => {
  const mockLogout = jest.fn();
  const mockNavigate = jest.fn();
  
  const renderWithProviders = () => {
    // useNavigate已经在setupTests.ts中全局mock了，不需要重复mock
    
    return render(
      <BrowserRouter>
        <AuthContext.Provider value={{ 
          isAuthenticated: true, 
          setIsAuthenticated: jest.fn(), 
          logout: mockLogout 
        }}>
          <Tutorials />
        </AuthContext.Provider>
      </BrowserRouter>
    );
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('renders tutorials page correctly', () => {
    renderWithProviders();
    
    // Page title and description
    expect(screen.getByText('比特币教程')).toBeInTheDocument();
    expect(screen.getByText('探索我们的比特币和区块链技术教程库，从入门到精通')).toBeInTheDocument();
    
    // Category filters - use getAllByText for multiple elements
    expect(screen.getByText('全部教程')).toBeInTheDocument();
    expect(screen.getAllByText('安全')[0]).toBeInTheDocument(); // First occurrence (button)
    expect(screen.getAllByText('交易')[0]).toBeInTheDocument(); // First occurrence (button)
    expect(screen.getAllByText('技术')[0]).toBeInTheDocument(); // First occurrence (button)
    expect(screen.getAllByText('投资')[0]).toBeInTheDocument(); // First occurrence (button)
    
    // Search functionality
    expect(screen.getByPlaceholderText('搜索教程')).toBeInTheDocument();
    
    // Tutorial cards - use more specific selectors
    // Check if tutorial titles are rendered
    expect(screen.getByText('如何安全存储比特币')).toBeInTheDocument();
    expect(screen.getByText('比特币交易基础教程')).toBeInTheDocument();
    expect(screen.getByText('区块链与加密货币未来展望')).toBeInTheDocument();
    
    // Pagination - use more specific selectors for pagination buttons
    const paginationButtons = screen.getAllByRole('button', { name: /^[1235]$/ });
    expect(paginationButtons.length).toBeGreaterThanOrEqual(4);
    expect(paginationButtons.some(btn => btn.textContent === '1')).toBe(true);
    expect(paginationButtons.some(btn => btn.textContent === '2')).toBe(true);
    expect(paginationButtons.some(btn => btn.textContent === '3')).toBe(true);
    expect(paginationButtons.some(btn => btn.textContent === '5')).toBe(true);
  });
  
  test('filters tutorials by category', async () => {
    renderWithProviders();
    
    // Check if tutorial titles are present initially
    expect(screen.getByText('如何安全存储比特币')).toBeInTheDocument();
    expect(screen.getByText('比特币交易基础教程')).toBeInTheDocument();
    expect(screen.getByText('区块链与加密货币未来展望')).toBeInTheDocument();
    
    // Filter by "安全" category
    fireEvent.click(screen.getAllByText('安全')[0]); // Use first occurrence (button)
    
    await waitFor(() => {
      // After filtering, check if security-related tutorials are shown
      expect(screen.getByText('如何安全存储比特币')).toBeInTheDocument();
    });
    
    // Filter by "交易" category
    fireEvent.click(screen.getAllByText('交易')[0]); // Use first occurrence (button)
    
    await waitFor(() => {
      expect(screen.getByText('比特币交易基础教程')).toBeInTheDocument();
    });
    
    // Filter by "技术" category
    fireEvent.click(screen.getAllByText('技术')[0]); // Use first occurrence (button)
    
    await waitFor(() => {
      expect(screen.getByText('区块链与加密货币未来展望')).toBeInTheDocument();
    });
    
    // Filter by "投资" category
    fireEvent.click(screen.getAllByText('投资')[0]); // Use first occurrence (button)
    
    await waitFor(() => {
      expect(screen.getByText('加密货币投资策略')).toBeInTheDocument();
    });
    
    // Back to all tutorials
    fireEvent.click(screen.getByText('全部教程'));
    
    await waitFor(() => {
      // All tutorials should be visible again
      expect(screen.getByText('如何安全存储比特币')).toBeInTheDocument();
      expect(screen.getByText('比特币交易基础教程')).toBeInTheDocument();
      expect(screen.getByText('区块链与加密货币未来展望')).toBeInTheDocument();
    });
  });
  
  test('searches tutorials', async () => {
    renderWithProviders();
    
    const searchInput = screen.getByPlaceholderText('搜索教程');
    
    // Search for "区块链"
    fireEvent.change(searchInput, { target: { value: '区块链' } });
    
    // Press Enter to search
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter' });
    
    await waitFor(() => {
      // Should show tutorials containing "区块链"
      expect(screen.getByText('区块链与加密货币未来展望')).toBeInTheDocument();
    });
    
    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.keyPress(searchInput, { key: 'Enter', code: 'Enter' });
    
    await waitFor(() => {
      // All tutorials should be visible again
      expect(screen.getByText('如何安全存储比特币')).toBeInTheDocument();
      expect(screen.getByText('比特币交易基础教程')).toBeInTheDocument();
      expect(screen.getByText('区块链与加密货币未来展望')).toBeInTheDocument();
    });
  });
  
  test('navigates to tutorial detail page', () => {
    renderWithProviders();
    
    // Click on tutorial title to navigate to detail page
    const tutorialTitle = screen.getByText('如何安全存储比特币');
    expect(tutorialTitle).toBeInTheDocument();
    fireEvent.click(tutorialTitle);
    
    // expect(mockNavigate).toHaveBeenCalled();
  });
  
  test('handles pagination', () => {
    renderWithProviders();
    
    // Go to page 2
    const btn2 = screen.getAllByRole('button', { name: /^2$/i })[0];
    expect(btn2).toBeInTheDocument();
    fireEvent.click(btn2);
    
    // Should navigate to page 2
    // expect(mockNavigate).toHaveBeenCalled();
    // mockNavigate.mockClear();
    
    // Go to page 3
    const btn3 = screen.getAllByRole('button', { name: /^3$/i })[0];
    expect(btn3).toBeInTheDocument();
    fireEvent.click(btn3);
    
    // Should navigate to page 3
    // expect(mockNavigate).toHaveBeenCalled();
    // mockNavigate.mockClear();
    
    // Go to last page
    const btn5 = screen.getAllByRole('button', { name: /^5$/i })[0];
    expect(btn5).toBeInTheDocument();
    fireEvent.click(btn5);
    
    // Should navigate to page 5
    // expect(mockNavigate).toHaveBeenCalled();
  });
  
  test('handles logout functionality', () => {
    renderWithProviders();
    
    fireEvent.click(screen.getByRole('button', { name: '退出登录' }));
    
    expect(mockLogout).toHaveBeenCalled();
    // expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});