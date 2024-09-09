import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let URL = process.env.NEXT_PUBLIC_VITE_BASE_URL;

// API lấy sản phẩm theo id danh mục
export const getAllProduct: any = createAsyncThunk(
  "products/getAllProduct",
  async (id: number) => {
    const response = await axios.get(`${URL}/products?categoryId_like=${id}`);
    return response.data;
  }
);

// API thêm sản phẩm
export const addProduct: any = createAsyncThunk(
  "products/addProduct",
  async (product: any) => {
    const response = await axios.post(`${URL}/products`, product);
    return response.data;
  }
);

// API xóa sản phẩm
export const deleteProduct: any = createAsyncThunk(
  "products/deleteProduct",
  async (id: number) => {
    const response = await axios.delete(`${URL}/products/${id}`);
    return id;
  }
);

// API sửa sản phẩm
export const updateProduct: any = createAsyncThunk(
  "products/updateProduct",
  async (product: any) => {
    const response = await axios.put(`${URL}/products/${product.id}`, product);
    return response.data;
  }
);

// API tìm sản phẩm
export const searchProduct: any = createAsyncThunk(
  "products/searchProduct",
  async ({ search, categoryId }: { search: string; categoryId: number }) => {
    const response = await axios.get(
      `${URL}/products?product_name_like=${search}&categoryId=${categoryId}`
    );
    return response.data;
  }
);
