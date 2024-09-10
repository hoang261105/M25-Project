import { Products } from "@/interface/admin";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getAllProductAll,
  getProductById,
  searchProduct,
  sortProduct,
  sortProductPrice,
  updateProduct,
  updateProductImages,
} from "@/services/admin/product.service";
import { createSlice } from "@reduxjs/toolkit";

const productState: Products[] = [];

const productReducer = createSlice({
  name: "products",
  initialState: {
    product: productState,
    productDetail: null,
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
        // console.log(111111, action.payload);
        state.product = [
          ...state.product.filter((product) => product.id !== action.payload),
        ];
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.product = state.product.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
      })

      .addCase(searchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getAllProductAll.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(sortProduct.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(sortProductPrice.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productDetail = action.payload;
      })
      .addCase(updateProductImages.fulfilled, (state, action) => {
        state.product = state.product.map((product) =>
          product.id === action.payload.id
            ? { ...product, image: action.payload.image }
            : product
        );
      });
  },
});

export default productReducer.reducer;
