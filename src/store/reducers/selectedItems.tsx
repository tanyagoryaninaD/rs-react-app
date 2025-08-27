import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MyPokemon } from '../../types/interfaces';
import type { RootState } from '../../types/types';

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState: [] as MyPokemon[],
  reducers: {
    add: (state: MyPokemon[], action: PayloadAction<MyPokemon>) => {
      if (!state.some((item) => item.name === action.payload.name)) {
        state.push(action.payload);
      }
    },
    remove: (state: MyPokemon[], action: PayloadAction<MyPokemon>) => {
      const index = state.findIndex(
        (item) => item.name === action.payload.name
      );

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    removeAll: (state: MyPokemon[]) => {
      state.length = 0;
    },
    setState: (state: MyPokemon[], action: PayloadAction<MyPokemon[]>) => {
      state.push(...action.payload);
    },
  },
});

export const { add, remove, removeAll, setState } = selectedItemsSlice.actions;

export const selectedItems = (state: RootState) => state.selectedItems;
export const selectedHasItem = (data: MyPokemon) => (state: RootState) =>
  state.selectedItems.some((item) => item.name === data.name);
