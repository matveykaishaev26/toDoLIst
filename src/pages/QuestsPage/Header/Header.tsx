import React from "react";
import { PiSidebarSimpleThin } from "react-icons/pi";
import s from "./Header.module.scss";
import { CiLight } from "react-icons/ci";
import useTheme from "../../../hooks/useTheme";
type Props = {
  toggleSidebarOpen: () => void;
  pageName?: string;
};

export default function Header({ toggleSidebarOpen, pageName }: Props) {
  const { toggleThemeMode } = useTheme();
  return (
    <header className={s.appHeader}>
      <div className={s.wrapper}>
        <div className={s.iconWrapper}>
          <PiSidebarSimpleThin
            onClick={toggleSidebarOpen}
            className={s.sidebarToggle}
          />
        </div>
        <div className={s.pageName}>{pageName}</div>
      </div>
      <div className={s.wrapper}>
        <div className={s.iconWrapper}>
          <CiLight onClick={toggleThemeMode} className={s.changeTheme} />
        </div>
      </div>
    </header>
  );
}
