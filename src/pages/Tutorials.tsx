import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';
import { useI18n } from '@/hooks/useI18n';

export default function Tutorials() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useI18n();

  // Tutorial data - moved inside component to ensure re-render on language change
  const tutorials = [
    {
      id: 1,
      title: t('tutorials.secure_storage.title'),
      description: t('tutorials.secure_storage.excerpt'),
      category: t('tutorials.categories.security'),
      author: t('tutorials.authors.blockchain_expert'),
      date: "2025-09-15",
      readTime: t('common.minutes', { minutes: 8 }),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Bitcoin%20wallet%20security%20guide&sign=5915d81b57ce710919162bc600850db5"
    },
    {
      id: 2,
      title: t('tutorials.trading_basics.title'),
      description: t('tutorials.trading_basics.excerpt'),
      category: t('tutorials.categories.trading'),
      author: t('tutorials.authors.crypto_analyst'),
      date: "2025-09-10",
      readTime: t('common.minutes', { minutes: 12 }),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Bitcoin%20trading%20tutorial&sign=6e5c3b00dc1af9f0702f07f13be25336"
    },
    {
      id: 3,
      title: t('tutorials.future_outlook.title'),
      description: t('tutorials.future_outlook.excerpt'),
      category: t('tutorials.categories.trends'),
      author: t('tutorials.authors.tech_forecast_expert'),
      date: "2025-09-05",
      readTime: t('common.minutes', { minutes: 15 }),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Blockchain%20future%20trends&sign=7c518244c81f7898e1374e2107953880"
    },
    {
      id: 4,
      title: t('tutorials.mining_guide.title'),
      description: t('tutorials.mining_guide.excerpt'),
      category: t('tutorials.categories.technology'),
      author: t('tutorials.authors.mining_expert'),
      date: "2025-08-28",
      readTime: t('common.minutes', { minutes: 20 }),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Bitcoin%20mining%20guide&sign=14e474a458e2cba20afba59a28126390"
    },
    {
      id: 5,
      title: t('tutorials.investment_strategy.title'),
      description: t('tutorials.investment_strategy.excerpt'),
      category: t('tutorials.categories.investment'),
      author: t('tutorials.authors.financial_advisor'),
      date: "2025-08-20",
      readTime: t('common.minutes', { minutes: 15 }),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Cryptocurrency%20investment%20strategy&sign=f0c39c061a3619f2b98c2e511faaf405"
    },
    {
      id: 6,
      title: t('tutorials.blockchain_tech.title'),
      description: t('tutorials.blockchain_tech.excerpt'),
      category: t('tutorials.categories.technology'),
      author: t('tutorials.authors.blockchain_developer'),
      date: "2025-08-15",
      readTime: t('common.minutes', { minutes: 30 }),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Blockchain%20technology%20guide&sign=f9113766a4dff3f397d3060126e82a29"
    }
  ];
  
  const handleLogout = () => {
    logout();
    toast.success(t('logout_success'));
    navigate('/login');
  };
  
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
            
            <button className="md:hidden text-slate-700 dark:text-slate-300">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>
      
      <main>
        {/* Page Title Section / 页面标题区 */}
        <section className="bg-white dark:bg-slate-800 py-12 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('bitcoin_tutorials')}</h1>
            <p className="text-slate-600 dark:text-slate-400">{t('explore_tutorials')}</p>
          </div>
        </section>
        
        {/* Tutorial Filter Section / 教程筛选区 */}
        <section className="py-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">{t('all_tutorials')}</button>
                <button className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors">{t('security')}</button>
                <button className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors">{t('trading')}</button>
                <button className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors">{t('technology')}</button>
                <button className="px-4 py-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors">{t('investment')}</button>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('search_tutorials')}
                  className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tutorial List Section / 教程列表区 */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tutorials.map((tutorial) => (
                <div 
                  key={tutorial.id}
                  className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={tutorial.imageUrl} 
                      alt={tutorial.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {tutorial.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <Link to={`/tutorials/${tutorial.id}`}>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {tutorial.title}
                      </h3>
                    </Link>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                      {tutorial.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-500">
                      <div className="flex items-center">
                        <i className="fa-solid fa-user mr-1"></i>
                        <span>{tutorial.author}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fa-solid fa-calendar mr-1"></i>
                        <span>{tutorial.date}</span>
                      </div>
                      <div className="flex items-center">
                        <i className="fa-solid fa-clock mr-1"></i>
                        <span>{tutorial.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination Controls / 分页控件 */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750">3</button>
                <span className="text-slate-500">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750">5</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer / 页脚 */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fa-brands fa-bitcoin text-orange-500 text-2xl"></i>
                <h3 className="text-xl font-bold text-white">{t('platform_name')}</h3>
              </div>
              <p className="mb-4">
                {t('platform_description')}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <i className="fa-brands fa-weibo"></i>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <i className="fa-brands fa-weixin"></i>
                </a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">{t('quick_links')}</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">{t('home')}</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">{t('courses')}</Link></li>
                <li><Link to="/tutorials" className="hover:text-white transition-colors">{t('tutorials')}</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">{t('community')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">{t('support')}</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-white transition-colors">{t('help')}</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">{t('faq')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('contact')}</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">{t('privacy')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">{t('subscribe_news')}</h4>
              <p className="mb-4">{t('subscribe_description')}</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder={t('email_placeholder')} 
                  className="px-4 py-2 bg-slate-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg transition-colors">
                  {t('subscribe')}
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm">
            <p>{t('copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}