import React, { Component } from "react";
import { Nav, Tab } from "react-bootstrap";
import ReactLoading from "react-loading";
import Axios from "axios";

import "./ReactionTabs.scss";
import { WORD_CLOUD } from "../../data/endpoints";
import { wordCloudOptionsData } from "../../data/chartOptions";

import WordCloudChart from "../WordCloudChart/WordCloudChart.jsx";
import Icon from "../Icon/Icon.jsx";

class ReactionTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switch: true,
      wordCloud: null,
      fetching: true
    };
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab() {
    this.setState({
      switch: ! this.state.switch
    });
  }

  fetchWordCloudData() {
    Axios.get(WORD_CLOUD, {
      params: {
        code: this.props.code
      }
    }).catch(() => {
      console.warn("Unable to fetch meeting data. Please check your connection and try again.");
    }).then(response => {
      let wordCloud = wordCloudOptionsData;
      const { status, words } = response.data;
      if (status) {
        wordCloud.series = [{
          data: words
        }];

        this.setState({
          wordCloud,
          fetching: false
        });
      }

      console.log("Words:", this.state.words);
    });
  }

  fetchData() {
    this.fetchWordCloudData();
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { wordCloud, fetching } = this.state;
    const Loading = () => (
      <div className="content-loading">
        <ReactLoading
          type="bubbles"
          color="#fff27f"
        />
      </div>
    );

    return (
      <Tab.Container defaultActiveKey="word-cloud" id="reactionTabs">
        <Nav as="ul" variant="pills" bsPrefix="tabs" justify>
          <Nav.Item bsPrefix="tab">
            <Nav.Link as="button" eventKey="word-cloud" role="tab" bsPrefix="tab-button" id="btnWordCloudTab">
              <Icon name="word-cloud" size="24" />
              <span className="tab-title">Word cloud</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item bsPrefix="tab">
            <Nav.Link as="button" eventKey="facial-analysis" role="tab" bsPrefix="tab-button" id="btnFacialAnalysisTab">
              <Icon name="reaction" size="24" />
              <span className="tab-title">Facial Analysis</span>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="word-cloud" role="tabpanel">
            {(fetching) ? <Loading /> : <WordCloudChart options={wordCloud} />}
          </Tab.Pane>
          <Tab.Pane eventKey="facial-analysis" role="tabpanel">
            <p>Facial Analysis</p>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    );
  }
}

export default ReactionTabs;