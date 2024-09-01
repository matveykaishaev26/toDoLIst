import React from "react";
import s from "./Sidebar.module.scss";
import profileImage from "../../assets/images/profile.jpg";
type Props = {};

const SidebarTop = (props: Props) => {
  return (
    <div className={s.sidebarTop}>
      <div className={s.profile}>
        <div className={s.profileContainer}>
          <img src={profileImage} alt="Profile" className={s.profileImage} />
        </div>
        <div className={s.profileName}>Tyler</div>
      </div>
    </div>
  );
};

export default SidebarTop;
