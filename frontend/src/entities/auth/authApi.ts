import { baseApi } from '../../shared/api/baseApi'

type LoginRequest = {
  email: string
  password: string
}

type LoginResponse = {
  token: string
  user: {
    id: number
    email: string
  }
}
type ForgotPasswordRequest = {
  email: string
}
type MessageResponse = {
  message: string
}

type ResetPasswordRequest = {
  token: string
  password: string
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    forgotPassword: builder.mutation<MessageResponse, ForgotPasswordRequest>({
  query: (body) => ({
    url: '/auth/forgot-password',
    method: 'POST',
    body,
  }),
}),
resetPassword: builder.mutation<MessageResponse, ResetPasswordRequest>({
  query: (body) => ({
    url: '/auth/reset-password',
    method: 'POST',
    body,
  }),
}),
  }),
})

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi