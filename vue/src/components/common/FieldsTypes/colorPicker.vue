<template>
    <label>
        <input type="color" class="color-picker" :class="{ 'required-field': required }, classList" v-model="innerValue" @input="emit('update:modelValue', innerValue)"
            :style="{ '--bg-color': innerValue }" :disabled="disabled">
    </label>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'

const props = defineProps({
    classList: String,
    modelValue: String,
    required: Boolean,
    disabled: {
        type:Boolean,
        default: false
    },
    hideCanvas: {
        type: Boolean,
        default: false,
    },
    hideInputs: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['update:modelValue'])

const innerValue = ref(props.modelValue);

watch(
    () => props.modelValue,
    (newVal) => {
        innerValue.value = newVal;
        console.log(innerValue.value);
    }
);
</script>

<style lang="scss" scoped>
/* Add any scoped styles here if needed */

label {
    display: flex;
    align-items: center;
    height: 44px;
}

.color-picker {
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    background: transparent;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background-color: var(--bg-color, #000);
        border-radius: 10px;
    }
}
</style>
