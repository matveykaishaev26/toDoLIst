import Modal from "../Modal";
import s from "./ModalCreateTask.module.scss";
import MyInput from "../../MyInput/MyInput";
import MyDropdown from "../../MyDropdown/MyDropdown";
import "react-dropdown/style.css";
import { typeDropdownOption } from "../../../types/typeDropdownOption";
import { useCallback, useState, useMemo } from "react";
import c from "../../../styles/taskTypesColors.module.scss";
import { useCreateTaskMutation } from "../../../store/api/taskApi";
import { useGetAllFoldersQuery } from "../../../store/api/folderApi";
import { useGetAllTasksQuery } from "../../../store/api/taskApi";
import { typeTask } from "../../../types/typeTask";
import { useUpdateTaskMutation } from "../../../store/api/taskApi";

type Props = {
  onClose: () => void;
  defaultFolderId?: string;
  defaultTask?: typeTask;
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

const ModalCreateTask = ({ onClose, defaultFolderId, defaultTask }: Props) => {
  const [activeColor, setActiveColor] = useState<string>(
    defaultTask ? defaultTask.color : "white"
  );
  const [taskName, setTaskName] = useState<string>(
    defaultTask ? defaultTask.title : ""
  );
  const [createTask, { isLoading: createIsLoading, error: createError }] =
    useCreateTaskMutation();
  const { data: allFolders } = useGetAllFoldersQuery();
  const [isInputEmpty, setIsInputEmpty] = useState(defaultTask ? false : true);
  const { data: allTasks } = useGetAllTasksQuery();
  const [isTaskNameExists, setIsTaskNameExists] = useState<string | null>(null);
  const [updateTask, { isLoading: updateIsLoading, error: updateError }] =
    useUpdateTaskMutation();
  const allFoldersOptions: typeDropdownOption[] = useMemo(
    () => [
      { value: null, label: "Нет" },
      ...(allFolders?.map((folder) => ({
        value: folder.id,
        label: folder.title,
      })) || []),
    ],
    [allFolders]
  );

  const findFolder = (folderId?: string) => {
    for (let i = 0; i < allFoldersOptions?.length; i++) {
      if (allFoldersOptions[i].value === folderId) {
        return i;
      }
    }
    return 0;
  };
  const [folder, setFolder] = useState<typeDropdownOption | null>(
    allFoldersOptions[
      findFolder(
        defaultTask?.folder_id ? defaultTask?.folder_id : defaultFolderId
      )
    ]
  );

  useMemo(() => {
    if (allFolders && allFoldersOptions.length > 0) {
      const folderIndex = defaultFolderId
        ? findFolder(defaultFolderId)
        : defaultTask?.folder_id
        ? findFolder(defaultTask?.folder_id)
        : 0;
      const initialFolder =
        folderIndex !== -1
          ? allFoldersOptions[folderIndex]
          : allFoldersOptions[0];

      setFolder(initialFolder);
    }
  }, [allFoldersOptions, allFolders, defaultFolderId, defaultTask]);

  const handleTaskUpdate = async () => {
    try {
      await updateTask({
        id: defaultTask?.id,
        title: taskName,
        color: activeColor,
        folder_id: folder?.value,
      });
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
    }
  };

  const handleCreateTask = useCallback(async () => {
    if (allTasks?.some((task) => task.title === taskName)) {
      setIsTaskNameExists("Задача с таким названием уже существует");
      return;
    }

    try {
      await createTask({
        title: taskName,
        isCompleted: false,
        color: activeColor,
        folder_id: folder?.value,
      });
      onClose();
    } catch (error) {
      console.log(error);
    }
  }, [activeColor, folder, onClose, createTask, taskName, allTasks]);

  const inputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTaskNameExists(null);
    if (e.target.value === "") {
      setIsInputEmpty(true);
    } else {
      setIsInputEmpty(false);
    }
    setTaskName(e.target.value);
  };

  return (
    <Modal
      acceptBtn={{
        children: createIsLoading
          ? "Сохранение..."
          : defaultTask
          ? "Редактировать"
          : "Добавить",
        color: "blue",
        disabled:
          createIsLoading || isInputEmpty
            ? true
            : updateIsLoading
            ? true
            : false,
        onClick: defaultTask ? handleTaskUpdate : handleCreateTask,
      }}
      rejectBtn={{
        children: "Отмена",
        onClick: onClose,
        disabled: createIsLoading ? true : updateIsLoading ? true : false,
      }}
      title={defaultTask ? "Изменить список" : "Новый список"}
      onClose={onClose}
    >
      <div className={s.modalCreateTask}>
        <MyInput
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            inputOnChange(e)
          }
          className={s.modalCreateTaskInput}
          placeholder="Название"
          value={taskName}
        />
        {isTaskNameExists && (
          <span className={s.errorInput}>{isTaskNameExists}</span>
        )}
        <div className={s.colorWrapper}>
          Цвет
          <div className={s.colors}>
            {colors.map((color) => (
              <div
                key={color.color}
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
        {createError && (
          <span className={s.errorInput}>{JSON.stringify(createError)}</span>
        )}
        {updateError && (
          <span className={s.errorInput}>{JSON.stringify(updateError)}</span>
        )}
        <div className={s.dropdownWrapper}>
          Папка
          <div className={s.dropdown}>
            <MyDropdown
              selectedOption={folder}
              setSelectedOption={setFolder}
              placeholder={"Папка"}
              options={allFoldersOptions}
            />{" "}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalCreateTask;
