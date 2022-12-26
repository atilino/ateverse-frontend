import { Button as AntdButton } from 'antd';
import React from 'react';

/**
 * 
 * @param {import('antd').ButtonProps} param0 
 * @returns {React.Component}}
 */
function Button({ children, ...rest}) {
  return (
    <AntdButton {...rest}>
      {children}
    </AntdButton>
  );
}

export default Button;