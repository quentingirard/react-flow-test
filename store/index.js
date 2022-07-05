/**
 * The external imports
 */
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

/**
* The internal imports
*/
import { api } from '../services/api'
import credentials from './credentials'

const reducers = combineReducers({
  api: api.reducer,
  credentials
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['credentials'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }).concat(api.middleware)
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }