/**
 * 站点部署配置
 * 修改 user 和 repo 为你的 GitHub 用户名和仓库名
 */
const SITE_CONFIG = {
  github: {
    user: 'bsqb0t',
    repo: 'infinity-nikki-codes',
    branch: 'main'
  },
  site: {
    title: '无限暖暖搭配码',
    titleEn: 'Infinity Nikki Outfit Codes',
    description: '收集和分享无限暖暖游戏中的服装搭配码及演示图片'
  }
};

function getImageUrl(filename) {
  const { user, repo, branch } = SITE_CONFIG.github;
  return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/images/${filename}`;
}
