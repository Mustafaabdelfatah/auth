<template>
    <div class="ps-lg-5 pe-lg-6">
        <EmptyStateLoader v-if="search == null && branches.length === 0 && search == ''"></EmptyStateLoader>
        <!-- <ShowBranches v-model:totalItems="totalItems" v-else :branches="branches" @OpenEditModal="OpenEditModal" @OpenDeleteModal="OpenDeleteModal"></ShowBranches> -->

        <DataTable v-else :showHeader="false" :headers="headers" :items="branches" :showSelect="true"
            :isLoading="appStore.cardLoading">
            <template #item.actions="{ item }">
                <div class="d-flex align-center ga-2">
                    <ShowBtn variant="flat" @click="showRow(item.id)" />
                    <EditBtn variant="flat" @click="OpenEditModal(item)" />
                    <DeleteBtn variant="flat" @click="OpenDeleteModal(item)" />
                </div>
            </template>
            <template #header>
                <v-row class="mb-3">
                    <v-col cols="12" lg="4" md="4" sm="12">
                        <searchInput class="search_input" v-model="search" :dirty="true" :clearable="false"
                            :placeholder="t('headings.search')" :searchBtn="false" />
                    </v-col>
                </v-row>
            </template>
            <template v-slot:bottom>
                <MuliPagination :current-page="currentPage" :total-items="totalItems" :total-pages="totalPages"
                    @updateTableData="pageSizeGetter" :start-page-items="fromItems" :end-page-items="toItems">
                </MuliPagination>
            </template>
        </DataTable>
    </div>
    <AddEditBranch @branchAdded="fetchBranches" @branchEdited="fetchBranches" v-model="dialog" :branch="branch" />
    <ConfirmationDialog @deleted="branchDeletedAction" DialogType="unconfirm" v-model="deleteModal"
        :title="deleteSingleBranch.translation_name" :text="deleteSingleBranch.translation_description">
    </ConfirmationDialog>
</template>

<script setup>
import { ref, reactive, onMounted, computed, defineAsyncComponent, watch } from 'vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { getBranches, deleteBranch } from '@/services/apis/branches'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore();
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// const ShowBranches = defineAsyncComponent(() => import('@/views/branches/components/ShowBranches.vue'));
import DataTable from '@/components/common/DataTable.vue';
import searchInput from '@/components/common/FieldsTypes/searchInput.vue'
import MuliPagination from "@/components/common/Pagination/MuliPagination.vue";
import EditBtn from '@/components/common/buttons/EditBtn.vue'
import DeleteBtn from '@/components/common/buttons/DeleteBtn.vue'
import ConfirmationDialog from '@/components/common/Dialogs/ConfirmationDialog.vue'
const AddEditBranch = defineAsyncComponent(() => import('@/views/branches/components/AddEditBranch.vue'));
import EmptyStateLoader from '@/components/common/Loaders/index.vue'

// =====( Get branches Data )====== //
const dialog = ref(false);
const deleteModal = ref(false);
const branches = ref([]);
const branch = ref({});
const deleteSingleBranch = ref({});



// =(Pagination Data)==========>
const currentPage = ref(0);
const totalItems = ref(0);
const totalPages = ref(0);
const fromItems = ref(0);
const toItems = ref(0);
const page = ref(1);
const pageSize = ref(10);
const search = ref(null);
const options = reactive({
    page: page.value,
    pageSize: pageSize.value,
    search: search.value
})
const pageSizeGetter = (paginationPage, paginationPageSize) => {
    pageSize.value = paginationPageSize;
    page.value = paginationPage;
};
watch([page, pageSize, search], () => {
    options.page = page.value;
    options.pageSize = pageSize.value;
    options.search = search.value;
    fetchBranches();
});

const fetchBranches = async () => {
    appStore.cardLoading = true
    const { data, total, from, to, last_page, current_page } = await getBranches(options);
    branches.value = data;
    appStore.cardLoading = false
    totalPages.value = last_page
    totalItems.value = total
    currentPage.value = current_page
    fromItems.value = from
    toItems.value = to
    appStore.cardLoading = false
};

const branchDeletedAction = async () => {
    const id = deleteSingleBranch.value.id
    const data = await deleteBranch(id);
    fetchBranches()
    deleteModal.value = false
};

const OpenEditModal = (data) => {
    dialog.value = !dialog.value
    branch.value = data
};

const OpenDeleteModal = (data) => {
    deleteModal.value = !deleteModal.value
    deleteSingleBranch.value = data
};


// ==( Set Page Breadcrumbs )==========>
const { setBreadcrumbs } = useBreadcrumbs()
setBreadcrumbs([
    {
        title: 'dl.dashboard',
        disabled: false,
        href: '/'
    },
    {
        title: 'dl.branches',
        disabled: true,
        href: '/branches'
    }
]);

// ==(Table Headers Data)=============>
const headers = ref([
    { title: t('tables.name'), key: 'translation_name', width: 'fit-content', align: 'start' },
    { title: t('tables.description'), key: 'translation_description', width: 'fit-content', align: 'start' },
    { title: t('tables.create_at'), key: 'created_at', align: 'start' },
    { title: t('tables.edit_at'), key: 'edited_at', align: 'start' },
    { title: t('tables.actions'), key: 'actions', width: 'fit-content', align: 'start' }
]);

onMounted(() => {
    fetchBranches();
});

</script>

<style lang="scss" scoped>
::v-deep {
    .v-input--density-comfortable {
        --v-input-control-height: 12px !important;
        --v-input-padding-top: 6px;
        --v-field-padding-bottom: 8px !important;
    }

    .v-input--density-comfortable .v-field--variant-outlined,
    .v-input--density-comfortable .v-field--single-line,
    .v-input--density-comfortable .v-field--no-label {
        --v-field-padding-bottom: 8px !important;
    }

    .v-field--prepended {
        padding-inline-start: 8px;
    }

    .v-icon {
        --v-icon-size-multiplier:.9;
    }

    .search_input {
        .v-field {
            font-size: .875rem;
        }
    }
}
</style>
