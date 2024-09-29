<template>
  <div v-if="showChart">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
export default {
  props: {
    // series: {
    //   type: Array,
    //   default: []
    // },
    // labels: {
    //   type: Array,
    //   default: []
    // },
    chartData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      showChart: false,
      labels: [],
      series: [],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
          borderRadius: 10
        },
        noData: {
          text: this.$t("general.no_data_available"),
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: this.$vuetify.theme.themes.light.primary,
            fontSize: "20px",
            fontFamily: undefined
          }
        },
        // colors: [this.$vuetify.theme.themes.light.primary],
        theme: {
          monochrome: {
            enabled: true,
            color: this.$vuetify.theme.themes.light.primary,
            shadeTo: "light",
            shadeIntensity: 0.8
          }
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded"
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"]
        },
        xaxis: {
          categories: this.labels
        },
        yaxis: {
          title: {
            text: ""
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function(val) {
              return +val + "";
            }
          }
        }
      }
    };
  },
  mounted() {
    this.showChart = true;
    this.chartData.map(chart => {
      console.log('chart => ', chart)
      this.labels.push(chart.date);
      this.series.push(chart.count);
    })
  }
};
</script>
