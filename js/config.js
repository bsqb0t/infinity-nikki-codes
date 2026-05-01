/**
 * 站点部署配置
 * 修改 user 和 repo 为你的 GitHub 用户名和仓库名
 */
const SITE_CONFIG = {
  github: {
    user: 'YOUR_USERNAME',
    repo: 'YOUR_REPO',
    branch: 'main'
  },
  site: {
    title: '无限暖暖搭配码',
    titleEn: 'Infinity Nikki Outfit Codes',
    description: '收集和分享无限暖暖游戏中的服装搭配码及演示图片'
  }
};

/**
 * 生成图片 URL
 * - 完整 URL（http/https 开头）直接返回（如 GitHub Issue 附件）
 * - 文件名则拼接 raw.githubusercontent.com 路径
 */
function getImageUrl(filename) {
  if (!filename) return '';
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  const { user, repo, branch } = SITE_CONFIG.github;
  return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/images/${filename}`;
}
