"use client";
import Footer from "@/components/user/Footer";
import Header from "@/components/user/Header";
import React, { useEffect, useState } from "react";
import "@/styles/product.css";
import "@/styles/home.css";
import { Button, Carousel, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import {
  getAllProduct,
  searchProduct,
  sortProduct,
  sortProductPrice,
} from "@/services/admin/product.service";
import { Products } from "@/interface/admin";
import Image from "next/image";

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export default function page() {
  const [minPrice, setMinPrice] = useState(""); // Giá trị từ người dùng nhập
  const [maxPrice, setMaxPrice] = useState(""); // Giá trị từ người dùng nhập
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]); // Lưu trữ sản phẩm đã lọc
  const productState = useSelector((state: any) => state.products.product); // Danh sách tất cả sản phẩm từ redux
  const dispatch = useDispatch();
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      dispatch(getAllProduct(id)); // Lấy tất cả sản phẩm khi có id
    }
  }, [dispatch, id]);

  useEffect(() => {
    setFilteredProducts(productState); // Ban đầu hiển thị tất cả sản phẩm
  }, [productState]);

  const handleFilter = () => {
    const min = parseInt(minPrice, 10); // Chuyển đổi chuỗi sang số
    const max = parseInt(maxPrice, 10);

    const filtered = productState.filter((product: Products) => {
      const price = product.price;
      return price >= min && price <= max;
    });
    setFilteredProducts(filtered); // Lưu các sản phẩm đã lọc
  };

  // Hàm tìm kiếm sản phẩm theo id danh mục
  const handleSearch = async (searchItem: string) => {
    const categoryId = id;
    await dispatch(searchProduct({ search: searchItem, categoryId }));
  };

  // Hàm sắp xếp
  const handleSort = (sort: string) => {
    dispatch(sortProduct({ categoryId: id, sort }));
    dispatch(sortProductPrice({ categoryId: id, sort }));
  };

  const handleClick = (id: number) => {
    router.push(`/user/productDetail/${id}`);
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

      <div className="container">
        <div className="flex justify-between">
          <h2>Sản phẩm</h2>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm"
            style={{ border: "1px solid darkgray", padding: 10 }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <b>Lọc theo giá</b>
        <div className="filter">
          <div className="filter-item">
            <input
              type="text"
              placeholder="Từ"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)} // Cập nhật giá trị minPrice
              style={{ padding: 10 }}
            />
            <span>__</span>
            <input
              type="text"
              placeholder="Đến"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)} // Cập nhật giá trị maxPrice
              style={{ padding: 10 }}
            />
            <Button variant="success" onClick={handleFilter}>
              Áp dụng
            </Button>
          </div>
          <div>
            <Form.Select
              aria-label="Default select example"
              className="w-20"
              onChange={(e) => handleSort(e.target.value)}
            >
              <option value="">Sắp xếp theo</option>
              <option value="asc">Từ A-Z</option>
              <option value="desc">Từ Z-A</option>
              <option value="desc">Giá từ cao đến thấp</option>
              <option value="asc">Giá từ thấp đến cao</option>
            </Form.Select>
          </div>
        </div>
        <div className="product">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product: Products) => (
              <div className="product-card" key={product.id}>
                <span className="favorite-heart">
                  <i className="fa-regular fa-heart"></i>
                </span>
                <div className="image">
                  <Image
                    src={product.image}
                    alt={product.product_name}
                    width={300}
                    height={200}
                  />
                </div>
                <div>
                  <p>{product.product_name}</p>
                  <p className="price">{formatter.format(product.price)}</p>
                </div>
                <div style={{ height: 70 }}>
                  <p style={{ color: "pink" }}>{product.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="primary"
                    onClick={() => handleClick(product.id)}
                  >
                    Xem chi tiết
                  </Button>{" "}
                  <Button variant="success">Thêm vào giỏ hàng</Button>
                </div>
              </div>
            ))
          ) : (
            <p>Không có sản phẩm nào trong phạm vi giá này.</p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
