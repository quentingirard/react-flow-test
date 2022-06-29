export default build =>
  build.mutation({
    query: ({ credential, challenge }) => {
      console.log("AVANT", credential)
      return {
      url: `http://localhost:3001/api/v1/webauthn/credentials`,
      method: 'POST',
      body: {
        credential,
        challenge,
      },
    }}
  })