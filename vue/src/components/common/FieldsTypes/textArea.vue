<template>
    <div class="field" :class="{ 'required-field': required }, classList">
        <div class="d-flex">
            <div class="field-label me-1">{{ label }}</div>
            <requiredIcon v-if="required" class="mt-1"></requiredIcon>
        </div>
        <v-textarea :id="id" hide-details="auto" v-model="innerValue" :placeholder="placeholder" :required="required"
            :rules="rules" dense variant="outlined" v-bind="$attrs" outlined rows="2"
            @keyup="emit('update:modelValue', innerValue)" :disabled="disabled" />
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import requiredIcon from '@/assets/images/svg/required.svg'
defineProps({
    classList: String,
    id: String,
    label: String,
    placeholder: String,
    required: Boolean,
    rules: Array,
    disabled: {
        type:Boolean,
        default: false
    },
})
const emit = defineEmits(['update:modelValue'])
const innerValue = ref('');
</script>
