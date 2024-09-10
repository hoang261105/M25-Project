import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;
// API lấy sản phẩm trong giỏ hàng theo id của người dùng
export const getCartProduct: any = createAsyncThunk(
  "cart/getCartProduct",
  async (id: number) => {
    const response = await axios.get(`${URL}/carts?idUser_like=${id}`);
    return response.data;
  }
);
