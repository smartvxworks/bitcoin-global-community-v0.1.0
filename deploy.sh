#!/bin/bash

echo "清理旧构建..."
rm -rf dist

echo "安装依赖..."
pnpm install

echo "构建项目..."
pnpm build

echo "构建完成！"