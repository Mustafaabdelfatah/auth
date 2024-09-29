<template>
    <Teleport to="#teleportedHeader" v-if="isRendered">
        <AddBtn :routerLink="true" routePath="/employees/create">
            {{ t('buttons.add_new_employee') }}
        </AddBtn>
    </Teleport>

    <DataTable :showHeader="false" :headers="headers" :items="users" :showSelect="true"
        :addButtonTitle="t('buttons.add_user')" @searchValue="getItems" @tableOptoins="getUsersData"
        @deleteRows="deleteRows" @openModal="openModal">
        <template #item.name="{ item }">
            <div class="d-flex ga-2 align-center">
                <v-avatar size="24">
                    <v-img alt="avatar" :src="item.avatar ?? 'https://civildefence.wakeb.tech/avatar.svg'"></v-img>
                </v-avatar>
                {{ item.name }}
            </div>
        </template>
        <template #item.actions="{ item }">
            <div class="d-flex justify-center align-center ga-1">
                <EditBtn variant="flat" @click="editRow(item)" />
                <DeleteBtn variant="flat" @click="deleteRow(item)" />
            </div>
        </template>
        <template #header>
            <v-row class="mb-3">
                <v-col cols="12" lg="4" md="4" sm="12">
                    <searchInput :dirty="true" :clearable="false" @searchValue="passingSearchValue"
                        :placeholder="t('headings.search')" />
                </v-col>
                <v-col cols="12" lg="8" md="8" sm="12">
                    <v-row align="start">
                        <v-col cols="12" lg="3" md="3" sm="12">
                            <select-box v-model:model-value="filters.department_id" :options="departmentsOptions"
                                :innerLabel="t('dl.departments')" multiple></select-box>
                        </v-col>
                        <v-col cols="12" lg="3" md="3" sm="12">
                            <select-box v-model:model-value="filters.position_id" :options="positionsOptions"
                                :innerLabel="t('dl.positions')" multiple></select-box>
                        </v-col>
                        <v-col cols="12" lg="3" md="3" sm="12">
                            <select-box v-model:model-value="filters.status_id" :options="statusesOptions"
                                :innerLabel="t('dl.statuses')" multiple></select-box>
                        </v-col>
                        <v-col cols="12" lg="3" md="3" sm="12">
                            <v-btn-toggle class="toggler" v-model="employeesType" color="primary" group flat height="54"
                                mandatory>
                                <v-btn value="all">
                                    {{ t('headings.all') }}
                                </v-btn>
                                <v-btn value="admins">
                                    {{ t('headings.administrators') }}
                                </v-btn>
                            </v-btn-toggle>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </template>
    </DataTable>

</template>

<script setup>
// =(Components)=============>
import DataTable from '@/components/common/DataTable.vue';
import AddBtn from '@/components/common/buttons/AddBtn.vue'
import DeleteBtn from '@/components/common/buttons/DeleteBtn.vue'
import EditBtn from '@/components/common/buttons/EditBtn.vue'
import searchInput from '@/components/common/FieldsTypes/searchInput.vue'

// =(Emits)=================>
const emit = defineEmits(['deleteUser', 'editUser']);


// =(Functions)=============>
import { ref, onMounted, defineProps, defineEmits, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import SelectBox from "@/components/common/FieldsTypes/selectBox.vue";
import { getEnumsGenerals, getGenerals } from "@/services/apis/general.js";

const { t } = useI18n();

const passingSearchValue = (value) => emit('searchValue', value)

const getUsersData = (options) => {
    emit('getUsers', options)
}

const deleteRow = (user) => {
    emit('deleteUser', user)
}

const editRow = (user) => {
    emit('editUser', user)
}


// =(Data)=================>
const queryParams = {
    tables: [
        { name: 'departments' },
        { name: 'positions' },
    ]
};
const queryParamsEnums = {
    enums: [
        { name: 'global.active_type' }
    ]
};

const departmentsOptions = ref([])
const positionsOptions = ref([])
const statusesOptions = ref([])
const isRendered = ref(false);
const employeesType = ref('all');
const filters = reactive({
    department_id: null,
    position_id: null,
    status_id: null,
})

// =(Props)=================>
const props = defineProps({
    users: {
        type: Object
    }
});


// =(Hocks)================>
onMounted(() => {
    isRendered.value = true
    getGenerals(queryParams).then((res) => {
        const { departments, positions } = res
        departmentsOptions.value = departments.map(dep => ({ title: dep.name, value: dep.id }));
        positionsOptions.value = positions.map(pos => ({ title: pos.name, value: pos.id }));
    })
    getEnumsGenerals(queryParamsEnums).then((res) => {
        const { 'global.active_type': statuses } = res
        statusesOptions.value = statuses.map(stat => ({ title: stat.label, value: stat.value }));
    })
});

watch(() => employeesType, (newVal) => {
    getUsersData()
}, { deep: true, immediate: true })

// =(Static Data)==========>
const headers = ref([
    { title: t('tables.name'), key: 'name', width: 'fit-content', align: 'start' },
    { title: t('tables.index'), key: 'id', width: '5%', align: 'start' },
    { title: t('tables.email'), key: 'email', width: '12%', align: 'start' },
    { title: t('tables.phone'), key: 'phone', align: 'start' },
    { title: t('tables.type'), key: 'gender', align: 'start' },
    // { title: t('tables.roles'), key: 'roles', align: 'center' },
    { title: t('tables.create_at'), key: 'created_at', align: 'start' },
    { title: t('tables.actions'), key: 'actions', width: '170px', align: 'start' }
]);

</script>

<style lang="scss" scoped>
::v-deep {
    .v-btn {
        &.edit-btn {
            background-color: rgba(var(--v-theme-tableEditBtn), 1) !important;
        }

        .v-btn__content {
            svg {
                fill: rgba(var(--v-theme-white), 1);
            }
        }
    }
}

.toggler {
    box-shadow: 0 1px 2px 0 #1018280D;
    border: 1px solid rgba(var(--v-theme-buttonsBorder));
    border-radius: 10px;
    width: 100%;

    button {
        width: 50%;
        border-radius: 0 !important;
        color: rgba(var(--v-theme-on-surface), 1) !important;
        min-height: 50px;

        &.v-btn--active {
            color: rgba(var(--v-theme-white), 1) !important;
        }
    }
}
</style>
