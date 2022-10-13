import { Radio } from 'antd';
import React from 'react';
import { love, care, haha, like, angry, wow, sad } from '../../../../assets/img/icons'
import { RadioGroup } from '../../../../components/primitives';
const reactionIcons = { love, care, haha, wow, sad, angry }

function RadioInput({ network, ...rest }) {
    return (
        <RadioGroup {...rest}>
                <Radio value={0}>
                    <img src={like} />
                </Radio>
                {network === 'facebook' &&
                    <>
                        {
                            Object.entries(reactionIcons).map((icon, index) => (
                                <Radio value={index + 1} key={index}>
                                    <img src={icon[1]} />
                                </Radio>
                            ))
                        }
                    </>
                }
        </RadioGroup>
    );
}

export default RadioInput;