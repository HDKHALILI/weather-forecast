import React from "react";
import { getDate } from "../utils/dateTime";
import convertTempUnit from "../utils/celsiusToFahrenheit";

const Daily = props => {
  const { date, month, day, year } = getDate(props.data.dt);
  const temperature = convertTempUnit(props.unit, props.data.temp.day);
  const temperatureUnitIcon =
    props.unit === "fahrenheit" ? "wi-fahrenheit" : "wi-celsius";

  return (
    <div className="daily">
      <div className="daily-header">
        <h3 className="location-name">{props.location}</h3>
        <h3>
          {day} {date} {month} {year}
        </h3>
      </div>
      <div className="daily-main">
        <i className={`icon-daily`}>
          <img
            src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
            className="png-icon-small"
          />
        </i>
        <h3>
          {temperature}
          <i className={`wi ${temperatureUnitIcon}`}></i>
        </h3>
      </div>
      <div className="daily-footer">
        <p>{props.data.weather[0].description}</p>
        <div className="misc-details">
          <p>Humidity: {props.data.humidity}%</p>
          <p>wind speed: {props.data.windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default Daily;
