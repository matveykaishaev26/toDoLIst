import React, { useEffect } from "react";
import s from "./Modal.module.scss";
import { GrClose } from "react-icons/gr";
import MyPortal from "../MyPortal/MyPortal";
import MyButton from "../MyButton/MyButton";
import { buttonProps } from "../MyButton/MyButton";
type Props = {
  acceptBtn?: buttonProps;
  rejectBtn?: buttonProps;
  children?: React.ReactNode;
  onClose?: () => void;
  isOpen: boolean;
  title?: string;
};

export default function Modal({
  title,
  children,
  onClose,
  isOpen,
  acceptBtn,
  rejectBtn,
}: Props) {

  return (
    isOpen  &&   (
      <MyPortal>
        <dialog  className={s.modal}>
          <div className={s.modalContent}>
            <div className={s.closeWrapper}>
              <GrClose onClick={onClose} className={s.close} />
            </div>
            <div className={s.modalTitle}>{title}</div>
            <div className={s.modalBody}>{children}</div>
            <div className={s.btnContainer}>
              {rejectBtn && <MyButton {...rejectBtn} />}
              {acceptBtn && <MyButton {...acceptBtn} />}
            </div>
          </div>
        </dialog>
      </MyPortal>
    )
  );
}
