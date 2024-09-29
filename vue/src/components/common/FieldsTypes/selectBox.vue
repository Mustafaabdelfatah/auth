<!-- <template>
    <div class="field" :class="{ 'required-field': required }">
        <div class="d-flex">
            <div class="field-label me-1">{{ label }}</div>
            <requiredIcon v-if="required" class="mt-1"></requiredIcon>
        </div>
        <v-select class="custom-select custom-border" :items="options" :model-value="modelValue"
            @update:model-value="updateValue" :placeholder="placeholder" :multiple="multiple" :required="required"
            :rules="rules" :item-value="itemValue" :requireditem-title="itemTitle" :chips="chips" :label="innerLabel"
            :disabled="disabled" hide-details>
            <template #append-inner>
                <v-icon>
                    <arrowDown></arrowDown>
                </v-icon>
            </template>
        </v-select>
    </div>
</template>
<script setup>
import { defineEmits, defineProps } from 'vue'
import requiredIcon from '@/assets/images/svg/required.svg'
import arrowDown from '@/assets/images/svg/arrow-down.svg'

const props = defineProps({
    label: String,
    innerLabel: String,
    modelValue: [String, Array, Number, Object],
    options: Array,
    multiple: Boolean,
    required: Boolean,
    placeholder: String,
    itemTitle: String,
    chips: Boolean,
    itemValue: {
        default: 'value'
    },
    rules: Array,
    disabled: {
        type: Boolean,
        default: false
    },
})
const emit = defineEmits(['update:modelValue'])
const updateValue = (value) => emit('update:modelValue', value);
</script>

<style lang="scss">
.custom-select .v-field__outline {
    --v-field-border-opacity: 1 !important;
    --v-field-border-width: 0;
    border: 1px solid rgba(var(--v-theme-inputsBorder));
    border-radius: 10px;
}

.custom-select .v-field__append-inner .v-select__menu-icon {
    display: none;
    /* Hide the default arrow */
}
</style> -->

<template>
    <div class="field" :class="{ 'required-field': required }">
        <div class="d-flex">
            <div class="field-label me-1">{{ label }}</div>
            <requiredIcon v-if="required" class="mt-1"></requiredIcon>
        </div>
        <v-select :items="options" :model-value="modelValue" @update:model-value="updateValue"
            :placeholder="placeholder" :multiple="multiple" :label="innerLabel" :required="required" :rules="rules"
            :item-value="itemValue" :item-title="itemTitle" :chips="chips" hide-details :disabled="disabled"/>
    </div>
</template>
<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'
import requiredIcon from '@/assets/images/svg/required.svg'

const props = defineProps({
    label: String,
    innerLabel: String,
    modelValue: [String, Array, Number, Object],
    options: Array,
    multiple: Boolean,
    required: Boolean,
    placeholder: String,
    itemTitle: String,
    chips: Boolean,
    itemValue: {
        default: 'value'
    },
    rules: Array,
    disabled: {
        type:Boolean,
        default: false
    },
})
const emit = defineEmits(['update:modelValue'])
const updateValue = (value) => emit('update:modelValue', value);
</script>

