import React, { useState } from "react";
import Ubi from "./Ubi";

function Nav(props) {
  const [isInputVisible, setInputVisible] = useState(false);
  const [city, setCity] = useState("");

  const toggleInput = () => {
    setInputVisible(!isInputVisible);
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const searchWeather = () => {
    props.onSearch(city);
  };

  // Nueva función para buscar pronóstico
  const searchForecast = () => {
    props.onLocationSearch();
  };

  return (
    <div className="nav">
      <div className="barBut">
        <button onClick={toggleInput}>Search for place</button>
        <Ubi onLocationSearch={searchForecast} />
      </div>
      
      {isInputVisible && (
        <div>
          <input
            type="text"
            placeholder="search location"
            value={city}
            onChange={handleCityChange}
          />
          <button className="blue-button" onClick={searchWeather}>Search</button>
          
        </div>
      )}
    </div>
  );
}

export default Nav;
