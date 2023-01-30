import { Checkbox, Col, Tooltip } from 'antd';
import React from 'react';
import { useField } from '../../../hooks'
import { SwitchButton } from '../../../components/primitives';
import { Label } from '../../../components';
import { useSearchParams } from 'react-router-dom';
import { constants } from '../../../utilities';

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
  
  const [search, setSearch] = useSearchParams()
  const isEnabled = search.get('switch') || search.get('connected')

  const filterEnabled = useField({ defaultValue: isEnabled ? true : false })
  const switchFilter = useField({ defaultValue:   constants.BOOLEAN[search.get('switch')] || false })
  const connectedFilter = useField({ defaultValue: constants.BOOLEAN[search.get('connected')]|| false })

  const onChangeFilter = (checked, filter) => {
    if (filter === 'switch') {
      switchFilter.onChange(checked)
      search.set('switch', checked)
    }
    if (filter === 'connected') {
      connectedFilter.onChange(checked)
      search.set('connected', checked)
    }

    setSearch(search)
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
            filterEnabled.onChange(e)
            switchFilter.value === true && switchFilter.onChange(false)
            connectedFilter.value === true && connectedFilter.onChange(false)

            if(!filterEnabled.value === false) {
              search.delete('switch')
              search.delete('connected')
            }else {
              search.set('switch', switchFilter.value)
              search.set('connected', connectedFilter.value)
            }
            setSearch(search)
            onEnabledChange(!filterEnabled.value)
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