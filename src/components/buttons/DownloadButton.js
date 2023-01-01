
import { DownloadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

/**
 * @callback onDownloadFunction
 * @returns {Promise<string>}
 */

/**
 * @param {object} props
 * @param {ReactNode} props.children
 * @param {boolean} props.disabled
 * @param {string} props.filename
 * @param {string} props.ext
 * @param {string} props.mimetype
 * @param {onDownloadFunction} props.onDownload
 * @returns {React.Component}
 */
function DownloadButton({ children, disabled, filename, ext, mimetype, onDownload }) {

  const handleClick = async (e) => {
    e.preventDefault()

    onDownload()
      .then(file => {
        const link = document.createElement("a")
        link.href  = `data:${mimetype};base64,${file}`
        link.download = `${filename}.${ext}`
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
      disabled={disabled}
      >
      {children}
    </Button>
  );
}

export default DownloadButton