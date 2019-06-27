import React, { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import ReactionTabs from "../ReactionTabs/ReactionTabs.jsx";
import PageWrapper from "../PageWrapper/PageWrapper.jsx";
import Icon from "../Icon/Icon.jsx";

class Reaction extends Component {
  constructor(props) {
    super(props);

    console.log(props.match.params.meetingCode);
    
    this.leaveMeeting = this.leaveMeeting.bind(this);
  }

  leaveMeeting() {
    this.props.history.push("/");
  }

  componentDidMount() {
    if (! this.props.match.params.meetingCode) {
      this.leaveMeeting();
    }
  }

  render() {
    const { meetingCode } = this.props.match.params;

    return (
      <PageWrapper>
        <Container>
          <Row>
            <Col>
              <p className="my-0 text-center">The code for this meeting is <strong>{meetingCode}</strong></p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xs="auto">
              <div className="pb-3">
                <Button variant="link" size="sm" className="p-0" onClick={this.leaveMeeting}>
                  <Icon name="backward" />
                  <span className="ml-2 mr-1">Try another code...</span>
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <ReactionTabs code={meetingCode} />
            </Col>
          </Row>
        </Container>
      </PageWrapper>
    );
  }
}

export default Reaction;