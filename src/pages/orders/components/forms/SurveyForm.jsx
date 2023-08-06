import React from 'react';
import { FormInput, FormInputNumber, FormSelect } from '../../../../components/Form';
import FormTemplate from '../FormTemplate';
import useProfiles from '../../../../hooks/useProfiles';
import { constants } from '../../../../utilities';

function SurveyForm({
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
			initialValues={{ ...initialValues, 'options.option': 0, 'options.votes': 0 }}
			onValuesChange={onValuesChange}
			onFinish={values => {
				onFinish({
					options: {
						link: values.options.link,
						votes: values.options.votes,
						option: values.options.option - 1,
					},
					priority: values.priority,
					customer: values.customer,
					tags: values.tags
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
				label="Número de votos"
				name={["options", "votes"]}
				min={0}
				max={profilesCount}
			/>
			<FormInputNumber
				label="Posición de la opción (1 - 4)"
				name={["options", "option"]}
				min={1}
				max={4}
			/>
		</FormTemplate>
	);
}

export default SurveyForm;
