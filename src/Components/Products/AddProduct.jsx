import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Product } from "../../Redux/CrudSlice";

export default function AddProduct() {
  const [error, setError] = useState({});
  console.log(error);
  const dispatch = useDispatch();
  const { add_list } = useSelector((state) => state?.Crud);
  const navigate = useNavigate();

  /* Add to List Redirection code starts here */

  const RedirectUser = () => {
    let title = localStorage.getItem("Title");
    let isInProductPage =
      window.location.pathname.toLowerCase() === "/addproduct";

    if (title !== null && title !== undefined && title !== "") {
      isInProductPage && navigate("/");
    }
  };

  useEffect(() => {
    RedirectUser();
  }, [add_list]);

  /* Add to List Redirection code ends here */

  const [img, setimg] = useState("");

  const [product, setProduct] = useState({
    title: "",
    description: "",
  });

  const validation = () => {
    let error = {};

    if (!product.title) {
      error.title = "Title is Required";
    }

    if (!product.description) {
      error.description = "Title is Required";
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

    dispatch(Product(formData));
  };

  return (
    <>
      <div class="registration">
       
        <div class="form-box-3">

          <div class="form-value">
            <form action="">
              <h2>Add Your Product</h2>

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
              </div>

              <button onClick={SubmitInfo} type="submit">
                {" "}
                Add Product{" "}
              </button>
            </form>
          </div>
        </div>
        </div>
     
    </>
  );
}


