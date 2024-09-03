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

import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { databases } from "./appwrite";
import { typeFolder } from "../types/types";
const databaseId = "TODOLIST";
const collectionId = "66d5604b0013a393d925";

const appwriteBaseQuery: BaseQueryFn<
  { url: string; method: string; data?: any },
  unknown,
  unknown
> = async ({ url, method, data }) => {
  try {
    let result;
    switch (method) {
      case "GET":
        result = await databases.listDocuments(databaseId, url);
        console.log(result.documents);
        return { data: result.documents };
      default:
        throw new Error(`Метод ${method} не поддерживается`);
    }
  } catch (err: any) {
    return { error: { status: "CUSTOM_ERROR", error: err.message } };
  }
};

export const folderApi = createApi({
  reducerPath: "api",
  baseQuery: appwriteBaseQuery,
  endpoints: (builder) => ({
    getAllFolders: builder.query<typeFolder[], void>({
      query: () => ({
        url: collectionId,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllFoldersQuery } = folderApi;
