import React, { Component } from "react";
import { Route, NavLink, Switch } from "react-router-dom";

import Weather from "./Weather";
import Forecast from "./Forecast";

class Results extends Component {
  render() {
    const { location, weather, error, unit } = this.props.data;
    const { current, hourly, daily } = weather;
    return (
      <div className="results-container">
        <div className="nav">
          <NavLink exact activeClassName="active" to="/">
            Today
          </NavLink>
          <NavLink activeClassName="active" to="/forecast">
            Forecast
          </NavLink>
        </div>

        <div className="results">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Weather
                  {...props}
                  current={current}
                  location={location}
                  hourly={hourly}
                  error={error}
                  unit={unit}
                />
              )}
            />
            <Route
              path="/forecast"
              render={props => (
                <Forecast
                  {...props}
                  daily={daily}
                  location={location}
                  error={error}
                  unit={unit}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default Results;
