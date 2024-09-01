import React, { Children } from "react";
import s from "./MyButton.module.scss";

type ButtonColor = "white" | "blue" | "tertiary"; // Пример возможных значений
type Props = {
  children?: string;
  className?: string;
  color?: ButtonColor;
  onClick?: () => void;
};

export default function MyButton({
  children,
  className = " ",
  onClick,
  color,
}: Props) {
  const colorClass = color && s[color];
  console.log(color);

  return (
    <button
      onClick={onClick}
      className={`${s.myButton} ${colorClass} ${className}`}
    >
      {children}
    </button>
  );
}
