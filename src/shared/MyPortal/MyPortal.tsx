import React from "react";
import ReactDOM from "react-dom";
type Props = { children: React.ReactNode };

export default function MyPortal({ children }: Props) {
  return (
    <>
      {ReactDOM.createPortal(
        children,
        document.getElementById("root") as HTMLElement
      )}
    </>
  );
}
