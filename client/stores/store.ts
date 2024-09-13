import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/admin/userReducer"; // Đảm bảo đường dẫn đúng
import categoryReducer from "./reducers/admin/categoryReducer";
import productReducer from "./reducers/admin/productReducer";
import cartReducer from "./reducers/user/cartReducer";
import favourReducer from "./reducers/user/favourReducer";

// Khởi tạo store với reducer
const store = configureStore({
  reducer: {
    users: userReducer, // Đảm bảo 'users' là đúng state bạn muốn quản lý
    categories: categoryReducer,
    products: productReducer,
    carts: cartReducer,
    favourite: favourReducer,
  },
});

export default store;
