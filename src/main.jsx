import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
import { WeatherProvider } from './hooks/WeatherContext';
import { TemperatureProvider } from "./hooks/TemperatureContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TemperatureProvider>
    <WeatherProvider>
    <App />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    </WeatherProvider>
    </TemperatureProvider>
  </React.StrictMode>,
);
