import React, { Component } from "react";
import { Nav, Tab, Container, Row, Col } from "react-bootstrap";
import ReactLoading from "react-loading";
import Axios from "axios";

import "./ReactionTabs.scss";
import { WORD_CLOUD } from "../../data/endpoints";
import { wordCloudOptionsData } from "../../data/chartOptions";

import WordCloudChart from "../WordCloudChart/WordCloudChart.jsx";
import Icon from "../Icon/Icon.jsx";

const REQUEST_INTERVAL_MINUTES = 5;
const CHART_HEIGHT_RATIO = 72;

class ReactionTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordCloud: null
    };
  }

  calcChartHeight() {
    return parseInt(CHART_HEIGHT_RATIO / (window.innerWidth / window.innerHeight));
  }

  fetchWordCloudData() {
    this.setState({
      wordCloud: null
    });

    Axios.get(WORD_CLOUD, {
      params: {
        code: this.props.code
      }
    }).catch(() => {
      console.warn("Unable to fetch meeting data. Please check your connection and try again.");

      this.setState({
        wordCloud: null,
        errorMessage: ""
      });
    }).then(response => {
      let wordCloud = wordCloudOptionsData;
      const { status, words } = response.data;
      if (status) {
        wordCloud.chart.height = `${parseInt(CHART_HEIGHT_RATIO / (window.innerWidth / window.innerHeight))}%`;
        wordCloud.series = [{
          data: words
        }];

        this.setState({
          wordCloud
        });
      }
    });
  }

  fetchData() {
    this.fetchWordCloudData();
  }

  componentDidMount() {
    this.fetchData()
    this.inverval = setInterval(() => (this.fetchData()), REQUEST_INTERVAL_MINUTES * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.inverval);
  }

  render() {
    const { wordCloud } = this.state;
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
        <Container>
          <Row>
            <Col>
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
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="word-cloud" role="tabpanel">
                  {(wordCloud) ? <WordCloudChart options={wordCloud} /> : <Loading />}
                </Tab.Pane>
                <Tab.Pane eventKey="facial-analysis" role="tabpanel">
                  <p>Facial Analysis</p>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Container>
      </Tab.Container>
    );
  }
}

export default ReactionTabs;