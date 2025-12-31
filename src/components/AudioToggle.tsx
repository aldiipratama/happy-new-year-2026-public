import { useAudio } from "../context/AudioContext";

export function AudioToggle() {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <button
      onClick={togglePlay}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
      aria-label={isPlaying ? "Pause music" : "Play music"}
    >
      {isPlaying ? (
        <svg
          className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <rect x="6" y="4" width="4" height="16" rx="1" />
          <rect x="14" y="4" width="4" height="16" rx="1" />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-white/60 group-hover:text-white/80 transition-colors ml-0.5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      )}

      {/* Pulse indicator when playing */}
      {isPlaying && (
        <span className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30" />
      )}
    </button>
  );
}
