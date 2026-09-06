import { baseApi } from '../../shared/api/baseApi'

export type Call = {
  id: number
  result: 'booked' | 'rejected' | 'callback_requested'
  startedAt: string
  businessId: number
  clientId: number
}

export const callApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.query<Call[], void>({
      query: () => '/calls',
    }),
  }),
})

export const { useGetCallsQuery } = callApi