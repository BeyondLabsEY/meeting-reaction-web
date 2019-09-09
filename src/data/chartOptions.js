import moment from "moment";

const DELTA = .25;

const height = "40%";
const fontFamily = `"EYInterstate", Arial, sans-serif`;
const backgroundColor = "transparent";
const spacingTop = 30;
const spacingRight = 15;
const spacingBottom = 0;
const spacingLeft = 15;

const title = {
  text: null
};
const exporting = {
  enabled: false
};

const cursor = "default";

const gridLineWidth = 1;
const gridLineColor = "#495057";
const gridLineDashStyle = "dash";

const series = [{
  data: []
}];
const legend = {
  enabled: false
};

const headerFormat = null;
const hideDelay = .15;
const followTouchMove = false;

const credits = {
  enabled: false
};

export const wordCloudOptionsData = {
  chart: {
    type: "wordcloud",
    height,
    style: {
      fontFamily
    },
    backgroundColor,
    spacingBottom
  },
  
  title,
  exporting,
  
  colors: [
    "#c0c0c0",
    "#fff27f",
    "#d8d2e0",
    "#c893c7",
    "#7fd1d6",
    "#95cb89"
  ],

  plotOptions: {
    wordcloud: {
      rotation: {
        orientations: 1,
        to: 0
      },
      name: "Occurrences",
      style: {
        fontFamily,
      },
      cursor
    }
  },

  series,
  legend,

  tooltip: {
    headerFormat,
    formatter() {
      const { name, weight } = this.point;
      let occurrences = "occurrence";
      if (weight > 1) {
        occurrences += "s";
      }

      return (`
        <div>
          <span>${weight}</span>
          <small>${occurrences} of</small>
          <strong>${name}</strong>
        </div>
      `);
    },
    useHTML: true,
    style: {
      fontSize: "18px",
      fontWeight: 300
    },
    hideDelay,
    followTouchMove
  },

  credits
};

export const facialAnalysisOptionsData = {
  chart: {
    type: "areaspline",
    height,
    style: {
      fontFamily
    },
    backgroundColor,
    spacingTop,
    spacingRight,
    spacingBottom,
    spacingLeft
  },
  
  title,
  exporting,

  colors: [
    "#fff27f"
  ],

  plotOptions: {
    areaspline: {
      lineWidth: 4,
      negativeColor: "#d8d2e0",
      fillOpacity: .5,
      style: {
        fontFamily
      },
      cursor
    }
  },

  yAxis: {
    title,
    max: 1 + DELTA,
    min: -1 - DELTA,
    tickInterval: DELTA,
    labels: {
      formatter() {
        switch (this.value) {
          case 1:
            return (`<i class="icon-reaction-positive size-36" aria-label="Positive"></i>`);
          case 0:
            return (`<i class="icon-reaction-neutral size-36" aria-label="Neutral"></i>`);
          case -1:
            return (`<i class="icon-reaction-negative size-36" aria-label="Negative"></i>`);
          default:
            return null;
        }
      },
      useHTML: true,
      style: {
        color: "#c0c0c0"
      }
    },
    gridLineWidth: 0,
    plotLines: [
      {
        value: 1,
        width: gridLineWidth,
        color: gridLineColor,
        dashStyle: gridLineDashStyle
      },
      {
        value: 0,
        width: gridLineWidth,
        color: gridLineColor,
        dashStyle: gridLineDashStyle
      },
      {
        value: -1,
        width: gridLineWidth,
        color: gridLineColor,
        dashStyle: gridLineDashStyle
      }
    ]
  },

  xAxis: {
    lineWidth: 0,
    tickWidth: 0,
    labels: {
      formatter() {
        return (moment.unix(this.value).utc().format("H:mm"));
      },
      style: {
        color: "#c0c0c0",
        fontSize: "12px",
        fontWeight: 300
      },
      autoRotationLimit: 90
    },
    gridLineWidth,
    gridLineColor,
    gridLineDashStyle
  },

  series,
  legend,

  tooltip: {
    headerFormat,
    formatter() {
      const { x, y, name } = this.point;
      const value = y.toFixed(1);
      const timestamp = moment.unix(x).utc().format("H:mm D/M/YYYY");
      const peoplePerson = (name > 1) ? "people" : "person";
      const peoplePersonInfo = `${name} ${peoplePerson}`;
      
      return (`
        <div style="text-align: center;">
          <span>${this.series.name}:</span>
          <strong>${value}</strong>
        </div>
        <div style="text-align: center;">
          <small>${timestamp}</small>
        </div>
        <div style="text-align: center;">
          <small>
            <i class="icon-${peoplePerson}" aria-hidden="true"></i>
            <strong>${peoplePersonInfo}</strong>
          </small>
        </div>
      `);
    },
    useHTML: true,
    style: {
      fontSize: "18px",
      fontWeight: 300
    },
    hideDelay,
    followTouchMove
  },

  credits
};

export const instantReactionOptionsData = {
  chart: {
    type: "column",
    height,
    style: {
      fontFamily
    },
    backgroundColor,
    spacingTop,
    spacingRight,
    spacingBottom,
    spacingLeft
  },

  title,
  exporting,

  colors: [
    "#fff27f",
    "#d8d2e0"
  ],

  plotOptions: {
    column: {
      colorByPoint: true,
      pointPadding: 0,
      borderColor: "transparent",
      style: {
        fontFamily
      },
      cursor
    },
    series: {
      dataLabels: {
        enabled: true,
        align: "center",
        formatter() {
          const { y, color } = this;
          const percentage = `${y}%`;

          return (`<span style="color: ${color};">${percentage}</span>`);
        },
        style: {
          fontSize: "42px",
          fontWeight: 400,
          textOutline: "1px #2e2e38"
        }
      }
    }
  },

  yAxis: {
    title,
    max: 100,
    tickInterval: 10,
    labels: {
      formatter() {
        return (`${this.value}%`);
      },
      style: {
        color: "#c0c0c0",
        fontSize: "12px",
        fontWeight: 300
      }
    },
    gridLineColor,
    gridLineDashStyle
  },

  xAxis: {
    lineWidth: 0,
    tickWidth: 0,
    labels: {
      formatter() {
        switch (this.value) {
          case 0:
            return (`<i class="icon-reaction-positive size-48" aria-label="Positive"></i>`);
          case 1:
            return (`<i class="icon-reaction-negative size-48" aria-label="Negative"></i>`);
          default:
            return null;
        }
      },
      useHTML: true,
      style: {
        color: "#c0c0c0"
      },
      x: 0,
      y: 30
    }
  },

  series,
  legend,

  tooltip: {
    headerFormat,
    formatter() {
      const { x, y, name } = this.point;
      const percentage = `${y.toFixed(0)}%`;
      const peoplePerson = (name > 1) ? "people" : "person";
      const peoplePersonInfo = `${name} ${peoplePerson}`;
      
      let reaction;
      switch(x) {
        case 0:
          reaction = "Positive";
          break;
        case 1:
          reaction = "Negative";
          break;
        default:
          reaction = null;
      }
      
      return (`
        <div style="text-align: center;">
          <span>${reaction}:</span>
          <strong>${percentage}</strong>
        </div>
        <div style="text-align: center;">
          <small>
            <i class="icon-${peoplePerson}" aria-hidden="true"></i>
            <strong>${peoplePersonInfo}</strong>
          </small>
        </div>
      `);
    },
    useHTML: true,
    style: {
      fontSize: "18px",
      fontWeight: 300
    },
    hideDelay,
    followTouchMove
  },

  credits
};