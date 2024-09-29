<template>
    <div class="text-center position-relative">
        <div v-if="addButton">
            <Teleport to="#teleportedHeader" v-if="isRendered">
                <AddBtn @click="openAsideDialog">
                    <slot name="open-dialog-btn"></slot>
                </AddBtn>
            </Teleport>
        </div>

        <v-dialog scrollable v-model="dialog" max-width="42rem" height="100%" location="left"
            transition="dialog-left-transition">
            <GeneralCard class="align-start justify-space-between pa-0">
                <v-card-title class="w-100 pa-0">
                    <div class="_card-header d-flex align-center justify-space-between w-100">
                        <slot name="title"></slot>
                        <v-btn class="close-btn" @click="dialog = false" :icon="close" variant="text"></v-btn>
                    </div>
                </v-card-title>
                <v-card-text class="card-padding w-100">
                    <slot name="content"></slot>
                </v-card-text>
                <v-card-actions v-if="$slots.actions" class="d-flex align-center justify-end w-100 shadow">
                    <slot name="actions"></slot>
                </v-card-actions>
            </GeneralCard>
        </v-dialog>
    </div>
</template>

<script setup>
import GeneralCard from './../Cards/GeneralCard.vue'
import close from '@/assets/images/svg/close.svg'
import AddBtn from '@/components/common/buttons/AddBtn.vue'
import { inject, provide, ref, defineProps, defineEmits, computed, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore();
import { useTaskLogics } from '@/stores/task-logics'
const taskLogics = useTaskLogics();
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const dialog = defineModel()

const isRendered = ref(false)

const props = defineProps({
    DialogType: {
        type: String,
        default: 'add',
    },
    addButton: {
        type: Boolean,
        default: false,
    },
    schema: Array
});


const currentDialog = computed(() => {
    return props.DialogType == 'confirm' ? confirm : unconfirm;
});

const openAsideDialog = () => {
    taskLogics.parentID = null
    appStore.cardLoading = false
    appStore.isCreate = true
    dialog.value = true
};

onMounted(() => {
    isRendered.value = true
});



</script>

<style lang="scss" scoped>
.v-card::v-deep {
    // padding: 3.125rem 2rem 2rem 2rem;
    border-radius: 0 !important;

    ._card-header {
        padding: 2.25rem 2.25rem 0 2.25rem;
        margin-bottom: 1rem;
    }

    ._card-title {
        font-size: 1rem;
        font-weight: 600;
        line-height: 130%;
    }

    .shadow {
        padding-block: 1.3rem !important;
        padding-inline: 2.25rem !important;
        justify-content: flex-end !important;
        box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    }


    .card-padding {
        padding-inline: 2.25rem !important;
        padding-bottom: 1.3rem !important;
    }
}


::v-deep {
    .v-overlay__content {
        margin: 0 !important;
        left: 0;
        max-height: calc(100%);
    }
}

.close-btn.v-btn--icon::v-deep {
    max-width: 1.5rem;
    max-height: 1.5rem;


    .v-icon {
        --v-icon-size-multiplier: .9;
    }
}

;
</style>

<style lang="scss">
.v-overlay__scrim {
    opacity: var(--v-overlay-opacity, .5);
}

.actions-shadow {
    padding-block: 1.5rem !important;
    padding-inline: 2.25rem !important;
    justify-content: flex-end !important;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: rgba(var(--v-theme-white), 1);
    // box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
    box-shadow: 0px 5px 40px 0px rgba(0, 0, 0,0.10);
}
</style>
