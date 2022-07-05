export default build =>
  build.mutation({
    query: ({ id }) => ({
      url: `http://localhost:3001/api/v1/webauthn/credentials/${id}`,
      method: 'DELETE',
    }),
    invalidatesTags: ['Credential']
  })