import React, { useState } from 'react';
import {
    Input,
    InputNumber,
} from 'antd'
import { FormItem } from '../../../../components/Form';
import { formatOrder, getVariantName, validateLink } from '../../utilities';
import FormTemplate from '../FormTemplate';
import { ReactionsInput } from '..'
import { breakStringToArray } from 'utilities/formaters.utility';

function InteractionForm({
    network,
    initialValues,
    onValuesChange,
    form,
    onFinish,
    onError,
    maxInteraction
}) {
    const [options, setOptions] = useState({
        live: false
    })

    const placeholders = {
        facebook: 'https://www.facebook.com/',
        twitter: 'https://www.twitter.com/',
        instagram: 'https://www.instagram.com/',
    }


    return (
        <FormTemplate
            disabled={maxInteraction === 0}
            form={form}
            initialValues={{ ...initialValues, options: { watchTime: 0 } }}
            onValuesChange={values => {
                if (values.link && getVariantName(values.link) === 'live') {
                    setOptions(options => ({ ...options, live: true }))
                }
                else if (values.link) {
                    setOptions(options => ({ ...options, live: false }))
                }
                formatOrder(values)
                onValuesChange(values)
            }}
            onFinish={values => {

                const options = {
                    link: values.link,
                    reactions: values.reactions,
                    reactionType: values.reactionType ? values.reactionType : 0,
                    comments: breakStringToArray(values.commentsText),
                    shares: values.shares,
                    watchTime: values.watchTime || 0
                }
                if (!validateLink(network, options.link)) return onError('URL no valida', 'Compruebe su link o red social elegida')

                if (options.comments.length > maxInteraction) {
                    return onError('Limite de cometarios', 'Se excedio el limite de comentarios permitidos')
                }
                if (!options.comments.length && !options.reactions && !options.shares && options.watchTime === 0) {
                    return onError('Orden vacía', 'Se debe enviar al menos una interacción')
                }
                onFinish({ options, priority: values.priority, customer: values.customer })
            }}
        >
            <FormItem label="Link" name="link" >
                <Input placeholder={placeholders[network]} />
            </FormItem>
            <FormItem label="Reacciones" name="reactions">
                <InputNumber min={0} max={maxInteraction} />
            </FormItem>
            <FormItem label="Tipo de reacción" name="reactionType">
                <ReactionsInput network={network} />
            </FormItem>

            <FormItem label="Comentarios" name="commentsText">
                <Input.TextArea/>
            </FormItem>
            {network !== 'instagram' &&
                <FormItem label="Compartidos" name="shares">
                    <InputNumber min={0} max={maxInteraction} />
                </FormItem>
            }
            {Object.values(options).includes(true) &&
                <FormItem label="Opciones" name="options">
                    <br />
                    <FormItem label="Tiempo de visualización (seg.)" name="watchTime">
                        <InputNumber min={0} defaultValue={0} />
                    </FormItem>
                </FormItem>
            }
        </FormTemplate>
    );
}

export default InteractionForm;
