import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

export default function Help() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast.success('已成功退出登录');
    navigate('/login');
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
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-xl shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-center">帮助中心</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <i className="fa-solid fa-circle-question text-blue-600 dark:text-blue-400 mr-3"></i>
                常见问题
              </h2>
              
              <div className="space-y-4">
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <button className="w-full px-4 py-3 text-left bg-slate-50 dark:bg-slate-750 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <span className="font-medium">如何开始学习比特币课程？</span>
                    <i className="fa-solid fa-chevron-down text-slate-500 dark:text-slate-400"></i>
                  </button>
                  <div className="px-4 py-3 bg-white dark:bg-slate-800">
                    <p>要开始学习比特币课程，请先注册并登录我们的平台。登录后，您可以浏览课程列表，选择感兴趣的课程并点击"报名课程"按钮。报名成功后，您就可以开始学习课程内容了。</p>
                  </div>
                </div>
                
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <button className="w-full px-4 py-3 text-left bg-slate-50 dark:bg-slate-750 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <span className="font-medium">课程内容是否有有效期限制？</span>
                    <i className="fa-solid fa-chevron-down text-slate-500 dark:text-slate-400"></i>
                  </button>
                  <div className="px-4 py-3 bg-white dark:bg-slate-800 hidden">
                    <p>我们平台上的所有课程内容均无有效期限制，一旦报名成功，您可以永久访问课程内容，随时学习。</p>
                  </div>
                </div>
                
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <button className="w-full px-4 py-3 text-left bg-slate-50 dark:bg-slate-750 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <span className="font-medium">如何获取学习证书？</span>
                    <i className="fa-solid fa-chevron-down text-slate-500 dark:text-slate-400"></i>
                  </button>
                  <div className="px-4 py-3 bg-white dark:bg-slate-800 hidden">
                    <p>完成课程学习并通过课程测验后，您可以获得相应的学习证书。证书将显示在您的个人中心，您可以下载或分享到社交媒体。</p>
                  </div>
                </div>
                
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <button className="w-full px-4 py-3 text-left bg-slate-50 dark:bg-slate-750 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <span className="font-medium">如何在社区发布话题或回复？</span>
                    <i className="fa-solid fa-chevron-down text-slate-500 dark:text-slate-400"></i>
                  </button>
                  <div className="px-4 py-3 bg-white dark:bg-slate-800 hidden">
                    <p>要在社区发布话题或回复，您需要先登录您的账户。登录后，在社区页面顶部的"发布新话题"区域输入内容并提交即可发布新话题。在话题详情页面，您可以在评论区输入内容并提交回复。</p>
                  </div>
                </div>
                
                <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                  <button className="w-full px-4 py-3 text-left bg-slate-50 dark:bg-slate-750 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                    <span className="font-medium">忘记密码怎么办？</span>
                    <i className="fa-solid fa-chevron-down text-slate-500 dark:text-slate-400"></i>
                  </button>
                  <div className="px-4 py-3 bg-white dark:bg-slate-800 hidden">
                    <p>如果您忘记了密码，可以在登录页面点击"忘记密码"链接，按照提示输入您的注册手机号，系统将发送验证码到您的手机。使用验证码重置密码后，您可以使用新密码登录。</p>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <i className="fa-solid fa-life-ring text-blue-600 dark:text-blue-400 mr-3"></i>
                获取帮助
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-750 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                    <i className="fa-solid fa-envelope text-blue-600 dark:text-blue-400 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">电子邮件支持</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">发送邮件到我们的支持团队，我们将在24小时内回复您的问题。</p>
                  <a href="mailto:support@btceduplatform.com" className="text-blue-600 dark:text-blue-400 hover:underline">support@btceduplatform.com</a>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-750 p-6 rounded-xl">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                    <i className="fa-solid fa-comments text-blue-600 dark:text-blue-400 text-xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2">在线客服</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">工作日 9:00-18:00 在线客服实时解答您的问题。</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    开始聊天
                  </button>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <i className="fa-solid fa-file-circle-question text-blue-600 dark:text-blue-400 mr-3"></i>
                更多资源
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fa-solid fa-book text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium mb-1">帮助文档</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">详细的使用指南和常见问题解答</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                   <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fa-solid fa-video text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium mb-1">视频教程</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">平台使用和比特币基础知识视频教程</p>
                  </div>
                </div>
                
                <div className="flex items-start p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <i className="fa-solid fa-users text-blue-600 dark:text-blue-400"></i>
                  </div>
                  <div className="ml-4">
                    <h3 className="font-medium mb-1">社区支持</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">在社区论坛提问，与其他用户交流</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}