/**
 * 站点部署配置
 * 通过 Cloudflare Pages 构建命令自动填充，无需手动修改
 *
 * 构建命令填：
 *   node -e "const f='js/config.js';let c=require('fs').readFileSync(f,'utf8');c=c.replace('YOUR_USERNAME',process.env.GITHUB_USER).replace('YOUR_REPO',process.env.GITHUB_REPO);require('fs').writeFileSync(f,c)"
 *
 * 环境变量：GITHUB_USER（用户名）、GITHUB_REPO（仓库名）
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

function getImageUrl(filename) {
  if (!filename) return '';
  if (filename.startsWith('http://') || filename.startsWith('https://')) {
    return filename;
  }
  const { user, repo, branch } = SITE_CONFIG.github;
  return `https://raw.githubusercontent.com/${user}/${repo}/${branch}/images/${filename}`;
}
