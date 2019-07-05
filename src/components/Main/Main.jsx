import React, { Component } from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Home from "../Home/Home.jsx";
import Reaction from "../Reaction/Reaction.jsx";

class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/code/:meetingCode" component={Reaction} />
          <Redirect to="/" />
        </Switch>
      </Router>
    );
  }
}

export default Main;