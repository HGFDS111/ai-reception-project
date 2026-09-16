import { baseApi } from '../../shared/api/baseApi'

export type Client = {
  id: number
  phone: string
  name: string | null
  businessId: number
}

export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query<Client[], void>({
      query: () => '/clients',
      providesTags: ['Client'],
    }),
  }),
})

export const { useGetClientsQuery } = clientApi