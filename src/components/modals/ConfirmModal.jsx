import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

/**
 *
 * @param {import('./types').ConfirmModalProps} props
 */
function ConfirmModal(
  props = {
    okText: "Si",
    okType: "danger",
    cancelText: "No",
    icon: <ExclamationCircleOutlined />,
  }
) {
  return Modal.confirm(props);
}

export default ConfirmModal;
