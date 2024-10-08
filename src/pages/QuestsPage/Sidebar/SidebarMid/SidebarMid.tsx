import React, { useState, useEffect } from "react";
import s from "./SidebarMid.module.scss";
import { FaChevronDown } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { typeTask } from "../../../../types/typeTask";
import { typeFolderWithTasks } from "../../../../types/typeFolderWithTasks";
import ModalCreateTask from "../../../../shared/Modal/ModalCreateTask/ModalCreateTask";
import { typeDropdownState } from "../../../../types/typeDropdownState";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import SidebarFolderList from "./SidebarFolderList/SidebarFolderList";
import { useGetAllTasksQuery } from "../../../../store/api/taskApi";
import { useGetAllFoldersQuery } from "../../../../store/api/folderApi";
import SidebarMidTask from "./SidebarMidTabs/SidebarMidTask";
import SkeletonList from "./SkeletonList/SkeletonList";
import Modal from "../../../../shared/Modal/Modal";
import MyInput from "../../../../shared/MyInput/MyInput";
import { useCreateFolderMutation } from "../../../../store/api/folderApi";
import { typeFolder } from "../../../../types/typeFolder";

const SidebarMid: React.FC = () => {
  const [isTasksListOpen, setTasksListOpen] = useState<boolean>(true);
  const [isCreateListModalOpen, setIsCreateListModalOpen] =
    useState<boolean>(false);
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] =
    useState<boolean>(false);
  const [foldersWithTasks, setFoldersWithTasks] = useState<
    typeFolderWithTasks[]
  >([]);
  const [dropdownState, setDropdownState] = useState<typeDropdownState>([]);

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
    setIsCreateListModalOpen((prev) => !prev);
  };

  const createNewFolder = async () => {
    try {
      await createFolder(newFolder!);
      setIsCreateFolderModalOpen((prev) => !prev);
      setNewFolder({ title: "" });
    } catch (error) {
      console.log(error);
    }
  };
  const toggleCreateFolderModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsCreateFolderModalOpen((prev) => !prev);
  };

  const toggleTasksList = () => {
    setTasksListOpen((prev) => !prev);
    console.log(isTasksListOpen);
  };

  return (
    <div className={s.sidebarMid}>
      <div onClick={toggleTasksList} className={s.sidebarListBtn}>
        <div className={s.sidebarIconWrapper}>
          <FaChevronDown
            className={`${s.dropdownIcon} ${isTasksListOpen ? s.active : ""}`}
          />
          Список
        </div>
        <div className={s.sidebarIconWrapper}>
          <MdOutlineCreateNewFolder
            onClick={toggleCreateFolderModal}
            className={s.plusIcon}
          />
          <GoPlus onClick={toggleCreateListModal} className={s.plusIcon} />
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

      <ModalCreateTask
        isOpen={isCreateListModalOpen}
        onClose={() => setIsCreateListModalOpen((prev) => !prev)}
      />
      <Modal
        title={"Новая папка"}
        onClose={() => setIsCreateFolderModalOpen((prev) => !prev)}
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
        isOpen={isCreateFolderModalOpen}
        acceptBtn={{
          children: "Добавить",
          color: "blue",
          onClick: createNewFolder,
          disabled: newFolderIsLoading,
        }}
        rejectBtn={{
          children: "Отмена",
          disabled: newFolderIsLoading,

          onClick: () => setIsCreateFolderModalOpen((prev) => !prev),
        }}
      />
    </div>
  );
};

export default SidebarMid;
