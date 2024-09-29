<template>
    <div class="text-center pa-4">
        <div>
            <slot></slot>
        </div>

        <Teleport to="body">
            <v-dialog v-model="dialogModal" max-width="25rem" location="left">
                <GeneralCard class="align-center justify-center">
                    <v-card-item>
                        <component :is="currentDialog"></component>
                    </v-card-item>
                    <v-card-title>
                        <div class="_card-header d-flex flex-column align-center justify-center">
                            <h4 class="confirmation_text">
                                {{ DialogType == 'confirm' ? t('alert.confirm_add') : t('alert.confirm_delete') }}
                            </h4>
                            <h5 class="_card-title">
                                <slot name="title">
                                    {{ title }}
                                </slot>
                            </h5>
                        </div>
                    </v-card-title>
                    <!-- <v-card-text> -->
                    <p v-if="text != null || $slots.text" class="_card-text text-center">
                        <slot name="text">
                            {{ text }}
                        </slot>
                    </p>
                    <!-- </v-card-text> -->
                    <v-card-actions class="d-flex align-center justify-center w-90 mt-5 px-4" :class="MultiActions ? 'w-100' : 'w-85'">
                        <v-row dense>
                            <!-- Button to cancel the action -->
                            <v-col :cols="MultiActions ? 4 : 6">
                                <v-btn @click="dialogModal = false" class="d-flex border-thin w-100" rounded="8px"
                                    border="opacity-50" height="42">
                                    {{ t('buttons.cancel') }}
                                </v-btn>
                            </v-col>

                            <!-- Conditional button for single or multiple actions -->
                            <v-col :cols="MultiActions ? 4 : 6">
                                <v-btn @click="deleteItem" v-ripple="{ class: `text-success` }"
                                    class="d-flex border-thin text-white w-100"
                                    :class="DialogType === 'confirm' ? 'border-success bg-success' : 'border-error bg-error'"
                                    rounded="8px" border="opacity-50" height="42">
                                    <slot name="singleItemsDelete">
                                        {{ t('buttons.delete') }}
                                    </slot>
                                </v-btn>
                            </v-col>

                            <v-col v-if="MultiActions" cols="4">
                                <v-btn @click="deleteItems" v-ripple="{ class: `text-success` }"
                                    class="d-flex border-thin text-white w-100"
                                    :class="DialogType === 'confirm' ? 'border-success bg-success' : 'border-error bg-error'"
                                    rounded="8px" border="opacity-50" height="42">
                                    <slot name="allItemsDelete">
                                        {{ t('buttons.delete') }}
                                    </slot>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-card-actions>
                </GeneralCard>
            </v-dialog>
        </Teleport>
    </div>
</template>

<script setup>
import GeneralCard from '@/components/common/Cards/GeneralCard.vue'
import confirm from '@/assets/images/svg/confirm.svg'
import unconfirm from '@/assets/images/svg/unconfirm.svg'
import AddBtn from '@/components/common/buttons/AddBtn.vue'
import { ref, defineProps, defineEmits, computed, onMounted, watch, useSlots } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

// const slots = useSlots()

const isRendered = ref(false)

const props = defineProps({
    title: {
        type: String,
        default: 'عنوان',
    },
    text: {
        type: String,
    },
    DialogType: {
        type: String,
        default: 'confirm',
    },
    MultiActions: {
        type: Boolean,
        default: false,
    },
});


const dialogModal = defineModel()
const emit = defineEmits(['deleted', 'deletedItems'])

const deleteItem = async () => {
    emit('deleted');
}

const deleteItems = async () => {
    emit('deletedItems');
}


const currentDialog = computed(() => {
    return props.DialogType == 'confirm' ? confirm : unconfirm;
});

onMounted(() => {
    isRendered.value = true
    // console.log('=====>', $slots);

});


</script>

<style lang="scss" scoped>
.v-card::v-deep {
    padding: 1.25rem;
    border-radius: 1rem !important;
}

.v-card-item {
    margin-bottom: .8rem;
}

.confirmation_text {
    font-size: 1rem;
    font-weight: 700;
    line-height: 125%;
    margin-bottom: .5rem;
}

._card-title {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.875rem;
    // margin-bottom: .5rem;
}

._card-text {
    font-size: .875rem;
    font-weight: 400;
    line-height: 150%;
    // margin-bottom: 1.5rem;
    color: rgba(var(--v-theme-text), 1);
}

.v-btn {
    border-radius: .5rem !important;
    font-size: .875rem;
    font-weight: 400;
    line-height: 160%;
    letter-spacing: 0.2px;
}

.w-85 {
    width: 85%;
}
</style>
