export const scenarios = [
    {
        name: 'scenarios',
        path: '/scenarios',
        meta: {
            requiresAuth: true,
            is_searchable: true,
            name: 'dl.scenarios'
        },
        children: [
            {
                name: 'all-scenarios',
                path: 'all-scenarios',
                component: () => import('@/views/scenarios/index.vue'),
                meta: {
                    is_searchable: true,
                    name: 'dl.scenarios'
                }
            },
            {
                name: 'tasks',
                path: ':id/tasks',
                params: true,
                component: () => import('@/views/scenarios/tasks.vue'),
                meta: {
                    is_searchable: true,
                    name: 'dl.tasks'
                }
            }
        ]
    }
]


