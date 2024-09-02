import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { SlOptions } from "react-icons/sl";
import { typeTask } from "../../../../types/types";
import s from "./SidebarMidTask.module.scss";
import c from "../../../../styles/taskTypesColors.module.scss";
type Props = {
  task: typeTask;
};

const SidebarMidTask = ({ task }: Props) => {
  return (
    <div className={s.sidebarTasksListItem} key={task.id}>
      <div className={s.sidebarTasksWrapper}>
        <CiMenuBurger className={s.sidebarTasksListIcon} />
        {task.title}
      </div>
      <div className={s.sidebarTasksWrapper}>
        <div className={`${s.taskColor} ${c[task.color]}`}></div>
        <SlOptions className={s.sidebarTasksOptions} />
      </div>
    </div>
  );
};

export default SidebarMidTask;

