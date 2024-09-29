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
export default {
  name: "BarLine",
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
      loading: false,
      chartOptions: {
        chart: {
          type: "area"
        },
        credits: {
          enabled: false
        },
        title: {
          text: ""
        },
        ...this.$props.chartData,
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              stops: [
                [0, Highcharts.getOptions().colors[4]],
                [
                  1,
                  Highcharts.color(Highcharts.getOptions().colors[4])
                    .setOpacity(0)
                    .get("rgba")
                ]
              ]
            },

            marker: {
              radius: 2
            },

            lineWidth: 1,

            states: {
              hover: {
                lineWidth: 1
              }
            },

            threshold: null
          }
        }
      }
    };
  }
};
</script>
