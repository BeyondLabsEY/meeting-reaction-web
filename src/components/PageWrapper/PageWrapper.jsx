import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

import "./PageWrapper.scss";
import { DEFAULT_TRANSITION } from "../../data/defaults";

import PageFooter from "../PageFooter/PageFooter.jsx";

class PageWrapper extends Component {
  render() {
    const { active, from, children } = this.props;
    
    let pageClassNames;
    switch (from) {
      case "left":
        pageClassNames = "page-from-left"
        break;
      case "right":
        pageClassNames = "page-from-right"
        break;
      default:
        pageClassNames = "page";
    }

    return (
      <CSSTransition in={active} timeout={DEFAULT_TRANSITION} classNames={pageClassNames} unmountOnExit>
        <div className="d-flex flex-column wrapper">
          <div className="flex-grow-1 py-3">
            {children}
          </div>
          <div className="flex-grow-0 pb-3">
            <PageFooter />
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default PageWrapper;