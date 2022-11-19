import { Tooltip } from 'antd';
import React from 'react';
import Button from './Button'


function LoaderButton({ title, state, loading, children, ...rest }) {
  return (
    state ?
      <Tooltip title={title} >
        <Button disabled={!state} loading={loading} {...rest} >
          {children}
        </Button>
      </Tooltip>
      :
      <Button disabled={!state} loading={loading} {...rest} >
        {children}
      </Button>
  );
}

export default LoaderButton;