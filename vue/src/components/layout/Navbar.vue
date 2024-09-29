<template>
    <v-app-bar :absolute="true" rounded class="starter-v-app-bar  px-0" elevation="0" prominent>
        <v-spacer></v-spacer>

        <template #prepend>
            <AppNavbarSearch class="w-100" />
        </template>

        <template #append>
            <app-bar-language-menu />
            <app-theme-toggle />
            <AppNotificationsMenu />
            <app-settings-menu class="me-3" />
        </template>
    </v-app-bar>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'
import { useDisplay } from 'vuetify'

import AppSettingsMenu from '@/components/specific/dashboard/Navbar/SettingsMenu.vue'
import AppBarLanguageMenu from '@/components/specific/dashboard/Navbar/LanguageMenu.vue'
import AppNavbarSearch from '@/components/specific/dashboard/Navbar/NavbarSearch.vue'
import AppNotificationsMenu from '@/components/specific/dashboard/Navbar/NotificationsMenu.vue'
import AppThemeToggle from '@/components/common/ThemeToggle.vue'

import { useAppStore } from '@/stores/app'
import { watch } from 'vue'

const { mdAndDown } = useDisplay()
const appStore = useAppStore();

</script>

<style lang="scss" scoped>



.starter-v-app-bar {
    background-color: rgba(var(--v-theme-background), 1);
    margin-top: 1.5rem;
    margin-bottom: .5rem;
}

::v-deep {
    .v-toolbar__prepend {
        width: 100% !important;
        margin-inline-end: 1.25rem;
    }

    .v-toolbar__append {
        gap: 1.5rem;
        margin: 0;
    }

    .v-toolbar__content {
        padding-inline-start: 1.25rem;
        padding-inline-end: 1.5rem;
        height: fit-content !important;
    }
}
</style>
