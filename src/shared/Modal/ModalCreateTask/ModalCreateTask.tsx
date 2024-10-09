import Modal from "../Modal";
import s from "./ModalCreateTask.module.scss";
import MyInput from "../../MyInput/MyInput";
import MyDropdown from "../../MyDropdown/MyDropdown";
import "react-dropdown/style.css";
import { typeDropdownOption } from "../../../types/typeDropdownOption";
import { useEffect, useState } from "react";
import c from "../../../styles/taskTypesColors.module.scss";
import { useCreateTaskMutation } from "../../../store/api/taskApi";
import { useGetAllFoldersQuery } from "../../../store/api/folderApi";
import { useMemo } from "react";
type Props = {
  isOpen: boolean;
  onClose: () => void;
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
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const { data: allFolders } = useGetAllFoldersQuery();

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
    console.log(defaultFolderId);

    for (let i = 0; i < allFoldersOptions?.length; i++) {
      if (allFoldersOptions[i].value === folderId) {
        console.log(i);
        return i;
      }
    }
    return 0; 
  };
  const [folder, setFolder] = useState<typeDropdownOption | null>(
    allFoldersOptions[findFolder(defaultFolderId)]
  );
  useEffect(() => {
    if (allFolders && allFoldersOptions.length > 0) {
      const folderIndex = defaultFolderId ? findFolder(defaultFolderId) : 0;
      const initialFolder =
        folderIndex !== -1
          ? allFoldersOptions[folderIndex]
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
