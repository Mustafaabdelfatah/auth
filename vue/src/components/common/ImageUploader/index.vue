<template>
    <div class="uploader">
        <div class="uploader__content">
            <div v-if="imageDataUrls.length" class="previews">
                <div v-for="(src, index) in imageDataUrls" :key="index" class="previews__image">
                    <img :src="src" alt="Image" />
                    <v-btn size="small" elevation="0" @click="removeImage(index)"
                        class="uploader-cancel--custom bg-red">
                        {{ t('buttons.delete_img') }}
                    </v-btn>
                </div>
            </div>
            <div v-else @drop.prevent="handleDrop" @dragover.prevent>
                <input type="file" ref="fileInput" @change="handleFileChange" :multiple="multiple" hidden
                    :accept="acceptExtensions" />
                <button @click="selectFile" type="button" class="uploader__btn">
                    <v-icon size="24" color="grey">mdi-image-outline</v-icon>
                    {{ label || t('general.upload_image') }}
                </button>
                <div class="drop-zone" @click="selectFile">
                    <p>{{ extensions.toUpperCase().replace(/,/g, ', ') }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { showAlert } from '@/composables/useAlert'
import { bytesToSize } from '@/utils/bytesCalculator'

const emit = defineEmits(['imageSelected', 'imageRemoved'])

const { t } = useI18n()
const props = defineProps({
    required: {
        type: Boolean,
        default: false
    },
    settingKey: String,
    isUpdating: Boolean,
    extensions: {
        type: String,
        default: ''
    },
    imagesUrls: {
        type: [Array, String],
        default: () => ''
    },
    label: String,
    description: String,
    multiple: {
        type: Boolean,
        default: false
    },
    max: {
        type: [Number, String],
        default: 1
    },
    maxSize: {
        type: Number,
        default: 1024
    }
})

const fileInput = ref(null)
const imageDataUrls = ref([])
const errorMessage = ref(null)

const allowedExtensions = computed(() => {
    return props.extensions ? props.extensions.split(',').map((ext) => ext.trim().toLowerCase()) : []
})

const acceptExtensions = computed(() => {
    return allowedExtensions.value.length
        ? allowedExtensions.value.map((ext) => `.${ext}`).join(',')
        : ''
})
const removeImage = (index) => {
    imageDataUrls.value.splice(index, 1)
    emit('imageRemoved', { key: props.settingKey })
}

const selectFile = () => fileInput.value.click()

const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    handleFiles(files)
}

const handleDrop = (event) => {
    const files = Array.from(event.dataTransfer.files)
    handleFiles(files)
}

const handleFiles = (files) => {
    errorMessage.value = null
    files.forEach((file) => {
        if (props.multiple && files.length > props.max) {
            errorMessage.value = t('UPLOAD_ERRORS.LIMIT_FILE_COUNT', { max: props.max })
            return
        }

        if (props.maxSize && file.size > props.maxSize) {
            errorMessage.value = t('UPLOAD_ERRORS.LIMIT_FILE_SIZE', {
                maxSize: bytesToSize(props.maxSize)
            })
            return
        }
        if (
            allowedExtensions.value.length &&
            !allowedExtensions.value.includes(file.name.split('.').pop().toLowerCase())
        ) {
            errorMessage.value = t('UPLOAD_ERRORS.LIMIT_FILE_TYPE', {
                allowedTypes: props.extensions.toUpperCase().replace(/,/g, ', ')
            })
            return
        }
        previewImage(file)
    })
    if (errorMessage.value) showAlert(errorMessage.value)

    passingDataToParent(files)
}
const passingDataToParent = (data) => {
    if (props.multiple) emit('imageSelected', { [props.settingKey]: data })
    else emit('imageSelected', { [props.settingKey]: data[0] })
}

const previewImage = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => imageDataUrls.value.push(e.target.result)
    reader.readAsDataURL(file)
}

watch(
    () => props.imagesUrls,
    (newVal) => {
        if (Array.isArray(newVal)) imageDataUrls.value = newVal
        else if (typeof newVal === 'string' && newVal.trim() !== '') imageDataUrls.value = [newVal]
        else imageDataUrls.value = []
    },
    { immediate: true }
)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
