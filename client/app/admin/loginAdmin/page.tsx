"use client";
import { Admin } from "@/interface/admin";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function LoginAdmin() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState<Admin>({
    email: "",
    password: "",
  });

  const account = {
    email: "admin@gmail.com",
    password: "admin1234",
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      inputValue.email === account.email &&
      inputValue.password === account.password
    ) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Đăng nhập thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      router.push("/admin/adminHome");
      localStorage.setItem("admin", JSON.stringify(account));
    } else {
      Swal.fire({
        icon: "error",
        title: "Thông báo",
        text: "Tài khoản hoặc mật khẩu không đúng",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };
  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <h2 className="text-center text-red-500">Đăng nhập admin</h2>
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleLogin}>
                {/* Email input */}
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <input
                    type="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                    name="email"
                  />
                  <label className="form-label" htmlFor="form1Example13">
                    Email address
                  </label>
                </div>
                {/* Password input */}
                <div data-mdb-input-init="" className="form-outline mb-4">
                  <input
                    type="password"
                    name="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    onChange={handleChange}
                  />
                  <label className="form-label" htmlFor="form1Example23">
                    Password
                  </label>
                </div>
                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* Checkbox */}
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
                      id="form1Example3"
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                  <a href="#!">Forgot password?</a>
                </div>
                {/* Submit button */}
                <button
                  type="submit"
                  data-mdb-button-init=""
                  data-mdb-ripple-init=""
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign in
                </button>
                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>
                <a
                  data-mdb-ripple-init=""
                  className="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: "#3b5998" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f me-2" />
                  Continue with Facebook
                </a>
                <a
                  data-mdb-ripple-init=""
                  className="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: "#55acee" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter me-2" />
                  Continue with Twitter
                </a>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
