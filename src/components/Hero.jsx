import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

function Hero() {
  const [flippedTiles, setFlippedTiles] = useState(new Set());
  const gridRef = useRef(null);
  const timeoutsRef = useRef({});

  // Grille 4 colonnes x 5 lignes = 20 rectangles
  const gridSize = { cols: 4, rows: 5 };
  const totalTiles = gridSize.cols * gridSize.rows;

  useEffect(() => {
    // Animation d'entrée des tiles
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: {
            amount: 1,
            from: "random",
          },
          ease: "power2.out",
        },
      );
    }

    // Cleanup des timeouts au démontage
    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  // Fonction pour obtenir les indices des tuiles adjacentes (rayon 1)
  const getAdjacentTiles = (index) => {
    const row = Math.floor(index / gridSize.cols);
    const col = index % gridSize.cols;
    const adjacent = [];

    for (let r = row - 1; r <= row + 1; r++) {
      for (let c = col - 1; c <= col + 1; c++) {
        if (
          r >= 0 &&
          r < gridSize.rows &&
          c >= 0 &&
          c < gridSize.cols &&
          !(r === row && c === col)
        ) {
          adjacent.push(r * gridSize.cols + c);
        }
      }
    }

    return adjacent;
  };

  const handleTileHover = (index) => {
    // Annuler les timeouts de sortie pour cette tuile et ses voisines
    const tilesToFlip = [index, ...getAdjacentTiles(index)];
    tilesToFlip.forEach((tileIndex) => {
      if (timeoutsRef.current[`leave-${tileIndex}`]) {
        clearTimeout(timeoutsRef.current[`leave-${tileIndex}`]);
        delete timeoutsRef.current[`leave-${tileIndex}`];
      }
    });

    // Flip la tuile principale immédiatement
    setFlippedTiles((prev) => new Set([...prev, index]));

    // Flip les tuiles adjacentes avec un léger délai
    getAdjacentTiles(index).forEach((adjacentIndex, i) => {
      timeoutsRef.current[`enter-${adjacentIndex}`] = setTimeout(
        () => {
          setFlippedTiles((prev) => new Set([...prev, adjacentIndex]));
        },
        50 + i * 30,
      ); // Délai progressif pour effet de cascade
    });
  };

  const handleTileLeave = (index) => {
    const tilesToUnflip = [index, ...getAdjacentTiles(index)];

    // Retourner les tuiles après un délai
    tilesToUnflip.forEach((tileIndex, i) => {
      timeoutsRef.current[`leave-${tileIndex}`] = setTimeout(
        () => {
          setFlippedTiles((prev) => {
            const newSet = new Set(prev);
            newSet.delete(tileIndex);
            return newSet;
          });
        },
        800 + i * 30,
      ); // Reste retournée 800ms puis cascade
    });
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-dark-bg">
      {/* Grille de rectangles */}
      <div
        ref={gridRef}
        className="grid w-full h-screen gap-2 p-2"
        style={{
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
        }}
      >
        {Array.from({ length: totalTiles }).map((_, index) => (
          <div
            key={index}
            className="flip-tile-container"
            onMouseEnter={() => handleTileHover(index)}
            onMouseLeave={() => handleTileLeave(index)}
          >
            <div
              className={`flip-tile ${flippedTiles.has(index) ? "flipped" : ""}`}
            >
              {/* Face avant (gris) */}
              <div className="flip-tile-face flip-tile-front bg-gray-700 border border-gray-600"></div>
              {/* Face arrière (vert) */}
              <div className="flip-tile-face flip-tile-back bg-neon-green border border-neon-green"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Texte central */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center px-6">
          <div className="text-white font-mono uppercase tracking-wider mb-2">
            Portfolio
          </div>
          <div className="text-white font-mono uppercase tracking-wide">
            ARMAND VINCENT
          </div>
        </h1>
      </div>
    </section>
  );
}

export default Hero;
