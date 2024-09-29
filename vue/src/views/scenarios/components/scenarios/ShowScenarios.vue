<template>
    <v-row class="v-row-g-2" no-gutters>
        <v-col cols="12" lg="4" xl="3" v-for="scenario in scenarios">
            <ActionsCard :title="scenario.translation_name" :text="scenario.translation_description" :id="scenario.id">
                <v-btn  @click="AssignModal(scenario)" class="link_btn" icon="mdi-link-variant" variant="outlined" size="20"></v-btn>
                <EditBtn @click="EditModal(scenario)" :btnSize="20" />
                <DeleteBtn @click="DeleteModal(scenario)" :btnSize="20" />

                <template #actions>
                    <v-btn @click="seeDetailsAction(scenario.id)" v-ripple="{ class: `text-primary` }" variant="text"
                        class="d-flex w-100 border-thin border-primary" rounded="6px" border="opacity-50" height="42">
                        {{ t('buttons.show_details') }}
                    </v-btn>
                </template>
            </ActionsCard>
        </v-col>
    </v-row>

</template>

<script setup>

const ActionsCard = defineAsyncComponent(() => import('@/components/common/Cards/ActionsCard.vue'));
import EditBtn from '@/components/common/buttons/EditBtn.vue'
import DeleteBtn from '@/components/common/buttons/DeleteBtn.vue'


import { ref, onMounted, computed, defineAsyncComponent, provide } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
import { useAppStore } from '@/stores/app'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()

const dialog = ref(false)

const emit = defineEmits(['OpenEditModal', 'OpenDeleteModal', 'OpenAssignModal']);

const EditModal = (scenario) => {
    emit('OpenEditModal', scenario);
};

const DeleteModal = (scenario) => {
    emit('OpenDeleteModal', scenario);
};

const AssignModal = (scenario) => {
    emit('OpenAssignModal', scenario.id);
};

const props = defineProps({
    scenarios: Array,
    loading: {
        type: Boolean,
    }
});


const seeDetailsAction = (id) => {
    router.push({ name: 'tasks', params: { id: id } });
};

</script>

<style lang="scss" scoped>
.link_btn::v-deep {
    .v-icon {
        --v-icon-size-multiplier: .48 !important;
    }
}
</style>
