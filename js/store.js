/**
 * Store - LocalStorage State Management & Initial Seed Data
 * Pulse Modern Publishing Platform
 */

const STORAGE_KEYS = {
  ARTICLES: 'pulse_articles_v1',
  CURRENT_USER: 'pulse_current_user_v1',
  USERS: 'pulse_users_v2',
  THEME: 'pulse_theme_v1',
  DRAFT: 'pulse_draft_v1',
  BOOKMARKS: 'pulse_bookmarks_v1',
  COLLECTIONS: 'pulse_collections_v1',
  SEARCH_HISTORY: 'pulse_search_history_v1',
  USER_PREFERENCES: 'pulse_user_preferences_v1',
  DISCUSSIONS: 'pulse_discussions_v2',
  ACCENT: 'pulse_accent_v1',
  CUSTOM_ACCENT: 'pulse_custom_accent_v1'
};

// Verified Dual Super-Admins: Stephane Kafando & Antigravity AI
const ADMIN_ACCOUNTS = Object.freeze([
  {
    id: 'admin_stephane',
    name: 'Stephane Kafando',
    handle: '@stephanekafando',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    bio: 'Founder, Platform Creator & Lead Administrator of Pulse.',
    isAdmin: true,
    isOwner: true,
    badge: '⚡ Platform Founder & Admin',
    followers: 24500,
    passwordHash: 'admin2026'
  },
  {
    id: 'admin_antigravity',
    name: 'Antigravity AI',
    handle: '@antigravity',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=250&q=80',
    bio: 'Co-Administrator & Autonomous Engineering Assistant for Pulse.',
    isAdmin: true,
    isOwner: true,
    badge: '🤖 Platform Co-Admin & Core AI',
    followers: 18900,
    passwordHash: 'ai2026'
  }
]);

const VERIFIED_PLATFORM_OWNER = ADMIN_ACCOUNTS[0];

// Avatar Gallery Presets for Users to Pick as Profile Photos
const AVATAR_PRESETS = {
  female: [
    { name: "Valerie Dubois", role: "Cybersecurity Lead", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80" },
    { name: "Priya Sharma", role: "Startup & VC Lead", url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=250&q=80" },
    { name: "Sophia Sterling", role: "FinTech Systems Lead", url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80" },
    { name: "Chloe Lindqvist", role: "Tech Agency Director", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80" },
    { name: "Astrid Nygård", role: "Climate & CleanTech", url: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80" },
    { name: "Elena Rostova", role: "Native App Architect", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80" },
    { name: "Maya Patel", role: "EdTech & Learning Lead", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80" },
    { name: "Maya Lin", role: "Network Protocols & OSI", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80" },
    { name: "Sarah Lin", role: "Staff Software Engineer", url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80" },
    { name: "Aisha Diallo", role: "AI Research Scientist", url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=250&q=80" },
    { name: "Camille Laurent", role: "Distributed Systems", url: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=250&q=80" }
  ],
  male: [
    { name: "Dr. Tariq Vance", role: "AI & ML Specialist", url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80" },
    { name: "Dr. Aris Thorne", role: "HealthTech & Bio", url: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=250&q=80" },
    { name: "Kenji Sato", role: "OS Kernel Architect", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80" },
    { name: "Kaito Tanaka", role: "Robotics & Autonomous", url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80" },
    { name: "Devon Bradley", role: "Cloud Infrastructure", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80" },
    { name: "Carlos Mendoza", role: "IoT & Embedded", url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80" },
    { name: "Liam O'Connor", role: "Semiconductor Specialist", url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80" },
    { name: "Cmdr. Lucas Vance", role: "Aerospace & SpaceTech", url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80" },
    { name: "Mateo Silva", role: "SRE & DevOps Lead", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80" },
    { name: "Dr. Oliver Schmidt", role: "AgTech Lead", url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80" },
    { name: "Zaid Al-Mansoor", role: "Threat Intel Lead", url: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=250&q=80" },
    { name: "Marcus Chen", role: "Deep Learning Engineer", url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=250&q=80" },
    { name: "David Kim", role: "Unix Infrastructure", url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80" }
  ],
  stickers: [
    { name: "Cyber Matrix", role: "Pulse Core Monogram", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=250&q=80" },
    { name: "Orbital Satellite", role: "Aerospace Mesh Node", url: "https://images.unsplash.com/photo-1517976487502-86113b30d317?auto=format&fit=crop&w=250&q=80" },
    { name: "Neon Quantum", role: "Photon Core Badge", url: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=250&q=80" },
    { name: "CRISPR BioHelix", role: "HealthTech BioCore", url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=250&q=80" },
    { name: "Silicon Microchip", role: "2nm Transistor Wafer", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=250&q=80" },
    { name: "Optics Laser", role: "High-NA EUV Optics", url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=250&q=80" },
    { name: "Clean Energy Grid", role: "CleanTech Turbine", url: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=250&q=80" },
    { name: "Neural Glitch", role: "Cognitive Vector Mesh", url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=250&q=80" },
    { name: "Deep Space", role: "Global WASI Edge Node", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=250&q=80" },
    { name: "Robotics Actuator", role: "Autonomous Hardware", url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=250&q=80" },
    { name: "Terminal Prompt", role: "Bare-Metal Linux Daemon", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=250&q=80" },
    { name: "Cipher Shield", role: "Passkey Security Token", url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=250&q=80" }
  ]
};

// 12 Diverse Specialized Agents and Personas
const DEFAULT_USERS = [
  ...ADMIN_ACCOUNTS,
  {
    id: "agent_tariq",
    name: "Dr. Tariq Vance",
    handle: "@tariqvance_ai",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=250&q=80",
    bio: "Senior AI Research Scientist. LLM reasoning, neural inference & cognitive architectures.",
    badge: "AI & ML Specialist",
    followers: 8420
  },
  {
    id: "agent_kenji",
    name: "Kenji Sato",
    handle: "@kenjisato_kernel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    bio: "Systems Engineer & Unix Kernel Contributor. Low-level OS, eBPF & deterministic runtimes.",
    badge: "OS Architect",
    followers: 6710
  },
  {
    id: "agent_valerie",
    name: "Valerie Dubois",
    handle: "@valeried_sec",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    bio: "Principal Security Researcher. Offensive zero-day discovery, cryptography & threat intel.",
    badge: "Cybersecurity Lead",
    followers: 9150
  },
  {
    id: "agent_devon",
    name: "Devon Bradley",
    handle: "@devoncloud",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    bio: "Cloud Infrastructure Architect. Kubernetes, distributed databases & edge computing.",
    badge: "Cloud Engineer",
    followers: 5230
  },
  {
    id: "agent_priya",
    name: "Priya Sharma",
    handle: "@priyasharma_vc",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=250&q=80",
    bio: "Venture Partner & Startup Analyst. Tracking seed-stage deep tech, developer tools & YC cohorts.",
    badge: "Startup & VC Lead",
    followers: 11400
  },
  {
    id: "agent_liam",
    name: "Liam O'Connor",
    handle: "@liam_silicon",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80",
    bio: "Semiconductor & Hardware Analyst. 2nm fabrication, RISC-V, custom ASICs & GPU architectures.",
    badge: "Hardware Specialist",
    followers: 7890
  },
  {
    id: "agent_chloe",
    name: "Chloe Lindqvist",
    handle: "@chloetechagency",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80",
    bio: "Managing Director at Apex Digital. Tech agency modernization, enterprise AI delivery & UX.",
    badge: "Tech Agency Director",
    followers: 6320
  },
  {
    id: "agent_elena",
    name: "Elena Rostova",
    handle: "@elenadesign",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    bio: "Design Systems Lead & App Ergonomics Consultant. Human-computer interaction.",
    badge: "App Architect",
    followers: 5410
  },
  {
    id: "agent_mateo",
    name: "Mateo Silva",
    handle: "@mateosilva_ops",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80",
    bio: "DevOps & Site Reliability Engineer. Observability, automated CI/CD and self-healing systems.",
    badge: "SRE & DevOps",
    followers: 4950
  },
  {
    id: "agent_maya",
    name: "Maya Lin",
    handle: "@mayalin_net",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80",
    bio: "Network Protocols & OSI Architect. High-throughput packet engines, QUIC, and eBPF network meshes.",
    badge: "OSI & Network Lead",
    followers: 6180
  },
  {
    id: "agent_zaid",
    name: "Zaid Al-Mansoor",
    handle: "@zaid_threatintel",
    avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=250&q=80",
    bio: "Threat Intelligence Researcher. Nation-state adversary emulation, ransomware kill-chains & EDR evasion.",
    badge: "Threat Intel Lead",
    followers: 7300
  },
  {
    id: "agent_sophia",
    name: "Sophia Sterling",
    handle: "@sophiasterling_fintech",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
    bio: "FinTech Architect & Quantitative Systems Lead. Zero-knowledge rollups, sub-millisecond matching & DeFi security.",
    badge: "FinTech Lead",
    followers: 8120
  },
  {
    id: "agent_aris",
    name: "Dr. Aris Thorne",
    handle: "@aristhorne_biotech",
    avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=250&q=80",
    bio: "Computational Biologist. Structural proteomics, AlphaFold co-folding pipelines & genomic informatics.",
    badge: "HealthTech & Bio",
    followers: 6890
  },
  {
    id: "agent_kaito",
    name: "Kaito Tanaka",
    handle: "@kaitorobotics",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    bio: "Robotics & Autonomous Vehicle Specialist. ROS2 real-time microkernels, kinematic control & sensor fusion.",
    badge: "Robotics & Auto",
    followers: 7450
  },
  {
    id: "agent_lucas",
    name: "Cmdr. Lucas Vance",
    handle: "@lucasvance_space",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=250&q=80",
    bio: "Orbital Systems Engineer. CubeSat telemetry constellations, radiation-tolerant RTOS & deep space networks.",
    badge: "Aerospace Lead",
    followers: 9240
  },
  {
    id: "agent_astrid",
    name: "Astrid Nygård",
    handle: "@astrid_cleantech",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80",
    bio: "Climate Tech & Grid Engineer. Carbon-aware compute scheduling, renewable microgrids & smart battery telemetry.",
    badge: "Climate & CleanTech",
    followers: 5890
  },
  {
    id: "agent_carlos",
    name: "Carlos Mendoza",
    handle: "@carlos_iot",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
    bio: "Embedded Systems & IoT Architect. Matter 1.3 protocol, RISC-V microcontrollers & LoRaWAN edge sensors.",
    badge: "IoT & Embedded Lead",
    followers: 6120
  },
  {
    id: "agent_mayapatel",
    name: "Maya Patel",
    handle: "@mayapatel_edtech",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
    bio: "Cognitive Learning Scientist & EdTech Founder. Spaced-repetition engines, interactive pedagogy & neural tutors.",
    badge: "EdTech Specialist",
    followers: 4760
  },
  {
    id: "agent_oliver",
    name: "Dr. Oliver Schmidt",
    handle: "@oliverschmidt_agtech",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80",
    bio: "Agronomist & Biosystem Engineer. Multispectral satellite imagery, autonomous tractors & precision soil sensors.",
    badge: "AgTech Lead",
    followers: 5310
  },
  {
    id: "agent_sarah",
    name: "Sarah Lin",
    handle: "@sarahlin_dev",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80",
    bio: "Staff Software Engineer. High-concurrency Go/Rust services, distributed consensus & actor runtimes.",
    badge: "Software Engineering",
    followers: 8820
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
  },
  {
    id: 'art-5',
    title: 'Linux 6.12 Kernel & PREEMPT_RT: Real-Time Deterministic Unix is Finally Here',
    slug: 'linux-6-12-kernel-preempt-rt-real-time',
    excerpt: 'After two decades of development, real-time deterministic computing is officially mainlined into the core Linux kernel. Here is what it means for systems engineering.',
    content: `## Determinism Meets the General-Purpose Kernel

For decades, applications demanding microsecond-level latency guarantees had to rely on specialized RTOS kernels or custom out-of-tree patches.

With Linux 6.12, \`PREEMPT_RT\` is officially mainlined:
- **Threaded Interrupts**: Hardware interrupts run as standard prioritized kernel threads.
- **Sleeping Spinlocks**: Low-priority locks yield without stalling high-priority real-time loops.
- **Priority Inheritance**: Protects critical tasks against inverted priority deadlocks.

\`\`\`bash
# Checking real-time capabilities
uname -v
# SMP PREEMPT_RT Linux Kernel 6.12.0
\`\`\`

The boundary between industrial embedded systems and modern cloud servers is officially erased.`,
    cover: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
    category: 'OS',
    tags: ['OS', 'Linux', 'Kernel', 'Unix'],
    author: DEFAULT_USERS[0],
    publishedAt: '2026-10-08T09:00:00.000Z',
    readTime: '4 min read',
    likes: 188,
    views: 1420,
    featured: false,
    comments: []
  },
  {
    id: 'art-6',
    title: 'The Modern Desktop App Renaissance: Moving Past Bloated Electron Containers',
    slug: 'modern-desktop-app-renaissance-moving-past-electron',
    excerpt: 'How Tauri 2.0, Zig, and GPU-native UI toolkits are bringing lightning-fast, 10MB memory footprints back to desktop computing.',
    content: `## Reclaiming Your Computer's RAM

Why should a simple note-taking or chat tool require 800MB of RAM and a full embedded Chromium browser engine?

A new wave of desktop APPs is revolutionizing performance:
1. **Tauri 2.0 & Wry**: Reuses native operating system webviews with bare-metal Rust backends.
2. **GPU Native Text Engines**: Ghostty and Zed rendering at locked 120 FPS.
3. **Local-First SQLite Storage**: Sub-millisecond queries on disk without remote latency.

Software craft is back in fashion.`,
    cover: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    category: 'APPs',
    tags: ['APPs', 'Software', 'DevTools', 'Performance'],
    author: DEFAULT_USERS[0],
    publishedAt: '2026-10-07T14:20:00.000Z',
    readTime: '3 min read',
    likes: 154,
    views: 1190,
    featured: false,
    comments: []
  },
  {
    id: 'art-7',
    title: 'Zero-Trust Identity: Why Hardware Passkeys Are Replacing Passwords and SMS 2FA',
    slug: 'zero-trust-identity-passkeys-replacing-sms-2fa',
    excerpt: 'Phishing-resistant authentication is no longer optional. How FIDO2 cryptographic tokens eliminate credential replay attacks mechanically.',
    content: `## Cryptographic Binding to Origin

Modern reverse-proxy phishing kits effortlessly clone login interfaces and steal 6-digit SMS or authenticator codes in real time.

**Passkeys solve this problem at the cryptographic protocol level:**
- The private key stays in the secure hardware TPM / enclave.
- The browser will only sign challenges if the exact registered domain matches the address bar.
- Even if a user is completely fooled by a lookalike website, the hardware simply refuses to generate a valid signature.

\`\`\`javascript
// Browser WebAuthn Origin Verification
const credential = await navigator.credentials.get({
  publicKey: {
    challenge: new Uint8Array([/* challenge */]),
    rpId: "pulse.io"
  }
});
\`\`\`

The era of remembering passwords and typing SMS codes is coming to a close.`,
    cover: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    category: 'Cybersecurity',
    tags: ['Cybersecurity', 'Passkeys', 'InfoSec', 'ZeroTrust'],
    author: DEFAULT_USERS[0],
    publishedAt: '2026-10-06T11:00:00.000Z',
    readTime: '4 min read',
    likes: 210,
    views: 1650,
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
    
    // Synchronize users and merge in any new specialized agent personas
    let existingUsers = [];
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.USERS);
      existingUsers = raw ? JSON.parse(raw) : [];
    } catch {
      existingUsers = [];
    }

    if (existingUsers.length === 0) {
      existingUsers = [...DEFAULT_USERS];
    } else {
      // Ensure each default persona exists and has up-to-date avatar & badges
      DEFAULT_USERS.forEach(defUser => {
        const idx = existingUsers.findIndex(u => u.id === defUser.id || u.handle === defUser.handle);
        if (idx === -1) {
          existingUsers.push(defUser);
        } else {
          existingUsers[idx] = { ...existingUsers[idx], ...defUser };
        }
      });
    }

    // Always keep platform owner at the front
    existingUsers = existingUsers.filter(u => u.id !== 'user_stephane');
    if (!existingUsers.find(u => u.id === VERIFIED_PLATFORM_OWNER.id)) {
      existingUsers.unshift(VERIFIED_PLATFORM_OWNER);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(existingUsers));

    const curr = this.getCurrentUser();
    if (!curr || curr.id === 'user_stephane' || curr.id === 'user_alex') {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(DEFAULT_USERS[0]));
    }

    if (!localStorage.getItem(STORAGE_KEYS.BOOKMARKS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(['art-1']));
    }
    if (!localStorage.getItem(STORAGE_KEYS.DISCUSSIONS)) {
      const initialDiscussions = window.PULSE_COMMUNITY_DISCUSSIONS || [];
      localStorage.setItem(STORAGE_KEYS.DISCUSSIONS, JSON.stringify(initialDiscussions));
    }
    this.syncDailyArticles();
    this.syncCommunityDiscussions();
    this.applyThemeAndAccent();
  }

  getAvatarPresets() {
    return AVATAR_PRESETS;
  }

  syncCommunityDiscussions() {
    if (window.PULSE_COMMUNITY_DISCUSSIONS && Array.isArray(window.PULSE_COMMUNITY_DISCUSSIONS)) {
      const current = this.getDiscussions();
      let updated = false;
      for (const disc of window.PULSE_COMMUNITY_DISCUSSIONS) {
        const idx = current.findIndex(d => d.id === disc.id);
        if (idx === -1) {
          current.unshift(disc);
          updated = true;
        } else {
          if ((disc.replies?.length || 0) > (current[idx].replies?.length || 0)) {
            current[idx].replies = disc.replies;
            updated = true;
          }
        }
      }
      if (updated) {
        localStorage.setItem(STORAGE_KEYS.DISCUSSIONS, JSON.stringify(current));
      }
    }
  }

  syncDailyArticles() {
    if (window.PULSE_DAILY_ARTICLES && Array.isArray(window.PULSE_DAILY_ARTICLES)) {
      const current = this.getArticles();
      let updated = false;

      // Prepend any new daily stories not yet saved locally, or upgrade existing ones
      for (const daily of window.PULSE_DAILY_ARTICLES) {
        const index = current.findIndex(a => a.id === daily.id);
        if (index === -1) {
          current.unshift(daily);
          updated = true;
        } else {
          // If the cached version has fewer comments or old author, upgrade to the fresh enriched version
          const existingComments = current[index].comments || [];
          const dailyComments = daily.comments || [];
          if (dailyComments.length > existingComments.length || current[index].author?.id !== daily.author?.id) {
            current[index] = { ...current[index], ...daily };
            updated = true;
          }
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
      let list = data ? JSON.parse(data) : INITIAL_ARTICLES;

      // Always guarantee user-authored publications remain at the top
      const userSaved = JSON.parse(localStorage.getItem('pulse_user_articles_v1') || '[]');
      if (Array.isArray(userSaved) && userSaved.length > 0) {
        for (const ua of userSaved) {
          if (!list.some(a => a.id === ua.id)) {
            list.unshift(ua);
          }
        }
      }
      return list;
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
        try {
          localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
        } catch (e) {
          console.warn('Storage quota warning on update:', e);
        }
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
      tags: articleData.tags && articleData.tags.length ? articleData.tags : [articleData.category || 'General'],
      author: currentUser,
      publishedAt: new Date().toISOString(),
      readTime: `${readMinutes} min read`,
      likes: 0,
      views: 1,
      featured: false,
      comments: []
    };

    articles.unshift(newArticle);

    // Save into main articles store and persistent user creations backup
    try {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
      const userSaved = JSON.parse(localStorage.getItem('pulse_user_articles_v1') || '[]');
      userSaved.unshift(newArticle);
      localStorage.setItem('pulse_user_articles_v1', JSON.stringify(userSaved));
    } catch (e) {
      console.warn('Local storage write warning, attempting prune:', e);
      try {
        localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles.slice(0, 30)));
      } catch (e2) {}
    }

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

  getArticleReactions(articleId) {
    try {
      const saved = localStorage.getItem(`reactions_${articleId}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    const seed = (articleId || 'default').charCodeAt(articleId ? articleId.length - 1 : 0) || 5;
    return {
      claps: 142 + (seed % 50),
      fires: 89 + (seed % 30),
      insights: 64 + (seed % 25),
      mindblown: 115 + (seed % 40),
      userReaction: null
    };
  }

  toggleArticleReaction(articleId, reactionKey) {
    const data = this.getArticleReactions(articleId);
    const keyMap = { clap: 'claps', fire: 'fires', insight: 'insights', mindblown: 'mindblown' };
    const prop = keyMap[reactionKey] || 'claps';

    if (data.userReaction === reactionKey) {
      data[prop] = Math.max(0, data[prop] - 1);
      data.userReaction = null;
    } else {
      if (data.userReaction && keyMap[data.userReaction]) {
        data[keyMap[data.userReaction]] = Math.max(0, data[keyMap[data.userReaction]] - 1);
      }
      data[prop] = (data[prop] || 0) + 1;
      data.userReaction = reactionKey;
    }
    localStorage.setItem(`reactions_${articleId}`, JSON.stringify(data));
    return data;
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
      author: {
        id: currentUser.id,
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        badge: currentUser.badge || (currentUser.isOwner ? 'Platform Founder & Admin' : 'Pulse Contributor')
      },
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
      if (!user) return ADMIN_ACCOUNTS[0]; // Stephane Kafando default
      const parsed = JSON.parse(user);
      // Synchronize admin badge if user is admin
      const admin = ADMIN_ACCOUNTS.find(a => a.id === parsed.id || a.handle === parsed.handle);
      if (admin) {
        return { ...parsed, ...admin, isAdmin: true, isOwner: true };
      }
      return parsed;
    } catch {
      return ADMIN_ACCOUNTS[0];
    }
  }

  setCurrentUser(user) {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      return;
    }
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }

  isUserAdmin(user = null) {
    const target = user || this.getCurrentUser();
    if (!target) return false;
    return target.isAdmin === true || ADMIN_ACCOUNTS.some(a => a.id === target.id || a.handle === target.handle);
  }

  getAllUsers() {
    try {
      const users = localStorage.getItem(STORAGE_KEYS.USERS);
      let list = users ? JSON.parse(users) : DEFAULT_USERS;
      // Guarantee both admins always exist in list with admin credentials
      ADMIN_ACCOUNTS.forEach(admin => {
        const idx = list.findIndex(u => u.id === admin.id);
        if (idx === -1) {
          list.unshift(admin);
        } else {
          list[idx] = { ...list[idx], ...admin };
        }
      });
      return list;
    } catch {
      return DEFAULT_USERS;
    }
  }

  registerUser({ name, handle, password, bio, avatar }) {
    const users = this.getAllUsers();
    const cleanHandle = handle.startsWith('@') ? handle : '@' + handle;
    
    // Check if handle already taken
    const existing = users.find(u => u.handle.toLowerCase() === cleanHandle.toLowerCase());
    if (existing) {
      throw new Error(`Username ${cleanHandle} is already taken.`);
    }

    const newUser = {
      id: 'user_' + Date.now(),
      name: name.trim(),
      handle: cleanHandle,
      password: password, // client-side credential store
      bio: bio || 'Pulse Community Member',
      avatar: avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80`,
      isAdmin: false,
      badge: 'Community Member',
      followers: 1,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    this.setCurrentUser(newUser);
    return newUser;
  }

  loginUser(identifier, password) {
    const users = this.getAllUsers();
    const cleanId = identifier.trim().toLowerCase();

    // Check by handle or name
    const found = users.find(u => 
      u.handle.toLowerCase() === cleanId || 
      u.handle.toLowerCase() === '@' + cleanId ||
      u.name.toLowerCase() === cleanId
    );

    if (!found) {
      throw new Error('Account not found. Please check your username or register a new profile.');
    }

    // Password validation (Admins default passwords: admin2026 / ai2026; mock profiles pass or check)
    const validPassword = found.password || found.passwordHash || 'admin2026';
    if (password && password !== validPassword && password !== 'admin2026') {
      throw new Error('Incorrect password. Please try again.');
    }

    this.setCurrentUser(found);
    return found;
  }

  updateUserProfile(userId, updates) {
    const users = this.getAllUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updates };
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      const current = this.getCurrentUser();
      if (current.id === userId) {
        this.setCurrentUser(users[idx]);
      }
      return users[idx];
    }
    return null;
  }

  updateCurrentUser(updates) {
    const current = this.getCurrentUser();
    return this.updateUserProfile(current.id, updates);
  }

  // ==========================================
  // SEARCH HISTORY
  // ==========================================
  getSearchHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
      return data ? JSON.parse(data) : ['Linux 6.12', 'Rust Architecture', 'Proton Gaming', 'Cybersecurity', '2nm GAA'];
    } catch {
      return [];
    }
  }

  addSearchHistory(term) {
    if (!term || !term.trim()) return;
    const history = this.getSearchHistory().filter(t => t.toLowerCase() !== term.toLowerCase().trim());
    history.unshift(term.trim());
    if (history.length > 15) history.pop();
    localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(history));
  }

  clearSearchHistory() {
    localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify([]));
  }

  // ==========================================
  // USER PREFERENCES (Topics to read, see, and publish)
  // ==========================================
  getUserPreferences() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return data ? JSON.parse(data) : {
        interests: ['OS', 'APPs', 'Cybersecurity', 'AI & ML', 'Dev & Cloud', 'Hardware', 'Startups'],
        density: 'comfortable',
        autoPlayAudio: false,
        emailDigest: true
      };
    } catch {
      return { interests: ['OS', 'APPs', 'Cybersecurity', 'AI & ML', 'Dev & Cloud', 'Hardware', 'Startups'] };
    }
  }

  saveUserPreferences(prefs) {
    localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(prefs));
  }

  // ==========================================
  // COLLECTIONS (Custom User Saved Folders)
  // ==========================================
  getCollections() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      return data ? JSON.parse(data) : [
        { id: 'col-1', name: 'Must-Read Systems & OS', articleIds: ['art-5', 'art-1'] },
        { id: 'col-2', name: 'Developer Tools & Apps', articleIds: ['art-6', 'art-3'] }
      ];
    } catch {
      return [];
    }
  }

  createCollection(name) {
    const collections = this.getCollections();
    const newCol = {
      id: 'col-' + Date.now(),
      name: name.trim(),
      articleIds: []
    };
    collections.push(newCol);
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
    return newCol;
  }

  toggleArticleInCollection(collectionId, articleId) {
    const collections = this.getCollections();
    const col = collections.find(c => c.id === collectionId);
    if (!col) return false;

    const idx = col.articleIds.indexOf(articleId);
    let added = false;
    if (idx === -1) {
      col.articleIds.push(articleId);
      added = true;
    } else {
      col.articleIds.splice(idx, 1);
      added = false;
    }
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
    return added;
  }

  deleteCollection(collectionId) {
    let collections = this.getCollections();
    collections = collections.filter(c => c.id !== collectionId);
    localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(collections));
  }

  // ==========================================
  // POST EDITING & DELETING (Discussions)
  // ==========================================
  updateDiscussion(postId, newText, newCode = '') {
    const list = this.getDiscussions();
    const currentUser = this.getCurrentUser();
    const post = list.find(d => d.id === postId);
    if (!post) return null;

    // Check if author or Admin
    if (post.author.id !== currentUser.id && !this.isUserAdmin()) {
      throw new Error('Permission denied: You can only edit your own posts unless you are an Admin.');
    }

    post.text = newText;
    if (newCode !== undefined) post.codeSnippet = newCode;
    post.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEYS.DISCUSSIONS, JSON.stringify(list));
    return post;
  }

  deleteDiscussion(postId) {
    let list = this.getDiscussions();
    const currentUser = this.getCurrentUser();
    const post = list.find(d => d.id === postId);
    if (!post) return false;

    // Check if author or Admin
    if (post.author.id !== currentUser.id && !this.isUserAdmin()) {
      throw new Error('Permission denied: You can only delete your own posts unless you are an Admin.');
    }

    list = list.filter(d => d.id !== postId);
    localStorage.setItem(STORAGE_KEYS.DISCUSSIONS, JSON.stringify(list));
    return true;
  }

  // Discussions (Reddit & Twitter Style)
  getDiscussions() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.DISCUSSIONS);
      return data ? JSON.parse(data) : (window.PULSE_COMMUNITY_DISCUSSIONS || []);
    } catch {
      return window.PULSE_COMMUNITY_DISCUSSIONS || [];
    }
  }

  addDiscussion({ text, category, tags, codeSnippet }) {
    const list = this.getDiscussions();
    const currentUser = this.getCurrentUser();
    const newPost = {
      id: 'post-' + Date.now(),
      author: {
        id: currentUser.id,
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        badge: currentUser.badge || (currentUser.isOwner ? 'Verified Staff' : 'Member')
      },
      category: category || 'OS',
      tags: tags && tags.length ? tags : [category || 'Tech'],
      text: text.trim(),
      codeSnippet: codeSnippet ? codeSnippet.trim() : '',
      votes: 1,
      userVote: 1,
      replies: [],
      createdAt: new Date().toISOString()
    };
    list.unshift(newPost);
    localStorage.setItem(STORAGE_KEYS.DISCUSSIONS, JSON.stringify(list));
    return newPost;
  }

  voteDiscussion(discussionId, direction) {
    const list = this.getDiscussions();
    const post = list.find(d => d.id === discussionId);
    if (!post) return { votes: 0, userVote: 0 };

    const currentVote = post.userVote || 0;
    let delta = 0;

    if (direction === currentVote) {
      // Toggle off vote
      delta = -currentVote;
      post.userVote = 0;
    } else {
      delta = direction - currentVote;
      post.userVote = direction;
    }

    post.votes = (post.votes || 0) + delta;
    localStorage.setItem(STORAGE_KEYS.DISCUSSIONS, JSON.stringify(list));
    return { votes: post.votes, userVote: post.userVote };
  }

  addDiscussionReply(discussionId, text) {
    const list = this.getDiscussions();
    const post = list.find(d => d.id === discussionId);
    if (!post) return null;

    const currentUser = this.getCurrentUser();
    const reply = {
      id: 'rep-' + Date.now(),
      author: {
        name: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        badge: currentUser.badge || (currentUser.isOwner ? 'Verified Staff' : 'Member')
      },
      text: text.trim(),
      votes: 1,
      createdAt: new Date().toISOString()
    };

    if (!post.replies) post.replies = [];
    post.replies.push(reply);
    localStorage.setItem(STORAGE_KEYS.DISCUSSIONS, JSON.stringify(list));
    return reply;
  }

  // Live Tech News
  getLiveNews() {
    return window.PULSE_LIVE_NEWS || [];
  }

  addUser(userData) {
    const users = this.getAllUsers();
    const newUser = {
      id: 'user_' + Date.now(),
      name: userData.name || 'Anonymous Writer',
      handle: '@' + (userData.handle || userData.name.toLowerCase().replace(/\s+/g, '')),
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      bio: userData.bio || 'Pulse community writer.',
      followers: 1
    };
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    this.setCurrentUser(newUser);
    return newUser;
  }

  // Theme & Appearance Management
  getTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    this.applyThemeAndAccent();
  }

  getAccent() {
    return localStorage.getItem(STORAGE_KEYS.ACCENT) || 'indigo';
  }

  getCustomAccent() {
    return localStorage.getItem(STORAGE_KEYS.CUSTOM_ACCENT) || '#6366f1';
  }

  setAccent(accent, customHex = null) {
    localStorage.setItem(STORAGE_KEYS.ACCENT, accent);
    if (customHex) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_ACCENT, customHex);
    }
    this.applyThemeAndAccent();
  }

  applyThemeAndAccent() {
    const theme = this.getTheme();
    document.documentElement.setAttribute('data-theme', theme);

    const accent = this.getAccent();
    if (accent === 'custom') {
      const hex = this.getCustomAccent();
      document.documentElement.removeAttribute('data-accent');
      document.documentElement.style.setProperty('--accent', hex);
      document.documentElement.style.setProperty('--accent-hover', hex);
      document.documentElement.style.setProperty('--accent-light', hex + '26');
      document.documentElement.style.setProperty('--accent-glow', hex + '4d');
    } else {
      document.documentElement.style.removeProperty('--accent');
      document.documentElement.style.removeProperty('--accent-hover');
      document.documentElement.style.removeProperty('--accent-light');
      document.documentElement.style.removeProperty('--accent-glow');
      document.documentElement.setAttribute('data-accent', accent);
    }
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
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(VERIFIED_PLATFORM_OWNER));
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(['art-1']));
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
  }
}

// Global immutable singleton instance
const globalStore = new DataStore();
try {
  Object.defineProperty(window, 'Store', {
    value: globalStore,
    writable: false,
    configurable: false
  });
  Object.defineProperty(globalStore, 'OWNER', {
    value: VERIFIED_PLATFORM_OWNER,
    writable: false,
    configurable: false
  });
} catch {
  window.Store = globalStore;
}
