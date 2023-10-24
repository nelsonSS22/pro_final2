import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Weathercard from "./components/Weathercard";
import Ubi from "./components/Ubi";
import Pronostico from "./components/Pronostico";
import { TemperatureProvider } from "./hooks/TemperatureContext";

function App() {
  const apiKey = "9cb196b167af58224d44363196cdd805";
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchMethod, setSearchMethod] = useState(null);

  useEffect(() => {
    if (weatherData) {
      fetchForecastData(weatherData.name);
    }
  }, [weatherData]);

  const clearWeatherData = () => {
    setWeatherData(null);
    setForecastData(null);
    setSearchMethod(null);
  };

  const fetchWeatherData = (city) => {
    clearWeatherData();

    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setSearchMethod("city");
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    }
  };

  const fetchForecastData = (city) => {
    if (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          // Filtra los datos para obtener el pronóstico de los próximos 5 días
          const forecast = data.list.filter((item, index) => index % 8 === 0); 
          setForecastData(forecast);
        })
        .catch((error) => {
          console.error("Error fetching forecast data:", error);
        });
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <Nav
        onSearch={fetchWeatherData}
        onLocationSearch={() => {
          clearWeatherData();
          setSearchMethod("ubi");
        }}
      />

      <TemperatureProvider>
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
              weatherCode={weatherData.weather[0].icon}visibility={weatherData.visibility}
              
            />
            <h3>5-Day Forecast</h3>
            <div className="forecast-cards">
              {forecastData &&
                forecastData.map((forecast, index) => (
                  <Pronostico
                    key={index}
                    date={forecast.dt_txt}
                    temperature={forecast.main.temp}
                    weather={forecast.weather[0].description}
                    weatherCode={weatherData.weather[0].icon}visibility={weatherData.visibility}
                  />
                ))}
            </div>
          </div>
        )}
      </TemperatureProvider>
    </div>
  );
}

export default App;