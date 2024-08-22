import s from "./Sidebar.module.scss";
import { NavLink } from "react-router-dom";
import { typeSidebarTabs } from "../../App";
import profileImage from "../../assets/images/profile.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
type Props = {
  sidebarTabs: typeSidebarTabs[];
};

export default function Sidebar({ sidebarTabs }: Props) {
  const isSidebarOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  return (
    <div className={s.sidebarContainer}>
      <div
        className={
          isSidebarOpen ? `${s.sidebar} ${s.open}` : `${s.sidebar} ${s.close}`
        }
      >
        <div className={s.sidebarTop}>
          <div className={s.profile}>
            <div className={s.profileContainer}>
              <img
                src={profileImage}
                alt="Profile"
                className={s.profileImage}
              />
            </div>
            <div className={s.profileName}>Tyler</div>
          </div>
        </div>
        <div className={s.sidebarTabs}>
          {sidebarTabs.map((tab) => (
            <NavLink
              to={tab.link}
              className={({ isActive }) =>
                isActive ? `${s.sidebarTab} ${s.active}` : s.sidebarTab
              }
            >
              <tab.icon size={24} className={s.icon} />

              {tab.value}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
