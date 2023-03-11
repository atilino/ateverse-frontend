import { Modal } from "antd";
import React from "react";

function GenericModal({ footer = null, ...props }) {
  return (
    <Modal {...props} width="80%" footer={footer}>
      {props.children}
    </Modal>
  );
}

export default GenericModal;
