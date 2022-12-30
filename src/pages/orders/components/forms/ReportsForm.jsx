import React from 'react';
import { FormInput, FormInputNumber, FormSelect } from '../../../../components/Form';
import FormTemplate from '../FormTemplate';
import useProfiles from '../../../../hooks/useProfiles';

function ReportsForm({ initialValues, onValuesChange, form, onFinish, onError }) {
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
            initialValues={{ ...initialValues, 'options.type': 'content', 'options.reports': 0 }}
            onValuesChange={onValuesChange}
            onFinish={values => {
                onFinish({
                    options: {
                        link: values.link,
                        type: values['options.type'],
                        reason: 'social',
                        reports: values['options.reports'],
                    },
                    priority: values.priority,
                    customer: values.customer
                })
            }}
        >
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
                name="options.reports"
                min={0}
                max={profilesCount}
            />
        </FormTemplate>
    );
}

export default ReportsForm;
