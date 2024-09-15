import React from "react";
import s from "./MainSidebar.module.scss";
import tyler from "../../assets/images/profile.jpg";
import { typeSidebarTab } from "../../types/types";
import { NavLink } from "react-router-dom";

type Props = {
  tabs: typeSidebarTab[];
};

export default function MainSidebar({ tabs }: Props) {
  return (
    <div className={s.mainSidebar}>
      <img className={s.profilePicture} src={tyler} alt="tyler" />
      <div className={s.mainTabs}>
        <div className={s.mainTabsWrapper}>
          {tabs.slice(0, tabs.length / 2).map((item) => (
            <NavLink
              
              key={item.value} // переместим key на корневой элемент
              to={item.link}
              className={({ isActive }) =>
                isActive ? `${s.mainTab} ${s.active}` : s.mainTab
              }
            >
              <item.icon />
            </NavLink>
          ))}
        </div>
        <div className={s.mainTabsWrapper}>
          {tabs.slice(tabs.length / 2, tabs.length).map((item) => (
            <item.icon className={s.mainTab} key={item.value} />
          ))}
        </div>
      </div>
    </div>
  );
}
