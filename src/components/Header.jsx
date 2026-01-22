import { useEffect, useRef } from "react";
import gsap from "gsap";

function Header() {
  const headerRef = useRef(null);
  const navItemsRef = useRef([]);

  useEffect(() => {
    console.log("✅ [Header] Composant Header monté et animé");

    if (!headerRef.current || navItemsRef.current.length === 0) {
      console.warn("⚠️ [Header] Refs non disponibles");
      return;
    }

    // Animate header on mount
    gsap.fromTo(
      headerRef.current,
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        clearProps: "all",
      },
    );

    gsap.fromTo(
      navItemsRef.current,
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.5,
        ease: "power2.out",
        clearProps: "all",
      },
    );
  }, []);

  const navItems = ["Projets", "À propos", "Contact"];

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-dark-border"
    >
      <nav className="container mx-auto px-6 md:px-12 lg:px-16 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
            <h1 className="font-mono text-xl font-bold text-white">
              <span className="text-neon-green">&lt;</span>
              Portfolio
              <span className="text-neon-green">/&gt;</span>
            </h1>
          </div>

          <ul className="flex space-x-8">
            {navItems.map((item, index) => (
              <li key={item} ref={(el) => (navItemsRef.current[index] = el)}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="font-mono text-sm text-gray-400 hover:text-neon-green transition-colors duration-300 relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-neon-green group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
