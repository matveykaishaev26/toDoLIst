import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { SlOptions } from "react-icons/sl";
import { typeTask } from "../../../../types/types";
import s from "./SidebarMidTask.module.scss";
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
      <div className={s.taskColor}></div>
      <SlOptions className={s.sidebarTasksOptions} />
    </div>
  );
};

export default SidebarMidTask;
