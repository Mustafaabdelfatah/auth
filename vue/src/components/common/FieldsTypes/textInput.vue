<template>
    <div class="field" :class="{ 'required-field': required }, classList">
        <div class="d-flex">
            <div class="field-label me-1">{{ label }}</div>
            <requiredIcon v-if="required" class="mt-1"></requiredIcon>
        </div>

        <v-text-field :id="id" hide-details="auto" variant="outlined" outlined v-model="innerValue" :placeholder="placeholder" bg-color="transparent" :center-affix="true"
            :required="required" :rules="rules" flat dense @keyup="emit('update:modelValue', innerValue)" :disabled="disabled">
            <template v-if="icon" v-slot:prepend-inner>
                <img :src="icon" alt="" />
            </template>
        </v-text-field>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import requiredIcon from '@/assets/images/svg/required.svg'

const props = defineProps({
    classList: String,
    modelValue: String,
    id: String,
    label: String,
    placeholder: String,
    icon: String,
    switchPassword: Boolean,
    required: Boolean,
    rules: Array,
    disabled: {
        type:Boolean,
        default: false
    },
});

const emit = defineEmits(['update:modelValue'])

const innerValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newVal) => {
        innerValue.value = newVal
    }
);
</script>
