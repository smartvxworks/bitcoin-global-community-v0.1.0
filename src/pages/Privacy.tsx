import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/authContext';
import { toast } from 'sonner';

export default function Privacy() {
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
          <h1 className="text-3xl font-bold mb-6 text-center">隐私政策</h1>
          
          <div className="space-y-6 text-slate-700 dark:text-slate-300">
            <p className="text-sm text-slate-500 dark:text-slate-400 italic mb-8 text-center">
              最后更新日期: 2025年9月1日
            </p>
            
            <section>
              <h2 className="text-xl font-bold mb-4">1. 引言</h2>
              <p className="mb-4">
                BTC教学平台（以下简称"我们"）尊重并保护所有使用我们平台的用户的个人隐私权。本隐私政策旨在帮助您了解我们如何收集、使用、存储和保护您的个人信息，以及您对这些信息的控制方式。
              </p>
              <p>
                使用我们的平台，即表示您同意我们按照本隐私政策收集、使用、存储和披露您的信息。如果您不同意本隐私政策的任何部分，请不要使用我们的平台。
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">2. 我们收集的信息</h2>
              <p className="mb-4">
                我们可能会收集以下类型的信息：
              </p>
              
              <h3 className="font-bold text-lg mb-2">2.1 个人身份信息</h3>
              <p className="mb-4">
                当您注册账户、使用我们的服务或参与我们的活动时，我们可能会收集您的个人身份信息，包括但不限于：
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>姓名</li>
                <li>电子邮件地址</li>
                <li>手机号码</li>
                <li>用户名和密码</li>
              </ul>
              
              <h3 className="font-bold text-lg mb-2">2.2 使用信息</h3>
              <p className="mb-4">
                我们可能会收集有关您如何使用我们平台的信息，包括但不限于：
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>您访问的页面</li>
                <li>您点击的链接</li>
                <li>您查看的内容</li>
                <li>您在我们平台上花费的时间</li>
                <li>您使用的设备类型</li>
                <li>您的IP地址</li>
                <li>浏览器类型和版本</li>
                <li>操作系统</li>
              </ul>
              
              <h3 className="font-bold text-lg mb-2">2.3 Cookie和类似技术</h3>
              <p>
                我们使用Cookie和类似技术（如网络信标）来收集和存储信息。Cookie是网站发送到您浏览器的小型数据文件，帮助我们改善平台体验。您可以通过调整浏览器设置来拒绝Cookie，但这可能会影响平台的某些功能。
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">3. 我们如何使用您的信息</h2>
              <p className="mb-4">
                我们可能会将收集的信息用于以下目的：
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>提供、维护和改进我们的平台服务</li>
                <li>创建和管理您的账户</li>
                <li>处理您的请求和交易</li>
                <li>向您发送重要通知，如服务更新和政策变更</li>
                <li>提供客户支持</li>
                <li>个性化您的体验，推荐您可能感兴趣的内容</li>
                <li>监控和分析平台使用趋势和活动</li>
                <li>保护我们平台和用户的安全</li>
                <li>遵守法律义务</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">4. 信息共享和披露</h2>
              <p className="mb-4">
                我们不会向第三方出售、交易或以其他方式转让您的个人身份信息，除非获得您的明确许可或在以下情况下：
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>向协助我们运营平台、提供服务或处理交易的可信第三方披露，这些第三方同意对您的信息保密</li>
                <li>为遵守法律、法规、法律程序或政府要求</li>
                <li>保护我们的权利、财产或安全，以及我们的用户和公众的权利、财产或安全</li>
                <li>在涉及合并、收购或资产出售的情况下，我们会通知您，您的信息可能会转移给新的实体</li>
              </ul>
              <p>
                我们可能会共享非个人身份信息，这些信息不能用于识别您的身份。
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">5. 信息安全</h2>
              <p className="mb-4">
                我们采取合理的安全措施来保护您的个人信息免受未经授权的访问、使用或披露。这些措施包括但不限于：
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>加密敏感信息</li>
                <li>安全服务器存储</li>
                <li>访问控制措施</li>
                <li>定期安全审计</li>
              </ul>
              <p>
                尽管我们采取了合理的安全措施，但请理解，任何互联网传输都不是100%安全的，我们不能保证您的信息绝对安全。
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">6. 您的权利和选择</h2>
              <p className="mb-4">
                您有权访问、更正或删除您的个人信息，以及限制或反对某些信息处理活动。您可以通过以下方式行使这些权利：
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-1">
                <li>登录您的账户，访问"个人中心"修改您的信息</li>
                <li>通过本隐私政策底部提供的联系方式与我们联系</li>
              </ul>
              <p>
                您也可以随时取消订阅我们的电子邮件通讯，方法是点击每封电子邮件底部的"取消订阅"链接。
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">7. 数据保留</h2>
              <p>
                我们将在实现本隐私政策中所述目的所需的期限内保留您的个人信息，除非法律要求或允许更长的保留期。当我们不再需要您的信息时，我们将采取合理措施安全销毁或匿名化您的信息。
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">8. 第三方链接</h2>
              <p>
                我们的平台可能包含指向第三方网站的链接。这些第三方网站有其自己的隐私政策，我们不对这些第三方网站的内容或隐私做法负责。我们鼓励您在离开我们的平台前查看这些第三方网站的隐私政策。
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">9. 儿童隐私</h2>
              <p>
                我们的平台不面向13岁以下的儿童，我们不会故意收集13岁以下儿童的个人信息。如果我们发现我们在未获得父母同意的情况下收集了13岁以下儿童的个人信息，我们将删除这些信息。
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">10. 隐私政策的变更</h2>
              <p className="mb-4">
                我们可能会不时更新本隐私政策。当我们进行更改时，我们将更新本页面顶部的"最后更新日期"。我们鼓励您定期查看本隐私政策，了解我们如何保护您的信息。
              </p>
              <p>
                对于重大变更，我们将通过电子邮件通知您，或在我们的平台上发布通知。您继续使用我们的平台即表示您接受更新后的隐私政策。
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-bold mb-4">11. 联系我们</h2>
              <p className="mb-4">
                如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式联系我们：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>电子邮件：privacy@btceduplatform.com</li>
                <li>联系表单：<Link to="/contact" className="text-blue-600 dark:text-blue-400 hover:underline">联系我们</Link></li>
              </ul>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}