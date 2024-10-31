import React, { forwardRef } from "react";
import s from "./MyInput.module.scss";
import TextareaAutosize from "react-textarea-autosize";

type Props = {
  placeholder: string;
  className?: string;
  type?: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  disabled?: boolean;
  autoComplete?: string;
  isAutosize?: boolean;
  onClick?: (e?: React.MouseEvent) => void;
};

const MyInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  (
    {
      placeholder,
      className,
      type = "text",
      value,
      onChange,
      disabled,
      isAutosize = false,
      autoComplete,
      onClick,
    },
    ref
  ) => {
    if (isAutosize) {
      return (
        <TextareaAutosize
          className={`${s.myInput} ${className ? className : ""}`}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          onClick={onClick}
          ref={ref as React.Ref<HTMLTextAreaElement>}
        />
      );
    } else {
      return (
        <input
          className={`${s.myInput} ${className ? className : ""}`}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          onClick={onClick}
          ref={ref as React.Ref<HTMLInputElement>}
        />
      );
    }
  }
);

export default MyInput;
