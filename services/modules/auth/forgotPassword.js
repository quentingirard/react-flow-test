export default build =>
  build.mutation({
    query: ({ email }) => ({
      url: "http://localhost:3001/api/v1/auth/password",
      method: "POST",
      body: {
        email,
        redirect_url: "http://localhost:3000/auth/new_password",
      },
    }),
  });
