"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/user/Header";
import "@/styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import { getCartProduct } from "@/services/admin/cart.service";

export default function Page() {
  let account = JSON.parse(localStorage.getItem("user") || "[]");
  const cartState = useSelector((state: any) => state.carts.cart);
  const dispatch = useDispatch();

  // State for modal visibility
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>(account.avatar);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editType, setEditType] = useState<"email" | "phone" | null>(null);
  const [email, setEmail] = useState<string>(account.email);
  const [phone, setPhone] = useState<string>("");

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  useEffect(() => {
    if (account.id) {
      dispatch(getCartProduct(account.id));
    }
  }, [dispatch, account.id]);

  const openModal = (type: "email" | "phone") => {
    setEditType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Handle the save logic here
    console.log(`Saving ${editType}:`, editType === "email" ? email : phone);
    closeModal();
  };

  return (
    <>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="container mx-auto">
          <div className="flex gap-8">
            {/* Sidebar */}
            <div className="w-1/4 bg-white shadow-lg rounded-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={account.avatar}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{account.fullName}</p>
                  <button
                    className="text-sm text-blue-500"
                    onClick={openProfileModal}
                  >
                    Thay đổi hình ảnh
                  </button>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="text-gray-700 font-semibold">
                  Tài Khoản Của Tôi
                </li>
                <li className="text-gray-600">Hồ Sơ</li>
                <li className="text-gray-600">Ngân Hàng</li>
                <li className="text-gray-600">Địa Chỉ</li>
                <li className="text-gray-600">Đổi Mật Khẩu</li>
                <li className="text-gray-600">Cài Đặt Thông Báo</li>
                <li className="text-gray-600">Những Thiết Lập Riêng Tư</li>
              </ul>
            </div>

            {/* Profile Form */}
            <div className="w-3/4 bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-6">Hồ Sơ Của Tôi</h2>
              <p className="text-gray-600 mb-4">
                Quản lý thông tin hồ sơ để bảo mật tài khoản
              </p>
              <form>
                <div className="grid grid-cols-2 gap-6">
                  {/* Username */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">
                      Tên đăng nhập
                    </label>
                    <input
                      type="text"
                      value={account.username}
                      disabled
                      className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 "
                    />
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-gray-700 mb-2">Tên</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={account.email}
                      disabled
                      className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                    <button
                      type="button"
                      className="text-blue-500 text-sm mt-1"
                      onClick={() => openModal("email")}
                    >
                      Thay Đổi
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">
                      Số điện thoại
                    </label>
                    <button
                      type="button"
                      className="text-blue-500 text-sm"
                      onClick={() => openModal("phone")}
                    >
                      Thêm
                    </button>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-gray-700 mb-2">Địa chỉ</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 "
                    />
                  </div>

                  {/* Save Button */}
                  <div className="col-span-2 text-right">
                    <button
                      type="submit"
                      className="bg-red-500 text-white px-6 py-2 rounded-lg"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black opacity-50 absolute inset-0"
            onClick={closeModal}
          ></div>
          <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
            <h2 className="text-xl font-semibold mb-4">
              {editType === "email"
                ? "Thay Đổi Email"
                : "Thay Đổi Số Điện Thoại"}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">
                {editType === "email" ? "Email Mới" : "Số Điện Thoại Mới"}
              </label>
              <input
                type={editType === "email" ? "email" : "tel"}
                value={editType === "email" ? email : phone}
                onChange={(e) =>
                  editType === "email"
                    ? setEmail(e.target.value)
                    : setPhone(e.target.value)
                }
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={handleSave}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Lưu
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {isProfileModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black opacity-50 absolute inset-0"
            onClick={closeProfileModal}
          ></div>
          <div className="bg-white rounded-lg shadow-lg p-6 relative z-10">
            <h2 className="text-xl font-semibold mb-4">Sửa Hình ảnh</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Hình ảnh</label>
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  closeProfileModal();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Lưu
              </button>
              <button
                type="button"
                onClick={closeProfileModal}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
