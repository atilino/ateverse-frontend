import { Typography } from 'antd'
import React from 'react'

function Label(props) {
  return (
    <Typography.Text {...props} style={{ ...props.style, marginRight: '.5rem'}}>
      {props.children}
    </Typography.Text>
  );
}

export default Label