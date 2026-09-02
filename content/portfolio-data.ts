export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  gradient: string;
  textColor: string;
  tags: string[];
  liveUrl: string;
  githubUrl?: string;
  mockupType: "agency" | "ai-app" | "saas" | "dashboard";
  metrics?: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  skills: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Surbhi",
    fullName: "Surbhi Kukreti",
    role: "Frontend Developer",
    subtitle: "Frontend Engineer with 3+ years of experience building production-grade web applications",
    location: "Bangalore, India",
    timeline: "ENGINEERING SINCE 2021",
    copyrightYear: "2026",
    availability: "Available for select Senior Frontend & Full-Stack roles",
    bioGreeting: "Hey!",
    bioLead: "I'm Surbhi Kukreti, a Frontend Developer based in Bangalore, India, with 3 years of experience building production-grade web applications.",
    bioParagraph1:
      "I specialize in owning frontend architecture end-to-end—translating complex product requirements into pixel-perfect, accessible, and high-performance user interfaces using React, Next.js, TypeScript, and Tailwind CSS.",
    bioParagraph2:
      "Having shipped core features at companies like Almabase and Dukaan, I bring a strong focus on performance optimization, optimistic UI updates, accessibility compliance (WCAG), and seamless frontend-backend API integration.",
    manifesto: {
      lead: "Building production-grade web applications",
      sub: "driven by performance, accessibility compliance, structured frontend architecture, and intentional user-centric design.",
    },
    email: "surbhikukreti899@gmail.com",
    github: "https://github.com/surbhi84",
    linkedin: "https://www.linkedin.com/in/surbhi-kukreti-a91b0b163",
    resumeUrl: "https://github.com/surbhi84",
  },

  navigation: [
    { label: "Home", href: "#hero" },
    { label: "About Me", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Works", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],

  projects: [
    {
      id: "social-app",
      title: "Social",
      category: "Feature-Rich Social Platform",
      description:
        "High-performance social networking web app featuring instant post creation, rich commenting, likes, optimistic UI updates, debounced fuzzy search, and lazy loading for smooth user engagement.",
      gradient: "from-amber-600 via-orange-600 to-rose-700",
      textColor: "text-amber-950",
      tags: ["React", "Redux Toolkit", "Tailwind CSS", "MirageJS", "Optimistic UI"],
      liveUrl: "https://github.com/surbhi84/socialMedia01",
      githubUrl: "https://github.com/surbhi84/socialMedia01",
      mockupType: "agency",
      metrics: "Optimistic UI & Fuzzy Search",
    },
    {
      id: "almabase-portal",
      title: "Almabase Web Platform",
      category: "Enterprise Educational SaaS",
      description:
        "Production-grade educational SaaS platform feature suite. Owned frontend features end-to-end, introduced accessibility compliance standards, and integrated robust backend APIs.",
      gradient: "from-purple-900 via-indigo-800 to-slate-900",
      textColor: "text-purple-100",
      tags: ["React", "TypeScript", "Accessibility (a11y)", "REST APIs", "CI/CD Pipeline"],
      liveUrl: "https://github.com/surbhi84",
      githubUrl: "https://github.com/surbhi84",
      mockupType: "saas",
      metrics: "Production Enterprise Platform",
    },
    {
      id: "hallodecor",
      title: "HalloDecor",
      category: "E-Commerce Shopping Suite",
      description:
        "Modern React-based e-commerce platform with protected user routes, multi-criteria product filtering, cart & wishlist management, and debounced product discovery.",
      gradient: "from-rose-500 via-pink-600 to-amber-500",
      textColor: "text-rose-950",
      tags: ["React", "React Context API", "useReducer", "CSS Modules", "HalloUI"],
      liveUrl: "https://github.com/surbhi84/HalloDecor-mockbee",
      githubUrl: "https://github.com/surbhi84/HalloDecor-mockbee",
      mockupType: "ai-app",
      metrics: "Cart & Wishlist Engine",
    },
    {
      id: "tapes-library",
      title: "Tapes",
      category: "Video Streaming & Discovery Hub",
      description:
        "Responsive video library application with playlist customization, persistent authentication, watch history tracking, queues, and predictable state management.",
      gradient: "from-blue-600 via-sky-500 to-indigo-800",
      textColor: "text-blue-950",
      tags: ["React", "Context API", "Custom Hooks", "Tailwind CSS", "REST API"],
      liveUrl: "https://github.com/surbhi84/TapesVideoLibrary",
      githubUrl: "https://github.com/surbhi84/TapesVideoLibrary",
      mockupType: "dashboard",
      metrics: "Video Queue & Authentication",
    },
  ] as Project[],

  services: [
    {
      id: "frontend-arch",
      number: "01",
      title: "Frontend Web Architecture",
      description:
        "Building modular, scalable web applications with React, Next.js, and TypeScript. Experienced in owning features end-to-end from design to production.",
      skills: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Component Architecture"],
    },
    {
      id: "state-data",
      number: "02",
      title: "State Management & Data Flow",
      description:
        "Architecting predictable data flows, optimistic UI updates, debounced search, and complex client state using Redux Toolkit, Context API, and useReducer.",
      skills: ["Redux Toolkit", "React Context API", "Optimistic UI", "REST API Integration", "Custom Hooks"],
    },
    {
      id: "ui-perf",
      number: "03",
      title: "UI Engineering & Accessibility",
      description:
        "Creating pixel-perfect, responsive interfaces with strict WCAG accessibility compliance, cross-browser compatibility, and smooth micro-interactions.",
      skills: ["Tailwind CSS", "Accessibility (a11y)", "Material UI", "Ant Design", "SCSS / CSS Modules"],
    },
    {
      id: "fullstack-collab",
      number: "04",
      title: "Full-Stack Integration & Quality",
      description:
        "Contributing backend API services in Python/Node, monitoring CI/CD pipeline build statuses, and collaborating closely with design & product teams.",
      skills: ["Python", "Git / GitHub / Bitbucket", "CI/CD Monitoring", "Mockbee / MirageJS", "Backend APIs"],
    },
  ] as Service[],

  experience: [
    {
      role: "Frontend Developer",
      company: "Almabase",
      period: "Feb 2024 – Present",
      location: "Bangalore, India",
      bullets: [
        "Owned frontend development end-to-end with direct contributions to product design and backend implementation.",
        "Designed and implemented pixel-perfect, responsive UIs with accessibility improvements aligned with certification requirements.",
        "Built and integrated backend APIs and services alongside frontend features, ensuring data integrity and performance.",
        "Monitored build statuses within the pipeline to ensure stable releases across development stages.",
      ],
    },
    {
      role: "Frontend Engineer (Intern -> Full-time)",
      company: "Dukaan",
      period: "Nov 2022 – July 2023",
      location: "Bangalore, India",
      bullets: [
        "Developed modular, reusable front-end components using React following established coding best practices.",
        "Built pixel-perfect, responsive user interfaces focused on clean UI/UX and cross-browser compatibility.",
        "Implemented state management and API integrations to efficiently connect frontend features with backend services.",
        "Collaborated with design, product, and backend teams using Git-based code review workflows.",
      ],
    },
  ],
};
