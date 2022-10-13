import { Form, Divider, Select } from 'antd';
import React from 'react';
import { Selector } from '../primitives'
import useNetwork from '../../hooks/useNetwork'

function PersonalityForm({
    title = 'Personalidad',
    dataSource = {
        days: [],
        hours: [],
        levels: [],
        interests: [],
        priorityNetwork: [],
    } }) {
    
    const { networks } = useNetwork()
    const hours = [
        {
            value: 0,
            label: '12 AM'
        },
        {
            value: 1,
            label: '1 AM'
        },
        {
            value: 2,
            label: '2 AM'
        },
        {
            value: 3,
            label: '3 AM'
        },
        {
            value: 4,
            label: '4 AM'
        },
        {
            value: 5,
            label: '5 AM'
        },
        {
            value: 6,
            label: '6 AM'
        },
        {
            value: 7,
            label: '7 AM'
        },
        {
            value: 8,
            label: '8 AM'
        },
        {
            value: 9,
            label: '9 AM'
        },
        {
            value: 10,
            label: '10 AM'
        },
        {
            value: 11,
            label: '11 AM'
        },
        {
            value: 12,
            label: '12 PM'
        },
        {
            value: 13,
            label: '1 PM'
        },
        {
            value: 14,
            label: '2 PM'
        },
        {
            value: 15,
            label: '3 PM'
        },
        {
            value: 16,
            label: '4 PM'
        },
        {
            value: 17,
            label: '5 PM'
        },
        {
            value: 18,
            label: '6 PM'
        },
        {
            value: 19,
            label: '7 PM'
        },
        {
            value: 20,
            label: '8 PM'
        },
        {
            value: 21,
            label: '9 PM'
        },
        {
            value: 22,
            label: '10 PM'
        },
        {
            value: 23,
            label: '11 PM'
        },
    ]
    const days = [
        {
            value: 0,
            label: 'Lunes'
        },
        {
            value: 1,
            label: 'Martes'
        },
        {
            value: 2,
            label: 'Miercoles'
        },
        {
            value: 3,
            label: 'Jueves'
        },
        {
            value: 4,
            label: 'Viernes'
        },
        {
            value: 5,
            label: 'Sabado'
        },
        {
            value: 6,
            label: 'Domingo'
        },
    ]
    const levels = [
        {
            label: "Introvertido",
            value: 0,
        },
        {
            label: "Extrovertido",
            value: 1,
        },
    ]

    dataSource = {
        ...dataSource,
        levels,
        days,
        hours,
        priorityNetwork: networks
    }
    return (
        <>
            {title &&
                <>
                    <Divider />
                    <h3>{title}</h3>
                    <Divider />
                </>
            }
            <Form.Item
                label="Red social prioritaria"
                key='networkPriority'
                name='networkPriority'
                rules={[
                    {
                        required: true,
                        message: 'La red social es requerida',
                    },
                ]}
            >
                <Selector
                    placeholder="Seleccionar red social"
                    style={{ width: '100%' }}
                    config={{ label: "label", value: "_id" }}
                    data={dataSource.priorityNetwork}
                />
            </Form.Item>
            <Form.Item
                label="Nivel de actividad"
                name="activityLevel"
                key="activityLevel"
            >
                <Select
                    placeholder="Seleccionar nivel"
                    style={{ width: '100%' }}
                    options={dataSource.levels}
                />
            </Form.Item>
            <Form.Item
                label="Horas de actividad"
                name="activityHours"
                key="activityHours"
            >
                <Select
                    mode="multiple"
                    placeholder="Seleccionar horas"
                    style={{ width: '100%' }}
                    options={dataSource.hours}
                    maxTagCount='responsive'
                    rules={{
                        type: 'array',
                        max: 3
                    }}
                />
            </Form.Item>
            <Form.Item
                label="Dias de actividad"
                name="activityDays"
                key="activityDays"
            >
                <Select
                    mode="multiple"
                    placeholder="Seleccionar días"
                    style={{ width: '100%' }}
                    options={dataSource.days}
                    maxTagCount='responsive'
                    rules={{
                        type: 'array',
                        max: 3
                    }}
                />
            </Form.Item>
            <Form.Item
                label="Intereses"
                key='interests'
                name='interests'
            >
                <Selector
                    mode="multiple"
                    placeholder="Seleccionar intereses"
                    style={{ width: '100%' }}
                    config={{ label: "label", value: "_id" }}
                    data={dataSource.interests}
                />
            </Form.Item>
            <p style={{ fontSize: '10px' }}>* Los campos que se encuentren vacios seran calculados aleatoriamente</p>
        </>
    );
}

export default PersonalityForm;