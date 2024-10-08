import { typeFolder } from "./typeFolder";
import { typeTask } from "./typeTask";
export type typeFolderWithTasks = {
    folder: typeFolder;
    tasks: typeTask[];
  };