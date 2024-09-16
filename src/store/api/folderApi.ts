import { api } from "./api";
import { typeFolder } from "../../types/types";
import { DATABASE_ID } from "../../config/database";
import { COLLECTIONS } from "../../config/database.ts";
import { databases } from "./appwrite";
import { ID } from "./appwrite";
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
    // createFolder: build.mutation<void, typeFolder>({
    //   queryFn: async (folder: typeFolder) => {
    //     try {
    //       const promise = databases.createDocument(
    //         "<DATABASE_ID>",
    //         "[COLLECTION_ID]",
    //         ID.unique(),
    //         {
    //           title: folder.title,

    //         }
    //       );
    //     } catch (err) {}
    //   },
    // }),
  }),
});

export const { useGetAllFoldersQuery } = folderApi;
