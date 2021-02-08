import React from "react";

import SunDetails from "./SunDetails";
import Info from "./Info";
import ExtraDetails from "./ExtraDetails";
import Now from "./Now";
import Hourly from "./Hourly";
import Loading from "./Loading";
import convertTempUnit from "../utils/celsiusToFahrenheit";

const Weather = props => {
  const { location, current, hourly, error, unit } = props;
  const {
    dt,
    wind_speed,
    humidity,
    pop: rain,
    sunrise,
    sunset,
    temp,
    weather,
  } = current;
  const { description, icon } = weather[0];
  const temperature = convertTempUnit(unit, temp);
  const sevenHours = hourly.slice(0, 7);

  return (
    <div className="weather-container">
      {temperature ? (
        <div>
          <div className="top-section">
            <Info time={dt} location={location} summary={description} />
            <SunDetails sunrise={sunrise} sunset={sunset} />
          </div>
          <div className="main">
            <Now icon={icon} temperature={temperature} unit={unit} />
            <ExtraDetails
              windSpeed={wind_speed}
              humidity={humidity}
              rain={rain ? rain : 0}
            />
          </div>
          <div className="hourly-container">
            {sevenHours.map(data => (
              <Hourly
                key={data.dt}
                time={data.dt}
                icon={data.weather[0].icon}
                temperature={data.temp}
                rain={data.pop ? data.pop : 0}
                windSpeed={data.wind_speed}
                humidity={data.humidity}
                unit={unit}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="error">{error || "Enter location to get weather"}</div>
      )}
    </div>
  );
};

export default Weather;
