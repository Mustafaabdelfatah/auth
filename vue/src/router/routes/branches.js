export const branches = [
    {
        name: 'branches',
        path: '/branches',
        meta: {
            is_searchable: true,
            requiresAuth: true,
            name: 'dl.branches'
        },
        component: () => import('@/views/branches/index.vue')
    }
]
