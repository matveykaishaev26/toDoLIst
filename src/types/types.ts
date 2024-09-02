export type typeTask = {
  id: number;
  title: string;
  completed: boolean;
  color: string;
  folder_id: number | null;
};

export type typeSubtask = {
  id: number;
  title: string;
  completed: boolean;
  priority: number;
  task_id: number;
};

export type typeFolder = {
  id: number;
  title: string;
};

export type typeOption = {
  value: string;
  label: string;
};

export type typeFolderWithTasks = {
  folder: typeFolder;
  tasks: typeTask[];
};
type id = number;

export type typeDropdownState = {
  [id: id]: boolean;
};
