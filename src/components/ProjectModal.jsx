import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const gridRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Images du carousel (pour l'instant on utilise la même image, mais vous pouvez en ajouter plusieurs)
  const images = project?.images || [project?.image];

  useEffect(() => {
    if (!modalRef.current || !contentRef.current) return;

    if (isOpen) {
      // Réinitialiser l'index du carousel
      setCurrentImageIndex(0);

      // Animation d'ouverture
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 },
      );
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.4)" },
      );
      document.body.style.overflow = "hidden";

      // Animation de la grille en diagonale (infinie et lente)
      if (gridRef.current) {
        gsap.to(gridRef.current, {
          backgroundPosition: "200% 200%",
          duration: 60,
          ease: "none",
          repeat: -1,
        });
      }
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    });
    gsap.to(modalRef.current, { opacity: 0, duration: 0.3 });
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  if (!isOpen || !project) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-6xl glass rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={handleClose}
          className="absolute top-6 left-6 z-10 w-12 h-12 rounded-full border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all duration-300 flex items-center justify-center text-2xl font-bold"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2 gap-0 min-h-[600px]">
          {/* Image/Vidéo à gauche */}
          <div className="relative overflow-hidden bg-dark-bg">
            <img
              src={images[currentImageIndex]}
              alt={project.title}
              className="w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Grille de fond animée */}
            <div
              ref={gridRef}
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(57, 255, 20, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(57, 255, 20, 0.3) 1px, transparent 1px)",
                backgroundSize: "30px 30px",
                backgroundPosition: "0% 0%",
              }}
            ></div>

            {/* Navigation par points */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer hover:scale-125 ${
                    index === currentImageIndex
                      ? "bg-neon-green"
                      : "bg-white opacity-50"
                  }`}
                ></button>
              ))}
            </div>

            {/* Flèches de navigation */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all duration-300 flex items-center justify-center z-10"
                >
                  ←
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 border border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all duration-300 flex items-center justify-center z-10"
                >
                  →
                </button>
              </>
            )}
          </div>

          {/* Informations à droite */}
          <div
            className="bg-dark-surface p-8 md:p-12 overflow-y-auto"
            style={{ marginLeft: "1rem" }}
          >
            <h2
              className="text-4xl md:text-5xl font-bold text-white mb-6 uppercase font-mono leading-tight"
              style={{ marginLeft: "1rem" }}
            >
              {project.title}
            </h2>

            {/* Tags */}
            <div
              className="flex flex-wrap gap-2 mb-8"
              style={{ marginLeft: "1rem" }}
            >
              {project.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono bg-dark-bg border border-neon-green/50 text-neon-green rounded"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Sous-titre */}
            <p
              className="text-gray-400 mb-8 text-sm"
              style={{ marginLeft: "1rem" }}
            >
              {project.subtitle}
            </p>

            {/* Informations détaillées */}
            <div className="space-y-6" style={{ marginLeft: "1rem" }}>
              {project.client && (
                <div>
                  <h3 className="text-neon-green text-xs font-mono mb-2">
                    Client
                  </h3>
                  <p className="text-white font-mono text-sm">
                    {project.client}
                  </p>
                </div>
              )}

              {project.partner && (
                <div>
                  <h3 className="text-neon-green text-xs font-mono mb-2">
                    Cooperative Partner
                  </h3>
                  <p className="text-white font-mono text-sm leading-relaxed">
                    {project.partner}
                  </p>
                </div>
              )}

              {project.date && (
                <div>
                  <h3 className="text-neon-green text-xs font-mono mb-2">
                    Date
                  </h3>
                  <p className="text-white font-mono text-sm">{project.date}</p>
                </div>
              )}

              {project.location && (
                <div>
                  <h3 className="text-neon-green text-xs font-mono mb-2">
                    Location
                  </h3>
                  <p className="text-white font-mono text-sm">
                    {project.location}
                  </p>
                </div>
              )}

              {project.brands && (
                <div>
                  <h3 className="text-neon-green text-xs font-mono mb-2">
                    Collaborating Brands
                  </h3>
                  <p className="text-white font-mono text-sm">
                    {project.brands}
                  </p>
                </div>
              )}

              {project.artists && (
                <div>
                  <h3 className="text-neon-green text-xs font-mono mb-2">
                    Artists
                  </h3>
                  <p className="text-white font-mono text-sm">
                    {project.artists}
                  </p>
                </div>
              )}
            </div>

            {/* Tableau Art/Tech */}
            {project.artTech && (
              <div className="mt-8 border border-gray-700">
                <table className="w-full text-xs font-mono">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="p-3 text-left text-neon-green">Art</th>
                      <th className="p-3 text-left border-l border-gray-700 text-white">
                        [S]
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 text-white">VIRTUAL</td>
                      <td className="p-3 border-l border-gray-700 text-white">
                        REAL
                      </td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="p-3 text-white">[S]</td>
                      <td className="p-3 border-l border-gray-700 text-white">
                        [1]
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 text-white">Tech</td>
                      <td className="p-3 border-l border-gray-700 text-white">
                        [S]
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
