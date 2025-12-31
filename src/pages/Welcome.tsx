import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, useMemo } from "react";
import { useAudio } from "../context/AudioContext";
import { useFlow } from "../context/FlowContext";
import { Confetti } from "../components/Confetti";

interface FloatingParticle {
  id: number;
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

function generateParticles(): FloatingParticle[] {
  return [...Array(15)].map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 5}s`,
    animationDuration: `${3 + Math.random() * 4}s`,
  }));
}

export function Welcome() {
  const navigate = useNavigate();
  const { isPlaying } = useAudio();
  const { resetFlow } = useFlow();
  const [isVisible, setIsVisible] = useState(false);
  const fireworksPlayed = useRef(false);
  const particles = useMemo(() => generateParticles(), []);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!fireworksPlayed.current) {
      fireworksPlayed.current = true;

      const fireworksAudio = new Audio("/fireworks.mp3");
      fireworksAudio.volume = isPlaying ? 0.35 : 0.5;
      fireworksAudio.play().catch(() => {});
    }
  }, [isPlaying]);

  const handleRestart = () => {
    resetFlow();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Confetti celebration */}
      <Confetti />

      {/* Floating particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
            style={{
              left: particle.left,
              top: particle.top,
              animationDelay: particle.animationDelay,
              animationDuration: particle.animationDuration,
            }}
          />
        ))}
      </div>

      <div
        className={`relative z-10 flex flex-col items-center gap-8 text-center transition-all duration-1000 ease-out ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-95"
        }`}
      >
        <div className="space-y-6">
          <p className="text-5xl sm:text-6xl md:text-7xl animate-bounce-slow">
            🎉
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extralight text-white/95 tracking-tight">
            Selamat Tahun Baru
          </h1>
          <p className="text-4xl sm:text-5xl md:text-7xl font-light bg-gradient-to-r from-amber-200 via-rose-200 to-indigo-200 bg-clip-text text-transparent">
            2026
          </p>
        </div>

        <p className="text-base sm:text-lg text-white/50 font-light max-w-sm leading-relaxed mt-4">
          Semoga tahun ini membawa lebih banyak hal baik untukmu.
        </p>

        <button
          onClick={handleRestart}
          className="mt-8 px-8 py-3 text-white/60 text-sm uppercase tracking-[0.2em] border border-white/10 rounded-full hover:bg-white/5 hover:border-white/20 hover:text-white/80 transition-all duration-300 cursor-pointer"
        >
          Ulangi dari Awal
        </button>
      </div>
    </div>
  );
}
