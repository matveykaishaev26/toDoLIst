export type typeTask = {
  id: string;
  title: string;
  isCompleted: boolean;
  color: string;
  folder_id?: string | null;
};

export type typeCreateTaskPayload = {
  title: string;
  isCompleted: boolean;
  color: string;
  folder_id?: string | null;
};
