import React from "react";

function WeatherDetails({
  weatherIconUrl,
  temperatureValue,
  temperatureUnit,
  weather,
  city,
}) {
  return (
    <div className="card-prin">
      <img src={weatherIconUrl} alt="Weather Icon" />
      <p>
        {temperatureValue} {temperatureUnit}
      </p>
      <p>{weather}</p>
      <h2><span class="material-symbols-outlined">
location_on
</span>{city}</h2>
    </div>
  );
}

export default WeatherDetails;

