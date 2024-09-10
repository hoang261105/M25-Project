import Header from "@/components/user/Header";
import React from "react";
import "@/styles/productDetail.css";
import "@/styles/home.css";
import Footer from "@/components/user/Footer";
import { Button } from "react-bootstrap";

export default function page() {
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
              <div className="Info-detail">
                <img
                  id="img-detail"
                  src="https://firebasestorage.googleapis.com/v0/b/project-m25-338d2.appspot.com/o/images%2Fnghigiaulamgiau_110k-01_bia-1.webp?alt=media&token=ed0aaf9e-07c8-48a7-b260-43d6e2e63959"
                  alt=""
                />
                <div className="Information-test">
                  <h2 id="nameElement">Nghĩ giàu làm giàu</h2>
                  <p style={{ color: "pink" }}>Mô tả: 12345</p>
                  <h2 style={{ color: "red" }}>Giá: 1200000</h2>
                  <div className="flex gap-1">
                    <button
                      style={{
                        width: 30,
                        height: 30,
                        fontSize: 15,
                        border: "1px solid darkgray",
                      }}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      style={{
                        width: 40,
                        border: "1px solid darkgray",
                        height: 30,
                      }}
                    />
                    <button
                      style={{
                        width: 30,
                        height: 30,
                        fontSize: 15,
                        border: "1px solid darkgray",
                      }}
                    >
                      {" "}
                      +
                    </button>
                  </div>

                  <div>
                    <strong>Tổng: 12320</strong>
                  </div>

                  <div className="class-button">
                    <Button variant="primary">Thêm vào giỏ hàng</Button>{" "}
                    <Button variant="success">Mua ngay</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
