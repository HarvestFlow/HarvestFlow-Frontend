import React, { useState, useEffect } from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  return (
    <div className="current-weather-card">
      <div className="top-section">
        <div className="weather-details">
          <h2 className="city-name">{data.city}</h2>
          <p className="weather-desc">{data.weather[0].description}</p>
        </div>
        <img
          alt="weather"
          className={`weather-icon ${loading ? "loading" : ""}`}
          src={`/icons/${data.weather[0].icon}.png`} // Chemin absolu avec /icons/
        />
      </div>
      <div className="bottom-section">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="weather-stats">
          <div className="stat-row">
            <span className="stat-label">Feels like</span>
            <span className="stat-value">{Math.round(data.main.feels_like)}°C</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Wind</span>
            <span className="stat-value">{data.wind.speed} m/s</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Humidity</span>
            <span className="stat-value">{data.main.humidity}%</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Pressure</span>
            <span className="stat-value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;