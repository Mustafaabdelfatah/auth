<template>
    <VForm @submit.prevent="onSubmit" ref="form">
        <v-row class="mt-1 generic-form-rows v-row-g-5">
            <template v-for="field in schema" :key="field.id">
                <v-col v-if="iShowField(field)" :lg="field?.cols?.lg" :cols="field?.cols?.md">
                    <component :is="getFieldComponent(field.type)" v-bind="{ ...field }" :icon="field.icon"
                        :id="field.key" v-model="field.value" :fieldKey="field.key" :rules="field.rules"
                        :autocomplete="field.autocomplete" :switchPassword="field.switchPassword"
                        :multiple="field.multiple" :itemTitle="field.itemTitle" :itemValue="field.itemValue"
                        :options="field.options" :fieldOptions="field.fieldOptions" :length="field.otpLength"
                        @update:modelValue="field.updateValueHandler ? field.updateValueHandler($event) : ''" :disabled="field.disabled" />
                    <div class="flex" v-if="field.type === 'remember-me'">
                        <v-checkbox v-bind="{ ...field }" hide-details v-model="field.value" :label="$t(field.label)" />

                        <router-link :to="{ name: 'forgot-password' }">
                            {{ $t('BUTTONS.FORGET_PASSWORD') }}
                        </router-link>
                    </div>

                    <v-divider v-if="field.type == 'divider'"></v-divider>
                    <h3 v-if="field.type == 'heading'" class="heading">
                        {{ $t(field.label) }}
                    </h3>

                    <slot v-if="field.type == 'slot'" :name="field.key"></slot>
                </v-col>
            </template>
        </v-row>
        <slot name="submit"></slot>
    </VForm>
</template>
<script setup>
import { ref, watch } from 'vue'
import textInput from '@/components/common/FieldsTypes/textInput.vue'
import passwordInput from '@/components/common/FieldsTypes/passowrdInput.vue'
import textArea from '@/components/common/FieldsTypes/textArea.vue'
import switchbox from '@/components/common/FieldsTypes/switchbox.vue'
import selectBox from '@/components/common/FieldsTypes/selectBox.vue'
import otp from '@/components/common/FieldsTypes/otp.vue'
import timepicker from '@/components/common/FieldsTypes/timepicker.vue'
import phone from '@/components/common/FieldsTypes/phone.vue'
import checkbox from '@/components/common/FieldsTypes/checkBox.vue'
import datePicker from '@/components/common/FieldsTypes/datePicker.vue'
import imageInput from '@/components/common/FieldsTypes/imageInput.vue'
import dateTimeInput from '@/components/common/FieldsTypes/dateTimeInput.vue'
import quillEditor from '@/components/common/FieldsTypes/quillEditor.vue'
import autoComplete from '@/components/common/FieldsTypes/autoComplete.vue'

const emit = defineEmits(['submit', 'updateSchema'])

const props = defineProps({
    schema: {
        type: Object
    },
    propsToWatch: {
        type: Array
    }
})

const iShowField = (field) => {
    if (field.hide) {
        return false
    }
    return true
}

const getFieldComponent = (type) => {
    const components = {
        text: textInput,
        password: passwordInput,
        textarea: textArea,
        switchbox: switchbox,
        selectBox: selectBox,
        otp: otp,
        timepicker: timepicker,
        phone: phone,
        checkbox: checkbox,
        datepicker: datePicker,
        image: imageInput,
        datetime: dateTimeInput,
        quillEditor: quillEditor,
        autoComplete: autoComplete
    }
    return components[type] || 'div'
}

for (let i = 0; i < props.propsToWatch?.length; i++) {
    const indexOfProp = props.schema.findIndex((prop) => prop.key === props.propsToWatch[i])
    watch(
        () => props.schema[indexOfProp].value,
        (newVal) => {
            emit('updateSchema', props.schema[indexOfProp])
        },
        { deep: true }
    )
}
const form = ref(null)
const validate = () => {
    return form.value?.validate()
}

const onSubmit = async () => {
    const { valid } = await validate()
    if (valid) {
        emit('submit', props.schema)
    }
}
defineExpose({ validate });
</script>

<style lang="scss" scoped>
@import './index.scss';

.v-form {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .generic-form-rows {
        flex: none;
    }

}
</style>
