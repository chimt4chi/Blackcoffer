import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["Book", "Books", "Geography"],
  endpoints: (build) => ({
    getBook: build.query({
      query: (id) => `general/book/${id}`,
      providesTags: ["Book"],
    }),
    getBooks: build.query({
      query: () => "client/books",
      providesTags: ["Books"],
    }),
    getGeography: build.query({
      query: () => "client/geography",
      providesTags: ["Geography"],
    }),
  }),
});

export const { useGetBookQuery, useGetBooksQuery, useGetSGeographyQuery } = api;
