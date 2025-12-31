import { createContext, useContext, useState, type ReactNode } from "react";

interface FlowContextType {
  hasCompletedCountdown: boolean;
  hasCompletedMoment: boolean;
  completeCountdown: () => void;
  completeMoment: () => void;
  resetFlow: () => void;
}

const FlowContext = createContext<FlowContextType | null>(null);

export function useFlow() {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error("useFlow must be used within FlowProvider");
  }
  return context;
}

interface FlowProviderProps {
  children: ReactNode;
}

export function FlowProvider({ children }: FlowProviderProps) {
  const [hasCompletedCountdown, setHasCompletedCountdown] = useState(false);
  const [hasCompletedMoment, setHasCompletedMoment] = useState(false);

  const completeCountdown = () => setHasCompletedCountdown(true);
  const completeMoment = () => setHasCompletedMoment(true);
  const resetFlow = () => {
    setHasCompletedCountdown(false);
    setHasCompletedMoment(false);
  };

  return (
    <FlowContext.Provider
      value={{
        hasCompletedCountdown,
        hasCompletedMoment,
        completeCountdown,
        completeMoment,
        resetFlow,
      }}
    >
      {children}
    </FlowContext.Provider>
  );
}
