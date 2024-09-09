import { Users } from "@/interface/admin";
import {
  addUser,
  getAllUsers,
  searchUser,
  sortUser,
  updateUserStatus,
} from "@/services/admin/user.service";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const userState: Users[] = [];

const userReducer = createSlice({
  name: "users",
  initialState: {
    user: userState,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.user.push(action.payload);
      })
      .addCase(
        updateUserStatus.fulfilled,
        (state, action: PayloadAction<{ id: number; status: boolean }>) => {
          console.log("Payload received:", action.payload); // Log payload để kiểm tra
          const userIndex = state.user.findIndex(
            (user: Users) => user.id === action.payload.id
          );
          if (userIndex !== -1) {
            state.user[userIndex].status = action.payload.status;
          }
        }
      )
      .addCase(searchUser.fulfilled, (state, action) => {
        console.log(1234, action.payload);
        state.user = action.payload;
      })
      .addCase(sortUser.fulfilled, (state, action) => {
        console.log(22222222, action);

        state.user = action.payload;
      });
  },
});

export default userReducer.reducer;
