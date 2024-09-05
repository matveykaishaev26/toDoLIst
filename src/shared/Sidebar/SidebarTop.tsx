import React from "react";
import s from "./Sidebar.module.scss";
import profileImage from "../../assets/images/profile.jpg";
import { useSelector } from "react-redux";
import {RootState} from '../../store/store'
type Props = {};

const SidebarTop = (props: Props) => {
  const { name } = useSelector((state: RootState) => state.user);
  return (
    <div className={s.sidebarTop}>
      <div className={s.profile}>
        <div className={s.profileContainer}>
          <img src={profileImage} alt="Profile" className={s.profileImage} />
        </div>
        <div className={s.profileName}>{name}</div>
      </div>
    </div>
  );
};

export default SidebarTop;
