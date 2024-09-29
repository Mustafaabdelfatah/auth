<template>
    <v-row class="v-row-g-2" no-gutters>
        <v-col cols="12" lg="4" xl="3" v-for="department in departments">
            <ActionsCard :title="department.translation_name" :text="department.translation_description">
                <EditBtn @click="EditModal(department)" :btnSize="20" />
                <DeleteBtn @click="DeleteModal(department)" :btnSize="20" />
                <template #actions>
                    <v-btn v-ripple="{ class: `text-primary` }" variant="text"
                        class="d-flex w-100 border-thin border-primary" rounded="6px" border="opacity-50" height="42">
                        {{ t('buttons.show_details') }}
                    </v-btn>
                </template>
            </ActionsCard>
        </v-col>
    </v-row>

</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent, defineProps } from 'vue'
const ActionsCard = defineAsyncComponent(() => import('@/components/common/Cards/ActionsCard.vue'));
import EditBtn from '@/components/common/buttons/EditBtn.vue'
import DeleteBtn from '@/components/common/buttons/DeleteBtn.vue'

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const emit = defineEmits(['OpenEditModal', 'OpenDeleteModal']);

const EditModal = (department) => {
    emit('OpenEditModal',department);
};

const DeleteModal = (department) => {
    emit('OpenDeleteModal',department);
};

const props = defineProps({
    departments: Array,
    loading: {
        type: Boolean,
    }
});

</script>

