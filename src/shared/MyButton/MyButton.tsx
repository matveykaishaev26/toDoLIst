import React, { Children } from "react";
import s from "./MyButton.module.scss";

type ButtonColor = "white" | "blue" | "tertiary"; // Пример возможных значений
type Props = {
  children?: string | JSX.Element | JSX.Element[];
  className?: string;
  color?: ButtonColor;
  onClick?: () => void;
  disabled?: boolean;
};

export default function MyButton({
  children,
  className = " ",
  onClick,
  color,
  disabled,
}: Props) {
  const colorClass = color && s[color];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${s.myButton} ${colorClass} ${className}`}
    >
      {children}
    </button>
  );
}
