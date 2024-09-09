import React, { useState } from "react";
import "@/styles/admin.scss";
import Menu from "@/components/admin/Menu";
import Image from "next/image";

export default function AdminHome() {
  return (
    <div className="sidebar">
      <Menu />

      <div className="main-content">
        <header className="header">
          <div className="header-title">
            <b style={{ fontSize: 20 }}>
              <label htmlFor="">
                <i className="fa-solid fa-bars"></i>
              </label>{" "}
              Trang chủ
            </b>
          </div>
          <div className="search-wrapper">
            <input type="text" placeholder="Tìm kiếm tại đây" />
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
          <div className="cards">
            <div className="card-single">
              <div>
                <span>541</span> <br />
                <span>Khách hàng</span>
              </div>
              <div>
                <i className="fa-solid fa-user-large"></i>
              </div>
            </div>
            <div className="card-single">
              <div>
                <span>79</span> <br />
                <span>Sản phẩm</span>
              </div>
              <div>
                <i className="fa-brands fa-product-hunt"></i>
              </div>
            </div>
            <div className="card-single">
              <div>
                <span>100</span> <br />
                <span>Đơn hàng</span>
              </div>
              <div>
                <i className="fa-solid fa-user-large"></i>
              </div>
            </div>
            <div className="card-single">
              <div>
                <span>100.000</span> <br />
                <span>Thu nhập</span>
              </div>
              <div>
                <i className="fa-solid fa-wallet"></i>
              </div>
            </div>
          </div>

          <div className="recent-grid">
            <div className="products">
              <div className="card">
                <div className="card-header">
                  <h2>Sản phẩm bán chạy</h2>
                  <button>
                    Xem tất cả <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>

                <div className="table-wrapper">
                  <table width={"100%"} style={{ textAlign: "center" }}>
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên sản phẩm</th>
                        <th>Số lượt bán</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                      <tr>
                        <td>1</td>
                        <td>Sữa tươi Mộc Châu</td>
                        <td>12000</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Sữa tươi Mộc Châu</td>
                        <td>12000</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Sữa tươi Mộc Châu</td>
                        <td>12000</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Sữa tươi Mộc Châu</td>
                        <td>12000</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Sữa tươi Mộc Châu</td>
                        <td>12000</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Sữa tươi Mộc Châu</td>
                        <td>12000</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Sữa tươi Mộc Châu</td>
                        <td>12000</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Sữa tươi Mộc Châu</td>
                        <td>12000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="customers">
              <div className="card">
                <div className="card-header">
                  <h3>Khách hàng mới</h3>
                  <button>
                    Xem tất cả <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>
                <div className="table-wrapper">
                  <div className="customer">
                    <div className="info">
                      <Image
                        src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/457195263_1761669491308311_8721717277530948710_n.jpg?stp=dst-jpg_s200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=DeusZW47pvYQ7kNvgH_NkmO&_nc_ht=scontent.fhan18-1.fna&oh=00_AYDyj0z16iFGUez8JUY1wJBqDR_EuTHjJIg07fp3ptzVRg&oe=66DED4D7"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <div>
                        <b>Nhã Hương</b> <br />
                        <small>Quản trị kinh doanh</small>
                      </div>
                    </div>
                    <div className="contact">
                      <i className="fa-regular fa-circle-user"></i>{" "}
                      <i className="fa-regular fa-comment"></i>{" "}
                      <i className="fa-solid fa-phone"></i>{" "}
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <Image
                        src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/457195263_1761669491308311_8721717277530948710_n.jpg?stp=dst-jpg_s200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=DeusZW47pvYQ7kNvgH_NkmO&_nc_ht=scontent.fhan18-1.fna&oh=00_AYDyj0z16iFGUez8JUY1wJBqDR_EuTHjJIg07fp3ptzVRg&oe=66DED4D7"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <div>
                        <b>Nhã Hương</b> <br />
                        <small>Quản trị kinh doanh</small>
                      </div>
                    </div>
                    <div className="contact">
                      <i className="fa-regular fa-circle-user"></i>{" "}
                      <i className="fa-regular fa-comment"></i>{" "}
                      <i className="fa-solid fa-phone"></i>{" "}
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <Image
                        src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/457195263_1761669491308311_8721717277530948710_n.jpg?stp=dst-jpg_s200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=DeusZW47pvYQ7kNvgH_NkmO&_nc_ht=scontent.fhan18-1.fna&oh=00_AYDyj0z16iFGUez8JUY1wJBqDR_EuTHjJIg07fp3ptzVRg&oe=66DED4D7"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <div>
                        <b>Nhã Hương</b> <br />
                        <small>Quản trị kinh doanh</small>
                      </div>
                    </div>
                    <div className="contact">
                      <i className="fa-regular fa-circle-user"></i>{" "}
                      <i className="fa-regular fa-comment"></i>{" "}
                      <i className="fa-solid fa-phone"></i>{" "}
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <Image
                        src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/457195263_1761669491308311_8721717277530948710_n.jpg?stp=dst-jpg_s200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=DeusZW47pvYQ7kNvgH_NkmO&_nc_ht=scontent.fhan18-1.fna&oh=00_AYDyj0z16iFGUez8JUY1wJBqDR_EuTHjJIg07fp3ptzVRg&oe=66DED4D7"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <div>
                        <b>Nhã Hương</b> <br />
                        <small>Quản trị kinh doanh</small>
                      </div>
                    </div>
                    <div className="contact">
                      <i className="fa-regular fa-circle-user"></i>{" "}
                      <i className="fa-regular fa-comment"></i>{" "}
                      <i className="fa-solid fa-phone"></i>{" "}
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <Image
                        src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/457195263_1761669491308311_8721717277530948710_n.jpg?stp=dst-jpg_s200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=DeusZW47pvYQ7kNvgH_NkmO&_nc_ht=scontent.fhan18-1.fna&oh=00_AYDyj0z16iFGUez8JUY1wJBqDR_EuTHjJIg07fp3ptzVRg&oe=66DED4D7"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <div>
                        <b>Nhã Hương</b> <br />
                        <small>Quản trị kinh doanh</small>
                      </div>
                    </div>
                    <div className="contact">
                      <i className="fa-regular fa-circle-user"></i>{" "}
                      <i className="fa-regular fa-comment"></i>{" "}
                      <i className="fa-solid fa-phone"></i>{" "}
                    </div>
                  </div>
                  <div className="customer">
                    <div className="info">
                      <Image
                        src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/457195263_1761669491308311_8721717277530948710_n.jpg?stp=dst-jpg_s200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=DeusZW47pvYQ7kNvgH_NkmO&_nc_ht=scontent.fhan18-1.fna&oh=00_AYDyj0z16iFGUez8JUY1wJBqDR_EuTHjJIg07fp3ptzVRg&oe=66DED4D7"
                        alt=""
                        width={40}
                        height={40}
                      />
                      <div>
                        <b>Nhã Hương</b> <br />
                        <small>Quản trị kinh doanh</small>
                      </div>
                    </div>
                    <div className="contact">
                      <i className="fa-regular fa-circle-user"></i>{" "}
                      <i className="fa-regular fa-comment"></i>{" "}
                      <i className="fa-solid fa-phone"></i>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
