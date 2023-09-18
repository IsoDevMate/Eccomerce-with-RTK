import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    getProductsByName: builder.query /* <Product[] | string> */({ // Corrected type annotation
      query: (name) => `products?name=${name}`,
    }),
  }),
});

export const { useGetProductsByNameQuery } = productApi;
