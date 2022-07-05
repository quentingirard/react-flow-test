export default build =>
  build.query({
    query: () => ('http://localhost:3001/api/v1/webauthn/credentials'),
    providesTags: ['Credential']
  })