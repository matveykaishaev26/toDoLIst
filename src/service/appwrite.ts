import { Client, Databases } from "appwrite";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66d54d53000368fffed9");


export const databases = new Databases(client);
