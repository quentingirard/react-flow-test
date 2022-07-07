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
import destroySession from "./destroySession";
import forgotPassword from "./forgotPassword";
import newPassword from "./newPassword";

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    newSession: newSession(build),
    destroySession: destroySession(build),
    challenge: challenge(build),
    createCredentials: createCredentials(build),
    deleteCredentials: deleteCredentials(build),
    getAllCredentials: getAllCredentials(build),
    authenticate: authenticate(build),
    forgotPassword: forgotPassword(build),
    newPassword: newPassword(build),
  }),
  overrideExisting: false,
});

export const {
  useNewSessionMutation,
  useDestroySessionMutation,
  useChallengeMutation,
  useCreateCredentialsMutation,
  useDeleteCredentialsMutation,
  useLazyGetAllCredentialsQuery,
  useAuthenticateMutation,
  useForgotPasswordMutation,
  useNewPasswordMutation,
} = authApi;
