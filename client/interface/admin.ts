export interface Admin {
  email: string;
  password: string;
}

export interface Users {
  id: number;
  user_id: number;
  username: string;
  email: string;
  fullName: string;
  status: boolean;
  password: string;
  role: boolean;
  avatar: string;
  phone: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface AddUser {
  username: string;
  email: string;
  fullName: string;
  password: string;
  confirmPassword: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface Category {
  id: number;
  image: string;
  category_name: string;
  description: string;
  status: boolean;
}

export interface AddCategory {
  category_name: string;
  description: string;
  image: string;
}

export interface Products {
  id: number;
  categoryId: number;
  product_name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  created_at: string;
  updated_at: string;
}

export interface AddProduct {
  product_name: string;
  description: string;
  price: number;
  quantity: string;
  image: string;
}
