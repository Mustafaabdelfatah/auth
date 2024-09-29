<template>
    <div class="field ga-0" :class="{ 'required-field': required, 'rtl-styles': locale === 'ar' }, classList">
        <div class="d-flex mb-3">
            <div class="field-label me-1">{{ label }}</div>
            <requiredIcon v-if="required" class="mt-1"></requiredIcon>
        </div>
        <QuillEditor class="rtl" :id="id" :required="required" :rules="rules" theme="snow" v-model:content="innerValue"
            :placeholder="placeholder" contentType="html" @textChange="emit('update:modelValue', innerValue)" :disabled="disabled" >
            <!-- <template #toolbar>
                <div id="my-toolbar">
                    <button class="ql-bold"></button>
                    <button class="ql-italic"></button>
                    <button class="ql-underline"></button>
                    <button class="ql-strike"></button>
                    <button class="ql-blockquote"></button>
                    <select class="ql-size">
                        <option value="small"></option>
                        <option value="normal" selected ></option>
                        <option value="large"></option>
                        <option value="huge"></option>
                    </select>
                    <select class="ql-header">
                        <option value="1"></option>
                        <option value="2"></option>
                        <option value="3"></option>
                        <option value="4"></option>
                        <option value="5"></option>
                    </select>
                    <button class="ql-script" value="sub"></button>
                    <button class="ql-script" value="super"></button>

                    <select class="ql-custom">
                        <option value="small"></option>
                        <option value="normal" selected ></option>
                        <option value="large"></option>
                        <option value="huge"></option>
                    </select>
                </div>
            </template> -->
        </QuillEditor>
    </div>
</template>

<script setup>

import requiredIcon from '@/assets/images/svg/required.svg'
import { ref, watch, computed } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const props = defineProps({
    classList: String,
    modelValue: String,
    id: String,
    label: String,
    placeholder: String,
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

const isArabicLocale = computed(() => locale);

console.log('isArabicLocale', isArabicLocale);


</script>

<style lang="scss">
.ql-toolbar.ql-snow {
    border: 1px solid rgba(var(--v-theme-inputsBorder), 1);
    border-radius: .5rem .5rem 0 0;
}

.ql-container.ql-snow {
    border-radius: 0 0 .5rem .5rem;
    border: 1px solid rgba(var(--v-theme-inputsBorder), 1);
    min-height: 5rem;
}

.rtl-styles .ql-snow .ql-picker-label {
    justify-content: flex-end;
}

.rtl-styles .ql-editor.ql-blank::before {
    left: auto;
}

.ql-editor.ql-blank::before {
    color: rgba(var(--v-theme-flowIconBorderColor), 1);
    font-style: normal;
    font-size: .95rem;
    font-weight: 400;
    right: 15px;
}

.rtl-styles .ql-editor {
    text-align: right;
}

.ql-snow.ql-toolbar button.ql-active,
.ql-snow .ql-toolbar button.ql-active,
.ql-snow.ql-toolbar .ql-picker-label.ql-active,
.ql-snow .ql-toolbar .ql-picker-label.ql-active,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected {
    background-color: rgba(var(--v-theme-background), 1);
    color: rgba(var(--v-theme-primary), 1);
}

.ql-snow.ql-toolbar button.ql-active .ql-stroke,
.ql-snow .ql-toolbar button.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
.ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow .ql-toolbar button.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
.ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
.ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
    stroke: rgba(var(--v-theme-primary), 1);
}
</style>
