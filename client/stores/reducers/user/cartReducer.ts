import { Carts } from "@/interface/admin";
import { getCartProduct } from "@/services/admin/cart.service";
import { createSlice } from "@reduxjs/toolkit";

const cartState: Carts[] = [];

const cartReducer = createSlice({
  name: "carts",
  initialState: {
    cart: cartState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartProduct.fulfilled, (state, action) => {
      console.log(action.payload);
      state.cart = action.payload;
    });
  },
});

export default cartReducer.reducer;
