import Title from 'antd/lib/typography/Title';
import React from 'react';

const CompanyName = ({ weight = 200, color = 'black', align='center' }) => (
        <Title style={{fontWeight: weight, textAlign: align, color, margin: 'auto'}}>Atila</Title>
)
export default CompanyName