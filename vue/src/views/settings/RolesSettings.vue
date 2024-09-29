<template>
    <v-card class="pa-3 ps-lg-5 pe-lg-6 main-rounded">
        <DataTable :headers="headers" :items="rolesStore.roles" :numberOfPages="numberOfPages" :showSelect="true"
            :addButtonTitle="t('buttons.add_role')" @searchValue="searchRoles" @deleteRows="deleteRows"
            @openModal="openModal">
            <template #item.name="{ item }">
                <div v-if="item.name.length < 30">{{ item.name }}</div>
                <div v-else>
                    <p>{{ useTextTruncator(item.name) }}</p>
                    <v-tooltip activator="parent" location="top">
                        {{ item.name }}
                    </v-tooltip>
                </div>
            </template>
            <template #item.actions="{ item }">
                <div class="d-flex justify-center align-center">
                    <edit-btn @click="editRow(item)" />
                    <delete-btn @click="deleteRow(item.id)" />
                </div>
            </template>

            <template #modal>
                <Modal width="900" max-width="100vw" :addTitle="t('buttons.add_role')"
                    :editTitle="t('buttons.edit_role')" :isCreate="isCreate" v-model="showDialog"
                    @addEditRow="addEditRole" :schema="schema">
                    <template #permissions>
                        <div class="" v-for="role in rolesStore.getPermissionsSorted" :key="role.group">
                            <h3 class="text-h6 mb-2">{{ role.group }}</h3>
                            <div class="d-flex flex-wrap ga-2 mb-6">
                                <div class="d-flex" v-for="permission in role.permissions" :key="permission.id">
                                    <v-checkbox v-if="permission.name == 'read-setting'" class="perm-cont" hide-details
                                        density="compact" v-model="schema[3].value" :value="permission.name"
                                        :label="permission.display_name" color="primary" disabled></v-checkbox>
                                    <v-checkbox v-else class="perm-cont" hide-details density="compact"
                                        :label="permission.display_name" v-model="schema[3].value"
                                        :value="permission.name" color="primary"></v-checkbox>
                                </div>
                            </div>
                        </div>
                    </template>
                </Modal>
            </template>
        </DataTable>
    </v-card>
</template>

<script setup>
import Modal from '@/components/common/Modal/index.vue'
import { useTextTruncator } from '@/composables/useTextTruncator'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import DataTable from '@/components/common/DataTable.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useRolesStore } from '@/stores/roles'
import EditBtn from '@/components/common/buttons/EditBtn.vue'
import DeleteBtn from '@/components/common/buttons/DeleteBtn.vue'
import { confirmDelete } from '@/composables/useAlert'
import { updateSchemaValues } from '@/utils/formDataHandler'

const searchQuery = ref('')
const rolesStore = useRolesStore()
const selectedRows = ref([])
const showDialog = ref(false)

const { t, locale } = useI18n()
const { setBreadcrumbs } = useBreadcrumbs()
setBreadcrumbs([
    {
        title: 'dl.dashboard',
        disabled: false,
        href: '/'
    },
    {
        title: 'dl.settings',
        disabled: true,
        href: ''
    },
    {
        title: 'dl.rolespermissions',
        disabled: true,
        href: ''
    }
])

const isCreate = ref(true)

const headers = ref([
    { title: t('tables.index'), key: 'id' },
    { title: t('tables.name'), key: 'name' },
    { title: t('headings.dis_name'), key: 'translation_display_name' },
    { title: t('tables.create_at'), key: 'created_at' },
    { title: t('tables.actions'), key: 'actions', width: '170px', align: 'center', justify: 'center' }
])
const numberOfPages = ref(0)
const selectedRow = ref({})

onMounted(async () => {
    await rolesStore.getRoles()
    await rolesStore.getPermissions()
})

const searchRoles = async (value) => await rolesStore.getSearchRoles(value)
const openModal = () => {
    showDialog.value = true
    isCreate.value = true
    isChecked()
}

const addEditRole = async (data) => {
    await handleRequest(data)
}

const isChecked = () => {
    schema.value[3].value.push('read-setting')
}

const editRow = (item) => {
    openModal()
    isCreate.value = false
    schema.value = updateSchemaValues(schema.value, item)
    selectedRow.value = item
}

const handleRequest = async (data) => {
    if (isCreate.value) await rolesStore.createRole(data)
    else {
        data['id'] = selectedRow.value.id
        data['_method'] = 'PUT'
        await rolesStore.updateRole(data)
    }
}

const deleteRow = (id) => {
    confirmDelete(`${t('alert.delete')} ${id}`).then((result) => {
        if (result) rolesStore.deleteRole(id)
    })
}
const deleteRows = (ids) => {
    confirmDelete(`${t('alert.delete')} ${ids}`).then((result) => {
        if (result) rolesStore.deleteRole(ids)
    })
}

const schema = ref([
    {
        id: 0,
        type: 'text',
        key: 'name',
        label: t('headings.role_name'),
        placeholder: t('inputs.enter_role_name'),
        value: '',
        required: true,
        rules: [(value) => (value.length > 3 ? true : t('validation.userName'))],
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 1,
        type: 'text',
        key: 'translation_display_name.en',
        label: t('headings.role_dis_name_en'),
        placeholder: t('inputs.enter_role_dis_name'),
        value: '',
        required: true,
        rules: [(value) => (value.length > 3 ? true : t('validation.userName'))],
        cols: {
            lg: 6,
            md: 6
        }
    },
    {
        id: 2,
        type: 'text',
        key: 'translation_display_name.ar',
        label: t('headings.role_dis_name_ar'),
        placeholder: t('inputs.enter_role_dis_name'),
        value: '',
        rules: [(value) => (value.length > 3 ? true : t('validation.userName'))],
        required: true,
        cols: {
            lg: 6,
            md: 6
        }
    },
    {
        id: 3,
        key: 'permissions',
        type: 'slot',
        label: t('headings.role_dis_name_ar'),
        placeholder: t('inputs.enter_role_dis_name'),
        value: [],
        required: true,
        cols: {
            lg: 12,
            md: 12
        }
    }
])
</script>
