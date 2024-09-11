"use client";
import Header from "@/components/user/Header";
import React, { useEffect } from "react";
import "@/styles/home.css";
import Footer from "@/components/user/Footer";
import { Button, Carousel } from "react-bootstrap";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "@/services/admin/category.service";
import { Carts, Category, Products } from "@/interface/admin";
import { useRouter } from "next/navigation";
import { getAllProductAll } from "@/services/admin/product.service";
import {
  addToCart,
  getCartProduct,
  updatedCart,
} from "@/services/admin/cart.service";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function Home() {
  let account = JSON.parse(localStorage.getItem("user") || "[]");
  const productState = useSelector((state: any) => state.products.product);
  const cartState = useSelector((state: any) => state.carts.cart);
  console.log(productState);
  const categoryState = useSelector((state: any) => state.categories.category);
  console.log(categoryState);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProductAll());
  }, [dispatch]);

  useEffect(() => {
    if (account.id) {
      dispatch(getCartProduct(account.id));
    }
  }, [dispatch, account.id]);

  const handleClick = (id: number, category: Category) => {
    router.push(`/user/product/${category.category_name}/${id}`);
  };

  console.log(cartState);
  useEffect(() => {
    if (account.id) {
      dispatch(getCartProduct(account.id));
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
        <h2 className="section-title">TẤT CẢ SẢN PHẨM</h2>
        <div className="products-container">
          {productState.map((product: Products) => (
            <div className="product-card">
              <div className="image">
                <Image
                  src={product.image.origin}
                  alt=""
                  width={100}
                  height={100}
                />
              </div>
              <div className="product-info">
                <p className="product-title truncate w-52">
                  {product.product_name}
                </p>
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
                <Button variant="success" onClick={() => addToCarts(product)}>
                  Thêm vào giỏ hàng
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
