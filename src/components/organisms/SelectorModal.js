import React from 'react';
import { Selector, Modal } from '../primitives'
import useField from '../../hooks/useField'

function SelectorModal({
    title,
    options,
    config,
    onSubmit,
    onCancel,
    defaultValue,
    placeholder,
    visible = false
}) {

    const { onChange, value } = useField({})

    return (
        visible &&
        <Modal
            title={title}
            onOk={() => onSubmit(value || defaultValue)}
            onCancel={onCancel}
            visible={visible}
        >
            <Selector
                data={options}
                config={config}
                onChange={onChange}
                defaultValue={defaultValue}
                placeholder={placeholder}
            />
        </Modal>
    );
}

export default SelectorModal;