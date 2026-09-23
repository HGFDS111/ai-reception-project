import { baseApi } from '../../shared/api/baseApi'

export type Client = {
  id: number
  phone: string
  name: string | null
  businessId: number
}

export type CreateClientRequest = {
  businessId: number
  phone: string
  name: string
}

export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => '/clients',
      providesTags: ['Client'],
    }),

    createClient: builder.mutation<Client, CreateClientRequest>({
      query: (body) => ({
        url: '/clients',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Client'],
    }),
  }),
})

export const {
  useGetClientsQuery,
  useCreateClientMutation,
} = clientApi