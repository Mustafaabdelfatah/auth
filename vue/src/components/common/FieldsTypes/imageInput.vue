<template>
    <div class="field" :class="{ 'required-field': required }, classList">
        <div class="field-label">{{ label }}</div>
        <input type="file" @change="fileHandler" />
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'

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
})

const emit = defineEmits(['update:modelValue'])

const innerValue = ref(props.modelValue)

const fileHandler = (e) => {
    const file = e.target.files[0]
}
watch(
    () => props.modelValue,
    (newVal) => {
        innerValue.value = newVal
    }
);
</script>
