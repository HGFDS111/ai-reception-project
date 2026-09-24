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

export type Message = {
  id: number
  role: 'client' | 'assistant'
  text: string
  callSessionId: number
}

export type SimulationResponse = {
  callSession: Call
  messages: Message[]
}

export type StartSimulationRequest = {
  businessId: number
  phone: string
  name: string | null
}

export type SendMessageRequest = {
  callId: number
  text: string
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

    startSimulation: builder.mutation<
      SimulationResponse,
      StartSimulationRequest
    >({
      query: (body) => ({
        url: '/calls/simulate',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Call', 'Client'],
    }),

    sendMessage: builder.mutation<SimulationResponse, SendMessageRequest>({
      query: ({ callId, text }) => ({
        url: `/calls/${callId}/messages`,
        method: 'POST',
        body: { text },
      }),
      invalidatesTags: ['Call'],
    }),
  }),
})

export const {
  useGetCallsQuery,
  useCreateCallMutation,
  useStartSimulationMutation,
  useSendMessageMutation,
} = callApi