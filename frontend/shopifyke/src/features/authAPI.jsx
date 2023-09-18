import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const authenticationApi = createApi({
    reducerPath: 'authenticationApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/' }),
    endpoints: (builder) => ({
      getUserByName: builder.query({
        query: (name) => `users?/${name}`,
      }),
    }),
  })
  
  // Export hooks for usage in function components, which are
  // auto-generated based on the defined endpoints
  export const { useGetUsersByNameQuery } =  authenticationApi