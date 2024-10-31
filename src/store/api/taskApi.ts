import { api } from "./api";
import { DATABASE_ID } from "../../config/database";
import { COLLECTIONS } from "../../config/database.ts";
import { databases } from "./appwrite";
import { typeTask } from "../../types/typeTask";
import { ID } from "./appwrite";
import { Models } from "appwrite";
export const taskApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTasks: build.query<typeTask[], void>({
      queryFn: async () => {
        try {
          const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.TASKS
          );
          const tasks: typeTask[] = response.documents.map(
            (document: Models.Document) => ({
              id: document.$id,
              title: document.title,
              isCompleted: document.completed,
              color: document.color,
              folder_id: document.folder_id,
            })
          );
          return { data: tasks as typeTask[] };
        } catch (err) {
          console.log(err);

          const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Task" as const, id: id })),
              "Task",
            ]
          : ["Task"],
    }),

    createTask: build.mutation<Models.Document, typeTask>({
      queryFn: async (task: typeTask) => {
        try {
          const newTask = await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.TASKS,
            ID.unique(),
            {
              title: task.title,
              isCompleted: task.isCompleted,
              color: task.color,
              folder_id: task.folder_id,
            }
          );
          console.log("Задача создана: ", newTask);

          // Возвращаем созданное задание
          return { data: newTask }; // Убедитесь, что у вас есть необходимый формат
        } catch (err) {
          console.log(err);

          const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Task", id: result.id }] : [],
    }),

    deleteTask: build.mutation<Models.Document, string>({
      queryFn: async (id: string) => {
        try {
          const result = await databases.deleteDocument(
            DATABASE_ID,
            COLLECTIONS.TASKS,
            id
          );
          return {data: result}
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Task", id: result.id }] : [],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;
