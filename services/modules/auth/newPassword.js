export default build =>
  build.mutation({
    query: ({ values, query }) => ({
      url: "http://localhost:3001/api/v1/auth/password",
      method: "PUT",
      body: {
        password: values.password,
        password_confirmation: values.passwordConfirmation,
      },
      headers: query
    }),
  });
