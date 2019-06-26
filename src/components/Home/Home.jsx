import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import Logo from "../../assets/img/logo.png";

import PageWrapper from "../PageWrapper/PageWrapper.jsx";
import Icon from "../Icon/Icon.jsx";

const MEETING_CODE_LENGTH = 6;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meetingCode: "",
      valid: false
    };
    this.changeMeetingCode = this.changeMeetingCode.bind(this);
    this.viewReaction = this.viewReaction.bind(this);
  }

  changeMeetingCode(event) {
    const meetingCode = event.target.value.toUpperCase();
    const valid = meetingCode.length === MEETING_CODE_LENGTH;

    this.setState({
      meetingCode,
      valid
    });
  }

  viewReaction(event) {
    event.preventDefault();

    const { meetingCode, valid } = this.state;

    if (valid) {
      console.log("Meeting code:", meetingCode);
    }
  }

  render() {
    const { meetingCode, valid } = this.state;
    const buttonIsDisabled = ! valid;

    return (
      <PageWrapper>
        <Container>
          <Row className="justify-content-center">
            <Col xs="11" sm="9" md="7" lg="5">
              <div className="my-5">
                <img className="img-fluid" src={Logo} alt="Meeting Reaction logo" />
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="10" sm="8" md="6" lg="4">
              <div className="my-4">
                <Form id="meetingForm" noValidate onSubmit={this.viewReaction}>
                  <Form.Group>
                    <Form.Control as="input" type="text" size="lg" className="text-center" value={meetingCode} onChange={this.changeMeetingCode} placeholder="Meeting code" autoFocus autoComplete="off" maxLength="6" required aria-required="true" aria-label="Code" id="inputMeetingCode" />
                    <Form.Text className="text-light text-right">e.g. 6IVACO</Form.Text>
                  </Form.Group>
                  <Button type="submit" variant="warning" block className="px-0 has-icon" disabled={buttonIsDisabled} id="btnViewMeetingReaction" title="Click to view live reaction for this meeting">
                    <span>View reaction</span>
                    <Icon name="forward" className="ml-2 mr-1" />
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </PageWrapper>
    );
  }
}

export default Home;