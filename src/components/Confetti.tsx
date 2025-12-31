import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotation: number;
}

const COLORS = [
  "#fbbf24", // amber
  "#f472b6", // pink
  "#a78bfa", // purple
  "#60a5fa", // blue
  "#34d399", // emerald
  "#fb923c", // orange
  "#f87171", // red
];

export function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const confettiPieces: ConfettiPiece[] = [];

    for (let i = 0; i < 60; i++) {
      confettiPieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 6,
        rotation: Math.random() * 360,
      });
    }

    setPieces(confettiPieces);

    const timer = setTimeout(() => {
      setIsActive(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-confetti-fall"
          style={{
            left: `${piece.left}%`,
            top: "-20px",
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            backgroundColor: piece.color,
            borderRadius: "2px",
            transform: `rotate(${piece.rotation}deg)`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
