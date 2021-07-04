import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import localForage from 'localforage'

/**
 * Reducers
 */

const persistConfig = {
  key: 'root',
  storage: localForage,
  whitelist: [],
}

const combinedReducers = combineReducers({
  personages: {},
})

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined
    localForage.clear()
  }

  return combinedReducers(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: ['persist/PERSIST'],
  },
})

const ignoreActionsAfterLogOutMiddleware = (store) => (next) => (action) => {
  const authorizedAnonymousActions = ['persist/', 'loader/']
  if (
    authorizedAnonymousActions.some((authorized) =>
      action.type.includes(authorized)
    )
  ) {
    next(action)
  }
}

export const store = configureStore({
  reducer: persistedReducer,
  middleware: customizedMiddleware.concat(ignoreActionsAfterLogOutMiddleware),
})
export const persistor = persistStore(store)
