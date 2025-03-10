import React from "react";
import s from "./MyButton.module.scss";

type ButtonColor = "white" | "blue" | "tertiary"; // Пример возможных значений
export type buttonProps = {
  children?: string | JSX.Element | JSX.Element[];
  className?: string;
  color?: ButtonColor;
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;
};

export default function MyButton({
  children,
  className = " ",
  onClick,
  color,
  disabled,
}: buttonProps) {
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
