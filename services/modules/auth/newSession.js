export default build =>
  build.mutation({
    query: ({ email, password }) => ({
      url: 'http://localhost:3001/api/v1/auth/sign_in',
      method: 'POST',
      body: {
        email,
        password
      },
      responseHandler: async request => {
        const response = await request.json()
        if (request.ok) {
          return {
            ...response.data,
            accessToken: request.headers.get('access-token'),
            client: request.headers.get('client'),
            expiry: request.headers.get('expiry')
          }
        }
        return response
      },
    })
  })