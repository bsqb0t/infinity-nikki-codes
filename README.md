# 无限暖暖搭配码 | Infinity Nikki Outfit Codes

收集和分享无限暖暖游戏中的服装搭配码及演示图片。

**完全免费** | **不需要写代码** | **3 步部署上线**

---

## 部署教程（3 步完成）

### 第 1 步：Fork 仓库

点击本页面右上角的 **Fork** 按钮，把仓库复制到你自己的 GitHub 账号下。

### 第 2 步：连接 Cloudflare Pages

1. 打开 [dash.cloudflare.com](https://dash.cloudflare.com)（没有账号就免费注册一个）
2. 左侧点 **Workers 和 Pages**
3. 点 **创建应用程序** → 选 **Pages** 标签 → 点 **连接到 Git**
4. 授权 Cloudflare 访问你的 GitHub，然后选中刚才 Fork 的仓库
5. 点 **开始设置**

### 第 3 步：填写构建配置并部署

在构建配置页面填写以下内容：

| 配置项 | 填什么 |
|--------|--------|
| **框架预设** | 选 `None`（无） |
| **构建命令** | `sed -i "s/__GITHUB_USER__/$GITHUB_USER/g;s/__GITHUB_REPO__/$GITHUB_REPO/g" js/config.js` |
| **构建输出目录** | `/` |

然后往下滚动，找到 **环境变量** 部分，点 **添加变量**，添加以下两个：

| 变量名 | 值 | 说明 |
|--------|----|------|
| `GITHUB_USER` | 你的 GitHub 用户名 | 例如 `zhangsan` |
| `GITHUB_REPO` | 你的仓库名 | 例如 `infinity-nikki-codes` |

最后点 **保存并部署**。等大约 30 秒，网站就上线了！

访问地址：`https://你的项目名.pages.dev`

---

## 添加新搭配码

### 第 1 步：生成提交文本

打开你部署好的网站，点右上角 **+ 提交搭配码**，填写表单后点 **生成提交文本**，复制生成的内容。

### 第 2 步：到 GitHub 提交 Issue

1. 打开你仓库的 **Issues** 页面，点 **New issue**
2. 标题填写：`[搭配码] 你的搭配名称`
3. 正文**粘贴**刚才复制的文本
4. 如果有图片，直接**拖入正文区域**上传（支持 jpg / png / webp）
5. 点 **Submit new issue**

### 第 3 步：等待自动处理

提交后系统自动完成：
- 解析 Issue 中的搭配码数据
- 创建 Pull Request
- **自动关闭 Issue**（PR 中会引用 Issue 编号）
- 维护者审核合并后网站自动更新（约 30 秒）

> **需要修改？** 直接编辑你提交的 Issue，系统会自动同步更新对应的 PR，无需重新提交。

---

## 删除搭配码

1. 打开网站，点开要删除的搭配详情，记下底部的 **ID**（格式如 `outfit-001`）
2. 到 GitHub 仓库的 Issues 页面，点 **New issue**
3. 标题填写：`[删除] outfit-001`
4. 直接提交

GitHub Action 会自动创建删除 PR，维护者审核合并后网站自动更新。

> 如果不记得 ID，随便写个标题提交，Action 会报错并列出所有可用的 ID。

---

## 常见问题

### 提交搭配码时跳转 GitHub 404？

确认 Cloudflare Pages 环境变量 `GITHUB_USER` 和 `GITHUB_REPO` 填写正确并已重新部署。跳转前也会弹出输入框让你手动填写。

### 部署后页面空白？

打开浏览器开发者工具（F12），查看 Console 标签页的报错信息。最常见原因是环境变量没填或填错。

### 图片怎么上传？

在提交 Issue 时，直接把图片文件**拖入 Issue 正文编辑区域**即可自动上传。GitHub 会生成图片链接。

### 想自定义域名？

在 Cloudflare Pages 项目设置里点 **自定义域**，输入你的域名即可（需使用 Cloudflare DNS）。

---

## 项目结构

```
├── index.html              首页
├── submit.html             提交搭配码页面
├── css/                    样式文件
├── js/config.js            部署配置（通过环境变量自动填充）
├── js/app.js               应用逻辑
├── data/outfits.json       搭配码数据库
├── images/                 搭配演示图片
└── .github/workflows/      自动处理 Issue 的 GitHub Action
```

## 许可证

MIT License
