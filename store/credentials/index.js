/**
 * The external imports
 */
import { createSlice } from "@reduxjs/toolkit";

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
      (_state, { payload }) => payload
    );
    builder.addMatcher(
      authApi.endpoints.authenticate.matchFulfilled,
      (_state, { payload }) => payload
    );
  },
});

export default slice.reducer;
