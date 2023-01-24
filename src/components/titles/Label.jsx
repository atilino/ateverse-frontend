import { Typography } from 'antd'
import React from 'react'

function Label(props) {
  return (
    <Typography.Text>
      {props.children}
    </Typography.Text>
  );
}

export default Label