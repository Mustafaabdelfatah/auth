<template>
    <v-card class="pa-3">
        <dataTable :headers="headers" :numberOfPages="numberOfPages" :items="usersStore.users" :showSelect="true"
            :addButtonTitle="t('buttons.add_user')" @searchValue="getItems" @deleteRows="deleteRows"
            @openModal="openModal">
            <template #item.name="{ item }">
                <div class="d-flex ga-2 align-center">
                    <v-avatar size="38">
                        <v-img alt="avatar" :src="item.avatar ?? 'https://civildefence.wakeb.tech/avatar.svg'"></v-img>
                    </v-avatar>
                </div>
            </template>
            <template #item.roles="{ item }">
                <div class="d-flex ga-1 justify-center align-center">
                    <v-chip v-for="role in item.roles" :key="role.id">
                        <span>{{ role.name }}</span>
                    </v-chip>
                </div>
            </template>
            <template #item.actions="{ item }">
                <div class="d-flex justify-center align-center">
                    <edit-btn @click="editRow(item)" />
                    <delete-btn @click="deleteRow(item)" />
                </div>
            </template>
            <template #modal>
                <Modal width="900" max-width="100vw" :addTitle="t('buttons.add_user')"
                    :editTitle="t('buttons.edit_user')" v-model="showDialog" :isCreate="isCreate"
                    @close="showDialog = false" @addEditRow="addEditUser" :schema="schema">
                    <template  >
                        <div class="d-flex justify-center align-center flex-column">
                            <avatar-uploader ref="avatarRef" v-model="schema[0].value" required
                                label="Upload a profile picture" accept="image/*"
                                extensions="jpg,svg,jpeg,png,bmp,gif,webp" :preview-url="schema[0].value"
                                @browse-avatar="openAvatarBrowser" />
                        </div>
                    </template>
                </Modal>
            </template>
        </dataTable>
    </v-card>
</template>

<script setup>
import Modal from '@/components/common/Modal/index.vue'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRolesStore } from '@/stores/roles'
import dataTable from '@/components/common/DataTable.vue'
import { useBreadcrumbs } from '@/composables/useBreadcrumbs'
import { useUsersStore } from '@/stores/users'
import EditBtn from '@/components/common/buttons/EditBtn.vue'
import DeleteBtn from '@/components/common/buttons/DeleteBtn.vue'
import AvatarUploader from '@/components/common/AvatarUploader/index.vue'
import { confirmDelete } from '@/composables/useAlert'
import { updateSchemaValues } from '@/utils/formDataHandler'
import { validationByKey } from '@/composables/useValidation'

const isCreate = ref(true)
const usersStore = useUsersStore()
const selectedRow = ref({})
const avatarRef = ref(null)
const showDialog = ref(false)
const rolesStore = useRolesStore()
const { t } = useI18n()
const { setBreadcrumbs } = useBreadcrumbs()
setBreadcrumbs([
    {
        title: 'dl.dashboard',
        disabled: false,
        to: '/'
    },
    {
        title: 'dl.users',
        disabled: true,
        to: ''
    }
])
const headers = ref([
    { title: t('tables.index'), key: 'id', width: '10%' },
    { title: t('tables.name'), key: 'name', align: 'start' },
    { title: t('tables.email'), key: 'email', width: '12%' },
    { title: t('tables.phone'), key: 'phone' },
    { title: t('tables.type'), key: 'gender' },
    { title: t('tables.roles'), key: 'roles', align: 'center' },
    { title: t('tables.create_at'), key: 'created_at' },
    { title: t('tables.actions'), key: 'actions', width: '170px', align: 'center' }
])
const addEditUser = async (data) => {
    data.roles = [data.roles]
    await handleRequest(data)
}
const openAvatarBrowser = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (avatarRef.value?.browseImage) {
        avatarRef.value.browseImage()
    }
}
const numberOfPages = ref(0)
onMounted(async () => {
    await usersStore.getUsers()
    await rolesStore.getRoles()
    rolesData.value = rolesStore.getRolesSorted
})
const getItems = async (value) => {
    await usersStore.getSearchUsers(value)
}
const deleteRow = (item) => {
    confirmDelete(`${item.name} ${t('alert.deleteUser')}`).then((result) => {
        if (result) usersStore.deleteUser(item.id).then(() => usersStore.getUsers())
    })
}
const deleteRows = (ids) => {
    confirmDelete(`${t('alert.delete')} ${ids}`).then((result) => {
        if (result) usersStore.deleteUser(ids).then(() => usersStore.getUsers())
    })
}
const openModal = () => {
    showDialog.value = true
    isCreate.value = true
}

const closeModal = () => (showDialog.value = false)

const rolesData = ref([])
const profilePhoto = ref(null)
const schema = ref([
    {
        id: '0',
        key: 'avatar',
        type: 'slot',
        label: '',
        value: '',
        required: false,
        cols: {
            lg: 12,
            md: 12
        },
        rules: '',
        name: 'userAvatar'
    },
    {
        id: '1',
        type: 'text',
        key: 'name',
        label: t('headings.role_name'),
        placeholder: t('inputs.enter_user_name'),
        value: '',
        required: true,
        cols: {
            lg: 6,
            md: 6
        },
        rules: [(value) => (value.length > 3 ? true : t('validation.userName'))],
        name: 'userName'
    },
    {
        id: '2',
        type: 'text',
        key: 'phone',
        label: t('headings.phone'),
        placeholder: t('inputs.enter_phone_number'),
        value: '',
        isDigits: true,
        required: false,
        cols: {
            lg: 6,
            md: 6
        },
        rules: [
            (value) => {
                if (/^05\d{8}$/.test(value)) return true

                return t('validation.userPhone')
            }
        ],
        name: 'userPhone'
    },
    {
        id: '3',
        type: 'text',
        key: 'email',
        label: t('headings.email'),
        placeholder: t('inputs.enter_email'),
        value: '',
        required: true,
        cols: {
            lg: 6,
            md: 6
        },
        rules: [
            (value) => {
                if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return true

                return t('validation.userEmail')
            }
        ],
        name: 'userEmail'
    },
    {
        id: '4',
        type: 'password',
        key: 'password',
        label: t('headings.password'),
        placeholder: t('inputs.enter_password'),
        value: '',
        required: false,
        cols: {
            lg: 6,
            md: 6
        },
        rules: [
            (value) => {
                if (!value) return t('validation.required')
                else if (value.length < 8) return t('validation.minPassword')
                return true
            }
        ],
        name: 'userPassword'
    },
    {
        id: '5',
        type: 'password',
        key: 'password_confirmation',
        label: t('headings.password_confirmation'),
        placeholder: t('inputs.enter_confirm_password'),
        value: '',
        required: false,
        cols: {
            lg: 6,
            md: 6
        },
        rules: [
            (value) => {
                if (value === validationByKey(schema.value, 'password')) return true
                return 'confirm please'
            }
        ],
        name: 'userPassword'
    },
    {
        id: '6',
        key: 'roles',
        type: 'selectBox',
        options: rolesData,
        label: t('headings.role'),
        placeholder: t('headings.role'),
        value: null,
        required: true,
        cols: {
            lg: 6,
            md: 6
        },
        rules: [(value) => (!value ? t('validation.required') : true)],
        name: 'userRoles'
    },
    {
        id: '7',
        key: 'gender',
        type: 'selectBox',
        required: true,
        label: t('headings.gender'),
        placeholder: t('headings.gender'),
        value: null,
        options: [
            { title: t('headings.male'), value: 'male' },
            { title: t('headings.female'), value: 'female' }
        ],
        cols: {
            lg: 6,
            md: 6
        },
        rules: [(value) => (!value ? t('validation.required') : true)],
        name: 'userGender'
    },
    {
        id: '8',
        key: 'isActive',
        type: 'switchbox',
        label: t('headings.status'),
        placeholder: t('headings.status'),
        value: true,
        required: false,
        cols: {
            lg: 6,
            md: 6
        },
        name: 'userSwitch'
    }
])

const editRow = (item) => {
    profilePhoto.value = item.avatar
    selectedRow.value = item
    const nameItem = selectedRow.value.roles[0]
    selectedRow.value.roles = nameItem.name
    openModal()
    isCreate.value = false
    schema.value = updateSchemaValues(schema.value, item)
}
const genderOptions = ref([
    { title: t('headings.male'), value: 'male' },
    { title: t('headings.female'), value: 'female' }
])

const handleRequest = async (data) => {
    if (isCreate.value) await usersStore.createUser(data)
    else {
        data['id'] = selectedRow.value.id
        data['_method'] = 'PUT'
        if (typeof data.avatar == 'string') delete data.avatar
        delete data.password
        delete data.password_confirmation
        await usersStore.updateUser(data)
        closeModal()
    }
};
</script>


<style lang="scss" scoped>
@import './index.scss';
</style>
