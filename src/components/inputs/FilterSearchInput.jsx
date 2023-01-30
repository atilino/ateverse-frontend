import { Input } from 'antd';
import React from 'react';
import { Selector } from '../primitives';
import { useField } from '../../hooks';
import { useSearchParams } from 'react-router-dom';

/**
 * @callback onSubmitCallback
 * @param {{ value: string, filter: string }}
 */

/**
 * @param {object} props
 * @param {onSubmitCallback} props.onSubmit
 * @param {Array<{ label: string, value: string }>} props.filters
 * @param {string} props.defaultFilter
 * @returns {React.Component}
 */
function FilterSearchInput({ onSubmit, filters, defaultFilter, onFilterChange }) {

  const filterSelector = useField({ type: 'select', defaultValue: defaultFilter })
  const [search, setSearch] = useSearchParams()
  const style = {
    marginBottom: '1.5rem',
  }

  const handleKeyPress = ({ key, target }) => {
    if (key === 'Enter') {
      onSubmit({
        filter: filterSelector.value,
        value: target.value
      })
    }
  }

  const handleChange = ({ target }) => {
    if(target.value.length > 0) {
      search.set(filterSelector.value, target.value)
    }else {
      search.delete(filterSelector.value)
    }
    setSearch(search)
    onSubmit({
      filter: filterSelector.value,
      value: target.value
    })
  }

  const selectFilter = (
    <Selector
      data={filters}
      onChange={(value) => {
        onFilterChange(filterSelector.value)
        search.delete(filterSelector.value)
        filterSelector.onChange(value)
      }}
      defaultValue={defaultFilter}
      config={{
        value: 'value',
        label: 'label'
      }}
    />
  )
  return (
    <Input
      defaultValue={search.get('imei') || ''}
      placeholder='Buscar'
      addonBefore={selectFilter}
      style={style}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
}

export default FilterSearchInput;