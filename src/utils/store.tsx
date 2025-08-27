import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { MyPokemon, StoreRootState } from '../types/interfaces';

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState: [] as MyPokemon[],
  reducers: {
    add: (state: MyPokemon[], action: PayloadAction<MyPokemon>) => {
      if (!selectHasItem(action.payload)) {
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

export const selectItems = (state: StoreRootState) => state.selectedItems;

export const selectHasItem = (data: MyPokemon) => (state: StoreRootState) =>
  state.selectedItems.some((item) => item.name === data.name);

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
  },
});

export default store;
