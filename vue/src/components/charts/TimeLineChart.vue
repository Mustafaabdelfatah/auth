<template>
  <v-col cols="12" :md="cols" class="pa-1">
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
  name: "ZoneCountChart",
  props: {
    cols: {
      type: String,
      default: "6"
    },
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
          type: "spline"
        },
        lang: {
          noData: this.$t("general.no_data_available")
        },
        credits: {
          enabled: false
        },
        ...this.$props.chartData
      }
    };
  },

  mounted() {
    this.$nextTick(() => {
      this.screenWidth += 1;
    });
  }
};
</script>
