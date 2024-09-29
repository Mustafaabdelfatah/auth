export const users = [
    {
        name: 'users-list',
        path: '/users',
        meta: {
            requiresAuth: true,
            is_searchable: true,
            name: 'dl.users'
        },
        component: () => import('@/views/users/index.vue')
    }
]
