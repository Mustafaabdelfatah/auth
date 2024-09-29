<template>
    <div class="large-padding">
        <GenericForm :schema="schema" :props-to-watch="[]"></GenericForm>
    </div>
</template>

<script setup>
// =(Components)=============>
import GenericForm from '@/components/common/GenericForm/index.vue'


// =(Functions)=============>
import { ref, onMounted, computed, defineAsyncComponent, defineProps, defineEmits, watch } from 'vue';
import { useNumConverter } from '@/composables/useNumConverter.js'
import { updateSchemaValues } from '@/utils/formDataHandler'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n();


const returnSchema = async () => {
    await updateSchemaValues(schema.value, props.editData)
}




// =(Data)=================>
const test = ref(null)


// =(Props)=================>
const props = defineProps({
    editData: {
        type: Object
    },
});


// =(Emits)=================>
const schemaData = defineModel();


// =(Hocks)================>
onMounted(async () => {
    await returnSchema()
});


// =(Static Data)==========>
const schema = ref([
    {
        id: 0,
        type: 'text',
        key: 'name',
        label: t('headings.first_name'),
        placeholder: t('headings.first_name_example'),
        value: '',
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.GENERAL'),
        ],
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 1,
        type: 'selectBox',
        key: 'employee_type',
        label: t('headings.employee_type'),
        placeholder: t('headings.employee_type'),
        options: [{ title: t('headings.employee'), value: 'employee' }, { title: t('headings.administrative_employee'), value: 'administrative_employee' }],
        itemTitle: 'title',
        itemValue: 'value',
        value: null,
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.GENERAL'),
        ],
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 2,
        type: 'text',
        key: 'email',
        label: t('headings.email'),
        placeholder: t('headings.email'),
        value: '',
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.GENERAL'),
        ],
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 3,
        type: 'phone',
        key: 'phone',
        label: t('headings.phone'),
        placeholder: t('headings.phone'),
        value: '',
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.PHONE'),
        ],
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 4,
        type: 'text',
        key: 'id_number',
        label: t('headings.id'),
        placeholder: t('headings.id'),
        value: '',
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.GENERAL'),
        ],
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 5,
        type: 'selectBox',
        key: 'gender',
        label: t('headings.gender'),
        placeholder: t('headings.gender'),
        options: [{ title: t('headings.male'), value: 'male' }, { title: t('headings.female'), value: 'female' }],
        itemTitle: 'title',
        itemValue: 'value',
        value: null,
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.GENERAL'),
        ],
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 6,
        type: 'text',
        key: 'address',
        label: t('headings.personal_address'),
        placeholder: t('headings.personal_address'),
        value: '',
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.GENERAL'),
        ],
        cols: {
            lg: 6,
            md: 12
        }
    },
    {
        id: 7,
        type: 'datepicker',
        key: 'birth_date',
        label: t('headings.birth_date'),
        placeholder: t('headings.birth_date'),
        value: '',
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.GENERAL'),
            (v) => {
                if (!v) return true;
                const selectedDate = new Date(v);
                const today = new Date();
                const age = today.getFullYear() - selectedDate.getFullYear();
                const hasBirthdayPassed =
                    today.getMonth() > selectedDate.getMonth() ||
                    (today.getMonth() === selectedDate.getMonth() && today.getDate() >= selectedDate.getDate());
                return age > 16 || (age === 15 && hasBirthdayPassed) || t('ERRORS.AGE_REQUIREMENT');
            }
        ],
        cols: {
            lg: 6,
            md: 12
        }
    },

]);


watch(
    schema.value,
    (newValue) => {
        // updateSchemaValues(schema.value, schemaData.value)
        schemaData.value = newValue
    },
    { deep: true }
);






</script>

<style lang="scss" scoped>
.large-padding {
    padding-bottom: 10rem;
}
</style>
