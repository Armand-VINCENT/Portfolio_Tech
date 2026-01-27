import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrambleText } from "../hooks/useScrambleText";
import ProjectModal from "./ProjectModal";
import CircularFilter from "./CircularFilter";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [startScramble, setStartScramble] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const scrambledText = useScrambleText("Projets", 1500, startScramble);

  const handleMouseMove = (e, projectId) => {
    const content = e.currentTarget.querySelector(".project-content");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;

    if (content) {
      content.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
    }
  };

  const handleMouseLeave = (e) => {
    const content = e.currentTarget.querySelector(".project-content");
    if (content) {
      content.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
    }
  };
  useEffect(() => {
    console.log("✅ [Projects] Bento Grid des projets montée");

    if (!titleRef.current || !gridRef.current || !sectionRef.current) {
      console.warn("⚠️ [Projects] Refs non disponibles");
      return;
    }

    gsap.fromTo(
      titleRef.current,
      {
        x: -100,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          onEnter: () => setStartScramble(true),
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        clearProps: "all",
      },
    );

    gsap.fromTo(
      gridRef.current.children,
      {
        scale: 0.8,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        clearProps: "all",
      },
    );
  }, []);

  const categories = [
    "All",
    "Tech & Innovation",
    "Art & Design",
    "Marketing & Events",
    "Multimedia",
    "VR/AR/XR",
    "Digital Experience",
  ];

  const projects = [
    {
      id: 1,
      title: "GLITCH IN ALL DIRECTIONS",
      description: "The world's first cloud-rendered virtual concert",
      subtitle: "an DXT23 original series",
      category: "Tech & Innovation",
      tech: ["Three.js", "React", "GSAP"],
      tags: ["Tech R&D", "Art Creation", "Virtual Concert"],
      color: "neon-green",
      image:
        "https://images.unsplash.com/photo-1614854262340-ab1ca7d079c7?w=800&q=80",
      client: "DXT23 / Bitsrealm / Next Generation",
      partner:
        "Noitom / Agora / D-Rock Art / Atelier Archimiking / Younger Culture / GOLDEN DOG / Tintin design / Tencent Art / BillBill / Noff studio / HOODLY Design",
      date: "26/05/2022",
      location: "online",
      brands: "MMAGPY",
      artists: "JAFFERSON / MUYI / Cherry",
      artTech: true,
    },
    {
      id: 2,
      title: "THE PERFECT DAY",
      description: "Offline Immersive Theater Gamification Upgrade",
      subtitle: "an interactive experience",
      category: "Art & Design",
      tech: ["React", "WebGL", "Tailwind"],
      tags: ["Interactive", "Theater", "Gamification"],
      color: "neon-blue",
      image:
        "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=800&q=80",
      client: "Creative Studio X",
      partner: "Various theater companies and tech partners",
      date: "15/08/2023",
      location: "Paris, France",
      brands: "TheaterTech",
      artists: "Multiple collaborators",
      artTech: true,
    },
    {
      id: 3,
      title: "THE ERA OF BLACK ARK",
      description: "The Spiritual Journey on the Grassland of Folk Rock Po",
      subtitle: "a musical odyssey",
      category: "Art & Design",
      tech: ["GSAP", "React", "CSS"],
      tags: ["Music", "Cultural", "Interactive"],
      color: "neon-purple",
      image:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
      client: "Folk Rock Productions",
      partner: "Local artists and cultural organizations",
      date: "03/12/2023",
      location: "Mongolia",
      brands: "CulturalTech",
      artists: "Folk ensemble collective",
      artTech: true,
    },
    {
      id: 4,
      title: "A SONG OF ICE AND FIRE",
      description: "Weifang vs MIXUE Online Digital Marketing",
      subtitle: "digital campaign",
      category: "Marketing & Events",
      tech: ["WebXR", "Three.js", "React"],
      tags: ["Marketing", "Digital", "Interactive"],
      color: "neon-green",
      image:
        "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&q=80",
      client: "MIXUE Corporation",
      partner: "Digital marketing agencies",
      date: "20/06/2024",
      location: "China",
      brands: "MIXUE",
      artists: "Marketing team",
      artTech: true,
    },
    {
      id: 5,
      title: "NEON CITY EXPLORER",
      description: "Interactive 3D Web Experience for Urban Navigation",
      subtitle: "next-gen city guide",
      category: "Tech & Innovation",
      tech: ["Three.js", "WebGL", "Node.js"],
      tags: ["3D", "Navigation", "Real-time"],
      color: "neon-blue",
      image:
        "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
      client: "Urban Tech Solutions",
      partner: "Smart City Initiative / Tech Innovators Collective",
      date: "12/03/2024",
      location: "Tokyo, Japan",
      brands: "CityExplorer",
      artists: "Digital Development Team",
      artTech: true,
    },
    {
      id: 6,
      title: "DIGITAL RENAISSANCE",
      description: "NFT Art Gallery with Generative AI Integration",
      subtitle: "where art meets AI",
      category: "Art & Design",
      tech: ["AI/ML", "Blockchain", "React"],
      tags: ["NFT", "Generative Art", "Web3"],
      color: "neon-purple",
      image:
        "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80",
      client: "ArtTech Gallery",
      partner: "AI Artists Collective / Blockchain Foundation",
      date: "18/09/2024",
      location: "online",
      brands: "ArtificeAI",
      artists: "Various AI-assisted artists",
      artTech: true,
    },
    {
      id: 7,
      title: "FESTIVAL OF LIGHTS",
      description: "Brand Activation for Annual Music Festival",
      subtitle: "immersive brand experience",
      category: "Marketing & Events",
      tech: ["Projection Mapping", "Interactive LED", "RFID"],
      tags: ["Festival", "Brand Activation", "Live Events"],
      color: "neon-green",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
      client: "Major Brand Corp",
      partner: "Event Production Company / Tech Partners",
      date: "05/07/2025",
      location: "Los Angeles, USA",
      brands: "BrandX",
      artists: "Festival Crew & Performers",
      artTech: true,
    },
    {
      id: 8,
      title: "METAVERSE FASHION WEEK",
      description: "Virtual Fashion Show in Decentralized Metaverse",
      subtitle: "fashion meets the future",
      category: "VR/AR/XR",
      tech: ["Unreal Engine", "Blockchain", "WebXR"],
      tags: ["Metaverse", "Fashion", "Virtual Reality"],
      color: "neon-blue",
      image:
        "https://images.unsplash.com/photo-1558769132-cb1aea672c5e?w=800&q=80",
      client: "Fashion Forward Collective",
      partner: "Decentraland / Meta / Fashion Brands Alliance",
      date: "10/11/2025",
      location: "Metaverse",
      brands: "FashionVerse",
      artists: "Digital Fashion Designers",
      artTech: true,
    },
    {
      id: 9,
      title: "HOLOGRAPHIC CONCERT SERIES",
      description: "Live Hologram Performances with AI Musicians",
      subtitle: "beyond reality concerts",
      category: "Multimedia",
      tech: ["Holography", "AI", "Real-time Rendering"],
      tags: ["Hologram", "Live Performance", "AI Music"],
      color: "neon-purple",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80",
      client: "Future Entertainment Corp",
      partner: "AI Music Labs / Hologram Tech Industries",
      date: "22/04/2025",
      location: "Global Tour",
      brands: "HoloBeats",
      artists: "AI-Generated Performers",
      artTech: true,
    },
    {
      id: 10,
      title: "QUANTUM LEARNING PLATFORM",
      description: "AI-Powered Adaptive Education System",
      subtitle: "education reimagined",
      category: "Tech & Innovation",
      tech: ["AI/ML", "Quantum Computing", "React"],
      tags: ["EdTech", "AI", "Adaptive Learning"],
      color: "neon-green",
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
      client: "EduFuture Institute",
      partner: "Quantum Research Labs / EdTech Consortium",
      date: "08/01/2024",
      location: "online",
      brands: "QuantumLearn",
      artists: "Educational Content Creators",
      artTech: true,
    },
    {
      id: 11,
      title: "AUGMENTED MUSEUM EXPERIENCE",
      description: "AR-Enhanced Historical Exhibitions",
      subtitle: "history comes alive",
      category: "Digital Experience",
      tech: ["ARKit", "Unity", "Cloud Anchors"],
      tags: ["Augmented Reality", "Museum", "Education"],
      color: "neon-blue",
      image:
        "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80",
      client: "National Museum Association",
      partner: "AR Solutions / Cultural Heritage Foundation",
      date: "14/09/2024",
      location: "Museums Worldwide",
      brands: "ARMuseum",
      artists: "Historians & AR Developers",
      artTech: true,
    },
    {
      id: 12,
      title: "SYNESTHETIC SOUNDSCAPES",
      description: "Multi-sensory Audio-Visual Installation",
      subtitle: "see the sound, hear the colors",
      category: "Multimedia",
      tech: ["Creative Coding", "Sensors", "Projection Mapping"],
      tags: ["Installation", "Synesthesia", "Interactive Art"],
      color: "neon-purple",
      image:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&q=80",
      client: "Contemporary Art Museum",
      partner: "Sound Artists / Visual Designers Collective",
      date: "30/06/2025",
      location: "Berlin, Germany",
      brands: "SynestheArt",
      artists: "Multimedia Artists Collective",
      artTech: true,
    },
    {
      id: 13,
      title: "VIRTUAL TWIN CITY",
      description: "Digital Twin Simulation for Urban Planning",
      subtitle: "building tomorrow's cities today",
      category: "Digital Experience",
      tech: ["Digital Twin", "IoT", "Data Visualization"],
      tags: ["Smart City", "Simulation", "Urban Planning"],
      color: "neon-green",
      image:
        "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&q=80",
      client: "City Planning Department",
      partner: "IoT Solutions / Urban Development Corp",
      date: "17/02/2024",
      location: "Singapore",
      brands: "CityTwin",
      artists: "Urban Planners & Data Scientists",
      artTech: true,
    },
  ];

  // Filtrer les projets par catégorie
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    // Animation en cascade style masonry - force l'animation même pour les éléments déjà présents
    if (gridRef.current) {
      // Réinitialiser d'abord tous les éléments
      gsap.set(gridRef.current.children, {
        y: 100,
        opacity: 0,
      });

      // Puis les animer en cascade
      gsap.to(gridRef.current.children, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: {
          amount: 0.4,
          from: "start",
          ease: "power2.out",
        },
        ease: "power3.out",
      });
    }
  };

  return (
    <section
      id="projets"
      ref={sectionRef}
      className="min-h-screen py-20 px-6 md:px-12 lg:px-16 bg-dark-bg"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <h2
          style={{ marginLeft: "1rem", marginTop: "2rem" }}
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-24 font-mono cursor-pointer"
          onMouseEnter={() => setStartScramble(false)}
          onMouseLeave={() => setTimeout(() => setStartScramble(true), 50)}
        >
          <span className="text-neon-green">//</span> {scrambledText}
        </h2>

        {/* Filtre circulaire rotatif */}
        <div className="mb-16">
          <CircularFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            projects={projects}
          />
        </div>

        {/* Grid régulière */}
        <div
          style={{
            marginBottom: "2rem",
            marginLeft: "1rem",
            marginTop: "2rem",
          }}
          ref={gridRef}
          className=" grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className="group relative h-[400px] rounded-lg cursor-pointer"
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
                zIndex: hoveredCard === project.id ? 50 : 1,
                transition: "z-index 0s",
                willChange: "transform",
                transform: "translateZ(0)",
                isolation: "isolate",
              }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setHoveredCard(project.id)}
              onClick={() => handleProjectClick(project)}
            >
              {/* Grille fixe en arrière-plan (visible au hover) */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(57, 255, 20, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.15) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                  backgroundColor: "#0a0a0a",
                }}
              ></div>

              {/* Contenu qui bouge en 3D */}
              <div
                className="project-content absolute inset-0 rounded-lg transition-transform duration-300 ease-out"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {/* Image de fond */}
                <div
                  className="absolute inset-0 bg-cover bg-center rounded-lg transition-transform duration-500 group-hover:scale-[0.8]"
                  style={{
                    backgroundImage: `url(${project.image})`,
                  }}
                >
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-dark-bg via-dark-bg/60 to-transparent rounded-lg"></div>
                </div>

                {/* Contenu texte */}
                <div className="relative h-full flex flex-col justify-end p-8 pl-10 z-10">
                  <div
                    className="space-y-2 max-w-[90%] p-3"
                    style={{ marginLeft: "1rem" }}
                  >
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-black transition-colors duration-300 uppercase font-mono group-hover:bg-neon-green w-fit">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-black transition-colors duration-300 text-xs md:text-sm font-mono group-hover:bg-neon-green w-fit">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-dark-bg/80 border border-neon-green/30 rounded text-neon-green group-hover:text-black backdrop-blur-sm transition-colors duration-300 group-hover:bg-neon-green w-fit"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div
                  className={`absolute top-4 right-4 w-16 h-16 bg-${project.color}/20 blur-xl group-hover:blur-2xl transition-all duration-300 rounded-full`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal de détails du projet */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}

export default Projects;
