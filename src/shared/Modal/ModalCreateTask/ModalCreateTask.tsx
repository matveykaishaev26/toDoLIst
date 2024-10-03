import Modal from "../Modal";
import s from "./ModalCreateTask.module.scss";
import MyInput from "../../MyInput/MyInput";
import MyDropdown from "../../MyDropdown/MyDropdown";
import "react-dropdown/style.css";
import MyButton from "../../MyButton/MyButton";
import { typeFolder, typeOption } from "../../../types/types";
import { useEffect, useState } from "react";
import c from "../../../styles/taskTypesColors.module.scss";
import { useCreateTaskMutation } from "../../../store/api/taskApi";
import { useGetAllFoldersQuery } from "../../../store/api/folderApi";
type Props = {
  isOpen: boolean;
  onClose?: () => void;
  defaultFolderId?: string;
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

const ModalCreateTask = ({ onClose, isOpen, defaultFolderId }: Props) => {
  const [activeColor, setActiveColor] = useState<string>("white");
  const [taskName, setTaskName] = useState<string>("");
  const [createTask, { isLoading, error }] = useCreateTaskMutation();
  const { data: allFolders } = useGetAllFoldersQuery();

  const allFoldersOptions: typeOption[] = [
    { value: null, label: "Нет" },
    ...(allFolders?.map((folder) => ({
      value: folder.id,
      label: folder.title,
    })) || []),
  ];  

  const findFolder = (folderId: string) => {
    for (let i = 0; i < allFoldersOptions?.length; i++) {
      if (allFoldersOptions[i].value === folderId) {
        console.log(i)
        return i;
      }
    }
    return 0; // return a default index value if not found
  };
  const [folder, setFolder] = useState<typeOption | null>(
    defaultFolderId
      ? allFoldersOptions[findFolder(defaultFolderId)]
      : allFoldersOptions[0] ?? null
  );
  useEffect(() => {
    if (allFolders && allFoldersOptions.length > 0) {
      const initialFolder =
        defaultFolderId && findFolder(defaultFolderId) !== -1
          ? allFoldersOptions[findFolder(defaultFolderId)]
          : allFoldersOptions[0];
  
      setFolder(initialFolder);
    }
  }, [allFolders, defaultFolderId, allFoldersOptions]);
  

  const handleCreateTask = async () => {
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

    // refetchTasks();
  };

  useEffect(() => {
    setFolder(allFoldersOptions[0]);
    setActiveColor(colors[0].color);
  }, [isOpen]);

  return (
    <Modal
      acceptBtn={{
        children: "Добавить",
        color: "blue",
        disabled: isLoading ? true : false,
        onClick: handleCreateTask,
      }}
      rejectBtn={{
        children: "Отмена",
        onClick: onClose,
        disabled: isLoading ? true : false,
      }}
      title="Создать список"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className={s.modalCreateTask}>
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
              options={allFoldersOptions}
            />{" "}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default ModalCreateTask;
