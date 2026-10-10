/**
 * Pulse Tech Wire - Community Discussions Data (Reddit & Twitter Style)
 * Interactive community conversations about OS, APPs, Cybersecurity, AI, and IT
 */
window.PULSE_COMMUNITY_DISCUSSIONS = [
  {
    "id": "post-1",
    "author": {
      "id": "user_pulse_collective",
      "name": "The Pulse Collective",
      "handle": "@pulsecollective",
      "avatar": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=250&q=80",
      "badge": "Verified Staff"
    },
    "category": "OS",
    "tags": ["Linux", "Windows", "DesktopOS", "Gaming"],
    "text": "Hot take on Operating Systems: With Proton running 90%+ of top Steam games with zero friction, the main thing keeping regular folks on Windows is no longer gaming—it's legacy enterprise anti-cheat and Office suite muscle memory. Has anyone here switched full-time to Fedora or Arch this year? What's been your biggest stumbling block?",
    "codeSnippet": "# Fast kernel info test\nuname -r\n# 6.12.0-rc1-pulse-rt",
    "votes": 84,
    "userVote": 0,
    "replies": [
      {
        "id": "rep-1-1",
        "author": {
          "name": "Alex Rivera",
          "handle": "@alexrivera",
          "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
          "badge": "Dev"
        },
        "text": "Switched my main workstation to Fedora Silverblue 6 months ago. The immutable root filesystem combined with Flatpaks for all desktop APPs makes system borking basically impossible.",
        "votes": 29,
        "createdAt": "2026-10-09T13:40:00Z"
      },
      {
        "id": "rep-1-2",
        "author": {
          "name": "Elena Rostova",
          "handle": "@elenadesign",
          "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
          "badge": "UI Designer"
        },
        "text": "Font rendering across Wayland fractional scaling was my only issue, but recent GNOME and KDE Wayland updates finally solved it completely.",
        "votes": 14,
        "createdAt": "2026-10-09T14:10:00Z"
      }
    ],
    "createdAt": "2026-10-09T12:30:00Z"
  },
  {
    "id": "post-2",
    "author": {
      "name": "Marcus Chen",
      "handle": "@marcuschen_ai",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
      "badge": "AI Researcher"
    },
    "category": "APPs",
    "tags": ["APPs", "OpenSource", "Productivity", "Mac", "Linux"],
    "text": "What are your top 3 must-have developer & productivity APPs that you install within the first 10 minutes on a freshly formatted machine?\n\nMine:\n1. Ghostty / Kitty (GPU Terminal)\n2. Obsidian (Offline Markdown PKM)\n3. Raycast / KRunner (Command launcher)\n\nDrop your stack below 👇",
    "codeSnippet": "",
    "votes": 126,
    "userVote": 0,
    "replies": [
      {
        "id": "rep-2-1",
        "author": {
          "name": "David K.",
          "handle": "@sysadmin_dave",
          "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80",
          "badge": "SysAdmin"
        },
        "text": "1. Bitwarden for credential sync\n2. Zed editor (insanely fast launch compared to VS Code)\n3. Docker Desktop / OrbStack for instant local test containers.",
        "votes": 42,
        "createdAt": "2026-10-09T11:20:00Z"
      }
    ],
    "createdAt": "2026-10-09T10:15:00Z"
  },
  {
    "id": "post-3",
    "author": {
      "name": "Sarah Lin",
      "handle": "@lin_sec",
      "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      "badge": "Infosec"
    },
    "category": "Cybersecurity",
    "tags": ["Cybersecurity", "Passkeys", "ZeroTrust", "Privacy"],
    "text": "Reminder for everyone setting up new servers or IT infrastructure today: disable password authentication on SSH immediately. Use Ed25519-SK hardware keys or Passkeys backed by FIDO2. Phishing attacks on SMS 2FA are breaking records this quarter.",
    "codeSnippet": "# Strict /etc/ssh/sshd_config\nPasswordAuthentication no\nKbdInteractiveAuthentication no\nPubkeyAuthentication yes",
    "votes": 95,
    "userVote": 0,
    "replies": [
      {
        "id": "rep-3-1",
        "author": {
          "name": "The Pulse Collective",
          "handle": "@pulsecollective",
          "avatar": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=250&q=80",
          "badge": "Verified Staff"
        },
        "text": "100% agreed. Passkeys with hardware security tokens eliminate credential interception at the network layer.",
        "votes": 31,
        "createdAt": "2026-10-09T09:30:00Z"
      }
    ],
    "createdAt": "2026-10-09T08:50:00Z"
  },
  {
    "id": "post-4",
    "author": {
      "name": "The Pulse Collective",
      "handle": "@pulsecollective",
      "avatar": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=250&q=80",
      "badge": "Verified Staff"
    },
    "category": "AI & ML",
    "tags": ["AI", "LocalLLM", "Hardware", "EdgeAI"],
    "text": "Running quantized 8B and 14B models completely locally on laptop NPU/GPU silicon is officially practical now (35+ tokens/sec on 32GB RAM). You don't need to leak company source code or private logs to external cloud APIs for code review or summarization.",
    "codeSnippet": "# Run private model locally via Ollama\nollama run deepseek-coder:6.7b",
    "votes": 142,
    "userVote": 0,
    "replies": [],
    "createdAt": "2026-10-09T07:15:00Z"
  }
];
