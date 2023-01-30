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
function StatusSelector({ urlEncode = false, onChange }) {

  const [search, setSearch] = useSearchParams()
  return (
    <>
      <Label>Estado</Label>
      <Selector
        style={{ width: '80%' }}
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
    </>
  );
}

export default StatusSelector;