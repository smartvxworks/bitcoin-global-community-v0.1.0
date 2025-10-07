// 负载测试脚本
// 使用 Artillery 进行比特币中国社区负载测试

const artillery = require('artillery');
const path = require('path');

class PerformanceTestRunner {
  constructor() {
    this.testConfigs = {
      // 基础负载测试
      basic: {
        config: path.join(__dirname, 'artillery-base-config.yml'),
        description: '基础负载测试 - 混合场景'
      },
      
      // 用户注册压力测试
      registration: {
        config: path.join(__dirname, 'registration-stress-test.yml'),
        description: '用户注册压力测试'
      },
      
      // 用户登录压力测试  
      login: {
        config: path.join(__dirname, 'login-stress-test.yml'),
        description: '用户登录压力测试'
      },
      
      // 课程浏览压力测试
      courses: {
        config: path.join(__dirname, 'courses-stress-test.yml'),
        description: '课程浏览压力测试'
      },
      
      // 社区讨论压力测试
      community: {
        config: path.join(__dirname, 'community-stress-test.yml'),
        description: '社区讨论压力测试'
      }
    };
  }

  // 运行指定测试
  async runTest(testName, options = {}) {
    const testConfig = this.testConfigs[testName];
    if (!testConfig) {
      throw new Error(`测试配置不存在: ${testName}`);
    }

    console.log(`🚀 开始运行测试: ${testConfig.description}`);
    console.log(`📁 配置文件: ${testConfig.config}`);
    
    const testOptions = {
      target: options.target || 'http://localhost:3000',
      output: options.output || `reports/${testName}-${Date.now()}.json`,
      ...options
    };

    try {
      const test = artillery.load(testConfig.config);
      const results = await artillery.run(test, testOptions);
      
      this.generateReport(results, testName);
      return results;
    } catch (error) {
      console.error(`❌ 测试执行失败: ${error.message}`);
      throw error;
    }
  }

  // 生成测试报告
  generateReport(results, testName) {
    console.log('\n📊 === 测试报告 ===');
    console.log(`测试名称: ${testName}`);
    console.log(`开始时间: ${new Date(results.startTime).toLocaleString()}`);
    console.log(`结束时间: ${new Date(results.endTime).toLocaleString()}`);
    console.log(`持续时间: ${((results.endTime - results.startTime) / 1000).toFixed(2)} 秒`);
    
    const aggregate = results.aggregate;
    console.log(`\n📈 性能指标:`);
    console.log(`总请求数: ${aggregate.codes['200'] || 0}`);
    console.log(`错误请求数: ${Object.keys(aggregate.codes).filter(code => code >= '400').reduce((sum, code) => sum + aggregate.codes[code], 0)}`);
    
    const responseTimes = aggregate.timers;
    if (responseTimes) {
      console.log(`平均响应时间: ${responseTimes.mean.toFixed(2)}ms`);
      console.log(`95% 分位响应时间: ${responseTimes.p95.toFixed(2)}ms`);
      console.log(`最大响应时间: ${responseTimes.max.toFixed(2)}ms`);
    }
    
    console.log('================\n');
  }

  // 运行所有测试
  async runAllTests(options = {}) {
    console.log('🧪 开始运行所有性能测试...\n');
    
    const testResults = {};
    
    for (const [testName, config] of Object.entries(this.testConfigs)) {
      try {
        console.log(`\n🔬 运行测试: ${config.description}`);
        testResults[testName] = await this.runTest(testName, options);
        
        // 添加延迟，避免服务器过载
        await new Promise(resolve => setTimeout(resolve, 5000));
      } catch (error) {
        console.error(`❌ 测试 ${testName} 失败:`, error.message);
        testResults[testName] = { error: error.message };
      }
    }
    
    this.generateSummaryReport(testResults);
    return testResults;
  }

  // 生成总结报告
  generateSummaryReport(testResults) {
    console.log('\n🎯 === 测试总结报告 ===');
    
    let totalTests = 0;
    let passedTests = 0;
    let failedTests = 0;
    
    Object.entries(testResults).forEach(([testName, result]) => {
      totalTests++;
      
      if (result.error) {
        failedTests++;
        console.log(`❌ ${testName}: 失败 - ${result.error}`);
      } else {
        passedTests++;
        const aggregate = result.aggregate;
        const errorCount = Object.keys(aggregate.codes).filter(code => code >= '400').reduce((sum, code) => sum + aggregate.codes[code], 0);
        const totalRequests = Object.values(aggregate.codes).reduce((sum, count) => sum + count, 0);
        const errorRate = totalRequests > 0 ? (errorCount / totalRequests * 100).toFixed(2) : 0;
        
        console.log(`✅ ${testName}: 成功 - 错误率 ${errorRate}%`);
      }
    });
    
    console.log(`\n📊 统计:`);
    console.log(`总测试数: ${totalTests}`);
    console.log(`通过测试: ${passedTests}`);
    console.log(`失败测试: ${failedTests}`);
    console.log(`通过率: ${((passedTests / totalTests) * 100).toFixed(1)}%`);
    console.log('====================\n');
  }
}

// 性能测试标准验证
class PerformanceValidator {
  static validateResponseTime(result, endpoint, maxTime) {
    const aggregate = result.aggregate;
    const meanTime = aggregate.timers ? aggregate.timers.mean : 0;
    
    if (meanTime > maxTime) {
      return {
        passed: false,
        message: `${endpoint} 平均响应时间 ${meanTime.toFixed(2)}ms 超过标准 ${maxTime}ms`
      };
    }
    
    return { passed: true, message: `${endpoint} 响应时间符合标准` };
  }
  
  static validateErrorRate(result, maxErrorRate) {
    const aggregate = result.aggregate;
    const errorCount = Object.keys(aggregate.codes).filter(code => code >= '400').reduce((sum, code) => sum + aggregate.codes[code], 0);
    const totalRequests = Object.values(aggregate.codes).reduce((sum, count) => sum + count, 0);
    const errorRate = totalRequests > 0 ? (errorCount / totalRequests) : 0;
    
    if (errorRate > maxErrorRate) {
      return {
        passed: false,
        message: `错误率 ${(errorRate * 100).toFixed(2)}% 超过标准 ${maxErrorRate * 100}%`
      };
    }
    
    return { passed: true, message: `错误率 ${(errorRate * 100).toFixed(2)}% 符合标准` };
  }
}

// 导出测试运行器
module.exports = {
  PerformanceTestRunner,
  PerformanceValidator
};

// 如果直接运行此文件，执行示例测试
if (require.main === module) {
  const runner = new PerformanceTestRunner();
  
  // 示例：运行基础负载测试
  runner.runTest('basic', {
    target: 'http://localhost:3000',
    output: 'reports/basic-test.json'
  }).catch(console.error);
}