import React from "react";
import { SlOptions } from "react-icons/sl";
import { typeFolder } from "../../../../types/types";
import s from "./SidebarMidFolder.module.scss";
import { FaRegFolder } from "react-icons/fa";
type Props = {
  folder: typeFolder;
  onClick: (id: number) => void;
};

const SidebarMidFolder = ({ folder, onClick }: Props) => {
  return (
    <div
      onClick={() => onClick(folder.id)}
      className={s.sidebarTasksFolder}
      key={folder.id}
    >
      <div className={s.sidebarTasksWrapper}>
        <FaRegFolder className={s.sidebarTasksListIcon} />
        {folder.title}
      </div>
      <div className={s.taskColor}></div>
      <SlOptions className={s.sidebarTasksOptions} />
    </div>
  );
};

export default SidebarMidFolder;
