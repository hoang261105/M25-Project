"use client";
import Header from "@/components/user/Header";
import React, { useEffect } from "react";
import "@/styles/productDetail.css";
import "@/styles/home.css";
import Footer from "@/components/user/Footer";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { Carts, Products } from "@/interface/admin";
import { useParams } from "next/navigation";
import { getProductById } from "@/services/admin/product.service";
import {
  addToCart,
  getCartProduct,
  updatedCart,
} from "@/services/admin/cart.service";
import Swal from "sweetalert2";
import { getFavouriteProduct } from "@/services/user/favourite.service";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function page() {
  let account = JSON.parse(localStorage.getItem("user") || "[]");
  const cartState = useSelector((state: any) => state.carts.cart);
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

  useEffect(() => {
    if (account.id) {
      dispatch(getCartProduct(account.id));
      dispatch(getFavouriteProduct(account.id));
    }
  }, [dispatch, account.id]);

  const addToCarts = (product: Products) => {
    const existProduct = cartState.find(
      (item: Carts) => item.product.id === product.id
    );

    if (existProduct) {
      // If the product exists, update its quantity
      const updatedProduct = {
        ...existProduct,
        product: {
          ...existProduct.product,
          quantity: existProduct.product.quantity + 1, // Increase the quantity
        },
      };

      // Dispatch the updated cart with the correct product
      dispatch(updatedCart(updatedProduct));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thêm sản phẩm thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      // If the product doesn't exist, add a new product to the cart
      const newCart = {
        idUser: account.id,
        product: {
          id: product.id,
          product_name: product.product_name,
          description: product.description,
          price: product.price,
          quantity: 1, // Set initial quantity to 1
          image: {
            origin: product.image.origin,
            related: product.image.related,
          },
          categoryId: product.categoryId,
        },
      };

      // Dispatch the new cart object
      dispatch(addToCart(newCart));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thêm sản phẩm thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
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
                      <Button
                        variant="primary"
                        onClick={() => addToCarts(productState)}
                      >
                        Thêm vào giỏ hàng
                      </Button>{" "}
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
