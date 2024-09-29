<template>
<!--  <v-col cols="12" md="6" class="pa-1">-->
<!--    <v-card class="card&#45;&#45;custom" :loading="loading">-->
<!--      <v-card-title-->
<!--        class="pa-2 text-h6&#45;&#45;custom text-center"-->
<!--        style="font-size: 16px;"-->
<!--      >-->
<!--        {{ ChartHeadTitle }}-->
<!--      </v-card-title>-->
<!--      {{ chartValues }}-->
<!--      <v-card-text>-->
<!--      </v-card-text>-->
<!--    </v-card>-->
<!--  </v-col>-->
  <highcharts :key="screenWidth" :options="chartOptions"></highcharts>
</template>
<script>
import Vue from "vue";
import Highcharts from "highcharts";
import HighchartsVue from "highcharts-vue";
Vue.use(HighchartsVue);

export default {
  name: "ZoneCountChart",
  props: {
    ChartHeadTitle: {
      type: String,
      default: ""
    },
    chartData: {
      type: Object,
      default: () => {}
    },
    // chartValues: {
    //   type: Object,
    //   default: () => {}
    // },
    // loading: {
    //   type: Boolean,
    //   default: false
    // }
  },

  data() {
    return {
      screenWidth: 1,

      chartOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        colors: ['#29D3C0', '#0B8D81', '#03594F'],
        credits: {
          enabled: false
        },
        tooltip: {
          useHTML: true,
          backgroundColor: '#fff',
          padding: 16,
          formatter: function() {
            return  `<div class="custom-tooltip position-relative"><span style="font-weight: 600; font-size: 1.2rem; color: #3F434A;">${Number(this.point.y).toFixed(2)}%</span> <br/> <span style="color: #8A9099; font-weight: 400; font-size: 1rem;">${this.point.name}</span></div>`;
          }
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
