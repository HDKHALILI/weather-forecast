import axios from "axios";

const getWeather = ({ name, lat, lng }) => {
  const OPEN_WEATHER_API_KEY =
    process.env.REACT_APP_OPEN_WEATHER_API_KEY ||
    process.env.react_app_open_weather_key;

  const uri = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&cnt=7&units=metric&appid=${OPEN_WEATHER_API_KEY}`;

  return axios.get(uri).then(response => ({ response, name }));
};

export default getWeather;
