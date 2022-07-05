export default build =>
  build.mutation({
    query: ({ credential, challenge, name }) => ({
      url: `http://localhost:3001/api/v1/webauthn/credentials?name=${name}`,
      method: 'POST',
      body: {
        credential,
        challenge,
      },
    }),
    invalidatesTags: ['Credential']
  })