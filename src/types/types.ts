export type typeSidebarTab = {
  value?: string;
  icon: React.ComponentType<{ className: string }>;
  link?: string;
  key?: number | string;
};

export type typeTask = {
  id?: string;
  title: string;
  isCompleted: boolean;
  color: string;
  folder_id: string | null;
};

export type typeSubtask = {
  id: string;
  title: string;
  completed: boolean;
  priority: number;
  task_id: number;
};

export type typeFolder = {
  id: string | null;
  title: string;
};

export type typeOption = {
  value?: string | number | null;
  label: string;
  action?: (arg: any) => void;
  modalContent?: string;

};

export type typeFolderWithTasks = {
  folder: typeFolder;
  tasks: typeTask[];
};
type id = number;

export type typeDropdownState = {
  [id: id]: boolean;
};

export type typeLogin = {
  email: string;
  password: string;
};

export type typeUser = {
  token: string;
  name: string;
  email: string;
};

export type typeTheme = {
  isDarkMode: boolean;
};
