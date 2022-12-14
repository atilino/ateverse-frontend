import { Col, Input } from 'antd';
import React from 'react';
import { Selector } from '../primitives';
import { useField } from '../../hooks';

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
function FilterSearchInput({ onSubmit, filters, defaultFilter }) {

  const filterSelector = useField({ type: 'select', defaultValue: defaultFilter })

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
    onSubmit({
      filter: filterSelector.value,
      value: target.value
    })
  }

  const selectFilter = (
    <Selector
      data={filters}
      onChange={filterSelector.onChange}
      defaultValue={defaultFilter}
      config={{
        value: 'value',
        label: 'label'
      }}
    />
  )
  return (
    <>
      <Col span={12}>
        <Input
          placeholder='Buscar'
          addonBefore={selectFilter}
          style={style}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </Col>
    </>
  );
}

export default FilterSearchInput;