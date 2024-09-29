<template>
    <VueDatePicker @update:model-value="updateValue" v-bind="getDatePickerOptions(fieldOptions)"></VueDatePicker>
</template>

<script setup>
import { ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'

defineProps({
    fieldOptions: Array
})

const emit = defineEmits(['update:modelValue'])
const updateValue = (value) => {
    emit('update:modelValue', moment(value).format('YYYY-MM-DD HH:mm:ss'))
}
const getDatePickerOptions = (fieldOptions) => {
    const options = {}
    fieldOptions.forEach((option) => {
        options[option] = true
    })
    return options
};
</script>

<style lang="scss">
.dp__input_readonly {
    background-color: rgba(var(--v-theme-input_bg), 1);
    border: 1px solid rgba(var(--v-theme-input_border), 1) !important;
    border-radius: 12px;
    height: 55px;
}

.dp__input_wrap {
    text-align: center !important;
}
</style>
