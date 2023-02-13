import React from 'react';
import { FormInput, FormInputNumber, FormSelect } from '../../../../components/Form';
import FormTemplate from '../FormTemplate';
import useProfiles from '../../../../hooks/useProfiles';
import { constants } from '../../../../utilities';

function ReportsForm({ network, initialValues, onValuesChange, form, onFinish, onError }) {
    const { profilesCount } = useProfiles({ type: 'available', network })

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

    const placeholders = {
        facebook: 'https://www.facebook.com/',
        twitter: 'https://www.twitter.com/',
        instagram: 'https://www.instagram.com/',
    }


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
                placeholder={placeholders[network]}
                rules={[
                    {
                        pattern: network === 'facebook' ? constants.PATTERNS.FACEBOOK.MAIN : constants.PATTERNS.INSTAGRAM.MAIN,
                        required: true,
                        message: `El link debe ser de ${network}.`
                    }
                ]} />
            <FormSelect label="Tipo de reporte" name="options.type" data={network === 'facebook' ? _REPORT_TYPES : _REPORT_TYPES.slice(0, 2)} />

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
