<template>
    <ASideDialog DialogType="add" v-model="dialog" :addButton="false">
        <template #title>
            <h5 class="_card-title">
                {{ t('buttons.assign_scenario') }}
            </h5>
        </template>
        <template #content>
            <GenericForm @submit="assign" :schema="schema">
                <template #submit>
                    <div class="d-flex align-center justify-end ga-3 w-100 actions-shadow">
                        <v-btn @click="dialog = false" class="d-flex border-thin px-5 border-error bg-error" rounded="8"
                            border="opacity-50" height="42">
                            {{ t('buttons.cancel') }}
                        </v-btn>
                        <v-btn v-ripple="{ class: `text-secondary` }"
                            class="d-flex border-thin px-5 text-white  border-secondary bg-secondary" rounded="8"
                            border="opacity-50" height="42" type="submit" :loading="appStore.buttonLoading">
                            {{ t('buttons.assign') }}
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
import { scenarioOperations, assignScenario } from '@/services/apis/scenarios'
import { updateSchemaValues, transformSchemaToObject, resetSchemaValues } from '@/utils/formDataHandler'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

import { useAppStore } from '@/stores/app'
const appStore = useAppStore();

// =====(  Data )====== //
const dialog = ref(false)
const isCreate = ref(true);
const operations = ref([]);

const props = defineProps({
    assignScenario: {
        type: Number,
    },
});

// =====(  Emits & Models )====== //
const openDialog = defineModel()
const emit = defineEmits(['scenarioAssigned'])


// =====(  Functions )====== //

// Assign
const assign = async (data) => {
    appStore.buttonLoading = true
    const operations = transformSchemaToObject(data)
    const form = {
        logic_id: props.assignScenario,
        ...operations
    }
    console.log('form', form);
    await assignScenario(form).finally(appStore.buttonLoading = false)
    emit('scenarioAssigned');
    dialog.value = false;
};


const returnData = async () => {
    updateSchemaValues(schema.value, props.scenario)
}

watch(props, (newValue, oldValue) => {
    returnData()
});


const schema = ref([
    {
        id: 0,
        type: 'autoComplete',
        key: 'operations',
        label: t('inputs.select_department'),
        placeholder: t('inputs.select_department'),
        options: operations,
        // itemValue: 'id',
        // itemTitle: 'translation_name',
        value: null,
        required: true,
        multiple: true,
        rules: [(v) => !!v || t('ERRORS.SELECT_DEPARTMENT')],
        cols: {
            lg: 12,
            md: 12
        },
    },
]);


watch(dialog, (newValue, oldValue) => {
    if (newValue == false) {
        resetSchemaValues(schema.value)
        isCreate.value = true
    } else {
    }
});

watch(openDialog, (newValue, oldValue) => {
    if (newValue == true) {
        dialog.value = newValue
    } else {
        dialog.value = true
    }
    isCreate.value = false
});

onMounted(async () => {
    operations.value = await scenarioOperations();
});


</script>

<style lang="scss" scoped>
._card-title {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.875rem;
    margin-bottom: 0;
}
</style>
