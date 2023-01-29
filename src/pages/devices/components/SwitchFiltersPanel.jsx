import { Checkbox, Col, Tooltip } from 'antd';
import React from 'react';
import { useField } from '../../../hooks'
import { SwitchButton } from '../../../components/primitives';
import { Label } from '../../../components';

/**
 * @typedef callback
 * @returns {{
 *  switch: boolean,
 *  connected: boolean
 * }}
 */

/**
 * @param {object} props
 * @param {callback} props.onChange
 * @param {function} props.onEnabledChange
*/
function SwitchFiltersPanel({ onChange, onEnabledChange }) {
  const filterEnabled = useField({ defaultValue: false })
  const switchFilter = useField({ defaultValue: false })
  const connectedFilter = useField({ defaultValue: false })

  const onChangeFilter = (checked, filter) => {
    filter === 'switch' && switchFilter.onChange(checked)
    filter === 'connected' && connectedFilter.onChange(checked)
    onChange({
      switch: filter === 'switch' ? checked : switchFilter.value,
      connected: filter === 'connected' ? checked : connectedFilter.value
    })
  }
  return (
    <>
      <Col offset={1} span={1}>
        <Tooltip title='Habilitar filtros'>
          <Checkbox style={{ margin: '0 1rem' }} checked={filterEnabled.value} onChange={e => {
            onEnabledChange(!filterEnabled.value)
            filterEnabled.onChange(e)
            switchFilter.value === true && switchFilter.onChange(false)
            connectedFilter.value === true && connectedFilter.onChange(false)
          }} />
        </Tooltip>
      </Col>
      <Col span={3}>
        <Label style={{ color: filterEnabled.value ? 'black' : 'gray' }}>Encendido</Label>
        <SwitchButton state={switchFilter.value} id='switch' onChange={checked => onChangeFilter(checked, 'switch')} disabled={!filterEnabled.value} />
      </Col>
      <Col span={3}>
        <Label style={{ color: filterEnabled.value ? 'black' : 'gray' }}>Conectado</Label>
        <SwitchButton state={connectedFilter.value} id='connected' onChange={checked => onChangeFilter(checked, 'connected')} disabled={!filterEnabled.value} />
      </Col>
    </>
  )
}

export default SwitchFiltersPanel