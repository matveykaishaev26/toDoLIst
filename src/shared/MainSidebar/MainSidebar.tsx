import React from "react";
import s from "./MainSidebar.module.scss";
import tyler from "../../assets/images/profile.jpg";
import { typeSidebarTab } from "../../types/types";

type Props = {
  tabs: typeSidebarTab[];
};

export default function MainSidebar({ tabs }: Props) {
  return (
    <div className={s.mainSidebar}>
      <img className={s.profilePicture} src={tyler} alt="tyler" />
      <div className={s.mainTabs}>
        <div className={s.mainTabsWrapper}>
          {tabs.map((item) => (
            <item.icon className={s.mainTab} />
          ))}
        </div>
      </div>
    </div>
  );
}
