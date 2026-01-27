import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function CircularFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  projects,
}) {
  const containerRef = useRef(null);
  const rotationRef = useRef({ angle: 0 });
  const animationRef = useRef(null);
  const itemsRef = useRef([]);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Compter les projets par catégorie
  const countByCategory = (category) => {
    if (category === "All") return projects.length;
    return projects.filter((p) => p.category === category).length;
  };

  useEffect(() => {
    // Animation de rotation continue de l'ellipse
    const startRotation = () => {
      animationRef.current = gsap.to(rotationRef.current, {
        angle: 360,
        duration: 18,
        repeat: -1,
        ease: "none",
        modifiers: {
          angle: (angle) => angle % 360,
        },
        onUpdate: () => {
          updatePositions();
        },
      });
    };

    const updatePositions = () => {
      categories.forEach((category, index) => {
        const angleStep = 360 / categories.length;
        const angle =
          ((angleStep * index + rotationRef.current.angle) % 360) *
          (Math.PI / 180);

        // Calcul de la position sur l'ellipse 3D
        const radiusX = 350; // Rayon horizontal augmenté
        const radiusZ = 200; // Rayon de profondeur augmenté pour plus de visibilité

        const x = Math.sin(angle) * radiusX;
        const z = Math.cos(angle) * radiusZ;

        // Calcul de l'opacité et de la taille en fonction de la profondeur (z)
        const scale = 0.5 + ((z + radiusZ) / (radiusZ * 2)) * 0.5;
        const opacity = 0.2 + ((z + radiusZ) / (radiusZ * 2)) * 0.8;
        const zIndex = Math.round(z);

        const element = itemsRef.current[index];
        if (element) {
          element.style.transform = `translate3d(${x}px, 0px, ${z}px) scale(${scale})`;
          element.style.opacity = hoveredCategory === category ? 1 : opacity;
          element.style.zIndex = zIndex + 100;
        }
      });
    };

    startRotation();

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [categories, hoveredCategory]);

  const handleCategoryHover = (category) => {
    setHoveredCategory(category);
    if (animationRef.current) {
      animationRef.current.pause();
    }
  };

  const handleCategoryLeave = () => {
    setHoveredCategory(null);
    if (animationRef.current) {
      animationRef.current.resume();
    }
  };

  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center overflow-hidden"
      style={{ height: "150px", perspective: "1000px" }}
    >
      {categories.map((category, index) => {
        const isSelected = selectedCategory === category;
        const isHovered = hoveredCategory === category;

        return (
          <button
            key={category}
            ref={(el) => (itemsRef.current[index] = el)}
            className={`absolute font-mono text-sm transition-colors duration-300 whitespace-nowrap ${
              isSelected
                ? "text-neon-green font-bold"
                : isHovered
                  ? "text-white"
                  : "text-gray-500"
            }`}
            style={{
              left: "50%",
              top: "50%",
            }}
            onMouseEnter={() => handleCategoryHover(category)}
            onMouseLeave={handleCategoryLeave}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
            {isHovered && (
              <span className="ml-2 text-neon-green">
                ({countByCategory(category)})
              </span>
            )}
          </button>
        );
      })}

      {/* Ligne centrale horizontale */}
      <div
        className="absolute h-px bg-neon-green/20"
        style={{
          width: "60%",
          left: "20%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      ></div>
    </div>
  );
}

export default CircularFilter;
