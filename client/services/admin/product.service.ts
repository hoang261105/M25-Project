import { Products, UpdateProduct } from "@/interface/admin";
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

// API lấy tất cả sản phẩm
export const getAllProductAll: any = createAsyncThunk(
  "products/getAllProductAll",
  async () => {
    const response = await axios.get(`${URL}/products`);
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
    const { id, ...productData } = product; // Extract id from product
    const response = await axios.put(`${URL}/products/${id}`, productData);
    console.log("Updated product:", productData);

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

// API sắp xếp sản phẩm
export const sortProduct: any = createAsyncThunk(
  "products/sortProduct",
  async ({ categoryId, sort }: { categoryId: number; sort: string }) => {
    const response = await axios.get(
      `${URL}/products?_sort=product_name&_order=${sort}&categoryId=${categoryId}`
    );
    return response.data;
  }
);

// API sắp xếp sản phẩm theo giá
export const sortProductPrice: any = createAsyncThunk(
  "products/sortProductPrice",
  async ({ categoryId, sort }: { categoryId: number; sort: string }) => {
    const response = await axios.get(
      `${URL}/products?_sort=price&_order=${sort}&categoryId=${categoryId}`
    );
    return response.data;
  }
);

// API lấy sản phẩm theo id
export const getProductById: any = createAsyncThunk(
  "products/getProductById",
  async (id: number) => {
    const response = await axios.get(`${URL}/products/${id}`);
    return response.data;
  }
);

// API cập nhật hình ảnh liên quan
export const updateProductImages = createAsyncThunk(
  "products/updateProductImages",
  async ({ id, relatedImages }: { id: string; relatedImages: string[] }) => {
    // PATCH request to update only related images
    const response = await axios.patch(`${URL}/products/${id}`, {
      image: { related: relatedImages },
    });
    return response.data;
  }
);
