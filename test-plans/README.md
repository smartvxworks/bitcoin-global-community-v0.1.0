# 比特币中国社区测试套件

## 概述

本测试套件为比特币中国社区项目提供全面的测试覆盖，包括功能测试、性能测试、系统测试、白盒测试和黑盒测试。

## 测试类型

### 1. 功能测试 (Functional Testing)
- **单元测试**: 使用 Jest 进行组件和工具函数测试
- **集成测试**: 测试模块间的交互和API集成
- **端到端测试**: 完整的用户流程测试

### 2. 性能测试 (Performance Testing)
- **负载测试**: 使用 Artillery 模拟不同负载场景
- **压力测试**: 测试系统极限性能
- **稳定性测试**: 长时间运行测试系统稳定性

### 3. 系统测试 (System Testing)
- **集成系统测试**: 验证整个系统的功能完整性
- **兼容性测试**: 不同浏览器和设备兼容性

### 4. 白盒测试 (White-box Testing)
- **代码覆盖率**: 确保测试覆盖率达到95%以上
- **边界条件测试**: 测试各种边界情况
- **异常处理测试**: 验证错误处理逻辑

### 5. 黑盒测试 (Black-box Testing)
- **用户界面测试**: 从用户角度验证功能
- **API测试**: 测试REST API接口
- **安全测试**: 验证安全防护措施

## 测试文件结构

```
test-plans/
├── README.md                          # 测试套件说明
├── package.json                       # 测试依赖配置
├── artillery-base-config.yml           # 基础性能测试配置
├── registration-stress-test.yml       # 注册压力测试
├── login-stress-test.yml              # 登录压力测试
├── courses-stress-test.yml            # 课程压力测试
├── community-stress-test.yml          # 社区压力测试
├── artillery-custom-functions.js       # Artillery自定义函数
├── load-test-scripts.js               # 负载测试运行脚本
├── detailed-test-cases.md             # 详细测试用例
└── test-data/
    ├── users.csv                      # 测试用户数据
    ├── stress-users.csv               # 压力测试用户数据
    └── login-users.csv                # 登录测试用户数据
```

## 安装和设置

### 1. 安装测试依赖

```bash
cd test-plans
npm install
```

### 2. 安装 Artillery (性能测试工具)

```bash
npm install -g artillery
```

### 3. 设置测试环境

确保后端服务运行在 http://localhost:3000

```bash
# 启动后端服务
cd server
npm run dev

# 启动前端服务（如果需要）
cd ..
npm run dev
```

## 运行测试

### 1. 运行单元测试

```bash
# 运行所有单元测试
npm run test:unit

# 运行单元测试并生成覆盖率报告
npm run test:unit:coverage

# 监听模式运行单元测试
npm run test:unit:watch
```

### 2. 运行性能测试

```bash
# 运行基础性能测试
npm run test:performance:basic

# 运行用户注册压力测试
npm run test:performance:registration

# 运行用户登录压力测试
npm run test:performance:login

# 运行课程浏览压力测试
npm run test:performance:courses

# 运行社区讨论压力测试
npm run test:performance:community

# 运行所有性能测试
npm run test:performance:all
```

### 3. 运行完整测试套件

```bash
# 运行所有测试（单元测试 + 性能测试）
npm run test:ci

# 生成测试报告
npm run test:report

# 可视化测试报告
npm run test:visualize
```

## 测试用例说明

### 功能测试用例

详细的功能测试用例请参考 [detailed-test-cases.md](./detailed-test-cases.md)，包含：

1. **用户认证模块**
   - 注册功能测试（成功注册、重复注册、格式验证）
   - 登录功能测试（成功登录、密码错误、用户不存在）
   - 用户信息获取测试

2. **课程管理模块**
   - 课程列表获取测试
   - 课程详情查看测试
   - 课程搜索和筛选测试

3. **社区讨论模块**
   - 讨论列表获取测试
   - 讨论创建测试
   - 讨论删除测试（权限验证）

### 性能测试指标

#### 响应时间标准
- **页面加载**: < 3秒
- **API响应**: < 300ms（平均），< 500ms（95%分位）
- **数据库查询**: < 100ms

#### 并发能力标准
- **支持用户数**: ≥ 100并发用户
- **请求处理**: ≥ 1000请求/分钟
- **错误率**: < 1%

#### 资源使用标准
- **CPU使用率**: < 80%
- **内存使用**: < 1GB
- **网络带宽**: < 10MB/s

## 测试报告

### 覆盖率报告

运行覆盖率测试后，查看 `coverage/lcov-report/index.html` 文件：

```bash
# 生成覆盖率报告
npm run test:coverage

# 在浏览器中查看报告
open coverage/lcov-report/index.html
```

### 性能测试报告

性能测试会自动生成JSON格式的报告文件，位于 `reports/` 目录：

```bash
# 生成HTML格式的性能报告
artillery report reports/performance-test.json --output reports/report.html

# 查看报告
open reports/report.html
```

## 测试数据管理

### 测试用户数据

测试使用预定义的测试用户数据：

- **普通测试用户**: `test-data/users.csv`
- **压力测试用户**: `test-data/stress-users.csv`
- **登录测试用户**: `test-data/login-users.csv`

### 测试数据生成

可以使用自定义函数生成测试数据：

```javascript
// 生成随机手机号
generateRandomPhone() // => "13800138000"

// 生成随机密码
generateRandomPassword() // => "TestPassword123!"

// 生成讨论数据
generateDiscussionData() // => { title: "...", content: "..." }
```

## 自定义测试配置

### 修改性能测试参数

编辑对应的YAML配置文件来调整测试参数：

```yaml
# 修改并发用户数
phases:
  - duration: 60
    arrivalRate: 50  # 每秒50个新用户
```

### 添加新的测试场景

在对应的配置文件中添加新的测试场景：

```yaml
scenarios:
  - name: "自定义测试场景"
    flow:
      - get:
          url: "/api/custom-endpoint"
          ensure:
            - statusCode: 200
```

## 故障排除

### 常见问题

1. **测试连接失败**
   - 检查后端服务是否运行在 http://localhost:3000
   - 验证网络连接和防火墙设置

2. **性能测试超时**
   - 调整测试配置中的超时时间
   - 检查服务器资源使用情况

3. **覆盖率报告不准确**
   - 确保所有测试文件都被包含在测试范围内
   - 检查jest配置文件的collectCoverageFrom设置

### 调试技巧

1. **启用详细日志**
```bash
# 运行测试时显示详细日志
npm run test:unit -- --verbose
```

2. **性能测试调试**
```bash
# 运行单个虚拟用户进行调试
artillery run artillery-base-config.yml --count 1
```

3. **内存泄漏检测**
```bash
# 运行测试时检测内存使用
node --inspect load-test-scripts.js
```

## 持续集成

测试套件支持持续集成环境，可以在CI/CD流水线中运行：

```yaml
# GitHub Actions 示例
name: Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run test:ci
```

## 贡献指南

欢迎为测试套件贡献新的测试用例和改进：

1. 遵循现有的测试代码风格
2. 确保新的测试用例有明确的描述和预期结果
3. 更新相关的文档和配置文件
4. 运行现有测试确保没有破坏性更改

## 许可证

本测试套件遵循MIT许可证。

## 支持

如有问题或建议，请创建Issue或联系开发团队。