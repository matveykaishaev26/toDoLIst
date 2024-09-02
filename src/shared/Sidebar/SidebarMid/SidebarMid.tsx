import React, { useState, useEffect } from "react";
import s from "./SidebarMid.module.scss";
import { FaChevronDown } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { typeTask, typeFolder } from "../../../types/types";
import SidebarMidTask from "./SidebarMidTask/SidebarMidTask";

import ModalCreateTask from "../../Modal/ModalCreateTask/ModalCreateTask";
import MyPortal from "../../MyPortal/MyPortal";
import useFetch from "../../../hooks/useFetch";
import { typeFolderWithTasks } from "../../../types/types";
import { typeDropdownState } from "../../../types/types";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import SidebarFolderList from "../SidebarMid/SidebarFolderList/SidebarFolderList";
import { useGetAllFoldersQuery } from "../../../service/folderService";
const SidebarMid: React.FC = () => {
  const [isTasksListOpen, setTasksListOpen] = useState<boolean>(false);
  const [isCreateListModalOpen, setIsCreateListModalOpen] =
    useState<boolean>(false);

  const {
    data: tasks,
    loading: tasksLoading,
    error: tasksError,
  } = useFetch<typeTask[]>("http://localhost:5000/task");

  // const {
  //   data: folders,
  //   loading: foldersLoading,
  //   error: foldersError,
  // } = useFetch<typeFolder[]>("http://localhost:5000/folder");
  const [dropdownState, setDropdownState] = useState<typeDropdownState>({});

  const { data: folders, error, isLoading } = useGetAllFoldersQuery();

  useEffect(() => {
    if (folders && tasks) {
      const obj = folderWithTasks.reduce((acc, item, index) => {
        acc[index] = false;
        return acc;
      }, {} as typeDropdownState);
      setDropdownState(obj);
    }
  }, [folders, tasks]);

  const toggleDropdown = (index: number) => {
    setDropdownState((prev) =>
      prev[index] ? { ...prev, [index]: false } : { ...prev, [index]: true }
    );
  };

  const toggleCreateListModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsCreateListModalOpen((prev) => !prev);
  };

  const toggleTasksList = () => {
    setTasksListOpen((prev) => !prev);
  };

  if (!tasks) return <div>No tasks available</div>;

  if (!folders) return <div>No folders available</div>;

  const folderWithTasks: typeFolderWithTasks[] = folders.map(
    (folder: typeFolder) => {
      return {
        folder: folder,
        tasks: tasks.filter((task: typeTask) => task.folder_id === folder.id),
      };
    }
  );
  const remainingTasks: typeTask[] = tasks.filter(
    (task: typeTask) => task.folder_id === null
  );

  return (
    <div className={s.sidebarMid}>
      <div className={s.sidebarTasks}>
        <div onClick={toggleTasksList} className={s.sidebarTasksTab}>
          <div className={s.sidebarTasksWrapper}>
            <FaChevronDown
              className={`${s.sidebarTasksTabIcon} ${
                isTasksListOpen ? s.active : ""
              }`}
            />
            Список
          </div>
          <div className={s.sidebarTasksWrapper}>
            <MdOutlineCreateNewFolder className={s.sidebarTasksListPlus} />
            <GoPlus
              onClick={toggleCreateListModal}
              className={s.sidebarTasksListPlus}
            />
          </div>
        </div>
        {isTasksListOpen && tasks.length > 0 && folders.length > 0 && (
          <div className={s.sidebarTasksList}>
            {folderWithTasks.map((item) => (
              <SidebarFolderList
                folderWithTasks={item}
                isOpen={dropdownState[item.folder.id]}
                onOpenFolder={toggleDropdown}
              />
            ))}

            {remainingTasks.length > 0 && (
              <>
                {remainingTasks.map((task: typeTask) => (
                  <SidebarMidTask key={task.id} task={task} />
                ))}
              </>
            )}
          </div>
        )}
      </div>
      {isCreateListModalOpen && (
        <MyPortal>
          <ModalCreateTask
            onClose={() => setIsCreateListModalOpen((prev) => !prev)}
          />
        </MyPortal>
      )}
    </div>
  );
};

export default SidebarMid;
