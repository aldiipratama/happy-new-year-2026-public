import { useState, useRef, useCallback, useEffect } from "react";
import { useInteraction } from "../context/InteractionContext";

interface MessageSlideProps {
  messages: string[];
  onComplete: () => void;
}

const INTERRUPTION_INDEX = 3;
const INTERRUPTION_MESSAGES = [
  "Eh, bentar.",
  "Tadi lupa bilang…",
  "Kamu gak sendirian.",
];

const PACING_RESPONSES = [
  "Sebentar.",
  "Tarik napas dulu.",
  "Pelan ya.",
  "Jangan buru-buru.",
];

const FAST_CLICK_THRESHOLD = 600;
const LOCK_DURATION = 700;

export function MessageSlide({ messages, onComplete }: MessageSlideProps) {
  const { markInteracted } = useInteraction();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInterrupting, setIsInterrupting] = useState(false);
  const [interruptionStep, setInterruptionStep] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [pacingMessage, setPacingMessage] = useState<string | null>(null);

  const lastAdvanceTime = useRef<number>(0);
  const pacingAudio = useRef<HTMLAudioElement | null>(null);
  const pacingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    pacingAudio.current = new Audio("/tap.mp3");
    pacingAudio.current.volume = 0.15;

    return () => {
      if (pacingAudio.current) {
        pacingAudio.current.src = "";
      }
    };
  }, []);

  const triggerPacingControl = useCallback(() => {
    setIsLocked(true);

    const randomMessage =
      PACING_RESPONSES[Math.floor(Math.random() * PACING_RESPONSES.length)];
    setPacingMessage(randomMessage);

    if (pacingAudio.current) {
      pacingAudio.current.currentTime = 0;
      pacingAudio.current.play().catch(() => {});
    }

    if (pacingTimeout.current) {
      clearTimeout(pacingTimeout.current);
    }

    pacingTimeout.current = setTimeout(() => {
      setIsLocked(false);
      setPacingMessage(null);
    }, LOCK_DURATION);
  }, []);

  const doRunInterruption = useCallback(() => {
    setIsInterrupting(true);
    setInterruptionStep(1);

    setTimeout(() => {
      setInterruptionStep(2);
    }, 1500);

    setTimeout(() => {
      setInterruptionStep(3);
    }, 3000);

    setTimeout(() => {
      setIsInterrupting(false);
      setInterruptionStep(0);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setIsTransitioning(false);
        lastAdvanceTime.current = performance.now();
      }, 400);
    }, 5000);
  }, []);

  const handleNext = useCallback(() => {
    if (isTransitioning || isInterrupting || isLocked) return;

    markInteracted();

    const now = performance.now();
    const timeSinceLastAdvance = now - lastAdvanceTime.current;

    if (
      lastAdvanceTime.current > 0 &&
      timeSinceLastAdvance < FAST_CLICK_THRESHOLD
    ) {
      triggerPacingControl();
      return;
    }

    lastAdvanceTime.current = now;

    if (currentIndex === INTERRUPTION_INDEX && interruptionStep === 0) {
      doRunInterruption();
      return;
    }

    if (currentIndex >= messages.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        onComplete();
      }, 500);
      return;
    }

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(false);
    }, 400);
  }, [
    isTransitioning,
    isInterrupting,
    isLocked,
    markInteracted,
    triggerPacingControl,
    currentIndex,
    interruptionStep,
    messages.length,
    onComplete,
    doRunInterruption,
  ]);

  const getCurrentMessage = useCallback(() => {
    if (isInterrupting && interruptionStep > 0) {
      return INTERRUPTION_MESSAGES[interruptionStep - 1] || "";
    }
    return messages[currentIndex] || "";
  }, [isInterrupting, interruptionStep, messages, currentIndex]);

  if (currentIndex >= messages.length) {
    return null;
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center px-6 select-none ${
        isLocked ? "cursor-default" : "cursor-pointer"
      }`}
      onClick={handleNext}
    >
      <div className="flex flex-col items-center gap-12 max-w-2xl">
        <p
          className={`text-2xl sm:text-3xl md:text-4xl text-center text-white/90 font-light leading-relaxed transition-all duration-400 ease-out ${
            isTransitioning || (isInterrupting && interruptionStep === 0)
              ? "opacity-0 translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          {getCurrentMessage()}
        </p>

        {!isInterrupting && (
          <div className="flex gap-2">
            {messages.map((_, index) => (
              <div
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white/60 scale-125"
                    : index < currentIndex
                    ? "bg-white/30"
                    : "bg-white/10"
                }`}
              />
            ))}
          </div>
        )}

        <p
          className={`text-white/20 text-sm font-light transition-opacity duration-300 ${
            isTransitioning || isInterrupting || isLocked
              ? "opacity-0"
              : "opacity-100"
          }`}
        >
          Ketuk untuk lanjut
        </p>
      </div>

      {/* Pacing control notification */}
      <div
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 transition-all duration-300 ${
          pacingMessage
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <p className="text-white/60 text-sm font-light">{pacingMessage}</p>
      </div>
    </div>
  );
}
