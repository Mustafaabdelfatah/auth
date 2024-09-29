<template>
    <v-text-field v-model="search" :dirty="dirty" :class="{ 'required-field': required }, classList"
        :placeholder="placeholder" hide-details prepend-inner-icon="mdi-magnify" class="custom-text"
        :clearable="clearable" :disabled="disabled">
        <template #append-inner v-if="searchBtn">
            <v-btn flat min-width="40" max-width="40" class="px-0" color="primary" @click="passingSearchValue">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </template>
    </v-text-field>
</template>
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
    classList: String,
    dirty: Boolean,
    placeholder: String,
    clearable: Boolean,
    required: Boolean,
    searchBtn: {
        type: Boolean,
        default: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
})

const emit = defineEmits(['searchValue'])

const search = ref('')
const passingSearchValue = (event) => emit('searchValue', search.value);

const searchData = defineModel();

watch(search, (newValue) => {
    searchData.value = newValue;
});

</script>

<style lang="scss">
.custom-text {
    .v-field__outline {
        --v-field-border-width: 0px;
        --v-field-border-opacity: 1;
        border-radius: 10px;
        border: 1px solid rgba(var(--v-theme-inputsBorder));
    }
}
</style>
