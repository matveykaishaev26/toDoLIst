import React from "react";
import s from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { typeSidebarTab } from "../../App";

type Props = {
  tab: typeSidebarTab;
};

const SidebarTab = ({ tab }: Props) => {
  return (
    <NavLink
      to={tab.link}
      key={tab.link}
      className={({ isActive }) =>
        isActive ? `${s.sidebarTab} ${s.active}` : s.sidebarTab
      }
    >
      <tab.icon className={s.icon} />
      {tab.value}
    </NavLink>
  );
};

export default SidebarTab;
