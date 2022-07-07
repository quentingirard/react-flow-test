import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie, hasCookie } from "cookies-next";

/**
 * Default api configuration
 */
 const baseQuery = fetchBaseQuery({
  baseUrl: process.env.SERVER_URL,
  prepareHeaders: async (headers) => {
    if (hasCookie('sessions')) {
      const sessions = JSON.parse(getCookie('sessions'))
      headers.set('access-token', sessions.accessToken)
      headers.set('client', sessions.client)
      headers.set('expiry', sessions.expiry)
      headers.set('uid', sessions.uid)
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