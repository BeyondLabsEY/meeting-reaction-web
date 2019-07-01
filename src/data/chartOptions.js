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
const colors = [
  "#c0c0c0",
  "#f0f0f0",
  "#ffe600",
  "#fff27f",
  "#ac98db",
  "#7fd1d6",
  "#c893c7",
  "#95cb89",
  "#d8d2e0"
];

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
  colors,

  plotOptions: {
    wordcloud: {
      rotation: {
        orientations: 1,
        to: 0
      },
      name: "Occurrences",
      style: {
        fontFamily,
        cursor: "default"
      }
    }
  },

  series: [{
    data: []
  }],
  
  legend: {
    enabled: false
  },

  tooltip: {
    headerFormat: null,
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
    hideDelay: .15,
    followTouchMove: false
  },

  credits
};