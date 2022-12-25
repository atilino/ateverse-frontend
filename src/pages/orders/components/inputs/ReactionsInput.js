import { Radio } from 'antd';
import React from 'react';
import { love, care, haha, like, angry, wow, sad } from '../../../../assets/img/icons'
import { RadioGroup } from '../../../../components/primitives';
const reactionIcons = { love, care, haha, wow, sad, angry }

/**
 * 
 * @param {object} props
 * @param {string} props.network
 * @param {( 'large' | 'small' )} props.size
 * @returns {React.Component}
 */
function RadioInput({ network, size = "large", ...rest }) {
    const iconStyle = {
        maxWidth: size === 'large' ? '3rem' : '2rem'
    }
    const radioStyle = {
        appearance: 'none',
        position: 'relative',
        margin: 0
    }
    return (
        <RadioGroup {...rest} size='small' >
            <Radio value={0}>
                <img src={like} style={iconStyle} />
            </Radio>
            {network === 'facebook' &&
                <>
                    {
                        Object.entries(reactionIcons).map((icon, index) => (
                            <Radio value={index + 1} key={index}>
                                <img src={icon[1]} style={iconStyle} />
                            </Radio>
                        ))
                    }
                </>
            }
        </RadioGroup>
    );
}

export default RadioInput;