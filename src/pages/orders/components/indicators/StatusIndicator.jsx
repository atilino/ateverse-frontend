import { CheckCircleFilled, ClockCircleFilled, CloseCircleFilled, PlayCircleFilled } from '@ant-design/icons';
import { Row } from 'antd';
import React from 'react';
import { constants } from 'utilities';

/**
 * 
 * @param {object} props
 * @param {string} props.status
 * @returns {React.Component}
 */
function StatusIndicator({ status }) {
  return (
    <Row align='middle'>
      {status === 'CREATED' &&
        <ClockCircleFilled style={{ color: 'gray', margin: '0 0.5rem' }} />
      }
      {status === 'IN_PROGRESS' &&
        <PlayCircleFilled style={{ color: '#edc75e', margin: '0 0.5rem' }} />
      }
      {status === 'FINISHED' &&
        <CheckCircleFilled style={{ color: '#3BB371', margin: '0 0.5rem' }} />
      }
      {status === 'ERROR' &&
        <CloseCircleFilled style={{ color: '#fc6262', margin: '0 0.5rem' }} />
      }
      {status === 'CANCELED' &&
        <CloseCircleFilled style={{ color: '#fc6262', margin: '0 0.5rem' }} />
      }
      {constants.ORDER_STATUS[status]}
    </Row>
  );
}

export default StatusIndicator;