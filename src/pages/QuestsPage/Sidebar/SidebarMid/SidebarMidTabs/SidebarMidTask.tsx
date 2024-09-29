import { LuMenu } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import { typeTask } from "../../../../../types/types";
import s from "./SidebarMidTask.module.scss";
import c from "../../../../../styles/taskTypesColors.module.scss";
import ContextMenuMain from "../../../../../shared/ContextMenu/СontextMenuMain";
import { typeContextMenuItem } from "../../../../../shared/ContextMenu/СontextMenuMain";
import { useState } from "react";
import Modal from "../../../../../shared/Modal/Modal";
import { useDeleteTaskMutation } from "../../../../../store/api/taskApi";

type Props = {
  task: typeTask;
};

const SidebarMidTask = ({ task }: Props) => {
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [modal, setModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [deleteTask, { isLoading }] = useDeleteTaskMutation();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const deleteHandler = () => {
    setIsVisible(false);
    setModal(true);
  };

  const deleteItem = async () => {
    console.log(task.id); // Убедитесь, что task.id выводится корректно
  
    try {
      // Добавляем await для ожидания выполнения deleteTask
      await deleteTask(task.id).unwrap(); // Используем unwrap для обработки ошибок
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
          <LuMenu className={s.tabIcon} />
          <div className={s.taskTitle}>{task.title} </div>
        </div>
        <div className={s.iconWrapper}>
          {task.color !== "white" && (
            <div className={`${s.taskColor} ${c[task.color]}`}></div>
          )}
          <SlOptions
            onClick={(e: React.MouseEvent) => handleClick(e)}
            className={s.sidebarTasksOptions}
          />
        </div>
      </div>
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
        isOpen={modal}
        onClose={() => setModal(false)}
      />
    </ContextMenuMain>
  );
};

export default SidebarMidTask;
