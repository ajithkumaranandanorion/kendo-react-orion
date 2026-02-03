import { createContext, useContext, useState } from "react";



type SelectedKendoContextType = {
  selectedKendo: string | null;
  setSelectedKendo: React.Dispatch<React.SetStateAction<string | null>>;
};


export const SelectedKendoContext = createContext<SelectedKendoContextType | undefined>(undefined);

export const KendoProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedKendo, setSelectedKendo] = useState<string | null>("simple")

 const value: SelectedKendoContextType = { selectedKendo, setSelectedKendo };
  return <SelectedKendoContext.Provider value={value}>{children}</SelectedKendoContext.Provider>;
};

// Safe hook: never undefined
export function useSelectedKendo() {
  const ctx = useContext(SelectedKendoContext);
  if (!ctx) {
    throw new Error('useSelectedKendo must be used within a SelectedKendoProvider');
  }
  return ctx;
}

