import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../Redux/AuthSlice";

export default function Registration() {
  const { redirection } = useSelector((state) => state?.Auth);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const [profile_pic, setimg] = useState("");

  /* Registration to Login Redirection code starts here */

  const RedirectUser = () => {
    let name = localStorage.getItem("Name");
    let isInRegistrationPage =
      window.location.pathname.toLowerCase() === "/registration";

    if (name !== null && name !== undefined && name !== "") {
      isInRegistrationPage && navigate("/login");
    }
  };

  useEffect(() => {
    RedirectUser();
  }, [redirection]);

  /* Registration to Login Redirection code ends here */

  const validation = () => {
    let error = {};

    if (!user.first_name) {
      error.first_name = "First Name is Required";
    }

    if (!user.last_name) {
      error.last_name = "Last Name is Required";
    }

    if (!user.email) {
      error.email = "Email is Required";
    } else if (
      !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      error.email = "Enter a valid Email";
    }

    if (!user.password) {
      error.password = "Password is Required";
    }

    return error;
  };

  let name, value;
  const postUserData = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (name === "first_name") {
      if (value.length === 0) {
        setError({ ...error, first_name: "Name is Required" });
        setUser({ ...user, first_name: "" });
      } else {
        setError({ ...error, first_name: "" });
        setUser({ ...user, first_name: value });
      }
    }

    if (name === "last_name") {
      if (value.length === 0) {
        setError({ ...error, last_name: "Name is Required" });
        setUser({ ...user, last_name: "" });
      } else {
        setError({ ...error, last_name: "" });
        setUser({ ...user, last_name: value });
      }
    }

    if (name === "email") {
      if (value.length === 0) {
        setError({ ...error, email: "Email is Required" });
        setUser({ ...user, email: "" });
      } else {
        setError({ ...error, email: "" });
        setUser({ ...user, email: value });
      }
    }

    if (name === "password") {
      if (value.length === 0) {
        setError({ ...error, password: "Password is Required" });
        setUser({ ...user, password: "" });
      } else {
        setError({ ...error, password: "" });
        setUser({ ...user, password: value });
      }
    }
  };

  const SubmitInfo = (e) => {
    e.preventDefault();
    setError(validation());

    let formData = new FormData();

    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("profile_pic", profile_pic);

    dispatch(register(formData));
  };

  return (
    <>
      <div class="registration">
        <div class="form-box">
          <div class="form-value">
            <form action="">
              <h2>Sign Up</h2>

              <div class="inputbox">
                <ion-icon name="person-circle-outline"></ion-icon>
                <input
                  type="text"
                  name="first_name"
                  value={user.first_name}
                  onChange={(e) => postUserData(e)}
                />
                <span style={{ color: "red", marginLeft: "24px" }}>
                  {" "}
                  {error.first_name}{" "}
                </span>
                <label for="">First Name</label>
              </div>

              <div class="inputbox">
                <ion-icon name="person-circle-outline"></ion-icon>
                <input
                  type="text"
                  name="last_name"
                  value={user.last_name}
                  onChange={(e) => postUserData(e)}
                />
                <span style={{ color: "red", marginLeft: "24px" }}>
                  {" "}
                  {error.last_name}{" "}
                </span>
                <label for="">Last Name</label>
              </div>

              <div class="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => postUserData(e)}
                />
                <span style={{ color: "red", marginLeft: "24px" }}>
                  {" "}
                  {error.email}{" "}
                </span>
                <label for="">Email</label>
              </div>

              <div class="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(e) => postUserData(e)}
                />
                <span style={{ color: "red", marginLeft: "24px" }}>
                  {" "}
                  {error.password}{" "}
                </span>

                <label for="">Password</label>
              </div>

              <div class="inputbox">
                <ion-icon name="camera-outline"></ion-icon>
                <input
                  type="file"
                  onChange={(e) => setimg(e.target.files[0])}
                  name="profile_pic"
                  accept="image/*"
                />
              </div>

              <button onClick={SubmitInfo} type="submit">
                {" "}
                Sign Up{" "}
              </button>

              <div class="register">
                <p>
                  Already have an Account?  <Link to="/Login"> Go and Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
