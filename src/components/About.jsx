import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrambleText } from "../hooks/useScrambleText";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [startScramble, setStartScramble] = useState(false);
  const scrambledText = useScrambleText("À propos", 1500, startScramble);

  useEffect(() => {
    console.log("✅ [About] Section About montée avec ScrollTrigger");

    if (!titleRef.current || !contentRef.current || !sectionRef.current) {
      console.warn("⚠️ [About] Refs non disponibles");
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
      contentRef.current.children,
      {
        y: 50,
        opacity: 0,
      },
      {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        clearProps: "all",
      },
    );
  }, []);

  return (
    <section
      id="à propos"
      ref={sectionRef}
      className="min-h-screen py-20 px-6 md:px-12 lg:px-16 bg-dark-surface relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-24 font-mono cursor-pointer"
          style={{ marginLeft: "1rem", marginTop: "2rem" }}
          onMouseEnter={() => setStartScramble(false)}
          onMouseLeave={() => setTimeout(() => setStartScramble(true), 50)}
        >
          <span className="text-neon-blue">//</span> {scrambledText}
        </h2>

        <div
          ref={contentRef}
          className="max-w-3xl mx-auto"
          style={{ marginLeft: "1rem", marginTop: "2rem" }}
        >
          <div className="glass p-10 md:p-12 rounded-lg">
            <h3
              className="text-2xl font-bold mb-6 text-neon-green"
              style={{ marginLeft: "1rem", marginTop: "1rem" }}
            >
              Qui suis-je ?
            </h3>
            <p
              className="text-gray-300 leading-relaxed mb-4"
              style={{ marginLeft: "1.5rem", marginTop: "1rem" }}
            >
              Étudiant en troisième année de BUT MMI (Métiers du Multimédia et
              l'Internet), je possède de l'expérience dans la création
              numérique. Je combine créativité, technologie et stratégie pour
              réaliser des projets.
            </p>
            <p
              className="text-gray-300 leading-relaxed"
              style={{ marginLeft: "1.5rem", marginTop: "1rem" }}
            >
              Passionné par le design et le développement web, j'aime relever
              des défis créatifs et construire des interfaces modernes qui
              offrent des expériences utilisateur exceptionnelles.
            </p>
          </div>

          <div className="glass p-10 md:p-12 rounded-lg mt-12">
            <h3
              className="text-2xl font-bold mb-6 text-neon-purple"
              style={{ marginLeft: "1rem", marginTop: "1rem" }}
            >
              Passions
            </h3>
            <div
              className="flex flex-wrap gap-4"
              style={{ marginLeft: "1.5rem", marginTop: "1rem" }}
            >
              {["UX/UI Design", "Motion Design", "Développement", "Esport"].map(
                (passion, index) => (
                  <span
                    key={index}
                    className="px-6 py-3 bg-dark-bg border-2 border-neon-green text-neon-green font-mono text-sm rounded-lg hover:bg-neon-green hover:text-dark-bg transition-all duration-300 cursor-pointer hover:shadow-neon-green"
                  >
                    {passion}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="glass p-10 md:p-12 rounded-lg mt-12">
            <h3
              className="text-2xl font-bold mb-6 text-neon-blue"
              style={{ marginLeft: "1rem", marginTop: "1rem" }}
            >
              Liens
            </h3>
            <div
              className="flex flex-wrap gap-4"
              style={{ marginLeft: "1.5rem", marginTop: "1rem" }}
            >
              <a
                href="https://github.com/Armand-VINCENT"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-dark-bg border-2 border-neon-green text-neon-green font-mono text-sm rounded-lg hover:bg-neon-green hover:text-dark-bg transition-all duration-300 hover:shadow-neon-green flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/armand-vincent-38406a2b6/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-dark-bg border-2 border-neon-blue text-neon-blue font-mono text-sm rounded-lg hover:bg-neon-blue hover:text-dark-bg transition-all duration-300 hover:shadow-neon-blue flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="/CV_ArmandVINCENT.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-dark-bg border-2 border-neon-purple text-neon-purple font-mono text-sm rounded-lg hover:bg-neon-purple hover:text-dark-bg transition-all duration-300 hover:shadow-neon-purple flex items-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Voir mon CV
              </a>
            </div>
          </div>

          <div className="glass p-10 md:p-12 rounded-lg mt-12">
            <h3
              className="text-2xl font-bold mb-8 text-neon-green"
              style={{ marginLeft: "1rem", marginTop: "1rem" }}
            >
              Parcours
            </h3>
            <div className="relative px-4 md:px-8">
              {/* Ligne verticale centrale */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-neon-blue opacity-30 transform -translate-x-1/2"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {/* 2026 - Stage Limoges Habitat - GAUCHE */}
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="text-right pr-8">
                    <div className="text-xs font-mono text-neon-green mb-1">
                      02-2026 - 05-2026
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      Stagiaire service communication
                    </h4>
                    <p className="text-sm text-gray-400 font-mono">
                      Limoges Habitat - Limoges
                    </p>
                  </div>
                  <div></div>
                  <div className="absolute left-1/2 top-1 w-4 h-4 bg-neon-green rounded-full border-2 border-dark-bg transform -translate-x-1/2 shadow-lg shadow-neon-green z-10"></div>
                </div>

                {/* 2025 - BUT MMI - DROITE */}
                <div className="relative grid grid-cols-2 gap-4">
                  <div></div>
                  <div className="pl-8">
                    <div className="text-xs font-mono text-neon-blue mb-1">
                      2025
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      2ième année de BUT MMI Validé
                    </h4>
                  </div>
                  <div className="absolute left-1/2 top-1 w-4 h-4 bg-neon-blue rounded-full border-2 border-dark-bg transform -translate-x-1/2 shadow-lg shadow-neon-blue z-10"></div>
                </div>

                {/* 2025 - Stage CPAM87 - GAUCHE */}
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="text-right pr-8">
                    <div className="text-xs font-mono text-neon-green mb-1">
                      04-2025 - 06-2025
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      Stagiaire service communication
                    </h4>
                    <p className="text-sm text-gray-400 font-mono">
                      CPAM87 - Limoges
                    </p>
                  </div>
                  <div></div>
                  <div className="absolute left-1/2 top-1 w-4 h-4 bg-neon-green rounded-full border-2 border-dark-bg transform -translate-x-1/2 shadow-lg shadow-neon-green z-10"></div>
                </div>

                {/* 2024 - Intermarché - DROITE */}
                <div className="relative grid grid-cols-2 gap-4">
                  <div></div>
                  <div className="pl-8">
                    <div className="text-xs font-mono text-neon-purple mb-1">
                      07-2024 - 08-2024
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      Employé polyvalent
                    </h4>
                    <p className="text-sm text-gray-400 font-mono">
                      Intermarché - Marennes
                    </p>
                  </div>
                  <div className="absolute left-1/2 top-1 w-4 h-4 bg-neon-purple rounded-full border-2 border-dark-bg transform -translate-x-1/2 shadow-lg shadow-neon-purple z-10"></div>
                </div>

                {/* 2023 - Sauveteur en mer - GAUCHE */}
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="text-right pr-8">
                    <div className="text-xs font-mono text-neon-purple mb-1">
                      07-2023 - 08-2023
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      Sauveteur en mer
                    </h4>
                    <p className="text-sm text-gray-400 font-mono">
                      SDIS17 - L'île d'Oléron
                    </p>
                  </div>
                  <div></div>
                  <div className="absolute left-1/2 top-1 w-4 h-4 bg-neon-purple rounded-full border-2 border-dark-bg transform -translate-x-1/2 shadow-lg shadow-neon-purple z-10"></div>
                </div>

                {/* 2023 - Bac - DROITE */}
                <div className="relative grid grid-cols-2 gap-4">
                  <div></div>
                  <div className="pl-8">
                    <div className="text-xs font-mono text-neon-blue mb-1">
                      2023
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">
                      Bac obtenu
                    </h4>
                  </div>
                  <div className="absolute left-1/2 top-1 w-4 h-4 bg-neon-blue rounded-full border-2 border-dark-bg transform -translate-x-1/2 shadow-lg shadow-neon-blue z-10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#39ff14 1px, transparent 1px), linear-gradient(90deg, #39ff14 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>
    </section>
  );
}

export default About;
