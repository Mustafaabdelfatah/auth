export const templates = [
    {
        name: 'templates',
        path: '/templates',
        meta: {
            requiresAuth: true,
            is_searchable: true,
            name: 'dl.templates'
        },
        component: () => import('@/views/templates/index.vue')
    }
]
