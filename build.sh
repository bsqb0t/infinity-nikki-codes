#!/bin/bash
# Cloudflare Pages build script
# Reads GITHUB_USER and GITHUB_REPO from environment variables
# and injects them into js/config.js

CONFIG_FILE="js/config.js"

if [ -z "$GITHUB_USER" ] || [ -z "$GITHUB_REPO" ]; then
  echo "❌ 环境变量未设置: GITHUB_USER=$GITHUB_USER, GITHUB_REPO=$GITHUB_REPO"
  echo "请在 Cloudflare Pages → Settings → Environment variables 中配置"
  exit 1
fi

echo "注入配置: GITHUB_USER=$GITHUB_USER, GITHUB_REPO=$GITHUB_REPO"

# Use sed to replace placeholders (| as separator to avoid conflicts with / in values)
sed -i "s|YOUR_USERNAME|$GITHUB_USER|g" "$CONFIG_FILE"
sed -i "s|YOUR_REPO|$GITHUB_REPO|g" "$CONFIG_FILE"

echo "✅ config.js 已更新"
