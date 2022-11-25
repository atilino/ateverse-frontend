import React from 'react';
import { facebook, instagram, twitter } from 'assets/img/icons'
import { FacebookFilled, InstagramFilled, TwitterOutlined } from '@ant-design/icons';

function NetworkLogo({ networkName }) {
  const styles = {
    fontSize: '32px',
    color: '#3b3b3b'
  }
  if(networkName === 'facebook') {
    return <FacebookFilled style={styles}/>
  }
  if(networkName === 'instagram') {
    return <InstagramFilled style={styles}/>
  }
  if(networkName === 'twitter') {
    return <TwitterOutlined style={styles}/>
  }
}

export default NetworkLogo;
