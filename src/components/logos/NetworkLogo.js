import React from 'react';
import { facebook, instagram, twitter } from 'assets/img/icons'

function NetworkLogo({ network }) {
  if(network === 'facebook') {
    return <img src={facebook} style={{ maxHeight: '150px'}}/>
  }
  if(network === 'instagram') {
    return <img src={instagram} style={{ maxHeight: '150px'}}/>
  }
  if(network === 'twitter') {
    return <img src={twitter} style={{ maxHeight: '150px'}}/>
  }
}

export default NetworkLogo;
