import { api } from "./api";
import { account } from "./appwrite";
import { typeUser } from "../../types/types";
export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<typeUser, { email: string; password: string }>({
      queryFn: async ({ email, password }) => {
        try {
          try {
            const currentSession = await account.get();
            if (currentSession) {
              await account.deleteSession("current");
            }
          } catch (err) {
            console.log(err);
          }
          await account.createEmailPasswordSession(email, password);

          const session = await account.get();
          const user: typeUser = {
            token: session.$id,
            name: session.name,
            email: session.email,
          };
          console.log(user);

          return { data: user as typeUser };
        } catch (err: unknown) {
          return {
            error: {
              status: "CUSTOM_ERROR",
              error: "Неправильный логин или пароль",
            },
          };
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useLoginMutation } = userApi;
