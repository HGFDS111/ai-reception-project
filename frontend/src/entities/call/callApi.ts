import type { Client } from '../client/clientApi'
import { baseApi } from '../../shared/api/baseApi'

export type Call = {
  id: number
  result: 'booked' | 'rejected' | 'callback_requested'
  startedAt: string
  businessId: number
  clientId: number
}

export type CreateCallRequest = {
  businessId: number
  phone: string
  name: string | null
  result: Call['result']
}

export type CreateCallResponse = {
  client: Client
  callSession: Call
}

export const callApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCalls: builder.query<Call[], void>({
      query: () => '/calls',
      providesTags: ['Call'],
    }),

    createCall: builder.mutation<
      CreateCallResponse,
      CreateCallRequest
    >({
      query: (body) => ({
        url: '/calls',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Call', 'Client'],
    }),
  }),
})

export const {
  useGetCallsQuery,
  useCreateCallMutation,
} = callApi