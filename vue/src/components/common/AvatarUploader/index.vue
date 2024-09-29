<template>
    <div class="avtar_uploader-preview-cont">
        <div @click="browseImage" class="avtar_uploader d-flex align-center justify-space-between pa-3">
            <div class="d-flex flex-column justify-center align-center mx-auto" v-if="!url">
                <div class="d-flex">
                    <v-icon size="40" color="grey">mdi-image-outline</v-icon>
                </div>
                <p class="mb-0 text-center">
                    <template v-if="description">{{ description }}</template>
                    <slot v-else-if="$slots.content" name="content"></slot>
                </p>
            </div>

            <div class="uploader-preview">
                <img v-if="url" :src="url" />
                <div @click.stop="handleMultiImages" v-if="url && !isUpdating && !hidden_close"
                    class="uploader-cancel position-absolute d-flex align-center justify-center bg-error rounded-pill">
                    <v-icon size="15">mdi-delete-outline</v-icon>
                </div>
                <div @click.stop="browseImage" v-if="!url"
                    class="uploader-cancel position-absolute d-flex align-center justify-center bg-primary rounded-pill">
                    <v-icon size="15" color="white">mdi-pencil-outline</v-icon>
                </div>
            </div>

            <input @abort="handle" @change="changeFile" v-bind="$attrs" type="file" ref="inputUploader" class="d-none"
                :multiple="multiple" />
        </div>
    </div>
</template>

<script setup>
import { ref, toRef, onBeforeMount, onUpdated, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { bytesToSize } from '@/utils/bytesCalculator'
import { useI18n } from 'vue-i18n'
import { showAlert } from '@/composables/useAlert'

const props = defineProps({
    label: String,
    description: String,
    isUpdating: Boolean,
    hidden_close: {
        type: [Boolean, String],
        default: false
    },
    required: {
        type: Boolean,
        default: false
    },
    previewUrl: {
        type: String,
        default: null
    },
    multiple: {
        type: Boolean,
        default: false
    },
    extensions: {
        type: String,
        default: ''
    },
    max: {
        type: [Number, String],
        default: 3
    },
    maxSize: {
        type: [Number, String],
        default: 1024
    }
})
const multiple = toRef(props.multiple)
const url = ref(null)
const urls = ref([])
const files = ref(null)
const inputUploader = ref(null)
const { t } = useI18n()
const emit = defineEmits(['cancelled', 'update:model-value', 'browseAvatar'])

onBeforeMount(() => {
    url.value = props.previewUrl
})

onMounted(() => {
    url.value = props.previewUrl
})

onUpdated(() => {
    if (!url.value) {
        url.value = props.previewUrl
    }
})

// Functions
const browseImage = () => {
    inputUploader.value.click()
}

const changeFile = (event) => {
    const fileList = Array.from(event.target.files)

    const file = fileList[0]
    if (invalid([file])) {
        return errorMessage('Invalid extension supplied')
    } else if (invalidSize(file)) {
        return errorMessage(
            t('validation.errorMaxSize'),
            { size: bytesToSize(file.size) },
            { maxSize: bytesToSize(props.maxSize) }
        )
    }
    renderImageOnly(file)
    emit('update:model-value', file)
    resetInputUploader()
}

const renderImageOnly = (file) => {
    if (!file.type.match('image/*')) {
        urls.value.push('/avatar.svg')
    }
    const reader = new FileReader()
    reader.onloadend = () => {
        url.value = reader.result
    }
    reader.readAsDataURL(file)
}

const errorMessage = (message) => {
    showAlert(response.message, 'success')
}

const invalid = (files) => {
    const extensions = props.extensions.split(',').join('|')
    const regex = new RegExp('\\.(' + extensions + ')$', 'i')
    return !files.every((file) => regex.test(file.name))
}
const invalidSize = (file) => {
    if (file.size > props.maxSize * 1024) {
        return true
    } else return false
}
const handleMultiImages = (index) => {
    if (multiple.value) {
        if (typeof index !== 'undefined') {
            urls.value.splice(index, 1)
            files.value.splice(index, 1)
            emit('update:model-value', files)
        } else {
            // We may call `handleMultiImages` from the parent component using a ref without specifying
            // an index, meaning we're goning to remove all files.
            urls.value = []
            emit('update:model-value', [])
        }
    } else {
        url.value = null
        emit('update:model-value', null)
    }

    emit('cancelled')
}

const resetInputUploader = () => {
    // We need to set this with '' because if we cancelled
    // and then tried to upload the same file as the previous one
    // it will not work because it carries the same value.
    inputUploader.value.value = ''
}

defineExpose({
    browseImage,
    handleMultiImages
})
</script>

<style src="./index.scss"></style>
