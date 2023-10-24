import React, { createContext, useContext, useState } from "react";

const TemperatureContext = createContext();

export function TemperatureProvider({ children }) {
  const [isCelsius, setIsCelsius] = useState(true);

  return (
    <TemperatureContext.Provider value={{ isCelsius, toggleTemperatureUnit: () => setIsCelsius(!isCelsius) }}>
      {children}
    </TemperatureContext.Provider>
  );
}

export function useTemperature() {
  return useContext(TemperatureContext);
}
