
import React, { useEffect } from 'react';
import { notification, RadioGroup } from '../../components/primitives';
import { useField, useNetwork, useOrder, useProfiles } from '../../hooks'
import { useForm } from '../../components/Form';
import { JoinGroupsForm, InteractionForm, PublicationForm, ShareGroupsForm, ReportsForm, AvailableMessage, FollowForm, DirectForm } from './components';
import { constants, polling } from '../../utilities';
import OrderFactory from './application'

function NewOrder() {
    const defaults = {
        network: 'facebook',
        variant: 'interaction'
    }

    const {
        order,
        createOrder,
        updateLocalOrder,
        resetLocalOrder,
        getDirectOrder,
        patchDirectOrder,
        completeOrder
    } = useOrder('direct')

    const { profilesCount, getAvailableProfiles, profiles } = useProfiles({ type: 'available', network: defaults.network })
    const { networks } = useNetwork()
    const [form] = useForm()

    const directPolling = polling(5, getDirectOrder)

    const networkRadio = useField({ defaultValue: defaults.network })
    const variantRadio = useField({ defaultValue: defaults.variant })

    useEffect(async () => {
        await getDirectOrder()
            .then(directOrder => {
                if(directOrder[0]._id){
                    directPolling.start()
                    variantRadio.onChange('direct')
                }
            })
    }, [])

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
                if (variantRadio.value === 'direct') {
                    directPolling.start()
                    return
                }
                notification.success('Orden creada con exito')
                resetLocalOrder()
                form.resetFields()
            })
            .catch(error => {
                notification.createError(error.body)
            })
    }

    const onVariantChange = async (value) => {
        resetLocalOrder()
        form.resetFields()
        if (value.target.value === 'direct') {
            await getDirectOrder()
        }
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
                    defaultValue={networkRadio.defaultValue}
                />
            </div>
            <div style={{ display: 'flex', margin: '20px' }}>
                <RadioGroup
                    options={constants.ORDER_VARIANTS[networkRadio.value].map(({ name, label }) => ({ value: name, label }))}
                    type="button"
                    style={{ margin: 'auto' }}
                    onChange={onVariantChange}
                    value={variantRadio.value}
                    defaultValue={variantRadio.defaultValue}
                />
            </div>
            <div style={{ textAlign: "center", margin: "15px 0" }}>
                {variantRadio.value !== 'direct' &&
                    <AvailableMessage quantity={profilesCount} />
                }
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
            {variantRadio.value === 'follow' &&
                <FollowForm
                    network={networkRadio.value}
                    initialValues={order}
                    onValuesChange={updateLocalOrder}
                    form={form}
                    onFinish={onFinishForm}
                    onError={onError}
                />
            }
            {variantRadio.value === 'direct' &&
                <DirectForm
                    network={networkRadio.value}
                    initialValues={order}
                    onValuesChange={updateLocalOrder}
                    form={form}
                    onStart={onFinishForm}
                    onDirect={(values) => {
                        patchDirectOrder(order._id, values)
                            .then(() => {notification.success('Enviado')})
                            .catch(error => notification.createError(error.body))
                    }}
                    onComplete={() => {
                        completeOrder(order._id)
                            .then(() => {
                                directPolling.stop()
                                notification.success('Orden finalizada con exito')
                                form.resetFields()
                            })
                            .catch(error => notification.createError(error.body))
                    }}
                    onError={onError}
                    order={order}
                />
            }
        </div>
    );
}

export default NewOrder;
