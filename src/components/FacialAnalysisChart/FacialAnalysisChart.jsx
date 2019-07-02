import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { facialAnalysisOptionsData as defaultOptions } from "../../data/chartOptions";

class FacialAnalysisChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elementId: this.props.id || "facialAnalysisChart",
      chartOptions: this.props.options || defaultOptions
    };
  }

  render() {
    const { elementId, chartOptions } = this.state;

    return (
      <div id={elementId}>
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    );
  }
}

export default FacialAnalysisChart;