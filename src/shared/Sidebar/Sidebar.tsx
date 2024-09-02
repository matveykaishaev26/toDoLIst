import s from "./Sidebar.module.scss";
import { typeSidebarTab } from "../../App";
import SidebarTab from "./SidebarTab";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import SidebarMid from "./SidebarMid/SidebarMid";
import { useState } from "react";
import ModalCreateTask from "../Modal/ModalCreateTask/ModalCreateTask";
import MyPortal from "../MyPortal/MyPortal";
import SidebarTop from "./SidebarTop";
import { useEffect } from "react";
import { typeFolder, typeTask } from "../../types/types";
type Props = {
  sidebarTabs: typeSidebarTab[];
  isSidebarOpen: boolean;
};

export default function Sidebar({
  sidebarTabs,
  isSidebarOpen,
}: Props) {
  const [isCreateListModalOpen, setIsCreateListModalOpen] =
    useState<boolean>(false);

  const toggleCreateListModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsCreateListModalOpen((prev) => !prev);
  };

  const toggleListModalOpen = () => {
    setIsCreateListModalOpen((prev) => !prev);
  };
  const toggleTasksList = () => {
    setTasksListOpen((prev) => !prev);
  };

  return (
    <div
      className={
        isSidebarOpen ? `${s.sidebar} ${s.open}` : `${s.sidebar} ${s.close}`
      }
    >
      <SidebarTop />
      <div className={s.sidebarTabs}>
        {sidebarTabs.map((tab) => (
          <SidebarTab tab={tab} />
        ))}
      </div>
      <SidebarMid />
    </div>
  );
}
