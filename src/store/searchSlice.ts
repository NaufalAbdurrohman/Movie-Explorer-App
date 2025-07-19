// src/store/searchSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  results: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setResults: (state, action) => {
      state.results = action.payload;
    },
    clearResults: (state) => {
      state.results = [];
    },
  },
});

export const { setResults, clearResults } = searchSlice.actions;
export default searchSlice.reducer;
