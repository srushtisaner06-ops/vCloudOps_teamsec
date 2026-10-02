import {
  Globe,
  DeviceMobile,
  Cloud,
  ShieldCheck,
  Brain,
  PaintBrush,
  CurrencyInr,
  GearSix,
} from '@phosphor-icons/react'

/* ══════════════════════════════════════════════════════════════════════════════
   Recruitment configuration — single source of truth for the Join Us portal.
   ──────────────────────────────────────────────────────────────────────────────
   Everything the organizers might want to change (deadline, domain copy,
   domain-specific questions, recruitment tasks) lives here as plain data so
   it can later be served from a backend/admin dashboard without touching
   the UI components.
══════════════════════════════════════════════════════════════════════════════ */

export const RECRUITMENT = {
  cycle: 'Recruitment 2026–27',
  year: 2026,
  emailDomain: '@vit.edu',
  // IST deadline. Once passed, every Apply CTA flips to "Applications Closed".
  deadline: '2026-10-20T23:59:59+05:30',
}

/* ── File upload rules ─────────────────────────────────────────────────────── */
export const FILE_RULES = {
  resume: { accept: ['.pdf'], maxMB: 5, label: 'PDF · max 5 MB' },
  document: { accept: ['.pdf', '.ppt', '.pptx'], maxMB: 10, label: 'PDF / PPT · max 10 MB' },
  media: {
    accept: ['.png', '.jpg', '.jpeg', '.webp', '.mp4', '.mov', '.pdf'],
    maxMB: 25,
    label: 'Image / Video / PDF · max 25 MB',
  },
}

/* ── Shared field library ──────────────────────────────────────────────────── */
// type: text | email | tel | url | select | textarea | chips | level | radio | file
// `url` fields may declare `host` to restrict which site the link points to.
const F = {
  github: (required) => ({
    id: 'github', type: 'url', label: 'GitHub', required,
    placeholder: 'https://github.com/username', host: 'github.com',
  }),
  linkedin: (required = false) => ({
    id: 'linkedin', type: 'url', label: 'LinkedIn', required,
    placeholder: 'https://linkedin.com/in/username', host: 'linkedin.com',
  }),
  portfolio: { id: 'portfolio', type: 'url', label: 'Portfolio website', placeholder: 'https://your-site.dev' },
  otherLinks: {
    id: 'otherLinks', type: 'textarea', label: 'Other relevant links', rows: 2,
    placeholder: 'Kaggle, LeetCode, blog, published apps… one per line',
  },
  resume: (required = false) => ({
    id: 'resume', type: 'file', label: 'Resume', required, rule: 'resume',
  }),
  level: {
    id: 'skillLevel', type: 'level', label: 'How would you rate yourself in this domain?', required: true,
  },
  experience: {
    id: 'experience', type: 'textarea', label: 'Previous experience', required: true, minLength: 30,
    placeholder: 'Courses, internships, club work, freelance — whatever got you here.',
  },
  projects: {
    id: 'projects', type: 'textarea', label: 'Relevant projects', required: true, minLength: 30,
    placeholder: 'Name, what it does, your role, tech used. Links welcome.',
  },
  certifications: {
    id: 'certifications', type: 'textarea', label: 'Certifications', rows: 2,
    placeholder: 'e.g. AWS Cloud Practitioner, Google UX Design…',
  },
  hackathons: {
    id: 'hackathons', type: 'textarea', label: 'Competitions / hackathons', rows: 2,
    placeholder: 'Event, team size, result.',
  },
  leadership: (required = false) => ({
    id: 'leadership', type: 'textarea', label: 'Leadership experience', required, minLength: required ? 30 : 0,
    rows: 3, placeholder: 'Teams you led, initiatives you owned, outcomes.',
  }),
}

/* ── Domains ───────────────────────────────────────────────────────────────── */
export const DOMAINS = [
  {
    id: 'web',
    code: 'WEB',
    name: 'Web Development',
    icon: Globe,
    level: 'Intermediate',
    tagline: 'Ship the club’s web presence and internal tools.',
    description:
      'Build fast, accessible interfaces and the APIs behind them — from this website to event portals and dashboards.',
    skills: ['React / Next.js', 'JavaScript / TypeScript', 'HTML / CSS', 'Backend fundamentals', 'Git & GitHub'],
    expectedWork: ['Club website & portals', 'Event registration systems', 'Internal dashboards'],
    questions: [
      F.level,
      { id: 'skills', type: 'chips', label: 'Technical skills', required: true,
        options: ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Tailwind', 'Node.js', 'Express', 'SQL', 'MongoDB', 'Git'] },
      F.experience, F.projects, F.github(true), F.linkedin(), F.portfolio, F.certifications, F.hackathons,
      F.leadership(), F.resume(), F.otherLinks,
    ],
    task: {
      title: 'Responsive landing page',
      brief:
        'Build a responsive landing page for a fictional student tech fest. It must work on mobile, tablet and desktop, include a hero, schedule section and registration CTA.',
      deliverables: ['GitHub repository', 'Live deployment', 'Short explanation'],
      fields: [
        { id: 'taskRepo', type: 'url', label: 'GitHub repository', required: true, host: 'github.com', placeholder: 'https://github.com/username/repo' },
        { id: 'taskLive', type: 'url', label: 'Live deployment', required: true, placeholder: 'https://your-project.vercel.app' },
        { id: 'taskNotes', type: 'textarea', label: 'Short explanation', required: true, minLength: 40, placeholder: 'Stack, design decisions, what you’d improve.' },
      ],
    },
  },
  {
    id: 'app',
    code: 'APP',
    name: 'App Development',
    icon: DeviceMobile,
    level: 'Intermediate',
    tagline: 'Put the club in everyone’s pocket.',
    description:
      'Design and ship cross-platform mobile apps — event check-ins, notifications and community features.',
    skills: ['Flutter / React Native / Android', 'Mobile UI/UX', 'APIs', 'Firebase / backend integration'],
    expectedWork: ['Club mobile app', 'Event check-in tooling', 'Push notification flows'],
    questions: [
      F.level,
      { id: 'skills', type: 'chips', label: 'Technical skills', required: true,
        options: ['Flutter', 'Dart', 'React Native', 'Kotlin', 'Java (Android)', 'Swift', 'Firebase', 'REST APIs', 'Mobile UI/UX'] },
      F.experience, F.projects, F.github(true), F.linkedin(), F.portfolio, F.certifications, F.hackathons,
      F.leadership(), F.resume(), F.otherLinks,
    ],
    task: {
      title: 'Mini mobile app',
      brief:
        'Build a small mobile app with 2–3 screens — e.g. an event list, event details and a registration screen — using any framework.',
      deliverables: ['GitHub repository', 'APK / TestFlight / build link', 'Demo video'],
      fields: [
        { id: 'taskRepo', type: 'url', label: 'GitHub repository', required: true, host: 'github.com', placeholder: 'https://github.com/username/repo' },
        { id: 'taskBuild', type: 'url', label: 'APK / TestFlight / build link', required: true, placeholder: 'https://drive.google.com/…' },
        { id: 'taskDemo', type: 'url', label: 'Demo video', required: true, placeholder: 'YouTube / Drive link' },
        { id: 'taskNotes', type: 'textarea', label: 'Notes (optional)', placeholder: 'Anything we should know before testing.' },
      ],
    },
  },
  {
    id: 'cloud',
    code: 'CLD',
    name: 'Cloud',
    icon: Cloud,
    level: 'Intermediate',
    tagline: 'Run the infrastructure everything else stands on.',
    description:
      'Provision, deploy and automate real workloads on AWS, Azure and GCP — with CI/CD and containers at the core.',
    skills: ['AWS / Azure / GCP', 'Linux', 'Docker', 'CI/CD', 'Cloud architecture'],
    expectedWork: ['Hosting club projects', 'CI/CD pipelines', 'Hands-on cloud labs'],
    questions: [
      F.level,
      { id: 'skills', type: 'chips', label: 'Technical skills', required: true,
        options: ['AWS', 'Azure', 'GCP', 'Linux', 'Bash', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Networking'] },
      F.experience, F.projects, F.github(true), F.linkedin(), F.certifications, F.hackathons,
      F.leadership(), F.resume(), F.otherLinks,
    ],
    task: {
      title: 'Deploy to the cloud',
      brief:
        'Deploy a simple web application on any cloud platform. Bonus points for containerising it and automating the deploy with CI/CD.',
      deliverables: ['GitHub repository', 'Deployment URL', 'Architecture diagram'],
      fields: [
        { id: 'taskRepo', type: 'url', label: 'GitHub repository', required: true, host: 'github.com', placeholder: 'https://github.com/username/repo' },
        { id: 'taskLive', type: 'url', label: 'Deployment URL', required: true, placeholder: 'https://…' },
        { id: 'taskDiagram', type: 'file', label: 'Architecture diagram', required: true, rule: 'media' },
        { id: 'taskNotes', type: 'textarea', label: 'Short explanation', placeholder: 'Services used, cost considerations, trade-offs.' },
      ],
    },
  },
  {
    id: 'security',
    code: 'SEC',
    name: 'Cloud Security',
    icon: ShieldCheck,
    level: 'Advanced',
    tagline: 'Break it on paper before anyone breaks it for real.',
    description:
      'Audit cloud setups, harden IAM, and teach the club to build secure-by-default infrastructure.',
    skills: ['Networking', 'Linux', 'Cybersecurity fundamentals', 'IAM', 'Cloud security concepts'],
    expectedWork: ['Security reviews of club infra', 'CTF & security workshops', 'Hardening guides'],
    questions: [
      F.level,
      { id: 'skills', type: 'chips', label: 'Technical skills', required: true,
        options: ['Networking', 'Linux', 'IAM', 'Wireshark', 'Burp Suite', 'Nmap', 'OWASP Top 10', 'CTFs', 'Cryptography'] },
      F.experience, F.projects, F.github(false), F.linkedin(), F.certifications, F.hackathons,
      F.leadership(), F.resume(), F.otherLinks,
    ],
    task: {
      title: 'Cloud infrastructure audit',
      brief:
        'Analyse a sample cloud architecture (public S3 bucket, over-permissive IAM role, open security group) and write up the risks with a fix for each.',
      deliverables: ['PDF report', 'GitHub repository (if applicable)'],
      fields: [
        { id: 'taskReport', type: 'file', label: 'Audit report', required: true, rule: 'document' },
        { id: 'taskRepo', type: 'url', label: 'GitHub repository (optional)', host: 'github.com', placeholder: 'https://github.com/username/repo' },
        { id: 'taskNotes', type: 'textarea', label: 'Key findings summary', required: true, minLength: 40, placeholder: 'Top 3 risks and how you’d fix them.' },
      ],
    },
  },
  {
    id: 'aiml',
    code: 'AIML',
    name: 'AI / ML',
    icon: Brain,
    level: 'Intermediate',
    tagline: 'Turn data into things that think.',
    description:
      'Train models, build LLM-powered tools and run ML workshops for the rest of the club.',
    skills: ['Python', 'Machine Learning', 'Data Science', 'LLMs / Generative AI', 'Basic mathematics / statistics'],
    expectedWork: ['ML & GenAI projects', 'Kaggle-style challenges', 'AI workshops'],
    questions: [
      F.level,
      { id: 'skills', type: 'chips', label: 'Technical skills', required: true,
        options: ['Python', 'NumPy', 'Pandas', 'scikit-learn', 'PyTorch', 'TensorFlow', 'LLMs / RAG', 'SQL', 'Statistics'] },
      F.experience, F.projects, F.github(true), F.linkedin(), F.certifications, F.hackathons,
      F.leadership(), F.resume(), F.otherLinks,
    ],
    task: {
      title: 'Solve an ML problem',
      brief:
        'Using any public tabular dataset (e.g. Titanic or House Prices), build a model end to end — EDA, features, training, evaluation.',
      deliverables: ['GitHub repository', 'Notebook', 'Explanation'],
      fields: [
        { id: 'taskRepo', type: 'url', label: 'GitHub repository', required: true, host: 'github.com', placeholder: 'https://github.com/username/repo' },
        { id: 'taskNotebook', type: 'url', label: 'Notebook link', required: true, placeholder: 'Colab / Kaggle / nbviewer link' },
        { id: 'taskNotes', type: 'textarea', label: 'Explanation', required: true, minLength: 40, placeholder: 'Approach, metrics, what you’d try next.' },
      ],
    },
  },
  {
    id: 'multimedia',
    code: 'MM',
    name: 'Multimedia',
    icon: PaintBrush,
    level: 'Beginner',
    tagline: 'Make people stop scrolling.',
    description:
      'Own the club’s visual identity — posters, reels, UI design, photography and event coverage.',
    skills: ['UI/UX', 'Graphic Design', 'Video Editing', 'Motion Graphics', 'Photography / Content Creation'],
    expectedWork: ['Event posters & reels', 'Social media content', 'UI design for club products'],
    questions: [
      F.level,
      { id: 'skills', type: 'chips', label: 'Tools you use', required: true,
        options: ['Figma', 'Photoshop', 'Illustrator', 'Canva', 'Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Blender', 'Lightroom'] },
      { id: 'experience', type: 'textarea', label: 'Previous creative experience', required: true, minLength: 30,
        placeholder: 'Pages you’ve designed for, events you covered, freelance work…' },
      { id: 'projects', type: 'textarea', label: 'Featured work', required: true, minLength: 30,
        placeholder: 'Your 2–3 best pieces and the story behind them.' },
      { id: 'behance', type: 'url', label: 'Behance', host: 'behance.net', placeholder: 'https://behance.net/username' },
      { id: 'dribbble', type: 'url', label: 'Dribbble', host: 'dribbble.com', placeholder: 'https://dribbble.com/username' },
      { id: 'drivePortfolio', type: 'url', label: 'Drive portfolio', placeholder: 'https://drive.google.com/…' },
      { id: 'instagram', type: 'url', label: 'Instagram portfolio', host: 'instagram.com', placeholder: 'https://instagram.com/username' },
      { id: 'portfolioFile', type: 'file', label: 'Portfolio upload (optional)', rule: 'media' },
    ],
    task: {
      title: 'Promote the club',
      brief:
        'Create a promotional poster, reel or short video announcing vCloudOps Recruitment 2026–27. Keep it on-brand: dark space theme, electric blue accents.',
      deliverables: ['Drive / portfolio link', 'Uploaded media'],
      fields: [
        { id: 'taskLink', type: 'url', label: 'Drive / portfolio link', required: true, placeholder: 'https://drive.google.com/…' },
        { id: 'taskMedia', type: 'file', label: 'Upload your piece (optional)', rule: 'media' },
        { id: 'taskNotes', type: 'textarea', label: 'Creative rationale', required: true, minLength: 40, placeholder: 'Concept, tools, what you were going for.' },
      ],
    },
  },
  {
    id: 'finance',
    code: 'FIN',
    name: 'Finance & Sponsorship',
    icon: CurrencyInr,
    level: 'Beginner',
    tagline: 'Fuel every event the club runs.',
    description:
      'Pitch to sponsors, manage budgets and keep the club’s events funded and financially healthy.',
    skills: ['Sponsorship outreach', 'Budgeting', 'Financial planning', 'Communication', 'Proposal preparation'],
    expectedWork: ['Sponsor outreach & pitching', 'Event budgets', 'Partnership proposals'],
    questions: [
      { id: 'sponsorshipExp', type: 'textarea', label: 'Previous sponsorship experience', required: true, minLength: 30,
        placeholder: 'Sponsors you’ve approached or closed, amounts, what worked. “None yet” is fine — tell us how you’d start.' },
      { id: 'communicationExp', type: 'textarea', label: 'Communication experience', required: true, minLength: 30,
        placeholder: 'Public speaking, cold emailing, negotiating, writing.' },
      { id: 'eventExp', type: 'textarea', label: 'Event experience', rows: 3,
        placeholder: 'Events you’ve helped fund, plan or run.' },
      F.linkedin(), F.resume(),
    ],
    task: {
      title: 'Sponsorship proposal',
      brief:
        'Create a sponsorship proposal for a hypothetical 300-person cloud hackathon: tiers, deliverables for sponsors, and a budget breakdown.',
      deliverables: ['PDF', 'Presentation / proposal'],
      fields: [
        { id: 'taskProposal', type: 'file', label: 'Proposal (PDF / PPT)', required: true, rule: 'document' },
        { id: 'taskLink', type: 'url', label: 'Presentation link (optional)', placeholder: 'Canva / Slides link' },
        { id: 'taskNotes', type: 'textarea', label: 'Pitch in 3 lines', required: true, minLength: 40, placeholder: 'Why would a sponsor say yes?' },
      ],
    },
  },
  {
    id: 'operations',
    code: 'OPS',
    name: 'Operations',
    icon: GearSix,
    level: 'Beginner',
    tagline: 'Make every event run like clockwork.',
    description:
      'Plan and execute events end to end — logistics, coordination, documentation and on-ground management.',
    skills: ['Event management', 'Team coordination', 'Documentation', 'Communication', 'Planning & execution'],
    expectedWork: ['Workshop & hackathon logistics', 'Volunteer coordination', 'Event documentation'],
    questions: [
      F.leadership(true),
      { id: 'eventMgmtExp', type: 'textarea', label: 'Event management experience', required: true, minLength: 30,
        placeholder: 'Events you’ve organised, your role, scale.' },
      { id: 'coordinationExp', type: 'textarea', label: 'Coordination experience', required: true, minLength: 30,
        placeholder: 'A time you kept multiple people or teams aligned.' },
      F.linkedin(), F.resume(),
    ],
    task: {
      title: 'Event execution plan',
      brief:
        'Design an execution plan for a college-level technical event of ~200 attendees: timeline, team roles, resources and a contingency plan.',
      deliverables: ['PDF', 'Timeline', 'Resource plan'],
      fields: [
        { id: 'taskPlan', type: 'file', label: 'Execution plan (PDF)', required: true, rule: 'document' },
        { id: 'taskTimeline', type: 'textarea', label: 'Timeline summary', required: true, minLength: 40, placeholder: 'T-30 days → event day → wrap-up.' },
        { id: 'taskResources', type: 'textarea', label: 'Resource plan', required: true, minLength: 40, placeholder: 'People, venue, budget, equipment.' },
      ],
    },
  },
]

export const getDomain = (id) => DOMAINS.find((d) => d.id === id) || null

/* ── Static form phases ────────────────────────────────────────────────────── */
const BRANCHES = [
  'Computer Engineering',
  'Information Technology',
  'Artificial Intelligence & Data Science',
  'Artificial Intelligence & Machine Learning',
  'Computer Science & Engineering (AI)',
  'Computer Science & Engineering (Data Science)',
  'Computer Science & Engineering (IoT)',
  'Electronics & Telecommunication',
  'Electronics & Computer Engineering',
  'Instrumentation Engineering',
  'Mechanical Engineering',
  'Chemical Engineering',
  'Other',
]

const YEARS = ['First Year', 'Second Year', 'Third Year', 'Final Year']

export const PERSONAL_FIELDS = [
  { id: 'fullName', type: 'text', label: 'Full name', required: true, placeholder: 'Aarav Patil', autoComplete: 'name' },
  { id: 'email', type: 'email', label: 'VIT email ID', required: true, placeholder: 'name.prn@vit.edu', autoComplete: 'email' },
  { id: 'phone', type: 'tel', label: 'Phone number', required: true, placeholder: '98765 43210', autoComplete: 'tel' },
  { id: 'prn', type: 'text', label: 'PRN / Student ID', required: true, placeholder: '12XXXXXX', pattern: /^[A-Za-z0-9]{6,14}$/, patternMessage: 'Enter a valid PRN (6–14 letters/digits).' },
  { id: 'branch', type: 'select', label: 'Branch', required: true, options: BRANCHES },
  { id: 'year', type: 'select', label: 'Year', required: true, options: YEARS },
  { id: 'division', type: 'text', label: 'Division', required: true, placeholder: 'e.g. CS-A' },
]

const HOURS_OPTIONS = ['2–4 hours', '4–6 hours', '6–10 hours', '10+ hours']

export const MOTIVATION_FIELDS = [
  { id: 'whyJoin', type: 'textarea', label: 'Why do you want to join vCloudOps?', required: true, minLength: 60, maxLength: 800 },
  { id: 'contribute', type: 'textarea', label: 'What can you contribute to the team?', required: true, minLength: 60, maxLength: 800 },
  { id: 'proudOf', type: 'textarea', label: 'Tell us about something you built, organised, or achieved that you’re proud of.', required: true, minLength: 60, maxLength: 1000 },
  { id: 'hours', type: 'radio', label: 'How many hours per week can you realistically contribute?', required: true, options: HOURS_OPTIONS },
  { id: 'learnGoal', type: 'textarea', label: 'What do you want to learn this year?', required: true, minLength: 20, maxLength: 600, rows: 3 },
]

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced']

/* ── Journey & post-submission timeline ────────────────────────────────────── */
export const STEPS = [
  { id: 'personal', label: 'Personal' },
  { id: 'domain', label: 'Domain' },
  { id: 'task', label: 'Task' },
  { id: 'motivation', label: 'Motivation' },
  { id: 'review', label: 'Review' },
]

export const JOURNEY = [
  { id: 'discover', label: 'Discover', hint: 'You found us. Explore the domains and what each team does.' },
  { id: 'choose', label: 'Choose Domain', hint: 'Pick a primary domain (and optionally a secondary one).' },
  { id: 'apply', label: 'Apply', hint: 'Tell us about yourself, your skills and why you want in.' },
  { id: 'task', label: 'Complete Task', hint: 'A small domain-specific task — show us how you work.' },
  { id: 'shortlist', label: 'Shortlisting', hint: 'Core members review every application and task.' },
  { id: 'interaction', label: 'Interaction', hint: 'A friendly conversation with the domain leads.' },
  { id: 'join', label: 'Join the Club', hint: 'Onboarding, Discord roles, and your first sprint.' },
]

export const TIMELINE_STAGES = [
  { id: 'submitted', title: 'Application Submitted', note: 'We’ve received your application.' },
  { id: 'shortlisting', title: 'Application Shortlisting', note: 'Our team is currently reviewing applications.' },
  { id: 'evaluation', title: 'Task Evaluation', note: 'Domain leads evaluate your task submission.' },
  { id: 'interview', title: 'Interview / Interaction', note: 'Shortlisted candidates will receive further instructions.' },
  { id: 'selection', title: 'Final Selection', note: 'Results are shared over email and on this dashboard.' },
  { id: 'welcome', title: 'Welcome to the Club', note: 'Onboarding, Discord access and your first sprint.' },
]

// How far along the timeline each backend status is: index of the stage
// currently "in progress" (stages before it are complete).
export const STATUS_STAGE = {
  SUBMITTED: 1,
  UNDER_REVIEW: 1,
  SHORTLISTED: 2,
  TASK_ASSIGNED: 2,
  TASK_SUBMITTED: 2,
  INTERVIEW_SCHEDULED: 3,
  SELECTED: 6,
  NOT_SELECTED: 4,
}
