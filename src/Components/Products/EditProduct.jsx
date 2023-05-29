import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteProduct,
  EditList,
  productList,
  update,
} from "../../Redux/CrudSlice";
import SweetAlertComponent from "../SweetAlert/SweetAlert";
import image1 from "../../Images/car1.jpg";

export default function EditProduct() {

  const { Details, list_edit } = useSelector((state) => state?.Crud);
  console.log(Details, "Details");

  // const [delete_id, setDelete_id] = useState("");
  // const [isDelete, setIsDelete] = useState(false);

  const [error, setError] = useState({});
  console.log(error);

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(EditList(id));
  }, [id]);

  /* Edit to List Redirection code starts here */

  const RedirectUser = () => {
    let message = localStorage.getItem("message");
    let isInUpdateStudentPage =
      window.location.pathname.toLowerCase() === `/edit-product/${id}`;

    if (message !== null && message !== undefined && message !== "") {
      isInUpdateStudentPage && navigate("/");
    }
  };

  useEffect(() => {
    RedirectUser();
  }, [list_edit]);

  /* Edit to List Redirection code ends here */

  const [product, setProduct] = useState({
    title: "",
    description: "",
  });

  const [img, setimg] = useState("");

  const validation = () => {
    let error = {};

    if (!product.title) {
      error.title = "Title is Required";
    }

    if (!product.description) {
      error.description = "Description is Required";
    }

    return error;
  };

  let name, value;
  const postProductData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "title") {
      if (value.length === 0) {
        setError({ ...error, title: "Title is Required" });
        setProduct({ ...product, title: "" });
      } else {
        setError({ ...error, title: "" });
        setProduct({ ...product, title: value });
      }
    }

    if (name === "description") {
      if (value.length === 0) {
        setError({ ...error, description: "Description is Required" });
        setProduct({ ...product, description: "" });
      } else {
        setError({ ...error, description: "" });
        setProduct({ ...product, description: value });
      }
    }
  };

  const SubmitInfo = (e) => {
    e.preventDefault();
    setError(validation());

    let formData = new FormData();

    formData.append("title", product.title);
    formData.append("description", product.description);
    formData.append("image", img);
    formData.append("id", id);

    dispatch(update(formData));
  };

  useEffect(() => {
    if (Details !== null) {
      setProduct({
        title: Details?.title,
        description: Details?.description,
      });
    }
  }, [Details]);

  // useEffect(() => {
  //   dispatch(productList());
  // }, []);

  // const delete_func = (id) => {
  //   if (delete_id !== "") {
  //     dispatch(
  //       DeleteProduct({
  //         id: delete_id,
  //       })
  //     ).then(() => {
  //       dispatch(productList());
  //     }
  //     );
  //   }

  //   setDelete_id("");
  //   setIsDelete(false);
  // };

  return (
    <>
      <div class="registration">
        <div class="form-box">
          <div class="form-value">
            <form action="">
              <h2>Edit Your Product</h2>
              <br />

              <div class="inputbox">
                <ion-icon name="person-circle-outline"></ion-icon>
                <input
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={(e) => postProductData(e)}
                />
                <span style={{ color: "red", marginLeft: "24px" }}>
                  {" "}
                  {error.title}{" "}
                </span>
                <label for="">Title</label>
              </div>

              <div class="inputbox">
                <ion-icon name="person-circle-outline"></ion-icon>
                <input
                  type="text"
                  name="description"
                  value={product.description}
                  onChange={(e) => postProductData(e)}
                />
                <span style={{ color: "red", marginLeft: "24px" }}>
                  {" "}
                  {error.description}{" "}
                </span>
                <label for="">Description</label>
              </div>

              <div class="inputbox">
                <ion-icon name="camera-outline"></ion-icon>
                <input
                  type="file"
                  onChange={(e) => setimg(e.target.files[0])}
                  name="img"
                  accept="image/*"
                />
                {img !== "" && img !== undefined && img !== null ? (
                  <img
                    height="20px"
                    width="20px"
                    src={URL.createObjectURL(img)}
                    alt=""
                    className="upload-img"
                  />
                ) : (
                  <>
                    {Details?.image === "" ? (
                      <img src={image1} alt="" className="upload-img" />
                    ) : (
                      <img
                        src={`${`https://wtsacademy.dedicateddevelopers.us`}/uploads/product/${
                          Details?.image
                        }`}
                        alt=""
                        className="upload-img"
                        height="50px"
                        width="50px"
                      />
                    )}
                  </>
                )}
                {img === "" && <p>Drag or drop content here</p>}
              </div>
              <br />

              <button onClick={SubmitInfo} type="submit">
                {" "}
                Update Product{" "}
              </button>
              <br />
              <br />
              
            </form>
          </div>
        </div>
      </div>
   
    </>
  );
}


