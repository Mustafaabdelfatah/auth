export const main = [
    {
        name: 'main-page',
        path: '/',
        meta: {
            requiresAuth: true,
            is_searchable: true,
            name: 'dl.dashboard'
        },
        component: () => import('@/views/main/index.vue')
    }
]
