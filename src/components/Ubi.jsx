import React, { useState } from "react";
import Weathercard from "./Weathercard";
import Pronostico from "./Pronostico"; // Importa el componente Pronostico
import { useWeather } from '../hooks/WeatherContext';

function Ubi(props) {
  const apiKey = "9cb196b167af58224d44363196cdd805";
  const { weatherData, setWeatherData } = useWeather();
  const [pronosticoData, setPronosticoData] = useState(null); // Agrega el estado para el pronóstico

  const handleLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const currentWeatherLink = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
          const forecastLink = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`; // Enlace para el pronóstico

          try {
            const currentWeatherResponse = await fetch(currentWeatherLink);
            const currentWeatherData = await currentWeatherResponse.json();
            setWeatherData(currentWeatherData);

            const forecastResponse = await fetch(forecastLink);
            const forecastData = await forecastResponse.json();
            setPronosticoData(forecastData.list);

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
    <div className="principalContainer">
      <div className="contProp">
      <button className="round-button" onClick={handleLocation} >
        <span class="material-symbols-outlined">my_location</span>
      </button>
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
            weatherCode={weatherData.weather[0].icon}
          />
        </div>
      )}
      {pronosticoData && (
        <div>
          <h2>Pronóstico del Clima</h2>
          {pronosticoData.map((forecast, index) => (
            <Pronostico
              key={index}
              date={forecast.dt_txt}
              temperature={forecast.main.temp}
              weather={forecast.weather[0].description}
              weatherCode={forecast.weather[0].icon}
            />
          ))}
        </div>
      )}
      </div>

    </div>
  );
}

export default Ubi;

{/* <div className="mid">
     <div className="contProp">
         <div className="forecast-cards-container">
         {pronosticoData &&
           pronosticoData.map((forecast, index) => (
             <Pronostico
               key={index}
               date={forecast.dt_txt}
               temperature={forecast.main.temp}
               weather={forecast.weather[0].description}
               weatherCode={weatherData.weather[0].icon}
               visibility={weatherData.visibility}
             />
             ))}
             </div>
             
             </div>
             <Weathercard
               temperature={weatherData.main.temp}
               city={weatherData.name}
               weather={weatherData.weather[0].description}
               wind={weatherData.wind.speed}
               humidity={weatherData.main.humidity}
               pressure={weatherData.main.pressure}
               visibility={weatherData.visibility}
               weatherCode={weatherData.weather[0].icon}
             />
           </div>
           </div> */}