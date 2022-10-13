import { PoweroffOutlined } from '@ant-design/icons';
import { Switch, Tooltip } from 'antd';
import React from 'react';

function SwitchButton({ state, ...rest }) {

    return (
            <Switch defaultChecked={state} {...rest} />
    );
}

export default SwitchButton;