import { SignalFilled } from '@ant-design/icons';
import React from 'react';
import Indicator from './Indicator'

function ConnectionIndicator({ state }) {
  return (
    <Indicator state={state}>
      <SignalFilled/>
    </Indicator>
  );
}

export default ConnectionIndicator;