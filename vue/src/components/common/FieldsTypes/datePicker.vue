<template>
    <div class="field" :class="{ 'required-field': required }">
        <div class="d-flex">
            <div class="field-label me-1">{{ label }}</div>
            <requiredIcon v-if="required" class="mt-1"></requiredIcon>
        </div>
        <v-text-field :append-inner-icon="calendar" v-model="innerValue" :active="menu2" readonly
            @click="menu2 = !menu2" :required="required" :rules="rules" :placeholder="placeholder" hide-details="auto">
            <v-menu v-model="menu2" :close-on-content-click="false" activator="parent" transition="scale-transition">
                <v-date-picker v-if="menu2" v-model="pickerValue" @update:modelValue="updateDate" color="primary"
                    :max="new Date()" hide-details="auto" :disabled="disabled"></v-date-picker>
            </v-menu>
        </v-text-field>
    </div>
</template>

<script setup>
import requiredIcon from '@/assets/images/svg/required.svg'
import calendar from '@/assets/images/svg/calendar.svg'
import { ref, watch } from 'vue'
import moment from 'moment'

const menu2 = ref(false)

const props = defineProps({
    modelValue: String,
    label: String,
    placeholder: String,
    icon: String,
    required: Boolean,
    min: String,
    max: String,
    rules: Array,
    disabled: {
        type:Boolean,
        default: false
    },
})

const emit = defineEmits(['update:modelValue'])

const innerValue = ref(props.modelValue ? moment(props.modelValue).format('YYYY-M-D') : null)
const pickerValue = ref(props.modelValue ? new Date(props.modelValue) : null)

watch(innerValue, (newVal) => {
    emit('update:modelValue', newVal)
})

const updateDate = (value) => {
    innerValue.value = moment(value).format('YYYY-M-D')
    menu2.value = false
};
</script>

<style lang="scss" scoped>
::v-deep {
    .v-picker-title {
        display: none;
    }

    .v-date-picker-header__content {
        font-size: 1rem;
        // line-height: 1.5rem;
    }

    .v-date-picker-header {
        height: 4rem;
    }
}
</style>
