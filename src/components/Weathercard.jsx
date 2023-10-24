import React, { useState } from "react";

const mapWeatherToIcon = (weatherCode) => {
  const weatherIcons = {
    "01d": "clear-day",
    "02d": "partly-cloudy-day",
    "03d": "cloudy",
    "04d": "overcast",
    "09d": "shower rain",
    "10d": "rain",
    "11d": "thunderstorm",
    "13d": "snow",
    "50d": "mist",
    
  };

  return weatherIcons[weatherCode] || "default";
};

function Weathercard({
  city,
  weather,
  temperature,
  wind,
  humidity,
  pressure,
  visibility,
  weatherCode,
}) {
  const [isCelsius, setIsCelsius] = useState(true);
  const [isMetric, setIsMetric] = useState(true);

  const toggleUnits = () => {
    setIsCelsius(!isCelsius);
    setIsMetric(!isMetric);
  };

  const temperatureValue = isCelsius ? temperature : (temperature * 9) / 5 + 32;
  const temperatureUnit = isCelsius ? "°C" : "°F";
  const weatherUnit = isMetric ? "m/s" : "mph";

  const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherCode}.png`;

  return (
    <div className="container">
      <div className="card-prin">
        <img
          src={weatherIconUrl}
          alt="Weather Icon"
        />

        <button onClick={toggleUnits}>
          Toggle Units (Temp: {isCelsius ? "°C" : "°F"}, Wind:{" "}
          {isMetric ? "m/s" : "mph"})
        </button>
        <p>
          Temperature: {temperatureValue} {temperatureUnit}
        </p>
        <p>Weather: {weather}</p>
        <h2>{city}</h2>
      </div>
      <div className="right-corner">
        <div className="card">
          <h3>Wind Status</h3>
          <p>{wind} {weatherUnit}</p>
        </div>
        <div className="card">
          <h3>Humidity</h3>
          <div className="humidity-bar">
            <div className="humidity-progress" style={{ width: `${humidity}%` }}>
              {humidity}%
            </div>
          </div>
        </div>
        <div className="card">
          <h3>Pressure</h3>
          <p>{pressure} mb</p>
        </div>
        <div className="card">
          <h3>Visibility</h3>
          <p>{visibility} meters</p>
        </div>
      </div>
    </div>
  );
}

export default Weathercard;
