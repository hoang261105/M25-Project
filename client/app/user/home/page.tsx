"use client";
import Header from "@/components/user/Header";
import React, { useEffect } from "react";
import "@/styles/home.css";
import Footer from "@/components/user/Footer";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "@/services/admin/category.service";
import { Category } from "@/interface/admin";
import { useRouter } from "next/navigation";

export default function Home() {
  const categoryState = useSelector((state: any) => state.categories.category);
  console.log(categoryState);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleClick = (id: number, category: Category) => {
    router.push(`/user/product/${category.category_name}/${id}`);
  };
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

      <section className="category">
        <div className="information-category">
          <h1 className="title-category" style={{ fontSize: 30 }}>
            Danh mục
          </h1>
          <div className="category-list">
            {categoryState.map((category: Category) => (
              <button onClick={() => handleClick(category.id, category)}>
                <div className="card category-item">
                  <Image src={category.image} alt="" width={250} height={100} />
                  <h3
                    style={{
                      width: "100%",
                      height: "auto",
                      textAlign: "center",
                      color: "red",
                      textDecoration: "none",
                    }}
                  >
                    {category.category_name}
                  </h3>
                  <p
                    style={{ textAlign: "center", color: "green", height: 40 }}
                  >
                    {category.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="products-list">
        <div className="headers">
          <h2>TÌM KIẾM HÀNG ĐẦU</h2>
          <a href="#" className="view-all">
            Xem Tất Cả &gt;
          </a>
        </div>
        <div className="products">
          <div className="products-item">
            <div className="top-badge">TOP</div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-m25-338d2.appspot.com/o/images%2Fmay-anh-canon-eos-850d-kit-ef-s18-55mm-f4-56-is-stm.jpg?alt=media&token=bdaeb0df-0553-4aea-ab12-47e80a804dd4"
              alt="Product 1"
            />
            <p className="sold">Bán 102k+ / tháng</p>
            <p className="product-name">Set Bộ Đồ Nữ</p>
          </div>
          <div className="products-item">
            <div className="top-badge">TOP</div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-m25-338d2.appspot.com/o/images%2Fmay-anh-canon-eos-850d-kit-ef-s18-55mm-f4-56-is-stm.jpg?alt=media&token=bdaeb0df-0553-4aea-ab12-47e80a804dd4"
              alt="Product 2"
            />
            <p className="sold">Bán 146k+ / tháng</p>
            <p className="product-name">Son Kem Lì Mịn Môi Romand</p>
          </div>
          <div className="products-item">
            <div className="top-badge">TOP</div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-m25-338d2.appspot.com/o/images%2Fmay-anh-canon-eos-850d-kit-ef-s18-55mm-f4-56-is-stm.jpg?alt=media&token=bdaeb0df-0553-4aea-ab12-47e80a804dd4"
              alt="Product 3"
            />
            <p className="sold">Bán 171k+ / tháng</p>
            <p className="product-name">Mi Giả 3D Cao Cấp</p>
          </div>
          <div className="products-item">
            <div className="top-badge">TOP</div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-m25-338d2.appspot.com/o/images%2Fmay-anh-canon-eos-850d-kit-ef-s18-55mm-f4-56-is-stm.jpg?alt=media&token=bdaeb0df-0553-4aea-ab12-47e80a804dd4"
              alt="Product 4"
            />
            <p className="sold">Bán 201k+ / tháng</p>
            <p className="product-name">Quần Lót Nữ Cotton</p>
          </div>
          <div className="products-item">
            <div className="top-badge">TOP</div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-m25-338d2.appspot.com/o/images%2Fmay-anh-canon-eos-850d-kit-ef-s18-55mm-f4-56-is-stm.jpg?alt=media&token=bdaeb0df-0553-4aea-ab12-47e80a804dd4"
              alt="Product 5"
            />
            <p className="sold">Bán 103k+ / tháng</p>
            <p className="product-name">Bút Mực Gel</p>
          </div>
          <div className="products-item">
            <div className="top-badge">TOP</div>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-m25-338d2.appspot.com/o/images%2Fmay-anh-canon-eos-850d-kit-ef-s18-55mm-f4-56-is-stm.jpg?alt=media&token=bdaeb0df-0553-4aea-ab12-47e80a804dd4"
              alt="Product 6"
            />
            <p className="sold">Bán 171k+ / tháng</p>
            <p className="product-name">Quần Ống Rộng Nữ</p>
          </div>
        </div>
      </div>

      <div className="suggestion-section">
        <h2 className="section-title">GỢI Ý HÔM NAY</h2>
        <div className="products-container">
          <div className="product-card">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-m25-338d2.appspot.com/o/images%2Fca-phe-Viet-Nam.jpg?alt=media&token=21d1d62d-4c3c-49cc-b643-95a341451fa9"
              alt="Product 1"
            />
            <div className="product-info">
              <span className="discount">-50%</span>
              <p className="product-title">
                Khẩu trang N99 6D Kids chuẩn form vừa mặt bé...
              </p>
              <p className="product-price">
                <span className="discounted-price">₫8.000</span>
              </p>
            </div>
          </div>
          <div className="product-card">
            <img src="image2.jpg" alt="Product 2" />
            <div className="product-info">
              <span className="discount">-44%</span>
              <p className="product-title">
                [Cotton mát] Áo thun tay lỡ PARIS in ngang...
              </p>
              <p className="product-price">
                <span className="discounted-price">₫28.000</span>
              </p>
            </div>
          </div>
          <div className="product-card">
            <img src="image3.jpg" alt="Product 3" />
            <div className="product-info">
              <span className="discount">-58%</span>
              <p className="product-title">
                Dây Sạc Tự Ngắt 3 Đầu 100W Micro USB...
              </p>
              <p className="product-price">
                <span className="discounted-price">₫13.500</span>
              </p>
            </div>
          </div>

          <div className="product-card">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-m25-338d2.appspot.com/o/images%2Fca-phe-Viet-Nam.jpg?alt=media&token=21d1d62d-4c3c-49cc-b643-95a341451fa9"
              alt="Product 1"
            />
            <div className="product-info">
              <span className="discount">-50%</span>
              <p className="product-title">
                Khẩu trang N99 6D Kids chuẩn form vừa mặt bé...
              </p>
              <p className="product-price">
                <span className="discounted-price">₫8.000</span>
              </p>
            </div>
          </div>

          <div className="product-card">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/project-m25-338d2.appspot.com/o/images%2Fca-phe-Viet-Nam.jpg?alt=media&token=21d1d62d-4c3c-49cc-b643-95a341451fa9"
              alt="Product 1"
            />
            <div className="product-info">
              <span className="discount">-50%</span>
              <p className="product-title">
                Khẩu trang N99 6D Kids chuẩn form vừa mặt bé...
              </p>
              <p className="product-price">
                <span className="discounted-price">₫8.000</span>
              </p>
            </div>
          </div>
          {/* More product cards can be added similarly */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
