import React, { useEffect, useState } from "react";
import { Input, InputNumber } from "antd";
import { FormInput, FormItem } from "../../../../components/Form";
import { formatOrder, getVariantName, validateLink } from "../../utilities";
import FormTemplate from "../FormTemplate";
import { ReactionsInput } from "..";
import { breakStringToArray } from "utilities/formaters.utility";

function InteractionForm({
  network,
  initialValues,
  onValuesChange,
  form,
  onFinish,
  onError,
  maxInteraction,
  placeholders,
  isTemplate,
}) {
  const [options, setOptions] = useState({
    live: false,
  });

	const handleFinish = (values) => {
		const options = {
			link: values.options.link,
			reactions: values.options.reactions,
			reactionType: values.options.reactionType
				? values.options.reactionType
				: 0,
			comments: breakStringToArray(values.options.commentsText),
			shares: values.options.shares,
			watchTime: values.options.watchTime || 0,
		};

		if (!validateLink(network, options.link))
			return onError(
				"URL no valida",
				"Compruebe su link o red social elegida"
			);

		if (options.comments.length > maxInteraction) {
			return onError(
				"Limite de cometarios",
				"Se excedio el limite de comentarios permitidos"
			);
		}
		if (
			!options.comments.length &&
			!options.reactions &&
			!options.shares &&
			options.watchTime === 0
		) {
			return onError(
				"Orden vacía",
				"Se debe enviar al menos una interacción"
			);
		}
		onFinish({ options, customer: values.customer });
	}

	const handleChange = (values) => {
		if (
			values.options.link &&
			getVariantName(values.options.link) === "live"
		) {
			setOptions((options) => ({ ...options, live: true }));
		} else if (values.options.link) {
			setOptions((options) => ({ ...options, live: false }));
		}
		formatOrder(values);
		onValuesChange(values);
	}

  return (
    <FormTemplate
      disabled={maxInteraction === 0}
      form={form}
      initialValues={initialValues}
      onValuesChange={handleChange}
      onFinish={handleFinish}
    >
      <FormInput
        label="Link"
        name={["options", "link"]}
        placeholder={placeholders[network]}
        rules={[
          {
            pattern: new RegExp(placeholders[network]),
            required: true,
            message: `El link debe ser de ${network}.`,
          },
        ]}
        disabled={isTemplate}
      />
      <FormItem label="Reacciones" name={["options", "reactions"]}>
        <InputNumber min={0} max={maxInteraction} />
      </FormItem>
      <FormItem label="Tipo de reacción" name={["options", "reactionType"]}>
        <ReactionsInput network={network} />
      </FormItem>

      <FormItem label="Comentarios" name={["options", "commentsText"]}>
        <Input.TextArea />
      </FormItem>
      {network !== "instagram" && (
        <FormItem label="Compartidos" name={["options", "shares"]}>
          <InputNumber min={0} max={maxInteraction} />
        </FormItem>
      )}
      {Object.values(options).includes(true) && (
        <FormItem label="Opciones" name={["options", "settings"]}>
          <br />
          <FormItem label="Tiempo de visualización (seg.)" name="watchTime">
            <InputNumber min={0} defaultValue={0} />
          </FormItem>
        </FormItem>
      )}
    </FormTemplate>
  );
}

export default InteractionForm;
