import { typeTask } from "../../../../../types/typeTask";
import s from "./SidebarMidTask.module.scss";
import c from "../../../../../styles/taskTypesColors.module.scss";
import ContextMenuMain from "../../../../../shared/ContextMenu/СontextMenuMain";
import { typeContextMenuItem } from "../../../../../shared/ContextMenu/СontextMenuMain";
import { useState } from "react";
import Modal from "../../../../../shared/Modal/Modal";
import { useDeleteTaskMutation } from "../../../../../store/api/taskApi";
import { IconsService } from "../../../../../assets/icons/IconsService";
import { useContextMenu } from "../../../../../hooks/useContextMenu";
import ModalCreateTask from "../../../../../shared/Modal/ModalCreateTask/ModalCreateTask";
type Props = {
  task: typeTask;
};

const SidebarMidTask = ({ task }: Props) => {
  const { position, isVisible, handleClickOption, setIsVisible } =
    useContextMenu();

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteTask, { isLoading: deleteIsLoading }] = useDeleteTaskMutation();
  const [updateModal, setUpdateModal] = useState(false);

  const deleteHandler = () => {
    setIsVisible(false);
    setDeleteModal(true);
  };
  const updateHandler = () => {
    setIsVisible(false);
    setUpdateModal(true);
  };

  const deleteItem = async () => {
    console.log(task.id); // Убедитесь, что task.id выводится корректно

    try {
      if (task.id) {
        await deleteTask(task.id).unwrap();
      }
      console.log("Задача успешно удалена");
    } catch (err) {
      console.error("Ошибка при удалении задачи:", err);
    } finally {
      setDeleteModal(false);
    }
  };

  const contextMenuItems: typeContextMenuItem[] = [
    {
      id: "1",
      caption: "Редактировать",
      onClick: updateHandler,
    },

    {
      id: "2",
      caption: "Удалить",
      onClick: deleteHandler,
      hover: "red",
    },
  ];

  return (
    <ContextMenuMain
      isVisible={isVisible}
      setIsVisible={setIsVisible}
      items={contextMenuItems}
      defaultPosition={position}
      id={task.title}
    >
      <div className={s.tab} key={task.id}>
        <div className={s.iconWrapper}>
          <IconsService className={s.tabIcon} iconName={"task"} />
          <div className={s.taskTitle}>{task.title} </div>
        </div>
        <div className={s.leftSide}>
          <div className={s.iconWrapper}>
            {task.color !== "white" && (
              <div className={`${s.taskColor} ${c[task.color]}`}></div>
            )}
            <IconsService
              iconName={"options"}
              className={s.sidebarTasksOptions}
              onClick={(e?: React.MouseEvent) =>
                e && handleClickOption(e as React.MouseEvent)
              }
            />
          </div>
        </div>
      </div>
      {deleteModal && (
        <Modal
          title="Удаление списка"
          rejectBtn={{
            children: "Отмена",
            onClick: () => setDeleteModal(false),
            disabled: deleteIsLoading ? true : false,
          }}
          acceptBtn={{
            children: deleteIsLoading ? "Удаление..." : "Удалить",
            onClick: deleteItem,
            color: "blue",
            disabled: deleteIsLoading ? true : false,
          }}
          children={`Вы действительно хотите удалить список "${task.title}"?`}
          onClose={() => setDeleteModal(false)}
        />
      )}

      {updateModal && (
        <ModalCreateTask
          defaultTask={{
            id: task.id,
            title: task.title,
            color: task.color,
            isCompleted: task.isCompleted,
            folder_id: task.folder_id,
          }}
          onClose={() => setUpdateModal(false)}
        />
      )}
    </ContextMenuMain>
  );
};

export default SidebarMidTask;
