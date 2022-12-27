import React, { useEffect, useState } from 'react';
import { FormButton, FormInput, Button, FormCheckbox, ShareIcon, useForm, FormItem } from '../../../../components';
import FormTemplate from '../FormTemplate';
import { useProfiles } from '../../../../hooks';
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
    onComplete
}) {
    const { profilesCount } = useProfiles({ type: 'available', network: 'facebook' })
    const [directForm] = useForm()

    const [comments, setComments] = useState([])

    const placeholders = {
        facebook: 'https://www.facebook.com/',
        twitter: 'https://www.twitter.com/',
        instagram: 'https://www.instagram.com/',
    }

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

                <FormTemplate
                    name='start-stop'
                    disabled={profilesCount === 0}
                    form={form}
                    initialValues={{ 'options.link': initialValues.options.link }}
                    onValuesChange={onValuesChange}
                    noSubmit={true}
                    priority={true}
                >
                    <Row justify='center'>
                        <Col span={2}>
                            <FormButton
                                shape='round'
                                type="primary"
                                htmlType="submit"
                                disabled={profilesCount === 0}
                                danger={order.options.direct || false}
                            >
                                {order.options.direct ? 'Finalizar' : 'Iniciar'}
                            </FormButton>
                        </Col>
                        <Col span={14}>
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

                    </Row>
                </FormTemplate>
                {order.options.direct &&
                    <FormTemplate
                        name='direct'
                        disabled={profilesCount === 0}
                        form={directForm}
                        onValuesChange={onValuesChange}
                        initialValues={{ comment: null, reactionType: null, share: false }}
                        noSubmit={true}
                        priority={true}
                    >
                        <Row style={{ margin: '15px' }} justify='center'>
                            <FormItem {...itemProps} name="reactionType">
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
                            </FormItem>
                        </Row>
                        <Row justify='center'>
                            <Col span={1}>
                                <FormItem {...itemProps} name="share">
                                    <Tooltip title="Compartir">
                                        <Button
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
                            <Col span={13}>
                                <FormInput
                                    item={itemProps}
                                    size='middle'
                                    name="comment"
                                    placeholder="Comenta algo..."
                                />
                            </Col>
                            <Col span={2}>
                                <FormButton htmlType="submit" id='sent' size='middle' item={itemProps}>
                                    Enviar
                                </FormButton>
                            </Col>
                        </Row>
                        <Row justify='center' span={14}>
                            <Col span={16}>
                                <List
                                    loadMore={loadMore}
                                    style={{ backgroundColor: '#ffff' }}
                                    size="small"
                                    dataSource={comments}
                                    renderItem={(item) => <List.Item>{item}</List.Item>}
                                />
                            </Col>
                        </Row>
                    </FormTemplate>
                }
            </Form.Provider>
        </>
    );
}

export default FollowForm;
