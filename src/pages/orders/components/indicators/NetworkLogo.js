import React from 'react';
import { facebook, instagram, twitter } from 'assets/img/icons'

function NetworkLogo({ networkName }) {
  const styles = {
    maxHeight: '32px'
  }
  if(networkName === 'facebook') {
    return <img src={facebook} style={styles}/>
  }
  if(networkName === 'instagram') {
    return <img src={instagram} style={styles}/>
  }
  if(networkName === 'twitter') {
    return <img src={twitter} style={styles}/>
  }
}

export default NetworkLogo;
