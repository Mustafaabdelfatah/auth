export const sectors = [
    {
        name: 'sectors',
        path: '/sectors',
        meta: {
            requiresAuth: true,
            is_searchable: true,
            name: 'dl.sectors'
        },
        component: () => import('@/views/sectors/index.vue')
    }
]
