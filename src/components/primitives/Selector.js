import React from 'react'
import { Select } from 'antd';
import { getProp } from '../../utilities/get-prop.utility'

/**
 * @param {array} data Data of select options
 * @param {object} config Provide the select options configuration: { label = name of label property on data array, value = name of value property on data array}
*/
const Selector = ({ data = [], config = { label: "label", value: "name" }, ...rest }) => (
    <Select {...rest}>
        {data.length &&
            data.map((item, index) => (
                <Select.Option label={item[config.label]} value={getProp(item, config.value)} key={index}>
                    {getProp(item, config.label)}
                </Select.Option>
            ))
        }
    </Select>
)



export default Selector