import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleLoggedout, profiledetails } from "../../Redux/AuthSlice";
import { handle_redirection } from "../../Redux/CrudSlice";

import logo1 from "../../Images/logo2.png";
import { jobs_DetailsPath } from "../../Helper/Helper";

export default function Header() {
  const Name = localStorage.getItem("Name");
  const Profile_Picture = localStorage.getItem("Profile_Picture");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isloggedIn, title, image } = useSelector((state) => state?.Auth);
  console.log(isloggedIn, "isloggedIn", title, "title", image, "image");

  const [is_loggedIn, setis_loggedIn] = useState("");
  const [is_title, setis_title] = useState("");
  const [is_image, setis_image] = useState("");
  // console.log(is_loggedIn, "is_loggedIn");

  useEffect(() => {
    setis_loggedIn(Name);
  }, [Name]);

  
  useEffect(() => {
    setis_image(Profile_Picture);
  }, [Profile_Picture]);

  const logout = () => {
    dispatch(handleLoggedout());
    navigate("/login");
  };

  const re_redirection = () => {
    dispatch(handle_redirection());
    navigate("/addproduct");
  };


  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-primary">
        <img
          src={logo1}
          // class="img-profile rounded-circle"
          height="60px"
          width="150px"
          alt=""
        />{" "}
        <br />
        <a class="navbar-brand" href="#"></a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link class="nav-link" to="/">
                <h5> Home</h5>
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link"
                to="/addproduct"
                onClick={() => {
                  re_redirection();
                }}
              >
                <h5>Add Your Car</h5>
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/productlist">
                <h5>List Of Cars</h5>
              </Link>
            </li>

            {isloggedIn ? (
              <li class="nav-item dropdown no-arrow">
                {is_loggedIn ? (
                  <a
                    class="nav-link dropdown-toggle"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span class="mr-2 d-none d-lg-inline">
                     {is_loggedIn}
                    </span>
                    <img
                      class="img-profile rounded-circle"
                      src={jobs_DetailsPath(is_image)}
                      height="30px"
                      width="35px"
                    />
                  </a>
                ) : (
                  <li class="nav-item">
                    <Link class="nav-link" to="/login">
                      {" "}
                      <h2>Login</h2> 
                    </Link>
                  </li>
                )}

                <div
                  class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                  aria-labelledby="userDropdown"
                >
                  <a class="dropdown-item" href="#">
                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                    <Link class="" to="/profile-details">
                      Profile
                    </Link>
                  </a>

                  <div class="dropdown-divider"></div>
                  <a
                    class="dropdown-item"
                    href="#"
                    data-toggle="modal"
                    data-target="#logoutModal"
                  >
                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                    <Link
                      class=""
                      to="/login"
                      onClick={() => {
                        logout();
                      }}
                    >
                      <h5>Logout</h5>
                    </Link>
                  </a>
                </div>
              </li>
            ) : (
              <li class="nav-item">
                <Link class="nav-link" to="/login">
                  {" "}
                  <h5>Login</h5>
                </Link>
              </li>
            )}
            
          </ul>
        </div>
      </nav>
    </>
  );
}
