import { useContext, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';
import { useI18n } from '@/hooks/useI18n';

// Get Tutorial Details / 获取教程详情
const getTutorialDetails = (id: string | undefined, t: (key: string) => string) => {
  if (!id) return null;
  
  const tutorialDetails = [
    {
      id: 1,
      title: t('tutorial_detail_how_to_store_bitcoin_safely'),
      description: t('tutorial_detail_store_bitcoin_description'),
      category: t('security'),
      author: t('blockchain_expert'),
      authorAvatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Security%20expert%20avatar&sign=61ed77043211398b17ff9f77c09f9129",
      date: "2025-09-15",
      readTime: t('minutes_8'),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Bitcoin%20wallet%20security%20guide&sign=5915d81b57ce710919162bc600850db5",
      content: `<section><h2>${t('tutorial_detail_how_to_store_bitcoin_safely')}</h2><p>${t('tutorial_detail_store_bitcoin_description')}</p></section>`,
      references: [
        { title: "Bitcoin.org - 钱包选择指南", url: "#" },
        { title: "Ledger官方安全指南", url: "#" }
      ]
    },
    {
      id: 2,
      title: t('tutorial_title_2'),
      description: t('tutorial_description_2'),
      category: t('trading'),
      author: t('crypto_analyst'),
      authorAvatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Crypto%20analyst%20avatar&sign=4063b52ab0062e5a32083d6c8ba02d08",
      date: "2025-09-10",
      readTime: t('minutes_12'),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Bitcoin%20trading%20tutorial&sign=6e5c3b00dc1af9f0702f07f13be25336",
      content: `<section><h2>${t('tutorial_title_2')}</h2><p>${t('tutorial_description_2')}</p></section>`,
      references: [
        { title: "加密货币交易入门指南", url: "#" },
        { title: "技术分析基础教程", url: "#" }
      ]
    },
    {
      id: 3,
      title: t('tutorial_title_3'),
      description: t('tutorial_description_3'),
      category: t('trends'),
      author: t('tech_forecast_expert'),
      authorAvatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Technology%20expert%20avatar&sign=0b60ca034155e39f0bf64a860a467981",
      date: "2025-09-05",
      readTime: t('minutes_15'),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Blockchain%20future%20trends&sign=7c518244c81f7898e1374e2107953880",
      content: `<section><h2>${t('tutorial_title_3')}</h2><p>${t('tutorial_description_3')}</p></section>`,
      references: [
        { title: "区块链技术发展报告", url: "#" },
        { title: "全球加密货币监管趋势", url: "#" }
      ]
    }
  ];
  
  return tutorialDetails.find(tutorial => tutorial.id === parseInt(id));
};

export default function TutorialDetail() {
  const { id } = useParams();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useI18n();
  
  const tutorial = getTutorialDetails(id, t);
  
  // 如果教程不存在，重定向到教程列表页
  useEffect(() => {
    if (!tutorial && id) {
      toast.error(t('tutorial_not_found'));
      navigate('/tutorials');
    }
  }, [id, tutorial, navigate, t]);
  
  const handleLogout = () => {
    logout();
    toast.success(t('logout_success'));
    navigate('/login');
  };
  
  if (!tutorial) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <i className="fa-solid fa-circle-notch fa-spin text-4xl text-blue-600 mb-4"></i>
          <p className="text-xl text-slate-600 dark:text-slate-400">{t('loading')}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* Navigation Bar / 导航栏 */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className="fa-brands fa-bitcoin text-orange-500 text-2xl"></i>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{t('platform_name')}</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">{t('home')}</Link>
            <Link to="/courses" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">{t('courses')}</Link>
            <Link to="/tutorials" className="font-medium text-blue-600 dark:text-blue-400">{t('tutorials')}</Link>
            <Link to="/community" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">{t('community')}</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                {t('logout')}
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
                >
                  {t('login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {tutorial && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Tutorial Content Area / 教程内容主区域 */}
            <div className="lg:col-span-2 space-y-8">
              {/* Tutorial Title and Cover / 教程标题和封面 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
                <div className="relative h-64 md:h-80">
                  <img 
                    src={tutorial.imageUrl} 
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-lg">
                    {tutorial.category}
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">{tutorial.title}</h1>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                    <div className="flex items-center">
                      <img 
                        src={tutorial.authorAvatar} 
                        alt={tutorial.author}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      <span>{tutorial.author}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fa-solid fa-calendar mr-2 text-blue-600 dark:text-blue-400"></i>
                      <span>{tutorial.date}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fa-solid fa-clock mr-2 text-blue-600 dark:text-blue-400"></i>
                      <span>{t('read_time')}: {tutorial.readTime}</span>
                    </div>
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: tutorial.content }} />
                  
                  {/* References / 参考资料 */}
                  {tutorial.references && tutorial.references.length > 0 && (
                    <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
                      <h3 className="text-xl font-bold mb-4">{t('references')}</h3>
                      <ul className="space-y-2">
                        {tutorial.references.map((ref, index) => (
                          <li key={index} className="flex items-start">
                            <i className="fa-solid fa-external-link text-blue-600 dark:text-blue-400 mt-1 mr-2"></i>
                            <a href={ref.url || "#"} target={ref.url ? "_blank" : "_self"} rel={ref.url ? "noopener noreferrer" : ""} className="text-blue-600 dark:text-blue-400 hover:underline">{ref.title}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Share and Like / 分享和点赞 */}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <i className="fa-solid fa-thumbs-up mr-2"></i>
                        <span>{t('like')} (42)</span>
                      </button>
                      <button className="flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <i className="fa-solid fa-share mr-2"></i>
                        <span>{t('share')}</span>
                      </button>
                    </div>
                    
                    <button className="flex items-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <i className="fa-solid fa-bookmark mr-2"></i>
                      <span>{t('save')}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar / 侧边栏 */}
            <div className="space-y-6">
              {/* Author Info / 作者信息 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={tutorial.authorAvatar} 
                    alt={tutorial.author}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{tutorial.author}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{t('blockchain_expert')}</p>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
                  {t('author_description')}
                </p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                  {t('follow_author')}
                </button>
              </div>
              
              {/* Related Tutorials / 相关教程 */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                <h3 className="font-bold text-lg mb-4">{t('related_tutorials')}</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center space-x-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <i className="fa-solid fa-book text-blue-600 dark:text-blue-400"></i>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2">{t(`tutorial_title_${i}`)}</h4>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">{t('read_time')}: {t(`minutes_${i*4}`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Footer / 页脚 */}
      <footer className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400">{t('copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}