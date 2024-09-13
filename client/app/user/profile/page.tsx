"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/user/Header";
import "@/styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import { getCartProduct } from "@/services/admin/cart.service";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { getFavouriteProduct } from "@/services/user/favourite.service";

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
  const [phone, setPhone] = useState<string>(account.phone || "");
  const router = useRouter();
  const [name, setName] = useState<string>(account.fullName || ""); // State for name
  const [address, setAddress] = useState<string>(account.address || ""); // State for address

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };
  useEffect(() => {
    if (account.id) {
      dispatch(getCartProduct(account.id));
      dispatch(getFavouriteProduct(account.id));
    }
  }, [dispatch, account.id]);

  const openModal = (type: "email" | "phone") => {
    setEditType(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleImageChange = (e: any) => {
    let image: any = e.target.files[0];
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(url);
      });
    });
  };

  const handleSaveImage = async () => {
    account.avatar = image; // Update the account object with the new image URL

    // Save the updated account in localStorage
    localStorage.setItem("user", JSON.stringify(account));

    // Update the image in the database (db.json)
    await axios.put(`http://localhost:8000/users/${account.id}`, {
      ...account, // Ensure other fields stay intact
      avatar: image, // Only update the avatar field
    });

    closeProfileModal(); // Close the modal after saving
  };

  // Function to handle saving email or phone
  const handleSave = async () => {
    if (editType === "email") {
      account.email = email; // Update email in the account object
    } else if (editType === "phone") {
      account.phone = phone; // Update phone in the account object
    }

    // Save the updated account in localStorage
    localStorage.setItem("user", JSON.stringify(account));

    // Update the email or phone in the database (db.json)
    await axios.put(`http://localhost:8000/users/${account.id}`, {
      ...account, // Ensure other fields stay intact
      email: account.email, // Update email
      phone: account.phone, // Update phone
    });

    closeModal(); // Close the modal after saving
  };

  // Function to handle saving profile information (Name, Email, Phone, Address)
  const handleSaveProfile = async () => {
    // Update local account object with new name, address, email, and phone
    account.fullName = name;
    account.address = address;
    account.email = email;
    account.phone = phone;

    // Save the updated account in localStorage
    localStorage.setItem("user", JSON.stringify(account));

    // Update the account in the database (db.json)
    await axios.put(`http://localhost:8000/users/${account.id}`, {
      ...account, // Ensure other fields stay intact
      name: account.fullName, // Update name
      address: account.address, // Update address
      email: account.email, // Update email
      phone: account.phone, // Update phone
    });

    // Close the modal or show a success message after saving
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Cập nhật thành công",
      showConfirmButton: false,
      timer: 1000,
    });
    router.push("/user/home");
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
                <Image
                  src={account.avatar}
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover"
                  width={100}
                  height={100}
                />
                <div>
                  <p className="font-semibold">{account.username}</p>
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
                      name="fullName"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                      Số điện thoại: {account.phone}
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
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 "
                    />
                  </div>

                  {/* Save Button */}
                  <div className="col-span-2 text-right">
                    <button
                      type="button"
                      className="bg-red-500 text-white px-6 py-2 rounded-lg"
                      onClick={handleSaveProfile}
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
                type={editType === "email" ? "email" : "phone"}
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
              <label className="block text-gray-700 mb-2">
                Hình ảnh hiện tại
              </label>
              <Image
                src={image || account.avatar} // Hiển thị hình ảnh hiện tại
                alt="Avatar"
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <label className="block text-gray-700 mb-2">Hình ảnh</label>
              <input
                type="file"
                className="w-full p-2 border border-gray-300 rounded-lg"
                name="avatar"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleSaveImage()}
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
