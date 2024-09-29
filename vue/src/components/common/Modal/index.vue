<template>
    <v-dialog width="auto" :model-value="dialog" scrollable @click:outside="close">
        <template v-slot:default="{ dialog }">
            <v-card>
                <v-card-title class="">
                    <h3 class="font-weight-regular text-h6">{{ isCreate ? addTitle : editTitle }}</h3>
                </v-card-title>
                <v-divider></v-divider>

                <v-card-text style="max-height: 500px">
                    <GenericForm :schema="schema">
                        <template v-for="field in schema" v-slot:[field.key]>
                            <slot :name="field.key"></slot>
                        </template>
                    </GenericForm>
                </v-card-text>
                <v-divider class="mt-2"></v-divider>
                <v-card-actions class="d-flex ga-4 pa-4">
                    <v-btn :disabled="!validateSchema(schema)" @click="addRow" variant="flat" color="primary"
                        class="font-weight-bold" min-height="40" min-width="150" elevation="0" type="submit">
                        {{ isCreate ? t('buttons.save') : t('headings.update') }}
                    </v-btn>

                    <v-btn @click="close" variant="tonal" min-height="40" min-width="150" class="font-weight-bold">
                        {{ t('buttons.discard') }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </template>
    </v-dialog>
</template>
<script setup>
import { ref, watch } from 'vue'
import GenericForm from '@/components/common/GenericForm/index.vue'
import { useI18n } from 'vue-i18n'
import { validateSchema } from '@/composables/useValidation'
import { transformSchemaToObject, resetSchemaValues } from '@/utils/formDataHandler'

const { t } = useI18n()
const openModalRef = ref(null)
const props = defineProps({
    dialog: Boolean,
    isCreate: Boolean,
    addTitle: String,
    editTitle: String,
    schema: Array
})

const emit = defineEmits(['update:modelValue', 'addEditRow', 'closeModal'])
const close = () => {
    emit('update:modelValue', false)
    emit('closeModal', false)
    resetSchemaValues(props.schema)
}

const addRow = () => {
    let data = transformSchemaToObject(props.schema)
    emit('addEditRow', data)
}
</script>
<style lang="scss">
.perm-cont {
    border: 1px solid #e4e6e8;
    border-radius: 16px;
    padding: 0 15px;
}

.v-card-actions {
    justify-content: flex-start !important;
    align-items: center;
    min-height: 52px;
}

.v-btn__overlay,
.v-btn__underlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
</style>
