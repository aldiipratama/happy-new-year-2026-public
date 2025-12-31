import { createContext, useContext, useState, type ReactNode } from "react";

interface InteractionContextType {
  hasInteracted: boolean;
  markInteracted: () => void;
}

const InteractionContext = createContext<InteractionContextType | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export function useInteraction() {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error("useInteraction must be used within InteractionProvider");
  }
  return context;
}

interface InteractionProviderProps {
  children: ReactNode;
}

export function InteractionProvider({ children }: InteractionProviderProps) {
  const [hasInteracted, setHasInteracted] = useState(false);

  const markInteracted = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <InteractionContext.Provider value={{ hasInteracted, markInteracted }}>
      {children}
    </InteractionContext.Provider>
  );
}
