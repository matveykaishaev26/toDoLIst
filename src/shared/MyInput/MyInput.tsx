import React from "react";
import s from "./MyInput.module.scss";
import TextareaAutosize from "react-textarea-autosize";
type Props = {
  placeholder: string;
  className?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;
  isAutosize?: boolean;
};

function MyInput({
  placeholder,
  className,
  type = "text",
  value,
  onChange,
  disabled,
  isAutosize = false,
  autoComplete,
}: Props) {
  if (isAutosize) {
    return (
      <TextareaAutosize
        className={`${s.myInput} ${className ? className : ""}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
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
      />
    );
  }
}

export default MyInput;
