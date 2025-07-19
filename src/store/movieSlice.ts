import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  movies: any[];
  page: number;
}

const initialState: MovieState = {
  movies: [],
  page: 1,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setMovies(state, action: PayloadAction<any[]>) {
      state.movies = action.payload;
    },
    addMovies(state, action: PayloadAction<any[]>) {
      state.movies = [...state.movies, ...action.payload];
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    resetMovies(state) {
      state.movies = [];
      state.page = 1;
    }
  },
});

export const { setMovies, addMovies, setPage, resetMovies } = movieSlice.actions;
export default movieSlice.reducer;
