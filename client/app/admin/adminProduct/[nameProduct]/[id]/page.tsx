"use client";
import Menu from "@/components/admin/Menu";
import React, { useEffect, useState } from "react";
import "@/styles/admin.scss";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  searchProduct,
  updateProduct,
} from "@/services/admin/product.service";
import { useParams } from "next/navigation";
import Image from "next/image";
import { AddProduct, Products } from "@/interface/admin";
import { format } from "date-fns";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/config/firebase";

export default function AdminProduct() {
  const [image, setImage] = useState<string>("");
  const [productDelete, setProductDelete] = useState<Products | null>(null);
  const [productEdit, setProductEdit] = useState<Products | null>(null);
  const [inputValue, setInputValue] = useState<AddProduct>({
    product_name: "",
    description: "",
    price: 0,
    quantity: "",
    image: "",
  });

  const [error, setError] = useState({
    product_name: "",
    description: "",
    price: "",
    quantity: "",
  });
  const productState = useSelector((state: any) => state.products.product);
  const dispatch = useDispatch();
  console.log(2222222, productState);
  const { id } = useParams();
  const { nameProduct } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(getAllProduct(id));
    }
  }, [dispatch, id]);
  const [shows, setShows] = useState(false);

  const handleCloseForm = () => setShows(false);
  const handleShowForm = () => setShows(true);

  const [showEdit, setShowEdit] = useState(false);
  const handleShowEdit = (product: Products) => {
    setShowEdit(true);
    setProductEdit(product);
  };
  const handleCloseEdit = () => setShowEdit(false);

  const reset = () => {
    setInputValue({
      product_name: "",
      description: "",
      price: 0,
      quantity: "",
      image: "",
    });
  };

  // Hàm thêm mới sản phẩm
  const handleAdd = async () => {
    let valid = true;
    if (!inputValue.product_name) {
      error.product_name = "Tên sản phẩm không được để trống!";
      valid = false;
    } else {
      error.product_name = "";
    }

    if (!inputValue.description) {
      error.description = "Vui lòng nhập mô tả";
      valid = false;
    } else {
      error.description = "";
    }

    if (!inputValue.price) {
      error.price = "Vui lòng nhập giá";
      valid = false;
    } else {
      error.price = "";
    }

    if (!inputValue.quantity) {
      error.quantity = "Vui lòng nhập số lượng";
      valid = false;
    } else {
      error.quantity = "";
    }

    setError({ ...error });

    if (valid) {
      const newProduct = {
        ...inputValue,
        categoryId: id,
        product_name: inputValue.product_name,
        description: inputValue.description,
        price: inputValue.price,
        quantity: inputValue.quantity,
        created_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
        updated_at: "",
      };
      await dispatch(addProduct(newProduct));
      reset();
      setShows(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleUploadChange = (e: any) => {
    let image: any = e.target.files[0];
    const imageRef = ref(storage, `images/${image.name}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImage(image);
        setInputValue({
          ...inputValue,
          image: url,
        });
      });
    });
  };

  // Hàm xóa sản phẩm
  const handleDelete = async (id: number) => {
    await dispatch(deleteProduct(id));
    // dispatch(getAllProduct());
    setProductDelete(null);
  };

  // Hàm sửa sản phẩm
  const handleEdit = () => {
    let valid = true;
    if (!productEdit?.product_name) {
      error.product_name = "Tên sản phẩm không được để trống";
      valid = false;
    } else {
      error.product_name = "";
    }

    if (!productEdit?.description) {
      error.description = "Vui lòng nhập mô tả sản phẩm";
      valid = false;
    } else {
      error.description = "";
    }

    if (productEdit?.quantity && productEdit.quantity <= 1) {
      error.quantity = "Số lượng sản phẩm phải lớn hơn 1";
      valid = false;
    } else {
      error.quantity = "";
    }

    setError({ ...error });

    if (valid) {
      // Cập nhật sản phẩm khi tất cả điều kiện đều hợp lệ
      const updatedProduct = {
        ...productEdit,
        updated_at: format(new Date(), "dd/MM/yyyy HH:mm:ss"),
      };

      // Gọi API hoặc dispatch action để cập nhật sản phẩm
      dispatch(updateProduct(updatedProduct));

      // Đóng modal sau khi cập nhật
      setShowEdit(false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (productEdit) {
      setProductEdit({
        ...productEdit,
        [name]: value,
      });
    }
  };

  // Hàm tìm kiếm sản phẩm
  const handleSearch = (searchTerm: string) => {
    const categoryId = id; // id danh mục hiện tại, ví dụ là 'Máy tính'
    dispatch(searchProduct({ search: searchTerm, categoryId }));
  };

  return (
    <div className="sidebar">
      <Menu />

      <Modal show={shows} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên sản phẩm"
                autoFocus
                onChange={handleChange}
                name="product_name"
              />
              {error.product_name && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.product_name}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mô tả"
                autoFocus
                onChange={handleChange}
                name="description"
              />
              {error.description && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.description}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập giá"
                autoFocus
                onChange={handleChange}
                name="price"
              />
              {error.price && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.price}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nhập số lượng</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                onChange={handleChange}
                name="quantity"
              />
              {error.quantity && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.quantity}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="file"
                autoFocus
                onChange={handleUploadChange}
                name="image"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForm}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin sản phẩm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên sản phẩm"
                autoFocus
                onChange={handleEditChange}
                name="product_name"
                value={productEdit?.product_name || ""}
              />
              {error.product_name && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.product_name}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mô tả</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập mô tả"
                autoFocus
                onChange={handleEditChange}
                name="description"
                value={productEdit?.description || ""}
              />
              {error.description && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.description}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                onChange={handleEditChange}
                name="price"
                value={productEdit?.description || ""}
              />
              {error.price && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.price}
                </span>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Số lượng</Form.Label>
              <Form.Control
                type="number"
                autoFocus
                onChange={handleEditChange}
                name="quantity"
                value={productEdit?.quantity || ""}
              />
              {error.quantity && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.quantity}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEdit}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Cập nhật
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
              Quản lí sản phẩm
            </b>
          </div>
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Tìm kiếm tại đây"
              onChange={(e) => handleSearch(e.target.value)}
            />
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
              <h3 className="main-title">Bảng quản lí sản phẩm</h3>
              <div className="flex w-96 h-10 gap-2">
                <Form.Select
                  aria-label="Default select example"
                  className="w-20"
                >
                  <option value="asc">Từ A-Z</option>
                  <option value="2">Ngày tạo</option>
                  <option value="desc">Từ Z-A</option>
                </Form.Select>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handleShowForm}
                >
                  Thêm sản phẩm
                </Button>
              </div>
            </div>
            <br />
            <table width={"100%"} style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Mô tả</th>
                  <th>Giá (VNĐ)</th>
                  <th>Số lượng</th>
                  <th>Thời gian tạo</th>
                  <th>Thời gian cập nhật</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {productState.map((product: Products, index: number) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={product.image}
                        alt=""
                        width={70}
                        height={70}
                      />
                    </td>
                    <td>{product.product_name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity}</td>
                    <td>{product.created_at}</td>
                    <td>{product.updated_at}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowEdit(product)}
                      >
                        Sửa
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => setProductDelete(product)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {productDelete && (
            <div className="overlay">
              <div className="modal-custom">
                <div className="modal-header-custom">
                  <h5>Xác nhận</h5>
                  <i
                    className="fas fa-xmark"
                    onClick={() => setProductDelete(null)}
                  />
                </div>
                <div className="modal-body-custom">
                  <p>Bạn chắc chắn muốn xóa {productDelete?.product_name}?</p>
                </div>
                <div className="modal-footer-footer">
                  <button
                    className="btn btn-light"
                    onClick={() => setProductDelete(null)}
                  >
                    Hủy
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(productDelete.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
