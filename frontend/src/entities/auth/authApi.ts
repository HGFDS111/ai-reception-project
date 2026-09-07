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

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi