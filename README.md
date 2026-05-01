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

## 添加新搭配码（不需要写代码）

### 使用网站提交页面（推荐）

1. 打开你部署好的网站，点击右上角的 **+ 提交搭配码**
2. 填写表单：搭配码、名称、分类等
3. 上传搭配截图（会自动压缩，无需手动处理）
4. 点 **生成数据并提交**
5. 点 **在 GitHub 提交搭配码** 按钮，跳转到 GitHub Issue 页面
6. Issue 内容已自动填好（包含 JSON 数据和图片），直接点 **Submit new issue** 即可

提交后 GitHub Action 会自动：
- 提取搭配码数据和图片
- 创建 Pull Request
- 维护者点一下 merge，网站自动更新

### 在 GitHub 网页上手动添加

适合需要更精细控制的场景：

1. 进入仓库的 `images/` 目录，上传图片
2. 打开 `data/outfits.json`，点 **✏️ 编辑**
3. 在 `outfits` 数组的 `]` 前粘贴一条新记录，修改内容
4. 点 **Commit changes**

> **分类可选值：** cute(可爱)、elegant(优雅)、cool(酷帅)、fantasy(奇幻)、casual(休闲)、formal(正装)、seasonal(季节)、themed(主题)
>
> **标签可选值：** popular(热门)、new(新品)、beginner(新手友好)、rare(稀有)、free(免费)、puzzle(解谜)、combat(战斗)

---

## 常见问题

### 图片不显示？

检查 Cloudflare Pages 环境变量中的 `GITHUB_USER` 和 `GITHUB_REPO` 是否填写正确。

### 部署后页面空白？

打开浏览器开发者工具（F12），查看 Console 标签页的报错信息。最常见的原因是环境变量没填或填错了。

### 想自定义域名？

在 Cloudflare Pages 项目设置里点 **自定义域**，输入你的域名即可。域名需要使用 Cloudflare 的 DNS。

### 想修改网站标题或样式？

- 标题：编辑 `js/config.js` 中的 `site.title`
- 样式：编辑 `css/` 目录下的 CSS 文件
- 改完推送到 GitHub，网站自动更新

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
