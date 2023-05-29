import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset_redirectTo } from "../../Redux/AuthSlice";
import {
  add_to_list,
  handle_redirect,
  list_to_edit,
  productList,
} from "../../Redux/CrudSlice";
import { jobsDetailsPath } from "../../Helper/Helper";
import image1 from "../../Images/car1.jpg";
import image2 from "../../Images/car2.jpg";
import image3 from "../../Images/car3.jpg";
import "react-toastify/dist/ReactToastify.css";
import { Pagination } from "@mui/material";

export default function Home() {
  const [totalRecords, setPage] = useState("");
  const { redirectTo } = useSelector((state) => state?.Auth);
  const { list, add_list, list_edit,totalpage } = useSelector((state) => state?.Crud);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productList());
  }, []);

  useEffect(() => {
    dispatch(add_to_list(null));
  }, [add_list]);

  /* List to Edit Redirection code starts here */

  useEffect(() => {
    dispatch(list_to_edit(null));
  }, [list_edit]);

  const re_redirection = () => {
    dispatch(handle_redirect());
    navigate("/edit-product/:id");
  };

  /* List to Edit Redirection code ends here */

  /* Login to Home Redirection code starts here */

  useEffect(() => {
    dispatch(reset_redirectTo(null));
  }, [redirectTo]);

  /* Login to Home Redirection code ends here */

  
  const handleChange = (e, pageno) => {
    setPage(pageno);
    dispatch(
      productList({
        page: pageno,
        perpage: 10,
      })
    );
  };

  return (
    <>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-ride="carousel"
      >
        <ol class="carousel-indicators">
          <li
            data-target="#carouselExampleIndicators"
            data-slide-to="0"
            class="active"
          ></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
        </ol>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              class="d-block w-100"
              src={image1}
              alt="First slide"
              height="600px"
              width="300px"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src={image2}
              alt="Second slide"
              height="600px"
              width="300px"
            />
          </div>
          <div class="carousel-item">
            <img
              class="d-block w-100"
              src={image3}
              alt="Third slide"
              height="600px"
              width="300px"
            />
          </div>
        </div>
        <a
          class="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a
          class="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
      <br />
      <br />

      {list?.length !== 0 ? (
        <div className="home">
          <center>
            <h1>****LATEST CARS****</h1>{" "}
          </center>

          {list?.map((item) => {
            return (
              <div class="wrapper">
                <div class="product-img">
                  <img
                    src={item?.image ? jobsDetailsPath(item?.image) : "error"}
                    height="420"
                    width="327"
                  />
                </div>
                <div class="product-info">
                  <div class="product-text">
                    <br />
                    
                    <h3>{item?.title}</h3>

                    <br />
                    <p> <h3> {item?.description}</h3> </p>
                  </div>

                  <div class="product-price-btn">
                    <button type="button">
                      <Link
                        to={`/edit-product/${item?._id}`}
                        class=""
                        onClick={() => {
                          re_redirection();
                        }}
                      >
                        Edit 
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
       <Pagination
            count={totalpage}
            onChange={handleChange}
            totalRecords={totalRecords }
          />
        </div>
        
      ) : (
        <h3> ***NO DATA FOUND***</h3>
      )}


    </>
  );
}
