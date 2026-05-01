/**
 * Alpine.js 数据函数 - 无限暖暖搭配码网站
 * 包含所有应用状态、计算属性和方法
 */
function nikkiApp() {
  return {
    // === 数据 ===
    outfits: [],
    categories: [],
    tags: [],

    // === 搜索和筛选状态 ===
    searchQuery: '',
    selectedCategory: '',
    selectedTags: [],

    // === UI 状态 ===
    loading: true,
    error: null,
    darkMode: false,

    // === 模态框状态 ===
    modalOpen: false,
    modalOutfit: null,
    modalImageIndex: 0,

    // === Toast 状态 ===
    toastVisible: false,
    toastMessage: '',
    toastTimer: null,

    // === 初始化 ===
    async init() {
      // 读取主题偏好
      this.darkMode = localStorage.getItem('nikki-dark-mode') === 'true' ||
        (!localStorage.getItem('nikki-dark-mode') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.applyTheme();

      // 加载数据
      await this.loadData();
    },

    // === 数据加载 ===
    async loadData() {
      // 检查 sessionStorage 缓存（5 分钟过期）
      const cached = sessionStorage.getItem('nikki-outfits-data');
      const cacheTime = sessionStorage.getItem('nikki-outfits-time');
      const CACHE_TTL = 5 * 60 * 1000;
      if (cached && cacheTime && (Date.now() - parseInt(cacheTime) < CACHE_TTL)) {
        try {
          const data = JSON.parse(cached);
          this.categories = data.categories;
          this.tags = data.tags;
          this.outfits = this.processOutfits(data.outfits);
          this.loading = false;
          return;
        } catch (e) {
          sessionStorage.removeItem('nikki-outfits-data');
          sessionStorage.removeItem('nikki-outfits-time');
        }
      }

      try {
        const response = await fetch('data/outfits.json');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        this.categories = data.categories;
        this.tags = data.tags;
        this.outfits = this.processOutfits(data.outfits);

        // 缓存到 sessionStorage
        sessionStorage.setItem('nikki-outfits-data', JSON.stringify(data));
        sessionStorage.setItem('nikki-outfits-time', String(Date.now()));
      } catch (err) {
        this.error = '加载数据失败，请刷新页面重试';
        console.error('Failed to load outfits data:', err);
      } finally {
        this.loading = false;
      }
    },

    // === 处理搭配数据 ===
    processOutfits(outfits) {
      return outfits.map(outfit => ({
        ...outfit,
        imageUrls: outfit.images.map(img => getImageUrl(img)),
        thumbnailUrl: outfit.thumbnail ? getImageUrl(outfit.thumbnail) : null
      }));
    },

    // === 计算属性 ===
    get filteredOutfits() {
      let result = this.outfits;

      // 按分类筛选
      if (this.selectedCategory) {
        result = result.filter(o => o.category === this.selectedCategory);
      }

      // 按标签筛选（AND 逻辑）
      if (this.selectedTags.length > 0) {
        result = result.filter(o =>
          this.selectedTags.every(tag => o.tags.includes(tag))
        );
      }

      // 按搜索词筛选
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim();
        result = result.filter(o =>
          o.name.toLowerCase().includes(query) ||
          o.nameEn.toLowerCase().includes(query) ||
          o.code.toLowerCase().includes(query) ||
          o.description.toLowerCase().includes(query) ||
          o.author.name.toLowerCase().includes(query)
        );
      }

      return result;
    },

    get totalOutfits() {
      return this.outfits.length;
    },

    // === 方法 ===
    getCategoryById(id) {
      return this.categories.find(c => c.id === id) || { id, name: id, nameEn: id, color: '#CCC' };
    },

    getTagById(id) {
      return this.tags.find(t => t.id === id) || { id, name: id, nameEn: id };
    },

    // === 筛选操作 ===
    setCategory(categoryId) {
      this.selectedCategory = this.selectedCategory === categoryId ? '' : categoryId;
    },

    toggleTag(tagId) {
      const idx = this.selectedTags.indexOf(tagId);
      if (idx === -1) {
        this.selectedTags.push(tagId);
      } else {
        this.selectedTags.splice(idx, 1);
      }
    },

    clearFilters() {
      this.searchQuery = '';
      this.selectedCategory = '';
      this.selectedTags = [];
    },

    isActiveCategory(categoryId) {
      return this.selectedCategory === categoryId;
    },

    isActiveTag(tagId) {
      return this.selectedTags.includes(tagId);
    },

    // === 模态框操作 ===
    openModal(outfit) {
      this.modalOutfit = outfit;
      this.modalImageIndex = 0;
      this.modalOpen = true;
      document.body.style.overflow = 'hidden';
    },

    closeModal() {
      this.modalOpen = false;
      this.modalOutfit = null;
      document.body.style.overflow = '';
    },

    nextImage() {
      if (!this.modalOutfit) return;
      const total = this.modalOutfit.imageUrls.length;
      this.modalImageIndex = (this.modalImageIndex + 1) % total;
    },

    prevImage() {
      if (!this.modalOutfit) return;
      const total = this.modalOutfit.imageUrls.length;
      this.modalImageIndex = (this.modalImageIndex - 1 + total) % total;
    },

    get currentModalImage() {
      if (!this.modalOutfit) return '';
      const img = this.modalOutfit.imageUrls[this.modalImageIndex] || this.modalOutfit.thumbnailUrl;
      return img || '';
    },

    get hasMultipleImages() {
      return this.modalOutfit && this.modalOutfit.imageUrls.length > 1;
    },

    // === 复制功能 ===
    async copyCode(code, event) {
      try {
        await navigator.clipboard.writeText(code);
      } catch {
        // 回退方案
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      this.showToast('搭配码已复制!');

      // 如果在卡片上触发，添加闪烁效果
      if (event && event.currentTarget) {
        const card = event.currentTarget.closest('.outfit-card');
        if (card) {
          card.classList.add('copy-flash');
          setTimeout(() => card.classList.remove('copy-flash'), 300);
        }
      }
    },

    // === Toast 通知 ===
    showToast(message) {
      if (this.toastTimer) clearTimeout(this.toastTimer);
      this.toastMessage = message;
      this.toastVisible = true;
      this.toastTimer = setTimeout(() => {
        this.toastVisible = false;
      }, 2000);
    },

    // === 主题切换 ===
    toggleTheme() {
      this.darkMode = !this.darkMode;
      localStorage.setItem('nikki-dark-mode', this.darkMode);
      this.applyTheme();
    },

    applyTheme() {
      document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
    },

    // === 工具方法 ===
    get themeIcon() {
      return this.darkMode ? '☀️' : '🌙';
    },

    get hasActiveFilters() {
      return this.searchQuery || this.selectedCategory || this.selectedTags.length > 0;
    },

    get resultCount() {
      return this.filteredOutfits.length;
    },

    formatDate(dateStr) {
      if (!dateStr) return '';
      const d = new Date(dateStr);
      return d.toLocaleDateString('zh-CN', { year: 'numeric', month: 'short', day: 'numeric' });
    },

    // === 键盘事件 ===
    handleKeydown(e) {
      if (e.key === 'Escape' && this.modalOpen) {
        this.closeModal();
      }
      if (this.modalOpen) {
        if (e.key === 'ArrowRight') this.nextImage();
        if (e.key === 'ArrowLeft') this.prevImage();
      }
    }
  };
}
