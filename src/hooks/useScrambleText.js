import { useEffect, useState } from "react";

/**
 * Hook pour créer un effet de texte scramble (brouillé)
 * @param {string} text - Le texte final à afficher
 * @param {number} duration - Durée de l'animation en ms (défaut: 2000)
 * @param {boolean} trigger - Déclencher l'animation (défaut: true)
 * @returns {string} - Le texte actuel (scrambled ou final)
 */
export function useScrambleText(text, duration = 2000, trigger = true) {
  const [displayText, setDisplayText] = useState(text);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/~`0123456789";

  useEffect(() => {
    if (!trigger) return;

    let frame = 0;
    const totalFrames = duration / 30; // 30ms par frame

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";

            const progress = frame / totalFrames;
            const charPosition = index / text.length;

            // Révèle progressivement chaque caractère
            if (progress > charPosition) {
              return text[index];
            }

            // Sinon, affiche un caractère aléatoire
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join(""),
      );

      frame++;

      if (frame >= totalFrames) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [text, duration, trigger]);

  return displayText;
}
