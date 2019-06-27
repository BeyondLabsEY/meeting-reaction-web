import React, { Component, Fragment } from "react";
import { Nav, Tabs, Tab } from "react-bootstrap";
import Axios from "axios";

import "./ReactionTabs.scss";

import Icon from "../Icon/Icon.jsx";

class ReactionTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switch: true,
      words: null
    };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab() {
    this.setState({
      switch: ! this.state.switch
    });
  }

  fetchWordCloudData() {
    Axios.get(`https://meeting-reaction.azurewebsites.net/api/getWordCloud?code=${this.props.code}`).catch(() => {
      console.warn("Unable to fetch meeting data. Please check your connection and try again.");
    }).then(response => {
      const { status, words } = response.data;
      console.log(response.data);
      if (status) {
        this.setState({
          words
        });
      }
    });
  }

  fetchData() {
    this.fetchWordCloudData();
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <Fragment>
        <Tab.Container defaultActiveKey="word-cloud" id="reactionTabs">
          <Nav as="ul" variant="pills" justify bsPrefix="tabs">
            <Nav.Item bsPrefix="tab">
              <Nav.Link as="button" eventKey="word-cloud" role="tab" bsPrefix="tab-button" id="btnWordCloudTab">
                <Icon name="word-cloud" size="24" />
                <span className="tab-title">Word cloud</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item bsPrefix="tab">
              <Nav.Link as="button" eventKey="live-reaction" role="tab" bsPrefix="tab-button" id="btnLiveReactionTab">
                <Icon name="reaction" size="24" />
                <span className="tab-title">Live reaction</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="word-cloud">
              <p>word cloud tab</p>
            </Tab.Pane>
            <Tab.Pane eventKey="live-reaction">
              <p>live reaction</p>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Fragment>
    );
  }
}

export default ReactionTabs;