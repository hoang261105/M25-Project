"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";

export default function Header() {
  const [account, setAccount] = useState(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const router = useRouter();
  const handleLogOut = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất không?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Có",
      denyButtonText: `Không`,
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire("Đăng xuất thành công", "", "success");
        setTimeout(() => {
          router.push("/user/login");
          localStorage.removeItem("user");
          setAccount(null);
        }, 1500);
      } else if (result.isDenied) {
        Swal.fire("Không có gì thay đổi", "", "info");
      }
    });
  };
  return (
    <div className="header">
      <div className="ipad-header-top">
        <div className="header-left">
          <a href="">
            <img
              src="https://dynamic.design.com/preview/logodraft/a5cb98da-d775-494c-85c5-3ca3f978a783/image/large.png"
              alt=""
              className="logos"
            />
          </a>
          <p>Vio's Shop</p>
        </div>
        <div className="container1">
          <form action="" id="form-input">
            <input
              type="search"
              id="myInput"
              name="search"
              placeholder="Tìm kiếm ở đây"
            />
            <ul id="myUL">{/* <li><a href="#">Athens</a></li> */}</ul>
          </form>
        </div>

        <div className="header-right">
          <nav className="header-nav">
            <a href="/user/home" className="nav-item">
              Trang chủ
            </a>
            <a href="" className="nav-item">
              Yêu thích
            </a>
          </nav>
          <div id="loginOut" className="flex gap-3 text-lg">
            {account ? (
              <div className="flex items-center gap-4">
                <a href={"/profile"}>
                  <img
                    src={account.avatar}
                    alt=""
                    className="w-9 h-9"
                    style={{ borderRadius: "50%" }}
                  />
                </a>
                <div className="profile">
                  <a href={"/profile"}>{account.fullName}</a>
                  <a href="" style={{ color: "orange" }}>
                    <i className="fa-solid fa-cart-shopping"></i>{" "}
                    <span>Giỏ hàng</span>
                  </a>
                </div>
                <button onClick={handleLogOut}>
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </div>
            ) : (
              <>
                <a href={"/user/login"}>Đăng nhập</a>
                <a href={"/user/sign-up"}>Đăng kí</a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
