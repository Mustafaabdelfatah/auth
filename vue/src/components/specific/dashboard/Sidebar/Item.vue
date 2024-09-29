<template>
    <v-list-item :value="link.name" :to="link.to" active-class="list-item-active" exact class rounded>
        <template #prepend>
            <img :src="getIconComponent(link.name)" alt="" />
        </template>
        <span v-show="isRail">{{ t(`dl.${link.name}`) }}</span>
        <template v-if="link.badge" #append>
            <v-badge :content="link.badge" color="red" />
        </template>
    </v-list-item>
</template>

<script setup>
import dashboard from '@/assets/images/svg/Home-simple-door.svg?row'
import users from '@/assets/images/svg/users.svg?row'
import departments from '@/assets/images/svg/departments.svg?row'
import employees from '@/assets/images/svg/employees.svg?row'
import sectors from '@/assets/images/svg/sectors.svg?row'
import branches from '@/assets/images/svg/branch.svg?row'
import positions from '@/assets/images/svg/position.svg?row'
import scenarios from '@/assets/images/svg/scenarios.svg?row'
import templates from '@/assets/images/svg/templates.svg?row'
import { useI18n } from 'vue-i18n'

defineProps({ link: Object, isRail: Boolean })

const { t } = useI18n()

const iconComponents = {
    dashboard,
    sectors,
    departments,
    employees,
    branches,
    positions,
    scenarios,
    templates,
    users
}

const getIconComponent = (name) => {
    // Assuming 'name' matches the imported component names
    return iconComponents[name] || null
};
</script>

<style lang="scss" scoped>
// .sub_link {
//   font-size: 14px;
// }

// .v-list-item {
//   font-weight: 500;
//   font-size: medium;
//   border-radius: 6px !important;
//   transition: 0.4s;
//   color: rgba(var(--v-theme-sideItem), 1);
//   img {
//     transition: 0.4s;
//     filter: brightness(0) saturate(100%) invert(44%) sepia(13%) saturate(447%) hue-rotate(213deg)
//       brightness(92%) contrast(88%);
//   }
// }
// .list-item-active {
//   color: rgba(var(--v-theme-white), 1);
//   border-inline-start: 2px solid red;
//   ::v-deep {
//     .v-list-item__overlay {
//       opacity: 1;
//     }
//     .v-list-item__content {
//       z-index: 99;
//       color: rgba(var(--v-theme-white), 1);
//     }
//   }
//   img {
//     filter: brightness(0) invert(1);
//   }
// }
</style>
