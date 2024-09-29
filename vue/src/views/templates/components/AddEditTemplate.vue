<template>
    <ASideDialog DialogType="add" v-model="dialog" :addButton="true">
        <template #open-dialog-btn>
            {{ t('buttons.add_new_template') }}
        </template>
        <template #title>
            <h5 class="_card-title">
                {{ isCreate ? t('buttons.add_new_template') : t('buttons.edit_new_template') }}
            </h5>
        </template>
        <template #content>
            <GenericForm @submit="submitForm" :schema="schema">
                <template #submit>
                    <div class="d-flex align-center justify-end ga-3 w-100 actions-shadow">
                        <v-btn @click="dialog = false" class="d-flex border-thin px-5 border-error bg-error" rounded="6px"
                            border="opacity-50" height="42">
                            {{ t('buttons.cancel') }}
                        </v-btn>
                        <v-btn v-ripple="{ class: `text-secondary` }"
                            class="d-flex border-thin px-5 text-white  border-secondary bg-secondary" rounded="6px"
                            border="opacity-50" height="42" type="submit" :loading="appStore.buttonLoading">
                            {{ isCreate ? t('buttons.add') : t('buttons.edit') }}
                        </v-btn>
                    </div>
                </template>
            </GenericForm>
        </template>
    </ASideDialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, onMounted, watch, onUnmounted } from 'vue'
import ASideDialog from '@/components/common/Dialogs/ASideDialog.vue'
import GenericForm from '@/components/common/GenericForm/index.vue'
import { createTemplate, updateTemplate } from '@/services/apis/templates'
import { updateSchemaValues, transformSchemaToObject, resetSchemaValues } from '@/utils/formDataHandler'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore();
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

import { useTemplate } from '@/stores/templates'
const templateStatus = useTemplate();


// =====(  Data )====== //
const dialog = ref(false)
const isCreate = ref(true)
const departments = ref([])

const props = defineProps({
    template: {
        type: Object,
    },
});

// =====(  Emits & Models )====== //
const openDialog = defineModel()
const emit = defineEmits(['templateAdded', 'templateEdited'])


// =====(  Functions )====== //

// Save
const save = async (data) => {
    appStore.buttonLoading = true
    const form = transformSchemaToObject(data)
    form['type'] = templateStatus.templateType
    await createTemplate(form)
    appStore.buttonLoading = false
    emit('templateAdded');
    dialog.value = false;
};

// Edit
const edit = async (data) => {
    appStore.buttonLoading = true
    const templateId = props.template.id;
    const form = transformSchemaToObject(data)
    form['type'] = templateStatus.templateType
    await updateTemplate(templateId, form)
    appStore.buttonLoading = false
    emit('templateEdited');
    dialog.value = false;
};


const submitForm = async (data)=> {
    if (isCreate.value){
        await save(data)
    }
    else{
        await edit(data)
    }
}

const returnData = async () => {
    console.log('schema.value', schema.value);
    console.log('props.template', props.template);
    updateSchemaValues(schema.value ,props.template)
}



watch(props, (newValue, oldValue) => {
    returnData()
});


const schema = ref([
    {
        id: 0,
        type: 'text',
        key: 'name.ar',
        label: t('headings.sector_name_ar'),
        placeholder: t('headings.sector_name_ar'),
        value: '',
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.NAME'),
        ],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 1,
        type: 'quillEditor',
        key: 'description.ar',
        label: t('headings.sector_description_ar'),
        placeholder: t('headings.sector_description_ar'),
        value: '',
        // required: true,
        // rules: [
        //     (v) => !!v || t('ERRORS.DESCRIPTION'),
        // ],
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
        value: '',
        required: true,
        rules: [
            (v) => !!v || t('ERRORS.NAME'),
        ],
        cols: {
            lg: 12,
            md: 12
        }
    },
    {
        id: 3,
        type: 'quillEditor',
        key: 'description.en',
        label: t('headings.sector_description_en'),
        placeholder: t('headings.sector_description_en'),
        value: '',
        // required: true,
        // rules: [
        //     (v) => !!v || t('ERRORS.DESCRIPTION'),
        // ],
        cols: {
            lg: 12,
            md: 12
        }
    }
]);


watch(dialog, (newValue, oldValue) => {
    if(newValue == false) {
        resetSchemaValues(schema.value)
        isCreate.value =  true
    } else {
    }
});

watch(openDialog, (newValue, oldValue) => {
    if(newValue == true) {
        dialog.value = newValue
    } else {
        dialog.value = true
    }
    isCreate.value =  false
});



// onMounted(() => {

// });


</script>

<style lang="scss" scoped>
._card-title {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.875rem;
    margin-bottom: 0;
}
</style>
