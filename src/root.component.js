import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./styles/main.scss";

import "bootstrap/dist/css/bootstrap.min.css";
import PeoplePage from "./components/people/PeoplePage";
import PlanetPage from "./components/planet/PlanetPage";

export default function Root(props) {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar navbar-expand-md navbar-dark fixed-top bg-dark mb-4">
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/people">
                People
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/planet">
                Planet
              </Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path="/people/:personId" component={PeoplePage} />
          <Route path="/people" component={PeoplePage} />
          <Route path="/planet" component={PlanetPage} />
        </Switch>
      </div>
    </Router>
  );
}
