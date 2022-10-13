import React from 'react';
import { notification, RadioGroup } from '../../components/primitives';
import { variants } from '../../resources/variables';
import useField from '../../hooks/useField'
import useOrder from '../../hooks/useOrder'
import { useForm } from '../../components/Form';
import { JoinGroupsForm, InteractionForm, PublicationForm, ShareGroupsForm, ReportsForm } from './components';

function CreateOrder(props) {
    const variantRadio = useField({ type: "radio", defaultValue: 0 })
    const { order, createOrder, updateLocalOrder, resetLocalOrder } = useOrder()
    const [form] = useForm()

    const onFinishForm = (values) => {
        createOrder({ ...order, ...values, variant: variantRadio.value })
            .then(() => {
                notification.success('Orden creada con exito')
                resetLocalOrder()
            })
            .then(() => form.resetFields())
            .catch(error => {
                notification.createError(error.body)
            })
    }
    const onVariantChange = (value) => {
        resetLocalOrder()
        form.resetFields()
        variantRadio.onChange(value)
    }
    const onError = (error, description) => notification.error(error, description)

    return (
        <div style={{ justifyContent: 'center' }}>
            <div style={{ display: 'flex', margin: '20px' }}>
                <RadioGroup
                    options={variants.map((v, i) => ({ _id: i, name: v }))}
                    type="button"
                    style={{ margin: 'auto' }}
                    onChange={onVariantChange}
                    value={variantRadio.value}
                />

            </div>
            {variantRadio.value === 0 &&
                <InteractionForm
                    initialValues={order}
                    onValuesChange={updateLocalOrder}
                    form={form}
                    value={order}
                    onFinish={onFinishForm}
                    onError={onError}
                />
            }
            {variantRadio.value === 1 &&
                <JoinGroupsForm
                    initialValues={order}
                    onValuesChange={updateLocalOrder}
                    form={form}
                    value={order}
                    onFinish={onFinishForm}
                    onError={onError}
                />
            }
            {variantRadio.value === 2 &&
                <PublicationForm
                    initialValues={order}
                    onValuesChange={updateLocalOrder}
                    form={form}
                    value={order}
                    onFinish={onFinishForm}
                    onError={onError}
                />
            }
            {variantRadio.value === 3 &&
                <ShareGroupsForm
                    initialValues={order}
                    onValuesChange={updateLocalOrder}
                    form={form}
                    value={order}
                    onFinish={onFinishForm}
                    onError={onError}
                />
            }
            {variantRadio.value === 4 &&
                <ReportsForm
                    initialValues={order}
                    onValuesChange={updateLocalOrder}
                    form={form}
                    value={order}
                    onFinish={onFinishForm}
                    onError={onError}
                />
            }
        </div>
    );
}

export default CreateOrder;