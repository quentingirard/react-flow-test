/**
 * The external imports
 */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
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
});

const wrapper = createWrapper(store);

setupListeners(store.dispatch)

export { store, wrapper };
