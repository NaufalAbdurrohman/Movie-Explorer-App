// src/store/favoritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteMovie {
  id: number;
  poster: string;
  title: string;
  rating: number;
  description: string;
  trailerUrl?: string;
}

interface FavoritesState {
  items: FavoriteMovie[];
}

// Helper function to load from localStorage
const loadFavorites = (): FavoriteMovie[] => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  }
  return [];
};

const initialState: FavoritesState = {
  items: loadFavorites(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<FavoriteMovie>) => {
      const exists = state.items.find((movie) => movie.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('favorites', JSON.stringify(state.items));
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((movie) => movie.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
    // Add this if you need to clear all favorites
    clearFavorites: (state) => {
      state.items = [];
      localStorage.removeItem('favorites');
    },
  },
});

export const { addFavorite, removeFavorite, clearFavorites } = favoritesSlice.actions;

// Selector to get favorites
export const selectFavorites = (state: { favorites: FavoritesState }) => state.favorites.items;

export default favoritesSlice.reducer;