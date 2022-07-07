/**
 * The external imports
 */
import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from 'cookies-next';

/**
 * The internal imports
 */
import { authApi } from "../../services/modules/auth";

const slice = createSlice({
  name: "credentials",
  initialState: null,
  extraReducers: builder => {
    builder.addMatcher(
      authApi.endpoints.newSession.matchFulfilled,
      (_state, { payload }) => {
        setCookie('sessions', {
          accessToken: payload.accessToken,
          client: payload.client,
          expiry: payload.expiry,
          uid: payload.uid,
        }, { expires: payload.expiry })
        return payload
      }
    );
    builder.addMatcher(
      authApi.endpoints.authenticate.matchFulfilled,
      (_state, { payload }) => {
        setCookie('sessions', {
          accessToken: payload.accessToken,
          client: payload.client,
          expiry: payload.expiry,
          uid: payload.uid,
        }, { expires: payload.expiry })
        return payload
      }
    );
  },
});

export default slice.reducer;
