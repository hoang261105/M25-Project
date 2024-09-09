"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function Menu() {
  const router = useRouter();
  const [admin, setAdmin] = useState<any>([]);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const adminData = localStorage.getItem("admin");
    if (!adminData) {
      router.push("/admin/loginAdmin");
    } else {
      setAdmin(JSON.parse(adminData));
    }
  }, [router]);

  useEffect(() => {
    // Cập nhật activeItem dựa trên đường dẫn hiện tại
    const currentPath = window.location.pathname;
    if (currentPath === "/admin/adminHome") {
      setActiveItem("Trang chủ");
    } else if (currentPath === "/admin/adminUser") {
      setActiveItem("Quản lí tài khoản");
    } else if (currentPath === "/admin/adminCategory") {
      setActiveItem("Quản lí danh mục");
    } else if (currentPath === "/admin/adminProducts") {
      setActiveItem("Quản lí sản phẩm");
    } else if (currentPath === "/admin/adminCarts") {
      setActiveItem("Quản lí đơn hàng");
    }
  }, [router]); // Lắng nghe sự thay đổi của router

  const handleLogout = () => {
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
          router.push("/admin/loginAdmin");
          localStorage.removeItem("admin");
          setAdmin(null);
        }, 1500);
      } else if (result.isDenied) {
        Swal.fire("Không có gì thay đổi", "", "info");
      }
    });
  };

  return (
    <div className="menu">
      <div className="sidebar-brand">
        <h2>
          <i className="fa-solid fa-hat-cowboy-side"></i> AccuSoft
        </h2>
      </div>

      <div className="sidebar-menu">
        <ul>
          <li>
            <a
              href="/admin/adminHome"
              className={activeItem === "Trang chủ" ? "active" : ""}
            >
              <i className="fa-solid fa-house"></i> <span>Trang chủ</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/adminUser"
              className={activeItem === "Quản lí tài khoản" ? "active" : ""}
            >
              <i className="fa-solid fa-user-large"></i>{" "}
              <span>Quản lí tài khoản</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/adminCategory"
              className={activeItem === "Quản lí danh mục" ? "active" : ""}
            >
              <i className="fa-solid fa-layer-group"></i>{" "}
              <span>Quản lí danh mục</span>
            </a>
          </li>
          <li>
            <a
              href="/admin/adminCarts"
              className={activeItem === "Quản lí đơn hàng" ? "active" : ""}
            >
              <i className="fa-solid fa-cart-shopping"></i>{" "}
              <span>Quản lí đơn hàng</span>
            </a>
          </li>
          <li className="logout">
            <a href="#" onClick={handleLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>{" "}
              <span>Đăng xuất</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
