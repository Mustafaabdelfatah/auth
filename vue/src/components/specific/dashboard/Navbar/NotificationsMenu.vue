<template>
    <v-menu key="language-menu" close-delay="100" location="bottom end" open-delay="60">
        <template #activator="{ props }">
            <v-btn max-width="20" size="24" class="">
                <!-- <v-badge dot floating offset-x="14" offset-y="3" rounded="xs" color="error"> -->
                    <div class="d-flex justify-center align-center">
                        <bellIcon />
                    </div>
                <!-- </v-badge> -->
            </v-btn>
        </template>

        <v-sheet class="overflow-hidden language_wrapper" rounded>
            <v-list :lines="false" density="compact" nav min-width="125">
                <v-list-item v-for="(item, i) in locales" :key="i" :value="item.value" color="primary"
                    @click="switchLocale(item.value)" class="d-flex justify-space-between align-center">
                    <template v-slot:append>
                        <img src="@/assets/images/svg/ar.svg?row" width="16" v-if="i === 0" />
                        <img src="@/assets/images/svg/en.svg?row" width="16" v-if="i === 1" />
                    </template>

                    <span class="language_option mx-2">
                        {{ t(`buttons.${String(item.title).toLowerCase()}`) }}
                    </span>
                </v-list-item>
            </v-list>
        </v-sheet>
    </v-menu>
</template>

<script setup>
import { useLocale } from 'vuetify'
import storage from '@/composables/useStorage'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores/app'
import bellIcon from '@/assets/images/svg/bell.svg'

const { t, locale } = useI18n()

const locales = [
    { title: 'Arabic', value: 'ar' },
    { title: 'English', value: 'en' }
]

const local = useLocale()

const appStore = useAppStore()

function switchLocale(lang) {
    local.current.value = lang
    appStore.locale.current = lang
    storage.set('locale', lang)
}
</script>
