import { Switch } from 'antd'
import React from 'react'

export default function SwitchButton({ state, ...rest }) {
    return (<Switch defaultChecked={state} {...rest} />)
}