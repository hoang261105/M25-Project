"use client";
import Menu from "@/components/admin/Menu";
import React, { ReactNode, useEffect, useState } from "react";
import "@/styles/admin.scss";

import Image from "next/image";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  getAllUsers,
  searchUser,
  sortUser,
  updateUserStatus,
} from "@/services/admin/user.service";
import { AddUser, Users } from "@/interface/admin";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

function validateEmail(email: any) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export default function AdminUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10); // Default records per page

  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showUnblockModal, setShowUnblockModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<Users | null>(null);
  const [inputValue, setInputValue] = useState<AddUser>({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const userState = useSelector((state: any) => state.users.user);
  const dispatch = useDispatch();
  console.log(66666, userState);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const [show, setShow] = useState(false);

  const [shows, setShows] = useState(false);

  const handleCloseForm = () => setShows(false);
  const handleShowForm = () => setShows(true);

  const reset = () => {
    setInputValue({
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // Hàm thêm user
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleAdd = () => {
    let valid = true;
    if (!inputValue.username) {
      error.username = "Tên không được để trống";
      valid = false;
    } else {
      error.username = "";
    }

    if (!inputValue.email) {
      error.email = "Email không được để trống";
      valid = false;
    } else if (!validateEmail(inputValue.email)) {
      error.email = "Email không đúng định dạng";
      valid = false;
    } else if (
      userState.some((existUser: any) => existUser.email === inputValue.email)
    ) {
      error.email = "Email đã tồn tại";
      valid = false;
    } else {
      error.email = "";
    }

    if (!inputValue.password) {
      error.password = "Mật khẩu không được để trống";
      valid = false;
    } else {
      error.password = "";
    }

    if (!inputValue.confirmPassword) {
      error.confirmPassword = "Xác nhận mật khẩu không được để trống";
      valid = false;
    } else if (inputValue.password !== inputValue.confirmPassword) {
      error.confirmPassword = "Mật khẩu không khớp";
      valid = false;
    } else {
      error.confirmPassword = "";
    }

    setError({ ...error });

    if (valid) {
      const newUser = {
        user_id: Math.ceil(Math.random() * 10000),
        fullName: "",
        username: inputValue.username,
        email: inputValue.email,
        password: inputValue.password,
        status: true,
        role: false,
        address: "",
        avatar:
          "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=VVXDQ2ftWTsQ7kNvgEsTadt&_nc_ht=scontent.fhan18-1.fna&_nc_gid=AXp3jmeNWjNNYIBHePTAf1C&oh=00_AYDz8-sNB58RG9XND9CXST7E2TwhmKQT842F2Wnbd1CajQ&oe=6701DFBA",
        phone: "",
        created_at: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
        updated_at: "",
      };
      dispatch(addUser(newUser));
      setShows(false);
      reset();
    }
  };

  const handleCloses = () => setShow(false);
  const handleShows = (id: number) => {
    const showInfo = userState.find((user: Users) => user.id === id);
    console.log(showInfo);
    if (showInfo) {
      setSelectedUser(showInfo);
      setShow(true);
    }
  };

  // Hàm mở modal xác nhận chặn và bỏ chặn
  const handleShowBlockModal = (userId: number) => {
    setSelectedUserId(userId);
    setShowBlockModal(true);
  };

  const handleHideBlockModal = () => {
    setSelectedUserId(null);
    setShowBlockModal(false);
  };

  const handleShowUnblockModal = (userId: number) => {
    setSelectedUserId(userId);
    setShowUnblockModal(true);
  };

  const handleHideUnblockModal = () => {
    setSelectedUserId(null);
    setShowUnblockModal(false);
  };

  // Hàm chặn và bỏ chặn
  const handleBlockUser = (e: any) => {
    e.preventDefault();
    if (selectedUserId !== null) {
      console.log("Blocking user ID:", selectedUserId);
      dispatch(updateUserStatus({ id: selectedUserId, status: false }));
      handleHideBlockModal();
    }
  };

  const handleUnblockUser = (e: any) => {
    e.preventDefault();
    if (selectedUserId !== null) {
      dispatch(updateUserStatus({ id: selectedUserId, status: true }));
      handleHideUnblockModal();
    }
  };

  // Hàm tìm kiếm user
  const [search, setSearch] = useState<string>("");
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    await dispatch(searchUser(e.target.value));
  };

  // Hàm sắp xếp user
  const handleSort = (order: string) => {
    console.log(1111, order);

    dispatch(sortUser(order));
  };

  // Hàm phân trang user
  const totalUsers = userState.length;
  const totalPages = Math.ceil(totalUsers / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const currentUsers = userState.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="sidebar">
      <Menu />

      <Modal show={shows} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới người dùng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên người dùng</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên người dùng"
                autoFocus
                onChange={handleChange}
                name="username"
              />
              {error.username && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.username}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập email"
                autoFocus
                onChange={handleChange}
                name="email"
              />
              {error.email && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.email}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nhập mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập mật khẩu"
                autoFocus
                onChange={handleChange}
                name="password"
              />
              {error.password && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.password}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control
                type="password"
                placeholder="Nhập xác nhận mật khẩu"
                autoFocus
                onChange={handleChange}
                name="confirmPassword"
              />
              {error.confirmPassword && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.confirmPassword}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForm}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="main-content">
        <header className="header">
          <div className="header-title">
            <b style={{ fontSize: 20 }}>
              <label htmlFor="">
                <i className="fa-solid fa-bars"></i>
              </label>{" "}
              Quản lí tài khoản
            </b>
          </div>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Tìm kiếm tại đây"
              onInput={handleSearch}
              value={search}
            />
          </div>

          <div className="user-wrapper">
            <Image
              src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/457195263_1761669491308311_8721717277530948710_n.jpg?stp=dst-jpg_s200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=DeusZW47pvYQ7kNvgH_NkmO&_nc_ht=scontent.fhan18-1.fna&oh=00_AYDyj0z16iFGUez8JUY1wJBqDR_EuTHjJIg07fp3ptzVRg&oe=66DED4D7"
              alt=""
              width={40}
              height={40}
            />
            <div>
              <h4>Hoàng</h4>
              <small>Super Admin</small>
            </div>
          </div>
        </header>
        <main>
          <div className="table-wrapper">
            <div className="title flex justify-between">
              <h3 className="main-title">Bảng quản lí tài khoản</h3>
              <div className="flex w-96 h-10 gap-2">
                <Form.Select
                  aria-label="Default select example"
                  className="w-20"
                  onChange={(e) => handleSort(e.target.value)}
                >
                  <option value="asc">Từ A-Z</option>
                  <option value="2">Ngày tạo</option>
                  <option value="desc">Từ Z-A</option>
                </Form.Select>
                <Button
                  variant="primary"
                  onClick={handleShowForm}
                  className="w-full"
                >
                  Thêm người dùng
                </Button>
              </div>
            </div>
            <br />
            <div className="table-container">
              <table width={"100%"} style={{ textAlign: "center" }}>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Hình ảnh</th>
                    <th>Tên tài khoản</th>
                    <th>Email</th>
                    <th>Ngày đăng kí</th>
                    <th>Địa chỉ</th>
                    <th>Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers?.map((user: Users, index: number) => (
                    <tr
                      key={user.id}
                      style={{ opacity: user.status === false ? 0.5 : 1 }}
                    >
                      <td>{startIndex + index + 1}</td>{" "}
                      {/* Adjust index for the page */}
                      <td>
                        <Image
                          src={user.avatar}
                          alt=""
                          width={40}
                          height={40}
                        />
                      </td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.created_at}</td>
                      <td>{user.address}</td>
                      <td className="flex gap-2 justify-center">
                        <Button
                          variant="primary"
                          onClick={() => handleShows(user.id)}
                        >
                          Xem
                        </Button>
                        {user.status === false ? (
                          <Button
                            variant="success"
                            onClick={() => handleShowUnblockModal(user.id)}
                          >
                            Bỏ chặn
                          </Button>
                        ) : (
                          <Button
                            variant="danger"
                            onClick={() => handleShowBlockModal(user.id)}
                          >
                            Chặn
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <div className="statistical">
              <div className="total-records">
                <p>Hiển thị 10/20 bản ghi</p>
              </div>
              <div className="pagination">
                <Form.Select
                  value={recordsPerPage}
                  onChange={(e) => {
                    setRecordsPerPage(parseInt(e.target.value, 10));
                    setCurrentPage(1); // Reset to the first page
                  }}
                >
                  <option value="10">Hiển thị 10 bản ghi trên trang</option>
                  <option value="20">Hiển thị 20 bản ghi trên trang</option>
                  <option value="50">Hiển thị 50 bản ghi trên trang</option>
                  <option value="100">Hiển thị 100 bản ghi trên trang</option>
                </Form.Select>

                <div className="button">
                  <button disabled={currentPage === 1} onClick={handlePrevPage}>
                    Pre
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageSelect(index + 1)}
                      className={currentPage === index + 1 ? "active" : ""}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={handleNextPage}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Modal show={show} onHide={handleCloses}>
          <Modal.Header closeButton>
            <Modal.Title>Thông tin chi tiết</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedUser && (
              <div style={{ display: "flex", gap: 50 }}>
                <div>
                  <p>Tên tài khoản: {selectedUser.username}</p>
                  <p>Họ và tên: {selectedUser.fullName}</p>
                  <p>Email: {selectedUser.email}</p>
                  <p>
                    Trạng thái:{" "}
                    {selectedUser.status === true ? "Hoạt động" : "Bị chặn"}
                  </p>
                  <p>Ngày đăng ký: {selectedUser.created_at}</p>
                  <p>Địa chỉ: {selectedUser.address}</p>
                </div>
                <div>
                  <img src={selectedUser.avatar} alt="" className="w-32 h-32" />
                </div>
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloses}>
              Đóng
            </Button>
          </Modal.Footer>
        </Modal>
        <br />

        <Modal show={showBlockModal} onHide={handleHideBlockModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận chặn tài khoản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn muốn chặn tài khoản {selectedUser?.username}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideBlockModal}>
              Hủy
            </Button>
            <Button variant="danger" onClick={handleBlockUser}>
              Chặn
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showUnblockModal} onHide={handleHideUnblockModal}>
          <Modal.Header closeButton>
            <Modal.Title>Xác nhận bỏ chặn tài khoản</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Bạn có chắc chắn muốn bỏ chặn tài khoản {selectedUser?.username}?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHideUnblockModal}>
              Hủy
            </Button>
            <Button variant="success" onClick={handleUnblockUser}>
              Bỏ chặn
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
