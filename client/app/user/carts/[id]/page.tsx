"use client";
import Header from "@/components/user/Header";
import React, { useEffect } from "react";
import "@/styles/home.css";
import Footer from "@/components/user/Footer";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getCartProduct } from "@/services/admin/cart.service";
import { Carts } from "@/interface/admin";
import Image from "next/image";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function page() {
  const { id } = useParams();
  console.log(id);
  const cartState = useSelector((state: any) => state.carts.cart);
  const dispatch = useDispatch();
  console.log(cartState);

  useEffect(() => {
    if (id) {
      dispatch(getCartProduct(id));
    }
  }, [dispatch, id]);

  const totalPrice = cartState.reduce((total: number, cart: Carts) => {
    return total + cart.product.price * cart.product.quantity;
  }, 0);

  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />

      <div className="bg-gray-100 p-4">
        {/* Cart Header */}
        <div className="flex justify-between items-center bg-white p-4 shadow rounded">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="font-bold">Sản Phẩm</span>
          </div>
          <div className="flex gap-8 w-96 justify-between">
            <span className="font-bold">Đơn Giá</span>
            <span className="font-bold">Số Lượng</span>
            <span className="font-bold">Số Tiền</span>
            <span className="font-bold">Thao Tác</span>
          </div>
        </div>

        {/* Cart Item */}

        {cartState && Array.isArray(cartState) && cartState.length > 0 ? (
          cartState.map((cart: Carts, index) => (
            <div className="bg-white mt-4 p-4 shadow rounded" key={index}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <input type="checkbox" />
                  <div className="w-20 h-20 bg-gray-200 rounded">
                    {cart.product && (
                      <Image
                        src={cart.product.image.origin}
                        alt={cart.product.product_name || "Product Image"}
                        width={80}
                        height={80}
                      />
                    )}
                  </div>
                  {cart.product && (
                    <div>
                      <p className="font-bold">{cart.product.product_name}</p>
                      <span className="text-sm text-gray-500">
                        {cart.product.description}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-12 justify-center w-96">
                  <span className="font-bold">
                    {cart.product
                      ? formatter.format(cart.product.price)
                      : "N/A"}
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="px-2 py-1 bg-gray-200">-</button>
                    <span>{cart.product ? cart.product.quantity : 0}</span>
                    <button className="px-2 py-1 bg-gray-200">+</button>
                  </div>
                  <span className="font-bold">
                    {cart.product
                      ? formatter.format(
                          cart.product.price * cart.product.quantity
                        )
                      : "N/A"}
                  </span>
                  <button className="text-red-500">Xóa</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products in the cart.</p>
        )}

        {/* Footer */}
        <div className="bg-white mt-4 p-4 shadow rounded flex justify-between items-center">
          <div className="flex items-center">
            <input type="checkbox" className="mr-2" />
            <span>Chọn Tất Cả (0)</span>
            <button className="ml-4 text-red-500">Xóa</button>
          </div>
          <div>
            <span className="text-gray-500">
              Tổng thanh toán ({cartState.length} Sản phẩm):
            </span>
            <span className="font-bold text-red-500">
              {formatter.format(totalPrice)}
            </span>
            <button className="ml-4 bg-red-500 text-white px-4 py-2 rounded">
              Mua Hàng
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
