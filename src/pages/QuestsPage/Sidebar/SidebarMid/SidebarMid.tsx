import React, { useState, useEffect } from "react";
import s from "./SidebarMid.module.scss";
import { typeTask } from "../../../../types/typeTask";
import { typeFolderWithTasks } from "../../../../types/typeFolderWithTasks";
import ModalCreateTask from "../../../../shared/Modal/ModalCreateTask/ModalCreateTask";
import { typeDropdownState } from "../../../../types/typeDropdownState";
import SidebarFolderList from "./SidebarFolderList/SidebarFolderList";
import { useGetAllTasksQuery } from "../../../../store/api/taskApi";
import { useGetAllFoldersQuery } from "../../../../store/api/folderApi";
import SidebarMidTask from "./SidebarMidTabs/SidebarMidTask";
import SkeletonList from "./SkeletonList/SkeletonList";
import Modal from "../../../../shared/Modal/Modal";
import MyInput from "../../../../shared/MyInput/MyInput";
import { useCreateFolderMutation } from "../../../../store/api/folderApi";
import { typeFolder } from "../../../../types/typeFolder";
import { IconsService } from "../../../../assets/icons/IconsService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import { openModal, closeModal } from "../../../../store/modalSlice";
const SidebarMid: React.FC = () => {
  const [isTasksListOpen, setTasksListOpen] = useState<boolean>(true);

  const [foldersWithTasks, setFoldersWithTasks] = useState<
    typeFolderWithTasks[]
  >([]);
  const [dropdownState, setDropdownState] = useState<typeDropdownState>([]);

  const dispatch = useDispatch();
  const modals = useSelector((state: RootState) => state.modal.modals);

  const [remainingTasks, setRemainingTasks] = useState<typeTask[]>([]);
  const {
    isLoading: foldersIsLoading,
    error: foldersError,
    data: allFolders,
  } = useGetAllFoldersQuery();

  const [
    createFolder,
    { isLoading: newFolderIsLoading, error: createFolderError },
  ] = useCreateFolderMutation();

  const {
    isLoading: tasksIsLoading,
    error: tasksError,
    data: allTasks,
  } = useGetAllTasksQuery();

  const [newFolder, setNewFolder] = useState<typeFolder | null>({ title: "" });

  useEffect(() => {
    if (allFolders && allTasks) {
      const foldersWithTasksResult = allFolders.map((item) => ({
        folder: item,
        tasks: allTasks.filter((task) => task.folder_id === item.id),
      }));
      setFoldersWithTasks(foldersWithTasksResult as typeFolderWithTasks[]);

      setRemainingTasks(allTasks.filter((item) => item.folder_id === null));
    }
  }, [allFolders, allTasks]);

  useEffect(() => {
    if (allFolders && allTasks) {
      const foldersWithTasksResult = allFolders.map((item) => ({
        folder: item,
        tasks: allTasks.filter((task) => task.folder_id === item.id),
      }));
      setFoldersWithTasks(foldersWithTasksResult as typeFolderWithTasks[]);
    }
  }, []);

  const toggleDropdown = (index: string) => {
    setDropdownState((prev: typeDropdownState) =>
      prev[index] ? { ...prev, [index]: false } : { ...prev, [index]: true }
    );
  };

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
      {tasksIsLoading || foldersIsLoading ? (
        <div className={s.sidebarTasksList}>
          <SkeletonList />
        </div>
      ) : (
        isTasksListOpen &&
        allTasks &&
        allFolders && (
          <div className={s.sidebarTasksList}>
            {foldersWithTasks.map((item) => {
              return (
                <SidebarFolderList
                  key={item.folder.id}
                  folderWithTasks={item}
                  isOpen={
                    (item.folder.id !== null &&
                      dropdownState[item.folder.id ?? ""]) ||
                    false
                  }
                  onOpenFolder={() => toggleDropdown(item.folder.id ?? "")}
                />
              );
            })}

            {remainingTasks.length > 0 && (
              <>
                {remainingTasks.map((task: typeTask) => (
                  <SidebarMidTask key={task.id} task={task} />
                ))}
              </>
            )}
          </div>
        )
      )}
      {foldersError ? <div>err</div> : null}

      {tasksError ? <div>err</div> : null}
      {modals.createList && (
        <ModalCreateTask
          isOpen={modals.createList}
          onClose={() => dispatch(closeModal("createList"))}
        />
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
                placeholder={"Имя"}
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
