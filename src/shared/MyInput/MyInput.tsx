import React from "react";
import s from "./MyInput.module.scss";
type Props = {
  placeholder: string;
  className?: string;
};

function MyInput({ placeholder, className }: Props) {
  return (
    <input
      className={`${s.myInput} ${className ? className : ""}`}
      type="text"
      placeholder={placeholder}
    />
  );
}

export default MyInput;
