import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../server/pokemonApi';
import { selectedItemsSlice } from './reducers/selectedItems';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
    pokemonApi: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

export default store;
