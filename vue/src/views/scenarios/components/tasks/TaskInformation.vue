<template>
    <GenericForm @submit="next" :schema="schema" class="mt-0">
        <template #submit>
            <div class="d-flex align-center justify-end ga-3 w-100 pt-5 border-t-thin pb-8">
                <v-btn @click="prev" v-ripple="{ class: `text-secondary` }"
                    class="d-flex border-thin px-5 text-white border-secondary bg-secondary" rounded="6px"
                    border="opacity-50" height="42" type="button">
                    {{ t('buttons.previous') }}
                </v-btn>
                <v-btn type="submit" v-ripple="{ class: `text-secondary` }"
                    class="d-flex border-thin px-5 text-white border-secondary bg-secondary" rounded="6px"
                    border="opacity-50" height="42">
                    {{ t('buttons.next') }}
                </v-btn>
            </div>
        </template>
    </GenericForm>
</template>

<script setup>
import GenericForm from '@/components/common/GenericForm/index.vue'
import { ref, defineProps, defineEmits, computed, onMounted, watch, onUnmounted } from 'vue'
import {
    updateSchemaValues,
    transformSchemaToObject,
    resetSchemaValues,
    findSchemaIndex
} from '@/utils/formDataHandler'
import { getDepartments, getDepartmentsTasks } from '@/services/apis/departments'

import { useTaskLogics } from '@/stores/task-logics'
const taskLogics = useTaskLogics()

import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

const emit = defineEmits(['next', 'previous'])

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const next = async (data) => {
    await returnData()
    const payload = transformSchemaToObject(data)
    taskLogics.taskInfo = payload
    emit('next', payload)
}

const returnData = async () => {
    await updateSchemaValues(schema.value, taskLogics.task)
}

const prev = async () => {
    // updateSchemaValues(schema.value ,taskLogics.taskInfo)
    emit('previous')
}

const submitForm = async () => {
    console.log('submitForm')
}

const departments = ref([])
const fetchDepartments = async () => {
    const data = await getDepartments()
    departments.value = data
}

const department = ref([])
const fetchSingleDepartment = async (id) => {
    const data = await getDepartmentsTasks(id)
    department.value = data
}

console.log('Edit')

let usersId = ref(null)

const schema = ref([
    {
        id: 0,
        type: 'text',
        key: 'name.ar',
        label: t('headings.sector_name_ar'),
        placeholder: t('headings.sector_name_ar'),
        value: null,
        required: true,
        rules: [(v) => !!v || t('ERRORS.NAME')],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 1,
        type: 'textarea',
        key: 'description.ar',
        label: t('headings.sector_description_ar'),
        placeholder: t('headings.sector_description_ar'),
        value: null,
        required: true,
        rules: [(v) => !!v || t('ERRORS.DESCRIPTION')],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 2,
        type: 'text',
        key: 'name.en',
        label: t('headings.sector_name_en'),
        placeholder: t('headings.sector_name_en'),
        value: null,
        required: true,
        rules: [(v) => !!v || t('ERRORS.NAME')],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 3,
        type: 'textarea',
        key: 'description.en',
        label: t('headings.sector_description_en'),
        placeholder: t('headings.sector_description_en'),
        value: null,
        required: true,
        rules: [(v) => !!v || t('ERRORS.DESCRIPTION')],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 4,
        type: 'autoComplete',
        key: 'department_id',
        label: t('inputs.select_department'),
        placeholder: t('inputs.select_department'),
        options: departments,
        itemValue: 'id',
        itemTitle: 'translation_name',
        value: null,
        required: true,
        rules: [(v) => !!v || t('ERRORS.SELECT_DEPARTMENT')],
        cols: {
            lg: 12,
            md: 12
        },
        updateValueHandler: async (value) => {
            await fetchSingleDepartment(value)
        }
    },
    {
        id: 5,
        type: 'autoComplete',
        key: 'userIds',
        label: t('inputs.select_user'),
        placeholder: t('inputs.select_user'),
        options: computed(() => department.value.users),
        itemValue: 'id',
        itemTitle: 'name',
        value: null,
        // customPayload: Array,
        required: true,
        multiple: true,
        returnObject: true,
        rules: [(v) => !!v || t('ERRORS.SELECT_USERS')],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 6,
        type: 'autoComplete',
        key: 'task_points',
        label: t('inputs.select_task'),
        placeholder: t('inputs.select_task'),
        options: computed(() => department.value.tasks),
        itemValue: 'id',
        itemTitle: 'translation_name',
        value: null,
        required: true,
        returnObject: true,
        multiple: true,
        rules: [(v) => !!v || t('ERRORS.SELECT_TASKS')],
        cols: {
            lg: 12,
            md: 12
        }
    }
])

onMounted(async () => {
    await fetchDepartments()
    if (!appStore.isCreate) {
        returnData()
        await fetchSingleDepartment(taskLogics.task.department_id)
        let usersId = taskLogics.task.task_points.map((task) => task.user_id)
        let tasksId = taskLogics.task.task_points.map((task) => task.id)

        let usersIdIndex = findSchemaIndex(schema.value, 'userIds')
        let taskPointsIndex = findSchemaIndex(schema.value, 'task_points')
        schema.value[usersIdIndex].value = usersId
        schema.value[taskPointsIndex].value = tasksId
    }
})
</script>

<style lang="scss" scoped>
::v-deep {
    .generic-form-rows {
        overflow-y: scroll !important;
        max-height: 85% !important;
    }

    .v-row {
        margin-top: 0 !important;
    }
}
</style>
