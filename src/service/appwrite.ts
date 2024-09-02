import { Client, Databases, Account } from "appwrite";

const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("TODOLIST");

const databases = new Databases(client);
const account = new Account(client);

// Экспортируем экземпляры для использования в других частях приложения
export { client, databases, account };
