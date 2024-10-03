import React from "react";
import { SlOptions } from "react-icons/sl";
import { typeFolder } from "../../../../../types/types";
import s from "./SidebarMidTask.module.scss";
import { FaRegFolder } from "react-icons/fa";
import { FaRegFolderOpen } from "react-icons/fa";
import ContextMenuMain from "../../../../../shared/ContextMenu/СontextMenuMain";
import { useContextMenu } from "../../../../../hooks/useContextMenu";
import { useState } from "react";
import ModalCreateTask from "../../../../../shared/Modal/ModalCreateTask/ModalCreateTask";
type Props = {
  folder: typeFolder;
  onOpenFolder: (id: number) => void;
  isOpen?: boolean;
};

const SidebarMidFolder = ({ folder, onOpenFolder, isOpen }: Props) => {
  const { position, setPosition, isVisible, setIsVisible, handleClickOption } =
    useContextMenu();
  const [isModalCreateListOpen, setIsModalCreateListOpen] =
    useState<boolean>(false);

  const handleCreateTask = (e) => {
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
      onClick: (e) => handleCreateTask(e),
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
        <SlOptions
          onClick={(e: React.MouseEvent) => handleClickOption(e)}
          className={s.sidebarTasksOptions}
        />
        {isModalCreateListOpen && (
          <div className={s.modalCreateList}>sdfsdf</div>
        )}
      </div>
      <ModalCreateTask
        defaultFolderId={folder.id}
        isOpen={isModalCreateListOpen}
        onClose={() => setIsModalCreateListOpen(false)}
      />
    </ContextMenuMain>
  );
};

export default SidebarMidFolder;
