import React from 'react';
import { FormInput, FormInputNumber, FormSelect } from '../../../../components/Form';
import FormTemplate from '../FormTemplate';
import useProfiles from '../../../../hooks/useProfiles';
import { constants } from '../../../../utilities';

function FollowForm({
		network,
		placeholders,
		initialValues,
		onValuesChange,
		form,
		onFinish,
		onError,
		isTemplate
	}) {
	const { profilesCount } = useProfiles({ type: 'available', network: network })

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
					priority: values.priority,
					customer: values.customer
				})
			}}
		>
			<FormInput
				label="Link"
				name={["options", "link"]}
				placeholder={placeholders[network]}
				rules={[
					{
						pattern: constants.PATTERNS[network.toUpperCase()].MAIN,
						required: true,
						message: `El link debe ser de ${network}.`
					}
				]}
				disabled={isTemplate}
			/>

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
