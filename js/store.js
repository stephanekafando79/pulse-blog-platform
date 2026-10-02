/**
 * Store - LocalStorage State Management & Initial Seed Data
 * Pulse Modern Publishing Platform
 */

const STORAGE_KEYS = {
  ARTICLES: 'pulse_articles_v1',
  CURRENT_USER: 'pulse_current_user_v1',
  USERS: 'pulse_users_v1',
  THEME: 'pulse_theme_v1',
  DRAFT: 'pulse_draft_v1',
  BOOKMARKS: 'pulse_bookmarks_v1'
};

const DEFAULT_USERS = [
  {
    id: 'user_stephane',
    name: 'Stephane Kafando',
    handle: '@stephanekafando79',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    bio: 'Founder, Lead Architect & Platform Owner of Pulse.',
    isOwner: true,
    badge: 'Platform Owner',
    followers: 5280
  },
  {
    id: 'user_alex',
    name: 'Alex Rivera',
    handle: '@alexrivera',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    bio: 'Staff Frontend Engineer & Design Systems Architect.',
    followers: 1420
  },
  {
    id: 'user_elena',
    name: 'Elena Rostova',
    handle: '@elenadesign',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    bio: 'Product Designer & Creative Director. Writing on human-computer interaction, spatial interfaces, and micro-delights.',
    followers: 2890
  },
  {
    id: 'user_marcus',
    name: 'Marcus Chen',
    handle: '@marcuschen_ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    bio: 'AI Researcher & Open Source Contributor. Exploring LLMs, agentic workflows, and the future of coding tools.',
    followers: 3410
  }
];

const INITIAL_ARTICLES = [
  {
    id: 'art-1',
    title: 'The Evolution of Modern Web Architecture: Zero-Build Tools & Native Primitives',
    slug: 'evolution-of-modern-web-architecture',
    excerpt: 'How modern CSS features, native ES modules, and baseline platform APIs are eliminating bloated build chains and bringing joy back to web development.',
    content: `## A Renaissance in Native Web Standards

For nearly a decade, front-end development became synonymously tethered to increasingly heavy bundlers, transpilers, and intricate configuration files. While build tooling unlocked transformative productivity, browser vendors were quietly standardizing extraordinary capabilities right into the native platform.

Today, we are witnessing a genuine renaissance:

- **CSS Nesting and Variables** natively supported without preprocessors
- **Native \`<dialog>\` and Popover API** removing massive modal libraries
- **Import Maps and ES Modules** executing directly in the browser
- **Fluid Typography and Container Queries** adapting to any parent element seamlessly

> "The best code is the code you didn't have to compile. When the web platform itself does the heavy lifting, your application is faster, more resilient, and built to last."

### Benchmark Comparison

Let's examine how native browser primitives reduce overhead:

\`\`\`javascript
// Native dialog interaction without any 3rd-party dependencies
const modal = document.querySelector('dialog#profile-modal');

// Open as modal with backdrop blur
modal.showModal();

// Close cleanly with native ESC key and backdrop click detection
modal.addEventListener('close', () => {
  console.log('Dialog dismissed cleanly with code:', modal.returnValue);
});
\`\`\`

### Where Do We Go From Here?

As you architect your next product or internal tool, challenge the urge to blindly run \`npm install\`. Ask what the modern web platform already provides out of the box. You might just find yourself shipping faster software with zero configuration debt!`,
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    category: 'Technology',
    tags: ['WebDev', 'JavaScript', 'CSS', 'Architecture'],
    author: DEFAULT_USERS[0],
    publishedAt: '2026-09-28T14:30:00.000Z',
    readTime: '4 min read',
    likes: 142,
    views: 1250,
    featured: true,
    comments: [
      {
        id: 'c1',
        author: DEFAULT_USERS[1],
        text: 'Could not agree more! Native dialogs and container queries have drastically simplified our design system codebase.',
        createdAt: '2026-09-29T10:15:00.000Z',
        likes: 18
      },
      {
        id: 'c2',
        author: DEFAULT_USERS[2],
        text: 'Great writeup Alex. The reduction in CI build times when relying on native standards is a huge win for engineering teams.',
        createdAt: '2026-09-30T08:45:00.000Z',
        likes: 9
      }
    ]
  },
  {
    id: 'art-2',
    title: 'Designing for Ambient Computing: Beyond Glass Screens',
    slug: 'designing-for-ambient-computing',
    excerpt: 'Exploring sensory interfaces, subtle micro-interactions, and how humane technology design respects human attention in an era of digital overload.',
    content: `## Calm Technology in an Overstimulated World

We check our phones over 150 times per day. Every application shouts for push notification permissions, flashing badges and competing for finite cognitive bandwidth.

Ambient design takes the opposite stance: **technology that moves seamlessly between the periphery and the center of the user's attention.**

### Key Principles of Calm Design:
1. **Peripheral Awareness**: Present information gently without requiring immediate gaze.
2. **High-Value Micro-Interactions**: Celebrate accomplishments with tactile, physical-feeling feedback.
3. **Graceful Degradation**: Tools should remain functional even when connectivity or sensors fluctuate.

\`\`\`css
/* Subtle ambient glowing state */
.card-ambient-glow {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
  box-shadow: 0 4px 20px -2px rgba(99, 102, 241, 0.12);
}
.card-ambient-glow:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px -4px rgba(99, 102, 241, 0.28);
}
\`\`\`

When we design with empathy for attention, people feel energized by our software instead of drained.`,
    cover: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    category: 'Design',
    tags: ['UIUX', 'HumanCentered', 'DesignSystems'],
    author: DEFAULT_USERS[1],
    publishedAt: '2026-09-30T11:00:00.000Z',
    readTime: '3 min read',
    likes: 98,
    views: 890,
    featured: false,
    comments: [
      {
        id: 'c3',
        author: DEFAULT_USERS[0],
        text: 'The concept of peripheral awareness is critical as AI agents take over more ambient background tasks.',
        createdAt: '2026-10-01T15:20:00.000Z',
        likes: 5
      }
    ]
  },
  {
    id: 'art-3',
    title: 'Autonomous Coding Agents: How Pair-Programming Evolved into Team Orchestration',
    slug: 'autonomous-coding-agents-orchestration',
    excerpt: 'From simple code autocompletion to collaborative multi-agent teams running tests, refactoring modules, and verifying accessibility.',
    content: `## The Next Frontier in Software Craftsmanship

In 2022, AI coding tools were primarily predictive tab-completers. Today, developers work with specialized subagent teams that can analyze dependency trees, write robust integration tests, and diagnose performance regressions.

### The Agentic Workflow Loop:
- **Planner Agent**: Analyzes the problem space, formulates hypotheses, and sequences tasks.
- **Coder Agent**: Executes targeted modifications with surgical diffs.
- **Verification Agent**: Runs test suites, validates linting, and inspects accessibility trees.

\`\`\`python
# Example orchestration coordinator
def orchestrate_task(task_prompt: str):
    plan = agent_planner.create_plan(task_prompt)
    for step in plan.steps:
        result = agent_coder.execute_step(step)
        audit = agent_auditor.verify_changes(result)
        if not audit.passed:
            agent_coder.refine(audit.feedback)
    return "Task successfully resolved."
\`\`\`

Developers are quickly transitioning from manual syntax writers into orchestrators and architectural curators.`,
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    category: 'AI & Engineering',
    tags: ['AI', 'Productivity', 'FutureOfWork'],
    author: DEFAULT_USERS[2],
    publishedAt: '2026-10-01T16:45:00.000Z',
    readTime: '5 min read',
    likes: 215,
    views: 1840,
    featured: false,
    comments: []
  },
  {
    id: 'art-4',
    title: 'Mastering Focus: Designing Digital Workspaces for Deep Work',
    slug: 'mastering-focus-digital-workspaces',
    excerpt: 'Practical strategies to eliminate contextual switching, create intentional routines, and reclaim cognitive stamina.',
    content: `## The Myth of Multitasking

Context switching costs the human brain up to 20 minutes to recover focus after every disruption. In our hyper-connected remote environments, deep work requires intentional systems.

### 3 High-Impact Habits:
1. **Time-block Async Windows**: Allocate two distinct 30-minute windows per day for communication channels.
2. **Single-Window Flow**: Keep only the primary editor and documentation visible.
3. **End-of-day Shutdown Ritual**: Document the exact starting point for tomorrow morning to eliminate startup friction.

Start small: test a 90-minute morning deep work block tomorrow without email or notifications. Notice how much gets delivered.`,
    cover: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    category: 'Productivity',
    tags: ['Mindset', 'Productivity', 'RemoteWork'],
    author: DEFAULT_USERS[0],
    publishedAt: '2026-10-02T08:15:00.000Z',
    readTime: '3 min read',
    likes: 74,
    views: 620,
    featured: false,
    comments: []
  }
];

class DataStore {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.ARTICLES)) {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_ARTICLES));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0]));
    } else {
      // Ensure Stephane is the default active user if previous demo session exists
      const curr = this.getCurrentUser();
      if (!curr || curr.id === 'user_alex') {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0]));
      }
    }
    // Update users array to include Stephane as first entry
    const existingUsers = this.getAllUsers();
    if (!existingUsers.find(u => u.id === 'user_stephane')) {
      existingUsers.unshift(DEFAULT_USERS[0]);
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(existingUsers));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(['art-1']));
    }
    this.syncDailyArticles();
  }

  syncDailyArticles() {
    if (window.PULSE_DAILY_ARTICLES && Array.isArray(window.PULSE_DAILY_ARTICLES)) {
      const current = this.getArticles();
      let updated = false;

      // Prepend any new daily stories not yet saved locally
      for (const daily of window.PULSE_DAILY_ARTICLES) {
        const index = current.findIndex(a => a.id === daily.id);
        if (index === -1) {
          current.unshift(daily);
          updated = true;
        }
      }

      if (updated) {
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(current));
      }
    }
  }

  // Articles
  getArticles() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      return data ? JSON.parse(data) : INITIAL_ARTICLES;
    } catch (e) {
      console.error('Failed to parse articles:', e);
      return INITIAL_ARTICLES;
    }
  }

  getArticleById(id) {
    const articles = this.getArticles();
    return articles.find(a => a.id === id) || null;
  }

  saveArticle(articleData) {
    const articles = this.getArticles();
    const currentUser = this.getCurrentUser();

    if (articleData.id) {
      // Update existing
      const index = articles.findIndex(a => a.id === articleData.id);
      if (index !== -1) {
        articles[index] = { ...articles[index], ...articleData, updatedAt: new Date().toISOString() };
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
        return articles[index];
      }
    }

    // Calculate approximate read time
    const words = (articleData.content || '').trim().split(/\s+/).length;
    const readMinutes = Math.max(1, Math.ceil(words / 200));

    // Create new
    const newArticle = {
      id: 'art-' + Date.now(),
      title: articleData.title,
      slug: articleData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      excerpt: articleData.excerpt || articleData.content.slice(0, 160) + '...',
      content: articleData.content,
      cover: articleData.cover || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
      category: articleData.category || 'Technology',
      tags: articleData.tags || ['General'],
      author: currentUser,
      publishedAt: new Date().toISOString(),
      readTime: `${readMinutes} min read`,
      likes: 0,
      views: 1,
      featured: false,
      comments: []
    };

    articles.unshift(newArticle);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    return newArticle;
  }

  deleteArticle(id) {
    const articles = this.getArticles().filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    return true;
  }

  toggleLike(articleId) {
    const articles = this.getArticles();
    const article = articles.find(a => a.id === articleId);
    if (!article) return 0;

    const likedKey = `liked_${articleId}`;
    const isLiked = localStorage.getItem(likedKey) === 'true';

    if (isLiked) {
      article.likes = Math.max(0, (article.likes || 0) - 1);
      localStorage.removeItem(likedKey);
    } else {
      article.likes = (article.likes || 0) + 1;
      localStorage.setItem(likedKey, 'true');
    }

    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    return { likes: article.likes, isLiked: !isLiked };
  }

  isArticleLiked(articleId) {
    return localStorage.getItem(`liked_${articleId}`) === 'true';
  }

  incrementViews(articleId) {
    const articles = this.getArticles();
    const article = articles.find(a => a.id === articleId);
    if (article) {
      article.views = (article.views || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    }
  }

  // Comments
  addComment(articleId, text) {
    const articles = this.getArticles();
    const article = articles.find(a => a.id === articleId);
    if (!article) return null;

    const currentUser = this.getCurrentUser();
    const newComment = {
      id: 'c_' + Date.now(),
      author: currentUser,
      text: text.trim(),
      createdAt: new Date().toISOString(),
      likes: 0
    };

    if (!article.comments) article.comments = [];
    article.comments.push(newComment);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    return newComment;
  }

  likeComment(articleId, commentId) {
    const articles = this.getArticles();
    const article = articles.find(a => a.id === articleId);
    if (!article || !article.comments) return 0;

    const comment = article.comments.find(c => c.id === commentId);
    if (!comment) return 0;

    comment.likes = (comment.likes || 0) + 1;
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
    return comment.likes;
  }

  // Bookmarks
  getBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  toggleBookmark(articleId) {
    const bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(articleId);
    let isBookmarked = false;

    if (index === -1) {
      bookmarks.push(articleId);
      isBookmarked = true;
    } else {
      bookmarks.splice(index, 1);
      isBookmarked = false;
    }

    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    return isBookmarked;
  }

  isBookmarked(articleId) {
    return this.getBookmarks().includes(articleId);
  }

  // Current User & Auth
  getCurrentUser() {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return user ? JSON.parse(user) : DEFAULT_USERS[0];
    } catch {
      return DEFAULT_USERS[0];
    }
  }

  setCurrentUser(user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  getAllUsers() {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      return users ? JSON.parse(users) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  }

  addUser(userData) {
    const users = this.getAllUsers();
    const newUser = {
      id: 'user_' + Date.now(),
      name: userData.name || 'Anonymous Writer',
      handle: '@' + (userData.handle || userData.name.toLowerCase().replace(/\s+/g, '')),
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
      bio: userData.bio || 'Pulse community writer.',
      followers: 1
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    this.setCurrentUser(newUser);
    return newUser;
  }

  // Theme Management
  getTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    document.documentElement.setAttribute('data-theme', theme);
  }

  // Draft Autosave
  saveDraft(draft) {
    localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(draft));
  }

  getDraft() {
    try {
      const d = localStorage.getItem(STORAGE_KEYS.DRAFT);
      return d ? JSON.parse(d) : null;
    } catch {
      return null;
    }
  }

  clearDraft() {
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
  }

  // Reset to sample data
  resetAll() {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(INITIAL_ARTICLES));
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_USERS));
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0]));
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(['art-1']));
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
  }
}

// Global singleton instance
window.Store = new DataStore();
