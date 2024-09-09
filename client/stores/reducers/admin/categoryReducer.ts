import { Category } from "@/interface/admin";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "@/services/admin/category.service";
import { createSlice } from "@reduxjs/toolkit";

const category: Category[] = [];

const categoryReducer = createSlice({
  name: "category",
  initialState: {
    category: category,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.category.push(action.payload);
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.category = state.category.filter(
          (category) => category.id !== action.payload
        );
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.category = state.category.map((item: Category) =>
          item.id === action.payload.id ? action.payload : item
        );
      });
  },
});

export default categoryReducer.reducer;
