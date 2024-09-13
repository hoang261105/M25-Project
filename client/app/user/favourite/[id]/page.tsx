"use client";
import Header from "@/components/user/Header";
import {
  deleteFavourProdcuct,
  getFavouriteProduct,
} from "@/services/user/favourite.service";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "@/styles/home.css";
import { Button } from "react-bootstrap";
import Image from "next/image";
import { Favourite } from "@/interface/admin";
import { getCartProduct } from "@/services/admin/cart.service";
import Footer from "@/components/user/Footer";
import Swal from "sweetalert2";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function page() {
  const { id } = useParams();
  let account = JSON.parse(localStorage.getItem("user") || "[]");
  const cartState = useSelector((state: any) => state.carts.cart);
  const favourState = useSelector((state: any) => state.favourite.favour);
  console.log(favourState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getFavouriteProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (account.id) {
      dispatch(getCartProduct(account.id));
    }
  }, [dispatch, account.id]);

  const handleDelete = async (id: number) => {
    await dispatch(deleteFavourProdcuct(id));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Đã xóa khỏi yêu thích",
      showConfirmButton: false,
      timer: 1500,
    });
  };
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="suggestion-section">
        <h2 className="section-title">SẢN PHẨM YÊU THÍCH</h2>
        <div className="products-container">
          {favourState.map((favour: Favourite) => (
            <div className="product-card">
              <div className="image">
                <Image
                  src={favour.product.image.origin}
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="product-info">
                <p className="product-title truncate w-52">
                  {favour.product.product_name}
                </p>
                <p className="product-price">
                  <span className="discounted-price">
                    {formatter.format(favour.product.price)}
                  </span>
                </p>
              </div>
              <div className="h-[70px] text-center text-pink-400">
                <p>{favour.product.description}</p>
              </div>
              <div className="h-[30px] text-center text-blue-400">
                <p>Số lượng: {favour.product.quantity}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="primary">Xem chi tiết</Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(favour.id)}
                >
                  Xoá khỏi yêu thích
                </Button>
              </div>
            </div>
          ))}
          {/* More product cards can be added similarly */}
        </div>
      </div>

      <Footer />
    </div>
  );
}
