import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function About() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);

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

  const skills = [
    { name: "React", level: "90%" },
    { name: "Three.js", level: "85%" },
    { name: "GSAP", level: "88%" },
    { name: "WebGL", level: "80%" },
    { name: "Tailwind CSS", level: "92%" },
  ];

  return (
    <section
      id="à propos"
      ref={sectionRef}
      className="min-h-screen py-20 px-6 md:px-12 lg:px-16 bg-dark-surface relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl px-4">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-16 font-mono"
        >
          <span className="text-neon-blue">//</span> À propos
        </h2>

        <div ref={contentRef} className="grid md:grid-cols-2 gap-12">
          <div className="glass p-10 md:p-12 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-neon-green">
              Qui suis-je ?
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Développeur passionné par la création d'expériences web immersives
              et innovantes. Je combine design moderne et technologies de pointe
              pour donner vie à des interfaces uniques et captivantes.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Spécialisé dans le développement front-end avec une expertise en
              animations 3D, WebGL et design interactif.
            </p>
          </div>

          <div className="glass p-10 md:p-12 rounded-lg">
            <h3 className="text-2xl font-bold mb-6 text-neon-blue">
              Compétences
            </h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm text-gray-300">
                      {skill.name}
                    </span>
                    <span className="font-mono text-sm text-neon-green">
                      {skill.level}
                    </span>
                  </div>
                  <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-neon-green to-neon-blue"
                      style={{ width: skill.level }}
                    ></div>
                  </div>
                </div>
              ))}
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
