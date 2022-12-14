import React from 'react';
import { Radio, Space } from 'antd'

/**
 * 
 * @param {import('antd').RadioGroupProps} props
 * @returns 
 */
function RadioGroup({ children, options = [], type = 'radio', direction = 'horizontal', config = { label: 'label', value: 'value' }, ...rest }) {
    return (
        <Radio.Group {...rest} >
            <Space direction={direction} wrap >
                {children}
                {options.length && options.map((option, index) => {
                    return (
                        type === 'button' ?
                            <Radio.Button value={option[config.value]} key={index} disabled={option.disabled || false}>
                                {option[config.label]}
                            </Radio.Button>
                            :
                            <Radio value={option[config.value]} key={index} disabled={option.disabled || false}>
                                {option[config.label]}
                            </Radio>
                    )
                })
                }
            </Space>
        </Radio.Group>
    );
}

export default RadioGroup;
