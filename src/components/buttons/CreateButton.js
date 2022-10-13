import React from 'react';
import Button from './Button'

function CreateButton({ title, children, ...rest }) {
  return (
    <Button {...rest} >
      {title || children}
    </Button>
  );
}

export default CreateButton;