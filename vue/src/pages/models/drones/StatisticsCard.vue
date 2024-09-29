<template>
  <v-row class="px-2 align-center">
    <v-col cols="12" class="py-1">
      <div class="general-stats-card">
        <!--          <h3 class="mb-2">-->
        <!--            {{ $t("general.statistics") }}-->
        <!--          </h3>-->
        <v-row v-if="cards.FilesCards">
          <v-col class="px-1" cols="12" sm="6" md="4" lg="3" v-for="(key, card) in cards.FilesCards[0]" :key="card">
            <v-card class="general-stats-card mb-md-0" :loading="loading" style="position: relative;">
              <v-card-text class="d-flex align-center justify-center flex-column" style="">
                <div>
                  <div class="d-flex align-center justify-center box-style" style="width: 70px;height: 70px;background-color: #29736a; padding: 10px;
                border-radius:  50%;position: absolute;top: -35px;right: 50%; transform: translateX(50%)">
                    <LottieAnimation ref="anim" :animationData="require('@/assets/images/lottie/scan.json')"
                      :loop="true" :autoPlay="true" class="lottie-icon" v-if="card == 'analyzing'" />
                    <LottieAnimation ref="anim" :animationData="require('@/assets/images/lottie/done.json')"
                      :loop="true" :autoPlay="true" class="lottie-icon" v-if="card == 'analyzed'" />
                    <LottieAnimation ref="anim" :animationData="require('@/assets/images/lottie/document.json')"
                      :loop="true" :autoPlay="true" class="lottie-icon" v-if="card == 'All_Uploads'" />
                    <LottieAnimation ref="anim" :animationData="require('@/assets/images/lottie/wait.json')"
                      :loop="true" :autoPlay="true" class="lottie-icon" v-if="card == 'pending'" />
                  </div>
                </div>
                <div class="align-center flex-column mt-5 mb-3">
                  <div class="mb-1 font-weight-bold" style="color: #000;font-size: 30px;">
                    <div v-if="!loading" class="text-center">
                      <span class="text-center" v-if="$vuetify.lang.current == 'en'">
                        {{ key }}
                      </span>
                      <span class="text-center" v-else>
                        {{ ConvertToArabicNumbers(key) }}
                      </span>
                    </div>
                  </div>

                  <span class="text-subtitle font-weight-bold text-center">
                    {{ $t("general.allStatus." + card) }}
                  </span>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12" sm="6" md="4" lg="3">
            <div class="card-loading">
              <div class="spinner-custom" data-size="40"></div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <div class="card-loading">
              <div class="spinner-custom" data-size="40"></div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <div class="card-loading">
              <div class="spinner-custom" data-size="40"></div>
            </div>
          </v-col>
          <v-col cols="12" sm="6" md="4" lg="3">
            <div class="card-loading">
              <div class="spinner-custom" data-size="40"></div>
            </div>
          </v-col>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";
import total from "@/assets/images/statsIcons/Total.svg";

import LottieAnimation from "lottie-web-vue";

export default {
  props: ["cards", "loading"],
  components: {
    LottieAnimation,
    total,
  },
  data() {
    return {
      isLoading: false,
      cardsIcons: {
        pending: "@/assets/images/lottie/file_scan.json",
        analyzing: "@/assets/images/lottie/file_scan.json",
        analyzed: "@/assets/images/lottie/file_scan.json",
        All_Uploads: "@/assets/images/lottie/file_scan.json",
      },
      modCards: {
        total: 20,
        people_count: 5,
        helmet: 4,
        gloves: 6,
        protection_jacket: 5
      }
    };
  },
  methods: {
    getColor(type) {
      const colors = {
        total: "primary--text",
        throwing_waste: "red--text",
        pollution: "orange--text",
        people_count: "indigo--text",
        leakage: "blue--text",
        pending: "yellow--text text--darken-1",
        analyzed: "primary--text text--darken-1",
        analyzing: "blue--text text--darken-1",

      };
      return type in colors ? colors[type] : "primary--text";
    },
    ConvertToArabicNumbers(num) {
      const arabicNumbers =
        "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
      return new String(num).replace(/[0123456789]/g, d => {
        return arabicNumbers[d];
      });
    },
  },
};
</script>

<style lang="scss">
//.v-application .text-caption {
//  font-family: "Cairo", sans-serif !important;
//}
.general-stats-card .col-lg-2 {
  //flex: 0 0 20%;
  //max-width: 20%;
}

.card-loading {
  position: relative;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 6px;
  box-shadow: rgba(85, 85, 85, 0.08) 0px 2px 2px -2px, rgba(85, 85, 85, 0.06) 0px 2px 10px 0px, rgba(85, 85, 85, 0.03) 0px 1px 15px 0px;
}
</style>
