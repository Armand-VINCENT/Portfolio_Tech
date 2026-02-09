import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const gridRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

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
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center px-4 overflow-y-auto py-4 md:py-0"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
      onClick={handleClose}
    >
      <div
        ref={contentRef}
        className="relative w-full max-w-6xl glass rounded-lg overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture - Sticky sur mobile */}
        <button
          onClick={handleClose}
          className="sticky md:absolute top-0 md:top-6 left-0 md:left-6 z-10 w-12 h-12 rounded-full border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all duration-300 flex items-center justify-center text-2xl font-bold bg-dark-bg md:bg-transparent m-4 md:m-0"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2 gap-0 min-h-[600px]">
          {/* Image/Vidéo à gauche */}
          <div className="relative overflow-hidden bg-dark-bg flex items-center justify-center">
            <img
              src={images[currentImageIndex]}
              alt={project.title}
              className="w-full h-full object-contain transition-opacity duration-500"
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
            className="bg-dark-surface p-8 md:p-12 overflow-y-auto max-h-[70vh] md:max-h-none"
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

            {/* Boutons prototype, PDF, Live Site et Vidéo */}
            <div className="mt-8 flex flex-wrap gap-4">
              {project.prototypeLink && (
                <a
                  href={project.prototypeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-neon-green text-black font-mono font-bold rounded-lg hover:bg-neon-blue transition-colors duration-300 group"
                >
                  <span>Voir le prototype</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              )}

              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-neon-blue text-black font-mono font-bold rounded-lg hover:bg-neon-green transition-colors duration-300 group"
                >
                  <span>Voir le site</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </a>
              )}

              {project.videoLink && (
                <a
                  href={project.videoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 text-white font-mono font-bold rounded-lg hover:bg-red-700 transition-colors duration-300 group"
                >
                  <span>Voir la vidéo</span>
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>
              )}

              {project.pdfLink && (
                <a
                  href={project.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-neon-purple text-white font-mono font-bold rounded-lg hover:bg-neon-blue transition-colors duration-300 group"
                >
                  <span>Télécharger PDF</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </a>
              )}
            </div>

            {/* Galerie d'images supplémentaires */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="mt-8">
                <h3 className="text-neon-green text-sm font-mono mb-4">
                  Galerie
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.galleryImages.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setLightboxImage(img)}
                      className="relative group overflow-hidden rounded-lg border-2 border-gray-700 hover:border-neon-green transition-all duration-300 cursor-pointer"
                    >
                      <img
                        src={img}
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                      {/* Icône de zoom */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg
                          className="w-12 h-12 text-neon-green"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox pour agrandir les images */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full border-2 border-neon-green text-neon-green hover:bg-neon-green hover:text-black transition-all duration-300 flex items-center justify-center text-2xl font-bold z-10"
          >
            ×
          </button>
          <img
            src={lightboxImage}
            alt="Image agrandie"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default ProjectModal;
