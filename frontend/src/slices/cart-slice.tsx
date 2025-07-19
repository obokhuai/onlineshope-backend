import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cart-utils";
import { ShippingAddress } from "../components/types/products";
import { ProductType } from "../components/types/products";

export interface CartItem extends ProductType {
  qty: number;
}

export interface CartState {
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;

  itemsPrice?: string;
  shippingPrice?: string;
  taxPrice?: string;
  totalPrice?: string;
}

// ✅ Load cart state from storage
const cartFromStorage = localStorage.getItem("cart");

const initialState: CartState = cartFromStorage
  ? JSON.parse(cartFromStorage)
  : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { _id } = action.payload;
      const existItem = state.cartItems.find((x) => x._id === _id);

      console.log("existItem", existItem)

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === _id ? action.payload : x
        );
      } else {
        state.cartItems = [...state.cartItems, action.payload];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (
      state,
      action: PayloadAction<ShippingAddress>
    ) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
      //localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
        return updateCart(state);
      // localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
      //localStorage.setItem("cart", JSON.stringify(state));
    },
    resetCart: () => initialState,
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
