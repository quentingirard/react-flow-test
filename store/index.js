/**
 * The external imports
 */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

/**
 * The internal imports
 */
import { api } from "../services/api";
import credentials from "./credentials";

const reducers = combineReducers({
  api: api.reducer,
  credentials,
});

const store = () => configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat(api.middleware)
});

const wrapper = createWrapper(store);

export { store, wrapper };
