// TemperatureContext.js
import React, { createContext, useContext, useState } from 'react';

const TemperatureContext = createContext();

export const TemperatureProvider = ({ children }) => {
  const [isCelsius, setIsCelsius] = useState(true);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <TemperatureContext.Provider value={{ isCelsius, toggleTemperatureUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
};

export const useTemperature = () => {
  const context = useContext(TemperatureContext);
  if (context === undefined) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
};

