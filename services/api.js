import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createStandaloneToast } from '@chakra-ui/toast'

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