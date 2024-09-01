import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import s from "./TaskConstructor.module.scss";
import { CiFlag1 } from "react-icons/ci";
import { CiCalendar } from "react-icons/ci";
import { CiHashtag } from "react-icons/ci";
import { useState } from "react";
import PriorityMenu from "./PriorityMenu/PriorityMenu";

import MyCalendar from "../MyCalendar/MyCalendar";
type Props = {
  setIsTaskConstructorOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
enum options {
  term = "Срок",
  priority = "Приоритет",
  tag = "Тег",
}

type typeTaskOption = {
  name?: options;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

const taskOptions: typeTaskOption[] = [
  {
    name: options.priority,
    icon: CiFlag1,
  },
  {
    name: options.tag,
    icon: CiHashtag,
  },
];

export default function TaskConstructor({ setIsTaskConstructorOpen }: Props) {
  const handleOptionBtnClick = (type: string) => {
    setMenuOpen(type);
  };
  const [isMenuOpen, setMenuOpen] = useState<string>("");
  const [priorityState, setPriorityState] = useState<string>("");
  return (
    <div className={s.taskConstructor}>
      <div className={s.taskConstructorTop}>
        <TextareaAutosize
          className={s.taskName}
          placeholder="Название задачи"
        ></TextareaAutosize>

        <TextareaAutosize
          className={s.taskDescription}
          minRows={1}
          maxRows={5}
          placeholder="Описание задачи"
        />
        <div className={s.taskOptions}>
          {taskOptions.map((option, index) => {
            return (
              <div key={index} className={s.optionContainer}>
                <div
                  onClick={() => handleOptionBtnClick(option.name)}
                  key={index}
                  className={s.taskOptionBtn}
                >
                  {" "}
                  <option.icon size={18} className={s.taskOptionIcon} />
                  {option.name}
                </div>
                {isMenuOpen === option.name && <PriorityMenu setMenuOpen={setMenuOpen} setPriorityState={setPriorityState} />}
              </div>
            );
          })}
        </div>
      </div>

      <div className={s.taskConstructorBottom}>
        <div className={s.btnActionContainer}>
          <div
            onClick={() => setIsTaskConstructorOpen((prev) => !prev)}
            className={s.cancelBtn}
          >
            Отмена
          </div>
          <div className={s.addBtn}>Добавить</div>
        </div>
      </div>
    </div>
  );
}
