import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
  onComplete: () => void;
}

export function CountdownTimer({
  targetDate,
  onComplete,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [isComplete, setIsComplete] = useState(false);

  function calculateTimeLeft(): TimeLeft {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0 &&
        !isComplete
      ) {
        setIsComplete(true);
        clearInterval(timer);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete, isComplete]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
        <TimeUnit value={timeLeft.days} label="Hari" />
        <Separator />
        <TimeUnit value={timeLeft.hours} label="Jam" />
        <Separator />
        <TimeUnit value={timeLeft.minutes} label="Menit" />
        <Separator />
        <TimeUnit value={timeLeft.seconds} label="Detik" />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <span
          className="text-5xl sm:text-6xl md:text-8xl font-light text-white/90 tabular-nums tracking-tight transition-all duration-300"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {formatNumber(value)}
        </span>
      </div>
      <span className="text-xs sm:text-sm text-white/40 uppercase tracking-[0.2em] mt-2">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-3xl sm:text-4xl md:text-6xl text-white/20 font-light self-start mt-2">
      :
    </span>
  );
}
