/**
* The internal imports
*/
import { api } from '../../api'
import newSession from './newSession'
import challenge from './challenge'
import credentials from './credentials'

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    newSession: newSession(build),
    challenge: challenge(build),
    credentials: credentials(build),
  }),
  overrideExisting: false,
})

export const { useNewSessionMutation, useChallengeMutation, useCredentialsMutation } = authApi