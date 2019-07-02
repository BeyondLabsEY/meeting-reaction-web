import moment from "moment";

const DELTA = .25;

const height = "40%";
const fontFamily = `"EYInterstate", Arial, sans-serif`;
const backgroundColor = "transparent";
const spacingBottom = 0;

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
    "#7fd1d6",
    "#c893c7",
    "#95cb89",
    "#d8d2e0"
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
      return (`<span>${weight} ${occurrences} of </span><strong>${name}</strong>`);
    },
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
    spacingTop: 30,
    spacingRight: 15,
    spacingBottom,
    spacingLeft: 15
  },
  
  title,
  exporting,

  colors: [
    "#fff27f"
  ],

  plotOptions: {
    areaspline: {
      lineWidth: 3,
      negativeColor: "#c893c7",
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
            return (`<i class="icon-reaction-positive size-36" aria-label="Positive" />`);
          case 0:
            return (`<i class="icon-reaction-neutral size-36" aria-label="Neutral" />`);
          case -1:
            return (`<i class="icon-reaction-negative size-36" aria-label="Negative" />`);
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
        return (moment.unix(this.value).format("H:mmA"));
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
      const name = this.series.name;
      const { x, y } = this.point;
      const value = y.toFixed(1);
      const timestamp = moment.unix(x).format("H:mmA D/M/YYYY");
      
      return (`<span>${name}: </span><strong>${value}</strong><br /><small style="font-size: 12px;">${timestamp}</small>`);
    },
    style: {
      fontSize: "18px",
      fontWeight: 300
    },
    hideDelay,
    followTouchMove
  },

  credits
};