import { databases } from "./appwrite"; // Импортируйте SDK
import { Query } from "appwrite";

const databaseId = "TODOLIST";
const collectionId = "66d5604b0013a393d925";

const fetchDocuments = async () => {
  try {
    const response = await databases.listDocuments(
      databaseId, // ID базы данных
      collectionId, // ID коллекции
      [Query.orderDesc("$createdAt")] // Опционально: сортировка по дате создания
    );

    console.log(response.documents); // Выводим документы в консоль
  } catch (error) {
    console.error("Ошибка при получении документов:", error);
  }
};

fetchDocuments();
