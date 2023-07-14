import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import wishlistSlice from "./slices/wishlistSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    wishlist: wishlistSlice,
  },
});

export default store;
