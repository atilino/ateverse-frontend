import React from 'react';
import { DashboardOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import CircularBorder from '../CircularBorder';
import { Link } from 'react-router-dom';

const DetailButton = ({ to }) => (
  <Tooltip title='Detalles'>
    <Link to={to}>
      <CircularBorder backgroundColor='#def4fc'>
        <DashboardOutlined style={{ fontSize: '1.2rem' }} />
      </CircularBorder>
    </Link>
  </Tooltip>
);

export default DetailButton;