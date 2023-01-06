
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
function DownloadButton({ children, disabled, filename, ext, href, onDownload }) {

  const handleClick = async (e) => {
    e.preventDefault()
    if (href) {
      const link = document.createElement("a")
      link.href = href
      link.download = `${filename}.${ext}`
      link.click()
      return
    }
    onDownload()
      .then(href => {
        const link = document.createElement("a")
        link.href = href
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