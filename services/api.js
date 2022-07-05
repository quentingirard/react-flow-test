import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

/**
 * Default api configuration
 */
 const baseQuery = fetchBaseQuery({
  baseUrl: process.env.SERVER_URL,
  prepareHeaders: async (headers, { getState }) => {
    const credentials = await getState().credentials

    if (credentials) {
      headers.set('access-token', credentials.accessToken)
      headers.set('client', credentials.client)
      headers.set('expiry', credentials.expiry)
      headers.set('uid', credentials.uid)
    }

    return headers
  },
})

const baseQueryWithInterceptor = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Credential'],
  endpoints: () => ({}),
})