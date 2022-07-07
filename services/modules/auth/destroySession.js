export default build =>
  build.mutation({
    query: () => ({
      url: "http://localhost:3001/api/v1/auth/sign_out",
      method: "DELETE",
    }),
  });
