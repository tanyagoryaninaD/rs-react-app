import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../../server/pokemonApi';
import { selectedItemsSlice } from '../../store/reducers/selectedItems';

export const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
    pokemonApi: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
