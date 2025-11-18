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

type SectionId = "about" | "skills" | "projects" | "resume";

interface SkillInfo {
  proficiency: number;
  experience: string;
  description: string;
}

const skillsData: Record<string, SkillInfo> = {
  Python: {
    proficiency: 95,
    experience: "3 years",
    description:
      "Primary language for data science, ML pipelines, and backend development. Used extensively in academic projects and internships.",
  },
  JavaScript: {
    proficiency: 90,
    experience: "2.5 years",
    description:
      "Full-stack development with modern ES6+ features. Built multiple web applications and interactive data visualizations.",
  },
  TypeScript: {
    proficiency: 85,
    experience: "1.5 years",
    description:
      "Type-safe development for large-scale React applications. Improved code quality and maintainability in team projects.",
  },
  Java: {
    proficiency: 80,
    experience: "2 years",
    description:
      "Object-oriented programming, data structures, and algorithms. Used in coursework and competitive programming.",
  },
  SQL: {
    proficiency: 88,
    experience: "2 years",
    description:
      "Complex queries, database design, and optimization. Experience with PostgreSQL, MySQL, and query performance tuning.",
  },
  R: {
    proficiency: 75,
    experience: "1 year",
    description:
      "Statistical analysis and data visualization. Used for academic research and exploratory data analysis projects.",
  },
  React: {
    proficiency: 92,
    experience: "2 years",
    description:
      "Modern React with hooks, context API, and state management. Built responsive, performant user interfaces.",
  },
  "Node.js": {
    proficiency: 85,
    experience: "2 years",
    description:
      "RESTful API development, Express.js, and real-time applications with Socket.io. Deployed production services.",
  },
  TensorFlow: {
    proficiency: 82,
    experience: "1.5 years",
    description:
      "Deep learning model development and deployment. Built CNNs, RNNs, and transformer models for various tasks.",
  },
  PyTorch: {
    proficiency: 80,
    experience: "1 year",
    description:
      "Research-oriented ML framework. Used for custom model architectures and academic projects.",
  },
  Pandas: {
    proficiency: 90,
    experience: "2.5 years",
    description:
      "Data manipulation, cleaning, and analysis. Daily use in data science workflows and ETL pipelines.",
  },
  NumPy: {
    proficiency: 88,
    experience: "2.5 years",
    description:
      "Numerical computing and array operations. Foundation for scientific computing and ML implementations.",
  },
  Git: {
    proficiency: 90,
    experience: "3 years",
    description:
      "Version control, branching strategies, and collaborative workflows. Managed multiple team projects on GitHub.",
  },
  Docker: {
    proficiency: 78,
    experience: "1 year",
    description:
      "Containerization of applications and microservices. Created CI/CD pipelines with Docker containers.",
  },
  AWS: {
    proficiency: 75,
    experience: "1 year",
    description:
      "Cloud deployment with EC2, S3, Lambda, and RDS. Built serverless applications and managed cloud infrastructure.",
  },
  MongoDB: {
    proficiency: 82,
    experience: "1.5 years",
    description:
      "NoSQL database design and aggregation pipelines. Used for flexible schema applications and real-time data.",
  },
  PostgreSQL: {
    proficiency: 85,
    experience: "2 years",
    description:
      "Advanced SQL, indexing, and database optimization. Designed normalized schemas for production applications.",
  },
  Tableau: {
    proficiency: 80,
    experience: "1.5 years",
    description:
      "Business intelligence and interactive dashboards. Created compelling data stories for stakeholder presentations.",
  },
  "Machine Learning": {
    proficiency: 88,
    experience: "2 years",
    description:
      "Supervised & unsupervised learning, feature engineering, model evaluation. Implemented algorithms from scratch.",
  },
  "Data Visualization": {
    proficiency: 90,
    experience: "2.5 years",
    description:
      "Matplotlib, Seaborn, D3.js, and Plotly. Created publication-quality visualizations and interactive dashboards.",
  },
  "RESTful APIs": {
    proficiency: 87,
    experience: "2 years",
    description:
      "API design, documentation with Swagger, authentication, and rate limiting. Built scalable backend services.",
  },
  Agile: {
    proficiency: 85,
    experience: "1.5 years",
    description:
      "Scrum methodology, sprint planning, and iterative development. Worked in agile teams during internships.",
  },
  "CI/CD": {
    proficiency: 78,
    experience: "1 year",
    description:
      "GitHub Actions, automated testing, and deployment pipelines. Implemented DevOps practices in team projects.",
  },
};

type SkillName = keyof typeof skillsData;

const skills: Record<
  "languages" | "frameworks" | "tools" | "concepts",
  string[]
> = {
  languages: ["Python", "JavaScript", "TypeScript", "Java", "SQL", "R"],
  frameworks: ["React", "Node.js", "TensorFlow", "PyTorch", "Pandas", "NumPy"],
  tools: ["Git", "Docker", "AWS", "MongoDB", "PostgreSQL", "Tableau"],
  concepts: [
    "Machine Learning",
    "Data Visualization",
    "RESTful APIs",
    "Agile",
    "CI/CD",
  ],
};

interface Project {
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "Predictive Analytics Dashboard",
    description:
      "Built a real-time ML pipeline for predicting customer churn using ensemble methods. Deployed with Flask API and React frontend.",
    tech: ["Python", "TensorFlow", "React", "AWS"],
    highlights: ["95% accuracy", "10k+ predictions/day", "Real-time updates"],
    link: "#",
  },
  {
    title: "Social Network Graph Analyzer",
    description:
      "Graph-based analysis tool for detecting communities and influence patterns in social networks using NetworkX and custom algorithms.",
    tech: ["Python", "NetworkX", "D3.js", "Neo4j"],
    highlights: [
      "100k+ nodes processed",
      "Interactive viz",
      "Graph algorithms",
    ],
    link: "#",
  },
  {
    title: "Code Collaboration Platform",
    description:
      "Real-time collaborative coding environment with syntax highlighting, live cursors, and integrated chat using WebSockets.",
    tech: ["TypeScript", "React", "WebSocket", "MongoDB"],
    highlights: ["Real-time sync", "500+ users", "Low latency"],
    link: "#",
  },
  {
    title: "Sentiment Analysis API",
    description:
      "NLP service for multi-language sentiment analysis with custom-trained BERT models. Handles 1000+ requests per minute.",
    tech: ["Python", "BERT", "FastAPI", "Docker"],
    highlights: ["92% F1-score", "Multi-language", "Dockerized"],
    link: "#",
  },
];

const isSectionId = (id: string): id is SectionId =>
  ["about", "skills", "projects", "resume"].includes(id as SectionId);

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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle scroll to control zoom
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 1600; // Distance to complete zoom
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
      setShowContent(progress > 0.65); // Show content when 70% zoomed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    camera.position.z = 5;
    
    // Create neural network nodes
    const nodes: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>[][] =
      [];
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 1,
    });

    // Create 4 layers
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
        const x = (layerIndex - 1.5) * 2; // tweak 2.5 ↔ 3.0 to taste
        const y = (i - nodeCount / 2) * 0.5 - 1.2;
        node.position.set(x, y, 0);
        scene.add(node);
        layerNodes.push(node);
        allNodes.push(node);
      }
      nodes.push(layerNodes);
    });

    // Create connections between layers
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

    // Add particles
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

      // Zoom based on scroll
      camera.position.z = 5 - scrollProgress * 8;

      // Rotate the entire network
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
      const fadeProgress = Math.max(0, scrollProgress - 0.5) * 2;
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

    // Handle resize
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
  }, [scrollProgress]);

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

{scrollProgress < 0.1 && (
  <div className="fixed inset-x-0 top-24 z-10">
    <div className="max-w-6xl mx-auto px-6 md:px-10 flex">
      {/* Text column */}
      <div className="max-w-xl pointer-events-none">
        <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-purple-300 mb-3">
          Portfolio
        </p>

        <h1 className="text-4xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg text-left">
          Neural Network
          <br />
          Portfolio
        </h1>

        <p className="text-base md:text-xl text-gray-300 mb-8 drop-shadow-md text-left">
          Computer Science &amp; Data Science
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

      {/* Empty flex space on the right so text doesn't sit over the network */}
      <div className="flex-1" />
    </div>
  </div>
)}



      {/* Spacer to enable scroll */}
      <div style={{ height: "100vh" }}></div>

      {/* Main Content - Appears after zoom */}
      <div
        className={`relative z-10 transition-opacity duration-1000 ${
          showContent ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Navigation */}
        <nav className="sticky top-0 w-full bg-slate-950/80 backdrop-blur-md z-50 border-b border-purple-500/20">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              YourName
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
                  ></div>
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
                  Passionate about building scalable, user-centric applications.
                  Experienced in full-stack development with modern frameworks
                  and cloud technologies.
                </p>
              </div>
              <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                <Database className="w-12 h-12 text-pink-400 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Data Scientist</h3>
                <p className="text-gray-300 leading-relaxed">
                  Skilled in extracting insights from complex datasets using
                  statistical analysis, machine learning, and data visualization
                  techniques.
                </p>
              </div>
            </div>
            <div className="mt-8 bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/20">
              <Brain className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold mb-4">My Journey</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                As a senior pursuing a dual major in Computer Science and Data
                Science, I'm at the intersection of software engineering and
                analytics. My journey has been driven by curiosity about how we
                can leverage technology and data to solve real-world problems.
              </p>
              <p className="text-gray-300 leading-relaxed">
                From building machine learning pipelines to developing
                full-stack applications, I thrive on challenges that push me to
                learn and innovate. I'm actively seeking opportunities where I
                can contribute to impactful projects while continuing to grow as
                a technologist.
              </p>
            </div>
            <div className="mt-8 flex gap-4 justify-center">
              <a
                href="#"
                className="p-3 bg-purple-500/20 hover:bg-purple-500/40 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="p-3 bg-purple-500/20 hover:bg-purple-500/40 rounded-full transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="#"
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
                    <ExternalLink className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                        <span
                          key={highlight}
                          className="flex items-center gap-1"
                        >
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
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
                Interested in learning more about my experience and
                qualifications?
              </p>
              <div className="flex gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                  Download Resume
                </button>
                <button className="px-8 py-4 bg-slate-800 rounded-full font-semibold border border-purple-500/50 hover:bg-slate-700 transition-all duration-300 hover:scale-105">
                  View Online
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-20 pt-8 border-t border-purple-500/20">
              <p className="text-gray-400 mb-4">
                Let's build something amazing together
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="mailto:your.email@example.com"
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  your.email@example.com
                </a>
              </div>
              <p className="text-gray-500 text-sm mt-8">
                © 2025 Your Name. Built with React & Tailwind CSS
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Portfolio;
