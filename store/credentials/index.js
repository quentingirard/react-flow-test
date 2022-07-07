/**
 * The external imports
 */
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { setCookie } from "cookies-next";

/**
 * The internal imports
 */
import { authApi } from "../../services/modules/auth";

const slice = createSlice({
  name: "credentials",
  initialState: null,
  extraReducers: builder => {
    builder
      .addCase(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.credentials,
        };
      })
      .addMatcher(
        authApi.endpoints.newSession.matchFulfilled,
        (_state, { payload }) => {
          setCookie(
            "sessions",
            {
              accessToken: payload.accessToken,
              client: payload.client,
              expiry: payload.expiry,
              uid: payload.uid,
            },
            { expires: new Date(payload.expiry) }
          );
          return payload;
        }
      )
      .addMatcher(
        authApi.endpoints.authenticate.matchFulfilled,
        (_state, { payload }) => {
          console.log('in reducer', payload);
          setCookie(
            "sessions",
            {
              accessToken: payload.accessToken,
              client: payload.client,
              expiry: payload.expiry,
              uid: payload.uid,
            },
            { expires: new Date(payload.expiry) }
          );
          return payload;
        }
      );
  },
});

export default slice.reducer;
