<template>
    <div class="large-padding">
        <v-row class="mt-5">
            <v-col cols="12" md="6" class="text-center" v-for="(single, index) in data['user.user_attachment_type']"
                :key="single.value">
                <FilesUploader :multiple="false" :singleKey="single.label" v-model="files[single.value]" :class="{'file-uploaded': files[single.value]}"></FilesUploader>
            </v-col>
        </v-row>
    </div>
</template>

<script setup>
// =(Components)=============>
import FilesUploader from '@/components/common/FilesUploader/index.vue'


// =(Data)=================>
const queryEnumsParams = {
    enums: [
        { name: 'user.user_attachment_type' }
    ]
};

// =(Functions)=============>
import { ref, onMounted, computed, defineAsyncComponent, defineProps, defineEmits, watch, reactive } from 'vue';
import { useNumConverter } from '@/composables/useNumConverter.js';
import { updateSchemaValues, transformSchemaToObject } from '@/utils/formDataHandler'
import { getGenerals, getEnumsGenerals } from '@/services/apis/general';

const data = await getEnumsGenerals(queryEnumsParams);

const files = reactive([]);


// =(Emits)=================>
const schemaData = defineModel();


// =(Static Data)==========>


// =(Watchers)============>
watch(
    files,
    (newValue, oldValue) => {
        schemaData.value = newValue
        console.log('oldValue', oldValue);
        console.log('newValue', newValue);
    },
    { deep: true }
);

// =(Hocks)================>
onMounted(() => {
    // getAllSectors();
});


</script>

<style lang="scss" scoped>
.large-padding {
    padding-bottom: 10rem;
}


::v-deep {

    .file-uploaded {
        color: #17B26A;
    }

    .file-title {
        color: rgba(var(--v-theme-on-surface), 1);
        font-size: .875rem;
        font-weight: 400;
        line-height: 1.25rem;
    }

    .file-type {
        &.v-avatar--size-default {
            --v-avatar-height: fit-content;
        }
    }

    .btn-upload {
        padding: .4rem .75rem;
        border: 1px dashed rgba(var(--v-theme-primary), 1);
        color: rgba(var(--v-theme-primary), 1);
        font-size: .875rem;
        font-weight: 400;
        line-height: 1.25rem !important;
        border-radius: .5rem !important;
    }




    .file-size {
        color: rgba(var(--v-theme-text), 1);
        font-size: .625rem;
        font-weight: 400;
        line-height: 1.25rem;
    }

    .v-btn__append {
        margin-inline-start: .875rem;
    }

    .v-btn .v-icon {
        --v-icon-size-multiplier: 1 !important;

        svg {
            transform: scale(1.2);
        }
    }

    .file-uploader {
        padding: .75rem;
        border-radius: .5rem;
        border: 1px solid rgba(var(--v-theme-fileUploaderBorder), .5);
    }
}
</style>
