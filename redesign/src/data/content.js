/* Single source of truth for every fact on the page.
   Content carried over from the original build. */

export const profile = {
  name: 'Ifthekhar Enad Mahamood',
  role: 'Product Manager',
  handle: 'ifthekhar.dev',
  email: 'enadmahamood123@gmail.com',
  linkedin: 'https://linkedin.com/in/ifthekharenadmahamood',
  resume: '/resume.pdf',
  resumeFileName: 'Ifthekhar_Enad_Mahamood_Resume.pdf',
  location: 'Beaumont, Texas · USA',
  available: 'Open to product roles',
  statement:
    'I run discovery, prioritisation and delivery on consumer apps and internal platforms — then judge the work by what it moved, not by what it shipped.',
};

export const marquee = [
  '5M+ downloads',
  '20M+ studio portfolio',
  '40% lower onboarding cost',
  '3× driver engagement',
  '21% retention lift',
  '60% operational efficiency',
  '4.00 GPA',
];

export const metrics = [
  { value: '5M+', label: 'Downloads', context: 'Time Warp Scan' },
  { value: '20M+', label: 'Portfolio downloads', context: 'Kite Games Studio' },
  { value: '50K+', label: 'Downloads', context: 'Beauty Editor' },
  { value: '40%', label: 'Onboarding cost cut', context: 'Shuttle Partner App' },
  { value: '3×', label: 'Engagement growth', context: 'Driver platform' },
  { value: '21%', label: 'Retention lift', context: 'Beauty Editor revamp' },
  { value: '60%', label: 'Operational efficiency', context: 'Partner ERP' },
  { value: '4.00', label: 'GPA', context: 'Lamar University' },
];

export const work = [
  {
    id: '01',
    title: 'Time Warp Scan',
    org: 'Kite Games Studio',
    kind: 'Viral consumer photography app',
    headline: '5M+',
    headlineLabel: 'downloads',
    summary:
      'Owned a viral photo app through its growth curve — 4.0 rating across 23,600+ reviews, distribution driven by short-form video.',
    facts: [
      ['Rating', '4.0 / 5'],
      ['Reviews', '23,600+'],
      ['Channels', 'TikTok · Instagram · Shorts'],
    ],
    tags: ['Consumer app', 'Viral growth', 'Creator economy'],
    href: 'https://play.google.com/store/apps/details?id=com.kgs.timewarpscan&hl=en_US',
  },
  {
    id: '02',
    title: 'Beauty Editor',
    org: 'Kite Games Studio',
    kind: 'Photo editing · iOS & Android',
    headline: '+21%',
    headlineLabel: 'retention',
    summary:
      'Led a full-cycle revamp: redefined onboarding and re-prioritised the feature set, lifting retention, engagement and installs together.',
    facts: [
      ['Retention', '+21%'],
      ['Engagement', '+24%'],
      ['Downloads', '+23% (50K+ total)'],
    ],
    tags: ['ASO strategy', 'Agile', 'Jira'],
    href: 'https://play.google.com/store/apps/details?id=com.app.beautyeditor',
  },
  {
    id: '03',
    title: 'Shuttle Partner App',
    org: 'Shuttle Technologies BD',
    kind: 'Ride-sharing driver platform',
    headline: '−40%',
    headlineLabel: 'onboarding cost',
    summary:
      'Built the driver-side MVP and the earnings flow behind it — cheaper onboarding, faster payouts, and materially higher engagement.',
    facts: [
      ['Onboarding cost', '−40%'],
      ['Engagement', '3× baseline'],
      ['Payment speed', '−50% time'],
    ],
    tags: ['Product ownership', 'MVP development'],
    href: 'https://play.google.com/store/apps/details?id=com.easytransport.shuttle.driver&hl=en&gl=US',
  },
  {
    id: '04',
    title: 'Smart Shelf',
    org: 'Fashol Dotcom Limited',
    kind: 'AI hardware + software',
    headline: '5',
    headlineLabel: 'person team led',
    summary:
      'Directed an AI-driven automated vegetable shelf from prototype to market launch, aligning hardware and software with investor objectives.',
    facts: [
      ['Stage', 'Pilot → launch'],
      ['Team', '5 cross-functional'],
      ['Stakeholders', 'Singapore-based investors'],
    ],
    tags: ['B2C launch', 'Hardware-software integration'],
    href: null,
  },
];

export const experience = [
  {
    period: 'Apr 2024 — Dec 2024',
    company: 'Kite Games Studio',
    role: 'Product Manager',
    note: 'Studio portfolio: 20M+ downloads',
    bullets: [
      'Managed two live apps — Time Warp Scan (5M+ downloads, 4.0 rating, 23,600+ reviews) and Beauty Editor (50K+ downloads, 4.6+ rating) — contributing to the studio’s 20M+ download milestone.',
      'Led full-cycle revamp of Beauty Editor — 21% retention improvement, 24% engagement uplift, 23% download growth — via redefined onboarding and feature prioritization.',
      'Drove 10% customer acquisition growth across USA, UK, and Japan through data-driven ASO strategy and market research.',
      'Coordinated cross-functional delivery across 10+ engineers, QA, and marketing using Agile sprints in Jira.',
    ],
  },
  {
    period: 'Oct 2023 — Feb 2024',
    company: 'Fashol Dotcom Limited',
    role: 'Product Manager',
    note: null,
    bullets: [
      'Directed development of Smart Shelf — an AI-driven automated vegetable shelf merging hardware and software for a seamless user experience.',
      'Led a 5-member cross-functional team through pilot phase and market launch strategy, resolving technical challenges during prototype refinement.',
      'Collaborated with Singapore-based investors to align technical and business objectives, emphasizing inventory systems and IT efficiency.',
    ],
  },
  {
    period: 'Jun 2021 — Sep 2023',
    company: 'Shuttle Technologies BD',
    role: 'Product Specialist',
    note: null,
    bullets: [
      'Built Partner App MVP — reduced onboarding costs by 40%, achieved 3× engagement growth, and improved driver satisfaction scores.',
      'Shipped Driver’s Earnings feature — 50% faster payment processing; implemented OnDemand ride requests, cutting backup failure rates by 5%.',
      'Designed Partner ERP system — 60% operational efficiency gain, 50% manual workload reduction, real-time vehicle request automation.',
    ],
  },
];

export const capabilities = [
  {
    group: 'Practice',
    items: [
      'Scrum',
      'Kanban',
      'Sprint planning',
      'PRD writing',
      'User story writing',
      'A/B testing',
      'ASO',
      'Go-to-market',
    ],
  },
  {
    group: 'Tooling',
    items: ['Jira', 'Figma', 'Confluence', 'ClickUp', 'Postman', 'Canva'],
  },
  {
    group: 'Technical',
    items: [
      'SQL',
      'Python',
      'Excel',
      'Power BI',
      'Tableau',
      'SAP NetWeaver',
      'Salesforce',
      'Data analytics',
    ],
  },
];

export const education = {
  school: 'Lamar University',
  location: 'Beaumont, Texas · USA',
  gpa: '4.00',
};

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Contact', href: '#contact' },
];
