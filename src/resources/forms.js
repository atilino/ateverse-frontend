import { devicesList } from "../libs/dataToSelect"
import { accountsStatus, devicesStatus, networks } from "./variables"

export const forms = {
    accounts: [
        {
            label: 'Nombre',
            name: 'name',
            key: 'name',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'El nombre es requerido',
                },
            ]
        },
        
        {
            label: 'Teléfono',
            name: 'phone',
            key: 'phone',
            type: 'number',
            rules: [
                {
                    required: true,
                    message: 'El teléfono es requerido',
                },
            ]
        },

    ],
    devices: [
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
    ],
    users: [
        {
            label: 'Usuario',
            name: 'username',
            key: 'username',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'El usuario es requerido',
                },
            ]
        },
        {
            label: 'Email',
            name: 'email',
            key: 'email',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'El email es requerido',
                },
            ]
        },
        {
            label: 'Contraseña',
            name: 'password',
            key: 'password',
            type: 'password',
            // rules: [
            //     {
            //         required: true,
            //         message: 'La contraseña es requerida',
            //     },
            // ]
        }
    ],
    networks: [
        {
            label: 'Nombre',
            name: 'label',
            key: 'label',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'El nombre es requerido',
                },
            ]
        },
        {
            label: 'Etiqueta',
            name: 'name',
            key: 'name',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'El label es requerido',
                },
            ]
        },
    ],
    profiles: [
        {
            label: 'Usuario',
            name: 'username',
            key: 'username',
            type: 'text',
        },
        {
            label: 'Email',
            name: 'email',
            key: 'email',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'El email es requerido',
                },
            ]
        },
        {
            label: 'Contraseña',
            name: 'password',
            key: 'password',
            type: 'text',
            // rules: [
            //     {
            //         required: true,
            //         message: 'La contraseña es requerida',
            //     },
            // ]
        },
        {
            label: 'Estado',
            name: 'status',
            key: 'status',
            type: 'select',
            options: accountsStatus,
            atributes: {
                placeholder: 'Selecciona un estado'
            },
        },
    ],
    personalityTemplates: [
        {
            label: 'Nombre',
            name: 'name',
            key: 'name',
            type: 'text',
            rules: [
                {
                    required: true,
                    message: 'El nombre es requerido',
                },
            ]
        },
        {
            label: 'Descripcion',
            name: 'description',
            key: 'description',
            type: 'text'
        },
    ],
}