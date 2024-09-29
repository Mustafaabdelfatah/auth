export const links = [
    { name: 'main', type: 'label', to: '/' },
    {
        to: '/',
        name: 'dashboard',
    },
    {
        to: '/employees',
        name: 'employees',
    },
    { name: 'data_entry', type: 'label', to: '/' },
    {
        to: '/branches',
        name: 'branches',
    },
    {
        to: '/sectors',
        name: 'sectors',
    },
    {
        to: '/departments',
        name: 'departments',
    },
    {
        to: '/positions',
        name: 'positions',
    },
    {
        to: '/templates',
        name: 'templates',
    },
    {
        to: '/scenarios/all-scenarios',
        name: 'scenarios',
    },
    // {
    //     to: '/users',
    //     name: 'users',
    // },
    { name: 'settings', type: 'label', to: '/' },
    {
        to: '/settings',
        name: 'settings',
        children: [
            {
                to: '/settings/general-settings',
                name: 'general',
            },

            {
                to: '/settings/logs',
                name: 'Logs',
            },
            {
                to: '/settings/roles',
                name: 'rolespermissions',
            }
        ]
    }
]
