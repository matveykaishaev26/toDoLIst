import { api } from "./api";
import { typeFolder } from "../../types/types";
import { DATABASE_ID } from "../../config/database";
import { COLLECTIONS } from "../../config/database.ts";
import { databases } from "./appwrite";
import { Query } from "appwrite";
export const folderApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllFolders: build.query<typeFolder[], void>({
      queryFn: async () => {
        try {
          const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTIONS.FOLDERS,
            // [
            //   Query.equal("status", "active"), // Фильтрация по статусу
            //   Query.greaterThan("createdAt", 1693523),
            // ]
          );
          console.log(response.documents);
          return { data: response.documents as typeFolder[] };
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetAllFoldersQuery } = folderApi;
