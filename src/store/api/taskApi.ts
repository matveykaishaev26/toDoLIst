import { api } from "./api";
import { DATABASE_ID } from "../../config/database";
import { COLLECTIONS } from "../../config/database.ts";
import { databases } from "./appwrite";
import { typeTask } from "../../types/types";
import { ID } from "./appwrite";
export const taskApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllTasks: build.query<typeTask[], void>({
      queryFn: async () => {
        try {
          const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.TASKS
          );
          const tasks: typeTask[] = response.documents.map((document: any) => ({
            id: document.$id,
            title: document.title,
            completed: document.completed,
            color: document.color,
            folder_id: document.folder_id,
          }));
          return { data: tasks as typeTask[] };
        } catch (err: any) {
          return { error: { status: "CUSTOM_ERROR", error: err.message } };
        }
      },
      providesTags: ["Task"],
    }),

    createTask: build.mutation<void, typeTask>({
      queryFn: async (task: typeTask) => {
        try {
          await databases.createDocument(
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
        } catch (err: any) {
          return { error: { status: "CUSTOM_ERROR", error: err.message } };
        }
      },
      
      invalidatesTags: ["Task"],
    }),
  }),
});

export const { useGetAllTasksQuery, useCreateTaskMutation } = taskApi;
