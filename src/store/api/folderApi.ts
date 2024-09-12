import { api } from "./api";
import { typeFolder } from "../../types/types";
import { DATABASE_ID } from "../../config/database";
import { COLLECTIONS } from "../../config/database.ts";
import { databases } from "./appwrite";
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
            (document: any) => ({
              id: document.$id,
              title: document.title,
            })
          );
          return { data: folders as typeFolder[] };
        } catch (err) {
          return { error: { status: "CUSTOM_ERROR", error: err.message } };
        }
      },
    }),
  }),
});

export const { useGetAllFoldersQuery } = folderApi;
