/**
 * Pulse UI View Controller & DOM Renderer
 * Pulse Modern Publishing Platform
 */

class UIController {
  constructor() {
    this.currentView = 'home';
    this.homeMode = 'stories'; // 'stories' | 'discussions' | 'news'
    this.wireSort = 'hot'; // 'hot' | 'top' | 'new'
    this.activeArticleId = null;
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'latest';
    this.isSpeaking = false;
    this.tickerInterval = null;
    this.tickerIndex = 0;
  }

  init() {
    this.renderHeaderUser();
    this.renderFeed();
    this.renderDiscussions();
    this.renderLiveNews();
    this.initTicker();
    this.setupThemeToggle();
    this.setupWireComposerEvents();
  }

  // Toast Notification System
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    // Icon based on type
    const icon = type === 'success' ? '✓' : '✦';
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;
    
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Theme Management
  setupThemeToggle() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const currentTheme = window.Store.getTheme();
    window.Store.setTheme(currentTheme);

    if (themeBtn) {
      themeBtn.innerHTML = currentTheme === 'dark' ? this.getSunIcon() : this.getMoonIcon();
      themeBtn.addEventListener('click', () => {
        const active = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        window.Store.setTheme(active);
        themeBtn.innerHTML = active === 'dark' ? this.getSunIcon() : this.getMoonIcon();
        this.showToast(`Switched to ${active} mode`);
      });
    }
  }

  // Navigation Routing
  navigateTo(view, articleId = null) {
    this.currentView = view;
    this.activeArticleId = articleId;

    const homeView = document.getElementById('home-view');
    const readerView = document.getElementById('reader-view');
    const editorView = document.getElementById('editor-view');
    const bookmarksNotice = document.getElementById('bookmarks-filter-notice');

    // Reset views
    if (homeView) homeView.style.display = 'none';
    if (readerView) readerView.classList.remove('active');
    if (editorView) editorView.classList.remove('active');
    if (bookmarksNotice) bookmarksNotice.style.display = 'none';

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (view === 'home') {
      if (homeView) homeView.style.display = 'block';
      this.renderFeed();
    } else if (view === 'bookmarks') {
      if (homeView) homeView.style.display = 'block';
      if (bookmarksNotice) bookmarksNotice.style.display = 'flex';
      this.renderBookmarksFeed();
    } else if (view === 'reader' && articleId) {
      if (readerView) readerView.classList.add('active');
      this.renderArticleReader(articleId);
    } else if (view === 'editor') {
      if (editorView) editorView.classList.add('active');
      window.StudioEditor.loadDraft();
    }
  }

  // Header user profile
  renderHeaderUser() {
    const user = window.Store.getCurrentUser();
    const avatarEl = document.getElementById('header-user-avatar');
    const nameEl = document.getElementById('header-user-name');

    if (avatarEl) avatarEl.src = user.avatar;
    if (nameEl) nameEl.textContent = user.name.split(' ')[0];
  }

  // Render Article Feed
  renderFeed() {
    const feedContainer = document.getElementById('articles-feed');
    if (!feedContainer) return;

    let articles = window.Store.getArticles();

    // Filter by Category
    if (this.selectedCategory !== 'all') {
      articles = articles.filter(a => a.category.toLowerCase() === this.selectedCategory.toLowerCase());
    }

    // Filter by Search Query
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      articles = articles.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(q))) ||
        (a.author && a.author.name.toLowerCase().includes(q))
      );
    }

    // Sort
    if (this.sortBy === 'popular') {
      articles.sort((a, b) => (b.likes + (b.views || 0)) - (a.likes + (a.views || 0)));
    } else if (this.sortBy === 'readTime') {
      articles.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
    } else {
      // Default: latest
      articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    }

    if (articles.length === 0) {
      feedContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          <h3>No articles found</h3>
          <p>Try searching for a different keyword, category, or publish the first post in this topic!</p>
          <button class="btn btn-primary" style="margin-top: 1rem;" onclick="PulseUI.navigateTo('editor')">Write First Article</button>
        </div>
      `;
      return;
    }

    feedContainer.innerHTML = articles.map((article, index) => {
      const isFeatured = index === 0 && this.selectedCategory === 'all' && !this.searchQuery;
      const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      const isBookmarked = window.Store.isBookmarked(article.id);

      return `
        <article class="article-card ${isFeatured ? 'featured-card' : ''}" data-id="${article.id}">
          <div class="card-cover" onclick="PulseUI.navigateTo('reader', '${article.id}')" style="cursor: pointer;">
            <img src="${article.cover}" alt="${article.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80'" />
            <span class="card-category-badge" style="${article.isDaily ? 'background: linear-gradient(135deg, #4f46e5 0%, #ec4899 100%); font-weight: 800;' : ''}">${article.isDaily ? '⚡ Today\'s Drop • ' : ''}${article.category}</span>
          </div>
          <div class="card-content">
            <div class="card-tags">
              ${(article.tags || []).map(t => `<span class="tag-pill" onclick="event.stopPropagation(); PulseUI.filterByTag('${t}')">#${t}</span>`).join('')}
            </div>
            <h3 class="card-title" onclick="PulseUI.navigateTo('reader', '${article.id}')">${article.title}</h3>
            <p class="card-excerpt">${article.excerpt}</p>
            <div class="card-footer">
              <div class="author-chip">
                <img src="${article.author.avatar}" class="author-avatar" alt="${article.author.name}" />
                <div class="author-info">
                  <span class="author-name">${article.author.name}</span>
                  <span class="post-meta-text">${formattedDate} • ${article.readTime}</span>
                </div>
              </div>
              <div class="card-metrics">
                <button class="btn-icon" style="width: 2rem; height: 2rem;" title="Save Bookmark" onclick="PulseUI.handleBookmarkClick('${article.id}', this)">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </button>
                <div class="metric-item">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  <span>${article.likes || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Render Bookmarks
  renderBookmarksFeed() {
    const feedContainer = document.getElementById('articles-feed');
    if (!feedContainer) return;

    const bookmarkedIds = window.Store.getBookmarks();
    const articles = window.Store.getArticles().filter(a => bookmarkedIds.includes(a.id));

    if (articles.length === 0) {
      feedContainer.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          <h3>No bookmarks saved yet</h3>
          <p>Click the bookmark ribbon on any article to save it for your reading list!</p>
          <button class="btn btn-secondary" style="margin-top: 1rem;" onclick="PulseUI.navigateTo('home')">Browse Articles</button>
        </div>
      `;
      return;
    }

    feedContainer.innerHTML = articles.map(article => {
      const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });

      return `
        <article class="article-card" data-id="${article.id}">
          <div class="card-cover" onclick="PulseUI.navigateTo('reader', '${article.id}')" style="cursor: pointer;">
            <img src="${article.cover}" alt="${article.title}" loading="lazy" />
            <span class="card-category-badge">${article.category}</span>
          </div>
          <div class="card-content">
            <h3 class="card-title" onclick="PulseUI.navigateTo('reader', '${article.id}')">${article.title}</h3>
            <p class="card-excerpt">${article.excerpt}</p>
            <div class="card-footer">
              <div class="author-chip">
                <img src="${article.author.avatar}" class="author-avatar" alt="${article.author.name}" />
                <div class="author-info">
                  <span class="author-name">${article.author.name}</span>
                  <span class="post-meta-text">${formattedDate} • ${article.readTime}</span>
                </div>
              </div>
              <button class="btn btn-sm btn-outline" onclick="PulseUI.handleBookmarkClick('${article.id}', this); PulseUI.renderBookmarksFeed();">Remove</button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Render Full Article Detail View
  renderArticleReader(articleId) {
    const article = window.Store.getArticleById(articleId);
    if (!article) {
      this.showToast('Article not found', 'danger');
      this.navigateTo('home');
      return;
    }

    window.Store.incrementViews(articleId);

    const container = document.getElementById('reader-view');
    if (!container) return;

    const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const isLiked = window.Store.isArticleLiked(articleId);
    const isBookmarked = window.Store.isBookmarked(articleId);
    const currentUser = window.Store.getCurrentUser();
    const isAuthor = currentUser.id === article.author.id;

    const parsedHTML = window.MarkdownEngine.parse(article.content);

    container.innerHTML = `
      <div class="back-nav">
        <button class="btn btn-secondary btn-sm" onclick="PulseUI.navigateTo('home')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>
          Back to all articles
        </button>
      </div>

      <div class="detail-cover">
        <img src="${article.cover}" alt="${article.title}" onerror="this.src='https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80'" />
      </div>

      <header class="detail-header">
        <div class="detail-tags">
          <span class="card-category-badge" style="position: static; display: inline-block;">${article.category}</span>
          ${(article.tags || []).map(t => `<span class="tag-pill">#${t}</span>`).join('')}
        </div>
        <h1 class="detail-title">${article.title}</h1>

        <div class="detail-author-row">
          <div class="detail-author-profile">
            <img src="${article.author.avatar}" class="detail-author-avatar" alt="${article.author.name}" />
            <div>
              <div class="detail-author-name">${article.author.name}</div>
              <div class="detail-author-bio">${article.author.bio || 'Pulse Contributor'}</div>
              <div class="post-meta-text">${formattedDate} • ${article.readTime} • ${article.views || 1} views</div>
            </div>
          </div>

          <div class="detail-actions-bar">
            ${isAuthor ? `
              <button class="btn btn-secondary btn-sm" style="color: var(--danger);" onclick="PulseUI.confirmDeleteArticle('${article.id}')">
                Delete
              </button>
            ` : ''}
            <button class="btn btn-secondary btn-sm" id="btn-audio-read" onclick="PulseUI.toggleReadAloud()">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>
              <span>Listen</span>
            </button>
            <button class="btn btn-secondary btn-sm" onclick="PulseUI.shareArticle('${article.title}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              Share
            </button>
          </div>
        </div>
      </header>

      <!-- Sticky / Reader Action Bar -->
      <div class="reader-reaction-bar">
        <div class="reaction-left">
          <button class="like-button ${isLiked ? 'liked' : ''}" id="article-like-btn" onclick="PulseUI.handleLikeArticle('${article.id}')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isLiked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <span id="article-like-count">${article.likes || 0}</span>
          </button>
          <span style="color: var(--text-muted); font-size: 0.85rem;">${(article.comments || []).length} comments</span>
        </div>
        <div>
          <button class="btn btn-secondary btn-sm" onclick="PulseUI.handleBookmarkClick('${article.id}', this)">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            <span>${isBookmarked ? 'Bookmarked' : 'Save'}</span>
          </button>
        </div>
      </div>

      <!-- Main Rendered Content -->
      <article class="article-body-content" id="article-body-text">
        ${parsedHTML}
      </article>

      <!-- Comments Section -->
      <section class="comments-section">
        <div class="comments-header">
          <h2 style="font-size: 1.4rem; font-weight: 700;">Discussion (${(article.comments || []).length})</h2>
        </div>

        <div class="comment-input-box">
          <textarea id="new-comment-input" placeholder="Share your perspective or ask a question..."></textarea>
          <div class="comment-actions-bar">
            <span style="font-size: 0.8rem; color: var(--text-muted);">Posting as ${currentUser.name}</span>
            <button class="btn btn-primary btn-sm" onclick="PulseUI.postComment('${article.id}')">Submit Comment</button>
          </div>
        </div>

        <div class="comment-list" id="comments-container">
          ${this.renderCommentsList(article.comments || [], article.author.id)}
        </div>
      </section>
    `;
  }

  renderCommentsList(comments, authorId) {
    if (comments.length === 0) {
      return `<p style="color: var(--text-muted); text-align: center; padding: 2rem 0;">No comments yet. Start the conversation!</p>`;
    }

    return comments.map(c => {
      const timeString = new Date(c.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
      const isOriginalAuthor = c.author && c.author.id === authorId;

      return `
        <div class="comment-card" id="comment-${c.id}">
          <img src="${c.author.avatar}" class="avatar-sm" alt="${c.author.name}" />
          <div class="comment-content">
            <div class="comment-author-row">
              <span class="comment-author-name">${c.author.name}</span>
              ${isOriginalAuthor ? `<span class="author-tag">Author</span>` : ''}
              <span class="comment-time">${timeString}</span>
            </div>
            <p class="comment-text">${c.text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
            <div class="comment-card-actions">
              <button class="comment-vote-btn" onclick="PulseUI.likeComment('${this.activeArticleId}', '${c.id}', this)">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>
                <span>${c.likes || 0}</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Like Article
  handleLikeArticle(articleId) {
    const res = window.Store.toggleLike(articleId);
    const countEl = document.getElementById('article-like-count');
    const btn = document.getElementById('article-like-btn');
    if (countEl) countEl.textContent = res.likes;
    if (btn) {
      if (res.isLiked) {
        btn.classList.add('liked');
        btn.querySelector('svg').setAttribute('fill', 'currentColor');
        this.showToast('Article liked!');
      } else {
        btn.classList.remove('liked');
        btn.querySelector('svg').setAttribute('fill', 'none');
      }
    }
  }

  // Like Comment
  likeComment(articleId, commentId, btn) {
    const newLikes = window.Store.likeComment(articleId, commentId);
    const span = btn.querySelector('span');
    if (span) span.textContent = newLikes;
    btn.style.color = 'var(--accent)';
  }

  // Post Comment
  postComment(articleId) {
    const input = document.getElementById('new-comment-input');
    if (!input || !input.value.trim()) {
      this.showToast('Please type a comment first', 'warning');
      return;
    }

    const comment = window.Store.addComment(articleId, input.value);
    if (comment) {
      input.value = '';
      this.showToast('Comment posted!', 'success');
      const article = window.Store.getArticleById(articleId);
      const container = document.getElementById('comments-container');
      if (container && article) {
        container.innerHTML = this.renderCommentsList(article.comments || [], article.author.id);
      }
    }
  }

  // Bookmark Toggle
  handleBookmarkClick(articleId, btn) {
    const isBookmarked = window.Store.toggleBookmark(articleId);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', isBookmarked ? 'currentColor' : 'none');
    
    const span = btn.querySelector('span');
    if (span) span.textContent = isBookmarked ? 'Bookmarked' : 'Save';

    this.showToast(isBookmarked ? 'Added to your bookmarks' : 'Removed from bookmarks');
  }

  // Share Article
  shareArticle(title) {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      this.showToast('Article link copied to clipboard!', 'success');
    }
  }

  // Audio Read Aloud (Web Speech Synthesis API)
  toggleReadAloud() {
    if (!('speechSynthesis' in window)) {
      this.showToast('Text-to-speech not supported on this browser', 'warning');
      return;
    }

    const btn = document.getElementById('btn-audio-read');
    if (this.isSpeaking) {
      window.speechSynthesis.cancel();
      this.isSpeaking = false;
      if (btn) btn.querySelector('span').textContent = 'Listen';
      this.showToast('Audio playback stopped');
      return;
    }

    const bodyText = document.getElementById('article-body-text');
    if (!bodyText) return;

    const utterance = new SpeechSynthesisUtterance(bodyText.innerText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      this.isSpeaking = false;
      if (btn) btn.querySelector('span').textContent = 'Listen';
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (btn) btn.querySelector('span').textContent = 'Listen';
    };

    window.speechSynthesis.speak(utterance);
    this.isSpeaking = true;
    if (btn) btn.querySelector('span').textContent = 'Pause';
    this.showToast('Reading article aloud...');
  }

  confirmDeleteArticle(articleId) {
    if (confirm('Are you sure you want to delete this article?')) {
      window.Store.deleteArticle(articleId);
      this.showToast('Article deleted');
      this.navigateTo('home');
    }
  }

  // Filter Categories & Tags
  selectCategory(category) {
    this.selectedCategory = category;
    document.querySelectorAll('.category-tab').forEach(tab => {
      if (tab.dataset.cat === category) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
    this.renderFeed();
  }

  filterByTag(tag) {
    this.searchQuery = tag;
    const searchInputs = document.querySelectorAll('.search-input-field');
    searchInputs.forEach(i => i.value = tag);
    this.navigateTo('home');
    this.showToast(`Filtered by tag #${tag}`);
  }

  // User Switcher Modal
  openUserModal() {
    const dialog = document.getElementById('user-switch-modal');
    if (!dialog) return;

    const users = window.Store.getAllUsers();
    const current = window.Store.getCurrentUser();
    const listContainer = document.getElementById('user-switch-container');

    if (listContainer) {
      listContainer.innerHTML = users.map(u => `
        <div class="user-switch-card ${u.id === current.id ? 'active' : ''}" onclick="PulseUI.selectUser('${u.id}')">
          <img src="${u.avatar}" class="avatar-sm" alt="${u.name}" />
          <div style="flex: 1;">
            <div style="font-weight: 700; font-size: 0.9rem;">${u.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted);">${u.bio || u.handle}</div>
          </div>
          ${u.id === current.id ? `<span style="color: var(--accent); font-weight: 800;">✓ Active</span>` : ''}
        </div>
      `).join('');
    }

    dialog.showModal();
  }

  selectUser(userId) {
    const users = window.Store.getAllUsers();
    const selected = users.find(u => u.id === userId);
    if (selected) {
      window.Store.setCurrentUser(selected);
      this.renderHeaderUser();
      const dialog = document.getElementById('user-switch-modal');
      if (dialog) dialog.close();
      this.showToast(`Logged in as ${selected.name}`, 'success');
      // If currently on reader view, re-render to update permissions
      if (this.currentView === 'reader' && this.activeArticleId) {
        this.renderArticleReader(this.activeArticleId);
      }
    }
  }

  createNewProfile(name, bio) {
    if (!name || !name.trim()) return;
    const newUser = window.Store.addUser({ name, bio });
    this.renderHeaderUser();
    const dialog = document.getElementById('user-switch-modal');
    if (dialog) dialog.close();
    this.showToast(`Welcome, ${newUser.name}! Profile created.`, 'success');
  }

  // Icons Helper
  getSunIcon() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`;
  }

  getMoonIcon() {
    return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
  }

  // ==========================================
  // MODE SWITCHER (Stories / Community Wire / Live News)
  // ==========================================
  switchHomeMode(mode) {
    this.homeMode = mode;

    const storiesFeed = document.getElementById('articles-feed');
    const controlsBar = document.getElementById('controls-bar');
    const discussionsContainer = document.getElementById('discussions-feed-container');
    const liveNewsContainer = document.getElementById('live-news-feed-container');

    // Update tab active classes
    document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
    const activeTab = document.getElementById(`tab-mode-${mode}`);
    if (activeTab) activeTab.classList.add('active');

    if (mode === 'stories') {
      if (storiesFeed) storiesFeed.style.display = 'grid';
      if (controlsBar) controlsBar.style.display = 'flex';
      if (discussionsContainer) discussionsContainer.style.display = 'none';
      if (liveNewsContainer) liveNewsContainer.style.display = 'none';
      this.renderFeed();
    } else if (mode === 'discussions') {
      if (storiesFeed) storiesFeed.style.display = 'none';
      if (controlsBar) controlsBar.style.display = 'none';
      if (discussionsContainer) discussionsContainer.style.display = 'flex';
      if (liveNewsContainer) liveNewsContainer.style.display = 'none';
      this.renderDiscussions();
    } else if (mode === 'news') {
      if (storiesFeed) storiesFeed.style.display = 'none';
      if (controlsBar) controlsBar.style.display = 'none';
      if (discussionsContainer) discussionsContainer.style.display = 'none';
      if (liveNewsContainer) liveNewsContainer.style.display = 'flex';
      this.renderLiveNews();
    }

    // Ensure we are in home view
    if (this.currentView !== 'home') {
      this.navigateTo('home');
    }
  }

  // ==========================================
  // REDDIT & TWITTER/X TECH WIRE
  // ==========================================
  setWireSort(sortMode) {
    this.wireSort = sortMode;
    document.querySelectorAll('.wire-subtab').forEach(t => {
      t.classList.toggle('active', t.dataset.wiresort === sortMode);
    });
    this.renderDiscussions();
  }

  toggleWireCodeBox() {
    const box = document.getElementById('wire-code-container');
    if (!box) return;
    box.style.display = (box.style.display === 'none' || !box.style.display) ? 'block' : 'none';
    if (box.style.display === 'block') {
      const textarea = document.getElementById('wire-code-input');
      if (textarea) textarea.focus();
    }
  }

  setupWireComposerEvents() {
    const textarea = document.getElementById('wire-post-input');
    const charCount = document.getElementById('wire-char-count');
    if (textarea && charCount) {
      textarea.addEventListener('input', () => {
        const remaining = 600 - textarea.value.length;
        charCount.textContent = remaining;
        charCount.style.color = remaining < 50 ? 'var(--danger)' : 'var(--text-muted)';
      });
    }
  }

  submitWirePost() {
    const textInput = document.getElementById('wire-post-input');
    const codeInput = document.getElementById('wire-code-input');
    const categorySelect = document.getElementById('wire-post-category');
    const tagsInput = document.getElementById('wire-post-tags');

    if (!textInput || !textInput.value.trim()) {
      this.showToast('Please write your take or question first.', 'info');
      return;
    }

    const text = textInput.value.trim();
    const codeSnippet = codeInput ? codeInput.value.trim() : '';
    const category = categorySelect ? categorySelect.value : 'Technology';
    const tags = tagsInput && tagsInput.value.trim() 
      ? tagsInput.value.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean)
      : [category, 'TechWire'];

    const newPost = window.Store.addDiscussion({
      text,
      codeSnippet,
      category,
      tags
    });

    // Reset inputs
    textInput.value = '';
    if (codeInput) {
      codeInput.value = '';
      document.getElementById('wire-code-container').style.display = 'none';
    }
    if (tagsInput) tagsInput.value = '';
    const charCount = document.getElementById('wire-char-count');
    if (charCount) charCount.textContent = '600';

    this.renderDiscussions();
    this.showToast('Posted to Community Tech Wire!', 'success');
  }

  handleWireVote(postId, direction) {
    const updatedPost = window.Store.voteDiscussion(postId, direction);
    if (!updatedPost) return;

    // Refresh vote count & buttons in DOM
    const card = document.querySelector(`[data-wirepost-id="${postId}"]`);
    if (card) {
      const scoreEl = card.querySelector('.wire-score');
      const upBtn = card.querySelector('.btn-karma-up');
      const downBtn = card.querySelector('.btn-karma-down');

      if (scoreEl) {
        scoreEl.textContent = updatedPost.votes;
        scoreEl.className = `wire-score ${updatedPost.votes > 0 ? 'score-positive' : updatedPost.votes < 0 ? 'score-negative' : ''}`;
      }
      if (upBtn) upBtn.classList.toggle('upvoted', updatedPost.userVote === 1);
      if (downBtn) downBtn.classList.toggle('downvoted', updatedPost.userVote === -1);
    }
  }

  toggleReplies(postId) {
    const thread = document.getElementById(`replies-thread-${postId}`);
    if (thread) {
      thread.style.display = (thread.style.display === 'none' || !thread.style.display) ? 'flex' : 'none';
    }
  }

  submitWireReply(postId) {
    const input = document.getElementById(`reply-input-${postId}`);
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    window.Store.addDiscussionReply(postId, text);
    input.value = '';
    this.renderDiscussions();
    this.showToast('Reply added to thread!', 'success');
  }

  renderDiscussions() {
    const container = document.getElementById('discussions-list');
    const badge = document.getElementById('wire-count-badge');
    if (!container) return;

    let discussions = window.Store.getDiscussions();
    if (badge) badge.textContent = discussions.length;

    // Sort discussions
    if (this.wireSort === 'top') {
      discussions.sort((a, b) => b.votes - a.votes);
    } else if (this.wireSort === 'new') {
      discussions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      // 'hot' algorithm: votes combined with recency and replies
      discussions.sort((a, b) => {
        const scoreA = a.votes + ((a.replies ? a.replies.length : 0) * 3);
        const scoreB = b.votes + ((b.replies ? b.replies.length : 0) * 3);
        return scoreB - scoreA;
      });
    }

    if (discussions.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="padding: 3rem 1rem; text-align: center;">
          <h3>No discussions yet</h3>
          <p>Be the first to share a question, take, or code snippet with the tech community!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = discussions.map(post => {
      const upClass = post.userVote === 1 ? 'upvoted' : '';
      const downClass = post.userVote === -1 ? 'downvoted' : '';
      const scoreClass = post.votes > 0 ? 'score-positive' : post.votes < 0 ? 'score-negative' : '';
      const replyCount = (post.replies && post.replies.length) || 0;

      const codeBlockHtml = post.codeSnippet ? `
        <div class="wire-post-code">
          <pre><code>${this.escapeHtml(post.codeSnippet)}</code></pre>
        </div>
      ` : '';

      const tagsHtml = (post.tags || []).map(t => `<span class="wire-tag-chip">#${t}</span>`).join('');

      const repliesListHtml = (post.replies || []).map(r => `
        <div class="wire-reply-card">
          <img src="${r.author.avatar}" class="avatar-sm" alt="${r.author.name}" />
          <div class="wire-reply-body">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
              <span style="font-weight: 700; font-size: 0.82rem;">${r.author.name}</span>
              <span style="color: var(--text-muted); font-size: 0.75rem;">${r.author.handle}</span>
            </div>
            <div style="font-size: 0.88rem; line-height: 1.45; color: var(--text-primary);">${this.escapeHtml(r.text)}</div>
          </div>
        </div>
      `).join('');

      return `
        <div class="wire-post-card" data-wirepost-id="${post.id}">
          <!-- Reddit-style Karma Voting -->
          <div class="wire-vote-col">
            <button class="btn-karma-vote btn-karma-up ${upClass}" title="Upvote (Reddit Karma)" onclick="PulseUI.handleWireVote('${post.id}', 1)">▲</button>
            <span class="wire-score ${scoreClass}">${post.votes}</span>
            <button class="btn-karma-vote btn-karma-down ${downClass}" title="Downvote" onclick="PulseUI.handleWireVote('${post.id}', -1)">▼</button>
          </div>

          <!-- Post Content -->
          <div class="wire-post-body">
            <div class="wire-post-meta">
              <img src="${post.author.avatar}" class="wire-author-avatar" alt="${post.author.name}" />
              <span class="wire-author-name">${post.author.name}</span>
              <span class="wire-author-handle">${post.author.handle}</span>
              ${post.author.badge ? `<span class="wire-badge">${post.author.badge}</span>` : ''}
              <span class="wire-domain-pill">${post.category}</span>
            </div>

            <div class="wire-post-text">${this.escapeHtml(post.text)}</div>
            ${codeBlockHtml}

            <div class="wire-tag-row">${tagsHtml}</div>

            <div class="wire-actions-row">
              <button class="wire-action-btn" onclick="PulseUI.toggleReplies('${post.id}')">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>${replyCount} ${replyCount === 1 ? 'Reply' : 'Replies'}</span>
              </button>
              <button class="wire-action-btn" onclick="navigator.clipboard.writeText(location.href); PulseUI.showToast('Post link copied to clipboard!');">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                <span>Share</span>
              </button>
            </div>

            <!-- Nested Replies Thread (Twitter / Reddit style) -->
            <div id="replies-thread-${post.id}" class="wire-replies-thread" style="${replyCount > 0 ? 'display: flex;' : 'display: none;'}">
              ${repliesListHtml}
              <div class="wire-reply-input-row">
                <input type="text" id="reply-input-${post.id}" class="wire-reply-input" placeholder="Tweet your reply or comment..." onkeydown="if(event.key==='Enter') PulseUI.submitWireReply('${post.id}')" />
                <button class="btn btn-primary btn-sm" onclick="PulseUI.submitWireReply('${post.id}')">Reply</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================
  // AUTOMATED LIVE TECH NEWS FEED & TICKER
  // ==========================================
  renderLiveNews() {
    const container = document.getElementById('live-news-grid');
    if (!container) return;

    const newsItems = window.Store.getLiveNews();
    if (!newsItems || newsItems.length === 0) {
      container.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">No live news items found.</div>`;
      return;
    }

    container.innerHTML = newsItems.map(item => {
      const timeAgo = this.formatRelativeTime(item.publishedAt);
      return `
        <div class="live-news-card">
          <div>
            <div class="live-news-meta-top">
              <span class="news-domain-tag">${item.category || 'Technology'}</span>
              <span class="news-source-tag">${item.source || item.domain}</span>
            </div>
            <h3 class="live-news-title">
              <a href="${item.url}" target="_blank" rel="noopener noreferrer">
                ${this.escapeHtml(item.title)} ↗
              </a>
            </h3>
          </div>
          <div class="live-news-footer">
            <span style="font-size: 0.75rem;">${timeAgo}</span>
            <div class="live-news-metrics">
              <span>▲ ${item.score || 0}</span>
              <span>💬 ${item.commentsCount || 0}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  refreshLiveNews() {
    this.renderLiveNews();
    this.initTicker();
    this.showToast('Live news stream updated with latest items.', 'success');
  }

  initTicker() {
    const rotator = document.getElementById('ticker-headline-rotator');
    if (!rotator) return;

    const newsItems = window.Store.getLiveNews();
    if (!newsItems || newsItems.length === 0) return;

    if (this.tickerInterval) clearInterval(this.tickerInterval);

    const updateHeadline = () => {
      const item = newsItems[this.tickerIndex % newsItems.length];
      rotator.innerHTML = `
        <a href="${item.url}" target="_blank" class="ticker-item" rel="noopener noreferrer">
          <strong>[${item.category}]</strong> ${this.escapeHtml(item.title)} — <em>${item.source || item.domain}</em> (▲ ${item.score || 0} points) ↗
        </a>
      `;
      this.tickerIndex++;
    };

    updateHeadline();
    this.tickerInterval = setInterval(updateHeadline, 5000);
  }

  formatRelativeTime(isoString) {
    try {
      const date = new Date(isoString);
      const diffMs = Date.now() - date.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHrs < 1) return 'Just now';
      if (diffHrs === 1) return '1 hour ago';
      if (diffHrs < 24) return `${diffHrs} hours ago`;
      const diffDays = Math.floor(diffHrs / 24);
      return `${diffDays}d ago`;
    } catch (e) {
      return 'Recently';
    }
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

window.PulseUI = new UIController();
