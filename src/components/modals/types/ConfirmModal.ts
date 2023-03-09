import { ModalFuncProps } from "antd";

export type ConfirmModalProps = {
  okText?: string;
  okType?: string;
  cancelText?: string;
  icon?: React.ReactNode;
} & ModalFuncProps;
