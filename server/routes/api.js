import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Portfolio JSON details
const portfolioDetails = {
  name: "Vanmole Karan Yadav",
  shortName: "Karan",
  role: "Software Developer",
  status: "Available for roles",
  degreeBadge: "Computer Science & Engineering",
  heroBio:
    "Computer Science and Engineering student focused on full-stack web development and applied artificial intelligence to build practical, real-world applications.",
  location: "Hyderabad, India",
  email: "vanmolekaranyadav@gmail.com",
  phone: "+91 7569506721",
  github: "https://github.com/VanmoleKaranYadav",
  linkedin: "https://www.linkedin.com/in/vanmole-karan-yadav-689b91335",
  education: [
    {
      degree: "B.Tech — Computer Science and Engineering",
      institution: "DRK College of Engineering and Technology (JNTUH)",
      year: "2023 – 2027",
      score: "CGPA: 7.5 / 10.0",
    },
    {
      degree: "Intermediate (Class XII)",
      institution: "NRI Junior College",
      year: "2023",
      score: "CGPA: 8.0 / 10.0",
    },
    {
      degree: "Secondary School (Class X)",
      institution: "St Mary's High School",
      year: "2021",
      score: "CGPA: 10.0 / 10.0",
    },
  ],
  internship: {
    title: "AI for Sustainability Virtual Internship",
    organization: "1M1B – AICTE & IBM SkillsBuild",
    duration: "December 2025 – January 2026",
    points: [
      "Gained practical exposure to AI, Responsible AI, and sustainability concepts aligned with the UN SDGs.",
      "Worked with Agentic AI and RAG systems to explore AI-based solutions for real-world problems.",
    ],
  },
  projects: [
    {
      num: "01",
      id: "project-organ-donor",
      title: "Organ Donor Service System",
      type: "Full Stack Project",
      desc: "Developed a full-stack platform for donor registration, patient management, and organ request tracking. Implemented responsive frontend, backend APIs, authentication, and database integration.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    },
    {
      num: "02",
      id: "project-agripath-ai",
      title: "AgriPath AI",
      type: "AI-Powered Agricultural Platform",
      desc: "Developed an AI-powered platform providing farmers with market insights, weather information, and agricultural guidance. Integrated data-driven features for crop, market, and weather-related decision support.",
      technologies: ["Python", "Machine Learning", "FastAPI", "React.js", "APIs"],
    },
  ],
  achievement: {
    title: "Hackathon Winner — Maceco Track",
    event: "SummerSaaS AI Hackathon 2026",
    venue: "BITS Pilani Hyderabad Campus",
    description: "Recognized for developing innovative AI-driven prototype solutions.",
  },
  certifications: [
    {
      name: "Python Programming Certification",
      issuer: "VCube Software Solutions",
    },
    {
      name: "Data Science Fundamentals",
      issuer: "Infosys Springboard",
    },
    {
      name: "Deep Learning Fundamentals",
      issuer: "Infosys Springboard",
    },
  ],
};

// GET /api/health - Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'Vanmole Karan Yadav Portfolio API',
  });
});

// GET /api/portfolio - Structured JSON data
router.get('/portfolio', (req, res) => {
  res.status(200).json({
    success: true,
    data: portfolioDetails,
  });
});

// GET /api/resume - Direct PDF streaming
router.get('/resume', (req, res) => {
  const possiblePaths = [
    path.resolve(__dirname, '../../public/resume.pdf'),
    path.resolve(__dirname, '../../src/assets/resume.pdf'),
    path.resolve(__dirname, '../../dist/resume.pdf'),
  ];

  let foundPath = null;
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      foundPath = p;
      break;
    }
  }

  if (!foundPath) {
    return res.status(404).json({
      success: false,
      error: 'Resume PDF not found on server.',
    });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="Vanmole-Karan-Yadav-Resume.pdf"');
  const stream = fs.createReadStream(foundPath);
  stream.pipe(res);
});

export default router;
