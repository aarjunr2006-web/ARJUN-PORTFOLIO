// Portfolio data — Arjun Rathore (Matching 3D Red Design & Structure from reference video)

export const personal = {
  name: 'Arjun Rathore',
  role: 'Full-Stack Developer & UI/UX Designer',
  tagline: 'I build fast, scalable applications using React, Node.js, Python, MERN Stack, and FastAPI.',
  location: 'Jodhpur, Rajasthan, India',
  email: 'aarjunr2006@gmail.com',
  phone: '+91 8005593151',
  whatsapp: 'https://wa.me/918005593151',
  github: 'https://github.com/aarjunr2006-web',
  linkedin: 'https://www.linkedin.com/in/arjun-rathore-50723038b',
  instagram: 'https://www.instagram.com/_arjun_rathore0',
  bio: [
    "Hi, my name is Arjun Rathore, an aspiring software engineer based in Jodhpur, India, dedicated to crafting clean, functional, and highly scalable full-stack applications.",
    "B.Tech Computer Science student at Lachoo Memorial College of Science & Technology (Class of 2029). I combine technical rigor with creative media skills to deliver memorable user experiences.",
  ],
  stats: [
    { value: 5, label: 'Platforms Shipped', suffix: '+' },
    { value: 2, label: 'Years Building', suffix: '+' },
    { value: 3, label: 'Campus Apps Live', suffix: '' },
  ],
};

export const skills = [
  'REACT 18', 'TYPESCRIPT', 'NODE.JS', 'PYTHON', 'TAILWIND CSS', 'FASTAPI',
  'MONGODB', 'NEXT.JS', 'PRISMA', 'HTML5/CSS3', 'FRAMER MOTION', 'TURBOREPO',
  'VITE', 'POSTGRESQL', 'RAZORPAY', 'WHATSAPP API', 'MERN STACK',
];

export const skillsCategories = [
  {
    title: 'PROGRAMMING LANGUAGES',
    skills: ['JavaScript', 'TypeScript', 'Python', 'C', 'C++'],
  },
  {
    title: 'FULL STACK',
    skills: ['React 18', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'MERN Stack'],
  },
  {
    title: 'BACKEND',
    skills: ['Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'JWT Auth'],
  },
  {
    title: 'DATABASES',
    skills: ['MongoDB', 'PostgreSQL', 'Prisma ORM', 'Mongoose'],
  },
  {
    title: 'TOOLS & AUTOMATION',
    skills: ['Git & GitHub', 'VS Code', 'Vite', 'Turborepo', 'Vercel', 'WhatsApp Cloud API'],
  },
  {
    title: 'COMPUTER SCIENCE CONCEPTS',
    skills: ['Data Structures', 'Algorithms', 'DBMS', 'OOP', 'Software Engineering'],
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Research',
    description: 'Understanding requirements, user goals, and target architecture to create a rock-solid tech blueprint.',
  },
  {
    number: '02',
    title: 'Design',
    description: 'Crafting clean UX flows, intuitive component architectures, and responsive interfaces with modern aesthetics.',
  },
  {
    number: '03',
    title: 'Develop',
    description: 'Writing scalable frontends and robust API backends, enforcing clean code standards and type safety.',
  },
  {
    number: '04',
    title: 'Deploy',
    description: 'Optimizing performance, configuring CI/CD pipelines, and deploying to cloud infrastructure with ongoing support.',
  },
];

export const projects = [
  {
    id: 'aura',
    title: 'AURA — AI Chat Web App',
    subtitle: 'Streaming AI Chat Platform',
    description: 'An AI chat web app powered by Anthropic Claude API with streaming responses, voice input, inline image generation, and glassmorphic space dark UI.',
    tags: ['Anthropic Claude', 'Node.js', 'Vanilla JS', 'Streaming API', 'Voice Input'],
    image: '/assets/project-aura.png',
    link: null,
    github: 'https://github.com/aarjunr2006-web',
  },
  {
    id: 'thikana',
    title: 'Thikana',
    subtitle: 'LMC Campus Utility & Directory Portal',
    description: 'Student utility directory for Jodhpur featuring hostel/PG listings, local food services, and campus resources with Jodhpur-indigo identity.',
    tags: ['React', 'Node.js', 'MongoDB', 'Vercel'],
    image: '/assets/project-thikana.png',
    link: 'https://thikana-three.vercel.app',
    github: 'https://github.com/aarjunr2006-web',
  },
  {
    id: 'krishna',
    title: 'Krishna Jewellers',
    subtitle: 'Luxury E-Commerce Storefront',
    description: 'Luxury jewelry e-commerce built with React 18 + TypeScript + Vite + Tailwind. Features textured still-life luxury aesthetic and product showcase.',
    tags: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS'],
    image: '/assets/project-krishna.png',
    link: 'https://krishna-jewels.vercel.app/',
    github: 'https://github.com/aarjunr2006-web',
  },
  {
    id: 'mithaihub',
    title: 'MithaiHub',
    subtitle: 'Multi-Tenant Sweet-Shop Platform',
    description: 'Multi-tenant sweet-shop management SaaS with customer, owner, and worker POS interfaces, built in a Turborepo monorepo with Prisma & Razorpay.',
    tags: ['Turborepo', 'Next.js', 'Prisma', 'Razorpay', 'WhatsApp API'],
    image: '/assets/project-mithaihub.png',
    link: null,
    github: 'https://github.com/aarjunr2006-web',
  },
  {
    id: 'signalgrid',
    title: 'Signal Grid',
    subtitle: 'Smart Attendance Verification System',
    description: 'Dual-layer attendance system combining GPS geofencing with dynamic rotating QR codes, FastAPI backend, and dark operator dashboard UI.',
    tags: ['FastAPI', 'Python', 'Geofencing', 'QR Auth', 'JWT'],
    image: '/assets/project-signalgrid.png',
    link: null,
    github: 'https://github.com/aarjunr2006-web',
  },
];

export const creativeEdits = [
  {
    title: 'Cinematic Reels',
    description: 'Fast-paced videos with high-impact color grading, smooth sound design, and custom visual transitions.',
    category: 'REELS / VIDEO',
  },
  {
    title: 'Travel & Campus Stories',
    description: 'Immersive visual stories capturing regional landscapes, student vibes, and event highlights.',
    category: 'REGIONAL & TRAVEL',
  },
  {
    title: 'Educational Tech Edits',
    description: 'Short-form visual explainers designed to simplify complex web dev and coding concepts for social media.',
    category: 'TECH CONTENT',
  },
  {
    title: 'Brand Visual Assets',
    description: 'Custom social graphics, banner layouts, and motion overlays built for client growth campaigns.',
    category: 'BRANDING',
  },
];

export const journey = [
  {
    date: '2025 – 2029',
    title: 'B.Tech in Computer Science',
    place: 'Lachoo Memorial College of Science and Technology, Jodhpur',
    description: 'Core studies: Data Structures, Algorithms, Software Engineering, OOP, Database Architectures.',
    type: 'education',
  },
  {
    date: '2024 – Present',
    title: 'Full-Stack Developer & UI/UX Designer',
    place: 'Independent / Freelance Projects',
    description: 'Shipped Krishna Jewellers, Thikana, MithaiHub, Signal Grid, and AURA AI chat web apps.',
    type: 'work',
  },
  {
    date: '2024 – Present',
    title: 'Creative Media & Reel Edits',
    place: 'Freelance Clients',
    description: 'Editing cinematic reels, travel stories, tech explainers, and brand overlays.',
    type: 'design',
  },
];

export const softSkills = [
  {
    title: 'LEADERSHIP',
    desc: 'Guiding developer teams, setting project goals, and driving projects to completion.',
  },
  {
    title: 'PUBLIC SPEAKING',
    desc: 'Presenting technical demos, pitching ideas, and conducting project presentations.',
  },
  {
    title: 'TEAM COLLABORATION',
    desc: 'Working seamlessly with designers, developers, and project stakeholders.',
  },
  {
    title: 'COMMUNICATION',
    desc: 'Clear, concise, and friendly updates keeping everyone aligned at every stage.',
  },
  {
    title: 'PROBLEM SOLVING',
    desc: 'Breaking down complex algorithmic challenges into clean, modular solutions.',
  },
  {
    title: 'ADAPTABILITY',
    desc: 'Quick to learn new frameworks, tools, and tech stacks as project needs evolve.',
  },
  {
    title: 'CREATIVITY',
    desc: 'Blending logical engineering with eye-catching visual aesthetics and motion.',
  },
  {
    title: 'TIME MANAGEMENT',
    desc: 'Adhering strictly to project milestones, sprint schedules, and delivery deadlines.',
  },
];
