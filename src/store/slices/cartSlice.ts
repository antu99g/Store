import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  config: string;
  description: string;
  quantity: number;
}

const initialState: CartItem[] = [];

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      // if (!newItem.quantity) {
      //   newItem.quantity = 1;
      // }
      state.push(newItem);
    },
    removeItem(state, action: PayloadAction<string | number>) {
      const targetIndex = state.findIndex(
        (item) => item.id === Number(action.payload)
      );
      state.splice(targetIndex, 1);
    },
    increaseQty(state, action: PayloadAction<string | number>) {
      const target = state.find((item) => item.id === Number(action.payload));
      if (target) {
        target.quantity += 1;
      }
    },
    decreaseQty(state, action: PayloadAction<string | number>) {
      const targetIndex = state.findIndex(
        (item) => item.id === Number(action.payload)
      );
      if (state[targetIndex].quantity > 1) {
        state[targetIndex].quantity -= 1;
      } else {
        state.splice(targetIndex, 1);
      }
    },
  },
});

export default cartSlice.reducer;

export const { addItem, removeItem, increaseQty, decreaseQty } =
  cartSlice.actions;
