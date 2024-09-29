<template>
    <div class="ps-lg-5 pe-lg-6">
        <EmptyStateLoader v-if="isLoading"></EmptyStateLoader>
        <!--        <ShowEmployees v-else :users="users" @getUsers="fetchUsers" @deleteUser="OpenDeleteModal"-->
        <!--                       @editUser="editUser"></ShowEmployees>-->
        <div v-else>
            <Teleport to="#teleportedHeader" v-if="isRendered">
                <AddBtn :routerLink="true" routePath="/employees/create">
                    {{ t('buttons.add_new_employee') }}
                </AddBtn>
            </Teleport>
            <DataTable :showHeader="false" :headers="headers" :items="users" :showSelect="true"
                       :addButtonTitle="t('buttons.add_user')" @searchValue="fetchUsers" @tableOptions="fetchUsers"
                       @deleteRows="deleteRow" @openModal="openModal">
                <template #item.name="{ item }">
                    <div class="d-flex ga-2 align-center">
                        <v-avatar size="24">
                            <v-img alt="avatar"
                                   :src="item.avatar ?? 'https://civildefence.wakeb.tech/avatar.svg'"></v-img>
                        </v-avatar>
                        {{ item.name }}
                    </div>
                </template>
                <template #item.actions="{ item }">
                    <div class="d-flex align-center ga-2">
                        <ShowBtn variant="flat" @click="showRow(item.id)"/>
                        <EditBtn variant="flat" @click="editUser(item)"/>
                        <DeleteBtn variant="flat" @click="OpenDeleteModal(item)"/>
                    </div>
                </template>
                <template #header>
                    <v-row class="mb-3">
                        <v-col cols="12" lg="4" md="4" sm="12">
                            <searchInput :dirty="true" :clearable="false" @searchValue="searchInUsers"
                                         :placeholder="t('headings.search')"/>
                        </v-col>
                        <v-col cols="12" lg="8" md="8" sm="12">
                            <v-row align="start" class="filter_actions">
                                <v-col cols="12" lg="3" md="3" sm="12">
                                    <selectBox v-model:model-value="filters.department_id" :options="departmentsOptions"
                                               :innerLabel="t('dl.departments')" multiple
                                               class="outline_select"></selectBox>
                                </v-col>
                                <v-col cols="12" lg="3" md="3" sm="12">
                                    <selectBox v-model:model-value="filters.position_id" :options="positionsOptions"
                                               :innerLabel="t('dl.positions')" multiple
                                               class="outline_select"></selectBox>
                                </v-col>
                                <v-col cols="12" lg="3" md="3" sm="12">
                                    <select-box v-model:model-value="filters.status_id" :options="statusesOptions"
                                                :innerLabel="t('dl.statuses')" multiple
                                                class="outline_select"></select-box>
                                </v-col>
                                <v-col cols="12" lg="3" md="3" sm="12">
                                    <v-btn-toggle class="toggler" v-model="employeesType" color="primary" group flat
                                                  mandatory>
                                        <v-btn value="all">
                                            {{ t('headings.all') }}
                                        </v-btn>
                                        <v-btn value="managers">
                                            {{ t('headings.administrators') }}
                                        </v-btn>
                                    </v-btn-toggle>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </template>
                <template v-slot:bottom>
                    <MuliPagination
                        :current-page="currentPage"
                        :total-items="totalItems"
                        :total-pages="totalPages"
                        @updateTableData="fetchUsers"
                        :start-page-items="fromItems"
                        :end-page-items="toItems"
                        :per-page="perPage"
                    >
                    </MuliPagination>
                </template>
            </DataTable>
        </div>
    </div>
    <ConfirmationDialog @deleted="userDeletedAction" DialogType="unconfirm" v-model="deleteModal" :title="user.name"
                        :text="user.email">
    </ConfirmationDialog>
</template>

<script setup>
import EmptyStateLoader from '@/components/common/Loaders/index.vue'
import DataTable from '@/components/common/DataTable.vue';
import AddBtn from '@/components/common/buttons/AddBtn.vue'
import DeleteBtn from '@/components/common/buttons/DeleteBtn.vue'
import ShowBtn from '@/components/common/buttons/ShowBtn.vue'
import EditBtn from '@/components/common/buttons/EditBtn.vue'
import searchInput from '@/components/common/FieldsTypes/searchInput.vue'
import SelectBox from "@/components/common/FieldsTypes/selectBox.vue";

const ConfirmationDialog = defineAsyncComponent(() => import('@/components/common/Dialogs/ConfirmationDialog.vue'));

import {getEnumsGenerals, getGenerals} from "@/services/apis/general.js";
import {ref, onMounted, defineAsyncComponent, reactive, defineEmits, watch} from 'vue'
import {useBreadcrumbs} from '@/composables/useBreadcrumbs'
import {getUsers, deleteUsers} from '@/services/apis/users'
import {useAppStore} from '@/stores/app'
import {useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n'
import MuliPagination from "@/components/common/Pagination/MuliPagination.vue";

const emit = defineEmits(['deleteUser', 'editUser']);

const appStore = useAppStore();
const router = useRouter();
const {t} = useI18n();

// =====( Get users Data )====== //
const dialog = ref(false);
const deleteModal = ref(false);

// =(Data)=================>
const queryParams = {
    tables: [
        {name: 'departments'},
        {name: 'positions'},
    ]
};
const queryParamsEnums = {
    enums: [
        {name: 'global.active_type'}
    ]
};

const departmentsOptions = ref([])
const positionsOptions = ref([])
const statusesOptions = ref([])
const isRendered = ref(false);
const isLoading = ref(false);
const employeesType = ref('all');
const users = ref([]);
const department = ref({});
const user = ref({});
const currentPage = ref(0);
const perPage = ref(10);
const totalItems = ref(0);
const totalPages = ref(0);
const fromItems = ref(0);
const toItems = ref(0);

const filters = reactive({
    department_id: null,
    position_id: null,
    status_id: null,
})

watch(() => employeesType.value, () => {
    fetchUsers()
})
watch(() => filters.department_id, () => {
    fetchUsers()
})
watch(() => filters.position_id, () => {
    fetchUsers()
})
watch(() => filters.status_id, () => {
    fetchUsers()
})
watch(() => filters.search, () => {
    fetchUsers()
})

// =(Functions)=================>
const searchInUsers = (value) => {
    filters.search = value
}

const options = reactive({})

const fetchUsers = async (page, pageSize) => {
    isLoading.value = true

    options.page = page ? page : 1
    options.pageSize = pageSize ? pageSize : 10
    options.type = employeesType.value
    options.department_id = filters.department_id
    options.position_id = filters.position_id
    options.status_id = filters.status_id
    options.search = filters.search

    const {data, total, from, to, last_page, per_page, current_page} = await getUsers(options)
    users.value = data;
    isLoading.value = false
    totalPages.value = last_page
    totalItems.value = total
    currentPage.value = current_page
    perPage.value = per_page
    fromItems.value = from
    toItems.value = to
};
const userDeletedAction = async () => {
    const id = user.value.id
    await deleteUsers(id);
    await fetchUsers()
    deleteModal.value = false
};
const showRow = (id) => {
    router.push(`/employees/${id}`);
}
const OpenDeleteModal = (data) => {
    deleteModal.value = !deleteModal.value
    user.value = data
};
const editUser = (data) => {
    user.value = data
    router.push(`/employees/edit/${user.value.id}`);
};

// =====( Set Page Breadcrumbs )====== //
const {setBreadcrumbs} = useBreadcrumbs()
setBreadcrumbs([
    {
        title: 'dl.dashboard',
        disabled: false,
        href: '/'
    },
    {
        title: 'dl.employees',
        disabled: true,
        href: '/employees'
    }
]);

onMounted(async () => {
    isRendered.value = true
    getGenerals(queryParams).then((res) => {
        const {departments, positions} = res
        departmentsOptions.value = departments.map(dep => ({title: dep.name, value: dep.id}));
        positionsOptions.value = positions.map(pos => ({title: pos.name, value: pos.id}));
    })
    getEnumsGenerals(queryParamsEnums).then((res) => {
        const {'global.active_type': statuses} = res
        statusesOptions.value = statuses.map(stat => ({title: stat.label, value: stat.value}));
    })
    await fetchUsers();
});

// =(Static Data)==========>
const headers = ref([
    {title: t('tables.name'), key: 'name', width: 'fit-content', align: 'start'},
    {title: t('tables.index'), key: 'id', width: '10%', align: 'start'},
    {title: t('tables.email'), key: 'email', width: '12%', align: 'start'},
    {title: t('tables.phone'), key: 'phone', align: 'start'},
    {title: t('tables.type'), key: 'gender', align: 'start'},
    // { title: t('tables.roles'), key: 'roles', align: 'center' },
    {title: t('tables.create_at'), key: 'created_at', align: 'start'},
    {title: t('tables.actions'), key: 'actions', width: '170px', align: 'start'}
]);
</script>

<style lang="scss" scoped>
@import "./index.scss";

</style>
