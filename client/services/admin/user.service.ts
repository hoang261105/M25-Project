import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;

// API lấy tất cả user
export const getAllUsers: any = createAsyncThunk(
  "users/getAllUsers",
  async () => {
    const response = await axios.get(`${URL}/users`);
    return response.data;
  }
);

// API thêm user
export const addUser: any = createAsyncThunk(
  "users/addUser",
  async (data: any) => {
    const response = await axios.post(`${URL}/users`, data);
    return response.data;
  }
);

// API cập nhật trạng thái user
export const updateUserStatus: any = createAsyncThunk(
  "users/updateUserStatus",
  async (data: any) => {
    const response = await axios.patch(`${URL}/users/${data.id}`, data);
    return response.data;
  }
);

// API tìm kiếm user
export const searchUser: any = createAsyncThunk(
  "users/searchUser",
  async (searchItem: string) => {
    const response = await axios.get(
      `${URL}/users?username_like=${searchItem}`
    );
    return response.data;
  }
);

// API sắp xếp user từ A-Z
export const sortUser: any = createAsyncThunk(
  "users/sortUser",
  async (sortItem: string) => {
    const response = await axios.get(
      `${URL}/users?_sort=username&_order=${sortItem}`
    );
    return response.data;
  }
);
