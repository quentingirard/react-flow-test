export default build =>
  build.mutation({
    query: ({ credentials, email }) => ({
      url: "http://10.19.249.190:3001/api/v1/webauthn/authentications",
      method: "POST",
      body: { credentials, email },
      responseHandler: async request => {
        const response = await request.json();
        if (request.ok) {
          return {
            ...response.data,
            accessToken: request.headers.get("access-token"),
            client: request.headers.get("client"),
            expiry: request.headers.get("expiry"),
          };
        }
        return response;
      },
    }),
  });
