"use client";
import React, { useState } from "react";
import "@/styles/admin.scss";
import Menu from "@/components/admin/Menu";
import Image from "next/image";
import { Button, Form, Modal } from "react-bootstrap";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";
import { useDispatch } from "react-redux";
import {
  updateProduct,
  updateProductImages,
} from "@/services/admin/product.service";
import { UpdateProduct } from "@/interface/admin";
import { useParams } from "next/navigation";

export default function Page() {
  const [image, setImage] = useState<string>("");
  const dispatch = useDispatch();
  const { idProduct } = useParams();

  // Initial product state
  const [product, setProduct] = useState<UpdateProduct>({
    product_name: "",
    price: 0,
    description: "",
    quantity: 0,
    image: {
      origin: "",
      related: [],
    },
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to handle adding image to product
  const handleAdd = async () => {
    if (image) {
      // Add the new image to the related array
      const updatedRelatedImages = [...(product.image.related || []), image];

      // Dispatch action to update only the related images in the product
      await dispatch(
        updateProductImages({
          id: Number(idProduct),
          relatedImages: updatedRelatedImages,
        })
      );

      // Update local state to reflect the added image
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: {
          ...prevProduct.image,
          related: updatedRelatedImages,
        },
      }));

      setImage(""); // Clear the image input after adding
      setShow(false); // Close the modal
    } else {
      console.log("No image to add.");
    }
  };

  // Handle file upload to Firebase Storage and get download URL
  const handleUploadChange = (e: any) => {
    const file = e.target.files[0]; // Access the selected file
    const imageRef = ref(storage, `images/${file.name}`); // Create reference in Firebase Storage

    // Upload file to Firebase Storage and get download URL
    uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log("Image URL from Firebase:", url); // Log the image URL from Firebase
        setImage(url); // Set the image URL in the state
      });
    });
  };

  return (
    <div className="sidebar">
      <Menu />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm hình ảnh</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hình ảnh liên quan</Form.Label>
              <Form.Control
                type="file"
                autoFocus
                onChange={handleUploadChange} // Handle file upload
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="main-content">
        <header className="header">
          <div className="header-title">
            <b style={{ fontSize: 20 }}>
              <label htmlFor="">
                <i className="fa-solid fa-bars"></i>
              </label>{" "}
              Quản lí sản phẩm liên quan
            </b>
          </div>
          <div className="search-wrapper">
            <input type="text" placeholder="Tìm kiếm tại đây" />
          </div>

          <div className="user-wrapper">
            <Image
              src="https://scontent.fhan18-1.fna.fbcdn.net/v/t39.30808-1/457195263_1761669491308311_8721717277530948710_n.jpg?stp=dst-jpg_s200x200&_nc_cat=110&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=DeusZW47pvYQ7kNvgH_NkmO&_nc_ht=scontent.fhan18-1.fna&oh=00_AYDyj0z16iFGUez8JUY1wJBqDR_EuTHjJIg07fp3ptzVRg&oe=66DED4D7"
              alt=""
              width={40}
              height={40}
            />
            <div>
              <h4>Hoàng</h4>
              <small>Super Admin</small>
            </div>
          </div>
        </header>

        <main>
          <div className="table-wrapper">
            <div className="title flex justify-between">
              <h3 className="main-title">Bảng quản lí hình ảnh</h3>
              <div className="flex w-96 h-10 gap-2">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleShow}
                >
                  Thêm hình ảnh liên quan
                </Button>
              </div>
            </div>
            <br />
            <table width={"100%"} style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {/* Conditional rendering with debugging */}
                {product.image &&
                product.image.related &&
                product.image.related.length > 0 ? (
                  product.image.related.map(
                    (imageUrl: string, index: number) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={imageUrl}
                            alt={`Related Image ${index + 1}`}
                            width={100}
                            height={100}
                          />
                        </td>
                        <td>
                          <Button variant="primary">Sửa</Button>{" "}
                          <Button variant="danger">Xóa</Button>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan={3}>No related images</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
