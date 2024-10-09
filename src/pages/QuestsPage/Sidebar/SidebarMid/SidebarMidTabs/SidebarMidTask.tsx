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
type Props = {
  task: typeTask;
};

const SidebarMidTask = ({ task }: Props) => {
  const { position, isVisible, handleClickOption, setIsVisible } =
    useContextMenu();

  const [modal, setModal] = useState(false);
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();

  const deleteHandler = () => {
    setIsVisible(false);
    setModal(true);
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
    }
    setModal(false);
  };

  const contextMenuItems: typeContextMenuItem[] = [
    {
      id: "1",
      caption: "Редактировать",
    },

    {
      id: "2",
      caption: "Удалить",
      onClick: deleteHandler,
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
      {modal && (
        <Modal
          rejectBtn={{
            children: "Отмена",
            onClick: () => setModal(false),
            disabled: isLoading ? true : false,
          }}
          acceptBtn={{
            children: "Удалить",
            onClick: deleteItem,
            color: "blue",
            disabled: isLoading ? true : false,
          }}
          children={`Вы действительно хотите удалить список "${task.title}"?`}
          onClose={() => setModal(false)}
        />
      )}
    </ContextMenuMain>
  );
};

export default SidebarMidTask;
