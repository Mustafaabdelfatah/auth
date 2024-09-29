<template>
    <v-layout>
        <!-- sidebar -->
        <Sidebar />
        <!-- end sidebar -->

        <!-- navbar -->
        <Navbar @rail:switch="navigationDrawer" />
        <!-- end navbar -->

        <!-- content -->
        <v-main top="0" width="100%">
            <BreadCrumb :BreadcrumbItems="translatedBreadcrumbItems" />

            <loader v-show="isLoading" />

            <div v-show="!isLoading" class="mt-5 h-100">
                <router-view />
            </div>
        </v-main>
        <!-- end content -->
        <div id="drawers"></div>
    </v-layout>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useAppStore } from '@/stores/app'
import { useSettingsStore } from '@/stores/settings'

import { useI18n } from 'vue-i18n'
const Sidebar = defineAsyncComponent(() => import('@/components/layout/Sidebar.vue'));
const Loader = defineAsyncComponent(() => import('@/components/specific/dashboard/Loader.vue'));
const BreadCrumb = defineAsyncComponent(() => import('@/components/common/BreadCrumb.vue'));
const Navbar = defineAsyncComponent(() => import('@/components/layout/Navbar.vue'));

const { t } = useI18n()

const { breadcrumbItems } = useBreadcrumbs()

const rail = ref(true)

const isNavDrawerActive = ref(true)
const { isLoading } = storeToRefs(useAppStore())
const settingsStore = useSettingsStore()
const { lgAndUp, mdAndDown } = useDisplay()

const translatedBreadcrumbItems = computed(() => {
    return breadcrumbItems.value.map((item) => {
        return {
            ...item,
            title: t(item.title)
        }
    })
})
function navigationDrawer(isMounted) {
    if (mdAndDown.value) {
        isNavDrawerActive.value = isMounted ? false : !isNavDrawerActive.value
    }
}
onMounted(async () => {
    await settingsStore.getSettings()
});
</script>

<style lang="scss" scoped>
// .v-navigation-drawer--rail.v-navigation-drawer--active~.v-toolbar {
//     width: calc(100% - 8.5rem) !important;
// }

// .v-navigation-drawer--active~.v-toolbar {
//     width: calc(100% - 19.688rem) !important;
// }

// ::v-deep {
//     .v-main {
//         --v-layout-top: 5.625rem !important;
//     }
// }

.main-rounded {
    border-radius: 1rem !important;
}

</style>
