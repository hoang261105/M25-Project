"use client";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import React from "react";
import "@/styles/product.css";
import "@/styles/home.css";
import { Button, Carousel } from "react-bootstrap";

export default function page() {
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Carousel data-bs-theme="dark" interval={2000}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cf.shopee.vn/file/sg-11134258-7rdya-lzsvd77a4yyv84_xxhdpi"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cf.shopee.vn/file/sg-11134258-7rdxr-lzsvrg5di34qd9_xhdpi"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cf.shopee.vn/file/sg-11134258-7rdy2-lzsvwjqutx2i0b_xhdpi"
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://cf.shopee.vn/file/vn-11134258-7r98o-lygfmvwtyvtta1_xxhdpi"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>

      <div className="container">
        <div>
          <h2>Sản phẩm</h2>
        </div>
        <b>Lọc theo giá</b>
        <div className="filter">
          <input type="text" placeholder="Từ" />
          <span>__</span>
          <input type="text" placeholder="Đến" />
          <Button variant="success">Áp dụng</Button>
        </div>
        <div className="products">
          <div className="product-card">
            <span className="favorite-heart">
              <i className="fa-regular fa-heart"></i>
            </span>
            <img
              src="https://huaweiviet.vn/wp-content/uploads/2018/12/tai-nghe-bluetooth-huawei-freebuds-2-pro-fullbox-gia-re-zin.jpg"
              alt="Tai nghe Bluetooth"
            />
            <p>Tai Nghe Bluetooth Không Dây Có Micro Cho Huawei</p>
            <span className="price">₫47.000</span>
            <span className="sale">-59%</span>
          </div>
          <div className="product-card">
            <span className="favorite-heart">
              <i className="fa-regular fa-heart"></i>
            </span>
            <img
              src="https://bizweb.dktcdn.net/thumb/medium/100/323/154/products/micro-kim-cuong-2.jpg?v=1673317379687"
              alt="Micro cho loa kéo"
            />
            <p>[XẢ KHO] MICRO CHO LOA KÉO</p>
            <span className="price">₫52.000</span>
            <span className="sale">-26%</span>
          </div>
          <div className="product-card">
            <span className="favorite-heart">
              <i className="fa-regular fa-heart"></i>
            </span>
            <img
              src="https://down-vn.img.susercontent.com/file/706d33d6a9ab76d1d6041873f1b09245"
              alt="Bao tay chơi game"
            />
            <p>Bao Tay Chơi Game ff, Pubg, Liên Quân...</p>
            <span className="price">₫1.000</span>
            <span className="sale">-57%</span>
          </div>
          <div className="product-card">
            <span className="favorite-heart">
              <i className="fa-regular fa-heart"></i>
            </span>
            <img
              src="https://hethong.24hlaptop.com/image_product/cach-su-dung-tai-nghe-p47_-wireless-2-1-1-1651561351661.jpg"
              alt="Tai nghe Bluetooth"
            />
            <p>Tai Nghe Bluetooth Không Dây P47</p>
            <span className="price">₫49.000</span>
            <span className="sale">-39%</span>
          </div>
          <div className="product-card">
            <span className="favorite-heart">
              <i className="fa-regular fa-heart"></i>
            </span>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYuUVwMGsxIUyOlBSch0wn3drPdM1TijZKyA&s"
              alt="Đồng hồ thông minh"
            />
            <p>Đồng hồ thông minh 1800 promax</p>
            <span className="price">₫129.000</span>
            <span className="sale">-36%</span>
          </div>

          {/* Tiếp tục thêm các sản phẩm khác */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
