"use client";
import Header from "@/components/user/Header";
import React, { useEffect, useState } from "react";
import "@/styles/home.css";
import Footer from "@/components/user/Footer";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartProduct,
  deletedProductToCart,
  updateProductQuantity,
} from "@/services/admin/cart.service";
import { Carts } from "@/interface/admin";
import Image from "next/image";
import { getFavouriteProduct } from "@/services/user/favourite.service";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function Page() {
  const { id } = useParams();
  const totalPrices = useSelector((state: any) => state.carts.totalPrice);
  console.log(totalPrices);
  const cartState = useSelector((state: any) => {
    console.log(111111, state.carts.cart);
    return state.carts.cart;
  });
  const dispatch = useDispatch();

  // State to manage selected items and "Select All" checkbox
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      dispatch(getCartProduct(id));
      dispatch(getFavouriteProduct(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectAll) {
      // Select all items when "Select All" checkbox is checked
      const allItemIds: any = new Set(cartState.map((item: Carts) => item.id));
      setSelectedItems(allItemIds);
    } else {
      // Deselect all items when "Select All" checkbox is unchecked
      setSelectedItems(new Set());
    }
  }, [selectAll, cartState]);

  const handleCheckboxChange = (itemId: number) => {
    setSelectedItems((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(itemId)) {
        newSelected.delete(itemId);
      } else {
        newSelected.add(itemId);
      }
      return newSelected;
    });
  };

  const handleSelectAllChange = () => {
    setSelectAll((prev) => !prev);
  };

  const handleDelete = (itemId?: number) => {
    if (itemId) {
      // Delete a single item
      dispatch(deletedProductToCart(itemId));
    } else {
      // Delete selected items
      const idsToDelete = Array.from(selectedItems);
      idsToDelete.forEach((id) => {
        dispatch(deletedProductToCart(id));
      });
      // Reset state after deletion
      setSelectedItems(new Set());
      setSelectAll(false);
    }
  };

  const totalPrice = cartState.reduce((total: number, cart: Carts) => {
    return total + cart.product.price * cart.product.quantity;
  }, 0);

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    const idUser = id; // Lấy idUser từ useParams

    if (newQuantity < 1) return; // Đảm bảo số lượng ít nhất là 1

    // Dispatch action để cập nhật số lượng
    dispatch(updateProductQuantity({ itemId, quantity: newQuantity, idUser }))
      .unwrap()
      .then(() => {
        console.log("Quantity updated successfully");
      })
      .catch((error: any) => {
        console.error("Error updating quantity:", error);
      });
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    itemId: number
  ) => {
    const newQuantity = parseInt(event.target.value, 10);
    handleQuantityChange(itemId, newQuantity);
  };
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
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
              className="mr-2"
            />
            <span className="font-bold">Sản Phẩm</span>
          </div>
          <div className="flex gap-8 w-[500px] justify-between text-center">
            <span className="font-bold w-32">Đơn Giá</span>
            <span className="font-bold w-32">Số Lượng</span>
            <span className="font-bold w-32">Số Tiền</span>
            <span className="font-bold w-32">Thao Tác</span>
          </div>
        </div>

        {/* Cart Item */}
        {cartState && Array.isArray(cartState) && cartState.length > 0 ? (
          cartState.map((cart: Carts, index) => (
            <div className="bg-white mt-4 p-4 shadow rounded" key={index}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.has(cart.id)}
                    onChange={() => handleCheckboxChange(cart.id)}
                  />
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
                <div className="flex items-center gap-12 justify-center w-[500px] text-center">
                  <span className="font-bold w-32">
                    {cart.product
                      ? formatter.format(cart.product.price)
                      : "N/A"}
                  </span>
                  <div className="flex items-center space-x-2 w-32">
                    <button
                      className="px-2 py-1 bg-gray-200"
                      onClick={() =>
                        handleQuantityChange(cart.id, cart.product.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <input
                      type="text"
                      name="quantity"
                      value={cart.product.quantity}
                      min="1"
                      onChange={(e) => handleInputChange(e, cart.id)}
                      className="w-8 text-center"
                    />
                    <button
                      className="px-2 py-1 bg-gray-200"
                      onClick={() =>
                        handleQuantityChange(cart.id, cart.product.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <span className="font-bold w-32">
                    {cart.product
                      ? formatter.format(
                          cart.product.price * cart.product.quantity
                        )
                      : "N/A"}
                  </span>
                  <button
                    className="text-red-500 w-32"
                    onClick={() => handleDelete(cart.id)}
                  >
                    Xóa
                  </button>
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
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
              className="mr-2"
            />
            <span>Chọn Tất Cả ({cartState.length})</span>
            <button
              className="ml-4 text-red-500"
              onClick={() => handleDelete()}
            >
              Xóa
            </button>
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
