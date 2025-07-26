import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/`,
    prepareHeaders: async (headers) => {
      const token = await window?.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (builder) => ({
    getPhones: builder.query({
      query: () => "phones",
    }),
    getPhoneById: builder.query({
      query: (id) => `phones/${id}`,
    }),
    createPhone: builder.mutation({
      query: (phone) => ({
        url: "phones",
        method: "POST",
        body: phone,
      }),
    }),
    updatePhone: builder.mutation({
      query: ({ id, data }) => ({
        url: `phones/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deletePhone: builder.mutation({
      query: (id) => ({
        url: `phones/${id}`,
        method: "DELETE",
      }),
    }),

    getAccessories: builder.query({
      query: () => "accessories",
    }),
    getAccessoryById: builder.query({
      query: (id) => `accessories/${id}`,
    }),
    createAccessory: builder.mutation({
      query: (accessory) => ({
        url: "accessories",
        method: "POST",
        body: accessory,
      }),
    }),
    updateAccessory: builder.mutation({
      query: ({ id, data }) => ({
        url: `accessories/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteAccessory: builder.mutation({
      query: (id) => ({
        url: `accessories/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {

  useGetPhonesQuery,
  useGetPhoneByIdQuery,
  useCreatePhoneMutation,
  useUpdatePhoneMutation,
  useDeletePhoneMutation,

  useGetAccessoriesQuery,
  useGetAccessoryByIdQuery,
  useCreateAccessoryMutation,
  useUpdateAccessoryMutation,
  useDeleteAccessoryMutation,
} = api;
