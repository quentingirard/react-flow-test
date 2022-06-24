/**
* The internal imports
*/
import { api } from '../../api'
import newSession from './newSession'

export const authApi = api.injectEndpoints({
  endpoints: build => ({
    newSession: newSession(build),
  }),
  overrideExisting: false,
})

export const { useNewSessionMutation } = authApi