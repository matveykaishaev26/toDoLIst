import React from "react";
import s from "./TodayTasks.module.scss";
import { GoTasklist } from "react-icons/go";
import { LuPlus } from "react-icons/lu";
import TaskConstructor from "../../shared/TaskConstructor/TaskConstructor";
import { useState } from "react";

export const TodayList = (props: Props) => {
  const [isTaskConstructorOpen, setIsTaskConstructorOpen] =
    React.useState<boolean>(false);

  return (
    <div className={s.todayTasks}>
      <div className={s.dayName}>Сегодня</div>
      <div className={s.tasksCount}>
        <GoTasklist className={s.tasksIcon} />2 задачи
      </div>
      {isTaskConstructorOpen === false ? (
        <div
          onClick={() => setIsTaskConstructorOpen((prev) => !prev)}
          className={s.addTask}
        >
          <LuPlus size={20} className={s.addTaskIcon} />
          Добавить задачу
        </div>
      ) : (
        ""
      )}

      {isTaskConstructorOpen ? (
        <TaskConstructor setIsTaskConstructorOpen={setIsTaskConstructorOpen} />
      ) : (
        ""
      )}
    </div>
  );
};
