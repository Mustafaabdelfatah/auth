import { createRouter, createWebHistory } from 'vue-router'
import permissionsMiddleware from '@/middlewares/permissions'
import { useSettingsStore } from '@/stores/settings'
import { useAuthStore } from '@/stores/auth'

import { useAppStore } from '@/stores/app'
import { useAppSettings } from '@/composables/useAppSettings'
import { watch } from 'vue'

import { auth } from '@/router/routes/auth'
import { main } from '@/router/routes/main'
import { settings } from '@/router/routes/settings'
import { users } from '@/router/routes/users'
import { departments } from '@/router/routes/departments'
import { sectors } from '@/router/routes/sectors'
import { branches } from '@/router/routes/branches'
import { positions } from '@/router/routes/positions'
import { scenarios } from '@/router/routes/scenarios'
import { templates } from '@/router/routes/templates'
import { employees } from '@/router/routes/employees'
import { profile } from '@/router/routes/profile'
import storage from '@/composables/useStorage.js'

const routes = [
    ...auth,
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/layouts/dashboardLayout.vue'),
        meta: {
            requiresAuth: true,
            name_ar: 'dl.dashboard'
        },
        children: [
            ...main,
            ...settings,
            ...users,
            ...departments,
            ...employees,
            ...sectors,
            ...branches,
            ...positions,
            ...scenarios,
            ...templates,
            ...profile
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/layouts/404.vue'),
        meta: {
            name: 'headings.error'
        }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const { updateTitle } = useAppSettings()

router.beforeEach((to, from, next) => {
    const settingsStore = useSettingsStore()
    const authStore = useAuthStore()
    const appStore = useAppStore()

    updateTitle(to, settingsStore, appStore)
    watch(
        () => appStore.locale.current,
        () => {
            updateTitle(to, settingsStore, appStore)
        }
    )

    if (to.meta.requiresAuth && !authStore.isLoggedIn) next({ name: 'login' })
    else next()
})

export default router
