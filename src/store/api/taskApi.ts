import { api } from "./api";
import { DATABASE_ID } from "../../config/database";
import { COLLECTIONS } from "../../config/database.ts";
import { databases } from "./appwrite";
import { typeTask } from "../../types/typeTask";
import { ID } from "./appwrite";
import { Models } from "appwrite";
import { typeCreateTaskPayload } from "../../types/typeTask";
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
              "TasksList",
            ]
          : ["TasksList"],
    }),

    createTask: build.mutation<Models.Document, typeCreateTaskPayload>({
      queryFn: async (task: typeCreateTaskPayload) => {
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
      // onQueryStarted(newTask, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     api.util.updateQueryData(
      //       "getAllTasks",
      //       undefined,
      //       (draft: typeTask[]) => {
      //         draft.push(newTask);
      //       }
      //     )
      //   );
      //   queryFulfilled.catch(patchResult.undo);
      // },
    }),

    deleteTask: build.mutation({
      queryFn: async (id: string) => {
        try {
          const result = await databases.deleteDocument(
            DATABASE_ID,
            COLLECTIONS.TASKS,
            id
          );

          return { data: result as Models.Document };
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Task", id: result.id }] : [],
    }),

    updateTask: build.mutation({
      queryFn: async (task: Partial<typeTask>) => {
        try {
          const result = await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.TASKS,
            task.id!,
            {
              title: task.title,
              color: task.color,
              folder_id: task.folder_id,
            }
          );
          console.log(result);

          return { data: result as Models.Document };
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
          console.log(errorMessage);

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
  useUpdateTaskMutation,
} = taskApi;
