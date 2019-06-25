import React, { Component } from "react";

import "./PageWrapper.scss";

import PageFooter from "../PageFooter/PageFooter.jsx";

class PageWrapper extends Component {
  render() {
    return (
      <div className="d-flex flex-column wrapper">
        <div className="flex-grow-1 py-3">
          {this.props.children}
        </div>
        <div className="flex-grow-0 py-3">
          <PageFooter />
        </div>
      </div>
    );
  }
}

export default PageWrapper;