import React, { Component, Fragment } from "react";
import { Nav } from "react-bootstrap";

import "./ReactionTabs.scss";

import Icon from "../Icon/Icon.jsx";

class ReactionTabs extends Component {
  render() {
    return (
      <Fragment>
        <Nav as="ul" variant="pills" justify bsPrefix="tabs" onSelect={this.changeTab}>
          <Nav.Item bsPrefix="tab">
            <Nav.Link as="button" role="tab" active={true} bsPrefix="tab-button" id="btnWordCloudTab">
              <Icon name="word-cloud" size="24" />
              <span className="tab-title">Word cloud</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item bsPrefix="tab">
            <Nav.Link as="button" role="tab" active={false} bsPrefix="tab-button" id="btnLiveReactionTab">
              <Icon name="reaction" size="24" />
              <span className="tab-title">Live reaction</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <hr />
      </Fragment>
    );
  }
}

export default ReactionTabs;