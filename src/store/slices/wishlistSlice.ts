import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductType {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  config: string;
  description: string;
}

const initialState: ProductType[] = [];

const cartSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<ProductType>) {
      const newItemId = action.payload;
      state.push(newItemId);
    },
    removeFromWishlist(state, action: PayloadAction<number>) {
      const targetIndex = state.findIndex(
        (product) => product.id === action.payload
      );
      if (targetIndex > -1) {
        state.splice(targetIndex, 1);
      }
    },
  },
});

export default cartSlice.reducer;

export const { addToWishlist, removeFromWishlist } = cartSlice.actions;
