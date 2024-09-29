export const profile = [
    {
        name: 'profile',
        path: '/profile/:id',
        params: true,
        meta: {
            requiresAuth: true,
            name: 'dl.profile'
        },
        component: () => import('@/views/profile/index.vue')
    }
]
