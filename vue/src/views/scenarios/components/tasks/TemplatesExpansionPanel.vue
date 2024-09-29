<template>
    <ExpansionPanel v-model:panels="panels" v-model:openPanel="openPanel">
        <!-- Mail  -->
        <template #title-mailInfo>
            <div class="d-flex align-center ga-3">
                <v-avatar color="primary">
                    <mail />
                </v-avatar>
                <h3 class="text">
                    {{ t('dl.mail-text-template') }}
                </h3>
            </div>
        </template>
        <template #content-mailInfo>
            <TemplatesCards v-model="templateID" :templates="filteredTemplates('mail')" />
        </template>

        <!-- SMS  -->
        <template #title-smsInfo>
            <div class="d-flex align-center ga-3">
                <v-avatar color="primary">
                    <smsTemp />
                </v-avatar>
                <h3 class="text">
                    {{ t('dl.sms-text-template') }}
                </h3>
            </div>
        </template>
        <template #content-smsInfo>
            <TemplatesCards v-model="templateID" :templates="filteredTemplates('sms')" />
        </template>
    </ExpansionPanel>

    <div class="d-flex align-center justify-end ga-3 w-100 pt-5 border-t-thin">
        <v-btn @click="close" class="d-flex border-thin px-5 border-error bg-error" rounded="6px" border="opacity-50"
            height="42">
            {{ t('buttons.cancel') }}
        </v-btn>
        <v-btn @click="next" v-ripple="{ class: `text-secondary` }"
            class="d-flex border-thin px-5 text-white  border-secondary bg-secondary" rounded="6px" border="opacity-50"
            height="42" type="button">
            {{ t('buttons.next') }}
        </v-btn>
    </div>
</template>
<script setup>
import { ref, onMounted, computed, defineEmits, watch } from 'vue'
import smsTemp from '@/assets/images/svg/sms-temp.svg'
import mail from '@/assets/images/svg/mail.svg'
import TemplatesCards from '@/views/scenarios/components/tasks/TemplatesCards.vue'
import ExpansionPanel from '@/components/common/ExpansionPanel/index.vue'
import { getTemplates } from '@/services/apis/templates'
import { useAppStore } from '@/stores/app'
const appStore = useAppStore()
import { useTaskLogics } from '@/stores/task-logics'
const templateStatus = useTaskLogics()


const emit = defineEmits(['next', 'closeModal']);

const next = async () => {
    emit('next')
}

const close = async () => {
    emit('closeModal')
}

import { useI18n } from 'vue-i18n'
const { t } = useI18n();

const panels = ref([
    { id: 1, key: 'mailInfo' },
    { id: 2, key: 'smsInfo' }
])
const openPanel = ref(null)

const templateID = ref(null)
const templates = ref([])

const fetchTemplates = async () => {
    const data = await getTemplates();
    return data
};

const filteredTemplates = (type) => {
    return computed(() =>
        templates.value.filter(template => template.type === type)
    ).value;
};

onMounted(async () => {
    templates.value = await fetchTemplates();
    if(!appStore.isCreate) {
        templateID.value = templateStatus.task['template_id']
    }
});

watch(
    () => templateID.value,
    (newVal) => {
        templateStatus.templateID = newVal
    }
)

watch(
    openPanel,
    (newVal) => {
        console.log('openPanel===>', newVal);
    }
)

</script>
