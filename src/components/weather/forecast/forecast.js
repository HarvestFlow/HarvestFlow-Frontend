import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import "./forecast.css";

const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek).concat(WEEK_DAYS.slice(0, dayInAWeek));
  
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  const handleCardClick = (item) => {
    setSelectedDay(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDay(null);
  };

  // Fonction pour déterminer le dégradé atténué en fonction de la température
  const getTemperatureGradient = (tempMax) => {
    const temp = Math.round(tempMax);
    let startColor, endColor;

    if (temp <= 0) {
      // Très froid : bleu pastel doux
      startColor = "#B0E0E6"; // PowderBlue
      endColor = "#E6F0FA";   // LightSkyBlue pâle
    } else if (temp <= 15) {
      // Froid : bleu clair à vert pastel
      startColor = "#E6F0FA"; // LightSkyBlue pâle
      endColor = "#D4EDDA";   // Vert menthe pâle
    } else if (temp <= 25) {
      // Tempéré : vert pastel à jaune pâle
      startColor = "#D4EDDA"; // Vert menthe pâle
      endColor = "#FFF3CD";   // Jaune très pâle
    } else if (temp <= 35) {
      // Chaud : jaune pâle à orange doux
      startColor = "#FFF3CD"; // Jaune très pâle
      endColor = "#FFDAB9";   // PeachPuff (orange pâle)
    } else {
      // Très chaud : orange doux à rouge atténué
      startColor = "#FFDAB9"; // PeachPuff
      endColor = "#F4CCCC";   // Rouge pâle
    }

    return `linear-gradient(135deg, ${startColor}, ${endColor})`;
  };

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">Daily Forecast</h3>
      <div className="forecast-cards">
        {data.list.slice(0, 7).map((item, idx) => (
          <Card
            key={idx}
            className="forecast-card"
            style={{ background: getTemperatureGradient(item.main.temp_max) }}
            onClick={() => handleCardClick(item)}
          >
            <Card.Body className="daily-summary">
              <img
                src={`icons/${item.weather[0].icon}.png`}
                className="icon-small"
                alt="weather"
              />
              <h5 className="day-name">{forecastDays[idx]}</h5>
              <p className="weather-desc">{item.weather[0].description}</p>
              <p className="temp-range">
                {Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C
              </p>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Modale pour les détails */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedDay && forecastDays[data.list.indexOf(selectedDay)]} - Weather Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDay && (
            <div className="forecast-details">
              <div className="daily-summary-modal">
                <img
                  src={`icons/${selectedDay.weather[0].icon}.png`}
                  className="icon-large"
                  alt="weather"
                />
                <p className="weather-desc">{selectedDay.weather[0].description}</p>
                <p className="temp-range">
                  {Math.round(selectedDay.main.temp_max)}°C / {Math.round(selectedDay.main.temp_min)}°C
                </p>
              </div>
              <div className="details-grid">
                <div className="grid-item">
                  <span>Pressure:</span>
                  <span>{selectedDay.main.pressure} hPa</span>
                </div>
                <div className="grid-item">
                  <span>Humidity:</span>
                  <span>{selectedDay.main.humidity}%</span>
                </div>
                <div className="grid-item">
                  <span>Clouds:</span>
                  <span>{selectedDay.clouds.all}%</span>
                </div>
                <div className="grid-item">
                  <span>Wind Speed:</span>
                  <span>{selectedDay.wind.speed} m/s</span>
                </div>
                <div className="grid-item">
                  <span>Sea Level:</span>
                  <span>{selectedDay.main.sea_level || "N/A"} m</span>
                </div>
                <div className="grid-item">
                  <span>Feels Like:</span>
                  <span>{Math.round(selectedDay.main.feels_like)}°C</span>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Forecast;