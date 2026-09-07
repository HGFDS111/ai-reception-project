import { baseApi } from '../../shared/api/baseApi'

export type Business = {
  id: number
  name: string
  type: 'dental' | 'hotel' | 'repair_shop'
  userId: number
}

export const businessApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBusinesses: builder.query<Business[], void>({
      query: () => '/business',
    }),
  }),
})

export const { useGetBusinessesQuery } = businessApi