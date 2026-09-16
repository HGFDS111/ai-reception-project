import { baseApi } from "../../shared/api/baseApi";

export type ServiceTemplate = {
  id: number;
  title: string;
  category: string | null;
};

type CreateServiceTemplateRequest = {
  title: string;
  category: string | null;
};

export const serviceTemplateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getServiceTemplates: builder.query<ServiceTemplate[], void>({
      query: () => "/service-templates",
      providesTags: ["ServiceTemplate"],
    }),

    createServiceTemplate: builder.mutation<
      ServiceTemplate,
      CreateServiceTemplateRequest
    >({
      query: (body) => ({
        url: "/service-templates",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ServiceTemplate"],
    }),
  }),
});

export const { useGetServiceTemplatesQuery, useCreateServiceTemplateMutation } =
  serviceTemplateApi;
