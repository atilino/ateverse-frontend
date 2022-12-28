import React from 'react';
import { FormInput, FormInputNumber, FormSelect } from '../../../../components/Form';
import FormTemplate from '../FormTemplate';
import useProfiles from '../../../../hooks/useProfiles';
import { constants } from '../../../../utilities';

function FollowForm({ network, initialValues, onValuesChange, form, onFinish, onError }) {
    const { profilesCount } = useProfiles({ type: 'available', network: network })

    const placeholders = {
        facebook: 'https://www.facebook.com/',
        twitter: 'https://www.twitter.com/',
        instagram: 'https://www.instagram.com/',
    }

    return (
        <FormTemplate
            disabled={profilesCount === 0}
            form={form}
            initialValues={{ ...initialValues, 'options.type': 'content', 'options.followers': 0 }}
            onValuesChange={onValuesChange}
            onFinish={values => {
                onFinish({
                    options: {
                        link: values.link,
                        followers: values['options.followers'],
                    },
                    priority: values.priority
                })
            }}
        >
            <FormInput
                label="Link"
                name="link"
                placeholder={placeholders[network]}
                rules={[
                    {
                        pattern: constants.PATTERNS[network.toUpperCase()].MAIN,
                        required: true,
                        message: `El link debe ser de ${network}.`
                    }
                ]} />

            <FormInputNumber
                label="Numero de seguidores"
                name="options.followers"
                min={0}
                max={profilesCount}
            />
        </FormTemplate>
    );
}

export default FollowForm;
