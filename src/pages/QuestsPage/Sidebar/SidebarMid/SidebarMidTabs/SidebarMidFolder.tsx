import React from "react";
import { typeFolder } from "../../../../../types/typeFolder";
import s from "./SidebarMidTask.module.scss";

import ContextMenuMain from "../../../../../shared/ContextMenu/СontextMenuMain";
import { useContextMenu } from "../../../../../hooks/useContextMenu";
import { useState } from "react";
import ModalCreateTask from "../../../../../shared/Modal/ModalCreateTask/ModalCreateTask";
import { IconsService } from "../../../../../assets/icons/IconsService";
type Props = {
  folder: typeFolder;
  onOpenFolder: (id: string) => void;
  isOpen?: boolean;
};

const SidebarMidFolder = ({ folder, onOpenFolder, isOpen }: Props) => {
  const { position, isVisible, setIsVisible, handleClickOption } =
    useContextMenu();
  const [isModalCreateListOpen, setIsModalCreateListOpen] =
    useState<boolean>(false);

  const handleCreateTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalCreateListOpen((prev) => !prev);
    setIsVisible(false);
    console.log(isModalCreateListOpen);
  };

  const contextMenuItems = [
    {
      id: "open",
      caption: "Удалить",
    },
    {
      id: "reform",
      caption: "Расформировать",
    },
    {
      id: "add",
      caption: "Добавить задачу",
      onClick: (e?: React.MouseEvent) =>
        handleCreateTask(e as React.MouseEvent),
    },
  ];

  return (
    <ContextMenuMain
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={contextMenuItems}
      defaultPosition={position}
      id={folder.title}
    >
      <div
        onClick={() => folder.id && onOpenFolder(folder.id)}
        className={s.tab}
        key={folder.id}
      >
        <div className={s.iconWrapper}>
          {isOpen ? (
            <IconsService iconName="folder_open" className={s.tabIcon} />
          ) : (
            <IconsService iconName="folder_close" className={s.tabIcon} />
          )}
          <div className={s.taskTitle}>{folder.title} </div>
        </div>
        <IconsService
          iconName="options"
          onClick={(e?: React.MouseEvent) => e &&
            handleClickOption(e)
          }
          className={s.sidebarTasksOptions}
        />
       
      </div>
      {isModalCreateListOpen && (
        <ModalCreateTask
          isOpen={isModalCreateListOpen}
          defaultFolderId={folder.id}
          onClose={() =>  setIsModalCreateListOpen((prev) => !prev)}
        />
      )}
    </ContextMenuMain>
  );
};

export default SidebarMidFolder;
