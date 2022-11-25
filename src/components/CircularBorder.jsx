import React from 'react';

function CircularBorder({ children, backgroundColor }) {
  return (
    <div style={{
      borderRadius: '100%',
      padding: '.5rem',
      backgroundColor: backgroundColor || 'red',
      margin: '.2rem'
    }}
    >
      {children}
    </div>
  );
}

export default CircularBorder;