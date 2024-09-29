<template>
  <v-checkbox :disabled="disabled" :class="classList" hide-details v-model="innerValue" :label="label" :required="required"></v-checkbox>
</template>
<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
    classList: String,
    modelValue: String,
    label: String,
    disabled: {
        type:Boolean,
        default: false
    },
    required: Boolean
})

const emit = defineEmits(['update:modelValue'])

const innerValue = ref(props.modelValue)

watch(
    () => props.modelValue,
    (newVal) => {
        innerValue.value = newVal
    }
)
</script>
<style lang="scss" scoped>
::v-deep {
    .v-selection-control__wrapper {
        color: #cbd5e0;
    }

    .v-selection-control__input>.v-icon {
        opacity: 1;
    }
}
</style>
