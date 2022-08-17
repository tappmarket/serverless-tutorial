# 目录结构和文件说明

- 需要运行的测试文件，放入到`./modules`即可以自动加载
- 配置文件
  - `.env.dev`开发环境配置
  - `.env.local`本地环境配置

# Run all dev test

```sh
npm run test -dev
```

# Run all local test

```sh
npm run test -local
```

# Run one file dev test

```sh
npm run test -dev -name=filename
```

# Run one file local test

```sh
npm run test -local -name=filename
```
