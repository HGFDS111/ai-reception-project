import { baseApi } from "../../shared/api/baseApi";

type CreateBusinessServiceRequest = {
  businessId: number;
  serviceTemplateId: number;
  price: number;
  customDescription: string | null;
};

export type BusinessService = {
  id: number;
  price: string;
  customDescription: string | null;
  businessId: number;
  serviceTemplateId: number;
};

export type BusinessServiceListItem = {
  id: number;
  title: string;
  category: string | null;
  BusinessService: {
    price: string;
    customDescription: string | null;
  };
};

export const businessServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBusinessService: builder.mutation<
      BusinessService,
      CreateBusinessServiceRequest
    >({
      query: ({ businessId, serviceTemplateId, price, customDescription }) => ({
        url: `/business/${businessId}/services`,
        method: "POST",
        body: {
          serviceTemplateId,
          price,
          customDescription,
        },
      }),
      invalidatesTags: ["BusinessService"],
    }),

    getBusinessServices: builder.query<
      BusinessServiceListItem[],
      number
    >({
      query: (businessId) => `/business/${businessId}/services`,
      providesTags: ["BusinessService"],
    }),
  }),
});

export const {
  useCreateBusinessServiceMutation,
  useGetBusinessServicesQuery,
} = businessServiceApi;