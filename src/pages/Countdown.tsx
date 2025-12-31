import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CountdownTimer } from "../components/CountdownTimer";
import { useFlow } from "../context/FlowContext";

export function Countdown() {
  const navigate = useNavigate();
  const { completeCountdown } = useFlow();
  const [isHolding, setIsHolding] = useState(false);
  const targetDate = new Date("2026-01-01T00:00:00");

  const handleCountdownComplete = () => {
    setIsHolding(true);
    completeCountdown();
    setTimeout(() => {
      navigate("/moment");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div
        className={`flex flex-col items-center gap-12 transition-opacity duration-1000 ${
          isHolding ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="text-center space-y-3">
          <p className="text-white/40 text-sm uppercase tracking-[0.3em] font-light">
            Menuju
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white/90 tracking-tight">
            2026
          </h1>
        </div>

        <CountdownTimer
          targetDate={targetDate}
          onComplete={handleCountdownComplete}
        />

        <p className="text-white/30 text-sm font-light mt-8 animate-pulse">
          Sebentar lagi...
        </p>
      </div>
    </div>
  );
}
