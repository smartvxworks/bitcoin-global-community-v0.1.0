import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';
import { useI18n } from '@/hooks/useI18n';



interface CoursesProps {
  level?: string;
}

export default function Courses({ level }: CoursesProps) {
  const { t } = useI18n();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
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
    },
    {
      id: 4,
      title: t('courses.crypto_trading.title'),
      description: t('courses.crypto_trading.description'),
      level: t('courses.levels.beginner'),
      duration: t('common.hours', { hours: 3.5 }),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Cryptocurrency%20trading%20guide&sign=1bb57fb1a1fd79b4c511f1c07365d735"
    },
    {
      id: 5,
      title: t('courses.smart_contracts.title'),
      description: t('courses.smart_contracts.description'),
      level: t('courses.levels.advanced'),
      duration: t('common.hours', { hours: 6 }),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Smart%20contract%20development&sign=33b49c8b63c316ddb34ef3adf782331a"
    },
    {
      id: 6,
      title: t('courses.bitcoin_security.title'),
      description: t('courses.bitcoin_security.description'),
      level: t('courses.levels.intermediate'),
      duration: t('common.hours', { hours: 4 }),
      imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=Bitcoin%20security%20and%20wallet%20management&sign=2dc80f88bf319e50798a922f61dd1f7a"
    }
  ];
  
  const handleLogout = () => {
    logout();
    toast.success(t('auth.logoutSuccess'));
    navigate('/login');
  };
  
  // 根据级别筛选课程
  const filteredCourses = level 
    ? courses.filter(course => {
        if (level === 'beginner') return course.level === t('courses.levels.beginner');
        if (level === 'intermediate') return course.level === t('courses.levels.intermediate');
        if (level === 'advanced') return course.level === t('courses.levels.advanced');
        return false;
      })
    : courses;
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      {/* 导航栏 */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <i className="fa-brands fa-bitcoin text-orange-500 text-2xl"></i>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{t('app.name')}</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">{t('nav.home')}</Link>
            <Link to="/courses" className="font-medium text-blue-600 dark:text-blue-400">{t('nav.courses')}</Link>
            <Link to="/tutorials" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">{t('nav.tutorials')}</Link>
            <Link to="/community" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">{t('nav.community')}</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
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
            
            <button className="md:hidden text-slate-700 dark:text-slate-300">
              <i className="fa-solid fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>
      
      <main>
        {/* 页面标题区 */}
        <section className="bg-white dark:bg-slate-800 py-12 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('courses.title')}</h1>
            <p className="text-slate-600 dark:text-slate-400">{t('courses.subtitle')}</p>
          </div>
        </section>
        
        {/* 课程筛选区 */}
        <section className="py-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                <Link to="/courses" className={`px-4 py-2 rounded-lg transition-colors ${!level ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750'}`}>{t('courses.allCourses')}</Link>
                <Link to="/courses/beginner" className={`px-4 py-2 rounded-lg transition-colors ${level === 'beginner' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750'}`}>{t('courses.beginner')}</Link>
                <Link to="/courses/intermediate" className={`px-4 py-2 rounded-lg transition-colors ${level === 'intermediate' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750'}`}>{t('courses.intermediate')}</Link>
                <Link to="/courses/advanced" className={`px-4 py-2 rounded-lg transition-colors ${level === 'advanced' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750'}`}>{t('courses.advanced')}</Link>
              </div>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('courses.searchPlaceholder')}
                  className="pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
              </div>
            </div>
          </div>
        </section>
        
        {/* 课程列表区 */}
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredCourses.map((course) => (
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
                         {t('courses.viewDetails')} <i className="fa-solid fa-arrow-right ml-1 text-xs"></i>
                       </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* 空状态提示 */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl">
                <div className="w-20 h-20 mx-auto mb-4 text-slate-300 dark:text-slate-600">
                  <i className="fa-solid fa-search text-5xl"></i>
                </div>
                <h3 className="text-xl font-bold mb-2">{t('courses.noCoursesFound')}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6">{t('courses.noCoursesMessage')}</p>
                <Link to="/courses" className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  {t('courses.viewAllCourses')}
                </Link>
              </div>
            )}
            
            {/* 分页控件 */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-600 text-white">1</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750">2</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750">3</button>
                <span className="text-slate-500">...</span>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750">8</button>
                <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750">
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* 页脚 */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fa-brands fa-bitcoin text-orange-500 text-2xl"></i>
                <h3 className="text-xl font-bold text-white">{t('app.name')}</h3>
              </div>
              <p className="mb-4">
                {t('app.description')}
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
              <h4 className="text-white font-bold mb-4">{t('footer.quickLinks')}</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">{t('nav.home')}</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">{t('nav.courses')}</Link></li>
                <li><Link to="/tutorials" className="hover:text-white transition-colors">{t('nav.tutorials')}</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">{t('nav.community')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-white transition-colors">{t('footer.helpCenter')}</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">{t('footer.faq')}</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('footer.contactUs')}</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacyPolicy')}</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">{t('footer.subscribe')}</h4>
              <p className="mb-4">{t('footer.subscribeDescription')}</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder={t('footer.emailPlaceholder')}
                  className="px-4 py-2 bg-slate-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg transition-colors">
                  {t('footer.subscribe')}
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm">
            <p>{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}