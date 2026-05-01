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
| **构建命令** | （留空） |
| **构建输出目录** | `/` |

最后点 **保存并部署**。等大约 30 秒，网站就上线了！

访问地址：`https://你的项目名.pages.dev`

> Fork 后如果改了仓库名，需要编辑 `js/config.js`，把 `user` 和 `repo` 改成你自己的，然后重新部署。

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

## 部署踩坑记录

以下是实际部署中遇到过的问题和解决方法：

### 1. GitHub Actions 报错「not permitted to create or approve pull requests」

**原因：** 仓库默认禁止 Actions 创建 PR。

**解决：** 打开仓库 → Settings → Actions → General → Workflow permissions → 选 **Read and write permissions** → 勾选 **Allow GitHub Actions to create and approve pull requests** → Save。

### 2. GitHub Actions 报 Node.js 20 弃用警告

**原因：** Actions 默认运行时从 Node.js 20 迁移到 24。

**解决：** workflow 文件中已设置 `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true`，并将 actions 升级到最新版（checkout@v6、github-script@v9、create-pull-request@v8）。如果仍有警告，确认你的 workflow 文件与仓库中的一致。

### 3. 网站部署后图片不显示

**原因：** `js/config.js` 中的 `user` 和 `repo` 与实际仓库不匹配。

**解决：** 编辑仓库中的 `js/config.js`，确认 `user` 和 `repo` 是你的 GitHub 用户名和仓库名，提交后 Cloudflare Pages 会自动重新部署。

### 4. 提交搭配码页面跳转 GitHub 404

**原因：** 同上，config 中的仓库信息不正确。

**解决：** 同上。跳转前页面也会弹出输入框让你手动填写。

### 5. Fine-grained PAT 权限不足

**原因：** GitHub Fine-grained Personal Access Token 需要单独授权每个权限项。

**解决：** 建议使用 Classic token（Settings → Developer settings → Personal access tokens → Tokens (classic)），勾选 `repo` 权限即可。如果用 Fine-grained token，至少需要以下权限：
- **Contents:** Read and write
- **Actions:** Read and write（用于修改 workflow 文件）
- **Pull requests:** Read and write
- **Issues:** Read and write

### 6. 图片上传

提交 Issue 时，直接把图片文件**拖入 Issue 正文编辑区域**即可自动上传，GitHub 会生成图片链接。不需要提前上传到仓库。

### 7. 自定义域名

在 Cloudflare Pages 项目设置里点 **自定义域**，输入你的域名（需使用 Cloudflare DNS），SSL 证书会自动配置。

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
