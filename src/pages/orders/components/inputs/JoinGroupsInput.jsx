import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React from 'react';
import { FormItem, FormList } from '../../../../components/Form';

function JoinGroupsInput() {
    return (
        <FormList name="groups">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'start' }}>
                            <FormItem
                                {...restField}
                                name={[name, 'name']}
                                rules={[{ required: true, message: 'El nombre es requerido' }]}
                                style={{ width: '50%', marginRigth: '2%', marginBottom: '2%' }}
                            >
                                <Input placeholder='Escribe el nombre del grupo...' />
                            </FormItem>
                            <FormItem
                                {...restField}
                                name={[name, 'link']} x
                                rules={[
                                    {
                                        required: true,
                                        message: 'El link es requerido'
                                    },
                                    () => ({
                                        validator(_, value) {
                                            if (value.includes('groups/')) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Ingrese un link válido'));
                                        },
                                    }),
                                ]}
                                style={{ width: '50%', marginLeft: '2%', marginBottom: '2%' }}
                            >
                                <Input placeholder='https://wwww.facebook.com/' />
                            </FormItem>
                            <MinusCircleOutlined style={{ width: 'auto', marginLeft: '1%', marginBottom: '2%'}} onClick={() => remove(name)} />
                        </div>
                    ))}
                    <FormItem>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Añadir grupo
                        </Button>
                    </FormItem>
                </>
            )}
        </FormList>

    );
}

export default JoinGroupsInput;