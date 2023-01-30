import React from 'react';
import Button from './Button'

function CreateButton({ title, children, ...rest }) {
  return (
    <Button {...rest} type="primary" shape="round" >
      {title || children}
    </Button>
  );
}

export default CreateButton;