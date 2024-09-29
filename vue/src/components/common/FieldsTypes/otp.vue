<template lang="">
  <v-otp-input :length="length" :model-value="innerValue"></v-otp-input>
</template>
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    modelValue: String,
    required: Boolean,
    length: Number,
    disabled: {
        type:Boolean,
        default: false
    },

})

const emit = defineEmits(['update:modelValue'])

const innerValue = ref(props.modelValue)

watch(
    () => props.modelValue,
    (newVal) => {
        innerValue.value = newVal
    }
);
</script>
