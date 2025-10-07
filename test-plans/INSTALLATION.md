# 测试套件安装和配置指南

## 环境要求

### 系统要求
- **Node.js**: 版本 18.0.0 或更高
- **npm**: 版本 8.0.0 或更高
- **操作系统**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+

### 硬件要求
- **内存**: 最低 4GB，推荐 8GB
- **存储空间**: 最低 1GB 可用空间
- **网络**: 稳定的互联网连接

## 安装步骤

### 1. 克隆项目
```bash
git clone <repository-url>
cd bitcoin-china-community
```

### 2. 安装依赖
```bash
# 安装项目依赖
npm install

# 安装测试套件依赖
cd test-plans
npm install
```

### 3. 环境配置
```bash
# 复制环境配置文件
cp ../.env.example ../.env

# 编辑环境配置
# 修改数据库连接、API端点等配置
```

## 配置说明

### 测试环境配置
在 `.env` 文件中配置以下环境变量：

```env
# 数据库配置
DATABASE_URL="file:./dev.db"

# API配置
API_BASE_URL="http://localhost:3000"

# 测试配置
TEST_USER_PHONE="13800138000"
TEST_USER_PASSWORD="TestPassword123!"

# 性能测试配置
PERFORMANCE_TEST_DURATION=300
PERFORMANCE_TEST_USERS=50
```

### Artillery 配置
测试套件使用 Artillery 进行性能测试，配置文件位于：
- `artillery-base-config.yml` - 基础性能测试
- `registration-stress-test.yml` - 注册压力测试
- `login-stress-test.yml` - 登录压力测试
- `courses-stress-test.yml` - 课程压力测试
- `community-stress-test.yml` - 社区压力测试

## 运行测试

### 基础测试
```bash
# 运行单元测试
npm run test:unit

# 运行覆盖率测试
npm run test:coverage

# 运行性能测试
npm run test:performance
```

### 完整测试套件
```bash
# 运行所有测试
npm run test:all

# 运行CI测试
npm run test:ci

# 运行回归测试
npm run test:regression
```

### 特定功能测试
```bash
# 只测试用户认证
npm run test:performance:login

# 只测试课程功能
npm run test:performance:courses

# 只测试社区功能
npm run test:performance:community
```

## 测试数据管理

### 测试用户数据
测试套件包含预定义的测试用户数据：
- `test-data/users.csv` - 基础测试用户
- `test-data/stress-users.csv` - 压力测试用户
- `test-data/login-users.csv` - 登录测试用户

### 自定义测试数据
要添加自定义测试数据，编辑相应的 CSV 文件：

```csv
phone,password
13800138001,CustomPassword123!
13800138002,AnotherPassword456!
```

## 测试报告

### 报告生成
测试完成后，报告将自动生成在 `reports/` 目录：

```bash
# 查看测试报告
open reports/test-report-*.json

# 查看性能测试报告
open reports/*.html
```

### 报告格式
- **JSON 报告**: 详细的测试结果数据
- **HTML 报告**: 可视化的性能测试结果
- **覆盖率报告**: 代码覆盖率分析

## 故障排除

### 常见问题

#### 1. 依赖安装失败
```bash
# 清除缓存重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### 2. 测试超时
```bash
# 增加测试超时时间
export JEST_TIMEOUT=30000
npm run test:unit
```

#### 3. 性能测试内存不足
```bash
# 增加Node.js内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
npm run test:performance
```

#### 4. 数据库连接错误
确保数据库服务正在运行，并检查连接字符串配置。

### 调试模式
启用详细日志输出：
```bash
# 启用调试模式
export DEBUG=bitcoin-china-community:*
npm run test:all

# 或使用特定调试标签
export DEBUG=bitcoin-china-community:test,bitcoin-china-community:performance
```

## 持续集成

### GitHub Actions 配置
在 `.github/workflows/test.yml` 中添加：

```yaml
name: Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm install
      - run: cd test-plans && npm install
      - run: npm run test:ci
      - run: cd test-plans && npm run test:ci
```

### 质量门禁
设置以下质量门禁标准：
- 单元测试通过率: 100%
- 代码覆盖率: ≥ 95%
- 性能测试: 响应时间达标
- 安全扫描: 无高危漏洞

## 性能优化建议

### 测试环境优化
1. **关闭不必要的服务**: 确保测试环境干净
2. **优化数据库**: 使用测试专用数据库
3. **网络优化**: 使用本地网络减少延迟

### 测试执行优化
1. **并行执行**: 使用 Jest 的并行测试功能
2. **缓存优化**: 利用 npm 和 Jest 的缓存机制
3. **增量测试**: 只运行变更相关的测试

## 安全注意事项

### 测试数据安全
- 不要使用生产环境数据
- 测试完成后清理测试数据
- 保护测试环境访问权限

### 网络安全
- 在隔离的网络环境中运行测试
- 使用防火墙限制外部访问
- 定期更新依赖包修复安全漏洞

## 支持与维护

### 问题报告
遇到问题时，请提供以下信息：
1. 操作系统和 Node.js 版本
2. 错误日志和堆栈跟踪
3. 测试配置和环境变量
4. 复现步骤

### 版本兼容性
测试套件与以下版本兼容：
- Node.js: 18.x, 20.x
- npm: 8.x, 9.x
- Jest: 29.x
- Artillery: 2.x

### 更新维护
定期更新测试套件：
```bash
# 检查更新
npm outdated

# 更新依赖
npm update

# 更新测试套件
cd test-plans && npm update
```

## 总结

本测试套件提供了完整的安装和配置指南，确保比特币中国社区项目的测试环境能够正确设置和运行。遵循本指南可以快速搭建测试环境，执行全面的测试覆盖，并生成详细的测试报告。

如有任何问题，请参考故障排除部分或联系开发团队。