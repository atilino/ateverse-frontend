import { Radio } from 'antd';
import React, { useState } from 'react';
import { love, care, haha, like, angry, wow, sad } from '../../../../assets/img/icons'
import { RadioGroup } from '../../../../components/primitives';
const reactionIcons = { love, care, haha, wow, sad, angry }

/**
 * 
 * @param {object} props
 * @param {string} props.network
 * @param {( 'large' | 'small' )} props.size
 * @param {function} [props.onSelectedClick]
 * @returns {React.Component}
 */
function RadioInput({ network, size = "large", onSelectedClick = () => { }, ...rest }) {

    const [clicked, setClicked] = useState(null)

    const iconStyle = {
        maxWidth: size === 'large' ? '3rem' : '2rem'
    }

    function onClick(e) {
        setClicked(e.target.value)
        if (clicked === e.target.value) {
            onSelectedClick(e.target.value)
        }
    }

    return (
        <RadioGroup {...rest} size='small' optionType='button'>
            <Radio value={0} onClick={onClick}>
                <img src={like} style={iconStyle} />
            </Radio>
            {network === 'facebook' &&
                <>
                    {
                        Object.entries(reactionIcons).map((icon, index) => (
                            <Radio value={index + 1} key={index} onClick={onClick}>
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