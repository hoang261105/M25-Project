"use client";
import { AddUser } from "@/interface/admin";
import { addUser, getAllUsers } from "@/services/admin/user.service";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function validateEmail(email: any) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export default function page() {
  const router = useRouter();
  const userState = useSelector((state: any) => state.users.user);
  console.log(userState);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
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

  const reset = () => {
    setInputValue({
      username: "",
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    if (!inputValue.username) {
      error.username = "Tên tài khoản không được để trống,";
      valid = false;
    } else {
      error.username = "";
    }

    if (!inputValue.email) {
      error.email = "Email không được để trống,";
      valid = false;
    } else if (!validateEmail(inputValue.email)) {
      error.email = "Email không hợp lệ";
      valid = false;
    } else if (
      userState.some((existUser: any) => existUser.email === inputValue.email)
    ) {
      error.email = "Email đã tồn tại";
      valid = false;
    } else {
      error.email = "";
    }

    if (!inputValue.fullName) {
      error.fullName = "Họ và tên không được để trống,";
      valid = false;
    } else {
      error.fullName = "";
    }

    if (!inputValue.password) {
      error.password = "Mật khẩu không được để trống,";
      valid = false;
    } else {
      error.password = "";
    }

    if (!inputValue.confirmPassword) {
      error.confirmPassword = "Xác nhận mật khẩu không được để trống,";
      valid = false;
    } else if (inputValue.password !== inputValue.confirmPassword) {
      error.confirmPassword = "Mật khẩu không khớp";
      valid = false;
    }
    setError({ ...error });

    if (valid) {
      const newUser = {
        user_id: Math.ceil(Math.random() * 10000),
        username: inputValue.username,
        fullName: inputValue.fullName,
        email: inputValue.email,
        password: inputValue.password,
        cart: [],
        status: true,
        role: false,
        avatar:
          "https://scontent.fhan18-1.fna.fbcdn.net/v/t1.30497-1/453178253_471506465671661_2781666950760530985_n.png?stp=dst-png_s200x200&_nc_cat=1&ccb=1-7&_nc_sid=136b72&_nc_ohc=VVXDQ2ftWTsQ7kNvgEsTadt&_nc_ht=scontent.fhan18-1.fna&_nc_gid=AXp3jmeNWjNNYIBHePTAf1C&oh=00_AYDz8-sNB58RG9XND9CXST7E2TwhmKQT842F2Wnbd1CajQ&oe=6701DFBA",
        phone: "",
        created_at: format(new Date(), "dd-MM-yyyy HH:mm:ss"),
        updated_at: "",
      };
      dispatch(addUser(newUser));
      reset();
      router.push("/user/login");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  return (
    <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
      <div className="row gx-lg-5 align-items-center mb-5">
        <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
          <h1
            className="my-5 display-5 fw-bold ls-tight"
            style={{ color: "hsl(218, 81%, 95%)" }}
          >
            The best offer <br />
            <span style={{ color: "hsl(218, 81%, 75%)" }}>
              for your business
            </span>
          </h1>
          <p
            className="mb-4 opacity-70"
            style={{ color: "hsl(218, 81%, 85%)" }}
          >
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Temporibus, expedita iusto veniam atque, magni tempora mollitia
            dolorum consequatur nulla, neque debitis eos reprehenderit quasi ab
            ipsum nisi dolorem modi. Quos?
          </p>
        </div>
        <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
          <div
            id="radius-shape-1"
            className="position-absolute rounded-circle shadow-5-strong"
          />
          <div
            id="radius-shape-2"
            className="position-absolute shadow-5-strong"
          />
          <div className="card bg-glass">
            <div className="card-body px-4 py-5 px-md-5">
              <form onSubmit={handleSubmit}>
                <h3>Đăng ký</h3> <br />
                {/* 2 column grid layout with text inputs for the first and last names */}
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Tên tài khoản
                  </label>
                  <input
                    type="text"
                    id="form3Example3"
                    className="form-control"
                    name="username"
                    placeholder="Nhập tên tài khoản"
                    onChange={handleChange}
                  />
                  {error.username && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.username}
                    </span>
                  )}
                </div>
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    id="form3Example3"
                    className="form-control"
                    name="fullName"
                    placeholder="Nhập họ và tên"
                    onChange={handleChange}
                  />
                  {error.fullName && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.fullName}
                    </span>
                  )}
                </div>
                {/* Email input */}
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example3">
                    Email
                  </label>
                  <input
                    type="text"
                    id="form3Example3"
                    className="form-control"
                    name="email"
                    placeholder="Nhập email"
                    onChange={handleChange}
                  />
                  {error.email && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.email}
                    </span>
                  )}
                </div>
                {/* Password input */}
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example4">
                    Mật khẩu
                  </label>
                  <input
                    type="password"
                    id="form3Example4"
                    name="password"
                    className="form-control"
                    placeholder="Nhập mật khẩu"
                    onChange={handleChange}
                  />
                  {error.password && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.password}
                    </span>
                  )}
                </div>
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <label className="form-label" htmlFor="form3Example4">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="form3Example4"
                    className="form-control"
                    placeholder="Xác nhận mật khẩu"
                    onChange={handleChange}
                  />
                  {error.confirmPassword && (
                    <span style={{ color: "red", fontSize: 14 }}>
                      {error.confirmPassword}
                    </span>
                  )}
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  data-mdb-button-init=""
                  data-mdb-ripple-init=""
                  className="btn btn-primary btn-block mb-4"
                >
                  Đăng ký
                </button>
                {/* Register buttons */}
                <div className="text-center">
                  <p>Hoặc đăng ký với:</p>
                  <button
                    type="button"
                    data-mdb-button-init=""
                    data-mdb-ripple-init=""
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-facebook-f" />
                  </button>
                  <button
                    type="button"
                    data-mdb-button-init=""
                    data-mdb-ripple-init=""
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-google" />
                  </button>
                  <button
                    type="button"
                    data-mdb-button-init=""
                    data-mdb-ripple-init=""
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-twitter" />
                  </button>
                  <button
                    type="button"
                    data-mdb-button-init=""
                    data-mdb-ripple-init=""
                    className="btn btn-link btn-floating mx-1"
                  >
                    <i className="fab fa-github" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
