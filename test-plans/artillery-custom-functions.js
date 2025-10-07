// Artillery 自定义函数库
// 比特币中国社区性能测试辅助函数

module.exports = {
  // 生成随机整数
  randomInt: (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // 生成随机手机号
  generateRandomPhone: () => {
    const prefixes = ['138', '139', '150', '151', '152', '157', '158', '159'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    return prefix + suffix;
  },

  // 生成随机密码
  generateRandomPassword: () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  },

  // 生成测试讨论数据
  generateDiscussionData: () => {
    const titles = [
      '比特币技术讨论',
      '区块链应用探讨',
      '加密货币投资分析',
      'DeFi生态发展',
      'NFT市场趋势',
      'Web3技术前沿',
      '智能合约安全',
      'Layer2扩容方案'
    ];
    
    const contents = [
      '欢迎大家分享自己的观点和经验，共同探讨技术发展。',
      '最近市场波动较大，想听听大家的看法和建议。',
      '新手入门，求各位大佬指导和建议，非常感谢！',
      '技术讨论：不同区块链方案的优缺点比较分析。',
      '投资经验分享：我的加密货币投资策略和风险管理。',
      '项目分析：最近关注的一些有潜力的区块链项目。',
      '安全提醒：如何保护好自己的数字资产安全。',
      '未来展望：区块链技术在未来几年的发展趋势。'
    ];
    
    const title = titles[Math.floor(Math.random() * titles.length)];
    const content = contents[Math.floor(Math.random() * contents.length)];
    
    return {
      title: `${title} - ${Date.now()}`,
      content: `${content} 这是性能测试自动生成的内容。`
    };
  },

  // 生成测试课程数据
  generateCourseData: () => {
    const levels = ['beginner', 'intermediate', 'advanced'];
    const durations = ['1小时', '2小时', '3小时', '4小时', '6小时'];
    
    return {
      title: `测试课程 ${Math.floor(Math.random() * 1000)}`,
      description: '这是性能测试自动生成的课程描述',
      level: levels[Math.floor(Math.random() * levels.length)],
      duration: durations[Math.floor(Math.random() * durations.length)],
      imageUrl: '/images/course-placeholder.jpg'
    };
  },

  // 响应时间验证函数
  validateResponseTime: (response, context, events, next) => {
    const url = response.request.url;
    const responseTime = response.timings.phases.total;
    
    // 不同接口的性能标准
    const performanceStandards = {
      '/api/auth/register': 500,    // 注册接口：500ms
      '/api/auth/login': 300,       // 登录接口：300ms
      '/api/courses': 200,          // 课程列表：200ms
      '/api/courses/': 150,         // 课程详情：150ms
      '/api/community/discussions': 250, // 讨论列表：250ms
      'default': 300                // 默认标准：300ms
    };
    
    let maxAllowedTime = performanceStandards.default;
    
    // 匹配具体的性能标准
    for (const [endpoint, time] of Object.entries(performanceStandards)) {
      if (url.includes(endpoint) && endpoint !== 'default') {
        maxAllowedTime = time;
        break;
      }
    }
    
    if (responseTime > maxAllowedTime) {
      console.warn(`性能警告: ${url} 响应时间 ${responseTime}ms 超过标准 ${maxAllowedTime}ms`);
    }
    
    next();
  },

  // 错误率监控函数
  monitorErrorRate: (requestParams, context, events, next) => {
    const errorStats = context.vars.errorStats || {
      total: 0,
      errors: 0,
      byEndpoint: {}
    };
    
    errorStats.total++;
    
    // 记录错误统计
    events.on('response', (response) => {
      if (response.statusCode >= 400) {
        errorStats.errors++;
        const endpoint = new URL(response.request.url).pathname;
        errorStats.byEndpoint[endpoint] = (errorStats.byEndpoint[endpoint] || 0) + 1;
      }
    });
    
    context.vars.errorStats = errorStats;
    next();
  },

  // 性能报告生成函数
  generatePerformanceReport: (context, events, done) => {
    const stats = context.vars.errorStats || { total: 0, errors: 0, byEndpoint: {} };
    const errorRate = stats.total > 0 ? (stats.errors / stats.total * 100).toFixed(2) : 0;
    
    console.log('\n=== 性能测试报告 ===');
    console.log(`总请求数: ${stats.total}`);
    console.log(`错误请求数: ${stats.errors}`);
    console.log(`错误率: ${errorRate}%`);
    
    if (Object.keys(stats.byEndpoint).length > 0) {
      console.log('\n各接口错误分布:');
      Object.entries(stats.byEndpoint).forEach(([endpoint, count]) => {
        console.log(`  ${endpoint}: ${count} 次错误`);
      });
    }
    
    console.log('===================\n');
    done();
  },

  // 内存使用监控（模拟）
  monitorMemoryUsage: () => {
    const used = process.memoryUsage();
    console.log(`内存使用 - RSS: ${Math.round(used.rss / 1024 / 1024)}MB, Heap: ${Math.round(used.heapUsed / 1024 / 1024)}MB`);
  },

  // 数据库连接监控（模拟）
  monitorDatabaseConnections: () => {
    // 模拟数据库连接监控
    const connections = Math.floor(Math.random() * 10) + 1;
    console.log(`活跃数据库连接: ${connections}`);
    return connections;
  }
};

// 导出给 Artillery 使用
module.exports = {
  ...module.exports,
  // Artillery 要求的函数签名
  beforeRequest: module.exports.monitorErrorRate,
  afterResponse: module.exports.validateResponseTime,
  teardown: module.exports.generatePerformanceReport
};