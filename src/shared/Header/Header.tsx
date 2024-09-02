import React from "react";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../shared/Sidebar/SidebarSlice";
import { PiSidebarSimpleThin } from "react-icons/pi";
import s from "./Header.module.scss";
import { CiLight } from "react-icons/ci";
type Props = {
  toggleSidebarOpen: () => void;
};



export default function Header({ toggleSidebarOpen }: Props) {
  return (
    <header className={s.appHeader}>
      <PiSidebarSimpleThin
        onClick={toggleSidebarOpen}
        className={s.sidebarToggle}
      />

      <CiLight className={s.changeTheme} />
    </header>
  );
}
