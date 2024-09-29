<template>
    <v-tabs v-model="currentTab" hide-slider  :grow="grow" >
        <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value" :disabled="tab.disabled">
            <div v-if="!slotLabel">
                {{ tab.label }}
            </div>
            <div v-else>
                <slot :name="tab.label"></slot>
            </div>
        </v-tab>
    </v-tabs>

    <v-tabs-window v-model="currentTab" class="mt-5 h-100">
        <v-tabs-window-item v-for="tab in tabs" :key="tab.value" :value="tab.value">
            <slot :name="tab.value"></slot>
        </v-tabs-window-item>
    </v-tabs-window>
</template>

<script setup>
import { ref, watch, defineProps } from 'vue';

const props = defineProps({
    tabs: {
        type: Array,
        required: true,
        validator: (value) => {
            return value.every(tab => tab.hasOwnProperty('value') && tab.hasOwnProperty('label'));
        }
    },
    initialTab: {
        type: String,
        default: ''
    },
    slotLabel: {
        type: Boolean,
        default: false
    },
    grow: {
        type: Boolean,
        default: false
    }
});

const currentTab =defineModel()

</script>
