import { baseApi } from '../../shared/api/baseApi'

export type DialogueScript = {
  id: number
  greeting: string
  objectionFlow: string | null
  businessId: number
}

export const dialogueScriptApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDialogueScripts: builder.query<DialogueScript[], void>({
      query: () => '/dialogue-scripts',
    }),
  }),
})

export const { useGetDialogueScriptsQuery } = dialogueScriptApi