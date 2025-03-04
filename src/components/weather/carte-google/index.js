import { useState } from "react";
import { Map, Marker, NavigationControl } from "react-map-gl";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api";
import CurrentWeather from "../current-weather/current-weather";
import Forecast from "../forecast/forecast";
import "mapbox-gl/dist/mapbox-gl.css";
import Sidebar from "../../SideNavBar/SideNavBar";

// Ensure you have a valid token
const MAPBOX_TOKEN = "pk.eyJ1IjoibWVrbmkyMTciLCJhIjoiY202c2xubWRxMDlzODJpcDgzMWxwbTNlZiJ9.0afXMMaDVqtm3GkPx2_k8A"; // Replace with your own Mapbox token

function Weather() {
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null); // State to handle errors
  
    const handleMapClick = (event) => {
      console.log("Event object:", event);  // Log the event to inspect its structure
      console.log("LngLat object:", event.lngLat);  // Log lngLat specifically
  
      const { lng, lat } = event.lngLat;
      setLocation({ lat, lon: lng });
  
      // Fetch weather data using the coordinates
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
  
          if (response[0].ok && response[1].ok) {
            setCurrentWeather({ city: "Selected Location", ...weatherResponse });
            setForecast({ city: "Selected Location", ...forecastResponse });
            setError(null); // Clear any previous errors
          } else {
            throw new Error('Failed to fetch weather data');
          }
        })
        .catch((err) => {
          console.error("Error fetching weather data:", err);
          setError("Failed to fetch weather data. Please try again later.");
        });
    };
  
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
        {/* Sidebar Section */}
        <div style={{ width: '16.6%', minWidth: '200px'}}>
          <Sidebar />
        </div>
      
        {/* Main Content Section */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Carte Section */}
          <div style={{ flex: '1 0 60%', height: '60%' }}>
            <Map
              initialViewState={{
                latitude: 37.7749,
                longitude: -122.4194,
                zoom: 12,
              }}
              style={{ width: "100%", height: "80%" }}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
              onClick={handleMapClick}
            >
              <NavigationControl />
              {location && <Marker longitude={location.lon} latitude={location.lat} />}
            </Map>
          </div>
      
          {/* Informations météo Section */}
          <div
            className="weather-info"
            style={{
              flex: '1 0 40%', // Rest of the space for the weather info
              padding: '10px',
              height: '40%',  // Fixed height
              backgroundColor: '#fff',
              borderTop: '1px solid #ddd',
            }}
          >
            {error && <div className="error-message">{error}</div>}
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {forecast && <Forecast data={forecast} />}
          </div>
        </div>
      </div>
      
    );
  }
  
  export default Weather;