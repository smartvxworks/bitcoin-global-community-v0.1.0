#!/usr/bin/env node

/**
 * 比特币中国社区测试套件执行脚本
 * 自动化运行所有测试并生成报告
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class TestRunner {
  constructor() {
    this.testResults = {
      unit: { passed: 0, failed: 0, total: 0 },
      performance: { passed: 0, failed: 0, total: 0 },
      coverage: { percentage: 0, lines: 0, functions: 0 }
    };
    
    this.reportDir = path.join(__dirname, 'reports');
    this.coverageDir = path.join(__dirname, '..', 'coverage');
    
    // 确保报告目录存在
    if (!fs.existsSync(this.reportDir)) {
      fs.mkdirSync(this.reportDir, { recursive: true });
    }
  }

  // 运行单元测试
  runUnitTests() {
    console.log('🧪 开始运行单元测试...\n');
    
    try {
      const result = execSync('npm run test:unit', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });
      
      console.log(result);
      
      // 解析测试结果（简化版本）
      const passedMatch = result.match(/(\d+) passed/);
      const failedMatch = result.match(/(\d+) failed/);
      
      this.testResults.unit.passed = passedMatch ? parseInt(passedMatch[1]) : 0;
      this.testResults.unit.failed = failedMatch ? parseInt(failedMatch[1]) : 0;
      this.testResults.unit.total = this.testResults.unit.passed + this.testResults.unit.failed;
      
      console.log(`✅ 单元测试完成: ${this.testResults.unit.passed} 通过, ${this.testResults.unit.failed} 失败\n`);
      return true;
    } catch (error) {
      console.error('❌ 单元测试失败:', error.message);
      return false;
    }
  }

  // 运行覆盖率测试
  runCoverageTests() {
    console.log('📊 开始运行覆盖率测试...\n');
    
    try {
      const result = execSync('npm run test:coverage', { 
        cwd: path.join(__dirname, '..'),
        encoding: 'utf8'
      });
      
      console.log('覆盖率测试完成');
      
      // 尝试读取覆盖率报告
      const coveragePath = path.join(this.coverageDir, 'lcov-report', 'index.html');
      if (fs.existsSync(coveragePath)) {
        console.log(`📈 覆盖率报告生成在: ${coveragePath}`);
      }
      
      return true;
    } catch (error) {
      console.error('❌ 覆盖率测试失败:', error.message);
      return false;
    }
  }

  // 运行性能测试
  runPerformanceTests() {
    console.log('⚡ 开始运行性能测试...\n');
    
    const performanceTests = [
      { name: '基础性能测试', script: 'artillery-base-config.yml' },
      { name: '注册压力测试', script: 'registration-stress-test.yml' },
      { name: '登录压力测试', script: 'login-stress-test.yml' },
      { name: '课程压力测试', script: 'courses-stress-test.yml' },
      { name: '社区压力测试', script: 'community-stress-test.yml' }
    ];
    
    let allPassed = true;
    
    performanceTests.forEach((test, index) => {
      console.log(`\n🔬 运行 ${test.name} (${index + 1}/${performanceTests.length})`);
      
      try {
        const timestamp = Date.now();
        const reportFile = path.join(this.reportDir, `${test.script.replace('.yml', '')}-${timestamp}.json`);
        
        const result = execSync(`artillery run ${test.script} --output ${reportFile}`, {
          cwd: __dirname,
          encoding: 'utf8'
        });
        
        console.log(`✅ ${test.name} 完成`);
        this.testResults.performance.passed++;
        
        // 生成HTML报告
        const htmlReport = reportFile.replace('.json', '.html');
        execSync(`artillery report ${reportFile} --output ${htmlReport}`, {
          cwd: __dirname,
          encoding: 'utf8'
        });
        
        console.log(`📊 报告生成在: ${htmlReport}`);
        
      } catch (error) {
        console.error(`❌ ${test.name} 失败:`, error.message);
        this.testResults.performance.failed++;
        allPassed = false;
      }
    });
    
    this.testResults.performance.total = performanceTests.length;
    console.log(`\n⚡ 性能测试完成: ${this.testResults.performance.passed} 通过, ${this.testResults.performance.failed} 失败`);
    
    return allPassed;
  }

  // 生成测试报告
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests: this.testResults.unit.total + this.testResults.performance.total,
        passedTests: this.testResults.unit.passed + this.testResults.performance.passed,
        failedTests: this.testResults.unit.failed + this.testResults.performance.failed,
        successRate: ((this.testResults.unit.passed + this.testResults.performance.passed) / 
                     (this.testResults.unit.total + this.testResults.performance.total) * 100).toFixed(2)
      },
      unitTests: this.testResults.unit,
      performanceTests: this.testResults.performance,
      recommendations: this.generateRecommendations()
    };
    
    const reportFile = path.join(this.reportDir, `test-report-${Date.now()}.json`);
    fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
    
    console.log('\n📋 === 测试总结报告 ===');
    console.log(`总测试数: ${report.summary.totalTests}`);
    console.log(`通过测试: ${report.summary.passedTests}`);
    console.log(`失败测试: ${report.summary.failedTests}`);
    console.log(`成功率: ${report.summary.successRate}%`);
    console.log(`报告文件: ${reportFile}`);
    console.log('====================\n');
    
    return reportFile;
  }

  // 生成改进建议
  generateRecommendations() {
    const recommendations = [];
    
    if (this.testResults.unit.failed > 0) {
      recommendations.push({
        type: 'critical',
        message: `有 ${this.testResults.unit.failed} 个单元测试失败，需要立即修复`
      });
    }
    
    if (this.testResults.performance.failed > 0) {
      recommendations.push({
        type: 'warning',
        message: `有 ${this.testResults.performance.failed} 个性能测试失败，需要优化性能`
      });
    }
    
    if (this.testResults.unit.total === 0) {
      recommendations.push({
        type: 'info',
        message: '未发现单元测试，建议添加单元测试覆盖核心功能'
      });
    }
    
    if (this.testResults.performance.passed / this.testResults.performance.total < 0.8) {
      recommendations.push({
        type: 'warning',
        message: '性能测试通过率较低，建议进行性能优化'
      });
    }
    
    return recommendations;
  }

  // 运行所有测试
  async runAllTests() {
    console.log('🚀 开始运行比特币中国社区完整测试套件\n');
    
    const startTime = Date.now();
    
    // 运行单元测试
    const unitTestSuccess = this.runUnitTests();
    
    // 运行覆盖率测试
    const coverageSuccess = this.runCoverageTests();
    
    // 运行性能测试
    const performanceSuccess = this.runPerformanceTests();
    
    // 生成报告
    const reportFile = this.generateReport();
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`⏱️ 测试总耗时: ${duration} 秒`);
    console.log(`📁 详细报告: ${reportFile}`);
    
    const overallSuccess = unitTestSuccess && coverageSuccess && performanceSuccess;
    
    if (overallSuccess) {
      console.log('🎉 所有测试通过！项目质量良好。');
    } else {
      console.log('⚠️ 部分测试失败，请查看详细报告进行修复。');
    }
    
    return overallSuccess;
  }
}

// 命令行接口
if (require.main === module) {
  const runner = new TestRunner();
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'unit':
      runner.runUnitTests();
      break;
    case 'coverage':
      runner.runCoverageTests();
      break;
    case 'performance':
      runner.runPerformanceTests();
      break;
    case 'all':
    default:
      runner.runAllTests().then(success => {
        process.exit(success ? 0 : 1);
      });
      break;
  }
}

module.exports = TestRunner;