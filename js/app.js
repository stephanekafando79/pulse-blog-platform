/**
 * Main Application Orchestrator
 * Pulse Modern Publishing Platform
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize UI & Editor components
  window.PulseUI.init();
  window.StudioEditor.init();

  setupNavigationEvents();
  setupSearchAndFilters();
  setupEditorActions();
  setupAuthDialogEvents();
  setupHashRouting();
});

// Setup Hash Routing (SPA feel with browser back/forward)
function setupHashRouting() {
  const handleHashChange = () => {
    const hash = window.location.hash || '#/';

    if (hash.startsWith('#/article/')) {
      const articleId = hash.replace('#/article/', '');
      window.PulseUI.navigateTo('reader', articleId);
    } else if (hash === '#/write') {
      window.PulseUI.navigateTo('editor');
    } else if (hash === '#/bookmarks') {
      window.PulseUI.navigateTo('bookmarks');
    } else {
      window.PulseUI.navigateTo('home');
    }
  };

  window.addEventListener('hashchange', handleHashChange);
  // Initial route
  if (window.location.hash) {
    handleHashChange();
  }
}

// Navigation Events
function setupNavigationEvents() {
  // Logo home click
  const logo = document.getElementById('logo-link');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/';
      window.PulseUI.navigateTo('home');
    });
  }

  // Write Article Button
  const writeBtns = document.querySelectorAll('.btn-write-article');
  writeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.hash = '#/write';
      window.PulseUI.navigateTo('editor');
    });
  });

  // Bookmarks Nav Button
  const bookmarksBtn = document.getElementById('nav-bookmarks-btn');
  if (bookmarksBtn) {
    bookmarksBtn.addEventListener('click', () => {
      window.location.hash = '#/bookmarks';
      window.PulseUI.navigateTo('bookmarks');
    });
  }

  // Clear Filter / Bookmarks banner button
  const clearNoticeBtn = document.getElementById('clear-filter-notice-btn');
  if (clearNoticeBtn) {
    clearNoticeBtn.addEventListener('click', () => {
      window.location.hash = '#/';
      window.PulseUI.navigateTo('home');
    });
  }
}

// Search & Filter Events
function setupSearchAndFilters() {
  const searchInputs = document.querySelectorAll('.search-input-field');
  let searchDebounce = null;

  searchInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        window.PulseUI.searchQuery = e.target.value.trim();
        // Sync other search inputs if any
        searchInputs.forEach(other => {
          if (other !== input) other.value = e.target.value;
        });
        window.PulseUI.renderFeed();
      }, 200);
    });
  });

  // Category Tabs
  const categoryTabs = document.querySelectorAll('.category-tab');
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat || 'all';
      window.PulseUI.selectCategory(cat);
    });
  });

  // Sort Dropdown
  const sortSelect = document.getElementById('sort-feed-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      window.PulseUI.sortBy = e.target.value;
      window.PulseUI.renderFeed();
    });
  }
}

// Studio / Editor Actions
function setupEditorActions() {
  // Toolbar buttons
  const toolbarActions = {
    'btn-format-bold': () => window.StudioEditor.insertText('**', '**', 'bold text'),
    'btn-format-italic': () => window.StudioEditor.insertText('*', '*', 'italic text'),
    'btn-format-h2': () => window.StudioEditor.insertText('## ', '\n', 'Heading 2'),
    'btn-format-h3': () => window.StudioEditor.insertText('### ', '\n', 'Heading 3'),
    'btn-format-quote': () => window.StudioEditor.insertText('> ', '\n', 'Quote text here'),
    'btn-format-code': () => window.StudioEditor.insertText('```javascript\n', '\n```', '// Your code here'),
    'btn-format-list': () => window.StudioEditor.insertText('- ', '\n', 'List item'),
    'btn-format-link': () => window.StudioEditor.insertText('[', '](https://example.com)', 'Link label'),
    'btn-format-image': () => window.StudioEditor.insertText('![Image description](', ')', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&q=80'),
    'btn-format-callout': () => window.StudioEditor.insertText('> [!NOTE] ', '\n', 'Important highlight or key takeaway.')
  };

  Object.entries(toolbarActions).forEach(([id, action]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', action);
  });

  // Preset cover image chips
  const presetChips = document.querySelectorAll('.preset-chip');
  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const url = chip.dataset.url;
      const input = document.getElementById('editor-cover');
      const preview = document.getElementById('editor-cover-preview');
      if (input) input.value = url;
      if (preview) preview.src = url;
      window.StudioEditor.scheduleAutosave();
    });
  });

  // Publish Article
  const publishBtn = document.getElementById('btn-publish-article');
  if (publishBtn) {
    publishBtn.addEventListener('click', () => {
      const title = document.getElementById('editor-title')?.value.trim();
      const content = document.getElementById('editor-textarea')?.value.trim();
      const category = document.getElementById('editor-category')?.value;
      const tagsString = document.getElementById('editor-tags')?.value;
      const cover = document.getElementById('editor-cover')?.value.trim();

      if (!title) {
        window.PulseUI.showToast('Please enter an article title', 'warning');
        document.getElementById('editor-title')?.focus();
        return;
      }

      if (!content) {
        window.PulseUI.showToast('Please write some content before publishing', 'warning');
        document.getElementById('editor-textarea')?.focus();
        return;
      }

      const tags = tagsString
        ? tagsString.split(',').map(t => t.trim().replace(/^#/, '')).filter(Boolean)
        : ['General'];

      const newArticle = window.Store.saveArticle({
        title,
        content,
        category,
        tags,
        cover
      });

      window.StudioEditor.resetEditor();
      window.PulseUI.showToast('Article published successfully!', 'success');

      // Navigate to newly published article
      window.location.hash = `#/article/${newArticle.id}`;
      window.PulseUI.navigateTo('reader', newArticle.id);
    });
  }

  // Cancel / Exit editor
  const cancelBtn = document.getElementById('btn-cancel-editor');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      if (confirm('Discard changes and return to the main feed?')) {
        window.location.hash = '#/';
        window.PulseUI.navigateTo('home');
      }
    });
  }
}

// Auth & User Switcher Dialog and Sidebar
function setupAuthDialogEvents() {
  const userMenuBtn = document.getElementById('user-menu-trigger');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');

  if (sidebarToggleBtn) {
    sidebarToggleBtn.addEventListener('click', () => {
      window.PulseUI.openSidebar();
    });
  }

  if (userMenuBtn) {
    userMenuBtn.addEventListener('click', () => {
      window.PulseUI.openAuthModal();
    });
  }
}
