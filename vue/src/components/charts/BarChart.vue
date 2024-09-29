<template>
    <highcharts :key="screenWidth" :options="chartOptions" ref="barChart"></highcharts>
</template>
<script>
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
HighchartsExporting(Highcharts);
HighchartsExportData(Highcharts);

export default {
  name: "BarChart",
  props: {
    ChartHeadTitle: {
      type: String,
      default: ""
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    // loading: {
    //   type: Boolean,
    //   default: false
    // }
  },
  components: {

  },
  data() {
    return {
      screenWidth: 1,
      chartOptions: {
        chart: {
          type: "column",
          numberFormatter: function () {
            const ret = Highcharts.numberFormat.apply(0, arguments);
            return (ret);
          },
        },
        lang: {
          noData: this.$t("general.no_data_available")
        },
        credits: {
          enabled: false
        },
        legend: {
          enabled: false, // Set to false to hide the legend
        },
        colors: ['#03594F'],
        plotOptions: {
          column: {
            maxPointWidth: 50,
            dataLabels: {
              enabled: false,
              // rotation: -90,
              color: '#FFFFFF',
              align: 'center',
              // justify: 'start',
              format: '{point.y}', // one decimal
              y: 75, // 10 pixels down from the top
              style: {
                fontSize: '13px',
                // fontFamily: 'Verdana, sans-serif'
              }
            }
          }
        },
        tooltip: {
          useHTML: true,
          backgroundColor: '#fff',
          padding: 16,
          formatter: function() {
            return  `<div class="custom-tooltip position-relative"><span style="font-weight: 600; font-size: 1.2rem; color: #3F434A;">${this.y}</span> <br/> <span style="color: #8A9099; font-weight: 400; font-size: 1rem;">${this.series.name}</span></div>`;
          }
        },
        // tooltip: {
        //   backgroundColor: '#fff',
        //   padding: 16,
        //   headerFormat: '<span style="font-weight: bold; color: var(--v-primary-base)">{series.name}</span><br>',
        //   pointFormat: '<span style="text-align: center; margin: 0 auto;">{point.y}</span>'
        // },
        exporting: {
          enabled: true, // Enable exporting
          buttons: {
            contextButton: {
              menuItems: [
                "downloadPNG", // Export as PNG
                "downloadJPEG", // Export as JPEG
                "downloadPDF", // Export as PDF
                "downloadSVG", // Export as SVG
                "separator",
                "downloadCSV", // Export data as CSV
                "downloadXLS", // Export data as XLS (Excel)
              ],
            },
          },
        },
        ...this.$props.chartData
      }
    };
  },
  methods: {
    ConvertToArabicNumbers(num) {
      const arabicNumbers =
        "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
      return new String(num).replace(/[0123456789]/g, d => {
        return arabicNumbers[d];
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.screenWidth += 1;
    });
  }
};
</script>

<style>
.custom-tooltip {
    text-align: center; /* Center text horizontally */
    //display: flex;
    //flex-direction: column;
    //justify-content: center;
    //align-items: center;
    white-space: nowrap; /* Prevent line breaks */
}
</style>
