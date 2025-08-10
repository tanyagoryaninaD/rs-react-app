import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MyPokemon, StateSelectedItems } from '../../types/interfaces';

export const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState: { items: {}, size: 0 },
  reducers: {
    add: (state: StateSelectedItems, action: PayloadAction<MyPokemon>) => {
      state.items[action.payload.name] = action.payload;
      state.size += 1;
      window.localStorage.setItem('tg-selected-items', JSON.stringify(state));
    },
    remove: (
      state: StateSelectedItems,
      action: PayloadAction<{ key: string }>
    ) => {
      const newItems = Object.keys(state.items).reduce(
        (acc, key) => {
          if (key !== action.payload.key) {
            acc[key] = state.items[key];
          }

          return acc;
        },
        {} as { [key: string]: MyPokemon }
      );

      state.items = newItems;
      state.size -= 1;
      window.localStorage.setItem('tg-selected-items', JSON.stringify(state));
    },
    removeAll: (state: StateSelectedItems) => {
      state.items = {};
      state.size = 0;
      window.localStorage.setItem('tg-selected-items', JSON.stringify(state));
    },
    getLocalStorage: (state: StateSelectedItems) => {
      try {
        const json = window.localStorage.getItem('tg-selected-items');
        if (json) {
          const data = JSON.parse(json) as StateSelectedItems;
          state.items = data.items || {};
          state.size = data.size || 0;
        }
      } catch (error) {
        console.error('Error from getLocalStorage:', error);
        state.items = {};
        state.size = 0;
      }
    },
  },
});

export const { add, remove, removeAll, getLocalStorage } =
  selectedItemsSlice.actions;
