// src/services/tasksService.ts

import { databases } from "./appwrite";

const DATABASE_ID = "TODOLIST"; // Замените на ваш Database ID
const COLLECTION_ID = "66d5625f002bf63b0e0a"; // Замените на ваш Collection ID

export async function getTask(taskId: string) {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      taskId
    );
    console.log("Task fetched:", response);
    return response;
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error; // Проброс ошибки для обработки на уровне вызова
  }
}

// Другие функции для работы с задачами могут быть добавлены здесь
export async function createTask(
  taskName: string,
  dueDate: string,
  colorId: string
) {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      "unique()",
      {
        taskName,
        dueDate,
        color_id: colorId,
      }
    );
    console.log("Task created:", response);
    return response;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error; // Проброс ошибки для обработки на уровне вызова
  }
}
