
import React from 'react';
import { notification, RadioGroup, Selector } from '../../components/primitives';
import { useCustomer, useField, useInterval, useNetwork, useOrder, useProfiles, useResponsiveBreakpoints } from '../../hooks'
import { useForm } from '../../components/Form';
import { JoinGroupsForm, InteractionForm, PublicationForm, ShareGroupsForm, ReportsForm, AvailableMessage, FollowForm, DirectForm } from './components';
import { constants } from '../../utilities';
import { OrderFactory } from './application'
import { useEffect } from 'react';
import { Row } from 'antd';
import { useSearchParams } from 'react-router-dom';

function NewOrder() {
    const defaults = {
        network: 'facebook',
        variant: 'interaction'
    }

    const placeholders = {
        facebook: 'https://www.facebook.com/',
        twitter: 'https://www.twitter.com/',
        instagram: 'https://www.instagram.com/',
        tiktok: 'https://www.tiktok.com/',
        youtube: 'https://www.youtube.com/',
    }
	const [search, setSearch] = useSearchParams()
    const templateId = search.get('templateId')
    
    const {
        order,
        createOrder,
        updateLocalOrder,
        resetLocalOrder,
        getDirectOrder,
        patchDirectOrder,
        completeOrder
    } = useOrder( templateId? 'order' : 'direct', { orderId: templateId })

    const { profilesCount, getAvailableProfiles, profiles } = useProfiles({ type: 'available', network: defaults.network })
    const { networks } = useNetwork()
    const [form] = useForm()
    const { sm } = useResponsiveBreakpoints()
    const { customers } = useCustomer()

    const networkRadio = useField({ defaultValue: defaults.network })
    const variantRadio = useField({ defaultValue: defaults.variant })


    useInterval(() => order?.options.direct === true && getDirectOrder(), 5)

    useEffect(() => {
        if(order?.options.direct === true && order?.network.name){
            networkRadio.onChange(order.network.name)
            variantRadio.onChange('direct')
        }
        if (templateId && order._id) {
            const variant = constants.getOrderVariant(order.network.name, order.variant)
            networkRadio.onChange(order.network.name)
            variantRadio.onChange(variant.name)
            order.customer = order.customerDefault
            getAvailableProfiles(order.network.name, templateId)
        }
        if(customers.length && !order.customer) {
            order.customer = customers[0]._id
        }
        form.setFieldsValue(order)
    },[order, customers])

    useEffect(() => {
        getAvailableProfiles(order.network.name, templateId ? templateId : null, form.getFieldValue('tags'))
    }, [form.getFieldValue('tags')])
    const onFinishForm = (values) => {
        const variantId = constants.ORDER_VARIANTS[networkRadio.value].find(v => v.name === variantRadio.value).id
        const networkId = networks.find(n => n.name === networkRadio.value)._id
        const createdOrder = {
            ...values,
            variant: variantId,
            network: networkId,
            tags: values.tags?.map(tag => tag.value),
        }
        if(templateId) {
            search.delete('templateId')
            setSearch(search)
        }
        const orderFactory = new OrderFactory(__dirname + '/models')
        createOrder(orderFactory.createNetworkOrder(networkRadio.value, createdOrder))
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

                            disabled={templateId !== null}
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
                            disabled={templateId !== null}
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
                        placeholders={placeholders}
                        maxInteraction={profilesCount}
                        network={networkRadio.value}
                        initialValues={order}
                        onValuesChange={updateLocalOrder}
                        form={form}
                        onFinish={onFinishForm}
                        onError={onError}
                        isTemplate={templateId !== null}
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
                        isTemplate={templateId !== null}
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
                        isTemplate={templateId !== null}
                    />
                }
                {variantRadio.value === 'report' &&
                    <ReportsForm
                        network={networkRadio.value}
                        initialValues={order}
                        onValuesChange={updateLocalOrder}
                        form={form}
                        onFinish={onFinishForm}
                        onError={onError}
                        isTemplate={templateId !== null}
                    />
                }
                {variantRadio.value === 'follow' &&
                    <FollowForm
                        placeholders={placeholders}
                        network={networkRadio.value}
                        initialValues={order}
                        onValuesChange={updateLocalOrder}
                        form={form}
                        onFinish={onFinishForm}
                        onError={onError}
                        isTemplate={templateId !== null}
                    />
                }
                {variantRadio.value === 'direct' &&
                    <DirectForm
                        network={networkRadio.value}
                        initialValues={order}
                        onValuesChange={updateLocalOrder}
                        placeholders={placeholders}
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
