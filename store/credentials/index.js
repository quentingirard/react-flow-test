/**
 * The external imports
 */
import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

/**
 * The internal imports
 */
import { authApi } from "../../services/modules/auth";

const slice = createSlice({
  name: "credentials",
  initialState: {},
  extraReducers: builder => {
    builder
      .addCase(HYDRATE, (state, action) => {
        console.log("HYDRATE", state, action.payload);
        return {
          ...state,
          ...action.payload.credentials,
        };
      })
      .addMatcher(
        authApi.endpoints.newSession.matchFulfilled,
        (_state, { payload }) => payload
      )
      .addMatcher(
        authApi.endpoints.authenticate.matchFulfilled,
        (_state, { payload }) => payload
      );
  },
});

export default slice.reducer;
