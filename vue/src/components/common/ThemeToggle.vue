<template>
    <!-- <v-switch @click="switchTheme" base-color="#F2F3F5" :false-icon="icon" :true-icon="icon" inset :flat="true"
        :hide-spin-buttons="true" :inline="true" v-ripple.center theme hide-details>
    </v-switch> -->

    <v-btn :icon="icon" variant="text" size="24" flat @click="switchTheme"></v-btn>
</template>

<script setup>
import { computed } from 'vue'
import { useTheme } from 'vuetify'
import storage from '@/composables/useStorage'
import LightIcon from '@/assets/images/icons/Light.svg';
import DarkIcon from '@/assets/images/icons/Dark.svg';

const { global } = useTheme()
const icon = computed(() => (global.current.value.dark ? LightIcon : DarkIcon ))

function switchTheme() {
    global.name.value = global.current.value.dark ? 'light' : 'dark'
    storage.set('mode', global.name.value)
}
</script>


<style lang="scss" scoped>
@import './../../assets/sass/globals/_global-variables.scss';


.v-switch {
    --v-input-control-height: $theme-switch-control-height;
    width: $theme-switch-control-width;
    overflow: hidden;
    border-radius: 999px;
}

.v-switch::v-deep {
    .v-selection-control--density-default {
        --v-selection-control-size: $theme-switch-control-height;
        width: 100%;
        border-radius: 999px;
    }

    .v-switch__track {
        height: $theme-switch-track-height ;
        width: 100%;
        padding: 0;
    }

    .v-selection-control__wrapper {
        width: 100%;
        border-radius: 999px;
    }

    .v-selection-control {
        .v-selection-control__input {
            transform: translateX(-15px);
        }
    }

    .v-selection-control.v-selection-control--dirty {
        .v-selection-control__input {
            transform: translateX(15px);
        }
    }

    .v-selection-control__input {
        width: $theme-switch-control-input-size;
        height: $theme-switch-control-input-size;
    }

    .v-switch__thumb {
        height: $theme-switch-control-input-size;
        width: $theme-switch-control-input-size;
    }

    .v-icon {
        --v-icon-size-multiplier: 1.7;
    }

}
</style>
