import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { contactsApi } from './auth/contactsApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { filterReducer } from './filterSlice';
import authReducer from './auth/authSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['token'],
};

const rootReducer = combineReducers({
  contacts: contactsApi.reducer,
  filter: filterReducer,
  auth: persistReducer(userPersistConfig, authReducer),
});

const store = configureStore({
  reducer: rootReducer,

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(contactsApi.middleware),
  devTools: true,
});

const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     filter: filterReducer,
//     auth: authReducer,
//     [contactsApi.reducerPath]: contactsApi.reducer,
//   },

//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware().concat(contactsApi.middleware),
//   devTools: true,
// });

setupListeners(store.dispatch);

export { store, persistor };
