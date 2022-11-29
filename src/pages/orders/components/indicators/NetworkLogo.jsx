import React from 'react';
import { FacebookFilled, InstagramFilled, TwitterOutlined } from '@ant-design/icons';
import { Row } from 'antd';
import { word } from 'utilities';

function NetworkLogo({ networkName, label=false }) {
  const styles = {
    fontSize: '32px',
    color: '#3b3b3b',
  }
  if (networkName === 'instagram') {
    return (
      <Row align='middle' justify='space-around'>
        <InstagramFilled style={styles} />
        {label && word.capitalize(networkName)}
      </Row>
    )
  }
  if (networkName === 'twitter') {
    return (
      <Row align='middle' justify='space-around'>
        <TwitterOutlined style={styles} />
        {label && word.capitalize(networkName)}
      </Row>
    )
  }
  return (
    <Row align='middle' justify='space-around'>
      <FacebookFilled style={styles} />
      {(label && networkName) && word.capitalize(networkName)}
    </Row>
  )
}

export default NetworkLogo;
