import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsWordCloud from "highcharts/modules/wordcloud";
import HighchartsReact from "highcharts-react-official";

import { wordCloudOptionsData as defaultOptions } from "../../data/chartOptions";

HighchartsWordCloud(Highcharts);

class WordCloudChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elementId: this.props.id || "wordCloudChart",
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

export default WordCloudChart;