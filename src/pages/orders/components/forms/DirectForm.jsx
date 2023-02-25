import React, { useEffect, useState } from 'react';
import { FormButton, FormInput, Button, FormCheckbox, ShareIcon, useForm, FormItem, FormLayout, FormSelect } from '../../../../components';
import { useCustomer, useProfiles, useResponsiveBreakpoints } from '../../../../hooks';
import { Col, Form, List, Row, Tooltip } from 'antd';
import ReactionsInput from '../inputs/ReactionsInput'

function FollowForm({
    network,
    order,
    initialValues,
    onValuesChange,
    form,
    onStart,
    onError,
    onDirect,
    onComplete,
    placeholders
}) {
    const { profilesCount } = useProfiles({ type: 'available', network: 'facebook' })
    const { customers } = useCustomer()
    const { xs } = useResponsiveBreakpoints()
    const [directForm] = useForm()

    const [comments, setComments] = useState([])

    const itemProps = {
        wrapperCol: {
            span: 24
        }
    }

    useEffect(() => {
        loadLastComments()
    }, [order])

    function loadAllComments() {
        return setComments([...order.options.comments].reverse())
    }

    function loadLastComments() {
        const initialIndex = order.options.comments.length <= 5 ? 0 : order.options.comments.length - 5
        const lastComments = order.options.comments.slice(initialIndex, order.options.comments.length)
        return setComments(lastComments.reverse())
    }

    const loadMore =
        comments.length < order.options.comments.length ? (
            <div
                style={{
                    textAlign: 'center',
                    margin: '0 12',
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button style={{ background: 'none', border: 'none', width: '100%' }} onClick={loadAllComments}>Ver más</Button>
            </div>
        ) : comments.length && order.options.comments.length > 5 ?
            <div
                style={{
                    textAlign: 'center',
                    margin: '0 12',
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button style={{ background: 'none', border: 'none', width: '100%' }} onClick={loadLastComments}>Ver menos</Button>
            </div>
            : null

    return (
        <>
            <Form.Provider
                onFormFinish={(name, { values }) => {
                    if (name == 'start-stop') {
                        const orderValues = {
                            customer: values.customer,
                            options: {
                                link: values['options.link'],
                                comments: [],
                                reactions: 0,
                                shares: 0,
                                reactionType: 0
                            }
                        }
                        if (!order.options.direct) {
                            orderValues.options.direct = true
                            return onStart(orderValues)
                        }
                        return onComplete()
                    }

                    if (!values.comment && !values.share && values.reactionType === null) {
                        return onError('Orden vacía', 'Se debe enviar al menos una interacción')
                    }
                    onDirect({
                        comments: [values.comment],
                        shares: values.share ? 1 : 0,
                        reactions: values.reactionType !== null ? 1 : 0,
                        reactionType: values.reactionType
                    })
                    directForm.resetFields()
                }}
            >

                <FormLayout
                    style={{ width: '100%' }}
                    name='start-stop'
                    disabled={profilesCount === 0}
                    form={form}
                    initialValues={{ 'options.link': initialValues.options.link, customer: initialValues.customer?.id || null }}
                    onValuesChange={onValuesChange}
                    noSubmit={true}
                >
                    <Row justify='center'>
                        <Col md={{ span: 14, offset: 2 }} xs={24}>
                            <FormSelect
                                item={itemProps}
                                disabled={order.options.direct || false}
                                label='Cliente'
                                name='customer'
                                data={customers}
                                config={{ label: 'name', value: '_id' }}
                            />
                        </Col>
                    </Row>
                    <Row justify='center'>
                        {!xs &&
                            <Col md={2}>
                                <FormButton
                                    shape='round'
                                    type="primary"
                                    htmlType="submit"
                                    disabled={order.options.direct ? false : profilesCount === 0}
                                    danger={order.options.direct || false}
                                >
                                    {order.options.direct ? 'Finalizar' : 'Iniciar'}
                                </FormButton>
                            </Col>
                        }
                        <Col md={14} xs={24}>
                            <FormInput
                                item={itemProps}
                                label="Link"
                                name="options.link"
                                placeholder={placeholders[network]}
                                rules={order.options.direct ? [] : [
                                    {
                                        pattern: new RegExp(placeholders[network]),
                                        required: true,
                                        message: `El link debe ser de ${network}.`
                                    }
                                ]}
                                disabled={order.options.direct || false}
                            />
                        </Col>
                        {xs &&
                            <Col xs={24}>
                                <FormButton
                                    shape='round'
                                    type="primary"
                                    htmlType="submit"
                                    disabled={order.options.direct ? false : profilesCount === 0}
                                    danger={order.options.direct || false}
                                >
                                    {order.options.direct ? 'Finalizar' : 'Iniciar'}
                                </FormButton>
                            </Col>
                        }
                    </Row>
                </FormLayout>
                {order.options.direct &&
                    <FormLayout
                        style={{ width: '100%' }}
                        name='direct'
                        disabled={profilesCount === 0}
                        form={directForm}
                        onValuesChange={onValuesChange}
                        initialValues={{ comment: null, reactionType: null, share: false }}
                        noSubmit={true}
                    >
                        <Row style={{ margin: '15px' }} justify='center'>
                            <FormItem {...itemProps} name="reactionType">
                                {profilesCount !== 0 &&
                                    <ReactionsInput
                                        type='button'
                                        network={network}
                                        size='small'
                                        name='reactionType'
                                        onReactionClick={(value) => {
                                            directForm.setFields([{ name: 'reactionType', value: Number(value) }])
                                            directForm.submit()
                                        }}
                                    />
                                }
                            </FormItem>
                        </Row>
                        <Row justify='center'>
                            <Col md={1} xs={3}>
                                <FormItem {...itemProps} name="share">
                                    <Tooltip title="Compartir">
                                        <Button
                                            disabled={profilesCount === 0}
                                            shape="circle"
                                            icon={
                                                <ShareIcon
                                                    style={{
                                                        fontSize: '1.2rem',
                                                        cursor: 'pointer',
                                                        color: '#1990FF'
                                                    }}

                                                />
                                            }
                                            onClick={() => {
                                                directForm.setFields([{ name: 'share', value: true }])
                                                directForm.submit()
                                            }}
                                        />
                                    </Tooltip>
                                </FormItem>
                            </Col>
                            <Col md={13} xs={15}>
                                <FormInput
                                    item={itemProps}
                                    size='middle'
                                    name="comment"
                                    placeholder="Comenta algo..."
                                />
                            </Col>
                            <Col md={2} xs={6}>
                                <FormButton
                                    htmlType="submit"
                                    id='sent'
                                    size='middle'
                                    item={itemProps}
                                    disabled={profilesCount === 0}
                                >
                                    Enviar
                                </FormButton>
                            </Col>
                        </Row>
                        <Row justify='center' span={14}>
                            <Col md={16} xs={24}>
                                <List
                                    loadMore={loadMore}
                                    style={{ backgroundColor: '#ffff' }}
                                    size="small"
                                    dataSource={comments}
                                    renderItem={(item) => <List.Item>{item}</List.Item>}
                                />
                            </Col>
                        </Row>
                    </FormLayout>
                }
            </Form.Provider>
        </>
    );
}

export default FollowForm;
