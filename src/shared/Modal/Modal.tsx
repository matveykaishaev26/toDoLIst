import React from "react";
import s from "./Modal.module.scss";
import { GrClose } from "react-icons/gr";
type Props = {
  children?: React.ReactNode;
  onClose?: () => void;
};

export default function Modal({ children, onClose }: Props) {
  return (
    <div className={s.modal}>
      <div className={s.modalContent}>
        <div className={s.closeWrapper}>
        <GrClose onClick={onClose} className={s.close} />
        </div>

        <div className={s.modalBody}>{children}</div>
      </div>
    </div>
  );
}
