
import React from 'react';
import { notification, RadioGroup } from '../../../components/primitives';
import { useField, useNetwork, useOrder, useProfiles } from '../../../hooks'
import { useForm } from '../../../components/Form';
import { JoinGroupsForm, InteractionForm, PublicationForm, ShareGroupsForm, ReportsForm, AvailableMessage } from '../components';
import { constants } from 'utilities/index';
import OrderFactory from '../application'

function CreateOrder() {
    const defaults = {
        network: 'facebook',
        variant: 'interaction'
    }

    const { order, createOrder, updateLocalOrder, resetLocalOrder } = useOrder()
    const { profilesCount, getAvailableProfiles, profiles } = useProfiles({ type: 'available', network: defaults.network })
    const { networks } = useNetwork()
    const [form] = useForm()

    const variantRadio = useField({ type: "radio", defaultValue: defaults.variant })
    const networkRadio = useField({ type: "radio", defaultValue: defaults.network })

    const onFinishForm = (values) => {
        const variantId = constants.ORDER_VARIANTS[networkRadio.value].find(v => v.name === variantRadio.value).id
        const networkId = networks.find(n => n.name === networkRadio.value)._id
        const createdOrder = {
            ...values,
            variant: variantId,
            network: networkId
        }
        createOrder(new OrderFactory().createNetworkOrder(networkRadio.value, createdOrder))
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

    const onNetworkChange = (value) => {
        resetLocalOrder()
        form.resetFields()
        getAvailableProfiles(value.target.value)
        networkRadio.onChange(value)
    }
    const onError = (error, description) => notification.error(error, description)

    return (
        <div style={{ justifyContent: 'center' }}>
            <div style={{ display: 'flex', margin: '20px' }}>
                <RadioGroup
                    options={networks.map(({ name, label }) => ({ value: name, label }))}
                    type="button"
                    style={{ margin: 'auto' }}
                    onChange={onNetworkChange}
                    value={networkRadio.value}
                />
            </div>
            <div style={{ display: 'flex', margin: '20px' }}>
                <RadioGroup
                    options={constants.ORDER_VARIANTS[networkRadio.value].map(({ name, label }) => ({ value: name, label }))}
                    type="button"
                    style={{ margin: 'auto' }}
                    onChange={onVariantChange}
                    value={variantRadio.value}
                />
            </div>
            <div style={{ textAlign: "center", margin: "15px 0" }}>
                <AvailableMessage quantity={profilesCount} />
            </div>

            {variantRadio.value === 'interaction' &&
                <InteractionForm
                    maxInteraction={profilesCount}
                    network={networkRadio.value}
                    initialValues={order}
                    onValuesChange={updateLocalOrder}
                    form={form}
                    onFinish={onFinishForm}
                    onError={onError}
                />
            }
            {variantRadio.value === 'join-groups' &&
                <JoinGroupsForm
                    initialValues={order}
                    onValuesChange={updateLocalOrder}
                    form={form}
                    onFinish={onFinishForm}
                    onError={onError}
                />
            }
            {variantRadio.value === 'publication' &&
                <PublicationForm
                    maxPublications={profilesCount}
                    initialValues={order}
                    onValuesChange={updateLocalOrder}
                    form={form}
                    onFinish={onFinishForm}
                    onError={onError}
                />
            }
            {variantRadio.value === 'share-groups' &&
                <ShareGroupsForm
                    profiles={profiles}
                    initialValues={order}
                    onValuesChange={updateLocalOrder}
                    form={form}
                    onFinish={onFinishForm}
                    onError={onError}
                />
            }
            {variantRadio.value === 'report' &&
                <ReportsForm
                    initialValues={order}
                    onValuesChange={updateLocalOrder}
                    form={form}
                    onFinish={onFinishForm}
                    onError={onError}
                />
            }
        </div>
    );
}

export default CreateOrder;
