<template>
    <div class="file-uploader">
        <div class="d-flex align-center justify-space-between">
            <div class="d-flex flex-column ga-2">
                <div class="d-flex align-center ga-2">
                    <v-avatar size="20" class="file-uploaded" :icon="checkIcon"></v-avatar>
                    <p class="file-title">
                        {{ singleKey }}
                    </p>
                </div>
                <div class="d-flex align-center ga-1" v-if="modelValue != null">
                    <v-avatar class="file-type" :icon="fileTypeIcon"></v-avatar>
                    <p class="file-size">
                        {{ showSize ? bytesToSize(modelValue.size) : modelValue.name }}
                    </p>
                </div>
            </div>
            <slot>
                <div v-if="uploadBtn">
                    <v-btn v-if="modelValue != null" @click="modelValue = null" :icon="xCircle" variant="text"
                        size="sm"></v-btn>
                    <v-btn v-else @click="fileUploader.click()" :append-icon="uploadCloud" variant="text"
                        class="btn-upload" size="sm">
                        {{ t('models.upload_file') }}
                    </v-btn>
                </div>

                <v-btn @click="openImage(modelValue.path)" v-else :append-icon="eye" variant="text" class="btn-upload"
                    size="sm">
                    {{ t('models.show') }}
                </v-btn>
            </slot>
        </div>
        <v-file-input ref="fileUploader" class="d-none" :loading="loading" v-model="modelValue" clearable
            variant="solo-inverted" :accept="accept" :placeholder="placeholder" :rules="rules"
            :counter-size-string="size" :multiple="multiple" :show-size="showSize" flat hide-details>
        </v-file-input>
    </div>
</template>

<script setup>
import checkIcon from '@/assets/images/svg/check-icon.svg'
import eye from '@/assets/images/svg/eye.svg'
import fileTypeIcon from '@/assets/images/svg/file-type-icon.svg'
import xCircle from '@/assets/images/svg/x-circle.svg'
import uploadCloud from '@/assets/images/svg/upload-cloud.svg'
import { bytesToSize } from '@/utils/bytesCalculator.js'

import { ref, defineProps, defineModel, computed, defineEmits, watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

const size = ref(null);
const loading = ref(false);
const fileUploader = ref(null)
const imagePath = ref(null)


// =(Props)=================>
const props = defineProps({
    multiple: {
        type: Boolean,
        default: false
    },
    rules: {
        type: String,
    },
    placeholder: {
        type: String,
    },
    accept: {
        type: String,
    },
    showSize: {
        type: Boolean,
        default: true
    },
    singleKey: {
        type: String,
    },
    uploadBtn: {
        type: Boolean,
        default: true
    }
});


const modelValue = defineModel();

const openImage = (path) => {
    const index = path
    window.open(`${imagePath.value}/${index}`, '_blank');
};

onMounted(() => {
    imagePath.value = import.meta.env.VITE_SERVER_URL_STORAGE
});
</script>

