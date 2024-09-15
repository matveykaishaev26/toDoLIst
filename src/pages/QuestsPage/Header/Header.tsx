import React from "react";
import { PiSidebarSimpleThin } from "react-icons/pi";
import s from "./Header.module.scss";
import { CiLight } from "react-icons/ci";
import useTheme from "../../../hooks/useTheme";
type Props = {
  toggleSidebarOpen: () => void;
};

export default function Header({ toggleSidebarOpen }: Props) {
  const { toggleThemeMode } = useTheme();
  return (
    <header className={s.appHeader}>
      <PiSidebarSimpleThin
        onClick={toggleSidebarOpen}
        className={s.sidebarToggle}
      />

      <CiLight onClick={toggleThemeMode} className={s.changeTheme} />
    </header>
  );
}
