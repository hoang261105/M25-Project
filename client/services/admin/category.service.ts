import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;

// API lấy tất cả danh mục
export const getAllCategories: any = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    const response = await axios.get(`${URL}/categories`);
    return response.data;
  }
);

// API thêm danh mục
export const addCategory: any = createAsyncThunk(
  "categories/addCategory",
  async (category: any) => {
    const response = await axios.post(`${URL}/categories`, category);
    return response.data;
  }
);

// API xóa danh mục
export const deleteCategory: any = createAsyncThunk(
  "categories/deleteCategory",
  async (id: any) => {
    const response = await axios.delete(`${URL}/categories/${id}`);
    return response.data;
  }
);

// API sửa danh mục
export const updateCategory: any = createAsyncThunk(
  "categories/updateCategory",
  async (data: any) => {
    const response = await axios.put(`${URL}/categories/${data.id}`, data);
    return response.data;
  }
);
