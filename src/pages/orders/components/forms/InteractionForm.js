import React, { useState } from 'react';
import { Selector } from '../../../../components/primitives'
import {
    Input,
    InputNumber,
} from 'antd'
import useNetwork from '../../../../hooks/useNetwork'
import { FormItem } from '../../../../components/Form';
import { formatOrder, getVariantName, validateLink } from '../../utilities';
import FormTemplate from '../FormTemplate';
import { ReactionsInput, ShareGroupInput } from '../'
import useProfiles from '../../../../hooks/useProfiles';
import AvailableMessage from '../AvailableMessage';
import Order from '../../models/Order';

function InteractionForm({
    initialValues,
    onValuesChange,
    form,
    value,
    onFinish,
    onError
}) {
    const { networks, groups } = useNetwork()
    const { profilesCount, getAvailableProfiles } = useProfiles({ type: 'available', network: 'facebook' })
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
            disabled={profilesCount === 0}
            form={form}
            initialValues={{ ...initialValues, options: { watchTime: 0 }}}
            onValuesChange={values => {

                if (values.network) {
                    getAvailableProfiles(values.network)
                }
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
                values.variant = 0

                if(values.watchTime) {
                    values.options = { watchTime: values.watchTime }
                }else {
                    values.options = { watchTime: 0 }
                }
                if (!validateLink(values)) return onError('URL no valida', 'Compruebe su link o red social elegida')

                if (values.comments > profilesCount) {
                    return onError('Limite de cometarios', 'Se excedio el limite de comentarios permitidos')
                }
                if (!values.comments && !values.reactions && !values.shares && values.options.watchTime === 0) {
                    return onError('Orden vacía', 'Se debe enviar al menos una interacción')
                }
                onFinish(values)
            }}
        >
            <div style={{ textAlign: "center", margin: "15px 0" }}>
                <AvailableMessage quantity={profilesCount} />
            </div>
            <FormItem label="Red social" name="network">
                <Selector data={networks} />
            </FormItem>
            <FormItem label="Link" name="link" >
                <Input placeholder={placeholders[value.network]} />
            </FormItem>
            <FormItem label="Reacciones" name="reactions">
                <InputNumber min={0} max={profilesCount} />
            </FormItem>
            <FormItem label="Tipo de reacción" name="type">
                {networks.length &&
                    <ReactionsInput network={value.network} />
                }
            </FormItem>

            <FormItem label="Comentarios" name="commentsText">
                <Input.TextArea />
            </FormItem>
            {value.network !== 'instagram' &&
                <FormItem label="Compartidos" name="shares">
                    <InputNumber min={0} max={profilesCount} />
                </FormItem>
            }
            {Object.values(options).includes(true) &&
                <FormItem label="Opciones" name="options">
                    <br/>
                    <FormItem label="Tiempo de visualización (seg.)" name="watchTime">
                        <InputNumber min={0} defaultValue={0}/>
                    </FormItem>
                </FormItem>
            }
        </FormTemplate>
    );
}

export default InteractionForm;