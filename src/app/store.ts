import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../products/productSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store
