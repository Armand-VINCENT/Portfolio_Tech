import { useEffect, useRef } from "react";
import gsap from "gsap";
import WebGLBackground from "./WebGLBackground";

function Hero() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    console.log("✅ [Hero] Section Hero montée, démarrage des animations");

    if (!titleRef.current || !subtitleRef.current || !ctaRef.current) {
      console.warn("⚠️ [Hero] Refs non disponibles");
      return;
    }

    const tl = gsap.timeline({ delay: 1 });

    tl.fromTo(
      titleRef.current.children,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out",
        clearProps: "all",
      },
    )
      .fromTo(
        subtitleRef.current,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all",
        },
        "-=0.5",
      )
      .fromTo(
        ctaRef.current,
        {
          scale: 0.8,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          clearProps: "all",
        },
        "-=0.3",
      );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 lg:px-16">
      <WebGLBackground />

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold mb-6">
          <div className="overflow-hidden">
            <span className="inline-block text-white">Armand VINCENT</span>
          </div>
          <div className="overflow-hidden">
            <span className="inline-block text-neon-green neon-text">
              Freelance
            </span>
          </div>
        </h1>

        <p
          ref={subtitleRef}
          className="font-mono text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Créateur d'expériences numériques immersives
          <span className="text-neon-blue animate-pulse">_</span>
        </p>

        <div ref={ctaRef}>
          <a
            href="#projets"
            className="group relative inline-block px-8 py-4 font-mono font-bold text-lg overflow-hidden"
          >
            <span className="absolute inset-0 bg-linear-to-r from-neon-green to-neon-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="absolute inset-0 border-2 border-neon-green group-hover:border-transparent transition-colors duration-300"></span>
            <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
              Découvrir mes projets
            </span>
          </a>
        </div>
      </div>

      {/* Decorative elements with snake animation */}
      <svg
        className="absolute top-1/4 left-10 w-20 h-20 animate-float"
        style={{ opacity: 0.3 }}
      >
        <rect
          x="1"
          y="1"
          width="78"
          height="78"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="2"
          className="snake-stroke"
        />
      </svg>
      <svg
        className="absolute bottom-1/4 right-10 w-32 h-32 animate-float"
        style={{ animationDelay: "1s", opacity: 0.3 }}
      >
        <rect
          x="1"
          y="1"
          width="126"
          height="126"
          fill="none"
          stroke="#39ff14"
          strokeWidth="2"
          className="snake-stroke-slow"
        />
      </svg>
    </section>
  );
}

export default Hero;
