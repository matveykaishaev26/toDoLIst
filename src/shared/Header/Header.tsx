import React from "react";
import { useDispatch} from "react-redux";
import { toggleSidebar } from "../../shared/Sidebar/SidebarSlice";
import { PiSidebarSimpleThin } from "react-icons/pi";
import s from "./Header.module.scss";
import { CiLight } from "react-icons/ci";
type Props = {};

export default function Header({}: Props) {
  const dispatch = useDispatch();
  return (
    <header className={s.appHeader}>
      <PiSidebarSimpleThin
        onClick={() => dispatch(toggleSidebar())}
        className={s.sidebarToggle}
      />

      <CiLight className={s.changeTheme} />
    </header>
  );
}
