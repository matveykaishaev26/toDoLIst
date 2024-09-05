import { Client, Account, Databases } from "appwrite";

export const client: Client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("66d54d53000368fffed9");

export const account = new Account(client);
export const databases = new Databases(client);
export { ID } from "appwrite";

// const deleteCurrentSession = async () => {
//   try {
//     // Получаем текущую сессию
//     const session = await account.get();

//     // Если сессия существует, удаляем её
//     if (session) {
//       await account.deleteSession("current");
//       console.log("Сессия удалена");
//     }
//   } catch (err) {
//     if (err.message === "User (role: guests) missing scope (account)") {
//       console.log("Пользователь не авторизован, удаление сессии невозможно.");
//     } else {
//       console.error("Ошибка при удалении сессии:", err);
//     }
//   }
// };

// deleteCurrentSession();

// account.createEmailPasswordSession('kaishaevmv@mail.ru', '12345678')
//     .then(response => {
//         console.log(response); // Сессия создана
//     })
//     .catch(error => {
//         console.error(error); // Ошибка при логине
//     });
