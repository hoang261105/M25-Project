"use client";
import Header from "@/components/user/Header";
import React, { useEffect } from "react";
import "@/styles/productDetail.css";
import "@/styles/home.css";
import Footer from "@/components/user/Footer";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Products } from "@/interface/admin";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/admin/product.service";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function page() {
  const { id } = useParams();
  const productState = useSelector(
    (state: any) => state.products.productDetail
  );
  console.log(productState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch]);
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <main className="main-backgroup">
        <div className="main-subject">
          <h1 id="title-exam">Thông tin sản phẩm</h1>

          <div className="perform">
            <div className="question-content">
              {productState ? (
                <div className="Info-detail">
                  <img id="img-detail" src={productState.image.origin} alt="" />
                  <div className="Information-test">
                    <h2 id="nameElement">{productState.product_name}</h2>
                    <p style={{ color: "pink" }}>
                      Mô tả: {productState.description}
                    </p>
                    <h3 style={{ color: "red" }}>
                      Giá: {formatter.format(productState.price)}
                    </h3>
                    <div>
                      <p>Số lượng: {productState.quantity}</p>
                    </div>

                    <div className="class-button">
                      <Button variant="primary">Thêm vào giỏ hàng</Button>{" "}
                      <Button variant="success">Mua ngay</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />

        <div className="suggestion-section">
          <h2 className="section-title">SẢN PHẨM LIÊN QUAN</h2>
          <div className="products-container">
            {/* {productState.map((product: Products) => (
              <div className="product-card">
                <div className="image">
                  <Image src={product.image} alt="" width={100} height={100} />
                </div>
                <div className="product-info">
                  <p className="product-title">{product.product_name}</p>
                  <p className="product-price">
                    <span className="discounted-price">
                      {formatter.format(product.price)}
                    </span>
                  </p>
                </div>
                <div className="h-[70px] text-center text-pink-400">
                  <p>{product.description}</p>
                </div>
                <div className="h-[30px] text-center text-blue-400">
                  <p>Số lượng: {product.quantity}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="primary">Xem chi tiết</Button>{" "}
                  <Button variant="success">Thêm vào giỏ hàng</Button>
                </div>
              </div>
            ))} */}
            {/* More product cards can be added similarly */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
