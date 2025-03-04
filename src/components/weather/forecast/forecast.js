import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  return (
    <>
      <label className="title">Daily Forecast</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton className="accordion__button">
                <div className="daily-item">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    className="icon-small"
                    alt="weather"
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">{item.weather[0].description}</label>
                  <label className="min-max">
                    {Math.round(item.main.temp_max)}°C / {Math.round(item.main.temp_min)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="accordion__panel">
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure:</label>
                  <span>{item.main.pressure} hPa</span>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <span>{item.main.humidity}%</span>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds:</label>
                  <span>{item.clouds.all}%</span>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind Speed:</label>
                  <span>{item.wind.speed} m/s</span>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea Level:</label>
                  <span>{item.main.sea_level} m</span>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels Like:</label>
                  <span>{Math.round(item.main.feels_like)}°C</span>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
