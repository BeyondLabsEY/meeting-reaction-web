import React, { Component } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../Home/Home.jsx";

class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default Main;