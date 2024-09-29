<template>
    <v-app>
        <router-view/>
    </v-app>
</template>

<script setup>
import {onBeforeMount, watch, nextTick} from 'vue'
import storage from '@/composables/useStorage'
import {useTheme} from 'vuetify'
import {useAppStore} from './stores/app'

const theme = useTheme()
const appStore = useAppStore()

onBeforeMount(() => {
    theme.global.name.value = appStore.mode

    const defaultLocale = import.meta.env.VITE_LOCALE
    if (!defaultLocale) {
        const locale = storage.get('locale')
        if (!locale) {
            storage.set('locale', 'ar')
        }
    }
})
</script>
