import { type ReactNode, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AudioToggle } from "../components/AudioToggle";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    setIsVisible(false);
    const timeout = setTimeout(() => {
      setDisplayChildren(children);
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, [location.pathname, children]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/3 rounded-full blur-3xl" />
      </div>

      {/* Audio toggle */}
      <AudioToggle />

      {/* Page content with fade transition */}
      <div
        className={`relative z-10 transition-opacity duration-500 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {displayChildren}
      </div>
    </div>
  );
}
