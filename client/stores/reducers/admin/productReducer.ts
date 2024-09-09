import { Products } from "@/interface/admin";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  searchProduct,
  updateProduct,
} from "@/services/admin/product.service";
import { createSlice } from "@reduxjs/toolkit";

const productState: Products[] = [];

const productReducer = createSlice({
  name: "products",
  initialState: {
    product: productState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.product.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = state.product.filter(
          (product) => product.id !== action.payload.id
        );
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.product = state.product.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      });
  },
});

export default productReducer.reducer;
