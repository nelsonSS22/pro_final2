import React from "react";
import Weathercard from "./Weathercard"; 
import { useWeather } from '../hooks/WeatherContext';

function Ubi(props) {
  const apiKey = "9cb196b167af58224d44363196cdd805";
  const { weatherData, setWeatherData } = useWeather();

  const handleLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const link = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

          try {
            const response = await fetch(link);
            const data = await response.json();
            setWeatherData(data); 

            props.onLocationSearch();
          } catch (error) {
            console.error("Error fetching weather data:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Ubicación denegada o no disponible");
        }
      );
    } else {
      alert("Geolocation no está disponible en este navegador.");
    }
  };

  return (
    <div>
      <button onClick={handleLocation}>Ubi</button>
      {weatherData && (
        <div>
          <h2>
            Weather in {weatherData.name}, {weatherData.sys.country}
          </h2>
          <Weathercard
            temperature={weatherData.main.temp}
            city={weatherData.name}
            weather={weatherData.weather[0].description}
            wind={weatherData.wind.speed}
            humidity={weatherData.main.humidity}
            pressure={weatherData.main.pressure}
            visibility={weatherData.visibility}
          />
        </div>
      )}
    </div>
  );
}

export default Ubi;
