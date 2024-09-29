export const positions = [
    {
        name: 'positions',
        path: '/positions',
        meta: {
            requiresAuth: true,
            is_searchable: true,
            name: 'dl.positions'
        },
        component: () => import('@/views/positions/index.vue')
    }
]
