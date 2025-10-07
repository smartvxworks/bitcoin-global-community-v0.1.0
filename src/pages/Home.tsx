import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';
import { useI18n } from '@/hooks/useI18n';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useI18n();
  const [hasError, setHasError] = useState(false);
  
  // 课程数据
  const courses = [
    {
      id: 1,
      title: t('courses.bitcoin_basics.title'),
      description: t('courses.bitcoin_basics.description'),
      level: t('courses.levels.beginner'),
      duration: t('common.hours', { hours: 3 }),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Bitcoin%20basics%20course&sign=a3e0c56054bbf7860c7b39370f60aa98"
    },
    {
      id: 2,
      title: t('courses.blockchain_technology.title'),
      description: t('courses.blockchain_technology.description'),
      level: t('courses.levels.intermediate'),
      duration: t('common.hours', { hours: 5 }),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Blockchain%20technology%20course&sign=6128cf9d3e0c8b4c9be3189ad2fd9d42"
    },
    {
      id: 3,
      title: t('courses.bitcoin_investment.title'),
      description: t('courses.bitcoin_investment.description'),
      level: t('courses.levels.advanced'),
      duration: t('common.hours', { hours: 4 }),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Bitcoin%20investment%20course&sign=bf26fd00fb97b47a9f93631d498ce4e4"
    }
  ];

  // 教程文章数据
  const tutorials = [
    {
      id: 1,
      title: t('tutorials.secure_storage.title'),
      excerpt: t('tutorials.secure_storage.excerpt'),
      date: "2025-09-15",
      readTime: t('common.minutes', { minutes: 5 })
    },
    {
      id: 2,
      title: t('tutorials.trading_basics.title'),
      excerpt: t('tutorials.trading_basics.excerpt'),
      date: "2025-09-10",
      readTime: t('common.minutes', { minutes: 8 })
    },
    {
      id: 3, 
      title: t('tutorials.future_outlook.title'),
      excerpt: t('tutorials.future_outlook.excerpt'),
      date: "2025-09-05",
      readTime: t('common.minutes', { minutes: 10 })
    }
  ];
  
  useEffect(() => {
    // 错误边界模拟检查
    const checkForErrors = () => {
      // 这里可以添加实际的错误检查逻辑
      return false;
    };
    
    const errorDetected = checkForErrors();
    if (errorDetected) {
      setHasError(true);
      toast.error(t('error.page_load_error'));
    }
  }, [t]);
  
  const handleLogout = () => {
    logout();
    toast.success(t('logout_success'));
    navigate('/login');
  };
  
  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-slate-50 dark:bg-slate-900">
        <div className="w-16 h-16 mb-4 text-red-500">
          <i className="fa-solid fa-exclamation-triangle text-4xl"></i>
        </div>
        <h2 className="text-2xl font-bold mb-2">{t('error.page_load_error')}</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
          {t('error.page_load_message')}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {t('error.refresh_page')}
        </button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">₿</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{t('app.name')}</h1>
              <span className="text-xs text-orange-500 font-medium">{t('app.community')}</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-blue-600 dark:text-blue-400">{t('nav.home')}</Link>
            <Link to="/courses" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">{t('nav.courses')}</Link>
              <Link to="/tutorials" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">{t('nav.tutorials')}</Link>
              <Link to="/community" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">{t('nav.community')}</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
              >
                {t('auth.logout')}
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {t('auth.register')}
                </Link>
              </>
            )}
            
            <button 
              className="md:hidden text-slate-700 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? t('close_menu') : t('open_menu')}
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
          
           {/* 移动端菜单 */}
          {mobileMenuOpen && (
            <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}>
              <div className="absolute top-0 right-0 h-full w-64 bg-white dark:bg-slate-800 shadow-xl transform transition-transform" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
                  <h2 className="font-bold text-lg">{t('nav.menu')}</h2>
                  <button onClick={() => setMobileMenuOpen(false)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                    <i className="fa-solid fa-times"></i>
                  </button>
                </div>
                <div className="p-4">
                  <nav className="space-y-4">
                    <Link 
                      to="/" 
                      className="block py-2 px-4 rounded-lg font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('nav.home')}
                    </Link>
                    <Link 
                      to="/courses" 
                      className="block py-2 px-4 rounded-lg font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('nav.courses')}
                    </Link>
                    <Link 
                      to="/tutorials" 
                      className="block py-2 px-4 rounded-lg font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('nav.tutorials')}
                    </Link>
                    <Link 
                      to="/community" 
                      className="block py-2 px-4 rounded-lg font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('nav.community')}
                    </Link>
                  </nav>
                  
                  <div className="mt-8 space-y-3">
                    {isAuthenticated ? (
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full py-2 px-4 rounded-lg font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
                      >
                        {t('auth.logout')}
                      </button>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block text-center py-2 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg font-medium text-slate-600 dark:text-slate-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {t('login')}
                        </Link>
                        <Link
                          to="/register"
                          className="block text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {t('register')}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <main>
        {/* 英雄区 */}
        <section className="relative bg-gradient-to-br from-orange-500 to-yellow-600 text-white py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <span className="text-sm font-semibold">🚀 {t('home.hero_latest_version')} v2.0</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {t('home.hero_title_part1')}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> {t('home.hero_title_part2')}</span>
              </h1>
              <p className="text-xl md:text-2xl text-orange-100 mb-8 max-w-3xl mx-auto">
                {t('home.hero_description')}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  to="/courses"
                  className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg"
                >
                  {t('home.hero_get_started')}
                </Link>
                <button className="px-8 py-4 bg-transparent border-2 border-white font-bold rounded-lg hover:bg-white/10 transition-all">
                  {t('home.hero_learn_more')}
                </button>
              </div>
            </div>
          </div>
          
          {/* 比特币图案背景 */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400/10 rounded-full blur-3xl"></div>
            <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-orange-400/8 rounded-full blur-3xl"></div>
          </div>
        </section>
        
         {/* 比特币核心特性 */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t('home.features_title')}</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t('home.features_subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-700 border border-orange-100 dark:border-gray-600 transition-all hover:shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  ₿
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('home.features_bitcoin_core')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('home.features_bitcoin_core_desc')}
                </p>
              </div>
              
              <div className="group text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 border border-blue-100 dark:border-gray-600 transition-all hover:shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  📚
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('home.features_professional_courses')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('home.features_professional_courses_desc')}
                </p>
              </div>
              
              <div className="group text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 border border-green-100 dark:border-gray-600 transition-all hover:shadow-lg">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{t('home.features_security_guide')}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t('home.features_security_guide_desc')}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* 热门课程展示 */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t('home.popular_courses')}</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                {t('home.popular_courses_desc')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <div 
                  key={course.id}
                  className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={course.imageUrl} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {course.level}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500 dark:text-slate-500">
                        <i className="fa-solid fa-clock mr-1"></i> {course.duration}
                      </span>
                       <Link to={`/courses/${course.id}`} className="text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center">
                         {t('home.view_details')} <i className="fa-solid fa-arrow-right ml-1 text-xs"></i>
                       </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link to="/courses" className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors inline-block text-center w-full">
                {t('home.view_all_courses')} <i className="fa-solid fa-chevron-right ml-1"></i>
              </Link>
            </div>
          </div>
        </section>
        
        {/* 教程文章部分 */}
        <section className="py-16 bg-white dark:bg-slate-800">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">{t('home.latest_tutorials')}</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                  {t('home.latest_tutorials_desc')}
                </p>
              </div>
               <Link to="/tutorials" className="text-blue-600 dark:text-blue-400 font-medium hover:underline mt-4 md:mt-0 inline-flex items-center">
                 {t('home.view_all_tutorials')} <i className="fa-solid fa-arrow-right ml-1"></i>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tutorials.map((tutorial) => (
                <div key={tutorial.id} className="group">
                  <Link to={`/tutorials/${tutorial.id}`} className="block">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tutorial.title}
                    </h3>
                  </Link>
                  <p className="text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                    {tutorial.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-500">
                    <span><i className="fa-solid fa-calendar mr-1"></i> {tutorial.date}</span>
                    <span className="mx-2">•</span>
                    <span><i className="fa-solid fa-clock mr-1"></i> {tutorial.readTime}</span>
                  </div>
                  <div className="mt-3 h-0.5 w-0 bg-blue-600 dark:bg-blue-400 group-hover:w-full transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 注册提示部分 */}
        <section className="py-20 bg-gradient-to-r from-orange-600 to-yellow-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta.start_journey')}</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              {t('cta.start_journey_desc')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-orange-600 font-bold rounded-lg hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg"
              >
                {t('cta.register_now')}
              </Link>
              <button className="px-8 py-4 bg-transparent border-2 border-white font-bold rounded-lg hover:bg-white/10 transition-all">
                {t('cta.learn_more')}
              </button>
            </div>
          </div>
        </section>
      </main>
      
      {/* 页脚 */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">₿</span>
                </div>
                <h3 className="text-xl font-bold text-white">{t('app.name')}</h3>
              </div>
              <p className="mb-4">
                {t('footer.description')}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="微博">
                  <i className="fa-brands fa-weibo"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="微信">
                  <i className="fa-brands fa-weixin"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="推特">
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">{t('footer.quick_links')}</h4>
              <ul className="space-y-2">
               <li><Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link></li><li><Link to="/courses" className="hover:text-white transition-colors">{t('nav.courses')}</Link></li>
               <li><Link to="/tutorials" className="hover:text-white transition-colors">{t('nav.tutorials')}</Link></li>
               <li><Link to="/community" className="hover:text-white transition-colors">{t('nav.community')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2">
               <li><Link to="/help" className="hover:text-white transition-colors">{t('footer.help_center')}</Link></li>
               <li><Link to="/faq" className="hover:text-white transition-colors">{t('footer.faq')}</Link></li>
               <li><Link to="/contact" className="hover:text-white transition-colors">{t('footer.contact_us')}</Link></li>
               <li><Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy_policy')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">{t('footer.subscribe')}</h4>
              <p className="mb-4">{t('footer.subscribe_description')}</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder={t('footer.email_placeholder')}
                  className="px-4 py-2 bg-gray-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 w-full"
                  aria-label={t('footer.email_placeholder')}
                />
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 rounded-r-lg transition-colors" aria-label={t('footer.subscribe')}>
                  {t('footer.subscribe')}
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm">
            <p>© 2025 {t('app.name')} {t('footer.all_rights_reserved')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}