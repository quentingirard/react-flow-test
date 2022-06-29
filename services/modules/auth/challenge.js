export default build =>
  build.mutation({
    query: () => ({
      url: 'http://localhost:3001/api/v1/webauthn/challenges',
      method: 'POST',
    })
  })