import React from 'react';
import { love, care, haha, like, angry, wow, sad } from 'assets/img/icons'

const reactionIcons = [like, love, care, haha, wow, sad, angry]


function ReactionLogo({ reactionType }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <img style={{ width: "30px" }} src={reactionIcons[reactionType]} />
    </div>
  );
}

export default ReactionLogo;
