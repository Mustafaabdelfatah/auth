<template>
    <VForm v-if="settingsStore.properties.length">
        <v-row class="mt-5">
            <v-col cols="12" md="6" class="text-center" v-for="setting in settingsStore.properties" :key="setting.key">
                <h3 class="text-start mb-5">{{ t('settings.' + setting.key) }}</h3>
                <ImageUploader v-if="setting.input_type == 'file'" :imagesUrls="setting.value" :settingKey="setting.key"
                    :max-size="sizeToBytes('3 MB')" extensions="jpg,svg,jpeg,png,bmp,gif,webp"
                    @imageSelected="handleFilesSelected" @imageRemoved="handleImageRemoved" />
            </v-col>
        </v-row>
        <div class="d-flex my-5">
            <v-btn min-width="200" min-height="45" color="primary" class="font-weight-bold"
                @click.prevent="updateSettings" :loading="isLoading" :disabled="isLoading">
                {{ t('buttons.save') }}
            </v-btn>
        </div>
    </VForm>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settings'
import ImageUploader from '@/components/common/ImageUploader/index.vue'
import { sizeToBytes } from '@/utils/bytesCalculator'
import { handleFormData } from '@/utils/formDataHandler'

const { t } = useI18n()
const settingsStore = useSettingsStore()
const isLoading = ref(false)
const updatedItems = ref([])
const handleFilesSelected = (selectedFiles) => {
    for (const [key, value] of Object.entries(selectedFiles)) {
        const existingItemIndex = updatedItems.value.findIndex((item) => item.key === key)
        if (existingItemIndex !== -1) {
            updatedItems.value[existingItemIndex].value = value
        } else {
            updatedItems.value.push({ key, value })
        }
    }
}
const handleImageRemoved = ({ key }) => {
    const items = updatedItems.value.filter((item) => item.key != key)
    if (items) updatedItems.value.push({ key, value: null })
}

const updateSettings = () => {
    isLoading.value = true
    let formData = handleFormData(updatedItems.value, 'settings', 'properties')
    settingsStore.updateSettings(formData)
    isLoading.value = false
}
</script>

<style scoped lang="scss"></style>
