import React from "react";
import { typeFolder } from "../../../../../types/typeFolder";
import s from "./SidebarMidTask.module.scss";

import ContextMenuMain from "../../../../../shared/ContextMenu/СontextMenuMain";
import { useContextMenu } from "../../../../../hooks/useContextMenu";
import ModalCreateTask from "../../../../../shared/Modal/ModalCreateTask/ModalCreateTask";
import { IconsService } from "../../../../../assets/icons/IconsService";
import Modal from "../../../../../shared/Modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import { closeModal, openModal } from "../../../../../store/modalSlice";
import { RootState } from "../../../../../store/store";
import { useDeleteFolderMutation } from "../../../../../store/api/folderApi";
import MyInput from "../../../../../shared/MyInput/MyInput";
type Props = {
  folder: typeFolder;
  onOpenFolder: (id: string) => void;
  isOpen?: boolean;
};

const SidebarMidFolder = ({ folder, onOpenFolder, isOpen }: Props) => {
  const { position, isVisible, setIsVisible, handleClickOption } =
    useContextMenu();

  const dispatch = useDispatch();
  const modals = useSelector((state: RootState) => state.modal.modals);
  const [deleteFolder, { isLoading }] = useDeleteFolderMutation();

  const handleCreateTask = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openModal(`createFolder_${folder.id}`));
    setIsVisible(false);
  };

  const handleDeleteFolder = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openModal(`deleteFolder_${folder.id}`));
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
    dispatch(closeModal(`deleteFolder_${folder.id}`));
  };

  const contextMenuItems = [
    {
      id: "delete",
      caption: "Удалить",
      onClick: (e: React.MouseEvent) =>
        handleDeleteFolder(e as React.MouseEvent),
    },
    {
      id: "edit",
      caption: "Редактировать",
      onClick: (e?: React.MouseEvent) => {
        e?.stopPropagation();
        dispatch(openModal(`editFolder_${folder.id}`));
        setIsVisible(false);
      },
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
          onClick={(e?: React.MouseEvent) => e && handleClickOption(e)}
          className={s.sidebarTasksOptions}
        />
      </div>
      {modals[`createFolder_${folder.id}`] && (
        <ModalCreateTask
          isOpen={modals.createTask}
          defaultFolderId={folder.id}
          onClose={() => dispatch(closeModal(`createFolder_${folder.id}`))}
        />
      )}
      {modals[`deleteFolder_${folder.id}`] && (
        <Modal
          rejectBtn={{
            children: "Отмена",
            onClick: () => dispatch(closeModal(`deleteFolder_${folder.id}`)),
            disabled: isLoading ? true : false,
          }}
          acceptBtn={{
            children: "Удалить",
            onClick: deleteItem,
            color: "blue",
            disabled: isLoading ? true : false,
          }}
          children={`Вы действительно хотите удалить папку "${folder.title}"? Все задания в этой папке будут тоже удалены.`}
          onClose={() => dispatch(closeModal(`deleteFolder_${folder.id}`))}
        />
      )}
      {modals[`editFolder_${folder.id}`] && (
        <Modal
          rejectBtn={{
            children: "Отмена",
            onClick: () => dispatch(closeModal(`editFolder_${folder.id}`)),
            disabled: isLoading ? true : false,
          }}
          acceptBtn={{
            children: "Изменить",
            onClick: deleteItem,
            color: "blue",
            disabled: isLoading ? true : false,
          }}
          children={<MyInput placeholder="Название папки" />}
          onClose={() => dispatch(closeModal(`editFolder_${folder.id}`))}
          title="Новое название"
        />
      )}
    </ContextMenuMain>
  );
};

export default SidebarMidFolder;
