<template>
    <GeneralCard class="pa-3 ps-lg-5 pe-lg-6 border-0">
        <dataTable :headers="headers" :items="logsStore.logsList" :numberOfPages="numberOfPages"
            :itemsPerPage="logsStore.logsList.length" :showHeader="false" :showSelect="true" :showExpand="true" itemValue="index"
            @tableOptoins="getLogsData">
            <template #header>
                <v-row dense class="align-center my-3">
                    <v-col cols="3" class="d-flex text-right align-center">
                        <v-select :disabled="logsStore.logsFiles.length === 0" class="mx-1" :label="t('headings.types')"
                            dense :items="logsStore.logsFiles" item-title="name" item-key="identifier" hide-details
                            v-model="selectedFile" return-object @change="getLogsData" solo></v-select>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="1" class="d-flex justify-end">
                        <v-btn :loading="isLoading" flat small class="mx-1" @click.prevent="getLogsData()">
                            <v-icon>mdi-refresh</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>
            </template>
            <template #item.environment="{ item }">
                <div>{{ item.extra.environment }}</div>
            </template>
            <template #item.level="{ item }">
                <v-chip class="ma-1" :color="item.level.toString().toLowerCase() === 'error' ? 'red' : 'blue'"
                    text-color="white" small>
                    {{ t(`headings.${item.level.toString().toLowerCase()}`) }}
                </v-chip>
            </template>
            <template #item.full_text="{ item }">
                <div class="d-flex align-center">
                    {{ item.message.toString().slice(0, 30) + '...' }}
                </div>
            </template>
        </dataTable>
    </GeneralCard>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import dataTable from '@/components/common/DataTable.vue'
import GeneralCard from '@/components/common/Cards/GeneralCard.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useLogsStore } from '@/stores/logs'

const { t, locale } = useI18n()
const { setBreadcrumbs } = useBreadcrumbs()
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
        title: 'dl.Logs',
        disabled: true,
        to: ''
    }
])
const logsStore = useLogsStore()

const headers = ref([
    { title: t('tables.index'), align: 'start', key: 'index' },
    { title: t('tables.level'), align: 'start', key: 'level' },
    { title: t('tables.datetime'), key: 'datetime' },
    { title: t('tables.environment'), key: 'environment' },
    {
        title: t('tables.description'),
        sortable: false,
        key: 'full_text'
    },
    { title: t('tables.actions'), key: 'data-table-expand' }
])
const numberOfPages = ref(0)
const selectedFile = ref({})
const isLoading = ref(false)

const getLogsData = async (options) => {
    isLoading.value = true
    await logsStore.getLogsList(null, options).then(() => {
        isLoading.value = false
    })

    console.log('logsStore.logsList',logsStore.logsList);

}

onMounted(async () => {
    if (logsStore.firstLoad) await logsStore.getLogsFile()
    selectedFile.value = logsStore.getSelectedFile
})
</script>
