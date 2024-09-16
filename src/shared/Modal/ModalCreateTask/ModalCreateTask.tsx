import Modal from "../Modal";
import s from "./ModalCreateTask.module.scss";
import MyInput from "../../MyInput/MyInput";
import MyDropdown from "../../MyDropdown/MyDropdown";
import "react-dropdown/style.css";
import MyButton from "../../MyButton/MyButton";
import { typeOption } from "../../../types/types";
import { useState } from "react";
import c from "../../../styles/taskTypesColors.module.scss";
import { useCreateTaskMutation } from "../../../store/api/taskApi";
import { useGetAllTasksQuery } from "../../../store/api/taskApi";
type Props = {
  onClose?: () => void;
  allFolders: typeOption[];
};

type color = {
  color: string;
};

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

const ModalCreateTask = ({ onClose, allFolders }: Props) => {
  const [activeColor, setActiveColor] = useState<string>("white");
  const [taskName, setTaskName] = useState<string>("");
  const [folder, setFolder] = useState<typeOption>(allFolders[0]);
  const [createTask, { isLoading, error }] = useCreateTaskMutation();
  const { data: allTasks, refetch: refetchTasks } = useGetAllTasksQuery();
  const handleCreateTask = async () => {
    try {
      await createTask({
        title: taskName,
        isCompleted: false,
        color: activeColor,
        folder_id: folder.value,
      });
      onClose();
    }
    catch (error) {
      console.log(error);
    }
    
    refetchTasks();
  };

  return (
    <Modal onClose={onClose}>
      <div className={s.modalCreateTask}>
        <div className={s.modalCreateTaskTitle}>Создать список</div>
        <MyInput
          onChange={(e) => setTaskName(e.target.value)}
          className={s.modalCreateTaskInput}
          placeholder="Название"
        />
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
            <MyDropdown
              selectedOption={folder}
              setSelectedOption={setFolder}
              placeholder={"Папка"}
              options={allFolders}
            />{" "}
          </div>
        </div>

        <div className={s.btnContainer}>
          <MyButton disabled= {isLoading ? true : false}onClick={onClose} children={"Отмена"} />
          <MyButton
            disabled= {isLoading ? true : false}
            onClick={handleCreateTask}
            color={"blue"}
            children={"Добавить"}
          />
        </div>
      </div>
    </Modal>
  );
};
export default ModalCreateTask;
