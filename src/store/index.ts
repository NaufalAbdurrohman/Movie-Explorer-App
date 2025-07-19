// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './FavoritesSlice';
import searchReducer from './searchSlice'
import scrollReducer from './scrollSlice'
import movieReducer from './movieSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default localStorage

const persistConfig = {
  key: 'root',
  storage,
};

const persistedFavoritesReducer = persistReducer(persistConfig, favoritesReducer);

export const store = configureStore({
  reducer: {
    favorites: persistedFavoritesReducer,
    search: searchReducer,
    scroll: scrollReducer,
    movie: movieReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
