import React from "react";

export default function Footer() {
  return (
    <>
      {/* footer start */}
      <footer className="footer" style={{ marginTop: 30 }}>
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-logo">
              <img
                id="img"
                src="https://dynamic.design.com/preview/logodraft/a5cb98da-d775-494c-85c5-3ca3f978a783/image/large.png"
                alt=""
                style={{ width: 100, height: 100, borderRadius: "50%" }}
              />
              <h1 style={{ fontWeight: 500 }}>
                Vio'Shop - Chuyên bán đồ gia dụng
              </h1>
            </div>
            <p>
              Vio's Shop là một hệ thống cửa hàng mua sắm linh hoạt và tiện ích.
              Người dùng có thể mua các sản phẩm theo ý muốn. Hệ thống cung cấp
              các loại sản phẩm đa dạng và tính năng tùy chỉnh, cùng với công cụ
              quản lý.
            </p>
            <div className="flogo-list">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-twitter"></i>
              <i className="fa-brands fa-github"></i>
              <i className="fa-brands fa-instagram"></i>
            </div>
          </div>
          <div className="footer-right">
            <table className="ftable">
              <tbody>
                <tr className="ftable-items">
                  <th style={{ textAlign: "center" }}>Về Vio's Shop</th>
                  <th style={{ textAlign: "center" }}>Hỗ trợ</th>
                  <th style={{ textAlign: "center" }}>Thông tin khác</th>
                </tr>
                <tr className="ftable-items">
                  <td className="ftable-item">
                    <i className="fa-solid fa-building" /> Hoàng
                  </td>
                  <td className="ftable-item">
                    <i className="fa-solid fa-circle-info" /> Điều khoản
                  </td>
                  <td className="ftable-item">
                    <i className="fa-solid fa-blog" /> Group 3 blog
                  </td>
                </tr>
                <tr className="ftable-items">
                  <td className="ftable-item">
                    <i className="fa-solid fa-users" /> Tuyển dụng
                  </td>
                  <td className="ftable-item">
                    <i className="fa-solid fa-shield-halved" /> Bảo mật
                  </td>
                  <td className="ftable-item">
                    <i className="fa-solid fa-circle-question" /> Thông tin đề
                    thi
                  </td>
                </tr>
                <tr className="ftable-items">
                  <td className="ftable-item">
                    <i className="fa-solid fa-shop" /> Group 3 Mall
                  </td>
                  <td className="ftable-item">
                    <i className="fa-solid fa-truck-fast" /> Dịch vụ
                  </td>
                  <td className="ftable-item">
                    <i className="fa-solid fa-handshake" /> Cam kết
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <hr />
        <div className="end">
          <div className="end-left">
            <span>@ 2024 OnlineTest. Creat with</span>
            <i className="fa-solid fa-heart" style={{ color: "red" }}></i>
            <span>by Hoang</span>
          </div>
          <div className="end-right">
            <span>Uy tín tạo nên thương hiệu!</span>
          </div>
        </div>
      </footer>
      {/* footer end */}
    </>
  );
}
