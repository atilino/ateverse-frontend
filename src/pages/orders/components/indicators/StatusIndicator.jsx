import { CheckCircleFilled, ClockCircleFilled, CloseCircleFilled, PlayCircleFilled } from '@ant-design/icons';
import React from 'react';

/**
 * 
 * @param {object} props
 * @param {string} props.status
 * @returns {React.Component}
 */
function StatusIndicator({ status }) {
  return (
    <div style={{ margin: '0 0.5rem' }}>
      {status === 'CREATED' &&
        <ClockCircleFilled style={{ color: 'gray' }} />
      }
      {status === 'IN_PROGRESS' &&
        <PlayCircleFilled style={{ color: '#edc75e' }} />
      }
      {status === 'FINISHED' &&
        <CheckCircleFilled style={{ color: '#3BB371' }} />
      }
      {status === 'ERROR' &&
        <CloseCircleFilled style={{ color: '#fc6262' }} />
      }
    </div>
  );
}

export default StatusIndicator;