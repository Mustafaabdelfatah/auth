<template>
  <div class="d-flex flex-grow-1 flex-column">
    <div class="mb-3">
      <h2>{{pageTitle}}</h2>
      <p>{{pageDesc}}</p>
    </div>
    <StatisticsCard class="mb-lg-2 mb-xl-1 mb-md-3 mb-sm-3 mb-2" :cards="reports"></StatisticsCard>
    <v-row class="px-2">
        <v-col cols="12" lg="6" md="6" class="px-1 py-2">
          <v-card>
            <div v-if="loading"
              class="loading-card w-100 d-flex flex-grow-1 align-center justify-center"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <div v-else class="d-flex flex-column flex-grow-1">
              <v-card-title class="d-flex justify-space-between">
                <div class="d-flex justify-between">
                  {{ $t('general.allStatus.all_files_with_dates') }}
                </div>
              </v-card-title>
              <barChart :chartData="analyzedChartData"></barChart>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" lg="6" md="6" class="px-1 py-2">
          <v-card>
            <div v-if="loading"
              class="loading-card d-flex flex-grow-1 align-center justify-center"
            >
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            <div v-else class="d-flex flex-column flex-grow-1">
              <v-card-title class="d-flex justify-space-between">
                <div class="d-flex justify-between">
                  {{ $t('files.percentage') }}
                </div>
              </v-card-title>
              <pieChart :chartData="percentageChartData"></pieChart>
            </div>
          </v-card>
        </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

import barChart from "@/components/charts/BarChart.vue";
import pieChart from "@/components/charts/PieChart.vue";
// import lineChart from "../../components/dashboard/lineChart";
// import tableCard from "../../components/dashboard/TableCard";
// import showBuilderCards from "@/pages/reports/builder/ShowBuilderCards";
import StatisticsCard from "../models/drones/StatisticsCard.vue";

export default {
  name: "DashboardPage",
  components: {
    // column,
    // lineChart,
    // pie,
    // tableCard,
    // showBuilderCards,
    barChart,
    pieChart,
    StatisticsCard
  },
  created() {
    this.setBreadCrumb({
      breadcrumbs: this.breadcrumbs,
      pageTitle: this.$t("menu.dashboard"),
    });
  },
  data() {
    return {
      loading: false,
      isLoading: false,
      pinnedCards: {},
      breadcrumbs: [
        { text: this.$t("menu.dashboard"), disabled: false, href: "#" }
      ],
      analyzedChartData: {
        title: {
          text: ''
        },
        xAxis: {
          categories: [],
          crosshair: true
        },
        yAxis: {
          title: `${this.$t('reports.date')}`
        },
        series: [],
      },
      percentageChartData: {
        title: {
          text: ''
        },
        xAxis: {
          categories: [`${this.$t('reports.date')}`],
          crosshair: true
        },
        yAxis: {
          title: `${this.$t('reports.date')}`
        },
        series: [{
          // name: 'Share',
          data: [
          ]
        }],
      },
    };
  },
  computed: {
    ...mapState("reports", ["reports"]),
    ...mapState("app", [
      "pageTitle",
      "pageDesc",
    ]),
  },
  mounted(){
    this.fetchReports()
  },
  methods: {
    ...mapActions("reports", ["getReports"]),
    ...mapActions("app", ["setBreadCrumb"]),
    fetchReports(){
      this.loading = true;
      this.getReports()
        .then(response => {
          this.loading = false;
          this.reports.FilesChart.map((fc, index) => {
            this.analyzedChartData.series.push({name: "", data: []})
            this.analyzedChartData.series[index].name = fc.date
            this.analyzedChartData.series[index].data.push(fc.count)
            this.analyzedChartData.xAxis.categories.push("")
          })

          let keys = Object.keys(this.reports.FilesPercentage);
          let values = Object.values(this.reports.FilesPercentage);

          keys.map((fp,index) => {
            this.percentageChartData.series[0].data.push({name: this.$t('general.allStatus.' + fp), y: values[index]})
          })
        })
        .catch(error => {
          this.loading = false;
      })
    },
    ConvertToArabicNumbers(num) {
      const arabicNumbers =
        "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
      return new String(num).replace(/[0123456789]/g, d => {
        return arabicNumbers[d];
      });
    },
    formatDateTime(data) {
      let date = this.$vuetify.lang.current === 'en' ? moment(data).format("YYYY-MM-DD") : moment(data).format("DD-MM-YYYY");
      let time = moment(data).format("hh:mm:ss A");
      return { date, time };
    },
  }
};
</script>

<style>
.loading-card {
  min-height: 350px;
}
.draft-cont .v-card {
  height: 100%;
}
</style>
