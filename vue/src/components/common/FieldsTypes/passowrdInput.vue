<template>
    <div class="field" :class="{ 'required-field': required }, classList">
        <div class="field-label">{{ label }}</div>
        <span class="d-none">{{ showPassword }}</span>
        <v-text-field :disabled="disabled" :opacity="0" :id="id" hide-details="auto" outlined v-model="innerValue" :placeholder="placeholder"
            :type="showPassword ? 'text' : 'password'" persistent-hint :required="required" bg-color="transparent" :rules="rules" dense flat :center-affix="true"
            @keyup="emit('update:modelValue', innerValue)"
            @click:append-inner="showPassword = !showPassword" :prepend-inner-icon="icon">
            <!-- <template v-slot:prepend-inner>
                <img :src="icon" alt="" />
            </template> -->
            <template v-if="switchPassword" v-slot:append-inner>
                <v-icon v-if="showPassword" color="primary" @click="togglePasswordVisibility">
                    mdi-eye-off-outline
                </v-icon>
                <v-icon v-else color="primary" @click="togglePasswordVisibility">
                    mdi-eye-outline
                </v-icon>
            </template>
        </v-text-field>
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
    disabled: {
        type:Boolean,
        default: false
    },
})

const emit = defineEmits(['update:modelValue'])

const innerValue = ref(props.modelValue)
const showPassword = ref(false)

watch(
    () => props.modelValue,
    (newVal) => {
        innerValue.value = newVal
    }
)

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value
};
</script>
