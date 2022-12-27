import { Radio } from 'antd';
import React, { useState } from 'react';
import { love, care, haha, like, angry, wow, sad } from '../../../../assets/img/icons'
import { RadioGroup, Button } from '../../../../components';
const reactionIcons = { love, care, haha, wow, sad, angry }

/**
 * 
 * @param {object} props
 * @param {string} props.network
 * @param {( 'large' | 'small' )} props.size
 * @param {( 'radio' | 'button' )} props.type
 * @param {function} [props.onSelectedClick]
 * @param {function} [props.onReactionClick]
 * @returns {React.Component}
 */
function RadioInput({
    network,
    size = "large",
    type = "radio",
    onReactionClick = () => { },
    onSelectedClick = () => { },
    ...rest
}) {

    const [clicked, setClicked] = useState(null)

    const iconStyle = {
        maxWidth: size === 'large' ? '3rem' : '2rem',
        marginLeft: '1rem',
        cursor: 'pointer'
    }

    function onClick(e) {
        if (type === 'button') {
            return onReactionClick(e.target.id)
        }
        setClicked(e.target.value)
        if (clicked === e.target.value) {
            onSelectedClick(e.target.value)
        }
    }

    if (type === 'radio') {
        return (
            <RadioGroup {...rest} size='small' optionType='button'>
                <Radio value={0} onClick={onClick}>
                    <img src={like} style={iconStyle} />
                </Radio>
                {network === 'facebook' &&
                    Object.entries(reactionIcons).map((icon, index) => (
                        <Radio value={index + 1} key={index} onClick={onClick}>
                            <img src={icon[1]} style={iconStyle} />
                        </Radio>
                    ))
                }
            </RadioGroup>
        )
    }
    if (type === 'button') {
        return (
            <>

                <img
                    id={0}
                    src={like}
                    style={iconStyle} o
                    onClick={onClick}
                />
                {network === 'facebook' &&
                    Object.entries(reactionIcons).map((icon, index) => (

                        <img
                            id={index + 1}
                            src={icon[1]}
                            style={iconStyle}
                            onClick={onClick}
                        />
                    ))
                }
            </>
        )
    }
}

export default RadioInput;