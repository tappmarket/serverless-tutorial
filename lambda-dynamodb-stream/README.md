# 快速构建 scf-nodejs

**中文** | [English](./README_EN.md)

## 简介

scf-nodejs 模板使用 Tencent SCF 组件及其触发器能力，方便的在腾讯云创建，配置和管理一个 scf-nodejs 应用。

## 快速开始

### 1. 安装

```bash
# 安装 Serverless Framework
npm install -g serverless
```

### 2. 创建

通过如下命令直接下载该例子：

```bash
serverless init scf-nodejs --name example
cd example
```

### 3. 部署

在 `serverless.yml` 文件所在的项目根目录，运行以下指令，将会弹出二维码，直接扫码授权进行部署：

```bash
serverless deploy
```

> **说明**：如果鉴权失败，请参考 [权限配置](https://cloud.tencent.com/document/product/1154/43006) 进行授权。

### 4. 查看状态

执行以下命令，查看您部署的项目信息：

```bash
serverless info
```

### 5. 移除

可以通过以下命令移除 scf-nodejs 应用

```bash
serverless remove
```

```bash
#配置信息
touch .env
```

```
# .env file
TENCENT_SECRET_ID=123
TENCENT_SECRET_KEY=123
```
