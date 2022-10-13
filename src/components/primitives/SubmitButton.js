import React from 'react';
import { Button } from 'antd'

function SubmitButton({ children }) {
    return (
        <Button htmlType="submit" type="primary" style={{width: "100%"}}>
            {children}
        </Button>
    );
}

export default SubmitButton;