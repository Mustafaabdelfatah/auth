<template>
    <Teleport to="#teleportedHeader" v-if="isRendered">
        <AddBtn @click.stop="sideDrawer =!sideDrawer">
            {{ buttonsText }}
        </AddBtn>
    </Teleport>

    <Teleport to="#drawers" v-if="isRendered">
        <v-navigation-drawer tag="div" floating isStuck v-model="sideDrawer" :temporary="true" permanent location="end" :scrim="false" :absolute="true" :disable-resize-watcher="true">
            <v-list :items="items"></v-list>
        </v-navigation-drawer>
    </Teleport>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed, onMounted } from 'vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
    buttonsText: {
        type: String,
    },
})

import AddBtn from '@/components/common/buttons/AddBtn.vue'

const sideDrawer = ref(false)
const isRendered = ref(false)

onMounted(() => {
    isRendered.value = true
});


</script>

<style lang="scss" scoped>
.v-navigation-drawer {
    position: relative;
}
</style>
