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

// API thêm vào giỏ hàng
export const addToCart: any = createAsyncThunk(
  "cart/addToCart",
  async (data: any) => {
    const response = await axios.post(`${URL}/carts`, data);
    return response.data;
  }
);

// API cap nhat gio hang neu san pham da ton tai
export const updatedCart: any = createAsyncThunk(
  "cart/updatedCart",
  async (cart: any) => {
    const response = await axios.patch(`${URL}/carts/${cart.id}`, cart);
    return response.data;
  }
);

// API xóa sản phẩm trong giỏ
export const deletedProductToCart: any = createAsyncThunk(
  "cart/deletedProductToCart",
  async (id: number) => {
    const response = await axios.delete(`${URL}/carts/${id}`);
    return id;
  }
);

// API cập nhật số lượng
export const updateProductQuantity: any = createAsyncThunk(
  "cart/updateProductQuantity",
  async (
    {
      itemId,
      quantity,
      idUser,
    }: { itemId: number; quantity: number; idUser: string },
    thunkAPI
  ) => {
    try {
      // API call to update quantity
      const response = await axios.patch(`${URL}/carts/${itemId}`, {
        quantity,
        idUser, // Ensure you're sending user ID if needed
      });
      return { itemId, quantity }; // Return updated data
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update quantity");
    }
  }
);
