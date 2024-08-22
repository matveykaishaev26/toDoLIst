import React from "react";
import s from "./TodayTasks.module.scss";
import { GoTasklist } from "react-icons/go";
import { LuPlus } from "react-icons/lu";
export const TodayList = (props: Props) => {
  return (
    <div className={s.todayTasks}>
      <div className={s.dayName}>Сегодня</div>
      <div className={s.tasksCount}>
        <GoTasklist className={s.tasksIcon} />2 задачи
      </div>
      <div className={s.addTask}>
        <LuPlus size={20} className={s.addTaskIcon} />
        Добавить задачу
      </div>
    </div>
  );
};
