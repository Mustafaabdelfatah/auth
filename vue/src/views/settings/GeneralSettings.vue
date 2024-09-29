<template>
    <div class="ps-lg-5 pe-lg-6">
        <v-card class="pa-3 custom-tab-cont main-rounded">
            <v-tabs v-model="tab" :items="tabs" align-tabs="center" color="primary" height="60" slider-color="primary">
                <template v-slot:tab="{ item }">
                    <v-tab>
                        <span>{{ t(`settings.${String(item.title).toLowerCase()}`) }}</span>
                        <v-icon :icon="item.icon"></v-icon>
                    </v-tab>
                </template>

                <template v-slot:item="{ item }">
                    <v-tabs-window-item class="pa-4">
                        <component :is="item.component"></component>
                    </v-tabs-window-item>
                </template>
            </v-tabs>
        </v-card>
    </div>
</template>
<script setup>
import { ref, reactive, shallowRef } from 'vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useI18n } from 'vue-i18n'
import Properties from '@/components/specific/generalSettings/Properties.vue'
import MailServer from '@/components/specific/generalSettings/MailServer.vue'

const { setBreadcrumbs } = useBreadcrumbs()
const { t } = useI18n()

const tab = ref(0)
function changeTab(index) {
    tab.value = index
}
const tabs = reactive([
    { title: 'Properties', icon: 'mdi-view-dashboard-outline', component: shallowRef(Properties) },
    { title: 'MailServer', icon: 'mdi-mailbox-up-outline', component: shallowRef(MailServer) }
])

setBreadcrumbs([
    {
        title: 'dl.dashboard',
        disabled: false,
        to: '/'
    },
    {
        title: 'dl.settings',
        disabled: true,
        to: ''
    },
    {
        title: 'dl.general',
        disabled: true,
        to: ''
    }
])
</script>
