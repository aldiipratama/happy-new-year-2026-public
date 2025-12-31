import { useEffect, useState, type ReactNode } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFlow } from "../context/FlowContext";

interface FlowGuardProps {
  children: ReactNode;
}

export function FlowGuard({ children }: FlowGuardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasCompletedCountdown, hasCompletedMoment } = useFlow();
  const [redirectMessage, setRedirectMessage] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    let shouldRedirect = false;

    // if (location.pathname === "/moment" && !hasCompletedCountdown) {
    //   shouldRedirect = true;
    // }

    // if (location.pathname === "/welcome" && !hasCompletedMoment) {
    //   shouldRedirect = true;
    // }

    if (shouldRedirect) {
      setIsRedirecting(true);
      setRedirectMessage("Kita mulai dari awal, ya.");

      const timer = setTimeout(() => {
        navigate("/", { replace: true });
        setIsRedirecting(false);
        setRedirectMessage(null);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, hasCompletedCountdown, hasCompletedMoment, navigate]);

  if (isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-xl sm:text-2xl text-white/70 font-light text-center animate-pulse">
          {redirectMessage}
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
