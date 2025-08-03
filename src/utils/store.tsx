import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { MyPokemon, StateSelectedItems } from '../types/interfaces';

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState: {},
  reducers: {
    add: (state: StateSelectedItems, action: PayloadAction<MyPokemon>) => {
      state[action.payload.name] = action.payload;
    },
    remove: (
      state: StateSelectedItems,
      action: PayloadAction<{ key: string }>
    ) => {
      return Object.keys(state).reduce((acc, key) => {
        if (key !== action.payload.key) {
          acc[key] = state[key];
        }

        return acc;
      }, {} as StateSelectedItems);
    },
  },
});

export const { add, remove } = selectedItemsSlice.actions;

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
  },
});

export default store;
