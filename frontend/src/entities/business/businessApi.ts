import { baseApi } from '../../shared/api/baseApi'

export type Business = {
  id: number
  name: string
  type: 'dental' | 'hotel' | 'repair_shop'
  userId: number
}

type CreateBusinessRequest = {
  name: string
  type: 'dental' | 'hotel' | 'repair_shop'
}
type UpdateBusinessRequest = {
  id: number
  name: string
  type: 'dental' | 'hotel' | 'repair_shop'
}

export const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusinesses: builder.query<Business[], void>({
      query: () => '/business',
      providesTags: ['Business'],
    }),

    createBusiness: builder.mutation<Business, CreateBusinessRequest>({
      query: (body) => ({
        url: '/business',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Business'],
    }),

    updateBusiness: builder.mutation<Business, UpdateBusinessRequest>({
  query: ({ id, name, type }) => ({
    url: `/business/${id}`,
    method: 'PUT',
    body: {
      name,
      type,
    },
  }),
  invalidatesTags: ['Business'],
}),

    deleteBusiness: builder.mutation<void, number>({
      query: (id) => ({
        url: `/business/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Business'],
    }),
  }),
})

export const {
  useGetBusinessesQuery,
  useCreateBusinessMutation,
  useUpdateBusinessMutation,
  useDeleteBusinessMutation,
} = businessApi