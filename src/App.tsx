import React, { useState, useEffect, useRef } from "react";
import {
  Github,
  Linkedin,
  Mail,
  Code,
  Database,
  Brain,
  ExternalLink,
  FileText,
} from "lucide-react";
import * as THREE from "three";

const RESUME_URL = "/Arushi_Resume.pdf";

type SectionId = "about" | "skills" | "projects" | "resume";

interface SkillInfo {
  proficiency: number;
  experience: string;
  description: string;
}

const skillsData: Record<string, SkillInfo> = {
  // --- Languages ---
  Python: {
    proficiency: 92,
    experience: "3+ years",
    description:
      "Primary language for data science, AI, and backend work. Used across Qualcomm capstone, teaching as a DS Programming II peer mentor, and personal projects.",
  },
  "C++": {
    proficiency: 85,
    experience: "2+ years",
    description:
      "Used for systems and performance-focused coursework, with emphasis on memory management, data structures, and algorithms.",
  },
  C: {
    proficiency: 82,
    experience: "2+ years",
    description:
      "Applied in systems and OS coursework to understand low-level execution, memory, and performance trade-offs.",
  },
  Java: {
    proficiency: 88,
    experience: "3+ years",
    description:
      "Foundation for algorithms, object-oriented design, and large-scale course projects. Experience with JUnit and test-driven development.",
  },
  "C#": {
    proficiency: 90,
    experience: "1+ years",
    description:
      "Used at 365Labs to build NIBRS-compliant law-enforcement systems in .NET and UWP, with strong focus on reliability and maintainability.",
  },
  JavaScript: {
    proficiency: 90,
    experience: "3+ years",
    description:
      "Core language for frontend and React Native development. Built real-time mobile and web apps, including motion-interaction and logistics tools.",
  },
  TypeScript: {
    proficiency: 85,
    experience: "1.5+ years",
    description:
      "Brings type safety and maintainability to React and full-stack projects, improving reliability and refactor safety.",
  },
  SQL: {
    proficiency: 88,
    experience: "2+ years",
    description:
      "Experience with relational schema design, query optimization, and MSSQL in production-style systems.",
  },
  R: {
    proficiency: 75,
    experience: "1 year",
    description:
      "Used for statistical analysis and exploratory data work in data science coursework.",
  },
  Assembly: {
    proficiency: 70,
    experience: "Academic projects",
    description:
      "Used in machine organization courses to understand computer architecture, low-level execution, and performance.",
  },
  "HTML/CSS": {
    proficiency: 85,
    experience: "3+ years",
    description:
      "Responsive UI work for web and hybrid apps, paired with React and design frameworks.",
  },

  // --- Frameworks & Libraries ---
  ".NET": {
    proficiency: 88,
    experience: "1+ years",
    description:
      "Built production features for a Records Management System at 365Labs using .NET, UWP, and MVVM patterns.",
  },
  React: {
    proficiency: 92,
    experience: "2+ years",
    description:
      "Modern React with hooks and component-based architecture, used for interactive UIs and internal tools.",
  },
  "React Native": {
    proficiency: 90,
    experience: "1.5+ years",
    description:
      "Core framework for mobile apps like the Driver’s Application and Magic Lab’s motion-interaction prototypes.",
  },
  PyTorch: {
    proficiency: 85,
    experience: "1.5+ years",
    description:
      "Used in the Qualcomm AI-Powered Feedback Coach to train, evaluate, and optimize pose and gaze estimation models.",
  },
  "Spring Boot": {
    proficiency: 80,
    experience: "1+ years",
    description:
      "Backend API development for scalable services with proper layering, testing, and database integration.",
  },
  Pandas: {
    proficiency: 90,
    experience: "2.5+ years",
    description:
      "Data wrangling, feature engineering, and exploratory analysis in Python pipelines and AI experiments.",
  },
  NumPy: {
    proficiency: 88,
    experience: "2.5+ years",
    description:
      "Vectorized numerical computing for ML and data processing workloads.",
  },
  MediaPipe: {
    proficiency: 80,
    experience: "Project-based",
    description:
      "Used for pose and gesture analysis in computer-vision prototypes and interactive systems.",
  },
  JUnit: {
    proficiency: 82,
    experience: "2+ years",
    description:
      "Unit testing for Java projects, reinforcing TDD and regression safety in course and side projects.",
  },
  Bootstrap: {
    proficiency: 78,
    experience: "2+ years",
    description:
      "Rapid UI prototyping and consistent styling for web interfaces.",
  },

  // --- Tools & Platforms ---
  Azure: {
    proficiency: 85,
    experience: "1.5+ years",
    description:
      "Deployed cloud-backed APIs, MSSQL databases, and storage (Blob) for production-style logistics and RMS workflows.",
  },
  "Google Cloud Platform": {
    proficiency: 75,
    experience: "1 year",
    description:
      "Used for hosting and experimentation in ML and data projects.",
  },
  "Microsoft SQL Server": {
    proficiency: 88,
    experience: "1.5+ years",
    description:
      "Primary relational database for 365Labs RMS and Driver’s Application backend.",
  },
  Git: {
    proficiency: 92,
    experience: "3+ years",
    description:
      "Daily use with feature branching, code reviews, and standardized workflows taught to 300+ students as a peer mentor.",
  },
  Docker: {
    proficiency: 80,
    experience: "1+ years",
    description:
      "Containerizing services, improving reproducibility, and enabling smoother deployment pipelines.",
  },
  "VS Code": {
    proficiency: 90,
    experience: "3+ years",
    description:
      "Primary environment for web, Python, and systems work with tailored tooling.",
  },
  "Visual Studio": {
    proficiency: 85,
    experience: "1+ years",
    description:
      "Used for .NET and C# development on enterprise codebases at 365Labs.",
  },
  IntelliJ: {
    proficiency: 80,
    experience: "2+ years",
    description: "Used for Java course projects and TDD with JUnit.",
  },

  // --- Concepts / Core strengths ---
  Algorithms: {
    proficiency: 88,
    experience: "3+ years",
    description:
      "Strong foundation from coursework and projects, applied in optimization, data processing, and systems design.",
  },
  "Distributed Systems": {
    proficiency: 80,
    experience: "Courses & projects",
    description:
      "Understanding of concurrency, scaling, and reliability from systems and infrastructure-focused work.",
  },
  "Scalable Infrastructure": {
    proficiency: 82,
    experience: "Projects & internship",
    description:
      "Designing systems that handle growth in users, data, and complexity, from edge AI to logistics apps.",
  },
  "Relational Databases": {
    proficiency: 88,
    experience: "2+ years",
    description:
      "Schema design, normalization, and query design in MSSQL and other relational systems.",
  },
  "Performance Optimization": {
    proficiency: 85,
    experience: "Projects & coursework",
    description:
      "Reduced crash frequency and latency in motion-capture and AI pipelines; optimized inference for edge devices.",
  },
  Debugging: {
    proficiency: 92,
    experience: "3+ years",
    description:
      "Core strength reinforced through peer mentoring and production debugging of complex, asynchronous systems.",
  },
  "Test-Driven Development": {
    proficiency: 80,
    experience: "Courses & 365Labs",
    description:
      "Wrote unit tests and validation suites for compliance-heavy and backend modules before deployment.",
  },
  "CI/CD": {
    proficiency: 78,
    experience: "Project experience",
    description:
      "Integrated tests and automated workflows into Git-based pipelines for reliable deployments.",
  },
  "Agile & Scrum Development": {
    proficiency: 85,
    experience: "1.5+ years",
    description:
      "Worked in Scrum teams at Magic Lab and 365Labs, contributing to sprints, standups, and iterative delivery.",
  },
};

type SkillName = keyof typeof skillsData;

const skills: Record<
  "languages" | "frameworks" | "tools" | "concepts",
  string[]
> = {
  languages: [
    "Python",
    "C++",
    "C",
    "Java",
    "C#",
    "JavaScript",
    "TypeScript",
    "SQL",
    "R",
    "Assembly",
    "HTML/CSS",
  ],
  frameworks: [
    "React",
    "React Native",
    ".NET",
    "PyTorch",
    "Spring Boot",
    "Pandas",
    "NumPy",
    "MediaPipe",
    "JUnit",
    "Bootstrap",
  ],
  tools: [
    "Azure",
    "Google Cloud Platform",
    "Microsoft SQL Server",
    "Git",
    "Docker",
    "VS Code",
    "Visual Studio",
    "IntelliJ",
  ],
  concepts: [
    "Algorithms",
    "Distributed Systems",
    "Scalable Infrastructure",
    "Relational Databases",
    "Performance Optimization",
    "Debugging",
    "Test-Driven Development",
    "CI/CD",
    "Agile & Scrum Development",
  ],
};

interface ProjectLink {
  label: string;
  href: string;
  kind?: "github" | "demo";
  note?: string;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  links?: ProjectLink[];
}

const projects: Project[] = [
  {
    title: "AI-Powered Feedback Coach (Qualcomm Capstone)",
    description:
      "An on device AI system for analyzing posture, gaze, gestures, and expressions during presentations. Built to run efficiently on Snapdragon PCs and turn multimodal signals into clear, actionable feedback for speakers.",
    tech: [
      "Python",
      "PyTorch",
      "Computer Vision",
      "Qualcomm AI SDKs",
      "ONNX Runtime",
      "Video Language Models"
    ],
    highlights: [
      "End to end video analysis pipeline on device",
      "Optimized vision language models for stable, low latency inference",
      "Human readable engagement scoring and feedback reports",
    ],
    links: [
    {
      label: "GitHub",
      href: "https://github.com/arushi0207/CS620-Snapdragons",
      kind: "github",
    },
    {
      label: "Live Demo (frontend)",
      href: "https://cs-620-snapdragons.vercel.app/",
      kind: "demo",
      note: "Backend currently runs locally",
    },
  ],
  },
  {
    title: "XpertDispatch Driver's Application",
    description:
      "A real-time task management app for truck drivers that simplifies proof-of-delivery workflows. Built as a full-stack system with secure document upload and a production-ready mobile experience.",
    tech: ["React Native", "Expo", "JavaScript", "Azure", "MSSQL", "REST APIs", "Azure Blob Storage", "XCode"],
    highlights: [
      "Designed end-to-end workflow from mobile UI to database-backed APIs",
      "Secure proof-of-delivery uploads to reduce missing or lost documents",
      "Shipped to real users with production deployment and iteration",
    ],
    links: [
    {
      label: "iOS App Store",
      href: "https://apps.apple.com/us/app/xpertdriver/id6753903503",
      kind: "demo",
    },
  ],
  },
  {
    title: "Law Enforcement Records Automation",
    description:
      "Modernized a Records Management System to ensure NIBRS compliance, automate PDF extraction, and reduce manual data entry for multi-state agencies.",
    tech: [
      "C#",
      ".NET",
      "UWP",
      "Azure",
      "MSSQL",
      "iText7",
      "GdPicture OCR",
      "PSPDFKit",
      "OpenAI",
    ],
    highlights: [
      "100% NIBRS/IBR data validity across jurisdictions",
      "60% reduction in manual entry time",
      "Heuristic JSON mapping engine for flexible templates",
    ],
    links: [
    {
      label: "GitHub",
      href: "https://github.com/arushi0207/CS620-Snapdragons",
      kind: "github",
    },
    {
      label: "Live Demo (frontend)",
      href: "https://cs-620-snapdragons.vercel.app/",
      kind: "demo",
      note: "Backend currently runs locally",
    },
  ],
  },
  {
    title: "Motion-Capture Interaction Toolkit",
    description:
      "Realtime motion-capture system supporting fluid gesture interactions and narrative scripting for research in interactive systems.",
    tech: ["JavaScript", "React Native", "Firebase", "Motion Capture"],
    highlights: [
      "40% reduction in crash frequency",
      "Custom tweening for smooth pose transitions",
      "Dynamic script editor for rapid prototyping",
    ],
    links: [
    {
      label: "GitHub",
      href: "https://github.com/arushi0207/CS620-Snapdragons",
      kind: "github",
    },
    {
      label: "Live Demo (frontend)",
      href: "https://cs-620-snapdragons.vercel.app/",
      kind: "demo",
      note: "Backend currently runs locally",
    },
  ],
  },
];

const isSectionId = (id: string): id is SectionId =>
  ["about", "skills", "projects", "resume"].includes(id as SectionId);

// --------- Personal AI Chat -------------

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

const initialMessages: ChatMessage[] = [
  {
    role: "bot",
    text: "Hi, I’m Arushi’s AI. Ask me about her experience, projects, or skills.",
  },
  {
    role: "bot",
    text: "Try: “Summarize her resume” or “What are her strongest skills?”",
  },
];

const PersonalAIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");

  const getMockReply = (question: string): string => {
    const q = question.toLowerCase();

    if (q.includes("resume") || q.includes("summary")) {
      return "Arushi is a senior at UW–Madison studying Computer Science and Data Science. She’s done backend, full-stack, and ML work across internships, research, and course projects.";
    }

    if (q.includes("skills") || q.includes("tech") || q.includes("stack")) {
      return "Her core stack includes React/TypeScript, Python, Spring Boot, SQL, and modern data tooling. She’s comfortable with distributed systems, ML pipelines, and full-stack web dev.";
    }

    if (q.includes("project")) {
      return "She’s built systems like an AI-powered feedback coach, a law-enforcement PDF automation pipeline, a March Madness betting platform, and several OS-level projects in xv6.";
    }

    if (q.includes("contact") || q.includes("email") || q.includes("reach")) {
      return "You can reach Arushi via the contact section or by email on her resume. She’s actively looking for software and ML engineering roles.";
    }

    return "Great question! Right now I’m using a simple demo brain, but in production this widget can be backed by a real LLM that’s grounded in Arushi’s resume, projects, and portfolio content.";
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { role: "user", text: trimmed };
    const reply: ChatMessage = { role: "bot", text: getMockReply(trimmed) };

    setMessages((prev) => [...prev, userMsg, reply]);
    setInput("");
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="pointer-events-auto w-[320px] bg-slate-950/90 border border-purple-500/40 rounded-2xl shadow-xl shadow-purple-900/40 backdrop-blur-md p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-purple-300">
            Ask my AI
          </p>
          <p className="text-sm text-gray-300">
            Chat with an AI agent about Arushi.
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs font-semibold">
          AI
        </div>
      </div>

      <div className="h-40 overflow-y-auto bg-slate-900/60 rounded-xl p-3 space-y-2 text-sm">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`max-w-[90%] ${
              m.role === "user" ? "ml-auto text-right" : "mr-auto text-left"
            }`}
          >
            <div
              className={`inline-block px-3 py-2 rounded-xl ${
                m.role === "user"
                  ? "bg-purple-500/60 text-white"
                  : "bg-slate-800/80 text-gray-100"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about my experience..."
          className="flex-1 bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2 text-sm outline-none focus:border-purple-400"
        />
        <button
          onClick={handleSend}
          className="px-3 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:brightness-110 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

// ------------- Main Portfolio -------------

const Portfolio: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<Record<SectionId, boolean>>({
    about: false,
    skills: false,
    projects: false,
    resume: false,
  });
  const [selectedSkill, setSelectedSkill] = useState<SkillName | null>(null);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const scrollProgressRef = useRef(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cursorCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle scroll to control zoom
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Use exactly one viewport height as the full zoom distance
      const maxScroll = window.innerHeight; // equals 100vh spacer
      const raw = scrollY / maxScroll;
      const progress = Math.min(Math.max(raw, 0), 1);

      setScrollProgress(progress);

      // Reveal content near the end of the zoom
      setShowContent(progress > 0.7);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  // Intersection Observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          if (!isSectionId(id)) return;

          setIsVisible((prev) => ({
            ...prev,
            [id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Three.js Neural Network
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });

    const NETWORK_Y_OFFSET = -0.1;

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const target = new THREE.Vector3(0, NETWORK_Y_OFFSET, 0);
    camera.position.set(0, 0, 10);
    camera.lookAt(target);

    // --- Nodes setup ---
    const nodes: THREE.Mesh<
      THREE.SphereGeometry,
      THREE.MeshBasicMaterial
    >[][] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 1,
    });

    const layers = [5, 8, 8, 3];
    const allNodes: THREE.Mesh<
      THREE.SphereGeometry,
      THREE.MeshBasicMaterial
    >[] = [];

    layers.forEach((nodeCount, layerIndex) => {
      const layerNodes: THREE.Mesh<
        THREE.SphereGeometry,
        THREE.MeshBasicMaterial
      >[] = [];
      for (let i = 0; i < nodeCount; i++) {
        const node = new THREE.Mesh(
          nodeGeometry,
          nodeMaterial.clone()
        ) as THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;

        const x = (layerIndex - 1.5) * 2;
        const y = (i - nodeCount / 2) * 0.5 - NETWORK_Y_OFFSET;

        node.position.set(x, y, 0);
        scene.add(node);
        layerNodes.push(node);
        allNodes.push(node);
      }
      nodes.push(layerNodes);
    });

    // --- Connections ---
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.3,
    });

    const connections: THREE.Line<
      THREE.BufferGeometry,
      THREE.LineBasicMaterial
    >[] = [];
    for (let i = 0; i < layers.length - 1; i++) {
      nodes[i].forEach((startNode) => {
        nodes[i + 1].forEach((endNode) => {
          const points = [startNode.position, endNode.position];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(
            geometry,
            lineMaterial.clone()
          ) as THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>;
          scene.add(line);
          connections.push(line);
        });
      });
    }

    // --- Particles ---
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.03,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      // Use the current scroll progress from the ref
      const progress = scrollProgressRef.current;

      // Two-phase zoom
      const zFar = 5;
      const zCenter = 3;
      const zInside = -1;
      const centerPhaseEnd = 0.45;

      const phase1T = Math.min(progress / centerPhaseEnd, 1);
      let targetZ = zFar + (zCenter - zFar) * phase1T;

      if (progress > centerPhaseEnd) {
        const t = (progress - centerPhaseEnd) / (1 - centerPhaseEnd);
        targetZ = zCenter + (zInside - zCenter) * t;
      }

      // Smooth the camera motion with a simple lerp
      camera.position.z += (targetZ - camera.position.z) * 0.08;
      camera.lookAt(target);

      // Rotation & animation stay continuous now
      const rotationY = time * 0.2;
      allNodes.forEach((node) => {
        if (node.parent) {
          node.parent.rotation.y = rotationY;
        }
      });
      particles.rotation.y = time * 0.1;

      // Pulse nodes
      allNodes.forEach((node, idx) => {
        const scale = 1 + Math.sin(time * 2 + idx * 0.5) * 0.2;
        node.scale.set(scale, scale, scale);
      });

      // Fade out as we zoom in
      const fadeProgress = Math.max(0, progress - 0.5) * 2;
      const nodeOpacity = 1 - fadeProgress;
      const connectionOpacity = 0.3 * (1 - fadeProgress);
      const particleOpacity = 0.6 * (1 - fadeProgress);

      allNodes.forEach((node) => {
        node.material.opacity = nodeOpacity;
      });
      connections.forEach((line) => {
        line.material.opacity = connectionOpacity;
      });
      particlesMaterial.opacity = particleOpacity;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      nodeGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []); // run once

  // Particle Cursor Trail
  useEffect(() => {
    if (!cursorCanvasRef.current) return;

    const canvas = cursorCanvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      life: number;
      maxLife: number;
      color: string;
    }

    const particles: Particle[] = [];
    const maxParticles = 20;
    let mouseX = 0;
    let mouseY = 0;
    let lastTime = Date.now();

    const colors = [
      "rgba(168, 85, 247, ", // purple-500
      "rgba(236, 72, 153, ", // pink-500
      "rgba(192, 132, 252, ", // purple-400
    ];

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (particles.length < maxParticles) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const maxLife = Math.random() * 60 + 40;

        particles.push({
          x: mouseX,
          y: mouseY,
          size: Math.random() * 4 + 2,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          life: maxLife,
          maxLife: Math.random() * 60 + 40,
          color: color,
        });
      }
    };

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      // Clear canvas completely each frame so Three.js shows through
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.life--;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const opacityFactor = 0.4;
        const opacity = (p.life / p.maxLife) * opacityFactor;


        // Outer glow
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          p.size * 2
        );
        gradient.addColorStop(0, p.color + opacity + ")");
        gradient.addColorStop(0.5, p.color + opacity * 0.5 + ")");
        gradient.addColorStop(1, p.color + "0)");
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();

        // Inner core
        ctx.beginPath();
        ctx.fillStyle = p.color + opacity + ")";
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollToSection = (id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Fixed 3D Canvas Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />
      </div>

      {/* Cursor Particle Canvas (above 3D, below content) */}
      <canvas
        ref={cursorCanvasRef}
        className="fixed inset-0 z-40 pointer-events-none"
      />

      {/* Hero text overlay */}
      {scrollProgress < 0.1 && (
        <div className="fixed inset-x-0 top-24 z-20">
          <div className="max-w-6xl mx-auto px-6 md:px-10 flex">
            <div className="max-w-xl pointer-events-none">
              <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-purple-300 mb-3">
                Portfolio
              </p>

              <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg text-left">
                Arushi Taneja
                <br />
                Portfolio
              </h1>

              <p className="text-base md:text-xl text-gray-300 mb-8 drop-shadow-md text-left">
                B.S. Computer Science &amp; Data Science @ UW–Madison
              </p>

              <div className="flex items-center gap-3 text-sm text-purple-300">
                <span>Scroll to explore</span>
                <div className="animate-bounce">
                  <div className="w-5 h-8 border-2 border-purple-400 rounded-full flex justify-center items-start">
                    <div className="w-1 h-3 bg-purple-400 rounded-full mt-1.5 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1" />
          </div>
        </div>
      )}

      {/* Spacer to enable scroll */}
      <div style={{ height: "100vh" }} />

      {/* Main Content - Appears after zoom */}
      <div
        className={`relative z-20 transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Navigation */}
        <nav className="sticky top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-purple-500/20">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Arushi Taneja
            </div>
            <div className="flex gap-6">
              {["About", "Skills", "Projects", "Resume"].map((item) => (
                <button
                  key={item}
                  onClick={() =>
                    scrollToSection(item.toLowerCase() as SectionId)
                  }
                  className="hover:text-purple-400 transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Skill Modal */}
        {selectedSkill && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <div
              className="bg-slate-900 border border-purple-500/40 rounded-2xl p-8 max-w-lg w-full shadow-2xl shadow-purple-500/20 transform transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {selectedSkill}
                </h3>
                <button
                  onClick={() => setSelectedSkill(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Proficiency</span>
                  <span className="text-lg font-bold text-purple-400">
                    {skillsData[selectedSkill].proficiency}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${skillsData[selectedSkill].proficiency}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mb-6">
                <span className="text-sm text-gray-400">Experience</span>
                <p className="text-xl font-semibold text-white mt-1">
                  {skillsData[selectedSkill].experience}
                </p>
              </div>

              <div>
                <span className="text-sm text-gray-400">Details</span>
                <p className="text-gray-300 mt-2 leading-relaxed">
                  {skillsData[selectedSkill].description}
                </p>
              </div>

              <button
                onClick={() => setSelectedSkill(null)}
                className="mt-6 w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* About Section */}
        <section
          id="about"
          className="min-h-screen flex items-center px-6 py-20 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
        >
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 ${
              isVisible.about
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <Code className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Software Engineer</h3>
                <p className="text-gray-300 leading-relaxed">
                  I like building software that holds up in the real world;
                  messy inputs, edge cases, strict requirements, and evolving needs. 
                  I'm curious by default, and I tend to dig deep when something doesn't 
                  quite make sense. That curiosity shows up in how I debug, how I design systems,
                  and how I think about tradeoffs.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  I try to put my best foot forward in everything I ship: 
                  writing code that's readable, testable, and easy for the 
                  next person to understand. Whether I'm working on backend 
                  services or full-stack features, I care about correctness, 
                  maintainability, and building things that people can trust. 
                </p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <Database className="w-12 h-12 text-pink-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Data & AI Builder</h3>
                <p className="text-gray-300 leading-relaxed">
                  I'm drawn to learning how systems work end to end, from raw
                  data and noisy signals to the feedback a user actually sees.
                  I enjoy exploring new tools and ideas, especially in AI and data,
                  but I'm most interested in making them practical, reliable, and 
                  understandable.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  I like asking “why” and “what if.” Why a model behaves a certain 
                  way, what happens under real constraints, and how results can be
                   made clearer and more useful. For me, building with AI isn't just
                    about accuracy. It’s about stability, evaluation, and creating 
                    experiences that help people improve.
                </p>
              </div>
            </div>
            <div className="mt-8 bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20">
              <Brain className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">My Journey</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm pursuing a B.S. in Computer Science and Data Science at UW-Madison, 
                and my path so far has been shaped by a mix of teaching, research, and 
                industry work. I've mentored hundreds of students, built research prototypes
                that needed constant iteration, and shipped production software where details
                really mattered. Each of those experiences pushed me to learn quickly and stay
                grounded in real constraints.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I enjoy problems where I'm constantly learning, whether that's understanding 
                a new system, refining a pipeline, or figuring out how to turn something 
                complex into something clear. I'm excited by roles where I can take ownership,
                keep growing, and contribute thoughtfully to systems that actually get used.
              </p>
            </div>
            <div className="mt-8 flex gap-4 justify-center">
              <a
                href="https://github.com/arushi0207"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Arushi's GitHub"
                className="p-3 bg-purple-500/20 hover:bg-purple-500/40 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/ataneja2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Arushi's LinkedIn"
                className="p-3 bg-purple-500/20 hover:bg-purple-500/40 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:arushitaneja2004@gmail.com"
                aria-label="Email Arushi"
                className="p-3 bg-purple-500/20 hover:bg-purple-500/40 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="min-h-screen flex items-center px-6 py-20 bg-slate-950"
        >
          <div
            className={`max-w-6xl mx-auto w-full transition-all duration-1000 ${
              isVisible.skills
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(skills).map(([category, items]) => (
                <div
                  key={category}
                  className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold mb-6 capitalize text-purple-400">
                    {category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {items.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => setSelectedSkill(skill as SkillName)}
                        className="px-4 py-2 bg-purple-500/20 rounded-full text-sm hover:bg-purple-500/40 hover:scale-110 transition-all duration-300 cursor-pointer"
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="min-h-screen flex items-center px-6 py-20 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950"
        >
          <div
            className={`max-w-6xl mx-auto w-full transition-all duration-1000 ${
              isVisible.projects
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project, idx) => (
                <div
                key={idx}
                className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/20 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="border-t border-purple-500/20 pt-4">
                  <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                    {project.highlights.map((highlight) => (
                      <span key={highlight} className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                {project.links?.length ? (
                  <div className="mt-5 flex flex-wrap gap-2 items-center">
                    {project.links.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 border border-purple-500/30 hover:border-purple-500/60 hover:bg-slate-800 transition inline-flex items-center gap-2"
                      >
                        {l.label}
                        {l.note && (
                          <span className="text-[11px] text-gray-400 font-normal">
                            • {l.note}
                          </span>
                        )}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section
          id="resume"
          className="min-h-screen flex items-center px-6 py-20 bg-slate-950"
        >
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${
              isVisible.resume
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-5xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Resume
            </h2>
            <div className="bg-slate-900/50 backdrop-blur-sm p-12 rounded-2xl border border-purple-500/20">
              <FileText className="w-24 h-24 text-purple-400 mx-auto mb-8" />
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Want a deeper look at my experience at 365Labs, UW–Madison, and
                Magic Lab, plus projects like the AI-Powered Feedback Coach and
                Driver&apos;s Application? Download my full resume for details
                on technologies, impact, and coursework.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href={RESUME_URL}
                  download
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
                >
                  Download Resume
                </a>
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-slate-800 rounded-full font-semibold border border-purple-500/50 hover:bg-slate-700 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center"
                >
                  View Online
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-8 border-t border-purple-500/20">
              <p className="text-gray-400 mb-4">
                Let&apos;s build something impactful together.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="mailto:arushitaneja2004@gmail.com"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  arushitaneja2004@gmail.com
                </a>
              </div>
              <p className="text-gray-500 text-sm mt-8">
                © 2025 Arushi Taneja. Built with React &amp; Tailwind CSS
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Floating AI Chat & Toggle Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isChatOpen && (
          <div className="mb-2">
            <PersonalAIChat />
          </div>
        )}

        <button
          onClick={() => setIsChatOpen((open) => !open)}
          aria-label={isChatOpen ? "Close AI chat" : "Open AI chat"}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/40 flex items-center justify-center text-sm font-semibold hover:scale-110 transition-transform"
        >
          AI
        </button>
      </div>
    </div>
  );
};

export default Portfolio;
