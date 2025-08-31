import { configureStore } from '@reduxjs/toolkit';
import { selectedItemsSlice } from '../../utils/store';

export const mockStore = configureStore({
  reducer: {
    selectedItems: selectedItemsSlice.reducer,
  },
});
