import React, { useContext, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

// 课程详情数据
const courseDetails = [
  {
    id: 1,
    title: "比特币基础知识",
    description: "了解比特币的基本概念、历史和工作原理",
    level: "入门",
    duration: "3小时",
    imageUrl: "https://picsum.photos/400/300?random=4",
    instructor: "区块链专家",
    instructorAvatar: "https://picsum.photos/100/100?random=5",
    rating: 4.8,
    reviews: 124,
    students: 1560,
    lastUpdated: "2025-09-01",
    courseContent: [
      {
        section: "比特币介绍",
        lessons: [
          { title: "什么是比特币？", duration: "15分钟", isFree: true },
          { title: "比特币的历史与起源", duration: "20分钟", isFree: true },
          { title: "比特币的特点与优势", duration: "25分钟", isFree: false }
        ]
      }
    ],
    requirements: [
      "基本计算机操作能力",
      "无需加密货币经验",
      "对区块链技术有好奇心"
    ],
    whatYouWillLearn: [
      "理解比特币的基本概念和工作原理",
      "了解区块链技术的核心思想",
      "掌握比特币钱包的使用方法",
      "熟悉比特币交易流程",
      "了解比特币的历史和发展趋势"
    ],
    descriptionLong: `
      <p>本课程专为比特币和区块链技术的初学者设计，从基础知识开始，逐步引导您进入加密货币的世界。</p>
    `
  }
];

// 获取课程详情
const getCourseDetails = (id: string | undefined) => {
  if (!id) return null;
  return courseDetails.find(course => course.id === parseInt(id));
};

export default function CourseDetail() {
  const { id } = useParams();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();
  const course = getCourseDetails(id);
  
  // 如果课程不存在，重定向到课程列表页
  React.useEffect(() => {
    if (!course && id) {
      toast.error('课程不存在');
      navigate('/courses');
    }
  }, [id, course, navigate]);
  
  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.info('请先登录后再报名课程');
      navigate('/login');
      return;
    }
    
    setIsEnrolled(true);
    toast.success('成功报名课程！');
  };
  
  const handleLogout = () => {
    logout();
    toast.success('已成功退出登录');
    navigate('/login');
  };
  
  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <i className="fa-solid fa-circle-notch fa-spin text-4xl text-blue-600 mb-4"></i>
          <p className="text-xl text-slate-600 dark:text-slate-400">加载中...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className="fa-brands fa-bitcoin text-orange-500 text-2xl"></i>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">BTC教学平台</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">首页</Link>
            <Link to="/courses" className="font-medium text-blue-600 dark:text-blue-400">课程</Link>
            <Link to="/tutorials" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">教程</Link>
            <Link to="/community" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">社区</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                退出登录
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  注册
                </Link>
              </>
            )}
            
            <button className="md:hidden text-slate-700 dark:text-slate-300">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {course && (
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-slate-600 dark:text-slate-400">{course.description}</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6 mb-6">
                  <h2 className="text-xl font-bold mb-4">课程内容</h2>
                  <div className="space-y-4">
                    {course.courseContent.map((section, index) => (
                      <div key={index}>
                        <h3 className="font-bold mb-2">{section.section}</h3>
                        <ul className="space-y-2">
                          {section.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-600">
                              <span>{lesson.title}</span>
                              <span className="text-sm text-slate-500">{lesson.duration}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6">
                  <div className="text-center mb-4">
                    <span className="text-2xl font-bold text-blue-600">免费</span>
                  </div>
                  {isEnrolled ? (
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors">
                      <i className="fa-solid fa-play-circle mr-2"></i> 开始学习
                    </button>
                  ) : (
                    <button 
                      onClick={handleEnroll}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors"
                    >
                      <i className="fa-solid fa-user-plus mr-2"></i> 报名课程
                    </button>
                  )}
                </div>
                
                <div className="bg-slate-100 dark:bg-slate-700 rounded-lg p-6">
                  <h3 className="font-bold mb-4">课程信息</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>难度:</span>
                      <span>{course.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>时长:</span>
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>学生:</span>
                      <span>{course.students}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>评分:</span>
                      <span>{course.rating} ⭐</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}