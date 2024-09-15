import React from "react";
import Modal from "../Modal";
import s from "./ModalCreateTask.module.scss";
import MyInput from "../../MyInput/MyInput";
import MyDropdown from "../../MyDropdown/MyDropdown";
import "react-dropdown/style.css";
import MyButton from "../../MyButton/MyButton";
import { typeOption } from "../../../types/types";
import { useEffect, useState } from "react";
import c from "../../../styles/taskTypesColors.module.scss";
type Props = {
  onClose?: () => void;
};

type color = {
  color: string;
};

const taskTypes: typeOption[] = [
  { value: "0", label: "Список задач" },
  { value: "1", label: "Список примечаний" },
];
const options: typeOption[] = [
  { value: "0", label: "Без папки" },

  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
];

const colors: color[] = [
  {
    color: "white",
  },

  {
    color: "red",
  },
  {
    color: "orange",
  },
  {
    color: "yellow",
  },
  {
    color: "green",
  },
  {
    color: "blue",
  },
  {
    color: "purple",
  },
  {
    color: "salad",
  },
];

const ModalCreateTask = ({ onClose }: Props) => {
  const [activeColor, setActiveColor] = useState<string>("");
  const [taskName, setTaskName] = useState<string>("");
  const [folder, setFolder] = useState<string>("");
  const [type, setType] = useState<string>("");

  return (
    <Modal onClose={onClose}>
      <div className={s.modalCreateTask}>
        <div className={s.modalCreateTaskTitle}>Создать список</div>
        <MyInput className={s.modalCreateTaskInput} placeholder="Название" />
        <div className={s.colorWrapper}>
          Цвет
          <div className={s.colors}>
            {colors.map((color) => (
              <div
                onClick={() => setActiveColor(color.color)}
                className={
                  activeColor === color.color
                    ? `${s.color} ${c[color.color]} ${c.active}`
                    : `${s.color} ${c[color.color]}`
                }
              ></div>
            ))}
          </div>
        </div>

        <div className={s.dropdownWrapper}>
          Папка
          <div className={s.dropdown}>
            <MyDropdown placeholder={"Папка"} options={options} />{" "}
          </div>
        </div>

        <div className={s.dropdownWrapper}>
          Тип
          <div className={s.dropdown}>
            <MyDropdown placeholder={"Тип"} options={taskTypes} />{" "}
          </div>
        </div>

        <div className={s.btnContainer}>
          <MyButton children={"Отмена"} />
          <MyButton color={"blue"} children={"Добавить"} />
        </div>
      </div>
    </Modal>
  );
};
export default ModalCreateTask;
