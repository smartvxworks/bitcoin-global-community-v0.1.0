import React, { useContext, useState, useCallback, useMemo, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useI18n } from '@/hooks/useI18n';

// 社区讨论数据
const discussions = [
  {
    id: 1,
    title: "community.discussion1.title",
    author: "community.discussion1.author",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%201&sign=7cc5e5e9d261bde8ce5fccdb28c709aa",
    date: "2025-09-18",
    replies: 42,
    views: 356,
    lastReply: "community.discussion1.lastReply",
    tags: ["community.tags.priceAnalysis", "community.tags.investmentStrategy"]
  },
  {
    id: 2,
    title: "community.discussion2.title",
    author: "community.discussion2.author",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%202&sign=f2938273b9dc9bc101407615eb648d08",
    date: "2025-09-15",
    replies: 28,
    views: 210,
    lastReply: "community.discussion2.lastReply",
    tags: ["community.tags.wallet", "community.tags.security", "community.tags.beginner"]
  },
  {
    id: 3,
    title: "community.discussion3.title",
    author: "community.discussion3.author",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%203&sign=c8bb87cc81bc89d5d3d3ceaa37903fe2",
    date: "2025-09-10",
    replies: 15,
    views: 189,
    lastReply: "community.discussion3.lastReply",
    tags: ["community.tags.regulation", "community.tags.policy", "community.tags.analysis"]
  },
  {
    id: 4,
    title: "community.discussion4.title",
    author: "community.discussion4.author",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%204&sign=3fac798f0cb9117a50b7190050f54f04",
    date: "2025-09-05",
    replies: 56,
    views: 782,
    lastReply: "community.discussion4.lastReply",
    tags: ["community.tags.mining", "community.tags.experience", "community.tags.profit"]
  },
  {
    id: 5,
    title: "community.discussion5.title",
    author: "community.discussion5.author",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%205&sign=2ead1d98a8cc4677740377f885d9d597",
    date: "2025-08-28",
    replies: 19,
    views: 143,
    lastReply: "community.discussion5.lastReply",
    tags: ["community.tags.blockchain", "community.tags.supplyChain"]
  },
  {
    id: 6,
    title: "community.discussion6.title",
    author: "community.discussion6.author",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%206&sign=26ce7e85a841dafdf38cf35a62fd60be",
    date: "2025-08-20",
    replies: 33,
    views: 278,
    lastReply: "community.discussion6.lastReply",
    tags: ["community.tags.education", "community.tags.sharing", "community.tags.beginner"]
  }
];

// 讨论项组件 - 使用React.memo防止不必要的重渲染
const DiscussionItem = memo(({ discussion, onClick }: { discussion: typeof discussions[0], onClick: (id: number) => void }) => {
  const { t } = useI18n();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-4 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors cursor-pointer"
      onClick={() => onClick(discussion.id)}
    >
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <img 
            src={discussion.avatar} 
            alt={discussion.author}
            className="w-12 h-12 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
            loading="lazy"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg mb-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate">
            {discussion.title}
          </h3>
          
          <div className="flex flex-wrap items-center text-sm text-slate-500 dark:text-slate-400 mb-2 gap-x-4 gap-y-1">
            <span>{t('community.author')}: {discussion.author}</span>
            <span>{t('community.publishedAt')}: {discussion.date}</span>
            <span><i className="fa-solid fa-eye mr-1"></i> {discussion.views}</span>
            <span><i className="fa-solid fa-comment mr-1"></i> {discussion.replies}</span>
            <span>{t('community.lastReply')}: {discussion.lastReply}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {discussion.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs text-slate-600 dark:text-slate-300">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// 标签组件 - 使用React.memo防止不必要的重渲染
const TagItem = memo(({ tag, index }: { tag: { name: string, count: number }, index: number }) => {
  return (
    <Link 
      key={index}
      to={`/community/tags/${encodeURIComponent(tag.name)}`}
      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
    >
      <span>{tag.name}</span>
      <span className="bg-white dark:bg-slate-600 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded-full text-xs">
        {tag.count}
      </span>
    </Link>
  );
});

export default function Community() {
  const { t } = useI18n();
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [newTopic, setNewTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const postsPerPage = 5;

  // 社区讨论数据
  const discussions = [
    {
      id: 1,
      title: t('community.discussion1.title'),
      author: t('community.discussion1.author'),
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%201&sign=7cc5e5e9d261bde8ce5fccdb28c709aa",
      date: "2025-09-18",
      replies: 42,
      views: 356,
      lastReply: t('community.discussion1.lastReply'),
      tags: [t('community.tags.priceAnalysis'), t('community.tags.investmentStrategy')]
    },
    {
      id: 2,
      title: t('community.discussion2.title'),
      author: t('community.discussion2.author'),
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%202&sign=f2938273b9dc9bc101407615eb648d08",
      date: "2025-09-15",
      replies: 28,
      views: 210,
      lastReply: t('community.discussion2.lastReply'),
      tags: [t('community.tags.wallet'), t('community.tags.security'), t('community.tags.beginner')]
    },
    {
      id: 3,
      title: t('community.discussion3.title'),
      author: t('community.discussion3.author'),
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%203&sign=c8bb87cc81bc89d5d3d3ceaa37903fe2",
      date: "2025-09-10",
      replies: 15,
      views: 189,
      lastReply: t('community.discussion3.lastReply'),
      tags: [t('community.tags.regulation'), t('community.tags.policy'), t('community.tags.analysis')]
    },
    {
      id: 4,
      title: t('community.discussion4.title'),
      author: t('community.discussion4.author'),
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%204&sign=3fac798f0cb9117a50b7190050f54f04",
      date: "2025-09-05",
      replies: 56,
      views: 782,
      lastReply: t('community.discussion4.lastReply'),
      tags: [t('community.tags.mining'), t('community.tags.experience'), t('community.tags.profit')]
    },
    {
      id: 5,
      title: t('community.discussion5.title'),
      author: t('community.discussion5.author'),
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%205&sign=2ead1d98a8cc4677740377f885d9d597",
      date: "2025-08-28",
      replies: 19,
      views: 143,
      lastReply: t('community.discussion5.lastReply'),
      tags: [t('community.tags.blockchain'), t('community.tags.supplyChain')]
    },
    {
      id: 6,
      title: t('community.discussion6.title'),
      author: t('community.discussion6.author'),
      avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%206&sign=26ce7e85a841dafdf38cf35a62fd60be",
      date: "2025-08-20",
      replies: 33,
      views: 278,
      lastReply: t('community.discussion6.lastReply'),
      tags: [t('community.tags.education'), t('community.tags.sharing'), t('community.tags.beginner')]
    }
  ];

  // 使用useMemo缓存分页数据
  const paginatedDiscussions = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return discussions.slice(startIndex, startIndex + postsPerPage);
  }, [currentPage, discussions]);

  // 使用useMemo缓存总页数计算
  const totalPages = useMemo(() => {
    return Math.ceil(discussions.length / postsPerPage);
  }, [discussions.length]);

  // 使用useCallback优化事件处理函数
  const handleLogout = useCallback(() => {
    logout();
    toast.success(t('logout_success'));
    navigate('/login');
  }, [logout, navigate, t]);

  const handleDiscussionClick = useCallback((id: number) => {
    navigate(`/community/topic/${id}`);
  }, [navigate]);

  const handleNewTopic = useCallback(() => {
    if (!isAuthenticated) {
      toast.info(t('community.pleaseLogin'));
      navigate('/login');
      return;
    }
    
    if (!newTopic.trim()) {
      toast.error(t('community.topicRequired'));
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      toast.success(t('community.topicPublished'));
      setNewTopic("");
      setIsLoading(false);
    }, 800);
  }, [isAuthenticated, newTopic, navigate, t]);

  const handlePageChange = useCallback((page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [totalPages]);

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
            <Link to="/courses" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">{t('nav.courses')}</Link>
            <Link to="/tutorials" className="font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors">{t('nav.tutorials')}</Link>
            <Link to="/community" className="font-medium text-blue-600 dark:text-blue-400">{t('nav.community')}</Link>
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
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 主内容区 */}
          <div className="lg:w-full xl:w-2/3">
            {/* 页面标题 */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">{t('community.title')}</h1>
              <p className="text-slate-600 dark:text-slate-400">{t('community.subtitle')}</p>
            </div>
            
            {/* 发布新话题 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">{t('community.newTopic')}</h2>
              <div className="flex gap-4">
                <textarea
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder={t('community.topicPlaceholder')}
                  className="flex-1 p-4 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white transition-all"
                  rows={3}
                  disabled={isLoading}
                ></textarea>
                <button
                  onClick={handleNewTopic}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors whitespace-nowrap flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin mr-2"></i>
                      {t('community.publishing')}
                    </>
                  ) : (
                    t('community.publishTopic')
                  )}
                </button>
              </div>
            </div>
            
            {/* 讨论列表 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-wrap justify-between items-center gap-4">
                <h2 className="text-xl font-bold">{t('community.latestDiscussions')}</h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">{t('community.latest')}</button>
                  <button className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-lg text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">{t('community.popular')}</button>
                  <button className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-lg text-sm hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">{t('community.unanswered')}</button>
                </div>
              </div>
              
              <div className="divide-y divide-slate-200 dark:divide-slate-700">
                {paginatedDiscussions.map((discussion) => (
                  <DiscussionItem 
                    key={discussion.id} 
                    discussion={discussion} 
                    onClick={handleDiscussionClick}
                  />
                ))}
              </div>
              
              {/* 分页控件 */}
              {totalPages > 1 && (
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-center">
                  <div className="flex items-center space-x-2">
                    <button 
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750 disabled:opacity-50 disabled:cursor-not-allowed" 
                      disabled={currentPage === 1}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const pageNum = i + 1;
                      if (
                        pageNum === 1 || 
                        pageNum === totalPages || 
                        Math.abs(pageNum - currentPage) <= 1
                      ) {
                        return (
                          <button 
                            key={pageNum}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg ${
                              currentPage === pageNum 
                                ? 'bg-blue-600 text-white' 
                                : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750'
                            }`}
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      }
                      
                      if (
                        (pageNum === 2 && currentPage > 3) || 
                        (pageNum === totalPages - 1 && currentPage < totalPages - 2)
                      ) {
                        return <span key={`ellipsis-${pageNum}`} className="text-slate-500">...</span>;
                      }
                      
                      return null;
                    })}
                    
                    <button 
                      className="w-10 h-10 flex items-center justify-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-750 disabled:opacity-50 disabled:cursor-not-allowed" 
                      disabled={currentPage === totalPages}
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* 侧边栏 */}
          <div className="hidden xl:block xl:w-1/3 space-y-8">
            {/* 社区统计 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">{t('community.stats')}</h2>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1,254</p>
                  <p className="text-slate-500 dark:text-slate-400">{t('community.registeredMembers')}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">5,842</p>
                  <p className="text-slate-500 dark:text-slate-400">{t('community.discussionTopics')}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">32,651</p>
                  <p className="text-slate-500 dark:text-slate-400">{t('community.replies')}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">42</p>
                  <p className="text-slate-500 dark:text-slate-400">{t('community.todayPosts')}</p>
                </div>
              </div>
            </div>
            
            {/* 热门标签 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">{t('community.popularTags')}</h2>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: t('community.tags.bitcoin'), count: 128 },
                  { name: t('community.tags.blockchain'), count: 96 },
                  { name: t('community.tags.investment'), count: 87 },
                  { name: t('community.tags.trading'), count: 74 },
                  { name: t('community.tags.security'), count: 63 },
                  { name: t('community.tags.mining'), count: 58 },
                  { name: t('community.tags.regulation'), count: 45 },
                  { name: t('community.tags.wallet'), count: 42 },
                  { name: t('community.tags.beginner'), count: 39 },
                  { name: t('community.tags.technology'), count: 35 }
                ].map((tag, index) => (
                  <TagItem key={index} tag={tag} index={index} />
                ))}
              </div>
            </div>
            
            {/* 活跃用户 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">{t('community.activeUsers')}</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <img 
                      src={`https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Active%20user%20${i}`} 
                      alt={`${t('community.activeUser')} ${i}`}
                      className="w-10 h-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{t(`community.activeUser ${i}`)}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{t('community.posts')} {100 - i * 10} · {t('community.replies')} {500 - i * 50}</p>
                    </div>
                    <button className="text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">{t('community.follow')}</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* 页脚 */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fa-brands fa-bitcoin text-orange-500 text-2xl"></i>
                <h3 className="text-xl font-bold text-white">{t('app.name')}</h3>
              </div>
              <p className="mb-4">
                {t('footer.description')}
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
                <li><Link to="/contact" className="hover:text-white transition-colors">{t('footer.contact')}</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link></li>
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