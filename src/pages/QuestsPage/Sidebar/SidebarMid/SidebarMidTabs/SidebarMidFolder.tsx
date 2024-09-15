import React from "react";
import { SlOptions } from "react-icons/sl";
import { typeFolder } from "../../../../../types/types";
import s from "./SidebarMidTask.module.scss";
import { FaRegFolder } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";
type Props = {
  folder: typeFolder;
  onOpenFolder: (id: number) => void;
  isOpen?: boolean;
};

const SidebarMidFolder = ({ folder,  onOpenFolder, isOpen }: Props) => {
  return (
    <div  
      onClick={() => onOpenFolder(folder.id)}
      className={s.tab}
      key={folder.id}
    >
      <div className={s.iconWrapper}>
        {isOpen ? (
          <FaRegFolderOpen className={s.tabIcon} />
        ) : (
          <FaRegFolder className={s.tabIcon} />
        )}
       <div className={s.taskTitle}>{folder.title} </div>
      </div>
      <SlOptions className={s.sidebarTasksOptions} />
    </div>
  );
};

export default SidebarMidFolder;
