import { useState, useEffect } from "react";
import { useGetAllFoldersQuery } from "../../../../../store/api/folderApi";
import { useGetAllTasksQuery } from "../../../../../store/api/taskApi";
import SkeletonList from "../SkeletonList/SkeletonList";
import { typeFolderWithTasks } from "../../../../../types/typeFolderWithTasks";
import { typeTask } from "../../../../../types/typeTask";
import SidebarFolderList from "../SidebarFolderList/SidebarFolderList";
import SidebarMidTask from "../SidebarMidTabs/SidebarMidTask";
import s from "./TaskList.module.scss";

const TaskList = () => {
  const [foldersWithTasks, setFoldersWithTasks] = useState<
    typeFolderWithTasks[]
  >([]);
  const [remainingTasks, setRemainingTasks] = useState<typeTask[]>([]);
  const {
    isLoading: foldersIsLoading,
    error: foldersError,
    data: allFolders,
  } = useGetAllFoldersQuery();
  const [dropdownState, setDropdownState] = useState<{
    [id: string]: boolean | null;
  }>({});
  const {
    isLoading: tasksIsLoading,
    error: tasksError,
    data: allTasks,
  } = useGetAllTasksQuery();
  const toggleDropdown = (index: string) => {
    setDropdownState((prev) =>
      prev[index] ? { ...prev, [index]: false } : { ...prev, [index]: true }
    );
  };

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

  return (
    <div>
      {tasksIsLoading || foldersIsLoading ? (
        <div className={s.sidebarTasksList}>
          <SkeletonList />
        </div>
      ) : (
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
    </div>
  );
};

export default TaskList;
