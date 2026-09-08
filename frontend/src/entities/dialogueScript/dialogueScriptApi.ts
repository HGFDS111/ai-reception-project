import { baseApi } from "../../shared/api/baseApi";

export type DialogueScript = {
  id: number;
  greeting: string;
  objectionFlow: string | null;
  businessId: number;
};

type CreateDialogueScriptRequest = {
  businessId: number;
  greeting: string;
  objectionFlow: string | null;
};

export const dialogueScriptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDialogueScripts: builder.query<DialogueScript[], void>({
      query: () => "/dialogue-scripts",
      providesTags: ["DialogueScript"],
    }),

    createDialogueScript: builder.mutation<
      DialogueScript,
      CreateDialogueScriptRequest
    >({
      query: (body) => ({
        url: "/dialogue-scripts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["DialogueScript"],
    }),

    deleteDialogueScript: builder.mutation<void, number>({
      query: (id) => ({
        url: `/dialogue-scripts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DialogueScript"],
    }),
  }),
});

export const {
  useGetDialogueScriptsQuery,
  useCreateDialogueScriptMutation,
  useDeleteDialogueScriptMutation,
} = dialogueScriptApi;