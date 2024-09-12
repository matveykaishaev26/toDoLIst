import s from "./Sidebar.module.scss";
import { typeSidebarTab } from "../../../types/types";
import SidebarTab from "./SidebarTab";
import SidebarMid from "./SidebarMid/SidebarMid";

type Props = {
  sidebarTabs: typeSidebarTab[];
  isSidebarOpen: boolean;
};

export default function Sidebar({ sidebarTabs, isSidebarOpen }: Props) {
  return (
    <div
      className={
        isSidebarOpen ? `${s.sidebar} ${s.open}` : `${s.sidebar} ${s.close}`
      }
    >
      <div className={s.sidebarTabs}>
        {sidebarTabs.slice(0, sidebarTabs.length / 2 + 1).map((tab) => (
          <SidebarTab tab={tab} />
        ))}
      </div>
      <SidebarMid />
      <div className={s.sidebarTabs}>
        {sidebarTabs
          .slice(sidebarTabs.length / 2 + 1, sidebarTabs.length)
          .map((tab) => (
            <SidebarTab tab={tab} />
          ))}
      </div>
    </div>
  );
}
