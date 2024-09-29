<template>
    <GenericForm :schema="schema" :props-to-watch="[]" class="large-padding"></GenericForm>
</template>

<script setup>
// =(Components)=============>
import GenericForm from '@/components/common/GenericForm/index.vue'
import { findSchemaIndex } from '@/utils/formDataHandler'

// =(Data)=================>

const queryParams = {
    tables: [{ name: 'departments' }, { name: 'positions' }, { name: 'users' }]
}

const queryEnumsParams = {
    enums: [{ name: 'user.technical_level' }, { name: 'user.user_attachment_type' }]
}

// =(Functions)=============>
import {
    ref,
    onMounted,
    computed,
    defineAsyncComponent,
    defineProps,
    defineEmits,
    watch
} from 'vue'
import { useNumConverter } from '@/composables/useNumConverter.js'
import { updateSchemaValues } from '@/utils/formDataHandler'
import { getGenerals, getEnumsGenerals } from '@/services/apis/general'
import { getSectors } from '@/services/apis/sectors'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const sections = ref(null)
const sectionList = ref([])

const fetchSectors = async () => {
    sectionList.value = await getSectors()
    sections.value = sectionList.value.map((sec) => ({ title: sec.translation_name, value: sec.id }))
}
const [enumsList, modelList] = await Promise.all([
    getGenerals(queryParams),
    getEnumsGenerals(queryEnumsParams),
    fetchSectors()
])

const { departments, positions, users } = enumsList
const data = modelList

const returnSchema = async () => {
    await updateSchemaValues(schema.value, props.editData)
}

// =(Props)=================>
const props = defineProps({
    editData: {
        type: Object
    }
})

const departmentList = ref([])

// =(Emits)=================>
const schemaData = defineModel()

// =(Static Data)==========>
const schema = ref([
    {
        id: 0,
        type: 'selectBox',
        key: 'section_id',
        label: t('headings.sector'),
        placeholder: t('headings.sector'),
        options: computed(() => sections.value),
        itemTitle: 'title',
        itemValue: 'value',
        value: null,
        required: true,
        rules: [(v) => !!v || t('ERRORS.GENERAL')],
        cols: {
            lg: 12,
            md: 12
        },
        updateValueHandler: (value) => {
            departmentList.value = sectionList.value.find(
                (department) => department.id === value
            )?.departments
            let departmentIndex = findSchemaIndex(schema.value, 'department_id')
            schema.value[departmentIndex].options = departmentList.value
        }
    },
    {
        id: 1,
        type: 'selectBox',
        key: 'department_id',
        label: t('headings.main_department'),
        placeholder: t('headings.main_department'),
        options: [],
        itemTitle: 'translation_name',
        itemValue: 'id',
        value: null,
        required: true,
        rules: [(v) => !!v || t('ERRORS.GENERAL')],
        cols: {
            lg: 6,
            md: 12
        },
        updateValueHandler: (value) => {
            const subDepartment = departmentList.value.find(
                (department) => department.id === value
            ).children
            let subDepartmentIndex = findSchemaIndex(schema.value, 'sub_department_id')
            schema.value[subDepartmentIndex].options = subDepartment
        }
    },
    {
        id: 2,
        type: 'selectBox',
        key: 'sub_department_id',
        label: t('headings.sub_department'),
        placeholder: t('headings.sub_department'),
        options: [],
        itemTitle: 'translation_name',
        itemValue: 'id',
        value: null,
        required: false,
        // rules: [
        //     (v) => !!v || t('ERRORS.GENERAL'),
        // ],
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 3,
        type: 'selectBox',
        key: 'position_id',
        label: t('headings.position'),
        placeholder: t('headings.position'),
        options: positions,
        itemTitle: 'name',
        itemValue: 'id',
        value: null,
        required: true,
        rules: [(v) => !!v || t('ERRORS.GENERAL')],
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 4,
        type: 'text',
        key: 'title',
        label: t('headings.job_title'),
        placeholder: t('headings.job_title'),
        value: null,
        // required: true,
        // rules: [
        //     (v) => !!v || t('ERRORS.GENERAL'),
        // ],
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 5,
        type: 'text',
        key: 'salary',
        label: t('headings.salary'),
        placeholder: t('headings.salary'),
        value: null,
        // required: true,
        // rules: [
        //     (v) => !!v || t('ERRORS.GENERAL'),
        // ],
        cols: {
            lg: 6,
            md: 12
        }
    },

    {
        id: 6,
        type: 'selectBox',
        key: 'medical_checkup_form',
        label: t('headings.medical_checkup'),
        placeholder: t('headings.medical_checkup'),
        options: [
            { title: t('headings.yes'), value: true },
            { title: t('headings.no'), value: false }
        ],
        itemTitle: 'title',
        itemValue: 'value',
        value: null,
        required: true,
        rules: [(v) => !!v || t('ERRORS.GENERAL')],
        cols: {
            lg: 6,
            md: 12
        }
    },

    {
        id: 7,
        type: 'selectBox',
        key: 'technical_level',
        label: t('headings.technical_level'),
        placeholder: t('headings.technical_level'),
        options: data['user.technical_level'],
        itemTitle: 'label',
        itemValue: 'value',
        value: null,
        required: true,
        // disabled: true,
        rules: [(v) => !!v || t('ERRORS.GENERAL')],
        cols: {
            lg: 6,
            md: 12
        }
    },

    {
        id: 8,
        type: 'datepicker',
        key: 'joining_date',
        label: t('headings.joining_date'),
        placeholder: t('headings.joining_date'),
        value: '',
        required: true,
        rules: [(v) => !!v || t('ERRORS.GENERAL')],
        cols: {
            lg: 6,
            md: 12
        }
    }
])

watch(
    schema.value,
    (newValue) => {
        schemaData.value = newValue
    },
    { deep: true }
)

// =(Hocks)================>
onMounted(async () => {
    await returnSchema()
})
</script>

<style lang="scss" scoped>
.large-padding {
    padding-bottom: 15rem;
}
</style>
