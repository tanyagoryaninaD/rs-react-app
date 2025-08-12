import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { MyPokemon } from '../types/interfaces';

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState: [] as MyPokemon[],
  reducers: {
    add: (state: MyPokemon[], action: PayloadAction<MyPokemon>) => {
      if (!selectHasItem.unwrapped(state, action.payload)) {
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
  selectors: {
    selectItems: (state: MyPokemon[]) => state,
    selectHasItem: (state: MyPokemon[], data: MyPokemon) =>
      state.some((item) => item.name === data.name),
  },
});

export const { add, remove, removeAll, setState } = selectedItemsSlice.actions;
export const { selectItems, selectHasItem } = selectedItemsSlice.selectors;

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
  },
});

export default store;
