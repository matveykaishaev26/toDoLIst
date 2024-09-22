import { LuMenu } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import { typeTask } from "../../../../../types/types";
import s from "./SidebarMidTask.module.scss";
import c from "../../../../../styles/taskTypesColors.module.scss";
import ContextMenuMain from "../../../../../shared/ContextMenu/СontextMenuMain";
import { typeContextMenuItem } from "../../../../../shared/ContextMenu/СontextMenuMain";
import { useState } from "react";
type Props = {
  task: typeTask;
};

const SidebarMidTask = ({ task }: Props) => {
  const contextMenuItems: typeContextMenuItem[] = [
    {
      id: "1",
      caption: "Редактировать",
    },

    {
      id: "2",
      caption: "Удалить",
    },
  ];

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const itemClickHandler = (item: typeContextMenuItem) => {
    alert(item);
  };

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.clientX, e.clientY);

    setPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <ContextMenuMain
      onItemClicked={itemClickHandler}
      items={contextMenuItems}
      defaultPosition={position}
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
    </ContextMenuMain>
  );
};

export default SidebarMidTask;
