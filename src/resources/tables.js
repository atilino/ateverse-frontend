import React from "react"
import { accountsStatus, activityLevel, days, variants } from "./variables"
import { love, care, haha, like, angry, wow, sad } from '../assets/img/icons'
import { Tag } from "antd"
import { Link } from "react-router-dom"
import { formatDate } from '../libs/utils'

const reactionIcons = [like, love, care, haha, wow, sad, angry]

export const titles = {
    orders: 'Estado de ordernes',
    accounts: 'Administrar cuentas',
    devices: 'Administrar dispositivos',
    users: 'Administrar usuarios',
    profiles: 'Administrar perfiles de cuentas',
}
export const columns = {
    orders: [
        {
            title: 'Red',
            dataIndex: 'network',
            key: 'network',
            render: network => network.label
        },
        {
            title: 'Tipo de orden',
            dataIndex: 'variant',
            key: 'variant',
            render: variantIndex => variants[variantIndex]
        },
        {
            title: 'Reacciones',
            dataIndex: 'reactions',
            key: 'reactions',
            render: (text, record) => `${record.executed?.reactions}/${text}`,
            align: 'center',
            responsive: ['md'],
        },
        {
            title: 'Tipo de reacción',
            dataIndex: 'type',
            key: 'type',
            render: type => (
            <div style={{textAlign: 'center'}}>
                <img style={{ width: "30px" }} src={reactionIcons[type]} />
            </div>
            ),
            responsive: ['md'],
        },
        {
            title: 'Comentarios',
            dataIndex: 'comments',
            key: 'comments',
            render: (text, record) => `${record.executed?.comments.length}/${text}`,
            align: 'center',
            responsive: ['md'],
        },
        {
            title: 'Compartidos',
            dataIndex: 'shares',
            key: 'shares',
            render: (text, record) => `${record.executed?.shares}/${text}`,
            align: 'center',
            responsive: ['md'],
        },
        {
            title: "Estado",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Fecha de entrega",
            dataIndex: "deliveryTime",
            key: "deliveryTime",
            render: date => date === null ? 'No calculada' : formatDate(date, "dateTime")
        },
    ],
    accounts: [
        {
            title: 'Dispositivo asignado',
            dataIndex: 'deviceId',
            key: 'deviceId',
            render: deviceId => deviceId ? deviceId.imei : 'No asignado',
            responsive: ['md'],
        },
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',
            key: 'phone',
            responsive: ['md'],
        },
        {
            title: 'Perfiles',
            dataIndex: 'profiles',
            key: 'profiles',
            align: "center",
            render: (profiles, record) => <Link to={`/accounts/${record._id}/profile`}>{profiles && profiles.length}</Link>,
        }
    ],
    devices: [
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
    users: [
        {
            title: 'Usuario',
            dataIndex: 'username',
            key: 'username',
            responsive: ['md'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: "Roles",
            dataIndex: "roles",
            key: "roles",
            render: roles => (
                <>
                    {roles.map(role => (
                        <Tag color="blue" key={role.name}>
                            {role.name}
                        </Tag>
                    ))}
                </>
            ),
            responsive: ['md'],
        }
    ],

    deviceAccounts: [
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
    ],
    personality: [
        {
            title: 'Red prioritaria',
            dataIndex: 'networkPriority',
            key: 'networkPriority',
            render: network => network.label
        },
        {
            title: 'Nivel de actividad',
            dataIndex: 'activityLevel',
            key: 'activityLevel',
            render: level => activityLevel[level]
        },
        {
            title: 'Horas de actividad',
            dataIndex: 'activityHours',
            key: 'activityHours',
            render: activityHours => activityHours.map(hour => hour + ', ')
        },
        {
            title: 'Dias de actividad',
            dataIndex: 'activityDays',
            key: 'activityDays',
            render: activityDays => activityDays.map(day => days[day] + ', ')
        },
        {
            title: 'Intereses',
            dataIndex: 'interests',
            key: 'interests',
            render: interests => interests.map(interest => interest.label + ', ')
        }
    ],
    profiles: [
        {
            title: 'Red social',
            dataIndex: 'network',
            key: 'network',
            render: network => network?.name
        },
        {
            title: 'Nombre',
            dataIndex: 'accountId',
            key: 'accountId',
            responsive: ['md'],
            render: account => account?.name || 'No existe'
        },
        {
            title: 'Usuario',
            dataIndex: 'username',
            key: 'username',
            responsive: ['md'],
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Contraseña',
            dataIndex: 'password',
            key: 'password',
            responsive: ['md'],
        }
    ],
    networks: [
        {
            title: 'Nombre',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Etiqueta',
            dataIndex: 'name',
            key: 'name',
        },
    ],
    personalityTemplates: [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Descripción',
            dataIndex: 'description',
            key: 'description',
        },
    ]
}
export const actions = {
    orders: [
        {
            title: 'Ver más',
            dataIndex: 'more',
            key: 'more',
        },
    ],
    accounts: [
        {
            title: 'Actualizar',
            dataIndex: 'update',
            key: 'update',
        },
        {
            title: 'Eliminar',
            dataIndex: 'delete',
            key: 'delete',
        },
        {
            title: 'Cambiar dispositivo',
            dataIndex: 'changeDevice',
            key: 'changeDevice',
        },
    ],
    devices: [
        {
            title: 'Actualizar',
            dataIndex: 'update',
            key: 'update',
        },
        {
            title: 'Eliminar',
            dataIndex: 'delete',
            key: 'delete',
        },
    ],
    users: [
        {
            title: 'Actualizar',
            dataIndex: 'update',
            key: 'update',
        },
        {
            title: 'Eliminar',
            dataIndex: 'delete',
            key: 'delete',
        },
    ],
    profiles: [
        {
            title: 'Actualizar',
            dataIndex: 'update',
            key: 'update',
        },
        {
            title: 'Eliminar',
            dataIndex: 'delete',
            key: 'delete',
        },
    ],
    deleteAndUpdate: [
        {
            title: 'Actualizar',
            dataIndex: 'update',
            key: 'update',
        },
        {
            title: 'Eliminar',
            dataIndex: 'delete',
            key: 'delete',
        },
    ],
    networks: [
        {
            title: 'Actualizar',
            dataIndex: 'update',
            key: 'update',
        },
        // {
        //     title: 'Eliminar',
        //     dataIndex: 'delete',
        //     key: 'delete',
        // },
    ],
}

