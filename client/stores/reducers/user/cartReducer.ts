import { Carts } from "@/interface/admin";
import {
  addToCart,
  deletedProductToCart,
  getCartProduct,
  updatedCart,
  updateProductQuantity,
} from "@/services/admin/cart.service";
import { createSlice } from "@reduxjs/toolkit";

const cartState: Carts[] = [];

const cartReducer = createSlice({
  name: "carts",
  initialState: {
    cart: cartState,
    selectItem: [],
    totalPrice: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCartProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.cart = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart.push(action.payload);
      })
      .addCase(updatedCart.fulfilled, (state, action) => {
        const update = state.cart.findIndex(
          (item: Carts) => item.id === action.payload.id
        );
        if (update !== -1) {
          state.cart[update].product.quantity = action.payload.product.quantity;
        }
      })
      .addCase(deletedProductToCart.fulfilled, (state, action) => {
        state.cart = state.cart.filter(
          (item: Carts) => item.id !== action.payload
        );
        console.log(222222, action.payload);
      })
      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        const { itemId, quantity } = action.payload;
        const productToUpdate = state.cart.find((item) => item.id === itemId);
        if (productToUpdate) {
          state.totalPrice -=
            productToUpdate.product.price * productToUpdate.product.quantity;
          productToUpdate.product.quantity = quantity; // Cập nhật số lượng trong state
          state.totalPrice += productToUpdate.product.price * quantity; // Cập nhật tổng số tiền
        }
      });
  },
});

export default cartReducer.reducer;
