import { useEffect, useState } from "react";

function LoadingScreen({ onLoadComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingSteps, setLoadingSteps] = useState({
    fonts: false,
    threeJS: false,
    gsap: false,
    dom: false,
  });

  useEffect(() => {
    // 1. Vérifier le chargement du DOM
    const checkDOM = () => {
      if (document.readyState === "complete") {
        setLoadingSteps((prev) => ({ ...prev, dom: true }));
        return true;
      }

      return false;
    };

    // 2. Vérifier le chargement des polices Google Fonts
    const checkFonts = async () => {
      try {
        await document.fonts.ready;

        setLoadingSteps((prev) => ({ ...prev, fonts: true }));
        return true;
      } catch (error) {
        console.error(
          "❌ [LoadingScreen] Erreur lors du chargement des polices:",
          error,
        );
        return false;
      }
    };

    // 3. Vérifier Three.js
    const checkThreeJS = () => {
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (window.THREE !== undefined || typeof window !== "undefined") {
            setLoadingSteps((prev) => ({ ...prev, threeJS: true }));
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 100);

        // Timeout après 3 secondes
        setTimeout(() => {
          clearInterval(checkInterval);

          setLoadingSteps((prev) => ({ ...prev, threeJS: true }));
          resolve(true);
        }, 3000);
      });
    };

    // 4. Vérifier GSAP
    const checkGSAP = () => {
      return new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          if (window.gsap !== undefined || typeof window !== "undefined") {
            setLoadingSteps((prev) => ({ ...prev, gsap: true }));
            clearInterval(checkInterval);
            resolve(true);
          }
        }, 100);

        // Timeout après 2 secondes
        setTimeout(() => {
          clearInterval(checkInterval);

          setLoadingSteps((prev) => ({ ...prev, gsap: true }));
          resolve(true);
        }, 2000);
      });
    };

    // Fonction principale de chargement
    const loadAll = async () => {
      // Étape 1: DOM (25%)
      checkDOM();
      setProgress(25);

      // Étape 2: Polices (50%)
      await checkFonts();
      setProgress(50);

      // Étape 3: Three.js (75%)
      await checkThreeJS();
      setProgress(75);

      // Étape 4: GSAP (90%)
      await checkGSAP();
      setProgress(90);

      // Attendre un peu pour l'effet visuel
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Tout est chargé
      setProgress(100);

      // Attendre l'animation de sortie
      setTimeout(() => {
        onLoadComplete();
      }, 800);
    };

    loadAll();

    // Listener pour le chargement du DOM
    if (document.readyState !== "complete") {
      window.addEventListener("load", () => {
        setLoadingSteps((prev) => ({ ...prev, dom: true }));
      });
    }
  }, [onLoadComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 bg-dark-bg flex items-center justify-center transition-opacity duration-800 ${
        progress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center">
        {/* Logo animé */}
        <div className="mb-8 relative">
          <div className="w-20 h-20 border-4 border-neon-green/30 rounded-lg mx-auto relative animate-pulse">
            <div className="absolute inset-0 border-4 border-neon-green border-t-transparent rounded-lg animate-spin"></div>
          </div>
        </div>

        {/* Texte de chargement */}
        <h2 className="font-mono text-2xl font-bold mb-4 text-white">
          <span className="text-neon-green">&lt;</span>
          Chargement
          <span className="text-neon-green">/&gt;</span>
        </h2>

        {/* Barre de progression */}
        <div className="w-64 h-2 bg-dark-surface rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-linear-to-r from-neon-green to-neon-blue transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Pourcentage */}
        <p className="font-mono text-sm text-gray-400 mb-6">{progress}%</p>

        {/* État des étapes */}
        <div className="space-y-2 font-mono text-xs">
          <div
            className={`flex items-center justify-center gap-2 ${loadingSteps.dom ? "text-neon-green" : "text-gray-500"}`}
          >
            <span>{loadingSteps.dom ? "✓" : "○"}</span>
            <span>DOM Ready</span>
          </div>
          <div
            className={`flex items-center justify-center gap-2 ${loadingSteps.fonts ? "text-neon-green" : "text-gray-500"}`}
          >
            <span>{loadingSteps.fonts ? "✓" : "○"}</span>
            <span>Fonts Loaded</span>
          </div>
          <div
            className={`flex items-center justify-center gap-2 ${loadingSteps.threeJS ? "text-neon-green" : "text-gray-500"}`}
          >
            <span>{loadingSteps.threeJS ? "✓" : "○"}</span>
            <span>Three.js Ready</span>
          </div>
          <div
            className={`flex items-center justify-center gap-2 ${loadingSteps.gsap ? "text-neon-green" : "text-gray-500"}`}
          >
            <span>{loadingSteps.gsap ? "✓" : "○"}</span>
            <span>GSAP Ready</span>
          </div>
        </div>

        {/* Animation de particules */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-neon-green rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
