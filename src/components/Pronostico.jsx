import React from "react";
import { useTemperature } from "../hooks/TemperatureContext";

function Pronostico({ date, temperature, weather, weatherCode }) {
  const { isCelsius, toggleTemperatureUnit } = useTemperature();

  const temperatureValue = isCelsius ? Math.round(temperature) : Math.round(temperature * 9/5 + 32);
  const temperatureUnit = isCelsius ? "°C" : "°F";

  const dateObj = new Date(date);
  const options = { weekday: "short", month: "short", day: "numeric" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherCode}.png`;

  return (
    <div className="conteiner-pro">
      <div className="forecast-card">
        <div className="forecast-date">{formattedDate}</div>
        <div className="forecast-temperature">
          {temperatureValue} {temperatureUnit}
          <button onClick={toggleTemperatureUnit}>Toggle Unit</button>
        </div>
        <div className="forecast-weather-icon">
          <img src={weatherIconUrl} alt="Weather Icon" />
        </div>
        <div className="forecast-weather">{weather}</div>
      </div>
    </div>
  );
}

export default Pronostico;




