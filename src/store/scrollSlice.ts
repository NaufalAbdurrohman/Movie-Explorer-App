import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ScrollState {
  homePosition: number;
}

const initialState: ScrollState = {
  homePosition: 0,
};

const scrollSlice = createSlice({
  name: 'scroll',
  initialState,
  reducers: {
    setHomeScrollPosition(state, action: PayloadAction<number>) {
      state.homePosition = action.payload;
    },
  },
});

export const { setHomeScrollPosition } = scrollSlice.actions;
export default scrollSlice.reducer;
