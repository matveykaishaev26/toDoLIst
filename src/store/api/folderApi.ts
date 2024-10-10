import { api } from "./api";
import { typeFolder } from "../../types/typeFolder";
import { DATABASE_ID } from "../../config/database";
import { COLLECTIONS } from "../../config/database.ts";
import { databases } from "./appwrite";
import { ID } from "./appwrite";
import { Models } from "appwrite";
export const folderApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllFolders: build.query<typeFolder[], void>({
      queryFn: async () => {
        try {
          const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.FOLDERS
          );
          const folders: typeFolder[] = response.documents.map(
            (document: Models.Document) => ({
              id: document.$id,
              title: document.title,
            })
          );

          return { data: folders as typeFolder[] };
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Folder" as const, id: id })),
              "Folder",
            ]
          : ["Folder"],
    }),
    createFolder: build.mutation<Models.Document, typeFolder>({
      queryFn: async (folder: typeFolder) => {
        try {
          const newFolder = await databases.createDocument(
            DATABASE_ID,
            COLLECTIONS.FOLDERS,
            ID.unique(),
            {
              title: folder.title,
            }
          );
          console.log("Папка создана: ", newFolder);
          return { data: newFolder };
        } catch (err) {
          console.log(err);

          const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Folder", id: result.id }] : [],
    }),

    deleteFolder: build.mutation<void, string>({
      queryFn: async (folderId: string) => {
        try {
          const allTasks = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.TASKS
          );
          const tasksToDelete = allTasks.documents.filter(
            (item) => item.folder_id === folderId
          );
          for (const doc of tasksToDelete) {
            await databases.deleteDocument(
              DATABASE_ID,
              COLLECTIONS.TASKS,
              doc.$id
            );
            console.log(`Document with ID ${doc.$id} deleted`);
          }
          
          const deleteFolder = await databases.deleteDocument(
            DATABASE_ID,
            COLLECTIONS.FOLDERS,
            folderId
          );
          return { data: deleteFolder };
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Folder", id: result.id }] : [],
    }),

    editFolder: build.mutation<Models.Document, typeFolder>({
      queryFn: async (folder: typeFolder) => {
        try {
          const editFolder = await databases.updateDocument(
            DATABASE_ID,
            COLLECTIONS.FOLDERS,
            folder.id,
            {
              title: folder.title,
            }
          );
          return { data: editFolder };
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Unknown error";
          return { error: { status: "CUSTOM_ERROR", error: errorMessage } };
        }
      },
      invalidatesTags: (result) =>
        result ? [{ type: "Folder", id: result.id }] : [],
    }),
  }),
});

export const { useGetAllFoldersQuery, useCreateFolderMutation, useDeleteFolderMutation } = folderApi;
