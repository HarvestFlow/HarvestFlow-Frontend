import { useState, useEffect } from "react"; // Add useEffect
import { Map, Marker, NavigationControl } from "react-map-gl";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";
import CurrentWeather from "../current-weather/current-weather";
import Forecast from "../forecast/forecast";
import "mapbox-gl/dist/mapbox-gl.css";
import Sidebar from "../../SideNavBar/SideNavBar";
import "./weather.css";

const MAPBOX_TOKEN = "pk.eyJ1IjoibWVrbmkyMTciLCJhIjoiY202c2xubWRxMDlzODJpcDgzMWxwbTNlZiJ9.0afXMMaDVqtm3GkPx2_k8A";

function Weather() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState({
    lat: 37.7749, // Initial latitude (San Francisco)
    lon: -122.4194, // Initial longitude (San Francisco)
  });
  const [error, setError] = useState(null);

  // Fetch weather data for the initial location when the component mounts
  useEffect(() => {
    if (location) {
      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${location.lat}&lon=${location.lon}&appid=${WEATHER_API_KEY}&units=metric`
      );

      Promise.all([currentWeatherFetch, forecastFetch])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();

          if (response[0].ok && response[1].ok) {
            setCurrentWeather({ city: "San Francisco", ...weatherResponse }); // Default city name
            setForecast({ city: "San Francisco", ...forecastResponse });
            setError(null);
          } else {
            throw new Error("Failed to fetch initial weather data");
          }
        })
        .catch((err) => {
          console.error("Error fetching initial weather data:", err);
          setError("Failed to fetch initial weather data. Please try again later.");
        });
    }
  }, []); // Empty dependency array means it runs once on mount

  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat;
    setLocation({ lat, lon: lng });

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();
        console.log("Données météo actuelles de la localisation sélectionnée :", weatherResponse);
        console.log("Données prévisions de la localisation sélectionnée :", forecastResponse);
        if (response[0].ok && response[1].ok) {
          setCurrentWeather({ city: "Selected Location", ...weatherResponse });
          setForecast({ city: "Selected Location", ...forecastResponse });
          setError(null);
        } else {
          throw new Error("Failed to fetch weather data");
        }
      })
      .catch((err) => {
        console.error("Error fetching weather data:", err);
        setError("Failed to fetch weather data. Please try again later.");
      });
  };

  return (
    <div className="weather-container">
      <div className="sidebar-section">
        <Sidebar />
      </div>
      <div className="main-section">
        <div className="top-section">
          <div className="map-section">
            <Map
              initialViewState={{
                latitude: 37.7749, // Matches initial location
                longitude: -122.4194, // Matches initial location
                zoom: 12,
              }}
              style={{ width: "100%", height: "100%" }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
              onClick={handleMapClick}
            >
              <NavigationControl position="top-right" />
              {location && <Marker longitude={location.lon} latitude={location.lat} />}
            </Map>
          </div>
          <div className="current-weather-section">
            {error && <div className="error-message">{error}</div>}
            {currentWeather ? (
              <CurrentWeather data={currentWeather} />
            ) : (
              <div className="placeholder">Loading current weather...</div>
            )}
          </div>
        </div>
        <div className="forecast-section">
          {forecast ? (
            <Forecast data={forecast} />
          ) : (
            <div className="placeholder">Loading forecast...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;