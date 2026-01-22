import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  const projects = [
    {
      id: 1,
      title: "GLITCH IN ALL DIRECTIONS",
      description: "The world's first cloud-rendered virtual concert",
      tech: ["Three.js", "React", "GSAP"],
      color: "neon-green",
      image:
        "https://images.unsplash.com/photo-1614854262340-ab1ca7d079c7?w=800&q=80", // Placeholder
    },
    {
      id: 2,
      title: "THE PERFECT DAY",
      description: "Offline Immersive Theater Gamification Upgrade",
      tech: ["React", "WebGL", "Tailwind"],
      color: "neon-blue",
      image:
        "https://images.unsplash.com/photo-1533158326339-7f3cf2404354?w=800&q=80", // Placeholder
    },
    {
      id: 3,
      title: "THE ERA OF BLACK ARK",
      description: "The Spiritual Journey on the Grassland of Folk Rock Po",
      tech: ["GSAP", "React", "CSS"],
      color: "neon-purple",
      image:
        "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80", // Placeholder
    },
    {
      id: 4,
      title: "A SONG OF ICE AND FIRE",
      description: "Weifang vs MIXUE Online Digital Marketing",
      tech: ["WebXR", "Three.js", "React"],
      color: "neon-green",
      image:
        "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800&q=80", // Placeholder
    },
  ];

  return (
    <section
      id="projets"
      ref={sectionRef}
      className="min-h-screen py-20 px-6 md:px-12 lg:px-16 bg-dark-bg"
    >
      <div className="container mx-auto max-w-7xl px-4">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-16 font-mono"
        >
          <span className="text-neon-green">//</span> Projets
        </h2>

        {/* Grid régulière */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative h-[400px] rounded-lg cursor-pointer overflow-hidden"
              style={{
                transformStyle: "preserve-3d",
              }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={handleMouseLeave}
              onMouseEnter={() => setHoveredCard(project.id)}
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
                  transformStyle: "preserve-3d",
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
                  <div className="space-y-2 max-w-[90%] p-3 group-hover:bg-neon-green transition-all duration-300 w-fit">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-black transition-all duration-300 uppercase font-mono">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 group-hover:text-black text-xs md:text-sm font-mono transition-all duration-300">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs font-mono bg-dark-bg/80 border border-neon-green/30 rounded text-neon-green backdrop-blur-sm group-hover:bg-neon-green group-hover:text-black group-hover:border-neon-green transition-all duration-300"
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
    </section>
  );
}

export default Projects;
