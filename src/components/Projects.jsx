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
    "UI/UX",
    "Création d'identité",
    "Multimedia",
    "Motion Design",
    "VR/AR/XR",
    "Digital Experience",
  ];

  const projects = [
    {
      id: 1,
      title: "Projet Figma - Smash App",
      description:
        "Pour un projet universitaire j'ai crée un prototype d'une application avec un concept du monde réel qui peut servir à des personnages d'un univers fictif. Pour réaliser mon projet nous devions créer au minimum 7 écrans différents.",
      subtitle: "Prototype universitaire",
      category: [
        "Tech & Innovation",
        "Art & Design",
        "Digital Experience",
        "UI/UX",
      ],
      tech: ["Figma", "UI/UX", "Prototyping"],
      tags: ["UI/UX Design", "Mobile App", "Prototype"],
      color: "neon-purple",
      image: "./images/SmashApp.png",
      client: "Projet Universitaire",
      partner: "École - Projet personnel",
      date: "2024",
      location: "France",
      brands: "Smash Bros Universe",
      artists: "Armand VINCENT",
      artTech: true,
      // ✅ Lien vers le prototype Figma
      prototypeLink:
        "https://www.figma.com/proto/PhUXpPks4LxRu92b8k2QQv/Armand-VINCENT-Smash-Bros-(Copy)?page-id=273%3A4261&node-id=271-22920&node-type=frame&viewport=1371%2C722%2C0.28&t=htd4Wg2MaFaTrFb3-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=271%3A22920&show-proto-sidebar=1",
    },
    {
      id: 2,
      title: "Sea See Bar à Illusions",
      description:
        "Dans le cadre d'un projet universitaire, j'ai crée l'intégralité de l'identité d'un bar à illusions à Berne. J'ai réalisé le logo, la charte graphique, les menus, les cartes de fidélité ainsi que le design du site web.",
      subtitle: "Identité visuelle complète",
      category: [
        "Art & Design",
        "Multimedia",
        "Digital Experience",
        "UI/UX",
        "Création d'identité",
      ],
      tech: ["Illustrator", "Photoshop", "Figma"],
      tags: ["UI/UX Design", "Charte Graphique", "Prototype"],
      color: "neon-blue",
      image: "./images/BarIllusion.png",
      client: "Projet Universitaire",
      partner: "École - Projet personnel",
      date: "2024",
      location: "Berne, Suisse",
      brands: "Sea See Bar",
      artists: "Armand VINCENT",
      artTech: true,
      prototypeLink:
        "https://www.figma.com/proto/ZMkQ6KMEfnab98kzB50XPw/SAE-4.01-Bar-illusion-Berne?page-id=402%3A2633&node-id=402-2733&viewport=532%2C321%2C0.26&t=hklSLLMxJ1PtBsXt-1&scaling=min-zoom&content-scaling=fixed",
      pdfLink: "./SemioSeeSea_ArmandVINCENT.pdf",
      galleryImages: [
        "./images/ComPressSeeSea.png",
        "./images/CarteSeeSea.png",
        "./images/PromoSeeSea.png",
      ],
    },
    {
      id: 3,
      title: "Monster Hunter Wild",
      description:
        "Afin de développer mes capacités en prototypage, j'ai réalisé un projet fictif basé sur l'univers de Monster Hunter.",
      subtitle: "Projet de développement personnel",
      category: ["Art & Design", "UI/UX"],
      tech: ["Figma", "UI/UX", "Game Design"],
      tags: ["UI/UX Design", "Prototype", "Projet Personnel"],
      color: "neon-green",
      image: "./images/MHW.png",
      client: "Projet Personnel",
      partner: "Développement de compétences",
      date: "2024",
      location: "France",
      brands: "Monster Hunter Universe",
      artists: "Armand VINCENT",
      artTech: true,
      prototypeLink:
        "https://www.figma.com/proto/OfvpbXXs774Ly32eGuIdML/futuristic?page-id=226%3A677&node-id=226-678&t=dp4vz2LJBzTZmt8x-1",
    },
    {
      id: 4,
      title: "Olive Oil Website",
      description:
        "Dans le cadre d'un projet universitaire, j'ai réalisé le design complet d'un site web one page pour une entreprise fictive spécialisée dans la vente d'huile d'olive haut de gamme.",
      subtitle: "Site web one page",
      category: ["Art & Design", "UI/UX", "Création d'identité"],
      tech: ["Figma", "Web Design", "UI/UX"],
      tags: ["UI/UX Design", "Prototype", "One Page"],
      color: "neon-purple",
      image: "./images/OliveOil.png",
      client: "Projet Universitaire",
      partner: "École - Projet personnel",
      date: "2024",
      location: "France",
      brands: "Olive Oil Premium",
      artists: "Armand VINCENT",
      artTech: true,
      prototypeLink:
        "https://www.figma.com/proto/UKmxBhCHPB9ZiV3Xz3kbgO/Armand-VINCENT---Olive-OIL?page-id=2001%3A35&node-id=2081-508&viewport=919%2C815%2C0.2&t=BB7COHhyBGZ53T5r-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2081%3A508",
    },
    {
      id: 5,
      title: "Flyers Pour Hiero",
      description:
        "Pour un rendu scolaire et fictif j'ai conçu des flyers promotionnels pour Hiero, utilisant des éléments références culturelles.",
      subtitle: "Design graphique promotionnel",
      category: "Art & Design",
      tech: ["Photoshop", "Graphic Design", "Digital Painting"],
      tags: ["Flyers", "Digital Painting", "Photoshop"],
      color: "neon-green",
      image: "./images/HieroBig.png",
      images: [
        "./images/Hiero1.png",
        "./images/Hiero2.png",
        "./images/Hiero3.png",
      ],
      client: "Projet Scolaire",
      partner: "École - Projet fictif",
      date: "2024",
      location: "France",
      brands: "Hiero",
      artists: "Armand VINCENT",
      artTech: true,
      pdfLink: "./VINCENT_ARMAND_HIERO.pdf",
    },
    {
      id: 6,
      title: "Smash Limoges League",
      description:
        "Pour une association qui organise des tournois sur le jeu Super Smash Bros Ultimate, j'ai réalisé 4 logos ainsi qu'une bande-annonce de présentation du projet de league. L'objectif était de réaliser un logo principal pour la league ainsi que 3 autres logos pour les différentes équipes.",
      subtitle: "Identité visuelle et trailer",
      category: ["Art & Design", "Création d'identité"],
      tech: ["Illustrator", "After Effects", "Motion Design"],
      tags: ["Logo Design", "Association", "Trailer"],
      color: "neon-blue",
      image: "./images/SLLBig.png",
      images: [
        "./images/AlunOffi.png",
        "./images/SACOffi.png",
        "./images/RacloOffi.png",
      ],
      client: "Association Smash Limoges",
      partner: "Communauté Super Smash Bros",
      date: "2024",
      location: "Limoges, France",
      brands: "Smash Limoges League",
      artists: "Armand VINCENT",
      artTech: true,
      pdfLink: "./PDFSLL.pdf",
    },
    {
      id: 7,
      title: "Poster Style Brutalism de Chainsaw Man",
      description:
        "Dans mon temps personnel afin de m'améliorer sur photoshop et de travailler le style Brutaliste j'ai réalisé un poster basé sur le thème du manga chainsaw man",
      subtitle: "Exploration graphique personnelle",
      category: "Art & Design",
      tech: ["Photoshop", "Graphic Design", "Brutalism"],
      tags: ["Poster", "Brutalisme", "Photoshop"],
      color: "neon-purple",
      image: "./images/ChainsawmanBig.png",
      images: ["./images/PosterChainsawMan.png"],
      client: "Projet Personnel",
      partner: "Développement créatif",
      date: "2024",
      location: "France",
      brands: "Chainsaw Man",
      artists: "Armand VINCENT",
      artTech: true,
    },
    {
      id: 8,
      title: "Illustration d'un ami avec des personnages de Smash Bros",
      description:
        "Dans le cadre d'un cadeau pour un ami fan de Smash Bros j'ai réalisé une illustration numérique le représentant avec ses personnages favoris du jeu.",
      subtitle: "Cadeau personnalisé",
      category: "Art & Design",
      tech: ["Photoshop", "Digital Painting", "Illustration"],
      tags: ["Illustration", "Digital Painting", "Photoshop"],
      color: "neon-green",
      image: "./images/SmashDraw.JPEG",
      client: "Projet Personnel",
      partner: "Cadeau pour un ami",
      date: "2024",
      location: "France",
      brands: "Super Smash Bros",
      artists: "Armand VINCENT",
      artTech: true,
    },
    {
      id: 9,
      title: "Une frise Chronologique sur l'histoire du Design",
      description:
        "Dans le cadre d'un projet universitaire, j'ai réalisé une frise chronologique retraçant l'évolution du design à travers les âges, mettant en avant les mouvements clés et les figures influentes. L'objectif était de créer une représentation claire, originale et attrayante.",
      subtitle: "Chronologie visuelle du design",
      category: ["Art & Design", "UI/UX", "Multimedia"],
      tech: ["Illustrator", "Graphic Design", "Layout"],
      tags: ["Illustrator", "Mise en page", "Prototype"],
      color: "neon-blue",
      image: "./images/FriseChronoDesign.png",
      client: "Projet Universitaire",
      partner: "École - Projet personnel",
      date: "2024",
      location: "France",
      brands: "Histoire du Design",
      artists: "Armand VINCENT",
      artTech: true,
      prototypeLink:
        "https://www.figma.com/proto/QomOxqpQrFSuVIMdO7tXQ7/Frise-chrono-design?page-id=0%3A1&node-id=1-5&viewport=512%2C551%2C0.19&t=LC0NSNukEMWKTwEK-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=1%3A5",
    },
    {
      id: 10,
      title: "Illustration de personnage du domaine de la céramique",
      description:
        "Une illustration numérique représentant plusieurs personnages travaillant dans le domaine de la céramique, mettant en avant les outils et métiers que l'on oublie.",
      subtitle: "Valorisation des métiers artisanaux",
      category: "Art & Design",
      tech: ["Illustrator", "Illustration", "Character Design"],
      tags: ["Illustrator", "Céramique", "Personnages"],
      color: "neon-purple",
      image: "./images/IlluCéramiqueBig.png",
      client: "Projet Personnel",
      partner: "Exploration artistique",
      date: "2024",
      location: "France",
      brands: "Métiers de la Céramique",
      artists: "Armand VINCENT",
      artTech: true,
    },
    {
      id: 11,
      title: "Illustration d'un dessin réalisé de l'IUT du Limousin",
      description:
        "Une illustration numérique réalisé sur la base d'une photo prise d'un batiment de l'IUT du Limousin. Le but était de faire découvrir le lieu sous un autre angle avec un style graphique différent.",
      subtitle: "Réinterprétation graphique",
      category: "Art & Design",
      tech: ["Illustrator", "Illustration", "Vector Art"],
      tags: ["Illustrator", "Batiment", "Couleurs"],
      color: "neon-green",
      image: "./images/Iut1.png",
      images: ["./images/Iut2.png", "./images/Iut3.png", "./images/Iut4.png"],
      client: "Projet Personnel",
      partner: "IUT du Limousin",
      date: "2024",
      location: "Limousin, France",
      brands: "IUT du Limousin",
      artists: "Armand VINCENT",
      artTech: true,
      pdfLink: "./RechercheIUTIllu.pdf",
    },
    {
      id: 12,
      title: "Pricing Card Design codé en Astro",
      description:
        "Un projet scolaire où j'ai codé une page de tarification (pricing card) en utilisant le framework Astro, mettant en avant mes compétences en développement web.",
      subtitle: "Développement web Astro",
      category: "Tech & Innovation",
      tech: ["Astro", "HTML", "CSS"],
      tags: ["UI/UX Design", "Mobile App", "Prototype"],
      color: "neon-blue",
      image: "./images/PricingCard.png",
      client: "Projet Scolaire",
      partner: "École - Projet personnel",
      date: "2024",
      location: "France",
      brands: "Astro Framework",
      artists: "Armand VINCENT",
      artTech: true,
      liveLink: "https://armand-vincent.github.io/CardPrices/",
    },
    {
      id: 13,
      title: "Site web data visualization sur la culture en france",
      description:
        "Un site web axé sur la data visualization, présentant des données culturelles de manière interactive et engageante. Le design met en avant la clarté et l'accessibilité des informations. La particularité de ce projet est d'avoir été codé entièrement avec une alternance entre scroll horizontal et vertical. Il a également été réalisé avec des illustrations personnalisées.",
      subtitle: "Data visualization interactive",
      category: ["Tech & Innovation", "Art & Design", "Digital Experience"],
      tech: ["HTML", "CSS", "JavaScript"],
      tags: ["UI/UX Design", "Mobile App", "Prototype"],
      color: "neon-purple",
      image: "./images/SiteBob.png",
      client: "Projet Universitaire",
      partner: "École - Projet personnel",
      date: "2024",
      location: "France",
      brands: "Culture en France",
      artists: "Armand VINCENT",
      artTech: true,
      liveLink: "https://armand-vincent.github.io/SAE303-DataVIZ/",
    },
    {
      id: 14,
      title: "3D world Website VR",
      description:
        "Un site web en 3D immersif, permettant aux utilisateurs de naviguer dans un environnement virtuel interactif. Avec une ambiance calme et relaxante au coin d'un feu de camp.",
      subtitle: "Expérience VR immersive",
      category: ["VR/AR/XR", "Tech & Innovation"],
      tech: ["aFrame", "HTML", "JavaScript"],
      tags: ["HTML/CSS/JS", "aFrame", "Réalité Virtuelle"],
      color: "neon-green",
      image: "./images/Scene3D.png",
      client: "Projet Personnel",
      partner: "École - Projet personnel",
      date: "2024",
      location: "France",
      brands: "VR Experience",
      artists: "Armand VINCENT",
      artTech: true,
      liveLink: "https://armand-vincent.github.io/Scene3D/",
    },
    {
      id: 15,
      title: "Premier Motion Design",
      description:
        "Mon tout premier motion design réalisé lors de ma formation. Il m'a appris à préparer un fichier illustrator pour s'en servir dans After Effects.",
      subtitle: "Initiation au motion design",
      category: ["Art & Design", "Multimedia", "Motion Design"],
      tech: ["After Effects", "Illustrator", "Animation"],
      tags: ["Illustration", "Paysage", "Motion Design"],
      color: "neon-blue",
      image: "./images/Motion1.png",
      client: "Projet de Formation",
      partner: "École - Apprentissage",
      date: "2024",
      location: "France",
      brands: "Motion Design",
      artists: "Armand VINCENT",
      artTech: true,
      videoLink: "https://youtu.be/mhQe19bGl18",
    },
    {
      id: 16,
      title: "Petite animation Motion Design",
      description:
        "Afin de m'améliorer en animation j'ai réalisé ce petit projet de motion design. Une animation basique fluide et bouclée qui joue sur la profondeur et les couleurs.",
      subtitle: "Animation loop satisfaisante",
      category: ["Art & Design", "Multimedia", "Motion Design"],
      tech: ["After Effects", "Animation", "Motion Design"],
      tags: ["Boucle", "Profondeur", "Satisfaisant"],
      color: "neon-purple",
      image: "./images/Motion2.png",
      client: "Projet Personnel",
      partner: "Développement de compétences",
      date: "2024",
      location: "France",
      brands: "Motion Design",
      artists: "Armand VINCENT",
      artTech: true,
      videoLink: "https://youtu.be/2nYNLCVn_C4",
    },
    {
      id: 17,
      title: "Space Motion Design",
      description:
        "Un projet personnel où j'ai exploré des techniques avancées de motion design pour créer une animation spatiale immersive et captivante.",
      subtitle: "Animation spatiale immersive",
      category: ["Art & Design", "Multimedia", "Motion Design"],
      tech: ["After Effects", "Animation", "Audio Sync"],
      tags: ["Morphing", "Synchro Audio", "Motion Design"],
      color: "neon-green",
      image: "./images/Motion3.png",
      client: "Projet Personnel",
      partner: "Exploration créative",
      date: "2024",
      location: "France",
      brands: "Space Motion",
      artists: "Armand VINCENT",
      artTech: true,
      videoLink: "https://youtu.be/dOsoB8qyiZc",
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
