<script>
import { mapActions } from 'vuex'
import FileUploader from './FileUploader.vue'
import vueFilePond from 'vue-filepond'

import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
)
export default  {
  data(){
    return {
      file: {
        file: '',
        name: '',
        size: 0,
      },
      myFiles: [],
      errors: {},
      uploading: false,
      loading: false,
      breadcrumbs: [
        {
          text: this.$t('menu.files_list'),
          disabled: false,
          to: '/ocr/files',
        },
        {
        text: this.$t('menu.upload_file'),
        // to: '/settings/information',
        exact: true,
        disabled: true
      }],
      fileUploaded: null,
      serverConfig: {
        process: async (
          fieldName,
          file,
          metadata,
          load,
        ) => {
          try {
            this.isLoading = true
            this.file.file = file
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
    }
  },
  components:{
    FileUploader,
  },
  created(){
    this.setBreadCrumb({
      breadcrumbs: this.breadcrumbs,
      pageTitle: this.$t('menu.files_list')
    });
  },
  methods: {
    ...mapActions("app", ["setBreadCrumb"]),
    ...mapActions("files", ["uploadFile","uploadNewFile"]),
    handleFilePondInit() {
      console.log("FilePond has initialized", this.$refs.file.getFiles().file);
      this.uploading = true
    },
    handleFilePondUpload(e) {
      this.uploading = false
      console.log("FilePond ", e);
    },
    sendFile(){
        this.loading = true;
      console.log(this.file)
        this.uploadFile(this.file)
          .then(() => {
            this.loading = false;
            this.$router.push("/ocr/files-list")
          })
          .catch((error) => {
          this.loading = false;
          if (error.response.status == 422) {
            const { errors } = error?.response?.data ?? {};
            this.errors = errors ?? {};
          }
        });

    }
  }
}
</script>

<template>
<div class="w-100">
  <v-row align="center" justify="center">
    <v-col cols="8">
      <v-text-field
        v-model="file.name"
        :label="$t('files.name')"
        :error-messages="errors['name']"
        outlined
        dense
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row align="center" justify="center">
    <v-col cols="8">
          <file-pond
            name="test"
            ref="file"
            label-idle="Drop files here or <span class='filepond--label-action'>Browse</span>"
            :server="serverConfig"
            @init="handleFilePondInit"
          />
    </v-col>
    <v-col cols="12" class="py-0 text-center">
      <v-btn color="primary" min-width="200" min-height="50" :disabled="loading" @click="sendFile" :loading="loading">
        <span>{{$t("general.save")}}</span>
      </v-btn>
    </v-col>
  </v-row>
</div>
</template>

<style scoped>
.simple-spinner {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.simple-spinner span {
  display: block;
  width: 30px;
  height: 30px;
  border: 3px solid transparent;
  border-radius: 50%;
  border-right-color: rgba(255, 255, 255, 0.7);
  animation: spinner-anim 0.8s linear infinite;
}

@keyframes spinner-anim {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
