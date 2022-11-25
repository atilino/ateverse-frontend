import React from 'react';
import { ContainerOutlined } from '@ant-design/icons';
import CircularBorder from '../../../../components/CircularBorder';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';

const ProcessesButton = ({ to }) => (
  <Tooltip title='Procesos'>
    <Link to={to}>
      <CircularBorder backgroundColor='#d7f2e3'>
        <ContainerOutlined style={{ fontSize: '1.2rem', color: '#3BB371' }} />
      </CircularBorder>
    </Link>
  </Tooltip>
)

export default ProcessesButton;