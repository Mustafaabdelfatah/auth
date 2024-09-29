<template>
  <v-col cols="12" md="6" class="pa-1">
    <v-card class="card--custom" :loading="loading">
      <v-card-title
        class="pa-2 text-h6--custom text-center"
        style="font-size: 16px;"
      >
        {{ ChartHeadTitle }}
      </v-card-title>
      <v-card-text>
        <highcharts :key="screenWidth" :options="chartOptions"></highcharts>
      </v-card-text>
    </v-card>
  </v-col>
</template>
<script>
import Vue from "vue";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
Vue.use(HighchartsVue);

export default {
  name: "BarLineChart",
  props: {
    ChartHeadTitle: {
      type: String,
      default: ""
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      screenWidth: 1,
      chartOptions: {
        chart: {
          zoomType: "xy"
        },
        title: {
          text: "",
          align: "left"
        },
        lang: {
          noData: this.$t("general.no_data_available")
        },
        credits: {
          enabled: false
        },
        yAxis: [
          {
            labels: {
              style: {
                color: Highcharts.getOptions().colors[1]
              },
              enabled: false
            },
            title: {
              text: ""
            }
          },
          {
            // Secondary yAxis
            title: {
              text: "",
              style: {
                color: Highcharts.getOptions().colors[0]
              }
            },
            labels: {
              format: "",
              style: {
                color: Highcharts.getOptions().colors[0]
              },
              enabled: false
            },
            opposite: false
          }
        ],
        ...this.$props.chartData
      }
    };
  },

  methods: {},
  mounted() {}
};
</script>
