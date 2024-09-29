<script>
import axios from "axios";
import { makeToast } from "@/helpers";
import moment from "moment";
export default {
  data() {
    return {
      link: process.env.VUE_APP_SERVER_URL || "https://ocr-gadd-api.wakeb.tech",
      isLoading: false
    };
  },
  props: {
    fileData: {
      type: Object
    },
    currentTab: {
      type: Number
    },
    isAnalyzing: {
      type: Boolean
    }
  },
  methods: {
    analyzeFile(file) {
      this.isLoading = true;
      let data = {
        id: file.id,
        path: file.path
      };
      axios
        .post(`analyze?id=${data.id}&path=${data.path}`)
        .then(res => {
          makeToast("success", res.data.message);
          this.$emit("setTab", "analyzing", 1);
          this.isLoading = false;
        })
        .catch(error => {
          this.isLoading = false;
        });
    },
    formatDateTime(data) {
      let date =
        this.$vuetify.lang.current == "en"
          ? moment(data).format("YYYY-MM-DD")
          : moment(data).format("DD-MM-YYYY");
      let time = moment(data).format("hh:mm:ss A");
      return { date, time };
    },
    ConvertToArabicNumbers(num) {
      const arabicNumbers =
        "\u0660\u0661\u0662\u0663\u0664\u0665\u0666\u0667\u0668\u0669";
      return new String(num).replace(/[0123456789]/g, d => {
        return arabicNumbers[d];
      });
    },
    showAnalyzedFile() {
      // this.$emit("showOriginal");
      this.router.push({
        name: "files.show",
        params: { id: this.fileData.id }
      });
    }
  }
};
</script>

<template>
  <div class="card-container position-relative">
    <div
      class="card-overlay d-flex align-center justify-center position-absolute top-0 left-0 w-full h-full"
      v-if="isLoading"
    >
      <div class="spinner-custom"></div>
    </div>
    <div
      class="card-icon"
      :class="{
        analyzed: fileData.status == 'analyzed',
        analyzing: fileData.status == 'analyzing'
      }"
    >
      <img src="/images/file.svg" alt="" />
      <img
        src="/images/file_done.svg"
        alt=""
        class="icon"
        v-if="fileData.status == 'analyzed'"
      />
    </div>
    <div class="card-info d-flex justify-space-between align-start">
      <div class="w-80">
        <h4 class="mb-0">{{ fileData.name }}</h4>
        <p class="mb-0 font-weight-bold" v-if="$vuetify.lang.current == 'en'">
          <span v-if="fileData.size == 0">
            {{ Number(fileData.size) }} KB
          </span>
          <span v-if="fileData.size > 1000 && fileData.size < 1000000">
            {{ Number(fileData.size / 1000).toFixed() }} KB
          </span>
          <span v-if="fileData.size > 1000000 && fileData.size < 10000000">
            {{ Number(fileData.size / (1000 * 1000)).toFixed() }} MB
          </span>
        </p>
        <p class="mb-0" v-else>
          <span v-if="fileData.size == 0">
            {{ ConvertToArabicNumbers(Number(fileData.size)) }} كيلوبايت
          </span>
          <span v-if="fileData.size > 1000 && fileData.size < 1000000">
            {{ ConvertToArabicNumbers(Number(fileData.size / 1000).toFixed()) }}
            كيلوبايت
          </span>
          <span v-if="fileData.size > 1000000 && fileData.size < 10000000">
            {{
              ConvertToArabicNumbers(
                Number(fileData.size / (1000 * 1000)).toFixed()
              )
            }}
            ميجابايت
          </span>
        </p>
      </div>
      <div class="card_actions_wrap">
        <v-menu offset-y left>
          <template v-slot:activator="{ on }">
            <transition name="slide-fade" mode="out-in">
              <v-btn small icon v-on="on" color="primary" class="ms-1 me-0">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </transition>
          </template>
          <v-list dense>
            <v-list-item v-if="currentTab == 0">
              <v-list-item-title>
                <span @click="analyzeFile(fileData)" style="cursor: pointer;">
                  <v-icon small>mdi-page-next-outline</v-icon>
                  <span class="mx-1">تحليل</span>
                </span>
              </v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-title>
                <a
                  style="text-decoration: none;color: unset;"
                  class="mr-auto text--transparent"
                  href="#"
                  @click="
                    $emit('showAnalyzed', link + '/storage/' + fileData.path)
                  "
                >
                  <v-icon small> mdi-file </v-icon>
                  <span class="mx-1 ">{{ $t("general.show_original") }}</span>
                </a>
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="currentTab == 2">
              <v-list-item-title>
                <router-link
                  :to="`/ocr/files-details/${fileData.id}`"
                  style="text-decoration: none;color: unset;"
                  class="mr-auto text--transparent"
                >
                  <v-icon small> mdi-file </v-icon>
                  <span class="mx-1 ">{{ $t("general.show_analyzed") }}</span>
                </router-link>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.v-application--is-rtl {
  .card_actions_wrap {
    position: absolute;
    top: 5px;
    left: 5px;
    right: unset;
  }
  .card-icon {
    .icon {
      right: -5px;
      left: unset;
    }
  }
}
.v-application--is-ltr {
  .card_actions_wrap {
    position: absolute;
    top: 5px;
    right: 5px;
    left: unset;
  }
  .card-icon {
    .icon {
      left: -5px;
      right: unset;
    }
  }
}
.card-container {
  position: relative;
  width: 100%;
  min-height: 80px;
  display: flex;
  align-items: center;
  gap: 9px;
  border: 1px solid #ececf2;
  background: #fff;
  //padding: 0 7px;
  border-radius: 10px;
  .card-icon {
    position: relative;
    min-width: 50px;
    width: 50px;
    height: 50px;
    //background: linear-gradient(0deg, #E3EFF0 0%, #E3EFF0 100%), var(--Color, #FFF);
    background: #e3eff0;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 12px;

    &.analyzing {
      //border: 2px dashed var(--v-primary-base);
      background-image: linear-gradient(
          90deg,
          var(--v-primary-base) 50%,
          transparent 50%
        ),
        linear-gradient(90deg, var(--v-primary-base) 50%, transparent 50%),
        linear-gradient(0deg, var(--v-primary-base) 50%, transparent 50%),
        linear-gradient(0deg, var(--v-primary-base) 50%, transparent 50%);
      background-repeat: repeat-x, repeat-x, repeat-y, repeat-y;
      background-size: 15px 2px, 15px 2px, 2px 15px, 2px 15px;
      background-position: left top, right bottom, left bottom, right top;
      animation: border-dance 1s infinite linear;
    }
    .icon {
      width: 18px;
      height: 18px;
      position: absolute;
      top: -5px;
    }
  }
  .card-info {
    width: 100%;
    padding: 0 8px;
    .time {
      position: absolute;
      left: 10px;
      top: 1px;
    }
    h4 {
      //margin-top: 7px;
      color: #1c1d21;
      max-width: 100%;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    p {
      color: #8181a5;
      font-size: small;
    }
  }
  .card-overlay {
    background: rgba(#e3eff0, 0.5);
    border-radius: 10px;
    z-index: 9;
  }
}
@keyframes border-dance {
  0% {
    background-position: left top, right bottom, left bottom, right top;
  }
  100% {
    background-position: left 15px top, right 15px bottom, left bottom 15px,
      right top 15px;
  }
}
</style>
