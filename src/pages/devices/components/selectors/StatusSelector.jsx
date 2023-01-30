import { Col } from 'antd';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Label, Selector } from '../../../../components';
import { DEVICE_STATUS } from '../../../../constants/devices';

/**
 * 
 * @param {object} props
 * @param {boolean} props.urlEnconde
 * @param {function} props.onChange
 */
function StatusSelector({ urlEncode = false, onChange, ...rest }) {

  const [search, setSearch] = useSearchParams()
  return (
    <>

<Col>
      <Label>Estado</Label>
</Col>
<Col {...rest}>
      <Selector
        style={{ width: '100%' }}
        data={[{ label: 'Todos', name: 'all' }, ...Object.entries(DEVICE_STATUS).map(([key, value]) => ({ label: value, name: key }))]}
        defaultValue= {search.get('status') || 'all'}
        onChange={status => {
          if (urlEncode && status === 'all') {
            search.delete('status')
            setSearch(search)
          } else if (urlEncode && status !== 'all') {
            search.set('status', status)
            setSearch(search)
          }
          onChange(status)
        }}
      />
</Col>
    </>
  );
}

export default StatusSelector;