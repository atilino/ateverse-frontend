import { ChromeOutlined, CloudDownloadOutlined, CodeOutlined, LeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { Col, List, Row } from 'antd';
import { LoaderButton } from 'components/buttons';
import { notification, SwitchButton } from 'components/primitives';
import { DEVICE_STATUS, ERRORS } from 'constants/devices';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import ConnectionIndicator from './ConnectionIndicator';
import { devices } from '../../../services';
import { CommandModal } from './modals';
import { useToggle, useDevice } from '../../../hooks';
import { useForm } from '../../../components';

function ManagementHeader({ device }) {
  const { updateDevice } = useDevice()
  const commandModal = useToggle(false)
  const [form] = useForm()

  const onSwitchClick = async (state, id) => {
    updateDevice(id, { switch: state })
      .then(() => {
        notification.updateSuccess()
      })
      .catch(error => {
        notification.updateError(ERRORS[error.message])
      })
  }

  return (
    <Row align='middle' style={{ marginBottom: '1.5rem' }}>
      <Col span={8}>
        <Link to='/devices'>
          <LeftOutlined style={{ fontSize: '24px', color: '#505050' }} />
        </Link>
        <span style={{ fontSize: '18px', margin: '0 .8rem' }}>{device.imei}</span>
      </Col>
      <Col span={14} offset={2} >
        <Row justify='space-around' align='middle'>
          <span>{DEVICE_STATUS[device.status]}</span>
          <ConnectionIndicator state={device.connected} />
          <SwitchButton
            checked={device.switch}
            loading={device.status === 'ON' || device.status === 'OFF' ? false : true}
            onChange={(currentState) => onSwitchClick(currentState, device.id)}
          />
          <LoaderButton
            title='Actualizar'
            state={device.upgradeable}
            loading={device.status === 'UPGRADING'}
            shape='round'
            onClick={e => {
              devices.upgradeDevice(device.id)
                .then(() => notification.success("En proceso de actualización"))
                .catch(() => notification.error("Error al ejecutar acción"))
            }}
            icon={<CloudDownloadOutlined />}
          />

          <LoaderButton
            title='Actualizar google chrome'
            state={true}
            loading={device.status === 'UPGRADING_CHROME'}
            shape='round'
            onClick={e => {
              devices.upgradeChromeDevice(device.id)
                .then(() => notification.success("En proceso de actualización"))
                .catch(() => notification.error("Error al ejecutar acción"))
            }}
            icon={<ChromeOutlined />}
          />

          <LoaderButton
            title='Reiniciar'
            state={true}
            loading={device.status === 'REBOOTING'}
            shape='round'
            onClick={e => {
              devices.rebootDevice(device.id)
                .then(() => notification.success("En proceso de reinicio"))
                .catch(() => notification.error("Error al ejecutar acción"))
            }}
            icon={<ReloadOutlined />}
          />

          <LoaderButton
            title='Ejecutar script'
            state={true}
            loading={device.status === 'IN_TASKS'}
            shape='round'
            onClick={commandModal.toggle}
            icon={<CodeOutlined />}
          />
        </Row>
      </Col>
      <CommandModal
        device={device}
        visible={commandModal.state}
        form={form}
        onCancel={commandModal.toggle}
      />
    </Row>
  );
}

export default ManagementHeader;