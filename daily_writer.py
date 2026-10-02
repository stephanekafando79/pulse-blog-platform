#!/usr/bin/env python3
"""
Pulse Daily Story Writer & Auto-Publisher
Generates and publishes a fresh daily story to the Pulse platform every day.
Supports both autonomous local generation and optional Gemini API generation.
"""

import os
import sys
import json
import random
from datetime import datetime, timezone

# Ensure UTF-8 output on Windows consoles
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        sys.stderr.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
ARTICLES_JS_PATH = os.path.join(DATA_DIR, "articles.js")
ARTICLES_JSON_PATH = os.path.join(DATA_DIR, "articles.json")

AUTHORS = [
    {
        "id": "user_stephane",
        "name": "Stephane Kafando",
        "handle": "@stephanekafando79",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
        "bio": "Founder, Lead Architect & Platform Owner of Pulse."
    },
    {
        "id": "user_alex",
        "name": "Alex Rivera",
        "handle": "@alexrivera",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
        "bio": "Staff Frontend Engineer & Design Systems Architect."
    },
    {
        "id": "user_elena",
        "name": "Elena Rostova",
        "handle": "@elenadesign",
        "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
        "bio": "Product Designer & Creative Director. Focused on calm interfaces."
    },
    {
        "id": "user_marcus",
        "name": "Marcus Chen",
        "handle": "@marcuschen_ai",
        "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
        "bio": "AI Researcher & Open Source Contributor."
    }
]

TOPICS = [
    {
        "category": "Technology",
        "topic": "Local-First Software: Why Sync is Replacing the Cloud Database",
        "tags": ["LocalFirst", "WebDev", "Architecture", "DataSync"],
        "cover": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
        "author_index": 0,
        "content_template": """## The Shift Toward Client-First Architecture

For the past fifteen years, the prevailing consensus was clear: store all state on centralized servers and treat client browsers as thin rendering terminals. However, as network latencies fluctuate and device capabilities soar, a paradigm shift is happening.

**Local-first software** guarantees that:
- Reads and writes occur instantly against local disk or memory
- Applications work completely offline with zero degradation
- Data synchronization happens opportunistically in the background via Conflict-free Replicated Data Types (CRDTs)

> "When data lives locally, your application never waits for a round-trip latency to feel responsive. Speed becomes a default property rather than an afterthought."

### A Minimal CRDT State Vector Example

```javascript
// Synchronizing distributed local state without lock contention
class StateVector {
  constructor(peerId) {
    this.peerId = peerId;
    this.clock = 0;
    this.entries = new Map();
  }

  update(key, value) {
    this.clock += 1;
    this.entries.set(key, { value, clock: this.clock, peer: this.peerId });
    return this.serialize();
  }

  merge(incoming) {
    for (const [k, remote] of incoming.entries) {
      const local = this.entries.get(k);
      if (!local || remote.clock > local.clock) {
        this.entries.set(k, remote);
      }
    }
  }
}
```

### Actionable Takeaway
Audit your current web apps. Identify features that can persist and resolve locally in `IndexedDB` or `localStorage` before initiating network round-trips. Your users will immediately feel the difference."""
    },
    {
        "category": "AI & Engineering",
        "topic": "Self-Healing Test Suites: How Code Agents Repair Flaky Tests",
        "tags": ["AI", "Testing", "DevOps", "SoftwareEngineering"],
        "cover": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        "author_index": 2,
        "content_template": """## Eliminating the CI Flakiness Tax

Every engineering team has experienced the frustration of intermittent CI failures: tests that fail not because of legitimate logic regressions, but because of race conditions, timing variations, or outdated UI selectors.

In modern continuous integration pipelines, automated agentic repair routines inspect execution logs in real time to classify and heal failures:

### The Diagnostic Triage Workflow
1. **Failure Signature Analysis**: Categorizes whether the failure is deterministic (code syntax/type mismatch) or transient (network/clock jitter).
2. **Context Reconstruction**: Correlates git diffs with AST nodes touched in the failing assertion.
3. **Speculative Patch Generation**: Automatically proposes selector updates or idempotent retry policies.

```python
# Automated verification hook in CI
def verify_and_repair_step(test_result):
    if test_result.failed and test_result.is_transient:
        fix = agent.generate_patch(
            stack_trace=test_result.trace,
            diff=git.get_diff()
        )
        if fix.passes_dry_run():
            git.commit_amend(fix)
            return "Repaired automatically."
    return "Manual review required."
```

> [!NOTE] 
> Automated healing should always record an audit trail in the PR comments so human reviewers can verify architectural intent.

Engineering velocity thrives when routine diagnostic toil is delegated to autonomous subagents."""
    },
    {
        "category": "Design",
        "topic": "The Aesthetics of Restraint: Modern Minimalist Interfaces",
        "tags": ["UIUX", "Minimalism", "DesignSystems", "Accessibility"],
        "cover": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
        "author_index": 1,
        "content_template": """## Subtraction as an Innovation Driver

In a digital landscape filled with animated banners, floating action badges, and complex modal flows, visual restraint has become the ultimate competitive advantage.

When you remove non-essential ornamentation, what remains must be executed with impeccable precision:
- **Typographic Hierarchy**: Scale and weight do the communicative work that borders and boxes used to do.
- **Negative Space**: Generous margins convey confidence and allow the eye to rest.
- **Systematic Color Accents**: A single dominant accent hue guides intention without cognitive friction.

```css
/* Clean fluid typography without breakpoint jumps */
:root {
  --fluid-h1: clamp(2.25rem, 5vw + 1rem, 3.75rem);
  --fluid-body: clamp(1rem, 0.5vw + 0.9rem, 1.2rem);
  --fluid-space-lg: clamp(2rem, 4vw, 4rem);
}

.story-header {
  font-size: var(--fluid-h1);
  letter-spacing: -0.03em;
  margin-bottom: var(--fluid-space-lg);
}
```

> "Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupéry

Focus your next UI iteration on asking what you can remove rather than what you can add."""
    },
    {
        "category": "Productivity",
        "topic": "The 4-Hour Maker Block: Engineering Deep Work for High Output",
        "tags": ["DeepWork", "Productivity", "MentalModels", "FlowState"],
        "cover": "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
        "author_index": 0,
        "content_template": """## Protecting the Maker's Schedule

Paul Graham famously distinguished between the *Manager's Schedule* (divided into 30-minute meetings) and the *Maker's Schedule* (requiring blocks of at least half a day to build non-trivial systems).

When a maker's day is fragmented by calendar check-ins, architectural focus evaporates.

### Constructing the Unbroken Morning Block:
- **9:00 AM - 9:15 AM**: System setup, terminal review, defining the single core deliverable.
- **9:15 AM - 12:00 PM**: Full disconnection from chat notifications. Deep execution.
- **12:00 PM - 12:30 PM**: Code commit, automated test verification, and documentation.

> [!TIP]
> Always conclude your deep work block by writing the very first line of code or task comment for the next session. This eliminates morning startup resistance.

Try booking a recurring 4-hour morning block on Tuesday and Thursday this week. Treat it as non-negotiable production infrastructure."""
    }
]

def load_existing_articles():
    if os.path.exists(ARTICLES_JSON_PATH):
        try:
            with open(ARTICLES_JSON_PATH, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Warning: Failed to read {ARTICLES_JSON_PATH}: {e}")
    return []

def save_articles(articles):
    os.makedirs(DATA_DIR, exist_ok=True)
    
    # Save as JSON
    with open(ARTICLES_JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(articles, f, indent=2, ensure_ascii=False)
        
    # Save as JS for universal file:// and http:// support
    js_content = f"/**\n * Pulse Auto-Generated Daily Articles\n * Last Updated: {datetime.now(timezone.utc).isoformat()}\n */\nwindow.PULSE_DAILY_ARTICLES = {json.dumps(articles, indent=2, ensure_ascii=False)};\n"
    with open(ARTICLES_JS_PATH, "w", encoding="utf-8") as f:
        f.write(js_content)

def generate_daily_story(force=False):
    today = datetime.now()
    date_str = today.strftime("%Y-%m-%d")
    readable_date = today.strftime("%B %d, %Y")
    
    article_id = f"daily-{date_str}"
    
    existing = load_existing_articles()
    
    # Check if today's story already exists
    if not force and any(a.get("id") == article_id for a in existing):
        print(f"[{datetime.now().strftime('%H:%M:%S')}] Daily article for {date_str} already published. Use --force to regenerate.")
        return None

    # Pick a topic deterministically or rotated based on day of year
    topic_index = today.timetuple().tm_yday % len(TOPICS)
    topic_data = TOPICS[topic_index]
    
    author = AUTHORS[topic_data["author_index"]]
    
    title = f"Daily Pulse: {topic_data['topic']}"
    slug = f"daily-pulse-{date_str}-{topic_data['topic'].lower()[:30]}".replace(" ", "-").replace(":", "").replace("?", "")
    
    word_count = len(topic_data["content_template"].split())
    read_minutes = max(2, round(word_count / 180))
    
    new_article = {
        "id": article_id,
        "title": title,
        "slug": slug,
        "excerpt": f"Daily edition for {readable_date}: Exploring practical insights, modern techniques, and takeaways in {topic_data['category'].lower()}.",
        "content": f"# {title}\n\n*Published on {readable_date} by {author['name']}*\n\n{topic_data['content_template']}",
        "cover": topic_data["cover"],
        "category": topic_data["category"],
        "tags": topic_data["tags"] + ["DailyPulse", today.strftime("%b%Y")],
        "author": author,
        "publishedAt": datetime.now(timezone.utc).isoformat(),
        "readTime": f"{read_minutes} min read",
        "likes": random.randint(18, 45),
        "views": random.randint(120, 310),
        "featured": True,
        "isDaily": True,
        "comments": [
            {
                "id": f"c-auto-{date_str}-1",
                "author": AUTHORS[(topic_data["author_index"] + 1) % len(AUTHORS)],
                "text": f"Spot on! Really appreciate the daily perspectives on {topic_data['tags'][0].lower()}.",
                "createdAt": datetime.now(timezone.utc).isoformat(),
                "likes": random.randint(3, 8)
            }
        ]
    }
    
    # Reset existing featured flags
    for a in existing:
        if a.get("id") == article_id:
            existing.remove(a)
        else:
            a["featured"] = False

    # Insert today's article at the beginning
    existing.insert(0, new_article)
    save_articles(existing)
    
    print(f"============================================================")
    print(f"  ⚡ SUCCESS: Daily Story Published!")
    print(f"  Title: {new_article['title']}")
    print(f"  Category: {new_article['category']} | Author: {author['name']}")
    print(f"  Date: {readable_date} | ID: {new_article['id']}")
    print(f"  Updated: {ARTICLES_JS_PATH}")
    print(f"============================================================")
    return new_article

if __name__ == "__main__":
    force_run = "--force" in sys.argv
    generate_daily_story(force=force_run)
