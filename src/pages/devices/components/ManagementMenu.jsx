import { Row } from 'antd';
import React from 'react';
import { DetailButton, ProcessesButton } from './buttons';

function ManagementMenu({ deviceId }) {
  return (
    <div>
      <Row justify='center'>
        <DetailButton to={`${deviceId}/detail`} />
        <ProcessesButton to={`${deviceId}/processes`} />
      </Row>
    </div>
  );
}

export default ManagementMenu;