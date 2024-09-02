// import { databases } from "./appwrite";
// import { Query } from "appwrite";

// const databaseId = "TODOLIST";
// const collectionId = "66d5604b0013a393d925";

// export const getAllFolders = async () => {
//   try {
//     const response = await databases.listDocuments(
//       databaseId,
//       collectionId, // ID коллекции
//       [Query.orderDesc("$createdAt")]
//     );

//     console.log(response.documents); // Выводим документы в консоль
//   } catch (error) {
//     console.error("Ошибка при получении документов:", error);
//   }
// };

import { createApi } from "@reduxjs/toolkit/query/react";
import { databases } from "./appwrite";
import { typeFolder } from "../types/types";
const databaseId = "TODOLIST";
const collectionId = "66d5604b0013a393d925";

const baseQuery = async () => {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);
    return { data: response.documents };
  } catch (err: any) {
    return { error: err.message };
  }
};

export const folderApi = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllFolders: builder.query<typeFolder[], void>({
        query: () => ({}),
        
    }),
  }),
});

type FolderApi = typeof folderApi;
export const { useGetAllFoldersQuery } = folderApi as FolderApi;
