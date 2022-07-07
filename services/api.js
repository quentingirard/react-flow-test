import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCookie, hasCookie } from "cookies-next";
import { createStandaloneToast } from '@chakra-ui/toast'

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
  const { toast } = createStandaloneToast()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // here you can deal with 401 error
  }

  if (result.error) {
    toast({
      title: `An error occurred (${result.error.status})`,
      description: result.error.data.error,
      status: 'error',
      duration: 9000,
      isClosable: true,
      position: 'bottom-right'
    })
  }
  return result
}

export const api = createApi({
  baseQuery: baseQueryWithInterceptor,
  tagTypes: ['Credential'],
  endpoints: () => ({}),
})