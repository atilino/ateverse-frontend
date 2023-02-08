import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import React from 'react';
import { FormItem, FormList } from '../../../../components/Form';
import { Selector } from '../../../../components/primitives';

function ShareGroupsInput({ groups, selectedGroups }) {
    return (
        <FormList name="groups">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'start' }}>
                            <FormItem
                                {...restField}
                                name={[name, 'groupId']}
                                rules={[{ required: true, message: 'Se necesita un grupo' }]}
                                style={{ width: '50%', marginRigth: '2%', marginBottom: '2%' }}
                            >
                                <Selector
                                    data={groups}
                                    placeholder="Selecciona un grupo"
                                    config={{ label: 'name', value: '_id' }}
                                    onChange={() => groups}
                                />
                            </FormItem>
                            <FormItem
                                style={{ width: '50%', marginLeft: '2%', marginBottom: '2%' }}
                                {...restField}
                                name={[name, 'comment']}
                            >
                                <Input.TextArea placeholder="Comenta algo..." />
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

export default ShareGroupsInput;