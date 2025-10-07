import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

export default function FAQ() {
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
          <h1 className="text-3xl font-bold mb-2 text-center">常见问题</h1>
          <p className="text-slate-600 dark:text-slate-400 text-center mb-8">解答您关于比特币和我们平台的常见问题</p>
          
          <div className="space-y-6">
            {/* 平台使用相关 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">平台使用</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    如何注册和登录平台？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    您可以点击页面右上角的"注册"按钮，填写手机号、密码和验证码完成注册。注册成功后，使用手机号和密码登录平台。我们强烈建议您启用双重认证以提高账户安全性。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    平台上的课程是免费的吗？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    是的，我们平台上的所有基础课程都是免费提供的。我们相信知识应该开放和共享，致力于普及比特币和区块链知识。未来我们可能会推出高级专业课程，但基础内容将始终免费。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    如何更改我的个人信息？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    登录后，点击右上角的头像进入个人中心，在"账户设置"页面可以修改您的个人信息，包括昵称、头像、密码等。修改手机号需要验证原手机号，请确保您可以接收原手机号的验证码。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    如何找回我的密码？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    在登录页面点击"忘记密码"链接，输入您的注册手机号，系统将发送验证码到您的手机。输入验证码后，您可以设置新密码。请确保您的新密码包含字母和数字，长度不少于6位，以提高安全性。
                  </p>
                </div>
              </div>
            </section>
            
            {/* 课程学习相关 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">课程学习</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    如何选择适合我的课程？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    我们的课程按照难度分为入门、中级和高级三个级别。如果您是初学者，建议从"比特币基础知识"开始学习；如果您已有一定基础，可以选择"区块链技术原理"等中级课程；专业人士可以学习"比特币投资策略"等高级课程。每个课程页面都有详细描述，帮助您判断是否适合自己。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue－600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    完成课程后能获得证书吗？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    是的，完成课程学习并通过课程测验后，您将获得相应的课程完成证书。证书包含您的姓名、课程名称和完成日期，可以下载保存或分享到社交媒体。这些证书可以证明您掌握了相关知识和技能。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    课程内容会定期更新吗？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    是的，我们会定期更新课程内容以反映比特币和区块链领域的最新发展。当课程内容更新时，已报名的学员会收到通知，并且可以免费学习更新后的内容。我们致力于提供最新、最准确的知识。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    我可以下载课程视频离线观看吗？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    目前我们不提供课程视频的下载功能，所有课程内容需要在线观看。我们采用自适应流媒体技术，可以根据您的网络状况自动调整视频质量，确保流畅观看体验。您可以在个人中心查看学习进度，方便下次继续学习。
                  </p>
                </div>
              </div>
            </section>
            
            {/* 比特币相关 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">比特币基础知识</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    什么是比特币？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    比特币是一种去中心化的数字货币，由中本聪在2008年提出，2009年正式诞生。它基于区块链技术，不依赖任何中央机构发行和管理，通过密码学保证交易安全。比特币的总量有限（2100万枚），具有稀缺性，这也是其价值的重要基础。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    如何安全存储比特币？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    存储比特币的关键是安全保存私钥（一串由字母和数字组成的字符串）。常见的存储方式包括硬件钱包（最安全）、软件钱包（便捷）和纸钱包（适合长期存储）。无论使用哪种方式，都应确保私钥不会泄露或丢失。我们的"如何安全存储比特币"教程详细介绍了各种存储方法及其优缺点。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    比特币投资有风险吗？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    是的，比特币价格波动较大，投资比特币存在较高风险。比特币市场受多种因素影响，包括监管政策、市场情绪、技术发展等。我们建议您在投资前充分了解比特币的基本知识和市场特性，只投资您能承受损失的金额，并采取适当的风险管理策略。我们的"比特币投资策略"课程详细介绍了相关知识。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    比特币和区块链有什么关系？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    区块链是比特币的底层技术，是一种分布式账本技术。比特币是区块链技术的第一个应用。区块链可以理解为一个去中心化的数据库，所有交易信息都记录在区块中，并通过密码学链接在一起，形成不可篡改的链式结构。除了比特币，区块链技术还有许多其他应用，如智能合约、供应链管理、数字身份等。
                  </p>
                </div>
              </div>
            </section>
            
            {/* 社区相关 */}
            <section>
              <h2 className="text-2xl font-bold mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">社区互动</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    如何在社区发布话题和回复？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    登录后，在社区页面顶部的"发布新话题"区域输入标题和内容，选择相关标签，然后点击"发布话题"按钮即可。在话题详情页面，您可以在评论区输入内容并点击"发表回复"参与讨论。请遵守社区规范，文明发言。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    社区有哪些讨论板块？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    目前我们的社区包括以下板块：技术讨论（区块链技术相关）、投资交流（价格分析和投资策略）、新手问答（入门问题解答）、挖矿技术（比特币挖矿相关）、项目分析（区块链项目讨论）和社区公告。您可以根据话题内容选择合适的板块发布。
                  </p>
                </div>
                
                <div>
                  <h3 className="font-bold text-lg mb-2 flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">Q</span>
                    社区有哪些行为规范？
                  </h3>
                  <p className="pl-8 text-slate-600 dark:text-slate-400">
                    我们的社区旨在提供一个友好、尊重和有建设性的交流环境。社区成员应遵守以下规范：尊重他人，不发表攻击性言论；不发布垃圾信息、广告或无关内容；不传播虚假信息；不讨论非法活动；保护个人隐私，不泄露他人信息。违反社区规范的用户可能会被警告、禁言或封禁账号。
                  </p>
                </div>
              </div>
            </section>
          </div>
          
          <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 text-center">
            <h3 className="text-xl font-bold mb-4">还有其他问题？</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">如果您有其他问题，欢迎联系我们的客服团队</p>
            <Link to="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors">
              联系我们
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}