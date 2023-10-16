import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/' }),
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (item) => ({
        url: 'cart',
        method: 'POST',
        body: item,
      }),
      method: 'POST',
    }),
    decreaseCart: builder.mutation({
      query: (item) => ({
        url: `cart/${item.id}`,
        method: 'PATCH',
        body: item,
      }),
    }),
    removeFromCart: builder.mutation({
      query: ({ id }) => ({
        url: `cart/${id}`,
        method: 'DELETE',
      }),
    }),
    getTotals: builder.query({
      query: () => 'cart/totals',
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: 'cart',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddToCartMutation,
  useDecreaseCartMutation,
  useRemoveFromCartMutation,
  useGetTotalsQuery,
  useClearCartMutation,
} = cartApi.endpoints;
