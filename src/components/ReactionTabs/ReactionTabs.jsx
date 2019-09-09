import React, { Component } from "react";
import { Nav, Tab, Container, Row, Col } from "react-bootstrap";
import ReactLoading from "react-loading";
import Axios from "axios";

import "./ReactionTabs.scss";
import { WORD_CLOUD, FACIAL_ANALYSIS, EMOTION } from "../../data/endpoints";
import { wordCloudOptionsData, facialAnalysisOptionsData, instantReactionOptionsData } from "../../data/chartOptions";

import WordCloudChart from "../WordCloudChart/WordCloudChart.jsx";
import FacialAnalysisChart from "../FacialAnalysisChart/FacialAnalysisChart.jsx";
import InstantReactionChart from "../InstantReactionChart/InstantReactionChart.jsx";
import Icon from "../Icon/Icon.jsx";

const REQUEST_INTERVAL_MINUTES = 3;
const CHART_HEIGHT_RATIO = 72;
const ERROR_MESSAGE = "Unable to fetch meeting data. Please check your connection and try again.";

class ReactionTabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wordCloud: null,
      facialAnalysis: null,
      instantReaction: null,
      wordCloudError: false,
      facialAnalysisError: false,
      instantReactionError: false
    };
  }

  calcChartHeight() {
    return parseInt(CHART_HEIGHT_RATIO / (window.innerWidth / window.innerHeight));
  }

  fetchWordCloudData() {
    if (this.state.wordCloud) {
      this.setState({
        wordCloud: null,
        wordCloudError: false
      });
    }
    
    if (this.state.wordCloudError) {
      this.setState({
        wordCloudError: false
      });
    }

    Axios.get(WORD_CLOUD, {
      params: {
        code: this.props.code
      }
    }).catch(() => {
      this.setState({
        wordCloud: null,
        wordCloudError: true
      });
    }).then(response => {
      let wordCloud = wordCloudOptionsData;
      const { status, words } = response.data;
      if (status) {
        wordCloud.chart.height = `${this.calcChartHeight()}%`;
        wordCloud.series = [{
          data: words
        }];

        this.setState({
          wordCloud,
          wordCloudError: false
        });
      } else {
        this.setState({
          wordCloud: null,
          wordCloudError: true
        });
      }
    });
  }

  fetchFacialAnalysisData() {
    if (this.state.facialAnalysis) {
      this.setState({
        facialAnalysis: null,
        facialAnalysisError: false
      });
    }
    
    if (this.state.facialAnalysisError) {
      this.setState({
        facialAnalysisError: false
      });
    }

    Axios.get(FACIAL_ANALYSIS, {
      params: {
        code: this.props.code
      }
    }).catch(() => {
      this.setState({
        facialAnalysis: null,
        facialAnalysisError: true
      });
    }).then(response => {
      let facialAnalysis = facialAnalysisOptionsData;
      const { status, facialTimeAnalysis } = response.data;
      if (status) {
        facialAnalysis.chart.height = `${this.calcChartHeight()}%`;
        facialAnalysis.series = [{
          name: "Emotion",
          data: facialTimeAnalysis.map((face) => ({
            name: face.persons,
            x: face.timestamp,
            y: face.value
          }))
        }];

        this.setState({
          facialAnalysis,
          facialAnalysisError: false
        });
      } else {
        this.setState({
          facialAnalysis: null,
          facialAnalysisError: true
        });
      }
    });
  }

  fetchInstantReactionData() {
    if (this.state.instantReaction) {
      this.setState({
        instantReaction: null,
        instantReactionError: false
      });
    }
    
    if (this.state.instantReactionError) {
      this.setState({
        instantReactionError: false
      });
    }

    Axios.get(EMOTION, {
      params: {
        code: this.props.code
      }
    }).catch(() => {
      this.setState({
        instantReaction: null,
        instantReactionError: true
      });
    }).then(response => {
      let instantReaction = instantReactionOptionsData;
      const { status, emotion } = response.data;
      if (status) {
        instantReaction.chart.height = `${this.calcChartHeight()}%`;
        instantReaction.series = [{
          name: "Reaction",
          data: emotion.map((scan) => ({
            name: scan.faces,
            y: parseInt(scan.percentage),
            x: scan.index
          }))
        }];

        this.setState({
          instantReaction,
          instantReactionError: false
        });
      } else {
        this.setState({
          instantReaction: null,
          instantReactionError: true
        });
      }
    });
  }

  fetchData() {
    this.fetchWordCloudData();
    this.fetchFacialAnalysisData();
    this.fetchInstantReactionData();
  }

  componentDidMount() {
    this.fetchData()
    this.inverval = setInterval(() => (this.fetchData()), REQUEST_INTERVAL_MINUTES * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.inverval);
  }

  render() {
    const { wordCloud, facialAnalysis, wordCloudError, facialAnalysisError, instantReaction, instantReactionError } = this.state;
    const Error = () => (
      <div className="error-message">
        <p className="text-center">{ERROR_MESSAGE}</p>
      </div>
    );
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
                    <span className="tab-title">Top Words</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item bsPrefix="tab">
                  <Nav.Link as="button" eventKey="facial-analysis" role="tab" bsPrefix="tab-button" id="btnFacialAnalysisTab">
                    <Icon name="reaction-positive" size="24" />
                    <span className="tab-title">Facial Analysis</span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item bsPrefix="tab">
                  <Nav.Link as="button" eventKey="instant-reaction" role="tab" bsPrefix="tab-button" id="btnInstantReactionTab">
                    <Icon name="reaction-percentage" size="24" />
                    <span className="tab-title">Instant Reaction</span>
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
                  {wordCloud ? <WordCloudChart options={wordCloud} /> : wordCloudError ? <Error /> : <Loading />}
                </Tab.Pane>
                <Tab.Pane eventKey="facial-analysis" role="tabpanel">
                  {facialAnalysis ? <FacialAnalysisChart options={facialAnalysis} /> : facialAnalysisError ? <Error /> : <Loading />}
                </Tab.Pane>
                <Tab.Pane eventKey="instant-reaction" role="tabpanel">
                  {instantReaction ? <InstantReactionChart options={instantReaction} /> : instantReactionError ? <Error /> : <Loading />}
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