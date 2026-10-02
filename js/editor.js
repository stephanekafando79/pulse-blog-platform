/**
 * Editor & Markdown Engine
 * Pulse Modern Publishing Platform
 */

class MarkdownEngine {
  /**
   * Converts markdown text into sanitized, semantic HTML
   */
  static parse(markdown) {
    if (!markdown) return '';

    let html = markdown;

    // Escape raw HTML tags for safety
    html = html
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // Code blocks with syntax container and copy button
    html = html.replace(/```([a-zA-Z0-9_+-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
      const cleanCode = code.trim();
      return `
        <div class="code-block-wrapper">
          <div class="code-block-header">
            <span class="code-lang">${lang || 'plaintext'}</span>
            <button class="btn-copy-code" onclick="navigator.clipboard.writeText(this.closest('.code-block-wrapper').querySelector('code').innerText); window.PulseUI.showToast('Code copied to clipboard!');">Copy</button>
          </div>
          <pre><code class="language-${lang}">${cleanCode}</code></pre>
        </div>
      `;
    });

    // Blockquotes & GitHub-style alerts/callouts
    html = html.replace(/^&gt;\s*\[!(NOTE|TIP|IMPORTANT|WARNING)\]\s*(.*)$/gim, (match, type, content) => {
      return `<div class="callout-box callout-${type.toLowerCase()}"><strong>${type}:</strong> ${content}</div>`;
    });

    html = html.replace(/^&gt;\s+(.+)$/gim, '<blockquote>$1</blockquote>');

    // Headings
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold & Italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

    // Inline Code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<figure class="article-image"><img src="$2" alt="$1" loading="lazy" /><figcaption>$1</figcaption></figure>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Unordered lists
    html = html.replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

    // Line breaks & Paragraphs
    const paragraphs = html.split(/\n{2,}/);
    html = paragraphs.map(p => {
      const trimmed = p.trim();
      if (!trimmed) return '';
      // If it already starts with a block tag, don't wrap in <p>
      if (/^<(h[1-6]|ul|ol|blockquote|div|figure|pre)/i.test(trimmed)) {
        return trimmed;
      }
      return `<p>${trimmed.replace(/\n/g, '<br/>')}</p>`;
    }).join('\n');

    return html;
  }
}

class StudioEditor {
  constructor() {
    this.textarea = null;
    this.preview = null;
    this.titleInput = null;
    this.categorySelect = null;
    this.tagsInput = null;
    this.coverInput = null;
    this.statusDot = null;
    this.statusText = null;
    this.autosaveTimer = null;
  }

  init() {
    this.textarea = document.getElementById('editor-textarea');
    this.preview = document.getElementById('editor-preview');
    this.titleInput = document.getElementById('editor-title');
    this.categorySelect = document.getElementById('editor-category');
    this.tagsInput = document.getElementById('editor-tags');
    this.coverInput = document.getElementById('editor-cover');
    this.statusDot = document.getElementById('status-indicator-dot');
    this.statusText = document.getElementById('status-indicator-text');

    if (!this.textarea || !this.preview) return;

    // Real-time live preview update
    this.textarea.addEventListener('input', () => {
      this.updatePreview();
      this.scheduleAutosave();
    });

    if (this.titleInput) {
      this.titleInput.addEventListener('input', () => this.scheduleAutosave());
    }

    // Cover image preview change
    if (this.coverInput) {
      this.coverInput.addEventListener('input', () => {
        const previewImg = document.getElementById('editor-cover-preview');
        if (previewImg) {
          previewImg.src = this.coverInput.value || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80';
        }
      });
    }

    // Load any saved draft
    this.loadDraft();
  }

  updatePreview() {
    if (!this.textarea || !this.preview) return;
    const markdown = this.textarea.value;
    this.preview.innerHTML = MarkdownEngine.parse(markdown) || '<p class="text-muted">Live preview will appear here as you type...</p>';
  }

  scheduleAutosave() {
    if (this.statusDot) this.statusDot.style.background = 'var(--warning)';
    if (this.statusText) this.statusText.textContent = 'Saving draft...';

    clearTimeout(this.autosaveTimer);
    this.autosaveTimer = setTimeout(() => {
      this.saveDraft();
    }, 1000);
  }

  saveDraft() {
    const draft = {
      title: this.titleInput ? this.titleInput.value : '',
      content: this.textarea ? this.textarea.value : '',
      category: this.categorySelect ? this.categorySelect.value : 'Technology',
      tags: this.tagsInput ? this.tagsInput.value : '',
      cover: this.coverInput ? this.coverInput.value : '',
      savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    window.Store.saveDraft(draft);

    if (this.statusDot) this.statusDot.style.background = 'var(--success)';
    if (this.statusText) this.statusText.textContent = `Draft saved at ${draft.savedAt}`;
  }

  loadDraft() {
    const draft = window.Store.getDraft();
    if (!draft) {
      this.updatePreview();
      return;
    }

    if (this.titleInput && draft.title) this.titleInput.value = draft.title;
    if (this.textarea && draft.content) this.textarea.value = draft.content;
    if (this.categorySelect && draft.category) this.categorySelect.value = draft.category;
    if (this.tagsInput && draft.tags) this.tagsInput.value = draft.tags;
    if (this.coverInput && draft.cover) {
      this.coverInput.value = draft.cover;
      const previewImg = document.getElementById('editor-cover-preview');
      if (previewImg) previewImg.src = draft.cover;
    }

    this.updatePreview();
    if (this.statusText && draft.savedAt) {
      this.statusText.textContent = `Restored draft from ${draft.savedAt}`;
    }
  }

  insertText(before, after = '', placeholder = '') {
    if (!this.textarea) return;

    const start = this.textarea.selectionStart;
    const end = this.textarea.selectionEnd;
    const text = this.textarea.value;
    const selected = text.substring(start, end) || placeholder;

    const replacement = before + selected + after;
    this.textarea.value = text.substring(0, start) + replacement + text.substring(end);

    // Place cursor appropriately
    this.textarea.focus();
    this.textarea.setSelectionRange(start + before.length, start + before.length + selected.length);

    this.updatePreview();
    this.scheduleAutosave();
  }

  resetEditor() {
    if (this.titleInput) this.titleInput.value = '';
    if (this.textarea) this.textarea.value = '';
    if (this.tagsInput) this.tagsInput.value = '';
    if (this.coverInput) this.coverInput.value = '';
    const previewImg = document.getElementById('editor-cover-preview');
    if (previewImg) previewImg.src = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=400&q=80';
    window.Store.clearDraft();
    this.updatePreview();
  }
}

window.MarkdownEngine = MarkdownEngine;
window.StudioEditor = new StudioEditor();
