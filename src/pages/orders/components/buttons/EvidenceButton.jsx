
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { storage } from 'services/index';

function EvidenceButton({ orderId, accountId, accountName, enabled }) {

  const handleClick = async (e) => {
    e.preventDefault()
    storage.getEvidence(orderId, accountId)
      .then((data) => {
        const file = data.body
        const link = document.createElement("a")
        link.href  = `data:image/png;base64,${file}`
        link.download = `${accountName}.png`
        link.click()
      })
  }
  return (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      shape='round'
      size='middle'
      onClick={handleClick}
      disabled={!enabled}
      >
      Descargar
    </Button>
  );
}

export default EvidenceButton;