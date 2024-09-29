<template>
    <section>
        <div class="ps-lg-5 pe-lg-6 d-flex align-center justify-space-between mt-8 mb-7">
            <div>
                <h3 v-if="BreadcrumbItems.length">
                    {{ BreadcrumbItems[BreadcrumbItems.length - 1].title }}
                </h3>
                <v-breadcrumbs density="compact" :items="BreadcrumbItems" color="primary" class="px-0 py-0"
                    v-if="BreadcrumbItems.length > 1">
                    <template v-slot:prepend>
                        <HomeSimpleDoor/>
                    </template>
                    <template v-slot:divider>
                        <v-icon :class="currentLang" icon="mdi-chevron-right"></v-icon>
                    </template>
                </v-breadcrumbs>
            </div>
            <div id="teleportedHeader"></div>
        </div>
    </section>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import HomeSimpleDoor from '@/assets/images/svg/Home-simple-door.svg'
import storage from '@/composables/useStorage'

const lang = ref(storage.get('locale'))

watch(
    () => storage.get('locale'),
    (newVal) => {
        lang.value = newVal
    }
)

const props = defineProps({
    BreadcrumbItems: Array
})

const currentLang = computed(() => lang.value);
</script>

<style lang="scss" scoped>
::v-deep {

    h3 {
        font-size: 1rem;
        font-weight: 600;
        line-height: 130%;
        margin-bottom: .5rem;
    }
    .v-icon.ar {
        transform: rotate(180deg);
    }

    .v-icon.en {
        transform: rotate(0deg);
    }
}

.v-breadcrumbs::v-deep {
    font-size: .875rem;
    font-weight: 500;
    line-height: 1.25rem;

    *:not(:last-child) .v-breadcrumbs-item--link, .v-breadcrumbs-divider{
        color: rgba(var(--v-theme-text), 1);
    }

    .v-breadcrumbs-item--link {
    }

    .v-breadcrumbs__prepend {
        margin-inline-end: .75rem;
    }

    .v-breadcrumbs-item {
        padding: 0;
    }
}

::v-deep {
    .v-breadcrumbs-item--disabled {
        opacity: 1;
    }
}
</style>
