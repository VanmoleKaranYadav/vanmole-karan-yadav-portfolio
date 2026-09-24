import resumePdf from '../assets/resume.pdf';
import profileImg from '../assets/profile.jpg';

export const portfolioData = {
  name: "Vanmole Karan Yadav",
  shortName: "Karan",
  role: "Software Developer",
  status: "Available for Software Developer Roles",
  degreeBadge: "Computer Science & Engineering",
  heroBio:
    "Computer Science & Engineering student and aspiring software developer passionate about building practical, scalable applications with modern web technologies and applied AI.",
  location: "Hyderabad, India",
  email: "vanmolekaranyadav@gmail.com",
  phone: "+91 7569506721",
  github: "https://github.com/VanmoleKaranYadav",
  linkedin: "https://www.linkedin.com/in/vanmole-karan-yadav-689b91335",
  resumePath: resumePdf,
  profileImagePath: profileImg,
  resumeDownloadName: "Vanmole-Karan-Yadav-Resume.pdf",

  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ],

  about: {
    lead: "I am a CSE student seeking an entry-level Software Developer role. I enjoy solving challenging algorithmic problems, learning modern engineering technologies, and developing efficient, reliable solutions for real-world applications.",
    pillars: [
      {
        num: "01",
        title: "Full-Stack Development",
        desc: "Building intuitive responsive user interfaces with React and engineering performant REST APIs with Node.js, Express, and FastAPI.",
      },
      {
        num: "02",
        title: "Applied AI & RAG",
        desc: "Exploring Agentic AI workflows, retrieval-augmented generation pipelines, and predictive machine learning models to solve concrete problems.",
      },
      {
        num: "03",
        title: "Core Fundamentals",
        desc: "Strong computer science foundations in Data Structures, Algorithms, Object-Oriented Programming, and scalable database design.",
      },
    ],
  },

  education: [
    {
      degree: "B.Tech — Computer Science and Engineering",
      institution: "DRK College of Engineering and Technology",
      affiliation: "JNTUH",
      period: "2023 – 2027",
      score: "CGPA: 7.5 / 10.0",
      status: "Currently Pursuing (3rd Year)",
    },
    {
      degree: "Intermediate (TSBIE)",
      institution: "NRI Junior College",
      affiliation: "Telangana State Board",
      period: "2021 – 2023",
      score: "CGPA: 8.0 / 10.0",
      status: "Completed",
    },
    {
      degree: "Secondary School Certificate (SSC)",
      institution: "St Mary's High School",
      affiliation: "SSC Board",
      period: "2020 – 2021",
      score: "CGPA: 10.0 / 10.0",
      status: "Completed (Perfect Score)",
    },
  ],

  skillsCategories: [
    {
      title: "Programming",
      icon: "Code",
      skills: ["Python", "JavaScript"],
    },
    {
      title: "Web Technologies",
      icon: "Globe",
      skills: ["HTML5", "CSS3", "REST APIs"],
    },
    {
      title: "Frameworks & Runtimes",
      icon: "Layers",
      skills: ["React.js", "Node.js", "Express.js", "FastAPI"],
    },
    {
      title: "Databases",
      icon: "Database",
      skills: ["SQL", "MongoDB"],
    },
    {
      title: "AI, ML & Data",
      icon: "Cpu",
      skills: ["Machine Learning", "NLP", "Scikit-learn", "Pandas", "NumPy"],
    },
    {
      title: "Tools & Concepts",
      icon: "Wrench",
      skills: ["DSA", "OOP", "Git", "GitHub", "VS Code"],
    },
  ],

  projects: [
    {
      num: "01",
      id: "project-organ-donor",
      title: "Organ Donor Service System",
      type: "Healthcare Web Platform",
      badge: "Full-Stack",
      desc: "Comprehensive full-stack platform for donor registration, recipient and patient management, and organ request tracking. Features an intuitive responsive frontend, robust backend REST APIs, authentication security, and database integration for seamless medical coordination.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
      status: "Completed & Tested",
      highlights: [
        "Secure donor registration and identity verification workflow",
        "Hospital patient request dashboard with priority matching",
        "Role-based access controls and encrypted authentication",
      ],
      mockup: {
        headerLeft: "Registry Dashboard",
        headerRight: "Status: Active",
        items: [
          { dotColor: "bg-emerald-500", label: "Donor Record #1042", badge: "Verified" },
          { dotColor: "bg-amber-500", label: "Hospital Request Intake", badge: "In Review" },
          { dotColor: "bg-blue-500", label: "Recipient Match Query", badge: "Dispatched" },
        ],
      },
    },
    {
      num: "02",
      id: "project-agripath-ai",
      title: "AgriPath AI",
      type: "Agritech Intelligence",
      badge: "AI / ML",
      desc: "AI-powered agricultural platform designed to empower farmers with timely market insights, accurate weather predictions, crop disease advisories, and actionable farming guidance through predictive modeling and fast API processing.",
      technologies: ["Python", "Machine Learning", "FastAPI", "React.js", "APIs"],
      status: "Completed & Deployed",
      highlights: [
        "Predictive disease detection with image and symptom classification",
        "Real-time regional crop market price forecasting",
        "Local weather alerts with automated irrigation advice",
      ],
      mockup: {
        headerLeft: "Crop Advisory Module",
        headerRight: "Model: Online",
        items: [
          { dotColor: "bg-emerald-500", label: "Precipitation Window Forecast", badge: "Optimal" },
          { dotColor: "bg-blue-500", label: "Regional Pricing Index Trend", badge: "+14% Expected" },
          { dotColor: "bg-purple-500", label: "Soil Nutrient Health Analysis", badge: "Nitrogen 82%" },
        ],
      },
    },
  ],

  internship: {
    title: "AI for Sustainability Virtual Internship",
    organization: "1M1B – AICTE & IBM SkillsBuild",
    period: "December 2025 – January 2026",
    role: "AI Research & Development Intern",
    desc: "Gained deep practical exposure to Applied Artificial Intelligence, Responsible AI frameworks, sustainability concepts, Agentic AI architectures, and Retrieval-Augmented Generation (RAG) pipelines applied to solve real-world industrial and environmental challenges aligned with UN Sustainable Development Goals.",
    tags: ["Agentic AI", "RAG Systems", "Responsible AI", "IBM SkillsBuild", "Python"],
  },

  achievement: {
    title: "Winner — Maceco Track",
    event: "SummerSaaS AI Hackathon 2026",
    venue: "BITS Pilani Hyderabad Campus",
    desc: "Secured 1st Place / Track Winner for developing innovative AI-driven prototype solutions addressing enterprise productivity under competitive hackathon conditions.",
  },

  certifications: [
    {
      name: "Python Programming Certification",
      issuer: "VCube Software Solutions",
      date: "Verified Credential",
    },
    {
      name: "Data Science Fundamentals",
      issuer: "Infosys Springboard",
      date: "Verified Credential",
    },
    {
      name: "Deep Learning Fundamentals",
      issuer: "Infosys Springboard",
      date: "Verified Credential",
    },
  ],
};
