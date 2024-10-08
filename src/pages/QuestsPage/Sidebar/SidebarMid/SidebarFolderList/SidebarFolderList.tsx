import React from "react";
import { typeFolderWithTasks } from "../../../../../types/typeFolderWithTasks";
import SidebarMidFolder from "../SidebarMidTabs/SidebarMidFolder";
import SidebarMidTask from "../SidebarMidTabs/SidebarMidTask";
import { typeTask } from "../../../../../types/typeTask"
import s from "./SidebarFolderList.module.scss";
type Props = {
  folderWithTasks: typeFolderWithTasks;
  onOpenFolder: (folderId: string) => void;
  isOpen: boolean;
};

export default function SidebarFolderList({
  folderWithTasks,
  onOpenFolder,
  isOpen,
}: Props) {
  return (
    <div className={s.sidebarFolderTasks}>
      <SidebarMidFolder
        isOpen={isOpen}
        key={folderWithTasks.folder.id}
        folder={folderWithTasks.folder}
        onOpenFolder={onOpenFolder}
      />
      {folderWithTasks.tasks.length > 0 && isOpen && (
        <div className={s.sidebarTasksListContainer}>
          {folderWithTasks.tasks.map((task: typeTask) => (
            <SidebarMidTask key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}
