"use client";
import { AddUser, LoginUser } from "@/interface/admin";
import { getAllUsers } from "@/services/admin/user.service";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function validateEmail(email: any) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export default function Login() {
  const users = useSelector((state: any) => state.users.user);
  console.log(users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);
  const [inputValue, setInputValue] = useState<LoginUser>({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleClick = () => {
    router.push("/user/sign-up");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!inputValue.email) {
      error.email = "Email không được để trống";
      valid = false;
    } else if (!validateEmail(inputValue.email)) {
      error.email = "Email không hợp lệ";
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

    if (valid && users.length > 0) {
      const findUser = users.find(
        (user: any) =>
          user.email === inputValue.email &&
          user.password === inputValue.password
      );
      if (findUser) {
        localStorage.setItem("user", JSON.stringify(findUser));
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Đăng nhập thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/user/home");
      } else {
        error.password = "Tài khoản hoặc mật khẩu không đúng";
        valid = false;
      }
    }
    setError({ ...error });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  return (
    <section
      className="h-100 gradient-form"
      style={{ backgroundColor: "#eee" }}
    >
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-10">
            <div className="card rounded-3 text-black">
              <div className="row g-0">
                <div className="col-lg-6">
                  <div className="card-body p-md-5 mx-md-4">
                    <div>
                      <img
                        src="https://dynamic.design.com/preview/logodraft/a5cb98da-d775-494c-85c5-3ca3f978a783/image/large.png"
                        style={{ width: 100 }}
                        alt="logo"
                      />
                      <h4 className="mt-1 mb-5 pb-1">Vio's Shop</h4>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <p>Đăng nhập tài khoản</p>
                      <div data-mdb-input-init="" className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example11">
                          Email
                        </label>
                        <input
                          type="text"
                          id="form2Example11"
                          className="form-control"
                          placeholder="Nhập email"
                          onChange={handleChange}
                          name="email"
                        />
                        {error.email && (
                          <span style={{ color: "red", fontSize: 14 }}>
                            {error.email}
                          </span>
                        )}
                      </div>
                      <div data-mdb-input-init="" className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example22">
                          Mật khẩu
                        </label>
                        <input
                          type="password"
                          id="form2Example22"
                          className="form-control"
                          onChange={handleChange}
                          name="password"
                        />
                        {error.password && (
                          <span style={{ color: "red", fontSize: 14 }}>
                            {error.password}
                          </span>
                        )}
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1 flex items-center justify-between">
                        <button
                          data-mdb-button-init=""
                          data-mdb-ripple-init=""
                          className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                          type="submit"
                        >
                          Đăng nhập
                        </button>
                        <a className="text-muted" href="#!">
                          Quên mật khẩu
                        </a>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Bạn chưa có tài khoản?</p>
                        <button
                          type="button"
                          data-mdb-button-init=""
                          data-mdb-ripple-init=""
                          className="btn btn-outline-danger"
                          onClick={handleClick}
                        >
                          Đăng kí
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">We are more than just a company</h4>
                    <p className="small mb-0">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
