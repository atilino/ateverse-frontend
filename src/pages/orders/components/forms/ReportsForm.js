import { Input } from 'antd';
import React from 'react';
import { FormInput, FormInputNumber, FormSelect } from '../../../../components/Form';
import FormTemplate from '../FormTemplate';
import useProfiles from '../../../../hooks/useProfiles';
import AvailableMessage from '../AvailableMessage';

function PublicationForm({ initialValues, onValuesChange, form, value, onFinish, onError }) {
    const { profilesCount } = useProfiles({ type: 'available', network: 'facebook' })

    const _REPORT_TYPES = [
        {
            label: "Contenido",
            name: "content"
        },
        {
            label: "Cuenta",
            name: "account"
        },
        {
            label: "Grupo",
            name: "group"
        },
        {
            label: "Pagina",
            name: "page"
        }
    ]

    return (
        <FormTemplate
            disabled={profilesCount === 0}
            form={form}
            initialValues={{ ...initialValues, 'options.type': 'content', 'options.reportsNumber': 0 }}
            onValuesChange={onValuesChange}
            onFinish={values => {
                console.log(values)
                onFinish({
                    link: values.link,
                    options: {
                        type: values['options.type'],
                        reason: 'social',
                        reportsNumber: values['options.reportsNumber'],
                    },
                    priority: values.priority
                })
            }}
        >
            <div style={{ textAlign: "center", margin: "15px 0" }}>
                <AvailableMessage quantity={profilesCount} />
            </div>

            <FormInput
                label="Link"
                name="link"
                placeholder="https://www.facebook.com/"
                rules={[
                    {
                        pattern: /.facebook./,
                        required: true,
                        message: 'El link debe ser de facebook.'
                    }
                ]} />
            <FormSelect label="Tipo de reporte" name="options.type" data={_REPORT_TYPES} />

            <FormInputNumber
                label="Numero de reportes"
                name="options.reportsNumber"
                min={0}
                max={profilesCount}
            />
        </FormTemplate>
    );
}

export default PublicationForm;