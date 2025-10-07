import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import { AuthContext } from '@/contexts/authContext';
import { useI18n } from '@/hooks/useI18n';
import { initializeI18n } from '@/lib/i18n';

// 懒加载页面组件以提高性能
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Courses = lazy(() => import("@/pages/Courses"));
const CourseDetail = lazy(() => import("@/pages/CourseDetail"));
const Tutorials = lazy(() => import("@/pages/Tutorials"));
const TutorialDetail = lazy(() => import("@/pages/TutorialDetail"));
const Community = lazy(() => import("@/pages/Community"));
const CommunityTopic = lazy(() => import("@/pages/CommunityTopic"));
const Help = lazy(() => import("@/pages/Help"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));

// 加载组件
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
    <div className="text-center">
      <div className="inline-block w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
    </div>
  </div>
);

// 智能路由包装器
function AppRoutes() {
  const { t } = useI18n();
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/beginner" element={<Courses level="beginner" />} />
        <Route path="/courses/intermediate" element={<Courses level="intermediate" />} />
        <Route path="/courses/advanced" element={<Courses level="advanced" />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/tutorials/:id" element={<TutorialDetail />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/topic/:id" element={<CommunityTopic />} />
        <Route path="/community/tags/:tag" element={<Community />} />
        <Route path="/help" element={<Help />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

function AppContent() {
  const { t } = useI18n();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 初始化多语言
    initializeI18n();
    
    // 模拟初始化加载
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300); // 减少加载时间
    
    return () => clearTimeout(timer);
  }, []);

  const logout = () => {
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <AppRoutes />
    </AuthContext.Provider>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AppContent />
    </Suspense>
  );
}