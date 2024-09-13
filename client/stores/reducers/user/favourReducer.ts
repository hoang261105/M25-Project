import { Favourite } from "@/interface/admin";
import {
  addFavourProduct,
  deleteFavourProdcuct,
  getFavouriteProduct,
} from "@/services/user/favourite.service";
import { createSlice } from "@reduxjs/toolkit";

const favourState: Favourite[] = [];

const favourReducer = createSlice({
  name: "favourites",
  initialState: {
    favour: favourState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFavouriteProduct.fulfilled, (state, action) => {
        state.favour = action.payload;
      })
      .addCase(addFavourProduct.fulfilled, (state, action) => {
        state.favour.push(action.payload);
      })
      .addCase(deleteFavourProdcuct.fulfilled, (state, action) => {
        state.favour = state.favour.filter(
          (item) => item.id !== action.payload
        );
      });
  },
});

export default favourReducer.reducer;
