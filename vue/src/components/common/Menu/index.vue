<template>
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-btn variant="text" class="pa-0" slim width="auto" height="auto" :icon="iconBtn" v-bind="props">
                <slot name="activator"></slot>
            </v-btn>
        </template>
        <v-list :select-strategy="strategy" v-model:selected="selected">
            <v-list-item v-for="(item, index) in items" :value="item" :key="index" color="primary">
                <template v-slot:prepend>
                    <v-avatar :image="item.avatar"></v-avatar>
                </template>
                <template v-slot:append="{ isActive }">
                    <v-list-item-action>
                        <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                    </v-list-item-action>
                </template>
                <v-list-item-title>
                    {{ item.name }}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{ item.name }}
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, onMounted, watch, onUnmounted } from 'vue'
const props = defineProps({
    items: {
        type: Array,
    },
    strategy: {
        type: String,
    },
    iconBtn: {
        type: Boolean,
        default: true
    },
})

const selected = defineModel();

</script>

<style lang="scss" scoped>
.v-list {
    min-width: 20rem;
    padding: .5rem;
}

.v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line {
    padding: .5rem  .625rem;
    border-radius: .313rem !important;
    margin-bottom: .3rem;
}

.v-list-item-title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5rem;
}

.v-list-item-subtitle {
    font-size: .875rem;
    font-weight: 400;
    line-height: 1.406rem;
    color: rgba(var(--v-theme-text), 1);
}

.v-avatar.v-avatar--density-default {
    height: 2.5rem;
    width: 2.5rem;
}

::v-deep {

    .v-list-item__prepend, .v-list-item__append {
        flex-direction: column;
    }

    .v-list-item__prepend{
        margin-inline-end: .75rem;
    }

    .v-selection-control--density-default {
        --v-selection-control-size: fit-content;
    }

    .v-selection-control__input {
    width: fit-content;
    height: fit-content;
}
}

</style>
