import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";

import "./PageFooter.scss";

import Logo from "../../assets/img/logo-beyondlabs.png";

class PageFooter extends Component {
  render() {
    return (
      <footer>
        <Container>
          <Row>
            <Col>
            <div className="mb-2">
              <img className="img-fluid logo" src={Logo} alt="BeyondLabs logo" />
            </div>
            <p>Created by BeyondLabsEY</p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default PageFooter;