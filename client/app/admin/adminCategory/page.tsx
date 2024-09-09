"use client";
import Menu from "@/components/admin/Menu";
import React, { useEffect, useReducer, useState } from "react";
import "@/styles/admin.scss";
import Image from "next/image";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "@/services/admin/category.service";
import { AddCategory, Category } from "@/interface/admin";
import { storage } from "@/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

export default function AdminCategorys() {
  const router = useRouter();
  const [image, setImage] = useState<string>("");
  const [shows, setShows] = useState(false);
  const handleCloseForm = () => setShows(false);
  const handleShowForm = () => setShows(true);

  const [show, setShow] = useState(false);
  const handleCloseForms = () => setShow(false);
  const handleShowForms = (category: Category) => {
    setShow(true);
    setCategoryEdit(category);
  };
  const [categoryDelete, setCategoryDelete] = useState<Category | null>(null);
  const [categoryEdit, setCategoryEdit] = useState<Category | null>(null);
  const [inputValue, setInputValue] = useState<AddCategory>({
    category_name: "",
    description: "",
    image: "",
  });
  const [error, setError] = useState({
    category_name: "",
    description: "",
  });
  const categories = useSelector((state: any) => state.categories.category);
  console.log(categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const reset = () => {
    setInputValue({
      category_name: "",
      description: "",
      image: "",
    });
  };

  const handleClick = (id: number, category: Category) => {
    router.push(`/admin/adminProduct/${category.category_name}/${id}`);
  };

  // Hàm thêm danh mục
  const handleAdd = () => {
    let valid = true;
    if (!inputValue.category_name) {
      error.category_name = "Tên danh mục không được để trống";
      valid = false;
    } else {
      error.category_name = "";
    }

    if (!inputValue.description) {
      error.description = "Vui lòng nhập mô tả";
      valid = false;
    } else {
      error.description = "";
    }

    setError({ ...error });

    if (valid) {
      const newCategory = {
        ...inputValue,
        category_name: inputValue.category_name,
        description: inputValue.description,
        status: true,
      };
      dispatch(addCategory(newCategory));
      reset();
      setShows(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
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

  // Hàm xóa danh mục
  const handleDelete = async (id: number) => {
    await dispatch(deleteCategory(id));
    await dispatch(getAllCategories());
    setCategoryDelete(null);
  };

  // Hàm sửa danh mục
  const handleEdit = async () => {
    let valid = true;
    if (!categoryEdit?.category_name) {
      error.category_name = "Tên danh mục không được để trống";
      valid = false;
    } else {
      error.category_name = "";
    }

    if (!categoryEdit?.description) {
      error.description = "Vui lòng nhập mô tả danh mục";
      valid = false;
    } else {
      error.description = "";
    }

    setError({ ...error });

    if (valid && categoryEdit) {
      await dispatch(
        updateCategory({
          id: categoryEdit.id,
          category_name: categoryEdit.category_name,
          description: categoryEdit.description,
          image: categoryEdit.image,
          status: categoryEdit.status,
        })
      );
      setShow(false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (categoryEdit) {
      setCategoryEdit({
        ...categoryEdit,
        [e.target.name]: e.target.value,
      });
    }
  };
  return (
    <div className="sidebar">
      <Menu />

      <Modal show={shows} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mới danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên danh mục"
                autoFocus
                onChange={handleChange}
                name="category_name"
              />
              {error.category_name && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.category_name}
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

      <Modal show={show} onHide={handleCloseForms}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa danh mục</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên danh mục"
                autoFocus
                onChange={handleEditChange}
                name="category_name"
                value={categoryEdit?.category_name || ""}
              />
              {error.category_name && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.category_name}
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
                value={categoryEdit?.description || ""}
              />
              {error.description && (
                <span style={{ color: "red", fontSize: 14 }}>
                  {error.description}
                </span>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForms}>
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
              Quản lí danh mục
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
              <h3 className="main-title">Bảng quản lí danh mục</h3>
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
                  Thêm danh mục
                </Button>
              </div>
            </div>
            <br />
            <table width={"100%"} style={{ textAlign: "center" }}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Hình ảnh</th>
                  <th>Tên danh mục</th>
                  <th>Mô tả</th>
                  <th>Chức năng</th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {categories.map((category: Category, index: number) => (
                  <tr key={category.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={category.image}
                        alt=""
                        width={70}
                        height={70}
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => handleClick(category.id, category)}
                      >
                        {category.category_name}
                      </button>
                    </td>
                    <td>{category.description}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleShowForms(category)}
                      >
                        Sửa
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => setCategoryDelete(category)}
                      >
                        Xóa
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {categoryDelete && (
            <div className="overlay">
              <div className="modal-custom">
                <div className="modal-header-custom">
                  <h5>Xác nhận</h5>
                  <i
                    className="fas fa-xmark"
                    onClick={() => setCategoryDelete(null)}
                  />
                </div>
                <div className="modal-body-custom">
                  <p>Bạn chắc chắn muốn xóa {categoryDelete?.category_name}?</p>
                </div>
                <div className="modal-footer-footer">
                  <button
                    className="btn btn-light"
                    onClick={() => setCategoryDelete(null)}
                  >
                    Hủy
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(categoryDelete.id)}
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
