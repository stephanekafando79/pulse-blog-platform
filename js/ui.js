/**
 * Pulse UI View Controller & DOM Renderer
 * Pulse Modern Publishing Platform
 */

class UIController {
  constructor() {
    this.currentView = 'home';
    this.activeArticleId = null;
    this.selectedCategory = 'all';
    this.searchQuery = '';
    this.sortBy = 'latest';
    this.isSpeaking = false;
  }

  init() {
    this.renderHeaderUser();
    this.renderFeed();
    this.setupThemeToggle();
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
}

window.PulseUI = new UIController();
