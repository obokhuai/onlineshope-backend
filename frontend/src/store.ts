import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api-slice";
import cartSliceReducer from './slices/cart-slice';
import authReducer from "./slices/auth-slice"

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authReducer
   
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
   devTools:true,
})
  
export default store;

export type RootState = ReturnType<typeof store.getState>;