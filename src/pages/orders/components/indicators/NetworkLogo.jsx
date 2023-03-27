import React from 'react';
import { FacebookFilled, InstagramFilled, TwitterOutlined, YoutubeFilled } from '@ant-design/icons';
import { Row } from 'antd';
import { word } from 'utilities';
import { tiktok } from '../../../../assets/img/icons';


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

  if (networkName === 'tiktok') {
    return (
      <Row align='middle' justify='space-around'>
        <img src={tiktok} style={{ width: '36px' }} />
        {label && word.capitalize(networkName)}
      </Row>
    )
  }

  if (networkName === 'youtube') {
    return (
      <Row align='middle' justify='space-around'>
        <YoutubeFilled style={styles} />
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
