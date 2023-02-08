
import React from 'react';
import { notification, RadioGroup, Selector } from '../../components/primitives';
import { useField, useInterval, useNetwork, useOrder, useProfiles, useResponsiveBreakpoints } from '../../hooks'
import { useForm } from '../../components/Form';
import { JoinGroupsForm, InteractionForm, PublicationForm, ShareGroupsForm, ReportsForm, AvailableMessage, FollowForm, DirectForm } from './components';
import { constants } from '../../utilities';
import OrderFactory from './application'
import { useEffect } from 'react';
import { Row } from 'antd';

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
    const { sm } = useResponsiveBreakpoints()

    const networkRadio = useField({ defaultValue: defaults.network })
    const variantRadio = useField({ defaultValue: defaults.variant })

    useInterval(() => order?._id && getDirectOrder(), 5)

    useEffect(() => order?.options.direct === true && variantRadio.onChange('direct'), [order])

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
                    getDirectOrder()
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
        if (value.target?.value === 'direct' || value === 'direct') {
            getDirectOrder()
        }
        variantRadio.onChange(value)
    }

    const onNetworkChange = (value) => {
        resetLocalOrder()
        form.resetFields()
        getAvailableProfiles(value.target?.value || value)
        if(!constants.ORDER_VARIANTS[value.target?.value || value].find(({ name }) => name === variantRadio.value)) {
            variantRadio.onChange('interaction')
        }
        networkRadio.onChange(value)
    }
    const onError = (error, description) => notification.error(error, description)

    return (
        <>
            {sm ?
                <Row justify='space-around' style={{ marginBottom: '1rem' }}>
                    <Selector
                        data={networks}
                        onChange={onNetworkChange}
                        value={networkRadio.value}
                        defaultValue={networkRadio.defaultValue}
                        style={{ width: '40%' }}
                    />
                    <Selector
                        data={constants.ORDER_VARIANTS[networkRadio.value]}
                        onChange={onVariantChange}
                        value={variantRadio.value}
                        defaultValue={variantRadio.defaultValue}
                        style={{ width: '40%' }}
                    />
                </Row>
                :
                <>
                    <Row justify='center' style={{ marginBottom: '1rem' }}>
                        <RadioGroup
                            options={networks.map(({ name, label }) => ({ value: name, label }))}
                            type="button"
                            style={{ margin: 'auto' }}
                            onChange={onNetworkChange}
                            value={networkRadio.value}
                            defaultValue={networkRadio.defaultValue}
                        />
                    </Row>
                    <Row justify='center' style={{ marginBottom: '1rem' }}>
                        <RadioGroup
                            options={constants.ORDER_VARIANTS[networkRadio.value].map(({ name, label }) => ({ value: name, label }))}
                            type="button"
                            style={{ margin: 'auto' }}
                            onChange={onVariantChange}
                            value={variantRadio.value}
                            defaultValue={variantRadio.defaultValue}
                        />
                    </Row>
                </>
            }
            <Row justify='center' style={{ marginBottom: '1rem' }}>
                {variantRadio.value !== 'direct' &&
                    <AvailableMessage quantity={profilesCount} />
                }
            </Row>
            <Row justify='center'>
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
                                .then(() => { notification.success('Enviado') })
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
            </Row>
        </>
    );
}

export default NewOrder;
