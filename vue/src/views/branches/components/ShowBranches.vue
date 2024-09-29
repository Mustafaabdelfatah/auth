<template>
    <v-row class="v-row-g-2" no-gutters>
        <v-col cols="12" lg="4" xl="3"  v-for="branch in branches">
            <ActionsCard :title="branch.translation_name" :text="branch.translation_description">
                <EditBtn @click="EditModal(branch)" :btnSize="20" />
                <DeleteBtn @click="DeleteModal(branch)" :btnSize="20" />
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
import { ref, onMounted, computed, defineAsyncComponent } from 'vue'
const ActionsCard = defineAsyncComponent(() => import('@/components/common/Cards/ActionsCard.vue'));
import EditBtn from '@/components/common/buttons/EditBtn.vue'
import DeleteBtn from '@/components/common/buttons/DeleteBtn.vue'
// import { getBranches } from '@/services/apis/branches'
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const dialog = ref(false)

const emit = defineEmits(['OpenEditModal', 'OpenDeleteModal']);

const EditModal = (branch) => {
    emit('OpenEditModal',branch);
};

const DeleteModal = (branch) => {
    emit('OpenDeleteModal',branch);
};

const props = defineProps({
    branches: Array,
    loading: {
        type: Boolean,
    }
});

</script>

