import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardInfo } from '../types/pokeapi_types';

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState: [] as CardInfo[],
  reducers: {
    addItem: (state, action: PayloadAction<CardInfo>) => {
      state.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearAll: () => [],
  },
});

export const { addItem, removeItem, clearAll } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
