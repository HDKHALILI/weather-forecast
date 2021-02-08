import React from "react";

const Now = props => {
  const temperatureUnitIcon =
    props.unit === "fahrenheit" ? "wi-fahrenheit" : "wi-celsius";
  return (
    <div className="now-container">
      <i className={`icon`}>
        <img
          src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
          className="png-icon-large"
        />
      </i>
      <span className="temperature">
        {props.temperature}
        <i className={`wi ${temperatureUnitIcon}`}></i>
      </span>
    </div>
  );
};

export default Now;
