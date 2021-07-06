import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import localForage from 'localforage'

/**
 * Reducers
 */
import passengers from './slices/passengersSlice'

const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: [],
}

const combinedReducers = combineReducers({
  passengers: passengers,
})

const rootReducer = (state, action) => combinedReducers(state, action)

const persistedReducer = persistReducer(persistConfig, rootReducer)

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: ['persist/PERSIST'],
  },
})

export const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware,
})
export const persistor = persistStore(store)
