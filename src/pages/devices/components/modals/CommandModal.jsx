import React, { useState } from 'react';
import { Modal, notification } from '../../../../components/primitives';
import { devices } from '../../../../services';
import { FormInput, FormLayout, FormTextArea } from '../../../../components';

function CommandModal({ device, visible, form, onCancel }) {
  const [commandResult, setCommandResult] = useState([])

  return (
    <Modal
      visible={visible}
      title='Enviar comando'
      footer={null}
      onCancel={onCancel}
      width='70%'
    >
      <div
        style={{
          backgroundColor: 'black',
          color: 'white',
          fontSize: '10px',
          borderRadius: '10px',
          boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.1)',
          padding: '5px 0',
          margin: '1.5rem',
          overflow: 'scroll',
          height: '350px',
          scrollBehavior: 'smooth',
          fontFamily: 'monospace'
        }}
      >
        <ul style={{ listStyleType: 'none' }}>
          {commandResult.map((result, i) =>
            result.split('\n')
              .map((line, n) =>
                <>
                  <li key={i}>
                    {line}
                  </li>
                  {result.split('\n').length - 1 === n && <span id={`command-${n}`} />}
                </>
              )
          )}
        </ul>
      </div>
      <FormLayout
        defaultValue={{
          command: ''
        }}
        form={form}
        onFinish={values => {
          devices
            .executeDeviceCommand(device.id, values.command)
            .then(result => {
              if (result.error) {
                return notification.error("Error al ejecutar comando", result.error)
              }
              const divisor = '-' * 50
              setCommandResult(comandHistory => [...comandHistory, result.data])
              notification.success("En ejecución")
              form.resetFields()
              const link = document.createElement("a")
              link.href = '#command-' + String(result.data.split('\n').length - 1)
              link.click()
            })
            .catch(error => notification.networkError(error.message))
        }}
      >
        <FormInput
          name='command'
          rules={[
            {
              required: true,
              message: 'Se requiere al menos una instrucción',
            }
          ]}
        />
      </FormLayout>
    </Modal>
  );
}

export default CommandModal;