import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Contact() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    console.log("✅ [Contact] Formulaire de contact monté");

    if (!titleRef.current || !formRef.current || !sectionRef.current) {
      console.warn("⚠️ [Contact] Refs non disponibles");
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
      formRef.current,
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
        duration: 1,
        ease: "power2.out",
        clearProps: "all",
      },
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add form submission logic here
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-20 px-6 md:px-12 lg:px-16 bg-dark-surface relative"
    >
      <div className="container mx-auto max-w-4xl px-4">
        <h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-bold mb-16 font-mono"
        >
          <span className="text-neon-blue">//</span> Contact
        </h2>

        <div ref={formRef} className="glass p-8 md:p-12 lg:p-16 rounded-lg">
          <p className="text-xl text-gray-300 mb-8">
            Vous avez un projet en tête ? Discutons-en !
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-sm text-gray-400 mb-2">
                Nom
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-neon-green focus:outline-none text-white font-mono transition-colors duration-300"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-sm text-gray-400 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-neon-green focus:outline-none text-white font-mono transition-colors duration-300"
                required
              />
            </div>

            <div>
              <label className="block font-mono text-sm text-gray-400 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-lg focus:border-neon-green focus:outline-none text-white font-mono transition-colors duration-300 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="group relative w-full py-4 font-mono font-bold text-lg overflow-hidden"
            >
              <span className="absolute inset-0 bg-linear-to-r from-neon-green to-neon-blue"></span>
              <span className="absolute inset-0 bg-dark-bg opacity-100 group-hover:opacity-0 transition-opacity duration-300"></span>
              <span className="absolute inset-0 border-2 border-neon-green"></span>
              <span className="relative z-10 text-white group-hover:text-black transition-colors duration-300">
                Envoyer le message
              </span>
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-dark-border">
            <div className="flex justify-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-neon-green transition-colors duration-300 font-mono"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-blue transition-colors duration-300 font-mono"
              >
                LinkedIn
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-neon-purple transition-colors duration-300 font-mono"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center">
        <p className="font-mono text-sm text-gray-500">
          &copy; 2026 Portfolio Tech-Futuriste. Créé avec React, Three.js & GSAP
        </p>
      </div>
    </section>
  );
}

export default Contact;
