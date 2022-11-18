import { ChromeOutlined, CloudDownloadOutlined, CodeOutlined, LeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { LoaderButton } from 'components/buttons';
import { notification, SwitchButton } from 'components/primitives';
import { DEVICE_STATUS, ERRORS } from 'constants/devices';
import useDevice from 'hooks/useDevice';
import React from 'react';
import { Link } from 'react-router-dom';
import ConnectionIndicator from './ConnectionIndicator';

function ManagementHeader({ device }) {
    const { updateDevice } = useDevice()

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
                        loading={device.status === 'Actualizando'}
                        shape='round'
                        icon={<CloudDownloadOutlined />}
                    />

                    <LoaderButton
                        title='Actualizar google chrome'
                        state={false}
                        loading={device.status === 'Actualizando google chrome'}
                        shape='round'
                        icon={<ChromeOutlined />}
                    />

                    <LoaderButton
                        title='Reiniciar'
                        state={false}
                        loading={device.status === 'Reiniciando'}
                        shape='round'
                        icon={<ReloadOutlined />}
                    />

                    <LoaderButton
                        title='Ejecutar script'
                        state={false}
                        loading={device.status === 'Ejecutando script'}
                        shape='round'
                        icon={<CodeOutlined />}
                    />
                </Row>
            </Col>
        </Row>
    );
}

export default ManagementHeader;