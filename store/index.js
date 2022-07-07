/**
 * The external imports
 */
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
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

export { store, wrapper };
