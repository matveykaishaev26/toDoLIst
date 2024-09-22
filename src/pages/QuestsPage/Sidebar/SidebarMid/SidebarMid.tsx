import React, { useState, useEffect } from "react";
import s from "./SidebarMid.module.scss";
import { FaChevronDown } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { typeTask, typeFolderWithTasks } from "../../../../types/types";
import { typeOption } from "../../../../types/types";
import ModalCreateTask from "../../../../shared/Modal/ModalCreateTask/ModalCreateTask";
import MyPortal from "../../../../shared/MyPortal/MyPortal";
import { typeDropdownState } from "../../../../types/types";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import SidebarFolderList from "./SidebarFolderList/SidebarFolderList";
import { useGetAllTasksQuery } from "../../../../store/api/taskApi";
import { useGetAllFoldersQuery } from "../../../../store/api/folderApi";
import SidebarMidTask from "./SidebarMidTabs/SidebarMidTask";
import SkeletonList from "./SkeletonList/SkeletonList";
const SidebarMid: React.FC = () => {
  const [isTasksListOpen, setTasksListOpen] = useState<boolean>(true);
  const [isCreateListModalOpen, setIsCreateListModalOpen] =
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

  const foldersOptions: typeOption[] = [
    { value: null, label: "Нет" },
    ...(allFolders
      ? allFolders.map((folder) => ({
          value: folder.id,
          label: folder.title,
        }))
      : []),
  ];

  const {
    isLoading: tasksIsLoading,
    error: tasksError,
    data: allTasks,
  } = useGetAllTasksQuery();

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

  if (foldersError) {
    return <div>err</div>;
  }

  if (tasksError) {
    return <div>err</div>;
  }

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
          <MdOutlineCreateNewFolder className={s.plusIcon} />
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
                      dropdownState[item.folder.id]) ||
                    false
                  }
                  onOpenFolder={() => toggleDropdown(item.folder.id)}
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

      {isCreateListModalOpen && (
        <MyPortal>
          <ModalCreateTask
            allFolders={foldersOptions}
            onClose={() => setIsCreateListModalOpen((prev) => !prev)}
          />
        </MyPortal>
      )}
    </div>
  );
};

export default SidebarMid;
