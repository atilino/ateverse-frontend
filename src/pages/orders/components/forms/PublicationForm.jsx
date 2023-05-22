import { Input } from 'antd';
import React from 'react';
import { FormItem } from 'components/Form';
import FormTemplate from '../FormTemplate';
import { breakStringToArray } from 'utilities/formaters.utility';

function PublicationForm({
        maxPublications,
        initialValues,
        onValuesChange,
        form,
        onFinish,
        onError
    }) {
    return (
        <FormTemplate
            disabled={maxPublications === 0}
            form={form}
            initialValues={initialValues}
            onValuesChange={onValuesChange}
            onFinish={(values) => {
                const options = { publications: breakStringToArray(values.publications) }
                if (options.publications.length > maxPublications) {
                    return onError('Limite de publicaciones', 'Se excedio el limite de publicaciones permitidas')
                }
                onFinish({ options, customer: values.customer, tags: values.tags })
            }}
        >
            <FormItem label="Publicaciones" name="publications">
                <Input.TextArea showCount maxLength={280}/>
            </FormItem>
        </FormTemplate>
    );
}

export default PublicationForm;
