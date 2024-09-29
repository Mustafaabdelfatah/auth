<template>
    <v-text-field ref="searchInput" :dirty="true" :placeholder="$t('inputs.nav_search')" :hide-details="false"
        variant="plain" :clearable="false" single-line
        :prepend-inner-icon="searchIcon" v-model="searchQuery" flat>
    </v-text-field>

    <ul class="searchList" v-if="searchQuery != '' && filteredRoutes.length">
        <li v-for="route in filteredRoutes" :key="route.path" @click="changeRoute(route.path)">
            {{ $t(route?.meta?.name) }}
        </li>
    </ul>
</template>
<script setup>
import searchIcon from '@/assets/images/svg/search.svg'
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const searchQuery = ref('')

const router = useRouter()
const allRoutes = router.getRoutes()
const searchableRoutes = allRoutes.filter((route) => route.meta?.is_searchable)
const filteredRoutes = computed(() => {
    if (!searchQuery.value) return searchableRoutes
    return searchableRoutes.filter((route) =>
        t(route?.meta?.name).toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const searchInput = ref(null)

const changeRoute = (path) => {
    router.push({ path: path })
    searchInput.value.blur()
    searchQuery.value = ''
}

const handleKeydown = (event) => {
    if (event.ctrlKey && event.key === '/') {
        searchInput.value.focus()
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
});
</script>

<style lang="scss" scoped>
.searchList {
    position: fixed;
    max-height: 200px;
    z-index: 9999;
    width: 100%;
    overflow: auto;
    background: rgba(var(--v-theme-background), 1);
    top: 54px;
    box-shadow: 1px 21px 31px 1px #eee;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    list-style: none;

    li {
        cursor: pointer;
        color: rgba(var(--v-theme-text), 1);
        transition: 0.4s;
        padding: 0.5rem;

        &:hover {
            color: rgba(var(--v-theme-primary), 1);
        }
    }
}

.v-input {
    display: flex;
    // gap: 0.75rem;
    align-items: center;
    // max-height: 48px;


    ::v-deep {
        .v-input__prepend {
            margin-inline-end: 0;
        }

        .v-field__prepend-inner {
            padding: 0;
            align-items: center;
            padding-inline-end: 10px;
            padding-inline-start: 14px;

            .v-icon {
                --v-icon-size-multiplier: 1;
                align-items: center;
                display: inline-flex;
                font-feature-settings: "liga";
                height: 20px;
                justify-content: center;
                letter-spacing: normal;
                line-height: 1;
                position: relative;
                text-indent: 0;
                text-align: center;
                user-select: none;
                vertical-align: middle;
                width: 20px;
                min-width: 20px;
                opacity: 1;
            }

            .svg {
                // width: 20px;
                // height: 20px;
                // font-size: 20px;
            }
        }

        .v-input__control {
            width: 100%;
            max-width: 22rem;
            background-color: rgba(var(--v-theme-white), 1);
            border: 1px solid rgba(var(--v-theme-white), 1);
            border-radius: 10px;
            // padding: 8px 16px 8px 8px;
            // max-height: 48px;

        }

        .v-field {
            // --v-theme-overlay-multiplier: 1;
            font-size: .875rem;
            font-weight: 400;
            line-height: 160%;
        }
    }
}


::v-deep {
    .v-input__prepend {
        padding-top: 0 !important;
    }

    .v-field__input {
        padding: 0;
        min-height: 2.3rem;

        &::placeholder {
            color: rgba(var(--v-theme-text), 1);
        }
    }
}
</style>
