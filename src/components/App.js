import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./Header";
import Results from "./Results";

import getLatLang from "../utils/geocode-api";
import getWeather from "../utils/weather-api";

class App extends Component {
  state = {
    query: JSON.parse(localStorage.getItem("query")),
    weather: null,
    error: null,
    loading: true,
    unit: "celsius",
    location: "",
  };

  componentDidMount() {
    if (this.state.query) {
      this.handleSubmit(this.state.query);
    }
  }

  handleSubmit = query => {
    getLatLang(query).then(locationData => {
      getWeather(locationData)
        .then(({ response, name }) =>
          this.setState({
            weather: response.data,
            loading: false,
            location: name,
          })
        )
        .catch(error => this.setState({ error: error, loading: false }));
    });
    // this.setState(() => ({searchTerm: query}));
    // getLatLang(query)
    //   .then((locationData) => {
    //     if (locationData) {
    //       this.setState(() => ({ location: locationData.name }))
    //       getWeather(locationData)
    //         .then(({ data }) => this.setState(() => {
    //           const { currently } = data;
    //           const hourly = data.hourly.data
    //             .slice(0, 7).map((hourly) => ({
    //               time: hourly.time,
    //               icon: hourly.icon,
    //               temperature: hourly.temperature.toFixed(1),
    //               rain: Math.round(hourly.precipIntensity * 100) / 100,
    //               windSpeed: hourly.windSpeed.toFixed(1),
    //               humidity: Math.floor(hourly.humidity * 100)
    //             }))
    //           const daily = data.daily.data
    //             .slice(0, 7).map((daily) => ({
    //               time: daily.time,
    //               icon: daily.icon,
    //               temperature: daily.temperatureHigh.toFixed(1),
    //               humidity: Math.floor(daily.humidity * 100),
    //               rain: Math.round(daily.precipIntensity * 100) / 100,
    //               sunrise: daily.sunriseTime,
    //               sunset: daily.sunsetTime,
    //               windSpeed: daily.windSpeed.toFixed(1),
    //               summary: daily.summary
    //             }))
    //           return {
    //             currently: {
    //               time: currently.time,
    //               temperature: currently.temperature.toFixed(1),
    //               icon: currently.icon,
    //               windSpeed: currently.windSpeed.toFixed(1),
    //               humidity: Math.floor(currently.humidity * 100),
    //               rain: Math.round(currently.precipIntensity * 100) / 100,
    //               summary: data.hourly.summary,
    //               sunrise: data.daily.data[0].sunriseTime,
    //               sunset: data.daily.data[0].sunsetTime
    //             },
    //             hourly,
    //             daily,
    //           }
    //         }))
    //     } else {
    //       this.setState(() => ({
    //         location: '',
    //         error: "Please enter a valid location",
    //         currently: '',
    //         hourly: '',
    //         daily: '',
    //         loading: false
    //       }))
    //     }
    //   })
  };

  handleUnitChange = event => {
    const value = event.target.value;
    this.setState(() => ({ unit: value }));
  };

  render() {
    return (
      <Router>
        <div className="container">
          <Header
            handleSubmit={this.handleSubmit}
            handleUnitChange={this.handleUnitChange}
          />
          {!this.state.loading && <Results data={this.state} />}
        </div>
      </Router>
    );
  }
}

export default App;
