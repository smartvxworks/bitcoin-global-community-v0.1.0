import { useContext, useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

// 模拟话题数据
const topicsData = [
  {
    id: 1,
    title: "比特币价格突破10万美元，是继续持有还是获利了结？",
    author: "加密爱好者",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%201&sign=7cc5e5e9d261bde8ce5fccdb28c709aa",
    date: "2025-09-18",
    content: `
      <p>大家好，最近比特币价格突破了10万美元大关，创下历史新高。作为一名持有比特币两年的投资者，我现在面临一个艰难的决定：是继续持有还是获利了结？</p>
      
      <p>一方面，许多专家预测比特币价格还会继续上涨，可能在年底前达到15万美元甚至更高。区块链技术的应用也在不断扩展，这可能会进一步推高比特币的价值。</p>
      
      <p>另一方面，当前价格已经处于历史高位，市场波动加剧，随时可能出现大幅回调。部分机构投资者已经开始减持，这可能是一个危险信号。</p>
      
      <p>我想听听社区各位的意见，你们会如何决策？是继续持有，部分获利了结，还是全部卖出？请分享你们的观点和理由。</p>
    `,
    tags: ["价格分析", "投资策略"],
    views: 356,
    replies: 42,
    lastReply: "2小时前",
    repliesData: [
      {
        id: 1,
        author: "区块链专家",
        avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Expert%20avatar&sign=3696c78c5792406e5d23e1a4a6c5e8de",
        date: "2025-09-18",
        content: "我建议采取部分获利了结的策略，卖出30-50%的持仓，这样既可以锁定部分利润，又能继续享受可能的上涨空间。"
      },
      {
        id: 2,
        avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=HODLer%20avatar&sign=ce9ff2088aac774a8bc6b52477943335",
        author: "长期持有者",
        date: "2025-09-18",
        content: "作为一个长期持有者，我经历过多次波动。我的策略是永远不卖，除非达到我的目标价格。比特币的长期前景依然光明。"
      },
      {
        id: 3,
        author: "交易员",
        avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Trader%20avatar&sign=63d82b3a861eb0f066662ed23e4310f4",
        date: "2025-09-18",
        content: "从技术分析来看，当前价格处于超买区域，RSI指标显示严重超买，可能会出现回调。建议先卖出，等待回调后再买入。"
      }
    ]
  },
  {
    id: 2,
    title: "新手提问：如何选择安全的比特币钱包？",
    author: "区块链新手",
    avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=User%20avatar%202&sign=f2938273b9dc9bc101407615eb648d08",
    date: "2025-09-15",
    content: `
      <p>大家好，我是刚接触比特币的新手，想请教一下如何选择安全的比特币钱包？</p>
      
      <p>我听说有硬件钱包、软件钱包、在线钱包等不同类型，它们各有什么优缺点？对于新手来说哪种最适合？</p>
      
      <p>另外，保存私钥有什么需要特别注意的地方？有没有什么安全建议可以分享？</p>
    `,
    tags: ["钱包", "安全", "新手"],
    views: 210,
    replies: 28,
    lastReply: "5小时前",
    repliesData: [
      {
        id: 1,
        author: "安全专家",
        avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Security%20expert%20avatar&sign=61ed77043211398b17ff9f77c09f9129",
        date: "2025-09-15",
        content: "对于新手，我建议从硬件钱包开始，虽然价格稍高，但安全性最高。Ledger和Trezor都是不错的选择。"
      },
      {
        id: 2,
        author: "资深用户",
        avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Experienced%20user%20avatar&sign=f90fa0333507f415e683dbf4997e5733",
        date: "2025-09-15",
        content: "私钥一定要离线保存！可以写在纸上存放在安全的地方，不要拍照或存储在联网设备中。"
      }
    ]
  }
];

// 获取话题详情
const getTopicDetails = (id: string | undefined) => {
  if (!id) return null;
  return topicsData.find(topic => topic.id === parseInt(id));
};

export default function CommunityTopic() {
  const { id } = useParams();
  const { isAuthenticated } = useContext(AuthContext);
  const [replyContent, setReplyContent] = useState("");
  const [showRetryButton, setShowRetryButton] = useState(false);
  const navigate = useNavigate();
  const [topicDetails, setTopicDetails] = useState(getTopicDetails(id));
  
  // 如果话题不存在，重定向到社区首页
  useEffect(() => {
    if (!topicDetails && id) {
      toast.error('话题不存在');
      navigate('/community');
    }
  }, [id, topicDetails, navigate]);
  
  if (!topicDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <i className="fa-solid fa-circle-notch fa-spin text-4xl text-blue-600 mb-4"></i>
          <p className="text-xl text-slate-600 dark:text-slate-400">加载中...</p>
        </div>
      </div>
    );
  }
  
   const handleReply = async () => {
     if (!isAuthenticated) {
       toast.info('请先登录后再回复');
       navigate('/login');
       return;
     }
     
     if (!replyContent.trim()) {
       toast.error('请输入回复内容');
       return;
     }
     
     try {
       // 模拟API请求延迟
       await new Promise(resolve => setTimeout(resolve, 800));
       
       // 创建新回复对象
       const newReply = {
         id: Date.now(),
         author: "当前用户",
         avatar: "https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=Current%20user%20avatar&sign=ce79da47f423fd37d0b3ab7be3e1faf2",
         date: new Date().toLocaleDateString(),
         content: replyContent
       };
       
       // 更新回复列表
        if (topicDetails) {
          setTopicDetails({
            ...topicDetails,
            repliesData: [...topicDetails.repliesData, newReply]
          });
        }
       
       toast.success('回复成功！');
       setReplyContent("");
     } catch (error) {
        toast.error('回复失败，请重试');
        setShowRetryButton(true);
      }
   };

   // 处理点赞功能
    const handleLike = async (replyId: number) => {
      try {
        // 模拟API请求延迟
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (topicDetails) {
          setTopicDetails({
            ...topicDetails,
            repliesData: topicDetails.repliesData.map(reply => 
              reply.id === replyId 
                ? { ...reply, likes: ((reply as any).likes || 0) + 1 } 
                : reply
            )
          });
        }
        
        toast.success('点赞成功！');
      } catch (error) {
        toast.error('点赞失败，请重试');
      }
    };
  
   // 添加错误重试机制组件
   const ErrorRetry = ({ message, onRetry }: { message: string, onRetry: () => void }) => (
     <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex flex-col items-center justify-center text-center">
       <i className="fa-solid fa-exclamation-circle text-red-500 dark:text-red-400 text-2xl mb-2"></i>
       <p className="text-red-600 dark:text-red-400 mb-4">{message}</p>
       <button 
         onClick={onRetry}
         className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
       >
         重试
       </button>
     </div>
   );

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
            <Link to="/community" className="font-medium text-blue-600 dark:text-blue-400">社区</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link to="/profile" className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition-colors">
                个人中心
              </Link>
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
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 主内容区 */}
          <div className="lg:w-2/3">
            {/* 话题标题区 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {topicDetails.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs text-slate-600 dark:text-slate-300">
                    {tag}
                  </span>
                ))}
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{topicDetails.title}</h1>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img 
                    src={topicDetails.avatar} 
                    alt={topicDetails.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{topicDetails.author}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{topicDetails.date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <span><i className="fa-solid fa-eye mr-1"></i> {topicDetails.views} 次查看</span>
                  <span><i className="fa-solid fa-comment mr-1"></i> {topicDetails.replies} 条回复</span>
                </div>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                {topicDetails.content.split('\n').map((paragraph, index) => {
                  if (paragraph.trim().startsWith('<p>') && paragraph.trim().endsWith('</p>')) {
                    const text = paragraph.trim().replace(/<\/?p>/g, '');
                    return <p key={index} className="mb-4">{text}</p>;
                  }
                  return null;
                })}
              </div>
            </div>
            
            {/* 回复区标题 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 mb-6">
              <h2 className="text-xl font-bold">回复 ({topicDetails.replies})</h2>
            </div>
            
            {/* 回复输入框 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-medium mb-4">发表回复</h3>
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="分享您的观点..."
                className="w-full p-4 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white min-h-[120px]"
              ></textarea>
              <div className="mt-4 text-right">
                <button
                  onClick={handleReply}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                   {showRetryButton ? (
                     <>
                       <button 
                         onClick={() => {
                           setShowRetryButton(false);
                           handleReply();
                         }}
                         className="mr-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                       >
                         重试
                       </button>
                       发表回复
                     </>
                   ) : (
                     "发表回复"
                   )}
                </button>
              </div>
            </div>
            
            {/* 回复列表 */}
            <div className="space-y-6">
              {topicDetails.repliesData.map((reply) => (
                <div key={reply.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <img 
                      src={reply.avatar} 
                      alt={reply.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{reply.author}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{reply.date}</p>
                    </div>
                  </div>
                  
                  <p>{reply.content}</p>
                  
                  <div className="mt-4 flex items-center gap-4 text-sm">
      <button 
        onClick={() => handleLike(reply.id)}
        className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
      >
        <i className="fa-solid fa-thumbs-up mr-1"></i> 赞同 ({(reply as any).likes || 0})
      </button>
     <button className="text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
       <i className="fa-solid fa-reply mr-1"></i> 回复
     </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* 侧边栏 */}
          <div className="lg:w-1/3 space-y-8">
            {/* 作者信息 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">作者信息</h2>
              <div className="flex flex-col items-center text-center">
                <img 
                  src={topicDetails.avatar} 
                  alt={topicDetails.author}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-slate-200 dark:border-slate-700"
                />
                <h3 className="text-lg font-bold mb-1">{topicDetails.author}</h3>
                <p className="text-slate-500 dark:text-slate-400 mb-4">加密货币爱好者 | 区块链投资者</p>
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  关注作者
                </button>
              </div>
            </div>
            
            {/* 相关话题 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">相关话题</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <Link 
                    key={i}
                     to={`/community/topic/${i + 2}`}
                    className="block p-3 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-lg transition-colors"
                  >
                    <h3 className="font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2">
                      {i % 2 === 0 
                        ? "以太坊2.0升级对加密货币市场的影响分析" 
                        : "如何构建一个安全的加密货币投资组合"}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {i + 15} 条回复 · {i + 2} 天前
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* 热门标签 */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">热门标签</h2>
              <div className="flex flex-wrap gap-2">
                {["比特币", "区块链", "投资", "交易", "安全", "挖矿", "监管", "钱包", "新手", "技术"].map((tag, index) => (
                  <Link 
                    key={index}
                    to={`/community/tags/${tag}`}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {tag}
                  </Link>
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
                <h3 className="text-xl font-bold text-white">BTC教学平台</h3>
              </div>
              <p className="mb-4">
                提供全面的比特币和区块链技术学习资源，帮助您掌握数字资产知识。
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
              <h4 className="text-white font-bold mb-4">快速链接</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-white transition-colors">首页</Link></li>
                <li><Link to="/courses" className="hover:text-white transition-colors">课程</Link></li>
                <li><Link to="/tutorials" className="hover:text-white transition-colors">教程</Link></li>
                <li><Link to="/community" className="hover:text-white transition-colors">社区</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">支持</h4>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-white transition-colors">帮助中心</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">常见问题</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">联系我们</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">隐私政策</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-4">订阅资讯</h4>
              <p className="mb-4">获取最新的比特币资讯和学习资源</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="您的邮箱地址" 
                  className="px-4 py-2 bg-slate-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r-lg transition-colors">
                  订阅
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-sm">
            <p>© 2025 BTC教学平台. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}