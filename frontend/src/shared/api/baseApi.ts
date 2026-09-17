import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",

  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  const token = localStorage.getItem("token");

  if (result.error?.status === 401 && token) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithAuth,

  tagTypes: [
    "DialogueScript",
    "Business",
    "ServiceTemplate",
    "BusinessService",
    "Call",
    "Client",
  ],

  endpoints: () => ({}),
});
