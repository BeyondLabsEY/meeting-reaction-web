import React, { Component, Fragment } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Axios from "axios";

import Logo from "../../assets/img/logo.png";
import { DEFAULT_TRANSITION } from "../../data/defaults";
import { MEETING_CODE } from "../../data/endpoints";

import PageWrapper from "../PageWrapper/PageWrapper.jsx";
import Icon from "../Icon/Icon.jsx";

const MEETING_CODE_LENGTH = 6;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meetingCode: "",
      valid: false,
      checking: false,
      notFound: false,
      pageReady: false
    };
    this.changeMeetingCode = this.changeMeetingCode.bind(this);
    this.checkMeetingCode = this.checkMeetingCode.bind(this);
  }

  changeMeetingCode(event) {
    const meetingCode = event.target.value.toUpperCase();
    const valid = meetingCode.length === MEETING_CODE_LENGTH;

    this.setState({
      meetingCode,
      valid,
      notFound: false
    });
  }

  checkMeetingCode(event) {
    event.preventDefault();

    this.setState({
      checking: true
    });

    Axios.get(MEETING_CODE, {
      params: {
        code: this.state.meetingCode
      }
    }).catch(() => {
      this.handleFetchingError();
    }).then(response => {
      let status;
      try {
        status = response.data.status;
      } catch {
        status = false;
      }
      if (status)
        this.viewReaction();
      else
        this.handleFetchingError();
    });
  }

  handleFetchingError() {
    this.setState({
      checking: false,
      notFound: true
    });

    $("#inputMeetingCode").focus();
  }

  viewReaction() {
    const { meetingCode, valid } = this.state;
    if (valid) {
      this.leavePage();

      setTimeout(() => this.props.history.push(`/code/${meetingCode}`), DEFAULT_TRANSITION);
    }
  }

  enterPage() {
    this.setState({
      pageReady: true
    });
  }

  leavePage() {
    this.setState({
      pageReady: false
    });
  }

  componentDidMount() {
    this.enterPage();
  }

  render() {
    const { meetingCode, valid, checking, notFound, pageReady } = this.state;
    const buttonClassNames = checking ? "px-0 blinking" : "px-0 has-icon";
    const buttonIsDisabled = (! valid) || checking;

    return (
      <PageWrapper active={pageReady} from="left">
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
                <Form id="meetingForm" noValidate onSubmit={this.checkMeetingCode}>
                  <Form.Group>
                    <Form.Control as="input" type="text" size="lg" className="text-center" value={meetingCode} onChange={this.changeMeetingCode} placeholder="Meeting code" autoFocus autoComplete="off" maxLength="6" required aria-required="true" aria-label="Code" id="inputMeetingCode" />
                    {notFound ? <Form.Text className="text-warning text-center">Meeting code not found!</Form.Text> : <Form.Text className="text-light text-right">e.g. 6IVACO</Form.Text>}
                  </Form.Group>
                  <Button type="submit" variant="warning" block className={buttonClassNames} disabled={buttonIsDisabled} id="btnViewMeetingReaction" title="Click to view live reaction for this meeting">
                    {checking ?
                      <span>Checking meeting code...</span> :
                      <Fragment>
                        <span>View reaction</span>
                        <Icon name="forward" className="ml-2" />
                      </Fragment>
                    }
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