import { Tooltip } from 'antd';
import React from 'react';
import Button from './Button'


function LoaderButton({ title, description, state, loading, loadingDescription, ...rest }) {
  return (
    state ?
      <Tooltip title={loading ? description : description} >
        <Button disabled={!state} loading={loading} {...rest} >
          {title}
        </Button>
      </Tooltip>
      :
      <Button disabled={!state} loading={loading} {...rest} >
        {title}
      </Button>
  );
}

export default LoaderButton;