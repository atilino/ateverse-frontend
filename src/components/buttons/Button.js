import { Button as AntdButton } from 'antd';
import React from 'react';

function Button({ children, ...rest}) {
  return (
    <AntdButton {...rest}>
      {children}
    </AntdButton>
  );
}

export default Button;