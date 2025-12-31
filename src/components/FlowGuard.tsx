import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useFlow } from "../context/FlowContext";

interface FlowGuardProps {
  children: ReactNode;
}

export function FlowGuard({ children }: FlowGuardProps) {
  const location = useLocation();
  const { hasCompletedCountdown, hasCompletedMoment } = useFlow();

  // Determine if should redirect based on current state
  const shouldRedirect =
    (location.pathname === "/moment" && !hasCompletedCountdown) ||
    (location.pathname === "/welcome" && !hasCompletedMoment);

  if (shouldRedirect) {
    // Use Navigate for declarative redirection instead of imperatively in effect
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
