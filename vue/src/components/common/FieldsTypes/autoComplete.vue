<template>
    <div class="field" :class="{ 'required-field': required }, classList">
        <div class="d-flex">
            <div class="field-label me-1">{{ label }}</div>
            <requiredIcon v-if="required" class="mt-1"></requiredIcon>
        </div>

        <v-autocomplete variant="outlined" hide-details="auto" :return-object="returnObject" outlined :model-value="modelValue" :items="options"
            :placeholder="placeholder" :chips="chips" closable-chips :item-value="itemValue" :item-title="itemTitle" :multiple="multiple"
            :required="required" :rules="rules" @update:model-value="updateValue" :disabled="disabled">
        <!--
            <template v-slot:chip="{ props, item }">
                <v-chip v-bind="props" :prepend-avatar="item.raw.avatar" :text="item.raw.name"></v-chip>
            </template>

            <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :prepend-avatar="item.raw.avatar" :subtitle="item.raw.group"
                    :title="item.raw.itemTitle"></v-list-item>
            </template>
        -->
        </v-autocomplete>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import requiredIcon from '@/assets/images/svg/required.svg'

const props = defineProps({
    classList: String,
    label: String,
    modelValue: [String, Array, Number, Object],
    options: Array,
    multiple: Boolean,
    required: Boolean,
    placeholder: String,
    itemTitle: String,
    disabled: {
        type:Boolean,
        default: false
    },
    returnObject: {
        type:Boolean,
        default: false
    },
    chips: {
        type:Boolean,
        default: true
    },
    itemValue: {
        default: 'value'
    },
    rules: Array
})
const emit = defineEmits(['update:modelValue'])
const updateValue = (value) => emit('update:modelValue', value);
</script>
