import React from "react";
import s from "./MyInput.module.scss";
type Props = {
  placeholder: string;
  className?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoComplete?: string;  
};

function MyInput({
  placeholder,
  className,
  type = "text",
  value,
  onChange,
  disabled,
  autoComplete,
}: Props) {
  return (
    <input
      className={`${s.myInput} ${className ? className : ""}`}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      autoComplete={autoComplete}
    />
  );
}

export default MyInput;
