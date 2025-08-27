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

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
