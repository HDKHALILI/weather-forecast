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

    document.title = "Weather App";
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
