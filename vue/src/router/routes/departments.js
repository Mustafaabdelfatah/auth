export const departments = [
    {
        name: 'departments',
        path: '/departments',
        meta: {
            requiresAuth: true,
            is_searchable: true,
            name: 'dl.departments'
        },
        component: () => import('@/views/departments/index.vue')
    }
]
