import React, { useState } from "react";
import { typeFolder } from "../../../../../types/typeFolder";
import s from "./SidebarMidTask.module.scss";
import MyInput from "../../../../../shared/MyInput/MyInput";
import ContextMenuMain, {
  typeContextMenuItem,
} from "../../../../../shared/ContextMenu/СontextMenuMain";
import { useContextMenu } from "../../../../../hooks/useContextMenu";
import ModalCreateTask from "../../../../../shared/Modal/ModalCreateTask/ModalCreateTask";
import { IconsService } from "../../../../../assets/icons/IconsService";
import Modal from "../../../../../shared/Modal/Modal";
import { useDeleteFolderMutation } from "../../../../../store/api/folderApi";
import { useUpdateFolderMutation } from "../../../../../store/api/folderApi";
type Props = {
  folder: typeFolder;
  onOpenFolder: (id: string) => void;
  isOpen?: boolean;
};

const SidebarMidFolder = ({ folder, onOpenFolder, isOpen }: Props) => {
  const { position, isVisible, setIsVisible, handleClickOption } =
    useContextMenu();

  const [deleteFolder, { isLoading: deleteIsLoading }] =
    useDeleteFolderMutation();
  const [updateFolder, { isLoading: updateIsLoading }] =
    useUpdateFolderMutation();

  const [newTitle, setNewTitle] = useState(folder.title);
  const [deleteFolderModal, setDeleteFolderModal] = useState(false);
  const [updateFolderModal, setUpdateFolderModal] = useState(false);
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const handleCreateTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCreateTaskModal(true);
    setIsVisible(false);
  };

  const handleDeleteFolder = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteFolderModal(true);
    setIsVisible(false);
  };

  const deleteItem = async () => {
    try {
      if (folder.id) {
        await deleteFolder(folder.id).unwrap();
      }
      console.log("Папка успешно удалена");
    } catch (err) {
      console.error("Ошибка при удалении папки:", err);
    }
  };

  const updateItem = async () => {
    try {
      if (folder.id) {
        await updateFolder({ id: folder.id, title: newTitle }).unwrap();
      }
      console.log("Папка успешно обновлена");
    } catch (err) {
      console.error("Ошибка при обновлении папки:", err);
    } 
    finally {
      setUpdateFolderModal(false);
    }
  };
  const contextMenuItems: typeContextMenuItem[] = [
    {
      id: "add",
      caption: "Добавить задачу",
      onClick: (e?: React.MouseEvent) =>
        handleCreateTask(e as React.MouseEvent),
    },
    {
      id: "edit",
      caption: "Редактировать",
      onClick: (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setUpdateFolderModal(true);
        setIsVisible(false);
      },
    },
    {
      id: "reform",
      caption: "Расформировать",
    },

    {
      id: "delete",
      caption: "Удалить",
      onClick: (e?: React.MouseEvent) =>
        handleDeleteFolder(e as React.MouseEvent),
      hover: "red",
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
          onClick={(e?: React.MouseEvent) => e && handleClickOption(e)}
          className={s.sidebarTasksOptions}
        />
      </div>
      {createTaskModal && (
        <ModalCreateTask
          defaultFolderId={folder.id}
          onClose={() => setCreateTaskModal((state) => !state)}
        />
      )}
      {deleteFolderModal && (
        <Modal
          title="Удаление папки"
          rejectBtn={{
            children: "Отмена",
            onClick: () => setDeleteFolderModal((state) => !state),
            disabled: deleteIsLoading ? true : false,
          }}
          acceptBtn={{
            children: "Удалить",
            onClick: deleteItem,
            color: "blue",
            disabled: deleteIsLoading ? true : false,
          }}
          children={`Вы действительно хотите удалить папку "${folder.title}"? Все задания в этой папке будут тоже удалены.`}
          onClose={() => setDeleteFolderModal((state) => !state)}
        />
      )}

      {updateFolderModal && (
        <Modal
          title="Редактирование"
          rejectBtn={{
            children: "Отмена",
            onClick: () => setUpdateFolderModal((state) => !state),
            disabled: updateIsLoading ? true : false,
          }}
          acceptBtn={{
            children: "Редактировать",
            onClick: updateItem,
            color: "blue",
            disabled: updateIsLoading ? true : newTitle === "" ? true : false,
          }}
          children={
            <>
              <MyInput
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={"Название"}
              />
            </>
          }
          onClose={() => setUpdateFolderModal((state) => !state)}
        />
      )}
    </ContextMenuMain>
  );
};

export default SidebarMidFolder;
