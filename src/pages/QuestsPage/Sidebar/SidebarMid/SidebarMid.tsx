import React, { useState } from "react";
import s from "./SidebarMid.module.scss";

import ModalCreateTask from "../../../../shared/Modal/ModalCreateTask/ModalCreateTask";

import MyInput from "../../../../shared/MyInput/MyInput";
import { useCreateFolderMutation } from "../../../../store/api/folderApi";
import { IconsService } from "../../../../assets/icons/IconsService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { openModal, closeModal } from "../../../../store/modalSlice";
import { typeCreateFolderPayload } from "../../../../types/typeFolder";
import Modal from "../../../../shared/Modal/Modal";

import TaskList from "./TaskList/TaskList";
const SidebarMid: React.FC = () => {
  const [isTasksListOpen, setTasksListOpen] = useState<boolean>(true);

  const dispatch = useDispatch();
  const modals = useSelector((state: RootState) => state.modal.modals);

  const [
    createFolder,
    { isLoading: newFolderIsLoading, error: createFolderError },
  ] = useCreateFolderMutation();

  const [newFolder, setNewFolder] = useState<typeCreateFolderPayload | null>({
    title: "",
  });

  const toggleCreateListModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    dispatch(openModal("createList"));
  };

  const createNewFolder = async () => {
    try {
      await createFolder(newFolder!);
      dispatch(closeModal("createFolder"));

      setNewFolder({ title: "" });
    } catch (error) {
      console.log(error);
    }
  };
  const toggleCreateFolderModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(openModal("createFolder"));
  };

  const toggleTasksList = () => {
    setTasksListOpen((prev) => !prev);
    console.log(isTasksListOpen);
  };

  return (
    <div className={s.sidebarMid}>
      <div onClick={toggleTasksList} className={s.sidebarListBtn}>
        <div className={s.sidebarIconWrapper}>
          <IconsService
            iconName="dropdown_icon"
            className={`${s.dropdownIcon} ${isTasksListOpen ? s.active : ""}`}
          />
          Список
        </div>
        <div className={s.sidebarIconWrapper}>
          <IconsService
            iconName="create_new_folder"
            onClick={(e?: React.MouseEvent) => e && toggleCreateFolderModal(e)}
            className={s.plusIcon}
          />
          <IconsService
            iconName="plus"
            onClick={(e?: React.MouseEvent) => e && toggleCreateListModal(e)}
            className={s.plusIcon}
          />
        </div>
      </div>

      <TaskList isTasksListOpen={isTasksListOpen} />
      {modals.createList && (
        <ModalCreateTask onClose={() => dispatch(closeModal("createList"))} />
      )}

      {modals.createFolder && (
        <Modal
          title={"Новая папка"}
          onClose={() => dispatch(closeModal("createFolder"))}
          children={
            <>
              <MyInput
                value={newFolder?.title}
                onChange={(e) =>
                  setNewFolder((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder={"Название"}
              />
              {createFolderError ? <div>err</div> : null}
            </>
          }
          acceptBtn={{
            children: "Добавить",
            color: "blue",
            onClick: createNewFolder,
            disabled: newFolderIsLoading,
          }}
          rejectBtn={{
            children: "Отмена",
            disabled: newFolderIsLoading,

            onClick: () => dispatch(closeModal("createFolder")),
          }}
        />
      )}
    </div>
  );
};

export default SidebarMid;
