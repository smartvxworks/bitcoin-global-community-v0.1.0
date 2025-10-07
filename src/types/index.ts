// Global Type Definitions / 全局类型定义

// User related types / 用户相关类型
export interface User {
  id: string;
  email?: string;
  phone?: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Tutorial related types / 教程相关类型
export interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  category: 'security' | 'trading' | 'technology' | 'investment';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime: number;
  author: Author;
  tags: string[];
  coverImage?: string;
  references?: Reference[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio: string;
  expertise: string[];
  socialLinks?: SocialLink[];
}

export interface Reference {
  title: string;
  url: string;
  type: 'article' | 'video' | 'document' | 'website';
}

export interface SocialLink {
  platform: 'twitter' | 'github' | 'linkedin' | 'website';
  url: string;
}

// Community related types / 社区相关类型
export interface CommunityTopic {
  id: string;
  title: string;
  content: string;
  author: User;
  tags: string[];
  replies: Reply[];
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reply {
  id: string;
  content: string;
  author: User;
  likes: number;
  createdAt: Date;
  parentId?: string; // For nested replies / 用于嵌套回复
}

// Course related types / 课程相关类型
export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  instructor: Author;
  lessons: Lesson[];
  price?: number;
  isFree: boolean;
  rating: number;
  students: number;
}

export interface Lesson {
  id: string;
  title: string;
  duration: number;
  videoUrl?: string;
  content: string;
  resources?: Resource[];
}

export interface Resource {
  name: string;
  type: 'pdf' | 'video' | 'code' | 'article';
  url: string;
}

// Form and validation types / 表单和验证类型
export interface RegisterForm {
  phone: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
  country: string;
}

export interface LoginForm {
  phone: string;
  password: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// API response types / API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  code?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// UI component props / UI组件属性类型
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'password' | 'email' | 'tel';
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

// Internationalization types / 国际化类型
export type Language = 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR' | 'de-DE' | 'fr-FR';

export interface TranslationDictionary {
  [key: string]: string;
}

// Theme types / 主题类型
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts: {
    primary: string;
    secondary: string;
  };
}

// Utility types / 工具类型
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Event types / 事件类型
export interface FormEvent<T = HTMLFormElement> extends React.FormEvent<T> {}
export interface ChangeEvent<T = HTMLInputElement> extends React.ChangeEvent<T> {}
export interface ClickEvent<T = HTMLButtonElement> extends React.MouseEvent<T> {}