<template>
    <div class="field" :class="{ 'required-field': required }, classList">
        <div class="d-flex">
            <div class="field-label me-1">{{ label }}</div>
            <requiredIcon v-if="required" class="mt-1"></requiredIcon>
        </div>
        <vue-tel-input
            :defaultCountry='966' @validate="onValidate" v-model="innerValue" :inputOptions="{
            placeholder: placeholder,
            required: required,
            disabled:disabled,
            autocomplete:`off`,
            // showDialCode:true,
        }" dropdownOptions.showSearchBox="true" :ignoredCountries="['il']" mode="international"></vue-tel-input>
    </div>
</template>
<script setup>
import {ref, watch} from 'vue'
import requiredIcon from '@/assets/images/svg/required.svg'

import {VueTelInput} from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

const props = defineProps({
    classList: String,
    modelValue: String,
    label: String,
    placeholder: String,
    required: Boolean,
    rules: String,
    disabled: {
        type: Boolean,
        default: false
    },
})

const emit = defineEmits(['update:modelValue'])
const innerValue = ref(props.modelValue)

const onValidate = (phone) => {
    let nationalNumber = phone.nationalNumber;
    if (nationalNumber && !nationalNumber.startsWith('0')) {
        nationalNumber = '0' + nationalNumber;
    }

    emit('update:modelValue', nationalNumber);
}

watch(
    () => props.modelValue,
    (newVal) => {
        innerValue.value = newVal
    }
);

</script>

<style lang="scss" scoped>
::v-deep {
    .vti__dropdown.open {
        background-color: transparent !important;
    }

    .vti__dropdown:hover {
        background-color: transparent !important;
    }

    .vue-tel-input {
        height: 56px;
        border-radius: 8px;
        border-color: rgba(var(--v-theme-inputsBorder), 1);
        box-shadow: none;

        .vti__input,
        .vti__phone {
            direction: ltr;
            text-align: right;
        }

        .vti__dropdown-list.below {
            top: 100%;
        }

        .vti__dropdown-item {
            direction: ltr;
        }
    }

    .vti__input {
        color: rgba(var(--v-theme-inputsLabels), 1);
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500 !important;
        line-height: 160%;
        font-family: 'Alexandria';
    }

    ::placeholder {
        color: #b2b4b8;
        opacity: 1;
        /* Firefox */
    }

    ::-ms-input-placeholder {
        /* Edge 12 -18 */
        color: red;
    }

    .vti__phone {
    }
}
</style>
