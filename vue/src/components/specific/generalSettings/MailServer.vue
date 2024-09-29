<template lang="">
  <VForm @submit.prevent="updateSettings">
    <v-row class="mt-5">
      <v-col cols="12" md="6" v-for="(setting, key) in settings" :key="setting.key">
        <textArea
          v-if="setting.key == 'website_description' || setting.key == 'website_meta_description'"
          :label="t('settings.' + setting.key)"
          :placeholder="t('settings.' + setting.key)"
          v-model="settings[key]['value']"
        />
        <textInput
          v-else
          :label="t('settings.' + setting.key)"
          :placeholder="t('settings.' + setting.key)"
          v-model="settings[key]['value']"
          @change="getChanges(setting)"
        />
      </v-col>
    </v-row>

    <div class="d-flex my-5">
      <v-btn
        min-width="200"
        min-height="45"
        class="font-weight-bold"
        color="primary"
        type="submit"
        :loading="isLoading"
        :disabled="isLoading"
      >
        {{ t('buttons.save') }}
      </v-btn>
    </div>
  </VForm>
</template>
<script setup>
import textArea from '@/components/common/FieldsTypes/textArea.vue'
import textInput from '@/components/common/FieldsTypes/textInput.vue'

import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '@/stores/settings'
import { handleFormData } from '@/utils/formDataHandler'
const { t } = useI18n()

const settingStore = useSettingsStore()
const isLoading = ref(false)
const updatedItems = ref([])
const settings = settingStore.mail_server
const getChanges = (item) => {
  updatedItems.value.push(item)
}
const updateSettings = async () => {
  isLoading.value = true
  let formData = handleFormData(updatedItems.value, 'settings')
  await settingStore.updateSettings(formData)
  isLoading.value = false
}
</script>
<style lang=""></style>
