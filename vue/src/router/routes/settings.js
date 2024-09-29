export const settings = [
    {
        name: 'dashboard-settings',
        path: '/settings',
        meta: {
            requiresAuth: true,
            is_searchable: true,
            name: 'dl.settings'
        },
        children: [
            {
                name: 'general-settings',
                path: 'general-settings',
                component: () => import('@/views/settings/GeneralSettings.vue'),
                meta: {
                    name: 'settings.general',
                    is_searchable: true,
                    permissions: ['general-settings-TEST']
                }
            },
            {
                name: 'logs',
                path: 'logs',
                component: () => import('@/views/settings/LogsSettings.vue'),
                meta: {
                    is_searchable: true,
                    name: 'dl.Logs'
                }
            },
            {
                name: 'roles',
                path: 'roles',
                component: () => import('@/views/settings/RolesSettings.vue'),
                meta: {
                    is_searchable: true,
                    name: 'dl.roles'
                }
            }
        ]
    }
]
