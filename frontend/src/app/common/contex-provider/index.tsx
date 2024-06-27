'use client';

import React, { createContext, useContext, useState } from 'react';

interface GlobalState {
  selectedScenarioLabel: string;
  // Add more state properties as needed
}

const ThemeContext = createContext<GlobalState | any>(undefined);

export default function ContextThemeProvider({ children }: any) {
  const [globalState, setGlobalState] = useState<GlobalState>({
    selectedScenarioLabel: '',
    // Initialize additional state properties here
  });

  return (
    <ThemeContext.Provider value={{ ...globalState, setGlobalState }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to access the global context
export const useGlobalContext = () => useContext(ThemeContext);
