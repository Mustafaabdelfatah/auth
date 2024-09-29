export const employees = [
    {
        name: 'employees',
        path: '/employees',
        meta: {
            requiresAuth: true,
            name: 'dl.employees'
        },
        children: [
            {
                name: 'showAll',
                path: '',
                component: () => import('@/views/employees/index.vue'),
                meta: {
                    is_searchable: true,
                    name: 'dl.employees'
                }
            },
            {
                name: 'show',
                path: ':id',
                params: true,
                component: () => import('@/views/employees/show.vue'),
                meta: {
                    // is_searchable: true,
                    name: 'dl.employee'
                }
            },
            {
                name: 'create',
                path: 'create',
                component: () => import('@/views/employees/create.vue'),
                meta: {
                    is_searchable: true,
                    name: 'buttons.add_new_employee'
                }
            },
            {
                name: 'edit',
                path: 'edit/:id',
                params: true,
                component: () => import('@/views/employees/edit.vue'),
                meta: {
                    name: 'buttons.edit_new_employee'
                }
            }
        ]
    }
]


