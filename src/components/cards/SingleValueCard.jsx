import { Card, Row, Typography } from 'antd';
import React from 'react';

function SingleValueCard({ title, value, children }) {
  return (
    <Card
      title={title}
      style={{ textAlign: 'center' }}
    >
        <Typography.Title level={1}>
          {value === undefined ? children : value}
        </Typography.Title >
    </Card>
  );
}

export default SingleValueCard;