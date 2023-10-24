import React from 'react';

function Cards({ city, weather, temperature, wind, humidity, pressure, visibility }) {
  return (
    <div className="cards">
      <div className="card">
        <p>Temperature: {temperature} °C</p>
        <p>Weather: {weather}</p>
        <h2>{city}</h2>
      </div>
      <div className="card">
        <h3>Wind Status</h3>
        <p>{wind} m/s</p>
      </div>
      <div className="card">
        <h3>Humidity</h3>
        <p>{humidity}%</p>
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
  );
}

export default Cards;
