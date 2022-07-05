/**
 * The internal imports
 */
import { api } from "../../api";
import newSession from "./newSession";
import challenge from "./challenge";
import createCredentials from "./credentials";
import getAllCredentials from "./getAllCredentials";
import deleteCredentials from "./deleteCredentials";
import authenticate from "./authenticate";

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    newSession: newSession(build),
    challenge: challenge(build),
    createCredentials: createCredentials(build),
    deleteCredentials: deleteCredentials(build),
    getAllCredentials: getAllCredentials(build),
    authenticate: authenticate(build),
  }),
  overrideExisting: false,
});

export const {
  useNewSessionMutation,
  useChallengeMutation,
  useCreateCredentialsMutation,
  useDeleteCredentialsMutation,
  useLazyGetAllCredentialsQuery,
  useAuthenticateMutation,
} = authApi;
