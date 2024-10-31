import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const api = createApi({
  reducerPath: "api",
  tagTypes: ["Task", "Folder", 'TasksList'],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (build) => ({}),
});
