import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

export default function Contact() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast.success('已成功退出登录');
    navigate('/login');
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 表单验证
    if (!formData.name) {
      toast.error('请输入您的姓名');
      return;
    }
    
    if (!formData.email) {
      toast.error('请输入您的邮箱');
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('请输入有效的邮箱地址');
      return;
    }
    
    if (!formData.subject) {
      toast.error('请输入主题');
      return;
    }
    
    if (!formData.message) {
      toast.error('请输入您的留言内容');
      return;
    }
    
    // 模拟提交
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success('留言提交成功，我们将尽快回复您');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };
  
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
            <Link to="/courses" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">课程</Link>
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
                  to="/register"className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">联系我们</h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              如果您有任何问题、建议或反馈，请通过以下方式联系我们，我们将尽快回复您
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 联系表单 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">发送留言</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    邮箱
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    主题
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    留言内容
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                      发送中...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-paper-plane mr-2"></i>
                      发送留言
                    </>
                  )}
                </button>
              </form>
            </div>
            
            {/* 联系信息 */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">联系方式</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-envelope text-blue-600 dark:text-blue-400 text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium mb-1">电子邮件</h3>
                      <a href="mailto:contact@btceduplatform.com" className="text-blue-600 dark:text-blue-400 hover:underline">contact@btceduplatform.com</a>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">我们通常会在24小时内回复邮件</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-comments text-blue-600 dark:text-blue-400 text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium mb-1">在线客服</h3>
                      <p className="text-slate-600 dark:text-slate-400">工作日 9:00-18:00 在线</p>
                      <button className="mt-2 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm">
                        开始聊天 <i className="fa-solid fa-arrow-right ml-1"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className="fa-solid fa-file-text text-blue-600 dark:text-blue-400 text-xl"></i>
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium mb-1">帮助文档</h3>
                      <p className="text-slate-600 dark:text-slate-400">查看常见问题和使用指南</p>
                      <Link to="/help" className="mt-2 inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm">
                        浏览帮助中心 <i className="fa-solid fa-arrow-right ml-1"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6">关注我们</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-750 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group">
                    <i className="fa-brands fa-weibo text-xl text-slate-600 dark:text-slate-400 group-hover:text-red-500 transition-colors"></i>
                    <span className="ml-2 font-medium">微博</span>
                  </a>
                  
                  <a href="#" className="flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-750 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group">
                    <i className="fa-brands fa-weixin text-xl text-slate-600 dark:text-slate-400 group-hover:text-green-600 transition-colors"></i>
                    <span className="ml-2 font-medium">微信</span>
                  </a>
                  
                  <a href="#" className="flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-750 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group">
                    <i className="fa-brands fa-twitter text-xl text-slate-600 dark:text-slate-400 group-hover:text-blue-500 transition-colors"></i>
                    <span className="ml-2 font-medium">Twitter</span>
                  </a>
                  
                  <a href="#" className="flex items-center justify-center p-4 bg-slate-50 dark:bg-slate-750 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors group">
                    <i className="fa-brands fa-telegram text-xl text-slate-600 dark:text-slate-400 group-hover:text-blue-500 transition-colors"></i>
                    <span className="ml-2 font-medium">Telegram</span>
                  </a>
                </div>
                
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-100 dark:border-blue-800">
                  <h3 className="font-medium mb-2 flex items-center">
                    <i className="fa-solid fa-bell text-blue-600 dark:text-blue-400 mr-2"></i>
                    订阅我们的通讯
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    获取最新的比特币资讯和学习资源
                  </p>
                  <div className="flex">
                    <input 
                      type="email" 
                      placeholder="您的邮箱地址" 
                      className="flex-1 px-4 py-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-300 dark:border-slate-600"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg transition-colors">
                      订阅
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}