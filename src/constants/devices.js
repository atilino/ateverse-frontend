import constants from '.'

export const tables = {
    COLUMNS: {
        DASHBOARD: [
            {
                title: 'IMEI',
                dataIndex: 'imei',
                key: 'imei',
            },
            {
                title: 'Estado',
                dataIndex: 'status',
                key: 'status',
                render: status => status.name,

            }
        ],
        ACCOUNTS: [
            {
                title: 'Nombre',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Perfiles',
                dataIndex: 'profiles',
                key: 'profiles',
                render: (profile) => profile.length
            },
        ]
    },
    ACTIONS: [
        ...constants.table.ACTION
    ]
}

export const variables = {
    SPANISH_LABELS: {
        orders: 'orden',
        accounts: 'cuenta',
        devices: 'dispositivo',
        users: 'usuario',
        profiles: 'perfil'
    },
    DASHBOARD_TITLE: 'Administrar dispositivos'
}

const initialFields = [
    {
        label: 'IMEI',
        name: 'imei',
        key: 'imei',
        type: 'text',
        rules: [
            {
                required: true,
                message: 'El IMEI es requerido',
            },
        ]
    },
    {
        label: 'Contraseña',
        name: 'password',
        key: 'password',
        type: 'password'
    },
    {
        label: 'Limite de agentes',
        name: 'agentsLimit',
        key: 'agentsLimit',
        type: 'number',
        atributes: {
            min: 0,
            max: 15
        }
    }
]

export const forms = {
    UPDATE_FIELDS: [...initialFields],
    CREATE_FIELDS: [
        ...initialFields,
        {
            label: 'Versión',
            name: 'version',
            key: 'version',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'Versión requerida',
                },
            ]
        },
    ]
}
