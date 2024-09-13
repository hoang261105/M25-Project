import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;

export const getFavouriteProduct: any = createAsyncThunk(
  "favourites/getFavouriteProduct",
  async (id: number) => {
    const response = await axios.get(`${URL}/favourites?idUser=${id}`);
    return response.data;
  }
);

// API thêm sp yêu thích
export const addFavourProduct: any = createAsyncThunk(
  "favourites/addFavourProduct",
  async (data: any) => {
    const response = await axios.post(`${URL}/favourites`, data);
    return response.data;
  }
);

// API xóa sản phẩm yêu thích
export const deleteFavourProdcuct: any = createAsyncThunk(
  "favourites/deleteFavourProduct",
  async (id: number) => {
    const response = await axios.delete(`${URL}/favourites/${id}`);
    return id;
  }
);
