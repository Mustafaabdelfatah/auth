<script>
import * as docx from "docx-preview";
import card from "./card.vue";
import LottieAnimation from "lottie-web-vue";
import vueFilePond from "vue-filepond";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);
import { mapActions, mapState } from "vuex";
export default {
  components: {
    card,
    LottieAnimation
    // LottieJSON
  },
  data() {
    return {
      isLoading: false,
      uploadLoading: false,
      selected_file: "",
      filePreviewDialog: false,
      dialogUpload: false,
      fileAnalyzedDialog: false,
      link: process.env.VUE_APP_SERVER_URL || "https://cv-ocr-api.wakeb.tech",
      tabs: [
        { name: this.$t("files.tabs.uploaded"), value: "pending" },
        { name: this.$t("files.tabs.analyzing"), value: "analyzing" },
        { name: this.$t("files.tabs.analyzed"), value: "analyzed" }
      ],
      breadcrumbs: [
        {
          text: this.$t("menu.files"),
          disabled: false,
          href: "#"
        }
      ],
      activeTab: 0,
      activeTabWord: "pending",
      initialLoading: false,
      loading: false,
      analyzedFileSrc: null,
      file: {
        file: "",
        name: "",
        size: 0
      },
      uploading: false,
      fileUploaded: null,
      serverConfig: {
        process: async (fieldName, file, metadata, load) => {
          try {
            // this.isLoading = true
            this.file.file = file;
            // await this.uploadNewFile(file).then((res) => {
            //   this.fileUploaded = res;
            // });
            load("loadedFile");
          } catch (error) {
            if (error?.status === 422) {
              console.log(error?.data);
              this.errorFile = error?.data?.message;
            }
          }
        }
      },
      errors: {}
    };
  },
  computed: {
    ...mapState("files", ["files"]),
    ...mapState("app", ["pageTitle", "pageDesc"])
  },
  methods: {
    ...mapActions("files", ["getFiles", "uploadFile", "uploadNewFile"]),
    ...mapActions("app", ["setBreadCrumb"]),
    setTab(tab, num) {
      this.activeTab = num;
      this.activeTabWord = tab;
      this.fetchFiles();
    },
    fetchFiles(page) {
      this.isLoading = true;
      let data = {
        page: page,
        status: this.activeTabWord
      };
      this.getFiles(data)
        .then(res => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        })
        .catch(() => {
          setTimeout(() => {
            this.isLoading = false;
          }, 500);
        });
    },
    init(file) {
      this.initialLoading = true;
      if (
        file &&
        file.analysed_path
          .toString()
          .split(".")
          .pop()
          .toLowerCase() !== "pdf"
      ) {
        this.initDocFile(file.id, "filePreview-container");
        this.filePreviewDialog = true;
        this.selected_file = file;
      }
    },
    initDocFile(id, container) {
      this.$axios
        .get(`/file-preview`, {
          params: {
            id: id
          }
        })
        .then(response => {
          this.initialLoading = false;
          const base64String = response.data.base64_data;
          const binaryString = atob(base64String);
          const uint8Array = new Uint8Array(binaryString.length);
          for (let i = 0; i < binaryString.length; i++) {
            uint8Array[i] = binaryString.charCodeAt(i);
          }

          const blob = new Blob([uint8Array], {
            type: "application/octet-stream"
          });
          if (container === "filePreview-container") {
            this.fileBlob = blob;
            console.log(this.fileBlob);
          }

          docx
            .renderAsync(blob, document.getElementById(container))
            .then(x => console.log("docx: finished"));
        })
        .catch(error => {
          console.log(error);
          this.initialLoading = false;
        });
    },
    openAnalyzedDialog(fileSrc) {
      console.log("FILE => ", fileSrc);
      this.fileAnalyzedDialog = true;
      this.analyzedFileSrc = fileSrc;
    },
    handleFilePondInit() {
      this.uploading = true;
    },
    handleFilePondUpload(e) {
      this.uploading = false;
    },
    sendFile() {
      this.uploadLoading = true;
      this.uploadFile(this.file)
        .then(() => {
          this.uploadLoading = false;
          this.dialogUpload = false;
          this.fetchFiles();
        })
        .catch(error => {
          this.uploadLoading = false;
          if (error.response.status == 422) {
            const { errors } = error?.response?.data ?? {};
            this.errors = errors ?? {};
          }
        });
    },
    downloadFile() {
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(this.fileBlob);
      downloadLink.download = this.selected_file.name + ".docx"; // Set the desired file name

      // Append the link to the document
      document.body.appendChild(downloadLink);

      // Trigger a click event to initiate the download
      downloadLink.click();
    }
  },
  created() {
    this.setBreadCrumb({
      breadcrumbs: this.breadcrumbs,
      pageTitle: this.$t("menu.files"),
      pageDesc: this.$t("files.pageDesc")
    });
    this.fetchFiles();
  }
};
</script>

<template>
  <div class=" w-100">
    <div class="d-flex justify-space-between align-center">
      <div class="page_info">
        <h2>{{ pageTitle }}</h2>
        <p>{{ pageDesc }}</p>
      </div>
      <div>
        <v-btn @click="dialogUpload = true" class="add_btn" color="primary">
          {{ $t("files.addFile") }}
        </v-btn>
      </div>
    </div>
    <v-row class="w-100">
      <v-col cols="12" class="pb-0">
        <v-tabs class="my-2 tabCont-custom" v-model="activeTab" hide-slider>
          <v-tab
            v-for="tab in tabs"
            :key="tab.name"
            :value="tab.value"
            :disabled="isLoading"
            @click="setTab(tab.value)"
            >{{ tab.name }}
          </v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" class="pt-1 w-100">
        <v-tabs-items v-model="activeTab">
          <v-tab-item v-for="(item, index) in tabs.length" :key="index">
            <v-row v-if="!isLoading">
              <v-col
                cols="12"
                v-if="files.data.length == 0"
                class="d-flex align-center flex-column"
              >
                <LottieAnimation
                  ref="anim"
                  :animationData="require('@/assets/images/lottie/noData.json')"
                  :loop="true"
                  :autoPlay="true"
                  class="lottie-icon"
                />
                <!--                <v-img-->
                <!--                  width="300"-->
                <!--                  :src="require('@/assets/images/noData.png')"-->
                <!--                  alt="noData"-->
                <!--                ></v-img>-->
                <!--                <div>-->
                <!--                  {{$t("general.no_data_available")}}-->
                <!--                </div>-->
              </v-col>

              <v-col v-else cols="12">
                <v-row class="w-100 mx-0 pt-3">
                  <v-col
                    class="pa-1"
                    cols="12"
                    lg="3"
                    md="4"
                    sm="6"
                    v-for="file in files.data"
                    :key="file.id"
                  >
                    <card
                      @setTab="setTab"
                      :fileData="file"
                      :currentTab="activeTab"
                      @showOriginal="init(file)"
                      @showAnalyzed="openAnalyzedDialog(file)"
                      :is-analyzing="file.status == 'analyzing'"
                    ></card>
                  </v-col>
                  <v-col cols="12">
                    <v-pagination
                      v-if="Math.ceil(files.total / files.per_page) > 1"
                      tag="nav"
                      size="small"
                      rounded="circle"
                      v-model="files.current_page"
                      :length="Math.ceil(files.total / files.per_page)"
                      :total-visible="6"
                      @input="fetchFiles(files.current_page)"
                    >
                    </v-pagination>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-row class="loading_tabs" v-else>
              <v-col class="h-full">
                <div class="spinner-custom" data-size="40"></div>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-col>
    </v-row>

    <!--  Upload File  -->
    <v-dialog v-model="dialogUpload" max-width="600">
      <v-card>
        <v-card-title>
          {{ $t("files.uploadFile") }}
        </v-card-title>

        <v-container>
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-text-field
                v-model="file.name"
                :label="$t('files.name')"
                :error-messages="errors['name']"
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-1">
              <LottieAnimation
                ref="anim"
                :animationData="
                  require('@/assets/images/lottie/upload_file.json')
                "
                :loop="true"
                :autoPlay="true"
                class="lottie-icon"
              />
              <file-pond
                name="test"
                ref="file"
                :label-idle="
                  $t('files.drag') +
                    ' ' +
                    $t('files.or') +
                    ' ' +
                    $t('files.choose')
                "
                :server="serverConfig"
                @init="handleFilePondInit"
              />
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="primary"
            text
            :disabled="uploadLoading"
            @click="sendFile"
            :loading="uploadLoading"
          >
            <span>{{ $t("general.save") }}</span>
          </v-btn>

          <v-btn color="error darken-1" text @click="dialogUpload = false">
            {{ $t("general.cancel") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--  File Preview  -->
    <v-dialog
      v-model="filePreviewDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ $t("general.filePreview") }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="filePreviewDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text v-if="!loading" class="pt-3">
          <v-row>
            <v-col cols="12">
              <v-btn color="primary" min-width="200" @click="downloadFile">{{
                $t("general.download")
              }}</v-btn>
            </v-col>
            <v-col cols="12">
              <!--                <v-btn class="mb-4" color="primary" @click="downloadFile">-->
              <!--                  <v-icon class="me-1"> mdi-download </v-icon>-->
              <!--                  تحميل الملف-->
              <!--                </v-btn>-->
              <div
                id="filePreview-container"
                style="direction: initial !important;"
              ></div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Analyzed File Preview  -->
    <v-dialog
      v-model="fileAnalyzedDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>{{ $t("general.filePreview") }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon dark @click="fileAnalyzedDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="file-analize__prev pt-3">
          <v-row v-if="analyzedFileSrc" class="h-full">
            <v-col cols="12" class="h-full">
              <iframe
                :src="link + '/storage/' + analyzedFileSrc.path"
                style="width: 100%; height: 100%;"
              ></iframe>
            </v-col>
          </v-row>
          <v-row v-else>
            Loading
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.loading_tabs {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-application--is-rtl {
  .v-tab {
    &:not(:first-child) {
      border-right: 2px solid #d0d5dd;
    }
  }
}

.v-application--is-ltr {
  .v-tab {
    &:not(:last-child) {
      border-right: 2px solid #d0d5dd;
    }
  }
}

.page_info {
  p {
    color: #606165;
  }
}

.file-analize__prev {
  min-height: calc(100vh - 100px);

  iframe {
    min-height: calc(100vh - 130px);
  }
}

.v-tabs {
  background-color: #f9fafb;
  width: fit-content !important;
  border-radius: 8px !important;
  border: 1px solid #d0d5dd;
  overflow: hidden;
  flex-wrap: wrap;
  display: flex;
}

.v-tab {
  padding: 0px 35px !important;
  color: #344054 !important;
  /* height: 40px !important; */
  //font-size: 12px !important;
  //font-weight: 600 !important;
}

.v-tab--active {
  color: #fff !important;
  background-color: var(--v-primary-base);

  //border-radius: 8px;
  //text-decoration: none !important;
}

.v-tabs-slider-wrapper {
  display: none !important;
  height: unset !important;
  left: 0 !important;
  width: 0 !important;
}
</style>
