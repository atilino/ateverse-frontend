import { Col, Row } from 'antd'
import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterSearchInput, Label, Selector } from '../../../../components'
import { constants } from '../../../../utilities'
import { useNetwork } from '../../../../hooks'

function FilterOrdersInput({ onChange }) {

  const { networks } = useNetwork()
  const [search, setSearch] = useSearchParams()

  const onNetworkChange = (network) => {
    search.set('network', network)
    onChange({ network: network === 'all' ? undefined : network })
    network === 'all' && search.delete('network')
    setSearch(search)
  }

  const onVariantChange = (variant) => {
    variant !== 'all' && search.set('variant', variant)
    variant === 'all' && search.delete('variant')
    onChange({ variant: variant === 'all' ? undefined : Number(variant - 1) })
    setSearch(search)
  }

  const variantsData = () => {
    const allField = {
      name: 'all',
      label: 'Todos'
    }
    if (search.get('network') && networks.length) {
      const networkName = networks.find(network => network._id === search.get('network'))?.name
      return [allField, ...constants.ORDER_VARIANTS[networkName].map(({ id, label }) => ({ value: id, label }))]
    }
    return [allField]
  }

  return (
    <>
      <Row justify='center'>
        <Col span={16} md={16} xs={24}>
          <FilterSearchInput
            onSubmit={({ filter, value }) => onChange({ [filter]: value.length > 0 ? value : undefined })}
            filters={[
              { label: 'Link', value: 'link' },
              { label: 'Cliente', value: 'customer' }
            ]}
            defaultFilter='link'
          />
        </Col>
      </Row>
      <Row justify='center' align='middle' style={{ marginBottom: '1.5rem' }} wrap={true}>
        <Col md={{ pull: 1 }} xs={{ pull: 0 }} style={{ marginBottom: '.5rem' }}>
          <Label>
            Red:
          </Label>
        </Col>
        <Col md={{ span: 4, pull: 1 }} xs={{ span: 18, pull: 0 }} style={{ marginBottom: '.5rem' }} >
          <Selector
            data={[{ _id: 'all', label: 'Todas' }, ...networks]}
            config={{ value: '_id', label: 'label' }}
            defaultValue={search.get('network') || 'all'}
            onChange={onNetworkChange}
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={{ push: 0 }} md={{ push: 1 }} style={{ marginBottom: '.5rem' }}>
          <Label>
            Tipo:
          </Label>
        </Col>
        <Col md={{ span: 4, push: 1 }} xs={{ span: 18, push: 0 }} style={{ marginBottom: '.5rem' }}>
          <Selector
            data={variantsData()}
            defaultValue={search.get('variant') || 'all'}
            onChange={onVariantChange}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
    </>
  );
}

export default FilterOrdersInput;